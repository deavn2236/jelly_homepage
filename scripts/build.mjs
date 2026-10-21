import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../content/site.mjs';
import { media as mediaAssets } from '../content/media.mjs';
import { figureInfo, figureRows, figureWidth } from './figure-layout.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// This repository publishes its root. Rebuild generated pages in place; preserve Git and assets.
const out = root;
const assetVersions = Object.fromEntries([['styles','styles.css'],['client','client.js']].map(([key,file]) => [key, createHash('sha256').update(fs.readFileSync(path.join(root,'src',file))).digest('hex').slice(0,10)]));
const mediaVersions = new Map();
const mediaUrl = (src, prefix) => {
  if (!mediaVersions.has(src)) mediaVersions.set(src, createHash('sha256').update(fs.readFileSync(path.join(root, src))).digest('hex').slice(0,10));
  return `${prefix}${src}?v=${mediaVersions.get(src)}`;
};

const esc = (v = '') => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const tr = (v, lang = 'zh') => typeof v === 'object' && v !== null ? (v[lang] || v.zh || v.en || '') : (v || '');
const bi = v => {
  const zh = tr(v, 'zh');
  const en = tr(v, 'en');
  const zhLanguage = /[\u3400-\u9fff]/u.test(zh) ? 'zh-CN' : 'en';
  const marked = (value, lang) => {
    const phrase = v?.emphasis?.[lang];
    return phrase ? String(value).split(phrase).map(esc).join(`<strong>${esc(phrase)}</strong>`) : esc(value);
  };
  return `<span data-lang="zh" lang="${zhLanguage}">${marked(zh, 'zh')}</span><span data-lang="en" lang="en">${marked(en, 'en')}</span>`;
};
const b = (zh, en) => ({ zh, en });
const authors = value => esc(value || '')
  .replaceAll('Wendong Guo', '<strong>Wendong Guo</strong>')
  .replaceAll('Yanwei Zheng*', 'Yanwei Zheng<sup title="通讯作者 / Corresponding author" aria-label="通讯作者 / Corresponding author">*</sup>');
