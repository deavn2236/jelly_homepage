"""Optional: regenerate the checked-in image index after adding or replacing assets.
Requires Python and Pillow. Normal site builds use only Node.js.
"""
from pathlib import Path
import json
from PIL import Image

root = Path(__file__).resolve().parent.parent
index_file = root / 'content/media.mjs'
text = index_file.read_text('utf-8')
media = json.loads(text.split('export const media = ', 1)[1].rsplit(';', 1)[0])
images = {}
for file in (root / 'assets').rglob('*'):
    if file.suffix.lower() not in {'.webp', '.png', '.jpg', '.jpeg'}:
        continue
    with Image.open(file) as image:
        images[file.relative_to(root).as_posix()] = {'width': image.width, 'height': image.height}
for file, info in media['images'].items():
    if file in images and 'variants' in info:
        images[file]['variants'] = info['variants']
media['images'] = images
index_file.write_text('// Generated media dimensions and lightweight preview mappings.\nexport const media = ' + json.dumps(media, ensure_ascii=False, indent=2) + ';\n', 'utf-8')
print(f'Indexed {len(images)} images.')
