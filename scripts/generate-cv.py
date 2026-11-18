"""Generate the public CV from the same data used by the website.

Requires Node.js, the installed project packages, and Python's reportlab package.
Run from any directory: python3 scripts/generate-cv.py
"""

import json
import os
import re
import subprocess
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
    KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(
    ['node', str(ROOT / 'scripts/export-cv-data.mjs')], cwd=ROOT, text=True,
))
academic = data['academic']
profile = data['profile']
updated = datetime.now(ZoneInfo('Asia/Taipei')).date().isoformat()
output = ROOT / 'public/static/files/chien-yin-wu-cv.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
temporary_output = output.with_suffix('.tmp.pdf')

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

chinese_font = Path(os.environ.get('CV_CJK_FONT', system_fonts / 'Arial Unicode.ttf'))
if chinese_font.exists():
    pdfmetrics.registerFont(TTFont('CVChineseFont', str(chinese_font)))
    chinese = 'CVChineseFont'
else:
    pdfmetrics.registerFont(UnicodeCIDFont('MSung-Light'))
    chinese = 'MSung-Light'

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

doc = SimpleDocTemplate(str(temporary_output), pagesize=A4, leftMargin=43, rightMargin=43,
                        topMargin=43, bottomMargin=43,
                        title=f"{profile['author']} - Academic CV", author=profile['author'],
                        subject='Human-computer interaction, human-centered AI, and cross-cultural communication')
story = []


def text(value):
    replacements = {'–': '-', '—': '-', '−': '-', '’': "'", '‘': "'", '“': '"', '”': '"'}
    for source, target in replacements.items():
        value = value.replace(source, target)
    return escape(value)


def mixed(value):
    """Escape text and set runs of Chinese characters in the Chinese font."""
    return re.sub(r'[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+',
                  lambda match: f'<font name="{chinese}">{match.group(0)}</font>', text(value))


def paragraph(value, style='CVBody'):
    return Paragraph(value, styles[style])


def link(url, label):
    return f'<link href="{escape(url, {chr(34): "&quot;"})}" color="#93442f">{text(label)}</link>'


def entry(item):
    title = Table([[paragraph(text(item['title']), 'CVTitle'),
                    paragraph(text(item['date']), 'CVDate')]],
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


def section(title, entries):
    story.append(paragraph(text(title), 'CVSection'))
    story.extend(entry(item) for item in entries)


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
story.append(paragraph(' | '.join([
    link(f"mailto:{profile['email']}", profile['email']),
    link(profile['siteUrl'], 'chienyinwu.com'),
    link(profile['orcid'], 'ORCID'),
])))

section('Education', academic['education'])
story.append(paragraph('Publications', 'CVSection'))
for paper in academic['publications']:
    authors = ', '.join(
        f'<b>{mixed(name)}</b>' if name == academic['selfName'] else mixed(name)
        for name in paper['authors']
    )
    lines = [paragraph(f"{authors}. {text(paper['year'])}. {mixed(paper['title'])}.")]
    venue = mixed(paper['venue'])
    for item in paper.get('links', []):
        if 'doi.org' in item['href']:
            venue += '. ' + link(item['href'], 'DOI: ' + item['href'].split('doi.org/')[1])
    lines.append(paragraph(venue))
    if paper.get('role'):
        lines.append(paragraph('Role: ' + text(paper['role'])))
    lines.append(Spacer(1, 4))
    story.append(KeepTogether(lines))
section('Research experience', academic['researchExperience'])

story.append(PageBreak())
story.append(paragraph('Experience & service', 'CVSection'))
section('Work experience', academic['workExperience'])
section('Teaching', academic['teachingExperience'])
section('Leadership & service', academic['leadershipExperience'])

story.append(PageBreak())
story.append(paragraph('Projects', 'CVSection'))
story.extend(entry(item) for item in data['projects'])
section('Honors & awards', academic['awards'])
story.append(paragraph('Skills & languages', 'CVSection'))
for item in academic['skills']:
    story.append(KeepTogether([
        paragraph(text(item['title']), 'CVTitle'),
        paragraph(text(item['description'])),
        Spacer(1, 3),
    ]))

doc.build(story, onFirstPage=footer, onLaterPages=footer)
temporary_output.replace(output)
print(output)