const alt = value => `alt="${esc(tr(value))}" data-alt-zh="${esc(tr(value))}" data-alt-en="${esc(tr(value, 'en'))}"`;
const paperPath = (paper, prefix) => `${prefix}papers/${esc(paper.id)}/index.html`;
const projectPath = (project, prefix) => `${prefix}projects/${esc(project.id)}/index.html`;
const sectionIcons = {
  education: '<rect width="32" height="32" rx="9" fill="#eef3fc"/><path d="m5 13 11-6 11 6-11 6-11-6Z" fill="#5165a4"/><path d="M9 16v6c4 3 10 3 14 0v-6l-7 4-7-4Z" fill="#88c8d1"/><path d="M27 14v8" stroke="#eea15b" stroke-width="2" stroke-linecap="round"/><circle cx="27" cy="23" r="2" fill="#eea15b"/>',
  publication: '<rect width="32" height="32" rx="9" fill="#edf4fc"/><path d="M9 5h11l5 5v17H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="#fff" stroke="#7399c2" stroke-width="1.3"/><path d="M19 5v7h6" fill="#b5d5eb"/><path d="M11 16h10M11 20h7M11 24h9" stroke="#7399c2" stroke-width="1.5" stroke-linecap="round"/><path d="M11 5h5v7l-2.5-2-2.5 2V5Z" fill="#edac71"/>',
  robot: '<rect width="32" height="32" rx="9" fill="#eaf6f6"/><path d="M16 6v4" stroke="#607c9d" stroke-width="1.5"/><circle cx="16" cy="5.5" r="2" fill="#efa874"/><rect x="6" y="10" width="20" height="17" rx="5" fill="#81b4cd"/><rect x="9" y="13" width="14" height="9" rx="3" fill="#fff"/><g class="robot-eyes"><circle cx="12.5" cy="17" r="1.3" fill="#51637c"/><circle cx="19.5" cy="17" r="1.3" fill="#51637c"/></g><path d="M13 24h6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><path d="M4 15v7M28 15v7" stroke="#e4a7ac" stroke-width="2.8" stroke-linecap="round"/>',
  users: '<rect width="32" height="32" rx="9" fill="#f2effa"/><circle cx="12" cy="11" r="4" fill="#8b8fc7"/><circle cx="23" cy="13" r="3.3" fill="#e8a1a4"/><path d="M4 26v-2a8 8 0 0 1 16 0v2" fill="#a8c2dc"/><path d="M21 26v-2a11 11 0 0 0-2-6c5-2 10 1 10 6v2" fill="#eabcb7"/><circle cx="12" cy="10.5" r="2.4" fill="#e7e3f8"/>',
  award: '<rect width="32" height="32" rx="9" fill="#fff6e6"/><path d="m10 18-3 11 9-5 9 5-3-11" fill="#e8a2a0"/><circle cx="16" cy="13" r="9" fill="#e8ba5f"/><circle cx="16" cy="13" r="6.5" fill="#fff1c5"/><path d="m16 8 1.5 3.1 3.5.5-2.5 2.5.6 3.5-3.1-1.7-3.1 1.7.6-3.5-2.5-2.5 3.5-.5L16 8Z" fill="#dda44c"/>',
  mail: '<rect width="32" height="32" rx="9" fill="#fcf0eb"/><rect x="4" y="8" width="24" height="18" rx="3" fill="#8db9c9"/><path d="m5 24 9-8h4l9 8" fill="#c4dce7"/><path d="M4 10 16 19 28 10V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z" fill="#f0b4a6"/><path d="m5 9 11 8L27 9" stroke="#fff7f0" stroke-width="1.2" fill="none"/>',
  layers: '<rect width="32" height="32" rx="9" fill="#eef6f3"/><path d="m4 22 12-6 12 6-12 6-12-6Z" fill="#90b7ca"/><path d="m4 16 12-6 12 6-12 6-12-6Z" fill="#a8cebd"/><path d="m4 10 12-6 12 6-12 6-12-6Z" fill="#edc080"/>',
  info: '<rect width="32" height="32" rx="9" fill="#f2f0fa"/><circle cx="16" cy="16" r="11" fill="#9ba6cf"/><circle cx="16" cy="10" r="1.7" fill="#f9e9bf"/><path d="M16 15v8" stroke="#fff" stroke-width="2.7" stroke-linecap="round"/>',
  chart: '<rect width="32" height="32" rx="9" fill="#f8f3e9"/><rect x="8" y="17" width="4" height="9" rx="1.5" fill="#edb27a"/><rect x="15" y="11" width="4" height="15" rx="1.5" fill="#8bbecb"/><rect x="22" y="6" width="4" height="20" rx="1.5" fill="#a69acb"/><path d="M5 5v23h23" stroke="#7d8c9c" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
  music: '<rect width="32" height="32" rx="9" fill="#f7edf3"/><path d="M7 18v-3a9 9 0 0 1 18 0v3" stroke="#8b8fbd" stroke-width="3" fill="none"/><rect x="5" y="16" width="6" height="10" rx="3" fill="#e4a4b4"/><rect x="21" y="16" width="6" height="10" rx="3" fill="#e4a4b4"/><path d="M15 13v9" stroke="#8b8fbd" stroke-width="1.8" stroke-linecap="round"/><circle cx="13.5" cy="23" r="2.5" fill="#a9a7ce"/>',
  badminton: '<rect width="32" height="32" rx="9" fill="#eef6ed"/><g transform="rotate(32 16 16)"><ellipse cx="15" cy="11" rx="7" ry="9" fill="#fff" stroke="#81b8bd" stroke-width="2"/><path d="M10 6h10M9 10h12M9 14h12M13 3v16M17 3v16" stroke="#d3e5dc" stroke-width="1"/><path d="M15 20v8" stroke="#e9b477" stroke-width="3" stroke-linecap="round"/><path d="M15 26v3" stroke="#8b96bf" stroke-width="3.5" stroke-linecap="round"/></g>'
};
const renderIcon = (icon, className = 'section-icon') => `<svg class="${className} icon-${icon}" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">${sectionIcons[icon]}</svg>`;
const sectionHeading = (icon, label) => `<h2 class="section-heading">${renderIcon(icon)}${bi(label)}</h2>`;
const factIconPaths = {
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16m-11 4h2m3 0h2m-7 3h2"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  education: '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c3 3 9 3 12 0v-6m4-2v8"/>',
  flag: '<path d="M5 21V3m0 1c6-4 8 4 15 0v10c-7 4-9-4-15 0"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 3c3 1 4 3 4 7"/>',
  language: '<path d="M3 5h11M8 3v2m-3 3c2 5 5 7 9 9m-3-12c0 7-3 11-8 14m11 2 4-11 4 11m-6-4h4"/>',
  phone: '<path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c-1 4-3 5-6 4C8 19 5 16 3 9 2 6 3 4 7 3Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>'
};
const renderFactIcon = name => `<svg class="fact-icon fact-${name}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${factIconPaths[name] || factIconPaths.compass}</svg>`;

