import {
  concepts, families, relations, get, family, facets, canonical,
  relatedFamilies, contextFor, advanced, comparisons, comparisonFor,
} from './data.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels = {family:'FRAGRANCE FAMILY',note:'NOTE',descriptor:'DESCRIPTOR'};
const ko = {family:'향 계열',note:'노트',descriptor:'감각 표현'};
const images = {
  hero:new URL('./assets/hero.png',import.meta.url).href,
  wood:new URL('./assets/wood.png',import.meta.url).href,
  powder:new URL('./assets/powder.png',import.meta.url).href,
  cream:new URL('./assets/cream.png',import.meta.url).href,
  vanilla:new URL('./assets/vanilla.png',import.meta.url).href,
};
const mark = type => type === 'family' ? '●' : type === 'note' ? '◇' : '○';
let state;

function readState() {
  const p = new URLSearchParams(location.search);
  const view = ['home','learn','atlas'].includes(p.get('view')) ? p.get('view') : 'home';
  let f = family(p.get('family'));
  let c = get(p.get('concept'));
  if (!['family','note','descriptor'].includes(c?.type)) c = null;
  if (c && !f) f = relatedFamilies(c.id)[0] || families[6];
  const origin = get(p.get('from'));
  return {view,family:f?.key || null,concept:c?.id || f?.id || null,from:origin?.type === 'note' ? origin.id : null};
}
function href(view='atlas',key=null,id=null,from=null) {
  const p = new URLSearchParams({view});
  if(key) p.set('family',key);
  if(id) p.set('concept',id);
  if(from) p.set('from',from);
  return '?' + p.toString();
}
function link(text,key,id,cls='chip',from=null,extra='') {
  const c = get(id);
  return `<a class="${cls}" data-route="atlas" data-concept="${esc(id)}" href="${href('atlas',key,id,from)}" ${extra}><span aria-hidden="true">${mark(c.type)}</span><span>${esc(text)}</span></a>`;
}
function image(c,cls='',caption=true) {
  if (c.imageKey) return `<figure class="sensory-image ${cls}"><img src="${images[c.imageKey]}" alt="${esc(c.name)}를 상상하기 위한 감각적 이미지" ${cls==='hero-image'?'fetchpriority="high"':'loading="lazy"'}>${caption?'<figcaption>EDITORIAL INTERPRETATION / 감각의 비유</figcaption>':''}</figure>`;
  return `<figure class="sensory-image asset-placeholder ${cls}" aria-label="${esc(c.name)} 이미지 준비 중"><div class="placeholder-shape ${c.type}"></div><span class="placeholder-name">${esc(c.name)}</span><figcaption>IMAGE STUDY / ${c.type==='note'?'대상과 소재':c.type==='descriptor'?'질감과 감각':'전체적인 분위기'} 이미지 준비 중</figcaption></figure>`;
}
function footer() {
  return `<footer class="footer"><span>THE SCENT ATLAS</span><p>향의 방향, 떠오르는 대상, 느껴지는 방식.<br>이미지는 감각의 비유이며, 연결은 교육용 편집 사례입니다.</p><a data-route="learn" href="${href('learn')}">처음부터 읽기 ↗</a></footer>`;
}
function learnCards() {
  return `<div class="learn-cards">
    <a data-route="atlas" href="${href('atlas','floral')}" class="learn-card">
      <div class="learn-diagram"><div class="diagram-ring"></div><span class="diagram-floral">Floral</span><span class="diagram-rose">Rose</span><span class="diagram-iris">Iris</span><span class="diagram-jasmine">Jasmine</span></div>
      <div class="card-label"><span>01 / FAMILY</span><span>↗</span></div><h3>Which direction?</h3><p>향의 전체적인 방향.<br>Floral은 꽃을 중심으로 읽는 계열입니다.</p>
    </a>
    <a data-route="atlas" href="${href('atlas','floral',canonical('note','Rose'))}" class="learn-card">
      <div class="rose-study"><svg viewBox="0 0 360 230" aria-hidden="true"><g fill="none" stroke="#A87577" stroke-width="1.2"><path d="M180 200Q170 150 184 107M182 150Q146 124 125 143Q148 162 182 150M179 174Q205 144 233 154Q215 180 179 174"/><path d="M184 110C120 107 131 48 160 56C148 22 202 14 209 49C248 26 271 70 241 86C279 114 226 147 208 122C190 153 152 141 156 112C124 133 99 91 128 75"/><path d="M184 110C162 93 151 75 175 67C171 40 212 57 213 71C239 68 231 98 213 105C205 128 177 122 184 110M182 88C177 62 212 66 208 92C194 102 181 96 182 88"/></g></svg><span class="rose-label">ROSE / SCENT IMPRESSION</span></div>
      <div class="card-label"><span>02 / NOTE</span><span>↗</span></div><h3>What comes to mind?</h3><p>떠오르는 구체적인 냄새.<br>Rose는 장미를 연상시키는 노트입니다.</p>
    </a>
    <a data-route="atlas" href="${href('atlas','floral',canonical('descriptor','Powdery'))}" class="learn-card">
      <img class="learn-photo" src="${images.powder}" alt="피부 위의 고운 파우더 입자" loading="lazy">
      <div class="card-label"><span>03 / DESCRIPTOR</span><span>↗</span></div><h3>How does it feel?</h3><p>느껴지는 감각과 질감.<br>Powdery는 가루 같은 보송함을 설명합니다.</p>
    </a>
  </div>`;
}
function home() {
  return `<section class="hero">
    <div class="hero-copy"><p class="eyebrow"><span class="tiny-cross">✦</span> SCENT IS A LANGUAGE. LET’S READ IT.</p><h1>Scent,<br>made <em>visible.</em></h1><p class="hero-description">향의 이름을 넘어, 어떤 느낌인지.<br>계열과 노트, 감각 표현의 연결을 발견하는<br>시각적인 향 안내서.</p><a class="button primary" data-route="atlas" href="${href('atlas')}">Explore the Atlas <span>↗</span></a><a class="text-link" data-route="learn" href="${href('learn')}">처음이라면, 세 가지 개념부터 ↓</a><div class="hero-index"><span>08 FAMILIES</span><span>NOTES & FEELINGS</span><span>ONE CONNECTED ATLAS</span></div></div>
    <div class="hero-art"><img src="${images.hero}" alt="물의 굴절과 투명한 소재를 이용한 새로운 뷰티 에디토리얼 이미지" fetchpriority="high"><div class="image-corner">FIG. 01 / A DIFFERENT WAY TO SENSE</div><div class="image-caption"><span>LOOK A LITTLE CLOSER.</span><span>감각을 읽는 새로운 방법</span></div></div>
  </section>
  <section class="learn-section"><div class="section-heading"><p class="eyebrow">01 / BEFORE YOU EXPLORE</p><h2>Three questions.<br><em>A clearer picture.</em></h2><p>Floral, Rose, Powdery.<br>함께 쓰이지만, 같은 종류의 정보는 아니에요.</p></div>${learnCards()}<div class="learn-bottom"><p>노트 하나는 여러 계열과 연결되고, 표현 하나는 여러 노트에서 나타날 수 있어요.</p><a data-route="learn" href="${href('learn')}" class="text-link">관계 읽는 법 더 보기 ↗</a></div></section>
  <section class="curiosity"><p class="eyebrow">FOLLOW ONE QUESTION</p><h2>Woody can feel<br><em>creamy, too.</em></h2><p>같은 나무의 방향이라도,<br>마른 결과 둥근 질감은 어떻게 다를까요?</p><a class="button outline" data-route="atlas" href="${href('atlas','woody',canonical('note','Sandalwood'))}">Sandalwood에서 시작하기 ↗</a><img src="${images.wood}" alt="부드러운 나무와 마른 나뭇결의 에디토리얼 연출" loading="lazy"></section>${footer()}`;
}
function learn() {
  return `<section class="learn-page"><div class="section-heading"><p class="eyebrow">01 / LEARN THE LANGUAGE</p><h1>Three ways<br>to read <em>a scent.</em></h1><p>큰 방향, 떠오르는 대상, 느껴지는 방식.<br>세 가지 질문을 구분하면 향 설명이 더 또렷해집니다.</p></div>${learnCards()}<div class="relationship-example"><p class="eyebrow">A POSSIBLE CONNECTION</p><div>${link('Floral','floral',canonical('family','Floral'),'example-node')}<span class="example-arrow">→</span>${link('Iris','floral',canonical('note','Iris'),'example-node')}<span class="example-arrow">→</span>${link('Powdery','floral',canonical('descriptor','Powdery'),'example-node',canonical('note','Iris'))}</div><p>꽃의 방향 안에서 Iris를 만나고, 보송한 면을 읽는 예시입니다.<br>고정된 분류 단계가 아니며, 모든 꽃 노트가 Powdery하다는 뜻도 아닙니다.</p></div><div class="learn-cta"><p>하나의 단어에서, 다음 궁금증으로.</p><a class="button primary" data-route="atlas" href="${href('atlas')}">Explore the Atlas ↗</a></div></section>${footer()}`;
}
function mapNode(c,cls='',style='') {
  const f = c.type === 'family' ? c.key : state.family;
  const from = c.type === 'descriptor' ? (get(state.concept)?.type === 'note' ? state.concept : state.from) : null;
  return link(c.name,f,c.id,`map-node ${c.type} ${state.concept===c.id?'selected':''} ${cls}`,from,`style="${style}" aria-label="${esc(c.name)} · ${ko[c.type]} 선택" ${state.concept===c.id?'aria-current="true"':''}`);
}
function mapOverview() {
  return `<div class="map-board overview" id="map-board"><svg class="guide-lines" viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="450" cy="280" rx="292" ry="186"/><ellipse cx="450" cy="280" rx="167" ry="105"/><path d="M450 47v466M70 280h760"/></svg><div class="map-center"><span class="eyebrow">FIND YOUR DIRECTION</span><p>Where does<br>your <em>curiosity go?</em></p><span>궁금한 계열 하나를 선택하세요.</span></div>${families.map((f,i)=>{const a=-Math.PI/2+i*Math.PI*2/families.length;return mapNode(f,'',`--x:${50+34*Math.cos(a)}%;--y:${50+34*Math.sin(a)}%;--accent:${f.color}`);}).join('')}</div>`;
}
function mapExpanded(f,c) {
  let notes = [...f.notes];
  if(c.type==='note' && !notes.includes(c.id)) notes.push(c.id);
  const linkedFacets = c.type==='note' ? facets(c.id) : [];
  let descriptors = [...new Set([...f.descriptors,...linkedFacets])];
  if(c.type==='descriptor'&&!descriptors.includes(c.id))descriptors.push(c.id);
  // Positions derive from node count, never from a fixed seven-slot array.
  const positions=new Map([[f.id,[50,44]]]);
  notes.forEach((id,i)=>{const a=-Math.PI/2+i*2*Math.PI/notes.length;positions.set(id,[50+32*Math.cos(a),44+25*Math.sin(a)]);});
  const curve = (a,b,active=false) => `<path class="${active?'active':''}" d="M${a[0]*9} ${a[1]*5.6} Q${(a[0]+b[0])*4.5+8} ${(a[1]+b[1])*2.8-12} ${b[0]*9} ${b[1]*5.6}"/>`;
  const lines = notes.map(id=>curve(positions.get(f.id),positions.get(id),c.type==='family'||c.id===id||(c.type==='descriptor'&&facets(id).includes(c.id)))).join('');
  return `<div class="other-families" aria-label="다른 7개 향 계열">${families.filter(x=>x.id!==f.id).map(x=>mapNode(x,'quiet',`--accent:${x.color}`)).join('')}</div><div class="map-board expanded" id="map-board" style="--accent:${f.color}"><svg class="connection-lines" viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true">${lines}</svg><span class="map-section-label">REPRESENTATIVE NOTES</span>${mapNode(f,'family-center',`--x:50%;--y:44%;--accent:${f.color}`)}${notes.map((id,i)=>{const n=get(id),[x,y]=positions.get(id);const related=c.type==='descriptor'&&facets(id).includes(c.id);return mapNode(n,`${c.type==='descriptor'?(related?'related':'receded'):c.type==='note'&&c.id!==id?'receded':''}`,`--x:${x}%;--y:${y}%;--accent:${f.color}`);}).join('')}<div class="descriptor-shelf"><div class="shelf-label"><span>POSSIBLE DESCRIPTORS</span><span>${c.type==='note'?'이 노트의 관련 표현만 강조됩니다':'노트를 선택하면 관련 표현이 드러납니다'}</span></div><div class="descriptor-nodes">${descriptors.map(id=>mapNode(get(id),c.type==='note'?(linkedFacets.includes(id)?'related':'receded'):'',`--accent:${f.color}`)).join('')}</div></div></div>`;
}
function detail(f,c) {
  if(!c) return `<aside class="detail-panel overview-detail"><p class="eyebrow">A FIELD GUIDE TO FEELING</p><h2>One word.<br><em>Many sensations.</em></h2><img class="overview-photo" src="${images.cream}" alt="고운 크림의 매끈한 질감"><p>먼저 큰 방향을 고르세요.<br>노트와 표현의 작은 차이를 따라가며<br>낯선 향의 언어를 이해해보세요.</p><a class="button outline" data-route="atlas" href="${href('atlas','woody')}">Woody부터 탐색 ↗</a><button class="text-link help-trigger">How to read the Atlas ↗</button></aside>`;
  const caption=ko[c.type];
  const ids = c.type==='family'?c.descriptors:c.type==='note'?facets(c.id):concepts.filter(n=>n.type==='note'&&facets(n.id).includes(c.id)).map(n=>n.id);
  const other = c.type==='family'?[]:relatedFamilies(c.id);
  const notes = c.type==='family'?c.notes:[];
  const secondary = c.type==='family'?relations.filter(e=>e.fromId===f.id&&e.prominence==='secondary'&&['note','descriptor'].includes(get(e.toId)?.type)).map(e=>e.toId):[];
  const context = c.type==='family'?null:contextFor(f.key,c.id);
  const more=advanced(c.id);
  const compare=comparisonFor(c.id);
  const meaning=c.type==='descriptor'?'관련 노트':c.type==='note'?'이렇게 느껴질 수 있어요':'드러날 수 있는 특징';
  const pickFamily=id=>relatedFamilies(id).find(x=>x.key===f.key)?.key||relatedFamilies(id)[0]?.key||f.key;
  return `<aside class="detail-panel" id="concept-detail" style="--accent:${f.color}"><div class="detail-label"><span>${mark(c.type)} ${labels[c.type]}</span><span>${caption}</span></div><h2 class="detail-title" tabindex="-1">${esc(c.name)}</h2>${image(c,'panel-image')}<h3>${esc(c.phrase)}</h3><p class="definition">${esc(c.description)}</p>${c.construction?'<p class="construction-note">여러 향료로 재현한 인상 / 실제 재료의 포함을 뜻하지 않습니다.</p>':''}${context?`<div class="context-note"><span class="eyebrow">WHY HERE / ${esc(f.name.toUpperCase())}</span><p>${esc(context)}</p></div>`:''}${ids.length?`<div class="detail-related"><p class="eyebrow">${meaning}</p><div class="chips">${ids.slice(0,6).map(id=>link(get(id).name,pickFamily(id),id,'chip',get(id).type==='descriptor'&&c.type==='note'?c.id:null)).join('')}</div>${ids.length>6?`<details><summary>연결된 노트 ${ids.length-6}개 더 보기</summary><div class="chips">${ids.slice(6).map(id=>link(get(id).name,pickFamily(id),id)).join('')}</div></details>`:''}</div>`:''}${notes.length?`<div class="detail-related"><p class="eyebrow">REPRESENTATIVE NOTES</p><div class="chips">${notes.map(id=>link(get(id).name,f.key,id)).join('')}</div></div>`:''}${other.length?`<div class="shared-families"><p class="eyebrow">같은 개념, 다른 계열의 맥락</p>${other.map(x=>`<a class="shared-family" data-route="atlas" href="${href('atlas',x.key,c.id,relatedFamilies(state.from).some(y=>y.key===x.key)?state.from:null)}"><span style="background:${x.color}"></span>${esc(x.name)}<span>↗</span></a>`).join('')}</div>`:''}${compare?`<button class="compare-trigger button primary" data-compare="${compare}">${compare==='wood'?'Cedarwood × Sandalwood':compare==='clean'?'Soapy × Powdery':compare==='musk'?'Clean musk × Warm musk':'Dry woody × Creamy woody'} <span>↗</span></button>`:''}${secondary.length?`<details class="advanced"><summary>다른 표현과 보조 연결</summary><p>대표 목록 밖의 맥락에 따른 연결입니다.</p><div class="chips">${[...new Set(secondary)].map(id=>link(get(id).name,f.key,id)).join('')}</div></details>`:''}${more.length?`<details class="advanced"><summary>조합과 실제 향료 알아보기</summary>${more.map(n=>`<article><span class="eyebrow">${n.type==='material'?'MATERIAL / 실제 향료':'ACCORD / 조향 구조'}</span><h4>${esc(n.name)}</h4><p>${esc(n.description)}</p></article>`).join('')}</details>`:''}<details class="source-detail"><summary>콘텐츠 기준과 이미지 안내</summary><p>계열 기준은 The Perfume Society의 8계열을 채택했습니다. 노트·표현 목록은 사용자 제공 교육용 편집안이며, 개별 노트의 감각 연결은 검토가 필요한 편집 설명 사례입니다. 이미지·위치·색은 감각적 비유입니다.</p><a href="https://perfumesociety.org/discover-perfume/an-introduction/fragrance-families/" target="_blank" rel="noopener noreferrer">계열 기준 참고 ↗</a></details></aside>`;
}
function atlas() {
  const f=family(state.family),c=get(state.concept);
  const path=f?`<a data-route="atlas" href="${href('atlas')}">All families</a><span>/</span><a data-route="atlas" href="${href('atlas',f.key)}">${esc(f.name)}</a>${state.from&&state.from!==c?.id?`<span>/</span><a data-route="atlas" href="${href('atlas',f.key,state.from)}">${esc(get(state.from).name)}</a>`:''}${c&&c.id!==f.id?`<span>/</span><span>${esc(c.name)}</span>`:''}`:'<span>전체 8계열에서 시작하세요.</span>';
  return `<section class="atlas-page"><div class="atlas-heading"><div><p class="eyebrow">02 / FOLLOW YOUR CURIOSITY</p><h1>The <em>Atlas.</em></h1></div><p>하나의 향에서,<br>다음 궁금증으로.</p><button class="help-trigger help-control">How to read <span>?</span></button></div><div class="atlas-workspace"><div class="atlas-map"><div class="map-toolbar"><nav class="breadcrumb" aria-label="탐색 경로">${path}</nav><a data-route="atlas" href="${href('atlas')}" class="reset-link">전체 보기 ↺</a></div>${f?mapExpanded(f,c):mapOverview()}<div class="map-legend"><span>● Family</span><span>◇ Note</span><span>○ Descriptor</span><p>선은 관계를 설명합니다. 거리는 유사도 수치가 아닙니다.</p></div></div>${detail(f,c)}</div></section>${footer()}`;
}
function openComparison(key) {
  const c=comparisons[key];if(!c)return;
  const a=get(c.a),b=get(c.b),dialog=$('#compare');
  dialog.innerHTML=`<div class="compare-header"><p class="eyebrow">A CLOSER LOOK / ${esc(family(state.family)?.name||'ATLAS')}</p><button class="close-compare" aria-label="비교를 닫고 같은 지도 선택으로 돌아가기">Back to Atlas ×</button></div><h2 id="compare-title">${esc(c.title)}</h2><p class="compare-intro">${esc(c.subtitle)}</p><div class="comparison-grid"><article><p class="eyebrow">IMPRESSION A</p><h3>${esc(c.aName||a.name)}</h3><img src="${images[c.aImage]}" alt="${esc(c.aTitle)}의 감각적 비유"><h4>${esc(c.aTitle)}</h4></article><div class="comparison-divider" aria-hidden="true">×</div><article><p class="eyebrow">IMPRESSION B</p><h3>${esc(c.bName||b.name)}</h3><img src="${images[c.bImage]}" alt="${esc(c.bTitle)}의 감각적 비유"><h4>${esc(c.bTitle)}</h4></article></div><div class="difference"><span>✦</span><div><p class="eyebrow">THE DIFFERENCE TO NOTICE</p><p>${esc(c.summary)}</p></div></div><div class="trait-tabs" role="tablist" aria-label="구별할 관점">${c.traits.map(([label],i)=>`<button role="tab" id="trait-${i}" aria-controls="trait-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-trait="${i}">${esc(label)}</button>`).join('')}</div><div class="trait-panel" id="trait-panel" role="tabpanel" aria-labelledby="trait-0"></div><p class="comparison-credit">이미지는 감각의 비유입니다. 비교는 설명 사례이며, 수치나 모든 향의 고정된 특성을 나타내지 않습니다.</p>`;
  function trait(i) {
    $('#trait-panel').innerHTML=`<div><span>${esc(c.aName||a.name)}</span><p>${esc(c.traits[i][1])}</p></div><div><span>${esc(c.bName||b.name)}</span><p>${esc(c.traits[i][2])}</p></div>`;
    $('#trait-panel').setAttribute('aria-labelledby',`trait-${i}`);
    dialog.querySelectorAll('[data-trait]').forEach(t=>{t.setAttribute('aria-selected',t.dataset.trait===String(i));t.tabIndex=t.dataset.trait===String(i)?0:-1;});
  }
  trait(0);
  dialog.querySelectorAll('[data-trait]').forEach(t=>t.addEventListener('click',()=>trait(Number(t.dataset.trait))));
  dialog.querySelector('.trait-tabs').addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault();const current=Number(e.target.dataset.trait);const next=e.key==='Home'?0:e.key==='End'?c.traits.length-1:(current+(e.key==='ArrowRight'?1:-1)+c.traits.length)%c.traits.length;
    trait(next);dialog.querySelector(`[data-trait="${next}"]`).focus();
  });
  dialog.querySelector('.close-compare').addEventListener('click',()=>dialog.close());
  dialog.showModal();document.body.classList.add('modal-open');
}
function drawFacetLines() {
  const svg=$('.connection-lines'),board=$('#map-board'),c=get(state.concept);
  if(!svg||!board||!c)return;
  svg.querySelector('.facet-connections')?.remove();
  if(matchMedia('(max-width:760px)').matches||c.type==='family')return;
  const rect=board.getBoundingClientRect();
  const point=id=>{
    const n=[...board.querySelectorAll('.map-node')].find(n=>n.dataset.concept===id);
    if(!n)return null;const r=n.getBoundingClientRect();
    return [(r.x+r.width/2-rect.x)/rect.width*900,(r.y+r.height/2-rect.y)/rect.height*560];
  };
  const ids=c.type==='note'?facets(c.id):[...board.querySelectorAll('.map-node.note')].map(n=>n.dataset.concept).filter(id=>facets(id).includes(c.id));
  const a=point(c.id);if(!a)return;
  const lines=ids.map(id=>point(id)).filter(Boolean).map(b=>`<path class="facet-link" d="M${a[0]} ${a[1]} Q${(a[0]+b[0])/2+24} ${(a[1]+b[1])/2-15} ${b[0]} ${b[1]}"/>`).join('');
  svg.insertAdjacentHTML('beforeend',`<g class="facet-connections">${lines}</g>`);
}
function render() {
  state=readState();
  document.body.dataset.view=state.view;
  $('#app').innerHTML=state.view==='atlas'?atlas():state.view==='learn'?learn():home();
  document.querySelectorAll('.masthead nav a').forEach(a=>a.setAttribute('aria-current',a.dataset.route===state.view?'page':'false'));
  requestAnimationFrame(drawFacetLines);
  document.title=`${state.view==='atlas'&&get(state.concept)?get(state.concept).name+' / ':''}The Scent Atlas`;
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-route]');
  if(a&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&e.button===0){
    e.preventDefault();const old={...state},focus=a.dataset.concept;const url=new URL(a.href);
    history.pushState({},'',url);render();
    if(old.view!==state.view)window.scrollTo({top:0,behavior:'instant'});
    if(focus){const element=[...document.querySelectorAll('.map-node')].find(x=>x.dataset.concept===focus);element?.focus({preventScroll:true});}
    return;
  }
  const help=e.target.closest('.help-trigger');if(help){$('#help').showModal();document.body.classList.add('modal-open');}
  const compare=e.target.closest('[data-compare]');if(compare)openComparison(compare.dataset.compare);
});
$('#help .close-help').addEventListener('click',()=>$('#help').close());
for(const dialog of document.querySelectorAll('dialog')){
 dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
}
window.addEventListener('popstate',()=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());render();});
window.addEventListener('resize',()=>requestAnimationFrame(drawFacetLines));
document.fonts.ready.then(drawFacetLines);
render();
