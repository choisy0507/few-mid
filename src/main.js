import { concepts, relations, types, impressions, axes, presets } from './data.js';

const $ = (selector) => document.querySelector(selector);
const byId = (id) => concepts.find((concept) => concept.id === id);
const impression = (id) => impressions.find((item) => item.id === id);
let selected = 'powdery';
let pair = [...presets.clean.pair];

$('#map-nodes').innerHTML = concepts.map((c) => `<button class="map-node ${c.type}" data-concept="${c.id}" style="--x:${c.x}%;--y:${c.y}%" aria-pressed="false"><span class="node-name"><i class="${c.type}-mark" aria-hidden="true"></i>${c.name}</span><span class="node-type">${types[c.type].ko}</span></button>`).join('');
const edgePath = (a, b) => {
  const start = byId(a), end = byId(b);
  return `M ${start.x * 7.6} ${start.y * 4.9} Q ${(start.x + end.x) * 3.8 + 14} ${(start.y + end.y) * 2.45 - 16} ${end.x * 7.6} ${end.y * 4.9}`;
};
$('.map-lines').innerHTML = `<g class="atlas-guide"><ellipse cx="385" cy="246" rx="205" ry="151"/><ellipse cx="385" cy="246" rx="140" ry="102"/><path d="M385 31v425 M118 246h534"/></g>` + relations.map(([a, b]) => `<path class="relation-line" data-edge="${a} ${b}" d="${edgePath(a, b)}"/>`).join('');

function renderMap() {
  const connected = relations.filter(([a, b]) => a === selected || b === selected);
  const relatedIds = connected.map(([a, b]) => a === selected ? b : a);
  document.querySelectorAll('.map-node').forEach((button) => {
    const id = button.dataset.concept;
    button.classList.toggle('selected', id === selected);
    button.classList.toggle('related', relatedIds.includes(id));
    button.classList.toggle('distant', Boolean(selected) && id !== selected && !relatedIds.includes(id));
    button.setAttribute('aria-pressed', String(id === selected));
  });
  document.querySelectorAll('.relation-line').forEach((path) => {
    path.classList.toggle('active', Boolean(selected) && path.dataset.edge.split(' ').includes(selected));
    path.classList.toggle('all-visible', !selected);
  });
  $('.atlas-space').classList.toggle('has-selection', Boolean(selected));
  if (!selected) {
    $('#concept-detail').innerHTML = `<p class="eyebrow">THE SCENT ATLAS</p><h3 class="detail-name">Stay curious.</h3><p class="detail-phrase">어떤 향인지 궁금한 단어를 골라보세요.</p><p class="detail-description">12개의 개념은 세 종류의 정보로 나뉩니다. 단어를 고르면 연결된 개념과, 그 관계를 설명하는 문장이 함께 나타납니다.</p><div class="attention"><span>작은 시작</span><p>Powdery를 선택하고 Soapy와 어떤 점이 닮았는지 살펴보세요.</p></div><button class="detail-compare" data-select="powdery">Powdery부터 시작하기 <span>↗</span></button>`;
    return;
  }
  const c = byId(selected);
  $('#concept-detail').innerHTML = `<div class="detail-top"><span class="type-tag ${c.type}"><i class="${c.type}-mark"></i>${types[c.type].en}</span><span class="detail-index">${String(concepts.indexOf(c) + 1).padStart(2, '0')} / 12</span></div><h3 class="detail-name">${c.name}<span>${c.ko}</span></h3><p class="detail-phrase">${c.phrase}</p><p class="detail-description">${c.description}</p><div class="sensory-scene"><span class="eyebrow">PICTURE THIS</span><p>${c.image}</p></div><div class="attention"><span>구별하는 단서</span><p>${c.attention}</p></div><p class="eyebrow relationship-label">FOLLOW A CONNECTION</p><div class="relation-list">${connected.map(([a, b, label, text]) => {const other = byId(a === selected ? b : a); return `<div class="relation-item"><button data-select="${other.id}"><span><i class="${other.type}-mark"></i>${other.name}</span><span>${label} ↗</span></button><p>${text}</p></div>`;}).join('')}</div><button class="detail-compare" data-compare="${c.pair.join(',')}">${impression(c.pair[0]).name}와 ${impression(c.pair[1]).name} 비교 <span>↗</span></button>`;
}

$('#map-nodes').addEventListener('click', (event) => {
  const node = event.target.closest('[data-concept]');
  if (node) { selected = node.dataset.concept; renderMap(); }
});
$('#concept-detail').addEventListener('click', (event) => {
  const select = event.target.closest('[data-select]');
  if (select) { selected = select.dataset.select; renderMap(); }
  const compare = event.target.closest('[data-compare]');
  if (compare) { pair = compare.dataset.compare.split(','); renderComparison(); $('#compare').scrollIntoView({ behavior: scrollBehavior() }); }
});
$('#reset-map').addEventListener('click', () => { selected = null; renderMap(); });

for (const side of ['a', 'b']) {
  $(`#compare-${side}`).innerHTML = `<optgroup label="감각 표현">${impressions.filter((i) => i.type === '감각 표현').map((i) => `<option value="${i.id}">${i.name}</option>`).join('')}</optgroup><optgroup label="맥락을 더한 인상">${impressions.filter((i) => i.type !== '감각 표현').map((i) => `<option value="${i.id}">${i.name}</option>`).join('')}</optgroup>`;
  $(`#compare-${side}`).addEventListener('change', (event) => { pair[side === 'a' ? 0 : 1] = event.target.value; renderComparison(); });
}

