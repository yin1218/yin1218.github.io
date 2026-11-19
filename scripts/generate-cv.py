"""Generate the public CVs (English and Traditional Chinese) from the data used by the website.

Requires Node.js, the installed project packages, and Python's reportlab package.
Run from any directory: python3 scripts/generate-cv.py
(without a global reportlab: uv run --no-project --with reportlab python3 scripts/generate-cv.py)

Outputs public/static/files/chien-yin-wu-cv.pdf (from data/academicData.ts) and
public/static/files/chien-yin-wu-cv-zh.pdf (from data/zh/*). The Chinese CV needs a CJK font
with regular and bold weights: Noto Sans TC is used when installed, otherwise Heiti TC; set
CV_ZH_FONT and CV_ZH_BOLD_FONT to the paths of other TrueType fonts to override.
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape
from zoneinfo import ZoneInfo

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(
    ['node', str(ROOT / 'scripts/export-cv-data.mjs')], cwd=ROOT, text=True,
))
profile = data['profile']
updated = datetime.now(ZoneInfo('Asia/Taipei')).date().isoformat()
output_dir = ROOT / 'public/static/files'
output_dir.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor('#26313c')
MUTED = colors.HexColor('#58616b')
BRICK = colors.HexColor('#93442f')
RULE = colors.HexColor('#d5cabe')
system_fonts = Path('/System/Library/Fonts/Supplemental')
sans = 'Helvetica'
sans_bold = 'Helvetica-Bold'
if (system_fonts / 'Arial.ttf').exists() and (system_fonts / 'Arial Bold.ttf').exists():
    pdfmetrics.registerFont(TTFont('CVSans', str(system_fonts / 'Arial.ttf')))
    pdfmetrics.registerFont(TTFont('CVSansBold', str(system_fonts / 'Arial Bold.ttf')))
    sans, sans_bold = 'CVSans', 'CVSansBold'

# Chinese runs inside the English CV (the native name, Chinese co-author names).
chinese_font = Path(os.environ.get('CV_CJK_FONT', system_fonts / 'Arial Unicode.ttf'))
if chinese_font.exists():
    pdfmetrics.registerFont(TTFont('CVChineseFont', str(chinese_font)))
    chinese = 'CVChineseFont'
else:
    pdfmetrics.registerFont(UnicodeCIDFont('MSung-Light'))
    chinese = 'MSung-Light'


def register_zh_fonts():
    """Register a Traditional Chinese font family (regular + bold) for the Chinese CV."""
    font_dirs = [Path.home() / 'Library/Fonts', Path('/Library/Fonts'), system_fonts,
                 Path('/usr/share/fonts/truetype/noto'), Path('/usr/share/fonts/noto')]
    candidates = []
    if os.environ.get('CV_ZH_FONT'):
        regular = Path(os.environ['CV_ZH_FONT'])
        candidates.append((regular, Path(os.environ.get('CV_ZH_BOLD_FONT', regular)), 0))
    candidates += [(d / 'NotoSansTC-Regular.ttf', d / 'NotoSansTC-Bold.ttf', 0) for d in font_dirs]
    candidates.append((Path('/System/Library/Fonts/STHeiti Light.ttc'),
                       Path('/System/Library/Fonts/STHeiti Medium.ttc'), 0))
    for regular, bold, index in candidates:
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont('CVZhSans', str(regular), subfontIndex=index))
            pdfmetrics.registerFont(TTFont('CVZhSansBold', str(bold), subfontIndex=index))
            pdfmetrics.registerFontFamily('CVZhSans', normal='CVZhSans', bold='CVZhSansBold',
                                          italic='CVZhSans', boldItalic='CVZhSansBold')
            return 'CVZhSans', 'CVZhSansBold'
    print('warning: no Traditional Chinese font with a bold weight found; '
          'the Chinese CV uses MSung-Light without bold', file=sys.stderr)
    pdfmetrics.registerFont(UnicodeCIDFont('MSung-Light'))
    return 'MSung-Light', 'MSung-Light'


zh_sans, zh_bold = register_zh_fonts()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle('CVBody', fontName=sans, fontSize=9.5,
                          leading=13, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle('CVTitle', parent=styles['CVBody'], fontName=sans_bold,
                          fontSize=10, leading=13, spaceAfter=1))
styles.add(ParagraphStyle('CVDate', parent=styles['CVBody'], fontSize=8,
                          leading=11, alignment=TA_RIGHT, textColor=MUTED))
styles.add(ParagraphStyle('CVSection', parent=styles['CVBody'], fontName=sans_bold,
                          fontSize=11.5, leading=15, textColor=BRICK, spaceBefore=9,
                          spaceAfter=7, keepWithNext=True))
styles.add(ParagraphStyle('CVName', parent=styles['CVBody'], fontName=sans_bold,
                          fontSize=23, leading=27, spaceAfter=4))
styles.add(ParagraphStyle('CVChinese', parent=styles['CVBody'], fontName=chinese,
                          fontSize=12, leading=17))

# Chinese CV: the same layout set in the CJK font, with line breaks allowed between characters
# and slightly more leading for Han text.
styles.add(ParagraphStyle('ZhBody', parent=styles['CVBody'], fontName=zh_sans,
                          leading=14.5, wordWrap='CJK'))
styles.add(ParagraphStyle('ZhTitle', parent=styles['ZhBody'], fontName=zh_bold,
                          fontSize=10, leading=14, spaceAfter=1))
styles.add(ParagraphStyle('ZhDate', parent=styles['ZhBody'], fontSize=8,
                          leading=11.5, alignment=TA_RIGHT, textColor=MUTED))
styles.add(ParagraphStyle('ZhSection', parent=styles['ZhBody'], fontName=zh_bold,
                          fontSize=12, leading=16, textColor=BRICK, spaceBefore=9,
                          spaceAfter=7, keepWithNext=True))
styles.add(ParagraphStyle('ZhName', parent=styles['ZhBody'], fontName=zh_bold,
                          fontSize=23, leading=29, spaceAfter=3))
styles.add(ParagraphStyle('ZhLatinName', parent=styles['CVBody'], fontName=sans,
                          fontSize=12, leading=17))


def text_en(value):
    replacements = {'–': '-', '—': '-', '−': '-', '’': "'", '‘': "'", '“': '"', '”': '"'}
    for source, target in replacements.items():
        value = value.replace(source, target)
    return escape(value)


def mixed_en(value):
    """Escape text and set runs of Chinese characters in the Chinese font."""
    return re.sub(r'[　-〿一-鿿＀-￯]+',
                  lambda match: f'<font name="{chinese}">{match.group(0)}</font>', text_en(value))


def text_zh(value):
    """Escape text, keeping the data's full-width punctuation as written.

    CJK fonts draw curly quotes and the middle dot full-width, which opens gaps inside
    Latin text ("What’ s", "EA ’25"), so those are set in the Latin font.
    """
    return re.sub(r'[‘’“”·]+', lambda match: f'<font name="{sans}">{match.group(0)}</font>',
                  escape(value))


LOCALES = {
    'en': {
        'output': output_dir / 'chien-yin-wu-cv.pdf',
        'text': text_en,
        'mixed': mixed_en,
        'style': {'body': 'CVBody', 'title': 'CVTitle', 'date': 'CVDate', 'section': 'CVSection'},
        'doc': {'title': f"{profile['author']} - Academic CV", 'author': profile['author'],
                'subject': 'Human-computer interaction, human-centered AI, and cross-cultural communication'},
        'academic': data['academic'],
        'projects': data['projects'],
    },
    'zh': {
        'output': output_dir / 'chien-yin-wu-cv-zh.pdf',
        'text': text_zh,
        'mixed': text_zh,
        'style': {'body': 'ZhBody', 'title': 'ZhTitle', 'date': 'ZhDate', 'section': 'ZhSection'},
        'doc': {'title': f"{profile['nativeName']} {profile['author']} - 學術履歷",
                'author': f"{profile['nativeName']} {profile['author']}",
                'subject': '人機互動、以人為本的 AI、跨文化溝通', 'lang': 'zh-Hant-TW'},
        'academic': data['zh']['academic'],
        'projects': data['zh']['projects'],
    },
}


def link(url, label, text):
    return f'<link href="{escape(url, {chr(34): "&quot;"})}" color="#93442f">{text(label)}</link>'


def build(locale):
    config = LOCALES[locale]
    text, mixed, style = config['text'], config['mixed'], config['style']
    academic, projects = config['academic'], config['projects']
    output = config['output']
    temporary_output = output.with_suffix('.tmp.pdf')
    doc = SimpleDocTemplate(str(temporary_output), pagesize=A4, leftMargin=43, rightMargin=43,
                            topMargin=43, bottomMargin=43, **config['doc'])
    story = []

    def paragraph(value, style_name=style['body']):
        return Paragraph(value, styles[style_name])

    def entry(item):
        title = Table([[paragraph(text(item['title']), style['title']),
                        paragraph(text(item['date']), style['date'])]],
                      colWidths=[doc.width - 12 - 175, 175])
        title.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        parts = [title]
        if item.get('organization'):
            parts.append(paragraph(text(item['organization'])))
        if item.get('description'):
            parts.append(paragraph(text(item['description'])))
        if item.get('contribution'):
            parts.append(paragraph(text(item['contribution'])))
        parts.append(Spacer(1, 4))
        return KeepTogether(parts)

    def heading(title):
        story.append(paragraph(text(title), style['section']))

    def section(title, entries):
        heading(title)
        story.extend(entry(item) for item in entries)

    if locale == 'en':
        def footer(canvas, document):
            canvas.saveState()
            canvas.setStrokeColor(RULE)
            canvas.line(43, 31, A4[0] - 43, 31)
            canvas.setFillColor(MUTED)
            canvas.setFont(sans, 8)
            canvas.drawString(43, 18, f"{profile['author']} | Updated {updated}")
            canvas.drawRightString(A4[0] - 43, 18, str(document.page))
            canvas.restoreState()

        story.append(paragraph(text(profile['author']), 'CVName'))
        story.append(paragraph(profile['nativeName'], 'CVChinese'))
        story.append(paragraph('Human-computer interaction | Human-centered AI | Cross-cultural communication'))
        separator = ' | '
        labels = {
            'education': 'Education', 'publications': 'Publications &amp; demonstrations',
            'research': 'Research experience', 'experience': 'Experience & service',
            'work': 'Work experience', 'teaching': 'Teaching',
            'leadership': 'Leadership & service', 'projects': 'Projects',
            'awards': 'Honors & awards', 'skills': 'Skills & languages',
        }
    else:
        def footer(canvas, document):
            canvas.saveState()
            canvas.setStrokeColor(RULE)
            canvas.line(43, 31, A4[0] - 43, 31)
            canvas.setFillColor(MUTED)
            canvas.setFont(zh_sans, 8)
            canvas.drawString(43, 18, f"{profile['nativeName']} {profile['author']}｜更新於 {updated}")
            canvas.drawRightString(A4[0] - 43, 18, f'第 {document.page} 頁')
            canvas.restoreState()

        story.append(paragraph(text(profile['nativeName']), 'ZhName'))
        story.append(paragraph(text(profile['author']), 'ZhLatinName'))
        story.append(paragraph('人機互動｜以人為本的 AI｜跨文化溝通'))
        separator = '｜'
        labels = {
            'education': '學歷', 'publications': '著作與展示', 'research': '研究經歷',
            'experience': '經歷與服務', 'work': '工作經歷', 'teaching': '教學',
            'leadership': '領導與服務', 'projects': '專案', 'awards': '榮譽與獎項',
            'skills': '技能與語言',
        }

    story.append(paragraph(separator.join([
        link(f"mailto:{profile['email']}", profile['email'], text),
        link(profile['siteUrl'], 'chienyinwu.com', text),
        link(profile['orcid'], 'ORCID', text),
    ])))

    section(labels['education'], academic['education'])
    if locale == 'en':
        # Written pre-escaped; kept as is so the English layout does not change.
        story.append(paragraph(labels['publications'], style['section']))
    else:
        heading(labels['publications'])
    self_names = {academic['selfName'], profile['nativeName']} if locale == 'zh' else {academic['selfName']}
    for paper in academic['publications']:
        names = [f'<b>{mixed(name)}</b>' if name in self_names else mixed(name)
                 for name in paper['authors']]
        venue = mixed(paper['venue'])
        if locale == 'en':
            lines = [paragraph(f"{', '.join(names)}. {text(paper['year'])}. {mixed(paper['title'])}.")]
            for item in paper.get('links', []):
                if 'doi.org' in item['href']:
                    venue += '. ' + link(item['href'], 'DOI: ' + item['href'].split('doi.org/')[1], text)
            lines.append(paragraph(venue))
            if paper.get('role'):
                lines.append(paragraph('Role: ' + text(paper['role'])))
        else:
            lines = [paragraph(f"{'、'.join(names)}（{text(paper['year'])}）。{text(paper['title'])}。")]
            for item in paper.get('links', []):
                if 'doi.org' in item['href']:
                    venue += '。' + link(item['href'], 'DOI：' + item['href'].split('doi.org/')[1], text)
            lines.append(paragraph(venue))
            if paper.get('role'):
                lines.append(paragraph('角色：' + text(paper['role'])))
        lines.append(Spacer(1, 4))
        story.append(KeepTogether(lines))
    section(labels['research'], academic['researchExperience'])

    heading(labels['experience'])
    section(labels['work'], academic['workExperience'])
    section(labels['teaching'], academic['teachingExperience'])
    section(labels['leadership'], academic['leadershipExperience'])

    heading(labels['projects'])
    story.extend(entry(item) for item in projects)
    section(labels['awards'], academic['awards'])
    heading(labels['skills'])
    colon = ':</b> ' if locale == 'en' else '：</b>'
    for item in academic['skills']:
        story.append(paragraph(f"<b>{text(item['title'])}{colon}{text(item['description'])}"))
        story.append(Spacer(1, 2))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    temporary_output.replace(output)
    print(output)


for locale in LOCALES:
    build(locale)
