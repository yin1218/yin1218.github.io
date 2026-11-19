#!/usr/bin/env python3
"""Render the per-page Open Graph / Twitter cards (1200x630 PNG) into public/static/images/og/.

    python3 scripts/generate-og-images.py

Titles come from `pageSEO` / `pageSEOzh` (app/seo.tsx) and the publication details
(data/publicationDetails.ts, data/zh/publicationDetails.ts), bundled by a small esbuild step
so the cards stay in sync with the site. Needs Pillow and macOS system fonts. Output files are
named og/<locale>/<name>.png, where <name> is `home` or the page path with `/` -> `-`
(see `socialCardPath` in app/seo.tsx). Rerun after changing page titles, then commit the PNGs.
"""
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/static/images/og'
W, H = 1200, 630

PAPER, INK, MUTED, BRICK, RULE = '#faf8f3', '#2a1f1b', '#6e625a', '#93442f', '#e4dccf'
SITE = 'chienyinwu.com'
FOOTER_NAME = {'en': 'Chien-Yin Wu', 'zh': '巫芊瑩 Chien-Yin Wu'}
NAME = {'en': 'Chien-Yin Wu', 'zh': '巫芊瑩'}

# Short one-line descriptors, keyed like `pageSEO`.
TAGLINE = {
    'en': {
        'home': 'HCI & Human-Centered AI',
        'about': 'HCI researcher and frontend developer',
        'projects': 'Education, community, everyday life',
        'publications': 'CHI EA 2025, TAICHI 2025, under review',
        'resume': 'Education, research, teaching, skills',
        'blog': 'Cafés, photography, and new sports',
        'cafes': 'Atmosphere, place, and the ticket to talk',
        'sports': 'What I have tried, and what is next',
        'photography': 'From recording the real to a beautiful accident',
    },
    'zh': {
        'home': '人機互動與以人為本的 AI',
        'about': '人機互動研究者與前端開發者',
        'projects': '教育、社區與日常生活',
        'publications': 'CHI EA 2025、TAICHI 2025、審查中',
        'resume': '學歷、研究、教學與技能',
        'blog': '咖啡廳、攝影與新的運動',
        'cafes': '氛圍、地方，與搭話的門票',
        'sports': '試過的運動，與接下來想試的',
        'photography': '從記下真實，到一場美麗的意外',
    },
}
PAGE_KEYS = {'beyondAdaptation': None}  # handled with the publication details

NODE_STEP = r"""
import { buildSync } from 'esbuild'
import Module from 'node:module'
const root = process.argv[1]
const r = buildSync({
  stdin: {
    contents: `
      export { pageSEO, pageSEOzh } from './app/seo'
      export { publicationDetails as detailsEn } from './data/publicationDetails'
      export { publicationDetails as detailsZh } from './data/zh/publicationDetails'
    `,
    resolveDir: root, sourcefile: 'og-data.ts',
  },
  bundle: true, platform: 'node', format: 'cjs', write: false,
  alias: { '@': root, app: root + '/app' },
})
const m = new Module('og-data')
m._compile(r.outputFiles[0].text, root + '/og-data.cjs')
process.stdout.write(JSON.stringify(m.exports))
"""


def load_data():
    out = subprocess.run(
        ['node', '--input-type=module', '-e', NODE_STEP, str(ROOT)],
        cwd=ROOT, check=True, capture_output=True, text=True,
    ).stdout
    return json.loads(out)


# ---- fonts: Georgia / Helvetica for Latin, Songti TC / Heiti TC for CJK -----------------
F = '/System/Library/Fonts'
FONT_FILES = {
    'serif': (f'{F}/Supplemental/Georgia.ttf', 0),
    'serif_cjk': (f'{F}/Songti.ttc', 2),  # Songti TC Bold (the Light face is too thin at size)
    'sans': (f'{F}/Helvetica.ttc', 0),
    'sans_cjk': (f'{F}/STHeiti Medium.ttc', 0),  # Heiti TC Medium
}
_cache = {}


def font(kind, size):
    key = (kind, size)
    if key not in _cache:
        path, index = FONT_FILES[kind]
        _cache[key] = ImageFont.truetype(path, size, index=index)
    return _cache[key]


def is_cjk(ch):
    o = ord(ch)
    return (0x2E80 <= o <= 0x9FFF or 0xF900 <= o <= 0xFAFF or 0x3000 <= o <= 0x303F
            or 0xFF00 <= o <= 0xFFEF or o in (0x2014, 0x2026))


def runs(text, base, size):
    """Split text into (font, chunk) runs, using the CJK face for CJK characters."""
    out, buf, cur = [], '', None
    for ch in text:
        kind = base + '_cjk' if is_cjk(ch) else base
        if kind != cur and buf:
            out.append((font(cur, size), buf))
            buf = ''
        cur = kind
        buf += ch
    if buf:
        out.append((font(cur, size), buf))
    return out


