(function () {
  'use strict';
  const { families, notes, descriptors } = window.ScentData;
  const familyButtons = [...document.querySelectorAll('[data-family]')];
  const panel = document.getElementById('detail-content');
  const map = document.querySelector('.atlas-map');
  const comparison = document.getElementById('comparison');
  const closeComparison = document.getElementById('close-comparison');
  let selectedFamily = null;
  let selectedTerm = null;

  const familyKeys = Object.keys(families);
  function keysFor(kind, name) {
    return familyKeys.filter(key => families[key][kind === 'note' ? 'notes' : 'descriptors'].includes(name));
  }
  function termChips(ids, kind) {
    return ids.map(name => `<button class="term-chip ${kind}" type="button" data-kind="${kind}" data-term="${name}"><span class="term-symbol" aria-hidden="true"></span>${name}<span aria-hidden="true">↗</span></button>`).join('');
  }
  function familyChip(key) {
    return `<button class="family-backlink" type="button" data-go-family="${key}"><span class="family-backlink-dot" style="--chip:${families[key].color}" aria-hidden="true"></span>${families[key].name}<span aria-hidden="true">↗</span></button>`;
  }
  function revealMobilePanel() {
    if (window.matchMedia('(max-width: 830px)').matches) {
      document.getElementById('detail-panel').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start'
      });
    }
  }
  function updateFamilySelection() {
    familyButtons.forEach(button => {
      const active = button.dataset.family === selectedFamily;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('selected', active);
      button.classList.toggle('receded', Boolean(selectedFamily) && !active);
    });
    map.classList.toggle('has-selected-family', Boolean(selectedFamily));
  }
  function selectFamily(key) {
    if (!families[key]) return;
    selectedFamily = key;
    selectedTerm = null;
    updateFamilySelection();
    const f = families[key];
    panel.innerHTML = `
      <div class="panel-content">
        <div class="panel-head"><span class="panel-type-label"><span class="panel-type-symbol family" style="--type-color:${f.color}" aria-hidden="true"></span>FAMILY / ${f.number} OF 08</span><button type="button" class="small-action" data-clear>VIEW ALL ↶</button></div>
        <div class="panel-family-visual" style="--family-color:${f.color}"><span class="panel-glow"></span></div>
        <h3 class="panel-title"><span class="panel-type-symbol family" style="--type-color:${f.color}" aria-hidden="true"></span>${f.name}<i>.</i></h3>
        <p class="panel-summary">${f.summary}</p>
        <p class="detail-scene">${f.scene}</p>
        <div class="term-group"><div class="term-group-heading"><span>NOTES</span></div><div class="term-list">${termChips(f.notes,'note')}</div></div>
        <div class="term-group"><div class="term-group-heading"><span>DESCRIPTORS</span></div><div class="term-list">${termChips(f.descriptors,'descriptor')}</div></div>
      </div>`;
  }
  function selectTerm(kind, name) {
    const dictionary = kind === 'note' ? notes : descriptors;
    if (!dictionary[name]) return;
    selectedTerm = {kind, name};
    const sourceFamily = selectedFamily;
    const linkedFamilies = keysFor(kind,name);
    const item = dictionary[name];
    const summary = kind === 'note' ? item.summary : item;
    const direct = kind === 'note' && item.connects ? item.connects : [];
    const relatedNotes = kind === 'descriptor' ? Object.keys(notes).filter(noteName => notes[noteName].connects.includes(name)) : [];
    const scentReference = kind === 'note' ? '<div class="term-context"><span>SCENT REFERENCE</span><p>' + item.scentReference + '</p></div>' : '';
    const compareButton = (name === 'Powdery' || name === 'Soapy')
      ? `<button class="button-solid" type="button" data-open-compare>COMPARE POWDERY &amp; SOAPY <span aria-hidden="true">↗</span></button>` : '';
    panel.innerHTML = `
      <div class="panel-content term-detail">
        <div class="panel-head"><span class="panel-type-label"><span class="panel-type-symbol ${kind}" aria-hidden="true"></span>${kind.toUpperCase()} / SELECTED CONCEPT</span><button type="button" class="small-action" data-go-family="${sourceFamily}">← BACK TO FAMILY</button></div>
        <div class="term-visual ${kind}-visual" aria-hidden="true"><div class="term-visual-form"></div></div>
        <h3 class="panel-title"><span class="panel-type-symbol ${kind}" aria-hidden="true"></span>${name}<i>.</i></h3>
        <p class="panel-summary">${summary}</p>
        ${scentReference}
        ${direct.length ? `<div class="term-group"><div class="term-group-heading"><span>RELATED DESCRIPTORS</span></div><div class="term-list">${termChips(direct,'descriptor')}</div></div>` : ''}
        ${kind === 'descriptor' ? `<div class="term-group"><div class="term-group-heading"><span>RELATED NOTES</span><span>${relatedNotes.length} LINK${relatedNotes.length===1?'':'S'}</span></div><div class="term-list">${termChips(relatedNotes,'note')}</div></div>` : ''}
        <div class="term-group shared-group"><div class="term-group-heading"><span>RELATED FAMILIES</span><span>${linkedFamilies.length} LINK${linkedFamilies.length===1?'':'S'}</span></div><div class="shared-links">${linkedFamilies.map(familyChip).join('')}</div></div>
        
        ${compareButton}
      </div>`;
  }
  function resetMap() {
    selectedFamily=null;
    selectedTerm=null;
    updateFamilySelection();
    panel.innerHTML = `<div class="detail-empty"><p class="eyebrow">FAMILY DETAILS</p><div class="empty-guide"><div class="empty-rule" aria-hidden="true"></div><h3>Select a family.</h3><p>Its notes and descriptors will appear here.</p></div><button type="button" class="button-solid" data-start-floral>START WITH FLORAL <span aria-hidden="true">↗</span></button></div>`;
  }
  document.querySelector('.family-buttons').addEventListener('click', event => {
    const button = event.target.closest('[data-family]');
    if (button) { selectFamily(button.dataset.family); revealMobilePanel(); }
  });
  panel.addEventListener('click', event => {
    const start=event.target.closest('[data-start-floral]');
    const go=event.target.closest('[data-go-family]');
    const chip=event.target.closest('[data-kind][data-term]');
    if(start) { selectFamily('floral'); revealMobilePanel(); }
    else if(go) { selectFamily(go.dataset.goFamily); revealMobilePanel(); }
    else if(chip) { selectTerm(chip.dataset.kind,chip.dataset.term); revealMobilePanel(); }
    else if(event.target.closest('[data-clear]')) resetMap();
    else if(event.target.closest('[data-open-compare]')) {
      comparison.hidden=false;
      comparison.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    }
  });
  closeComparison.addEventListener('click', () => {
    comparison.hidden=true;
    document.getElementById('atlas').scrollIntoView({behavior:'instant',block:'start'});
    const target=panel.querySelector('[data-open-compare]');
    if(target) target.focus({preventScroll:true});
  });

  // The Learn examples illustrate existing curated family-note-descriptor links.
  const learnExamples = {
    vanilla: { family:'Gourmand', note:'Vanilla', descriptor:'Sweet', sentence:'A gourmand fragrance may feature a vanilla note and have a sweet quality.' },
    lemon: { family:'Fresh', note:'Lemon', descriptor:'Citrusy', sentence:'A fresh fragrance may feature a lemon note and have a citrusy quality.' },
    rose: { family:'Floral', note:'Rose', descriptor:'Green', sentence:'A floral fragrance may feature a rose note with a green, stem-like quality.' }
  };
  const exampleChoices = document.querySelectorAll('[data-example]');
  exampleChoices.forEach(button => button.addEventListener('click', () => {
    const example = learnExamples[button.dataset.example];
    if (!example) return;
    document.getElementById('example-family').textContent = example.family;
    document.getElementById('example-note').textContent = example.note;
    document.getElementById('example-descriptor').textContent = example.descriptor;
    document.getElementById('example-sentence').textContent = example.sentence;
    exampleChoices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  }));
})();
