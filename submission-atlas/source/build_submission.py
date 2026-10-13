"""Generate editable PPTX, a self-contained slide viewer, diagrams, Word and PDF-ready text.
Run from the repository root: python3 submission-atlas/source/build_submission.py
PDF and screenshot export: node submission-atlas/source/export.mjs
"""
from pathlib import Path
from html import escape
import json, re
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR
from pptx.oxml.xmlchemy import OxmlElement as PptElement
from docx import Document
from docx.shared import Inches as DocInches, Pt as DocPt
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
PAPER, INK, MUTED, LINE, LIME = '#F6F5EF', '#263D32', '#657369', '#D7DACF', '#DEF19F'
SANS, SERIF = 'Noto Sans CJK KR', 'Georgia'

def svg_text(x, y, text, size=23, color=INK, anchor='start', weight=400):
    lines = text.split('\n')
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">' + ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else size * 1.5}">{escape(line)}</tspan>' for i, line in enumerate(lines)) + '</text>'

def svg_box(x,y,w,h,fill='#FBFBF8',stroke=LINE,rx=8):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'

def arrow(x1,y1,x2,y2):
    return f'<path d="M{x1} {y1} L{x2} {y2}" stroke="#7D8F7D" stroke-width="2" fill="none" marker-end="url(#a)"/>'

def save_svg(name, body, w=1400,h=700):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#7D8F7D"/></marker></defs><style>text{{font-family:Arial,"Noto Sans CJK KR",sans-serif}}</style><rect width="100%" height="100%" fill="{PAPER}"/>{body}</svg>'
    (ASSETS / f'{name}.svg').write_text(svg)

def diagrams():
    from atlas_content import make_diagrams
    make_diagrams(globals())

slides=[]
def slide(kicker,title,subtitle='',dark=False,notes=''):
    s={'kicker':kicker,'title':title,'subtitle':subtitle,'dark':dark,'notes':notes,'elements':[]};slides.append(s)
    return s
def text(s,x,y,w,h,t,size=28,color=INK,font=SANS,bold=False,italic=False,href=None):
    s['elements'].append(dict(kind='text',x=x,y=y,w=w,h=h,text=t,size=size,color=color,font=font,bold=bold,italic=italic,href=href))
def rect(s,x,y,w,h,fill,stroke=None,radius=False):s['elements'].append(dict(kind='rect',x=x,y=y,w=w,h=h,fill=fill,stroke=stroke,radius=radius))
def image(s,x,y,w,h,path):s['elements'].append(dict(kind='image',x=x,y=y,w=w,h=h,path=path))
def card(s,x,y,w,h,k,title,body,fill='#ECEFE3'):
    rect(s,x,y,w,h,fill,radius=True);text(s,x+27,y+25,w-54,35,k,18,MUTED);text(s,x+27,y+80,w-54,95,title,34);text(s,x+27,y+192,w-54,h-205,body,25)

def make_slides():
    from atlas_content import make_deck
    make_deck(globals())

