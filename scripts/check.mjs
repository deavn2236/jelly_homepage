import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../content/site.mjs';
import { media } from '../content/media.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const ids = new Set();
const checkAsset = (value, label) => {
  if (!value) return;
  if (path.isAbsolute(value) || value.includes('..')) { errors.push(`${label}: unsafe path ${value}`); return; }
  const target = path.join(root, value);
  if (!fs.existsSync(target)) errors.push(`${label}: missing ${value}`);
  if (fs.existsSync(target) && fs.statSync(target).size >= 25 * 1024 * 1024) errors.push(`${label}: file is >=25 MiB (${value})`);
};
if (!site.name?.zh || !site.name?.en || !site.email) errors.push('Missing public profile name or email');
checkAsset(site.portrait?.src, 'Portrait');
for (const [src, image] of Object.entries(media.images)) {
  checkAsset(src, 'Optimized image');
  for (const variant of image.variants || []) checkAsset(variant.src, 'Responsive thumbnail');
}
for (const video of Object.values(media.videos)) {
  if (!video.preview) continue;
  checkAsset(video.preview, 'Preview video');
  const preview = path.join(root, video.preview);
  if (fs.existsSync(preview) && fs.statSync(preview).size > 600 * 1024) errors.push(`Preview exceeds 600 KiB: ${video.preview}`);
}
for (const item of [...site.projects, ...site.papers]) {
  if (!/^[a-z0-9-]+$/.test(item.id)) errors.push(`Invalid id: ${item.id}`);
  if (ids.has(item.id)) errors.push(`Duplicate id: ${item.id}`);
  ids.add(item.id);
  if (!item.title?.zh || !item.title?.en) errors.push(`Missing bilingual title: ${item.id}`);
}
for (const p of site.projects) {
  const sectionAssets = new Set();
  if (!['systems', 'primary', 'collaboration'].includes(p.group)) errors.push(`${p.id}: missing project involvement group`);
  if (!p.media?.video && !p.media?.image) errors.push(`${p.id}: no main image or video`);
  if (!p.summary?.zh || !p.summary?.en) errors.push(`${p.id}: missing bilingual summary`);
  if (!Array.isArray(p.sections) || p.sections.length < 2) errors.push(`${p.id}: add at least two documented sections`);
  if (p.id === 'library-robot' && p.sections.some(s => s.id === 'experiments')) errors.push('Library results should be merged into demonstrations');
  if (p.id === 'image-goal' && p.sections.some(s => s.table || s.tables?.length)) errors.push('SCTNav project should use its original paper table only');
  checkAsset(p.media?.video, p.id);
  checkAsset(p.media?.image, p.id);
  checkAsset(p.media?.poster, p.id);
  for (const section of p.sections || []) {
    if (section.id === 'equipment' && (section.figures || []).filter(f => f.role === 'main').length > 1) errors.push(`${p.id}: keep one main hardware figure`);
    for (const figure of section.figures || []) {
      const asset = figure.video || figure.src || figure.image;
      if (sectionAssets.has(asset)) errors.push(`${p.id}: duplicate section media ${asset}`);
      sectionAssets.add(asset);
      checkAsset(figure.src || figure.image, p.id); checkAsset(figure.video, p.id); checkAsset(figure.poster, p.id);
    }
  }
  for (const g of p.gallery || []) { checkAsset(g.src, p.id); checkAsset(g.video, p.id); checkAsset(g.poster, p.id); }
}
if (site.projects.some(p => p.id === 'reconav')) errors.push('ReCoNav should appear as a paper only');
for (const id of ['wheel-legged', 'fruit-sorting']) {
  if (site.projects.find(p => p.id === id)?.group !== 'collaboration') errors.push(`${id}: should be a collaborative project`);
}
for (const p of site.papers) {
  if ((p.rankings || []).some(rank => rank.url)) errors.push(`${p.id}: rankings must be plain text`);
  checkAsset(p.image, p.id); checkAsset(p.pdf, p.id);
  if (p.id !== 'uwb-following' && p.pdf) errors.push(`${p.id}: only the UWB paper may expose its full PDF`);
  if (p.sections?.map(s => s.id).join(',') !== 'task,contributions,method,results') errors.push(`${p.id}: expected four paper sections`);
  for (const section of p.sections || []) for (const figure of section.figures || []) {
    checkAsset(figure.src || figure.image, p.id); checkAsset(figure.video, p.id); checkAsset(figure.poster, p.id);
  }
  if (p.status || p.statusType || p.pdfNote) errors.push(`${p.id}: status display fields should be omitted`);
}
if (site.honorGroups?.map(group => group.id).join(',') !== 'graduate,undergraduate') errors.push('Keep graduate and undergraduate honors in separate groups');
if (site.honorGroups?.some(group => group.items.some(item => item.zh.includes('优秀学生三等奖学金')))) errors.push('Remove the 2017 third-class undergraduate scholarship');
for (const file of fs.readdirSync(path.join(root, 'assets', 'papers', 'pdf'))) {
  if (file.toLowerCase().endsWith('.pdf') && file !== 'uwb-following.pdf') errors.push(`Unexpected public paper PDF: ${file}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Content and assets checked: ${site.projects.length} projects, ${site.papers.length} papers.`);