function renderHeader(prefix) {
  const nav = [['publications', b('论文', 'Publications')], ['systems', b('智能系统', 'Intelligent Systems')], ['work', b('机器人', 'Robotics')], ['student-work', b('学生工作', 'Student Leadership')], ['contact', b('联系', 'Contact')]];
  return `<header class="site-header" id="top"><div class="header-inner wrap"><a class="brand" href="${prefix}index.html">${bi(site.name)}</a><nav class="nav" aria-label="Main navigation">${nav.map(([id, label]) => `<a href="${prefix}index.html#${id}">${bi(label)}</a>`).join('')}</nav><div class="language-switch" role="group" aria-label="Language"><button type="button" data-set-lang="zh" aria-pressed="true">中文</button><span aria-hidden="true">/</span><button type="button" data-set-lang="en" aria-pressed="false">English</button></div></div></header>`;
}

function page({ title, description, body, prefix = './' }) {
  const zhTitle = `${tr(title)} · ${tr(site.name)}`;
  const enTitle = `${tr(title, 'en')} · ${tr(site.name, 'en')}`;
  return `<!doctype html><html lang="zh-CN" data-lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(zhTitle)}</title><meta name="description" content="${esc(tr(description))}"><meta property="og:title" content="${esc(zhTitle)}"><meta property="og:description" content="${esc(tr(description))}"><script>try{if(sessionStorage.getItem('academic-language-v2')==='en'){document.documentElement.dataset.lang='en';document.documentElement.lang='en'}}catch{}</script><link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${prefix}styles.css?v=${assetVersions.styles}"><script defer src="${prefix}client.js?v=${assetVersions.client}"></script></head><body data-title-zh="${esc(zhTitle)}" data-title-en="${esc(enTitle)}"><a class="skip-link" href="#main">${bi(b('跳至正文', 'Skip to content'))}</a>${renderHeader(prefix)}<main id="main">${body}</main><footer class="footer wrap"><span>© ${new Date().getFullYear()} ${bi(site.name)}</span><a href="${esc(site.repository)}" target="_blank" rel="noopener noreferrer">GitHub</a><a href="#top">${bi(b('返回顶部 ↑', 'Back to top ↑'))}</a></footer></body></html>`;
}

function renderImage(src, label, prefix, { card = false, eager = false, sizes = '' } = {}) {
  const info = mediaAssets.images[src] || {};
  const variants = card && info.variants?.length ? [...info.variants, { src, width: info.width, height: info.height }] : [];
  const selected = variants[0] || { src, ...info };
  return `<img src="${esc(mediaUrl(selected.src, prefix))}" ${alt(label)}${selected.width ? ` width="${selected.width}" height="${selected.height}"` : ''}${variants.length ? ` srcset="${variants.map(v => `${esc(mediaUrl(v.src, prefix))} ${v.width}w`).join(', ')}" sizes="${esc(sizes)}"` : ''} decoding="async" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''}>`;
}