def export_slides():
    prs=Presentation();prs.slide_width=Inches(13.333333);prs.slide_height=Inches(7.5)
    html=[]
    for index,s in enumerate(slides,1):
        page=prs.slides.add_slide(prs.slide_layouts[6]);bg=page.background.fill;bg.solid();bg.fore_color.rgb=RGBColor.from_string(PAPER[1:])
        els=[dict(kind='text',x=80,y=45,w=1350,h=38,text=s['kicker'],size=16,color=MUTED,font=SANS,bold=False,italic=False,href=None)]
        if s['title']:els += [dict(kind='text',x=80,y=111,w=1440,h=85,text=s['title'],size=49,color=INK,font=SANS,bold=False,italic=False,href=None)]
        if s['subtitle']:els += [dict(kind='text',x=83,y=205,w=1430,h=43,text=s['subtitle'],size=23,color=MUTED,font=SANS,bold=False,italic=False,href=None)]
        els+=s['elements'];els += [dict(kind='rect',x=80,y=855,w=1440,h=1,fill=LINE,stroke=None,radius=False),dict(kind='text',x=82,y=869,w=1280,h=23,text='THE SCENT ATLAS / MIDTERM DESIGN PRESENTATION',size=12,color=MUTED,font=SANS,bold=False,italic=False,href=None),dict(kind='text',x=1458,y=866,w=60,h=28,text=f'{index:02d}',size=16,color=MUTED,font=SANS,bold=False,italic=False,href=None)]
        parts=[]
        for e in els:
            x,y,w,h=[e[k] for k in ('x','y','w','h')];style=f'left:{x}px;top:{y}px;width:{w}px;height:{h}px;'
            if e['kind']=='rect':
                shape=page.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if e['radius'] else MSO_SHAPE.RECTANGLE,Inches(x/120),Inches(y/120),Inches(w/120),Inches(h/120));shape.fill.solid();shape.fill.fore_color.rgb=RGBColor.from_string(e['fill'][1:]);shape.line.fill.background()
                shape._element.spPr.append(PptElement('a:effectLst'))
                if e['stroke']:shape.line.color.rgb=RGBColor.from_string(e['stroke'][1:]);shape.line.width=Pt(.6)
                if e['radius']:
                    try:shape.adjustments[0]=.03
                    except Exception:pass
                parts.append(f'<div class="el" style="{style}background:{e["fill"]};border:{"1px solid "+e["stroke"] if e["stroke"] else "0"};border-radius:{"8px" if e["radius"] else "0"}"></div>')
            elif e['kind']=='image':
                # The entire image is placed without editing/cropping the generated mood board.
                from PIL import Image
                path=ROOT/e['path']; iw,ih=Image.open(path).size;scale=min(w/iw,h/ih);pw,ph=iw*scale,ih*scale
                page.shapes.add_picture(str(path),Inches((x+(w-pw)/2)/120),Inches((y+(h-ph)/2)/120),width=Inches(pw/120),height=Inches(ph/120))
                parts.append(f'<img class="el" src="{escape(e["path"])}" alt="{escape(Path(e["path"]).stem)}" style="{style}object-fit:contain"/>')
            else:
                tb=page.shapes.add_textbox(Inches(x/120),Inches(y/120),Inches(w/120),Inches(h/120));tf=tb.text_frame;tf.clear();tf.word_wrap=True;tf.margin_left=0;tf.margin_right=0;tf.margin_top=0;tf.margin_bottom=0;tf.vertical_anchor=MSO_ANCHOR.TOP
                for i,line in enumerate(e['text'].split('\n')):
                    p=tf.paragraphs[0] if i==0 else tf.add_paragraph();p.line_spacing=1.3;p.space_after=Pt(0);r=p.add_run();r.text=line;r.font.name=e['font'];r.font.size=Pt(e['size']*.6);r.font.bold=e['bold'];r.font.italic=e['italic'];r.font.color.rgb=RGBColor.from_string(e['color'][1:]);r._r.get_or_add_rPr().set('lang','ko-KR')
                    if e.get('href'):r.hyperlink.address=e['href']
                txt=escape(e['text']).replace('\n','<br>');txt=f'<a href="{escape(e["href"])}" target="_blank" rel="noopener">{txt}</a>' if e.get('href') else txt
                parts.append(f'<div class="el txt" style="{style}font-size:{e["size"]}px;color:{e["color"]};font-family:{escape(e["font"])},serif;font-weight:{600 if e["bold"] else 400};font-style:{"italic" if e["italic"] else "normal"}">{txt}</div>')
        page.notes_slide.notes_text_frame.text=s['notes']
        html.append(f'<section class="slide" aria-label="슬라이드 {index}">{"".join(parts)}</section>')
    prs.save(ROOT/'The-Scent-Atlas.pptx')
    (ROOT/'slide-content.json').write_text(json.dumps(slides,ensure_ascii=False,indent=2))
    css='''*{box-sizing:border-box}body{margin:0;background:#202d25;font-family:"Noto Sans CJK KR",sans-serif}.slide{position:absolute;width:1600px;height:900px;background:#F6F5EF;transform-origin:top left;display:none;overflow:hidden}.slide.active{display:block}.el{position:absolute}.txt{line-height:1.3;white-space:normal;word-break:keep-all;overflow:visible}a{color:inherit;text-decoration:none}#stage{margin:auto;position:relative}.controls{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);padding:7px 15px;background:#263d32e8;color:#f6f5ef;border-radius:25px;display:flex;gap:14px;align-items:center;font-size:12px}.controls button{background:none;color:inherit;border:0;cursor:pointer;padding:6px;font:inherit}.controls button:focus-visible{outline:2px solid #def19f}.controls span{min-width:75px;text-align:center}@page{size:1600px 900px;margin:0}@media print{body{background:white}#stage{width:1600px!important;height:auto!important}.slide{display:block!important;position:relative;transform:none!important;break-after:page;page-break-after:always}.slide:last-child{break-after:auto;page-break-after:auto}.controls{display:none}}'''
    js='''const ss=[...document.querySelectorAll('.slide')];let i=0;function resize(){const scale=Math.min(innerWidth/1600,(innerHeight-25)/900);ss.forEach(s=>s.style.transform=`scale(${scale})`);document.querySelector('#stage').style.width=(1600*scale)+'px';document.querySelector('#stage').style.height=(900*scale)+'px'}function show(n){i=Math.max(0,Math.min(ss.length-1,n));ss.forEach((s,j)=>s.classList.toggle('active',j===i));document.querySelector('#count').textContent=(i+1)+' / '+ss.length;location.hash='slide-'+(i+1)}document.querySelector('#previous').onclick=()=>show(i-1);document.querySelector('#next').onclick=()=>show(i+1);document.querySelector('#print').onclick=()=>print();addEventListener('resize',resize);addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(i+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1)}if(e.key==='Home')show(0);if(e.key==='End')show(ss.length-1)});resize();const n=parseInt(location.hash.replace('#slide-',''));show(Number.isFinite(n)?n-1:0);window.deckReady=true;'''
    (ROOT/'presentation.html').write_text('<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Scent Atlas — Midterm Presentation</title><style>'+css+'</style></head><body><main id="stage">'+''.join(html)+'</main><nav class="controls" aria-label="슬라이드 조작"><button id="previous" aria-label="이전 슬라이드">←</button><span id="count"></span><button id="next" aria-label="다음 슬라이드">→</button><button id="print">PDF / Print</button></nav><script>'+js+'</script></body></html>')
    notes=['# 발표자 노트 — 약 5–6분','', '본 발표는 1–16장 중심으로 진행하고 17–21장은 부록으로 사용합니다. 14장에서 지도와 내부 비교를 시연합니다.','']
    for i,s in enumerate(slides,1):notes += [f'## {i:02d}. {s["title"] or "The Scent Atlas"}',s['notes'],'']
    (ROOT/'SPEAKER-NOTES.md').write_text('\n'.join(notes))

