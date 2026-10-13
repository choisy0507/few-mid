from pathlib import Path
import re, base64
root=Path(__file__).resolve().parents[2]
out=root/'submission-atlas/prototype';out.mkdir(exist_ok=True)
html=(root/'index.html').read_text();css=(root/'src/style.css').read_text()
css=re.sub(r'^@import[^;]+;\s*','',css,flags=re.M)
faces=[]
for weight in [400,500,600,700]:
 p=root/f'node_modules/@fontsource/dm-sans/files/dm-sans-latin-{weight}-normal.woff2'
 faces.append('@font-face{font-family:"DM Sans";font-style:normal;font-weight:'+str(weight)+';font-display:swap;src:url(data:font/woff2;base64,'+base64.b64encode(p.read_bytes()).decode()+') format("woff2")}')
html=re.sub(r'<link\s+rel="stylesheet"[^>]*>',lambda m:'<style>'+''.join(faces)+css+'</style>',html)
html=re.sub(r'<link\s+rel="icon"[^>]*>','',html)
data=(root/'src/data.js').read_text().replace('export const ','const ')
main=(root/'src/main.js').read_text();main=re.sub(r'^import[\s\S]+?from [\"\']\./data.js[\"\'];\s*','',main,count=1)
html=re.sub(r'<script\s+type="module"\s+src="/src/main.js"></script>',lambda m:'<script>'+data+'\n'+main+'</script>',html)
assert 'type="module"' not in html
(out/'index.html').write_text(html)
print('Single-file offline atlas saved:',len(html.encode()),'bytes')