function renderMedia(media = {}, prefix, className = '', eager = false, card = false) {
  const label = media.alt || b('项目演示视频', 'Project demonstration video');
  const video = card ? mediaAssets.videos[media.video]?.preview || media.video : media.video;
  const info = mediaAssets.videos[video] || mediaAssets.videos[media.video] || {};
  if (video) return `<div class="media ${className}${info.height > info.width ? ' is-portrait' : ''}"${info.width ? ` style="--media-ratio:${info.width}/${info.height}"` : ''}><video class="autoplay-video" ${info.width ? `width="${info.width}" height="${info.height}"` : ''} ${media.poster ? `data-poster="${esc(mediaUrl(media.poster, prefix))}"` : ''} data-playback-rate="1.5" muted autoplay loop playsinline webkit-playsinline preload="none" aria-label="${esc(tr(label))}" data-label-zh="${esc(tr(label))}" data-label-en="${esc(tr(label, 'en'))}"><source data-src="${esc(mediaUrl(video, prefix))}" type="video/mp4"></video><span class="video-speed" aria-hidden="true">1.5×</span><button class="video-control is-paused" type="button" data-video-toggle aria-label="播放视频"><span class="pause-icon" aria-hidden="true">Ⅱ</span><span class="play-icon" aria-hidden="true">▶</span></button></div>`;
  const src = media.image || media.poster;
  return src ? `<div class="media ${className}">${renderImage(src, media.alt || '', prefix, { card, eager, sizes: '(max-width:560px) calc(100vw - 40px), (max-width:760px) calc((100vw - 58px) / 2), (min-width:1400px) 527px, 507px' })}</div>` : '';
}

function projectCard(project, index, prefix = './') {
  const period = project.period ? bi(project.period) : project.year ? esc(project.year) : '';
  const meta = [bi(project.category), period ? `<span class="project-period">${period}</span>` : '', project.organization ? bi(project.organization) : ''].filter(Boolean).join('<span class="meta-separator" aria-hidden="true">·</span>');
  return `<article class="project-card" id="project-${esc(project.id)}" data-category="${esc(project.categoryKey || '')}"><div class="project-copy"><p class="project-category">${meta}</p><h3><a href="${projectPath(project, prefix)}">${bi(project.title)}</a></h3><p class="project-summary">${bi(project.summary)} <a class="project-details" href="${projectPath(project, prefix)}">${bi(b('详情 →', 'Details →'))}</a></p>${project.previewCaption ? `<p class="project-preview-caption">${bi(project.previewCaption)}</p>` : ''}</div>${renderMedia(project.media, prefix, 'project-media', index < 2, true)}</article>`;
}

