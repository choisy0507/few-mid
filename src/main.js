import {
  concepts,
  relations,
  types,
  sources,
  familyMembers,
  impressions,
  comparisons,
} from "./data.js";
const $ = (s) => document.querySelector(s),
  get = (id) => concepts.find((c) => c.id === id);
const families = concepts.filter((c) => c.type === "family");
let activeFamily = null,
  selected = null,
  comparisonKey = null,
  pair = [];
const slots = [
  [34, 25],
  [66, 25],
  [75, 47],
  [66, 69],
  [50, 79],
  [34, 69],
  [25, 47],
];
const names = {
  characteristic_note_of: "관련 노트",
  may_have_facet: "드러날 수 있는 특징",
  characteristic_structure_of: "관련 조향 구조",
  may_be_realized_with: "실제 향료의 예",
  editorial_comparison: "교육용 비교",
  contrasts_with: "질감의 대비",
  has_related_descriptor: "노트와 표현",
};
const edges = (id) => relations.filter((e) => e.fromId === id || e.toId === id),
  other = (e, id) => get(e.fromId === id ? e.toId : e.fromId);
function localIds() {
  if (!activeFamily) return [];
  const base = familyMembers[activeFamily];
  if (selected === activeFamily) return base;
  const near = edges(selected)
    .map((e) => other(e, selected))
    .filter((c) => ["note", "descriptor"].includes(c.type))
    .map((c) => c.id);
  return [...new Set([selected, ...near, ...base])].slice(0, 7);
}
function button(c, x, y) {
  const chosen = selected === c.id,
    related =
      selected && edges(selected).some((e) => other(e, selected).id === c.id),
    context = activeFamily === c.id;
  return `<button class="map-node ${c.type} ${chosen ? "selected" : ""} ${related ? "related" : ""} ${activeFamily && !chosen && !related && !context ? "distant" : ""} ${context ? "context-family" : ""}" data-concept="${c.id}" style="--x:${x}%;--y:${y}%" aria-pressed="${chosen}"><span class="node-name"><i class="${c.type}-mark" aria-hidden="true"></i>${c.name}</span><span class="node-type">${types[c.type].ko}${c.type === "family" && !activeFamily ? " · " + c.ko : ""}</span></button>`;
}
function renderMap() {
  const focus =
      document.activeElement?.closest("[data-concept]")?.dataset.concept,
    placed = new Map(),
    locals = localIds();
  const roots = families
    .map((c) => {
      const xy = c.id === activeFamily ? [50, 47] : [c.x, c.y];
      placed.set(c.id, xy);
      return button(c, ...xy);
    })
    .join("");
  const children = locals
    .map((id, i) => {
      placed.set(id, slots[i]);
      return button(get(id), ...slots[i]);
    })
    .join("");
  if (!$("#family-layer")) {
    $("#map-nodes").innerHTML =
      `<div id="family-layer" aria-label="전체 8개 향 계열">${roots}</div>`;
  } else {
    const parsed = document.createElement("div");
    parsed.innerHTML = roots;
    for (const next of parsed.children) {
      const current = document.querySelector(
        `[data-concept="${next.dataset.concept}"]`,
      );
      current.className = next.className;
      current.setAttribute("style", next.getAttribute("style"));
      current.setAttribute("aria-pressed", next.getAttribute("aria-pressed"));
      current.querySelector(".node-type").textContent =
        next.querySelector(".node-type").textContent;
    }
  }
  $("#expanded-layer")?.remove();
  if (activeFamily)
    $("#map-nodes").insertAdjacentHTML(
      "beforeend",
      `<div id="expanded-layer" aria-label="${get(activeFamily).name} 주변의 노트와 표현"><p class="expanded-heading">${get(activeFamily).name} 주변의 노트와 표현</p>${children}</div>`,
    );
  if (focus)
    document
      .querySelector(`[data-concept="${focus}"]`)
      ?.focus({ preventScroll: true });
  const visible = relations.filter(
    (e) =>
      placed.has(e.fromId) &&
      placed.has(e.toId) &&
      (e.fromId === activeFamily ||
        e.fromId === selected ||
        e.toId === selected),
  );
  $(".map-lines").innerHTML =
    '<g class="atlas-guide"><ellipse cx="380" cy="245" rx="220" ry="160"/><ellipse cx="380" cy="245" rx="148" ry="110"/><path d="M380 35v420 M100 245h560"/></g>' +
    visible
      .map((e) => {
        const [ax, ay] = placed.get(e.fromId),
          [bx, by] = placed.get(e.toId);
        return `<path class="relation-line ${e.fromId === selected || e.toId === selected ? "active" : ""} ${e.kind === "may_have_facet" ? "facet-line" : ""}" d="M${ax * 7.6} ${ay * 4.9} Q${(ax + bx) * 3.8 + 12} ${(ay + by) * 2.45 - 14} ${bx * 7.6} ${by * 4.9}"/>`;
      })
      .join("");
  $(".atlas-space").classList.toggle("has-selection", !!activeFamily);
  $("#map-status").textContent = activeFamily
    ? "8 FAMILIES / " + get(activeFamily).name.toUpperCase() + " IN FOCUS"
    : "8 FRAGRANCE FAMILIES";
  $("#map-breadcrumb").innerHTML = activeFamily
    ? `<button data-overview>전체 8계열</button><span> / </span><button data-select="${activeFamily}">${get(activeFamily).name}</button>${selected !== activeFamily ? "<span> / " + get(selected).name + "</span>" : ""}`
    : "<span>먼저 하나의 계열을 선택하세요.</span>";
  renderDetail();
}
function choose(id) {
  const c = get(id);
  if (c.type === "family") activeFamily = id;
  if (!activeFamily)
    activeFamily =
      Object.keys(familyMembers).find((f) => familyMembers[f].includes(id)) ||
      "floral";
  selected = id;
  renderMap();
}
function reset() {
  activeFamily = null;
  selected = null;
  renderMap();
}
function renderDetail() {
  if (!selected) {
    $("#concept-detail").innerHTML =
      `<p class="eyebrow">THE WHOLE PICTURE</p><h3 class="detail-name">Find your<br><em>direction.</em></h3><p class="detail-phrase">8개의 큰 방향에서, 작은 차이로.</p><p class="detail-description">먼저 계열을 선택하세요. 원래 지도 안에서 관련 노트와 감각 표현이 펼쳐집니다. 다른 계열도 남아 있어 현재 위치를 잃지 않고 탐색할 수 있습니다.</p><div class="attention"><span>세 가지 읽는 방법</span><p>계열은 큰 방향, 노트는 떠오르는 대상, 표현은 느껴지는 방식입니다. 조합과 실제 향료는 필요할 때 상세 설명 안에서 알아봅니다.</p></div><p class="eyebrow relationship-label">START SOMEWHERE</p><div class="relation-list">${["woody", "floral", "fresh"].map((id) => `<div class="relation-item"><button data-select="${id}"><span><i class="family-mark"></i>${get(id).name}</span><span>${get(id).ko} 탐색 ↗</span></button></div>`).join("")}</div><p class="overview-source">Family 기준: The Perfume Society의 8계열.<br>배치와 연결은 프로젝트의 교육용 관계 설계입니다.</p>`;
    return;
  }
  const c = get(selected),
    linked = edges(selected),
    main = linked.filter((e) =>
      ["family", "note", "descriptor"].includes(other(e, selected).type),
    ),
    professional = linked.filter((e) =>
      ["accord", "material"].includes(other(e, selected).type),
    ),
    relatedFamilies = main.filter((e) => other(e, selected).type === "family"),
    neighbors = main.filter((e) => other(e, selected).type !== "family");
  const texture =
    c.type === "family"
      ? {
          woody: "dry-woody",
          floral: "powdery",
          fresh: "clean",
          floriental: "creamy",
          ambree: "warm-musk",
          gourmand: "creamy",
          chypre: "dry",
          fougere: "clean-musk",
        }[c.id]
      : {
          cedarwood: "dry-woody",
          sandalwood: "creamy-woody",
          musk: "clean-musk",
        }[c.id] || c.id;
  const first = c.type === "family" ? [...neighbors.filter(e => other(e,selected).type === "note").slice(0,2), ...neighbors.filter(e => other(e,selected).type === "descriptor").slice(0,2)] : neighbors;
  const rest = neighbors.filter(e => !first.includes(e));
  const listHtml = list => list.map(e => {const n=other(e,selected); return `<div class="relation-item"><button data-select="${n.id}"><span><i class="${n.type}-mark"></i>${n.name}</span><span>${names[e.kind]} ↗</span></button><p>${e.explanation}</p></div>`}).join("");
  const source = sources[c.source];
  $("#concept-detail").innerHTML =
    `<div class="detail-top"><span class="type-tag ${c.type}"><i class="${c.type}-mark"></i>${types[c.type].en}</span><span class="detail-index">${get(activeFamily).name}</span></div><h3 class="detail-name">${c.name}<span>${c.ko}</span></h3><p class="detail-phrase">${c.phrase}</p><p class="detail-description">${c.description}</p><div class="texture detail-texture texture-${texture}" aria-hidden="true"><div class="texture-art"></div></div><div class="sensory-scene"><span class="eyebrow">PICTURE THIS</span><p>${c.image}</p></div><div class="attention"><span>구별하는 단서</span><p>${c.attention}</p></div><p class="eyebrow relationship-label">FOLLOW A CONNECTION</p><div class="relation-list">${listHtml(first)}</div>${rest.length ? `<details class="more-connections"><summary>더 연결된 개념 ${rest.length}개 보기</summary><div class="relation-list">${listHtml(rest)}</div></details>` : ""}${relatedFamilies.length ? `<div class="shared-families"><p class="eyebrow">여러 계열에서 읽을 수 있어요</p>${relatedFamilies.map((e) => `<button data-select="${other(e, selected).id}">${other(e, selected).name} ↗</button>`).join("")}</div>` : ""}${
      professional.length
        ? `<details class="professional-detail"><summary>조합과 실제 향료 알아보기</summary><p class="professional-intro">계열·노트·표현과 같은 층의 분류가 아니라, 향을 구성하고 구현하는 방법입니다.</p>${professional
            .map((e) => {
              const n = other(e, selected),
                materials = edges(n.id)
                  .map((x) => other(x, n.id))
                  .filter((x) => x.type === "material");
              return `<article><span class="eyebrow">${types[n.type].en} / ${types[n.type].ko}</span><h4>${n.name}</h4><p>${n.description}</p>${materials.map((m) => `<p><strong>${m.name}</strong> · ${m.description}</p>`).join("")}</article>`;
            })
            .join("")}</details>`
        : ""
    }${c.comparison ? `<button class="detail-compare" data-compare="${c.comparison}">${c.name} 안에서 더 비교하기 <span>↗</span></button><p class="comparison-hint">${comparisons[c.comparison].title} · 이 개념에서 한 단계 더.</p>` : ""}<details class="source-note"><summary>콘텐츠 기준과 검토 상태</summary><p>${source.label}. ${source.status}. 지도상의 거리와 위치는 후각적 유사도 수치가 아닙니다.</p>${source.url ? `<a href="${source.url}" target="_blank" rel="noopener noreferrer">참고 자료 ↗</a>` : ""}</details>`;
}
$("#map-nodes").addEventListener("click", (e) => {
  const b = e.target.closest("[data-concept]");
  if (b) choose(b.dataset.concept);
});
$("#concept-detail").addEventListener("click", (e) => {
  const s = e.target.closest("[data-select]");
  if (s) choose(s.dataset.select);
  const c = e.target.closest("[data-compare]");
  if (c) openComparison(c.dataset.compare);
});
$("#map-breadcrumb").addEventListener("click", (e) => {
  if (e.target.closest("[data-overview]")) reset();
  const b = e.target.closest("[data-select]");
  if (b) choose(b.dataset.select);
});
$("#reset-map").addEventListener("click", reset);
function point(i, r = 112) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return [205 + Math.cos(a) * r, 172 + Math.sin(a) * r];
}
function openComparison(key) {
  comparisonKey = key;
  pair = [...comparisons[key].pair];
  renderComparison();
  $("#comparison-context").textContent =
    `ATLAS / ${get(activeFamily).name} / ${get(selected).name} / COMPARE`;
  $("#compare-dialog").showModal();
  document.body.classList.add("modal-open");
}
function renderComparison() {
  const c = comparisons[comparisonKey],
    [a, b] = pair.map((id) => impressions[id]);
  $("#comparison-within").textContent =
    c.within + " 안에서 두 인상을 읽습니다.";
  for (const [index, side] of ["a", "b"].entries()) {
    const item = [a, b][index];
    $(`#compare-${side}`).innerHTML = c.pair
      .map((id) => `<option value="${id}">${impressions[id].name}</option>`)
      .join("");
    $(`#compare-${side}`).value = item.id;
    $(`#comparison-${side}`).innerHTML =
      `<p class="impression-type">${item.type}</p><div class="texture texture-${item.id}" aria-hidden="true"><span>${side.toUpperCase()}</span><div class="texture-art"></div></div><h3>${item.title}</h3><p class="feeling-tags">${item.feel}</p><p class="impression-scene">${item.scene}</p><p class="impression-focus">${item.focus}</p>`;
  }
  $("#radar").innerHTML =
    `<title id="radar-title">${a.name}와 ${b.name}, 다섯 관점의 정성적 비교</title><desc id="radar-description">다섯 관찰 항목을 배치한 오각형입니다. 강도 점수, 면적, 유사도 측정값을 표시하지 않습니다.</desc><polygon class="radar-grid facet-frame" points="${Array.from({ length: 5 }, (_, i) => point(i).join(",")).join(" ")}"/>` +
    c.axes
      .map(([label, en], i) => {
        const [x, y] = point(i),
          [tx, ty] = point(i, 147);
        return `<line class="radar-axis" x1="205" y1="172" x2="${x}" y2="${y}"/><circle class="dot-0" cx="${x - 4}" cy="${y}" r="3"/><circle class="dot-1" cx="${x + 4}" cy="${y}" r="3"/><text class="radar-label" x="${tx}" y="${ty}" text-anchor="${i === 0 ? "middle" : i < 3 ? "start" : "end"}">${label}<tspan class="radar-label-en" x="${tx}" dy="16">${en}</tspan></text>`;
      })
      .join("") +
    '<text x="205" y="160" text-anchor="middle" class="diagram-center">a closer</text><text x="205" y="186" text-anchor="middle" class="diagram-center italic">look.</text>';
  $("#radar-key").innerHTML =
    `<span><i class="key-a"></i>${a.name}</span><span><i class="key-b"></i>${b.name}</span>`;
  const ai = c.pair.indexOf(a.id),
    bi = c.pair.indexOf(b.id);
  $("#axis-table").innerHTML =
    `<table><caption>같은 항목으로 읽는 두 설명 사례</caption><thead><tr><th scope="col">관찰 항목</th><th scope="col">${a.name}</th><th scope="col">${b.name}</th></tr></thead><tbody>${c.axes.map(([label, en, ...v]) => `<tr><th scope="row">${label}</th><td>${v[ai]}</td><td>${v[bi]}</td></tr>`).join("")}</tbody></table>`;
  $("#difference-note").innerHTML =
    `<span class="difference-spark" aria-hidden="true">✳</span><div><p class="eyebrow">THE DIFFERENCE TO NOTICE</p><h3>${a.id === b.id ? "같은 인상을 보고 있어요." : c.summary}</h3><p>${a.id === b.id ? "같은 설명을 보고 있습니다. 다른 대상을 선택해 구별하는 단서를 읽어보세요." : c.explanation}</p></div>`;
}
for (const side of ["a", "b"])
  $(`#compare-${side}`).addEventListener("change", (e) => {
    pair[side === "a" ? 0 : 1] = e.target.value;
    renderComparison();
  });
$("#close-comparison").addEventListener("click", () =>
  $("#compare-dialog").close(),
);
$("#compare-dialog").addEventListener("close", () =>
  document.body.classList.remove("modal-open"),
);
$("#open-method").addEventListener("click", () =>
  $("#method-dialog").showModal(),
);
$("#close-method").addEventListener("click", () => $("#method-dialog").close());
for (const dialog of document.querySelectorAll("dialog"))
  dialog.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  });
renderMap();