def width(text, base, size):
    return sum(f.getlength(t) for f, t in runs(text, base, size))


def draw_text(d, xy, text, base, size, fill):
    x, y = xy
    for f, t in runs(text, base, size):
        d.text((x, y), t, font=f, fill=fill, anchor='ls')
        x += f.getlength(t)


def wrap(text, base, size, max_w):
    """Greedy wrap: break at spaces for Latin, between any characters for CJK."""
    lines, line = [], ''
    tokens = []
    for ch in text:
        if is_cjk(ch) or ch == ' ':
            tokens.append(ch)
        elif tokens and tokens[-1] not in ('',) and not is_cjk(tokens[-1][-1]) and tokens[-1] != ' ':
            tokens[-1] += ch
        else:
            tokens.append(ch)
    for tok in tokens:
        if line and width(line + tok, base, size) > max_w and tok != ' ':
            lines.append(line.rstrip())
            line = '' if tok == ' ' else tok
        else:
            line += tok
    if line.strip():
        lines.append(line.rstrip())
    return lines


def fit_title(text, max_w, max_lines=2):
    for size in (92, 84, 76, 68, 60, 54, 48):
        lines = wrap(text, 'serif', size, max_w)
        if len(lines) == 2 and size > 76:
            continue  # two-line titles stay a little smaller so they clear the footer
        if len(lines) <= max_lines:
            return size, lines
    return size, lines[:max_lines]


def render(eyebrow, title, tagline, locale, dest):
    img = Image.new('RGB', (W, H), PAPER)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 18, H], fill=BRICK)
    left, max_w = 88, 1020

    size, lines = fit_title(title, max_w)
    line_h = int(size * 1.15)
    tag_lines = wrap(tagline, 'sans', 36, max_w)[:2]
    eyebrow_h = 56 if eyebrow else 0
    content = eyebrow_h + line_h * len(lines) + 30 + 50 * len(tag_lines)
    y = 40 + (480 - content) // 2  # centre in the band above the footer rule
    if eyebrow:
        draw_text(d, (left, y + 30), eyebrow.upper() if locale == 'en' else eyebrow, 'sans', 30, BRICK)
        y += eyebrow_h
    y += int(size * 0.9)
    for line in lines:
        draw_text(d, (left, y), line, 'serif', size, INK)
        y += line_h
    y += 10
    for tl in tag_lines:
        draw_text(d, (left, y + 30), tl, 'sans', 36, MUTED)
        y += 50

    d.line([left, 520, W - 88, 520], fill=RULE, width=2)
    draw_text(d, (left, 578), FOOTER_NAME[locale], 'serif', 38, BRICK)
    sw = width(SITE, 'sans', 30)
    draw_text(d, (W - 88 - sw, 576), SITE, 'sans', 30, MUTED)

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, optimize=True)


def split_title(title):
    """'Beyond Adaptation · CHI EA 2025' -> eyebrow 'CHI EA 2025'; 'Name | tagline' -> name."""
    if ' | ' in title:
        title = title.split(' | ')[0]
    if ' · ' in title and not title.startswith(('Chien', '巫')):
        head, tail = title.split(' · ', 1)
        return tail, head
    return '', title


def main():
    data = load_data()
    made = []
    for locale, seo, details in (('en', data['pageSEO'], data['detailsEn']),
                                 ('zh', data['pageSEOzh'], data['detailsZh'])):
        by_id = {x['id']: x for x in details}
        for key, page in seo.items():
            path = page['path']
            name = 'home' if path == '/' else path[1:].replace('/', '-')
            eyebrow, title = split_title(page['title'])
            if key == 'home':
                title = NAME[locale] if locale == 'zh' else 'Chien-Yin Wu · 巫芊瑩'
            if key == 'beyondAdaptation':
                tagline = by_id['beyond-adaptation']['eyebrow']
            else:
                tagline = TAGLINE[locale][key]
            render(eyebrow, title, tagline, locale, OUT / locale / f'{name}.png')
            made.append(f'{locale}/{name}')
        for det in details:
            name = f"publications-{det['id']}"
            if f'{locale}/{name}' in made:
                continue
            label = 'Publication' if locale == 'en' else '學術著作'
            render(label, det['shortTitle'], det['eyebrow'], locale, OUT / locale / f'{name}.png')
            made.append(f'{locale}/{name}')
    print(f'wrote {len(made)} cards to {OUT.relative_to(ROOT)}')
    for m in made:
        print('  ', m)


if __name__ == '__main__':
    sys.exit(main())