function paperLinks(paper, prefix = './', overview = true) {
  return `<div class="paper-links">${overview ? `<a href="${paperPath(paper, prefix)}">[${bi(b('论文介绍', 'Overview'))}]</a>` : ''}${paper.pdf ? `<a href="${prefix}${esc(paper.pdf)}" target="_blank" rel="noopener">[PDF]</a>` : ''}${(paper.links || []).map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">[${esc(l.label)}]</a>`).join('')}</div>`;
}

function paperCard(paper, prefix = './') {
  return `<article class="paper-card"><a class="paper-figure" href="${paperPath(paper, prefix)}">${renderImage(paper.image, paper.figureAlt, prefix, { card: true, sizes: '(max-width:560px) calc(100vw - 78px), (max-width:760px) 160px, (max-width:900px) 195px, 235px' })}</a><div class="paper-copy"><h3><a href="${paperPath(paper, prefix)}">${bi(paper.title)}</a></h3><p class="authors">${authors(paper.authors)}</p><p class="paper-venue">${bi(paper.venueShort || paper.venue)}${paper.year && !tr(paper.venueShort || paper.venue).includes(paper.year) ? `, ${esc(paper.year)}` : ''}${renderRankings(paper)}</p><p class="paper-summary">${bi(paper.summary)}</p>${paperLinks(paper, prefix)}</div></article>`;
}

function renderHome() {
  const filters = [['all', b('全部', 'All')], ['navigation', b('导航', 'Navigation')], ['manipulation', b('机器人操作', 'Manipulation')], ['exploration', b('探索与原型', 'Explorations')]].map(([key, label]) => `<button type="button" data-project-filter="${key}" aria-pressed="${key === 'all'}">${bi(label)}</button>`).join('');
  const education = site.educationDescription;
  const factTypes = { '出生年月':'calendar', '籍贯':'pin', '学历':'education', '政治面貌':'flag', '学生工作':'users', '六级成绩':'language' };
  const personalInfo = site.personalInfo.map(item => `<div><dt>${renderFactIcon(factTypes[tr(item.label)])}${bi(item.label)}</dt><dd>${bi(item.value)}</dd></div>`).join('');
  const advisors = site.advisors?.length ? `<div class="profile-advisors"><dt>${renderFactIcon('education')}${bi(b('导师', 'Advisors'))}</dt><dd>${site.advisors.map(advisor => `<span class="advisor-name">${bi(advisor)}</span>`).join('')}</dd></div>` : '';
  const studentWork = site.studentWork.map(item => `<article class="student-work-entry"><div class="student-work-header"><div><h3>${bi(item.institution)}</h3><p class="student-work-role">${bi(item.role)}</p></div><span class="student-work-period">${bi(item.period)}</span></div><ul>${item.points.map(point => `<li>${bi(point)}</li>`).join('')}</ul></article>`).join('');
  const systems = site.projects.filter(project => project.group === 'systems').map((project, index) => projectCard(project, index)).join('');
  const projectGroups = [
    { id: 'primary', label: b('主要研发', 'Research & Development'), icon: 'layers' },
    { id: 'collaboration', label: b('参与项目', 'Collaborative Projects'), icon: 'users' }
  ].map(group => `<div class="project-group" data-project-group="${group.id}"><h3 class="project-group-heading">${renderIcon(group.icon)}${bi(group.label)}</h3><div class="project-grid">${site.projects.filter(p => p.group === group.id).map((p,i) => projectCard(p,i)).join('')}</div></div>`).join('');
  return `<div class="home wrap">
    <section class="profile" id="intro">
      <div class="profile-eyebrow"><span>${renderFactIcon('compass')}${bi(b('个人主页','Personal Homepage'))}</span><span class="profile-rule" aria-hidden="true"></span><svg class="profile-route" width="130" height="28" viewBox="0 0 130 28" fill="none" aria-hidden="true"><path d="M3 20h29l11-12h34l12 12h38" stroke="#111" stroke-width="1.1"/><path d="M3 24h31L45 12h30l12 12h40" stroke="#af8765" stroke-dasharray="2 4"/><circle cx="32" cy="20" r="3" fill="#43685a"/><circle cx="77" cy="8" r="3" fill="#8b2d34"/><circle cx="89" cy="20" r="3" fill="#af8765"/></svg></div>
      <div class="profile-layout">
        <figure class="profile-photo">${renderImage(site.portrait.src, site.portrait.alt, './', { eager: true })}<span class="portrait-badge" aria-hidden="true">${renderIcon('robot')}</span></figure>
        <div class="profile-copy">
          <div class="profile-heading"><div class="profile-name-row"><h1>${bi(site.name)}</h1><p class="profile-affiliation">${bi(site.location)}</p></div><p class="profile-role">${bi(site.role)}</p></div>
          <dl class="profile-facts">${personalInfo}<div><dt>${renderFactIcon('phone')}${bi(b('电话', 'Phone'))}</dt><dd><a href="tel:${esc(site.phone)}">${esc(site.phone)}</a></dd></div><div><dt>${renderFactIcon('mail')}${bi(b('邮箱', 'Email'))}</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div>${advisors}</dl>
          <p class="education-description" id="about">${bi(education)}</p>
          <p class="research-line"><strong>${bi(b('研究方向：', 'Research interests: '))}</strong>${site.interests.map(it => bi(it.title)).join(' · ')}</p>
          <div class="hobbies-line"><span class="hobbies-label">${bi(b('业余爱好：', 'Hobbies: '))}</span>${site.hobbies.map(hobby => `<span class="hobby-item">${renderIcon(hobby.id, 'hobby-icon')}${bi(hobby.title)}</span>`).join('')}</div>
        </div>
      </div>
    </section>
    <section class="home-section" id="publications">${sectionHeading('publication', b('论文成果', 'Publications'))}<div class="paper-list">${site.papers.map(p => paperCard(p)).join('')}</div></section>
    <section class="home-section" id="systems">${sectionHeading('layers', b('智能系统', 'Intelligent Systems'))}<div class="project-grid">${systems}</div></section>
    <section class="home-section" id="work"><div class="section-title-row">${sectionHeading('robot', b('机器人项目', 'Robotics Projects'))}<div class="project-filters" role="group" aria-label="Filter projects">${filters}</div></div>${projectGroups}</section>
    <section class="home-section" id="student-work">${sectionHeading('users', b('学生工作', 'Student Leadership & Service'))}<div class="student-work-list">${studentWork}</div></section>
    <section class="home-section" id="honors">${sectionHeading('award', b('荣誉奖励', 'Selected Honors'))}<div class="honor-groups">${site.honorGroups.map(group => `<div class="honor-group"><h3>${bi(group.title)}</h3><ul class="honor-list">${group.items.map(item => `<li>${bi(item)}</li>`).join('')}</ul></div>`).join('')}</div></section>
    <section class="home-section contact-section" id="contact">${sectionHeading('mail', b('联系', 'Contact'))}<p>${bi(b('欢迎就具身导航与操作、多模态理解、计算机视觉进行交流。', 'I welcome conversations about embodied navigation and manipulation, multimodal understanding, and computer vision.'))}</p><p class="contact-details"><a href="tel:${esc(site.phone)}">${bi(b('电话：', 'Phone: '))}${esc(site.phone)}</a><a href="mailto:${esc(site.email)}">${bi(b('邮箱：', 'Email: '))}${esc(site.email)}</a></p></section>
  </div>`;
}

function breadcrumb(prefix, type, title) {
  const label = { work: b('机器人项目', 'Robotics Projects'), systems: b('智能系统', 'Intelligent Systems'), publications: b('论文', 'Publications') }[type];
  return `<nav class="breadcrumb wrap" aria-label="Breadcrumb"><a href="${prefix}index.html">${bi(b('首页', 'Home'))}</a><span>/</span><a href="${prefix}index.html#${type}">${bi(label)}</a><span>/</span><span>${bi(title)}</span></nav>`;
}

function renderRankings(item) {
  return (item.rankings || []).map(rank => `<span class="venue-rank">${bi(rank.label)}</span>`).join('');
}

function renderFigure(figure, prefix, paired = false) {
  const label = figure.caption || figure.alt || b('系统演示', 'System demonstration');
  const width = paired ? null : figureWidth(figure);
  const ratio = figureInfo(figure).ratio;
  const sizes = paired ? '(max-width:760px) calc(100vw - 40px), (min-width:1400px) 528px, 508px' : `(max-width:760px) calc(100vw - 40px), ${width}px`;
  const kind = figure.video ? b('视频','Video') : figure.kind === 'table' ? b('实验表格','Results table') : b('图示','Figure');
  const symbol = figure.video ? '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m8 6 6 4-6 4Z" fill="currentColor"/>' : '<rect x="2" y="3" width="16" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m4 14 4-4 3 3 2-2 3 3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="7" r="1.5" fill="currentColor"/>';
  return `<figure class="section-figure${width ? ' figure-bounded' : ''}${['main','sensor'].includes(figure.role) ? ` figure-${figure.role}` : ''}${figure.kind === 'table' ? ' figure-table' : ''}${figure.video && ratio < .75 ? ' figure-portrait-video' : ''}" style="--figure-ratio:${ratio};${width ? `--figure-width:${width}px` : ''}">${figure.video ? renderMedia({ video: figure.video, poster: figure.poster, alt: label }, prefix, 'section-video') : `<a class="figure-expand" href="${esc(mediaUrl(figure.src || figure.image, prefix))}" target="_blank" rel="noopener noreferrer" aria-label="查看大图" data-aria-zh="查看大图" data-aria-en="Open full-size image">${renderImage(figure.src || figure.image, label, prefix, { card: true, sizes })}</a>`}<figcaption><span class="figure-caption-kind"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">${symbol}</svg>${bi(kind)}</span><span class="figure-caption-text">${bi(label)}</span></figcaption></figure>`;
}