function radarPoint(index, value = 4) {
  const angle = -Math.PI / 2 + index * 2 * Math.PI / 5;
  return [205 + Math.cos(angle) * 112 * value / 4, 168 + Math.sin(angle) * 112 * value / 4];
}
function renderComparison() {
  const [a, b] = pair.map(impression);
  for (const [index, side] of ['a', 'b'].entries()) {
    const item = [a, b][index];
    $(`#compare-${side}`).value = item.id;
    $(`#comparison-${side}`).innerHTML = `<p class="impression-type">${item.type}</p><div class="texture texture-${item.id}" aria-hidden="true"><span>${side === 'a' ? 'A' : 'B'}</span><div class="texture-art"></div></div><h3>${item.title}</h3><p class="feeling-tags">${item.feel}</p><p class="impression-scene">${item.scene}</p><p class="impression-focus">${item.focus}</p>`;
  }
  const polygon = (values) => values.map((value, i) => radarPoint(i, value).join(',')).join(' ');
  $('#radar').innerHTML = `<title id="radar-title">${a.name}와 ${b.name}의 정성적 비교</title><desc id="radar-description">교육용 감각 비유 도식입니다. 측정값이 아닙니다. 다섯 축의 의미와 텍스트 비교에서 같은 내용을 읽을 수 있습니다.</desc>` + [1,2,3,4].map((level) => `<polygon class="radar-grid" points="${polygon(Array(5).fill(level))}"/>`).join('') + axes.map((axis, i) => { const [x, y] = radarPoint(i); const [tx, ty] = radarPoint(i, 5.0); return `<line class="radar-axis" x1="205" y1="168" x2="${x}" y2="${y}"/><text class="radar-label" x="${tx}" y="${ty}" text-anchor="${i === 0 ? 'middle' : i < 3 ? 'start' : 'end'}">${axis.name}<tspan class="radar-label-en" x="${tx}" dy="16">${axis.en}</tspan></text>`; }).join('') + `<polygon class="radar-shape shape-b" points="${polygon(b.values)}"/><polygon class="radar-shape shape-a" points="${polygon(a.values)}"/>` + [a,b].map((item, side) => item.values.map((value,i) => {const [x,y] = radarPoint(i,value); return `<circle class="radar-dot dot-${side}" cx="${x}" cy="${y}" r="3"/>`;}).join('')).join('');
  $('#radar-key').innerHTML = `<span><i class="key-a"></i>${a.name}</span><span><i class="key-b"></i>${b.name}</span>`;
  const levels = ['강조되지 않음', '은은한 예시', '중간 정도의 예시', '뚜렷한 예시', '강조되는 예시'];
  $('#axis-table').innerHTML = `<table><caption>편집한 예시의 정성적 인상</caption><thead><tr><th scope="col">축</th><th scope="col">${a.name}</th><th scope="col">${b.name}</th></tr></thead><tbody>${axes.map((axis, i) => `<tr><th scope="row">${axis.name}<span>${axis.meaning}</span></th><td>${levels[a.values[i]]}</td><td>${levels[b.values[i]]}</td></tr>`).join('')}</tbody></table>`;
  const presetEntry = Object.entries(presets).find(([, preset]) => preset.pair.every((id) => pair.includes(id)) && a.id !== b.id);
  document.querySelectorAll('[data-preset]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.preset === presetEntry?.[0])));
  let title, text;
  if (a.id === b.id) { title = '같은 인상을 보고 있어요.'; text = '두 도형이 겹칩니다. 다른 표현을 골라 무엇이 달라지는지 살펴보세요.'; }
  else if (presetEntry) { ({title, text} = presetEntry[1]); }
  else {
    const diffs = axes.map((axis, i) => ({ axis, gap: Math.abs(a.values[i] - b.values[i]), stronger: a.values[i] > b.values[i] ? a.name : b.name })).sort((x, y) => y.gap - x.gap);
    title = `${a.name} × ${b.name}, 이런 단서에 주목하세요.`;
    text = diffs[0].gap > 0 ? `이 예시에서는 ‘${diffs[0].axis.name}’의 차이가 먼저 드러납니다. ${diffs[0].stronger} 쪽에서 그 인상을 더 강조해 표현했습니다. 왼쪽과 오른쪽의 장면을 함께 읽어보세요. 실제 향의 구성에 따라 이 관계는 달라질 수 있습니다.` : '이 도식에서는 비슷한 모양이지만 같은 의미는 아닙니다. 각각의 장면과 표현의 초점을 함께 읽어보세요.';
  }
  $('#difference-note').innerHTML = `<span class="difference-spark" aria-hidden="true">✳</span><div><p class="eyebrow">THE DIFFERENCE TO NOTICE</p><h3>${title}</h3><p>${text}</p></div>`;
}

function scrollBehavior() { return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'; }
document.querySelectorAll('[data-question], [data-preset]').forEach((button) => button.addEventListener('click', () => {
  const preset = presets[button.dataset.question || button.dataset.preset];
  pair = [...preset.pair];
  selected = preset.concept;
  renderMap(); renderComparison();
  if (button.dataset.question) $('#compare').scrollIntoView({ behavior: scrollBehavior() });
}));
const dialog = $('#method-dialog');
$('#open-method').addEventListener('click', () => dialog.showModal());
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
renderMap();
renderComparison();
