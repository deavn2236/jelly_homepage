"""Compress media using content/media-policy.json; back up outside the public repo.

Defaults to images only; add --videos explicitly to re-encode videos.
Requires Python/Pillow, plus FFmpeg only for --videos. Normal builds use Node.
python scripts/optimize-media.py --backup /outside/repo
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import argparse
import fnmatch
import hashlib
import json
import re
import shutil
import subprocess
import tempfile
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent


def run(args):
    proc = subprocess.run([str(x) for x in args], capture_output=True, text=True,
                          encoding='utf-8', errors='replace')
    if proc.returncode:
        raise RuntimeError(proc.stderr[-2200:])
    return proc


def probe(ffmpeg, src):
    proc = subprocess.run([str(ffmpeg), '-hide_banner', '-i', str(src)],
                          capture_output=True, text=True, encoding='utf-8', errors='replace')
    duration = re.search(r'Duration: (\d+):(\d+):([\d.]+)', proc.stderr)
    dims = re.search(r'Video:.*? (\d{2,5})x(\d{2,5})', proc.stderr)
    fps = re.search(r'([\d.]+) fps', proc.stderr)
    if not duration or not dims or not fps:
        raise RuntimeError(f'Cannot inspect video: {src}')
    return {'width': int(dims[1]), 'height': int(dims[2]),
            'duration': round(int(duration[1])*3600+int(duration[2])*60+float(duration[3]), 3),
            'fps': float(fps[1]), 'bytes': src.stat().st_size,
            'audio': bool(re.search(r'Stream.*Audio:', proc.stderr))}


def settings(policy, kind, rel):
    result = policy[kind].copy()
    for rule in policy.get('overrides', []):
        if kind in rule and any(fnmatch.fnmatchcase(rel, pat) for pat in rule['patterns']):
            result.update(rule[kind])
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg', default=shutil.which('ffmpeg'))
    parser.add_argument('--videos', action='store_true', help='Explicitly enable video re-encoding; otherwise preserve all MP4 files')
    parser.add_argument('--backup', type=Path, required=True)
    parser.add_argument('--jobs', type=int, default=2)
    parser.add_argument('--policy', type=Path, default=ROOT/'content/media-policy.json')
    args = parser.parse_args()
    if args.videos and not args.ffmpeg:
        parser.error('ffmpeg not found; provide --ffmpeg')
    if args.jobs < 1:
        parser.error('--jobs must be positive')
    backup = args.backup.resolve()
    if backup == ROOT or ROOT in backup.parents:
        parser.error('Keep the backup outside the published repository')
    backup.mkdir(parents=True, exist_ok=True)
    policy = json.loads(args.policy.read_text('utf-8'))
    manifest_path = ROOT/'content/media.mjs'
    manifest = json.loads(manifest_path.read_text('utf-8').split('export const media = ', 1)[1].rsplit(';', 1)[0])
    for config in (manifest_path, args.policy):
        dest = backup/config.relative_to(ROOT)
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            shutil.copy2(config, dest)

    def preserve(src):
        dest = backup/src.relative_to(ROOT)
        if not dest.exists():
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
        return dest

    # Identical clips share an encode while retaining their existing public URLs.
    groups = {}
    for src in sorted((ROOT/'assets').rglob('*.mp4')) if args.videos else []:
        rel = src.relative_to(ROOT).as_posix()
        config = settings(policy, 'video', rel)
        original = preserve(src)
        key = (hashlib.sha256(original.read_bytes()).hexdigest(), json.dumps(config, sort_keys=True))
        groups.setdefault(key, []).append((src, original, config))

    def video(group):
        src, original, config = group[0]
        before_info = probe(args.ffmpeg, original)
        fps = min(before_info['fps'], config['fps'])
        filters = ("scale=w='trunc(iw*sar/2)*2':h=ih,setsar=1,"
                   f"scale=w='min({config['width']},iw)':h='min({config['height']},ih)':"
                   f"force_original_aspect_ratio=decrease:force_divisible_by=2,fps={fps}")
        results = []
        with tempfile.TemporaryDirectory(prefix='academic-video-') as folder:
            temp = Path(folder)/'encoded.mp4'
            run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', original,
                 '-map', '0:v:0', '-an', '-sn', '-dn', '-vf', filters,
                 '-c:v', 'libx264', '-preset', 'slow', '-crf', config['crf'],
                 '-maxrate', config['maxrate'], '-bufsize', config['bufsize'],
                 '-pix_fmt', 'yuv420p', '-g', str(round(fps*2)), '-threads', '2',
                 '-map_metadata', '-1', '-movflags', '+faststart', temp])
            candidate = probe(args.ffmpeg, temp)
            if candidate['audio'] or abs(candidate['duration']-before_info['duration']) > .15:
                raise RuntimeError(f'Unexpected audio/duration after encoding: {src}')
            for target, source, _ in group:
                before = target.stat().st_size
                if temp.stat().st_size < before:
                    shutil.copyfile(temp, target)
                    after_info = candidate
                else:
                    after_info = probe(args.ffmpeg, target)
                results.append({'file': target.relative_to(ROOT).as_posix(), 'kind': 'video',
                                'before': before, 'after': target.stat().st_size,
                                'original': before_info, 'encoded': after_info})
        print(json.dumps({'video': src.relative_to(ROOT).as_posix(),
                          'copies': len(group), 'saved': sum(r['before']-r['after'] for r in results)}), flush=True)
        return results

    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
        stats = [item for group in pool.map(video, groups.values()) for item in group]

    sources = [p for p in (ROOT/'assets').rglob('*.webp') if '.thumb-' not in p.name]
    image_index = {}
    for src in sorted(sources):
        original = preserve(src)
        rel = src.relative_to(ROOT).as_posix()
        config = settings(policy, 'image', rel)
        with Image.open(original) as opened:
            im = ImageOps.exif_transpose(opened).convert('RGBA' if 'A' in opened.getbands() else 'RGB')
        im.thumbnail((config['maxSide'], config['maxSide']), Image.Resampling.LANCZOS)
        before = src.stat().st_size
        with tempfile.TemporaryDirectory(prefix='academic-image-') as folder:
            temp = Path(folder)/'encoded.webp'
            im.save(temp, 'WEBP', quality=config['quality'], method=6)
            if temp.stat().st_size < before:
                shutil.copyfile(temp, src)
        stats.append({'file': rel, 'kind': 'image', 'before': before, 'after': src.stat().st_size})
        with Image.open(src) as current:
            item = {'width': current.width, 'height': current.height}
            variants = []
            if 'poster' not in src.name:
                for width in policy['thumbnailWidths']:
                    if width >= current.width:
                        continue
                    dest = src.with_name(src.stem+f'.thumb-{width}.webp')
                    previous = dest.stat().st_size if dest.exists() else 0
                    if dest.exists():
                        preserve(dest)
                    size = (width, round(current.height*width/current.width))
                    with tempfile.TemporaryDirectory(prefix='academic-thumb-') as folder:
                        temp = Path(folder)/'thumb.webp'
                        im.resize(size, Image.Resampling.LANCZOS).save(temp, 'WEBP',
                            quality=config['thumbnailQuality'], method=6)
                        if not previous or temp.stat().st_size < previous:
                            shutil.copyfile(temp, dest)
                    with Image.open(dest) as thumb:
                        dims = {'width': thumb.width, 'height': thumb.height}
                    variants.append({'src': dest.relative_to(ROOT).as_posix(), **dims})
                    image_index[variants[-1]['src']] = dims
                    stats.append({'file': variants[-1]['src'], 'kind': 'thumbnail',
                                  'before': previous, 'after': dest.stat().st_size})
            if variants:
                item['variants'] = variants
            image_index[rel] = item
    for src in sorted((ROOT/'assets').rglob('*')):
        rel = src.relative_to(ROOT).as_posix()
        if src.suffix.lower() in {'.webp', '.png', '.jpg', '.jpeg'} and rel not in image_index:
            with Image.open(src) as im:
                image_index[rel] = {'width': im.width, 'height': im.height}
    manifest['images'] = dict(sorted(image_index.items()))
    for item in stats:
        if item['kind'] == 'video':
            meta = {k: v for k, v in item['encoded'].items() if k != 'audio'}
            manifest['videos'].setdefault(item['file'], {}).update(meta)
    manifest_path.write_text('// Generated intrinsic dimensions and compact previews.\nexport const media = '
                             +json.dumps(manifest, ensure_ascii=False, indent=2)+';\n', 'utf-8')
    totals = {kind: {'before': sum(r['before'] for r in stats if r['kind'] == kind),
                     'after': sum(r['after'] for r in stats if r['kind'] == kind)}
              for kind in ['video', 'image', 'thumbnail']}
    report = {'files': stats, 'totals': totals, 'policy': policy}
    (backup/'compression-report.json').write_text(json.dumps(report, indent=2), 'utf-8')
    print(json.dumps(totals), flush=True)


if __name__ == '__main__':
    main()