function renderFigures(section, prefix) {
  if (!section.figures?.length) return '';
  return `<div class="section-figures">${figureRows(section).map(row => {
    const paired = row.length === 2;
    const ratios = row.map(f => figureInfo(f).ratio);
    const portraitPair = paired && ratios.every(r => r < .75);
    const widths = row.map(f => f.rowWidth).filter(w => Number.isInteger(w) && w >= 200 && w <= 1080);
    // Image rows use the tallest image's ratio: every contained image fills
    // the same width, while vertical whitespace keeps captions aligned.
    const rowRatio = row.every(f => !f.video) ? Math.min(...ratios) : Math.max(...ratios);
    const hardwareRatio = section.layout === 'equipment' && Number.isFinite(section.equipmentRatio) && section.equipmentRatio > 0 && section.equipmentRatio <= 3 ? section.equipmentRatio : null;
    const styles = [paired ? `--row-ratio:${rowRatio}` : '', widths.length ? `--row-width:${Math.min(...widths)}px` : '', hardwareRatio ? `--equipment-main:${hardwareRatio}fr` : ''].filter(Boolean).join(';');
    return `<div class="media-row ${paired ? 'is-pair' : 'is-single'}${section.layout === 'equipment' ? ' is-equipment' : ''}${portraitPair ? ' is-portrait-pair' : ''}"${styles ? ` style="${styles}"` : ''}>${row.map(f => renderFigure(f,prefix,paired)).join('')}</div>`;
  }).join('')}</div>`;
}