def inline(t):
    t=escape(t);t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t);t=re.sub(r'`(.+?)`',r'<code>\1</code>',t);t=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<a href="\2">\1</a>',t);return t

def proposal_exports():
    lines=(ROOT/'PROJECT-PROPOSAL.md').read_text().splitlines();parts=[];in_table=False;in_pre=False
    doc=Document();sec=doc.sections[0];sec.top_margin=DocInches(.75);sec.bottom_margin=DocInches(.75);sec.left_margin=DocInches(.85);sec.right_margin=DocInches(.85)
    for style in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3']:
        st=doc.styles[style];st.font.name=SANS;st._element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),SANS);st.font.color.rgb=__import__('docx').shared.RGBColor.from_string(INK[1:])
    doc.styles['Normal'].font.size=DocPt(10);doc.styles['Normal'].paragraph_format.line_spacing=1.45;doc.styles['Normal'].paragraph_format.space_after=DocPt(7)
    footer=sec.footer.paragraphs[0];footer.text='THE SCENT ATLAS / MIDTERM DESIGN PROPOSAL';footer.style='Caption'
    table_rows=[]
    def flush_table():
        nonlocal table_rows
        if table_rows:
            table=doc.add_table(rows=0,cols=len(table_rows[0]));table.style='Light Shading Accent 1'
            for row in table_rows:
                cells=table.add_row().cells
                for cell,t in zip(cells,row):cell.text=t
            table_rows=[]
    for line in lines:
        if line.startswith('```'):
            if in_pre:parts.append('</pre>')
            else:parts.append('<pre>')
            in_pre=not in_pre;continue
        if in_pre:parts.append(escape(line)+'\n');doc.add_paragraph(line,style='No Spacing');continue
        if line.startswith('|'):
            cols=[x.strip() for x in line.strip('|').split('|')]
            if all(re.fullmatch(r'[- :]+',x) for x in cols):continue
            if not in_table:parts.append('<table>');in_table=True
            parts.append('<tr>'+''.join('<td>'+inline(x)+'</td>' for x in cols)+'</tr>');table_rows.append(cols);continue
        if in_table:parts.append('</table>');in_table=False;flush_table()
        if not line.strip():continue
        if line.startswith('!['):
            m=re.search(r'!\[([^\]]*)\]\(([^)]+)\)',line)
            if m:parts.append(f'<figure><img src="{escape(m[2])}" alt="{escape(m[1])}"><figcaption>자체 생성 시각 자료 / 감각의 비유</figcaption></figure>');doc.add_picture(str(ROOT/m[2]),width=DocInches(6.0))
            continue
        match=re.match(r'^(#{1,3}) (.+)',line)
        if match:
            level=len(match[1]);parts.append(f'<h{level}>{inline(match[2])}</h{level}>');doc.add_heading(match[2],level=0 if level==1 else level-1);continue
        clean=re.sub(r'\*\*|`','',line);clean=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'\1 (\2)',clean)
        if line.startswith('- '):parts.append('<p class="item">'+inline(line[2:])+'</p>');doc.add_paragraph(clean[2:],style='List Bullet')
        elif re.match(r'^\d+\. ',line):parts.append('<p class="item">'+inline(line)+'</p>');doc.add_paragraph(clean)
        else:parts.append('<p>'+inline(line)+'</p>');doc.add_paragraph(clean)
    if in_table:parts.append('</table>');flush_table()
    doc.core_properties.title='The Scent Atlas — 프로젝트 기획안';doc.core_properties.subject='Week 06 Midterm Design Presentation';doc.save(ROOT/'Project-Proposal.docx')
    css='''@page{size:A4;margin:18mm 19mm 20mm}body{font-family:"Noto Sans CJK KR",Arial,sans-serif;color:#263d32;font-size:10.5pt;line-height:1.8;margin:0}h1{font-family:Georgia,serif;font-size:36pt;line-height:1.1;letter-spacing:-1px;margin:0 0 8pt}h2{font-size:19pt;line-height:1.4;margin:28pt 0 12pt;break-after:avoid}h3{font-size:12pt;color:#657369;margin:8pt 0 23pt}p{margin:0 0 10pt;word-break:keep-all;orphans:3;widows:3}table{width:100%;border-collapse:collapse;font-size:8.8pt;margin:12pt 0 16pt;break-inside:auto}tr{break-inside:avoid}td{border-bottom:1px solid #d7dacf;padding:8pt 7pt;vertical-align:top}tr:first-child{background:#eaf0dc;font-weight:600}figure{margin:18pt 0;break-inside:avoid}figure img{width:100%;height:auto}figcaption{font-size:8pt;color:#657369;margin-top:6pt}.item{padding-left:12pt;border-left:2px solid #e0e6d5}pre{font-family:"Noto Sans Mono CJK KR",monospace;font-size:9pt;line-height:1.6;white-space:pre-wrap;background:#f1f2eb;padding:15pt;break-inside:avoid}a{color:#385447;text-decoration:underline}code{font-family:inherit;background:#edf0e4;padding:1pt 3pt}strong{font-weight:600}'''
    (ROOT/'project-proposal.html').write_text('<!doctype html><html lang="ko"><head><meta charset="UTF-8"><title>The Scent Atlas — Project Proposal</title><style>'+css+'</style></head><body>'+''.join(parts)+'</body></html>')

if __name__=='__main__':
    diagrams();make_slides();proposal_exports()
    # Slide export runs after SVGs are rendered by export.mjs.
    if all((ASSETS/f'{n}.png').exists() for n in ['sitemap','user-flow','wireframe-desktop','wireframe-expansion','wireframe-compare','wireframe-responsive']) and (ASSETS/'atlas-woody.png').exists():
        export_slides();print('Generated 21-slide PPTX, HTML viewer, Word proposal and source documents.')
    else:print('Diagram sources and Word proposal generated. Run node submission-atlas/source/export.mjs to complete rendering.')