function renderTable(table) {
  return `<div class="table-scroll"><table><caption>${bi(table.caption || '')}</caption><thead><tr>${table.columns.map(c => `<th scope="col">${bi(c)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map((cell,i) => i === 0 ? `<th scope="row">${bi(cell)}</th>` : `<td>${bi(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderSection(section, prefix, index) {
  const icon = ({ task: 'info', equipment: 'robot', deployment: 'layers', system: 'layers', method: 'layers', demo: 'robot', experiments: 'chart', results: 'chart', contributions: 'publication' })[section.id] || 'publication';
  const technologies = section.techniques?.length ? `<ul class="technology-list">${section.techniques.map(t => `<li><strong>${bi(t.name)}${bi(b('：', ': '))}</strong>${bi(t.description)}</li>`).join('')}</ul>` : '';
  return `<section class="detail-section" id="${esc(section.id || `section-${index}`)}">${sectionHeading(icon, section.title || section.heading)}${(section.paragraphs || []).map(p => `<p>${bi(p)}</p>`).join('')}${technologies}${section.points?.length ? `<ul>${section.points.map(p => `<li>${bi(p)}</li>`).join('')}</ul>` : ''}${section.flow?.length ? `<ol class="system-flow">${section.flow.map(step => `<li>${bi(step)}</li>`).join('')}</ol>` : ''}${section.metrics?.length ? `<div class="paper-results-grid">${section.metrics.map(r => `<div class="paper-result"><strong>${esc(r.value)}</strong><span>${bi(r.label)}</span></div>`).join('')}</div>` : ''}${section.table ? renderTable(section.table) : ''}${(section.tables || []).map(renderTable).join('')}${renderFigures(section,prefix)}${section.source ? `<p class="media-source"><a href="${esc(section.source.url)}" target="_blank" rel="noopener noreferrer">${bi(section.source.label)}</a></p>` : ''}</section>`;
}

function renderProjectDetail(project, prefix = '../../') {
  const sections = project.sections || [];
  const homeSection = project.group === 'systems' ? 'systems' : 'work';
  const backLabel = project.group === 'systems' ? b('← 返回智能系统', '← All intelligent systems') : b('← 返回所有项目', '← All projects');
  const facts = (project.facts || []).map(f => `<div><dt>${bi(f.label)}</dt><dd>${bi(f.value)}</dd></div>`).join('');
  const related = site.papers.filter(p => (project.relatedPapers || []).includes(p.id));
  return `${breadcrumb(prefix, homeSection, project.title)}<article class="detail-page structured-detail wrap"><header class="detail-hero"><p class="detail-kicker">${bi(project.category)}${project.period ? ` · ${bi(project.period)}` : project.year ? ` · ${esc(project.year)}` : ''}${project.organization ? ` · ${bi(project.organization)}` : ''}</p><h1>${bi(project.title)}</h1><p class="detail-deck">${bi(project.summary)}</p></header>${facts ? `<dl class="project-facts">${facts}</dl>` : ''}${sections.map((s,i) => renderSection(s,prefix,i)).join('')}${related.length ? `<section class="related-section">${sectionHeading('publication', b('相关论文', 'Related Publications'))}<div class="paper-list">${related.map(p => paperCard(p,prefix)).join('')}</div></section>` : ''}<p class="detail-back"><a href="${prefix}index.html#${homeSection}">${bi(backLabel)}</a></p></article>`;
}

function renderPaperDetail(paper, prefix = '../../') {
  const sections = paper.sections || [];
  return `${breadcrumb(prefix, 'publications', paper.title)}<article class="detail-page paper-detail structured-detail wrap"><header class="detail-hero"><p class="detail-kicker">${bi(b('研究论文', 'Research Paper'))}${paper.year ? ` · ${esc(paper.year)}` : ''}</p><h1>${bi(paper.title)}</h1><p class="paper-detail-authors">${authors(paper.authors)}</p><p class="paper-detail-venue">${bi(paper.venue)}${renderRankings(paper)}</p><p class="detail-deck">${bi(paper.summary)}</p>${paperLinks(paper,prefix,false)}</header>${sections.map((s,i) => renderSection(s,prefix,i)).join('')}<p class="detail-back"><a href="${prefix}index.html#publications">${bi(b('← 返回论文列表', '← All publications'))}</a></p></article>`;
}

function write(rel, html) { const dest = path.join(out, rel); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, html, 'utf8'); }
write('index.html', page({ title: b('个人主页', 'Personal Homepage'), description: site.hero.description, body: renderHome() }));
for (const p of site.projects) write(`projects/${p.id}/index.html`, page({ title: p.title, description: p.summary, body: renderProjectDetail(p), prefix: '../../' }));
for (const p of site.papers) write(`papers/${p.id}/index.html`, page({ title: p.title, description: p.summary, body: renderPaperDetail(p), prefix: '../../' }));
write('404.html', page({ title: b('页面未找到', 'Page Not Found'), description: b('页面未找到', 'Page not found'), prefix: site.url, body: `<section class="wrap not-found"><h1>404</h1><p>${bi(b('页面未找到，请返回首页继续浏览。', 'Page not found. Please return to the homepage.'))}</p><a href="${esc(site.url || './index.html')}">${bi(b('返回首页', 'Go home'))}</a></section>` }));
for (const file of ['styles.css', 'client.js']) fs.copyFileSync(path.join(root, 'src', file), path.join(out, file));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Built ${site.projects.length} project pages and ${site.papers.length} paper pages into ${out}`);
