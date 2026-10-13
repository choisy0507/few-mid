import { test, expect } from '@playwright/test';
import { concepts, families, relations, facets, canonical, get } from '../prototype-editorial/data.js';

const url = '/prototype-editorial/index.html';
const atlas = `${url}?view=atlas`;
const node = (page,name,type) => page.locator(`.map-node[data-concept="${canonical(type,name)}"]`);

test('editorial data reconciles the full primary list without merging different meanings',()=>{
  expect(families).toHaveLength(8);
  expect(new Set(families.flatMap(f=>f.notes)).size).toBe(33);
  expect(new Set(families.flatMap(f=>f.descriptors)).size).toBe(24);
  expect(relations.filter(e=>e.prominence==='primary'&&e.kind==='representative_note')).toHaveLength(48);
  expect(relations.filter(e=>e.prominence==='primary'&&e.kind==='possible_character')).toHaveLength(40);
  expect(new Set(concepts.map(c=>c.id)).size).toBe(concepts.length);
  for(const e of relations){expect(get(e.fromId)).toBeTruthy();expect(get(e.toId)).toBeTruthy();expect(e.status).toMatch(/contextual|editorial/);expect(e.explanation).toBeTruthy();}
  for(const n of ['Fresh','Floral','Woody']){expect(get(canonical('family',n)).type).toBe('family');expect(get(canonical('descriptor',n)).type).toBe('descriptor');}
  for(const [t,n] of [['note','Musk'],['descriptor','Musky'],['descriptor','Soapy'],['descriptor','Clean'],['note','Incense']])expect(get(canonical(t,n))).toBeTruthy();
  expect(get(canonical('note','Sea Breeze Accord')).construction).toBe('constructed_accord');
  expect(get(canonical('note','Milk Accord')).construction).toBe('constructed_accord');
  expect(facets(canonical('note','Rose'))).not.toContain(canonical('descriptor','Powdery'));
  expect(facets(canonical('note','Iris'))).toContain(canonical('descriptor','Powdery'));
});

test('home and Learn explain roles and reach the actual atlas',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  await expect(page.getByRole('heading',{level:1})).toContainText('Scent,');
  await expect(page.locator('.hero-art img')).toBeVisible();
  await expect.poll(()=>page.locator('.hero-art img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
  await page.locator('.masthead [data-route="learn"]').click();
  await expect(page.locator('.learn-card')).toHaveCount(3);
  await expect.poll(()=>page.locator('.learn-photo').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
  await page.locator('.relationship-example [data-concept="note:iris"]').click();
  await expect(page.locator('.detail-title')).toHaveText('Iris');
  await expect(node(page,'Powdery','descriptor')).toHaveClass(/related/);
  expect(errors).toEqual([]);
});

test('all eight families expand their complete primary notes and descriptors',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(atlas);
  await expect(page.locator('.map-node.family')).toHaveCount(8);
  for(const f of families){
    await node(page,f.name,'family').click();
    await expect(page.locator('.map-node.family')).toHaveCount(8);
    await expect(page.locator('.map-node.note')).toHaveCount(6);
    await expect(page.locator('.map-node.descriptor')).toHaveCount(5);
    await expect(page.locator('.detail-title')).toHaveText(f.name);
    for(const id of f.notes){await page.locator(`.map-node[data-concept="${id}"]`).click();await expect(page.locator('.detail-title')).toHaveText(get(id).name);}
  }
  expect(errors).toEqual([]);
});

test('a note emphasizes only its own facets; shared Creamy travels between families',async({page})=>{
  await page.goto(`${atlas}&family=woody`);
  await node(page,'Sandalwood','note').click();
  await node(page,'Creamy','descriptor').click();
  await expect(page.locator('.breadcrumb')).toContainText('Sandalwood');
  await expect(page.locator('.shared-families')).toContainText('Floral');
  await page.locator('.shared-family').filter({hasText:'Floral'}).click();
  await expect(page.locator('.breadcrumb')).not.toContainText('Sandalwood');
  await expect(page.locator('.detail-title')).toHaveText('Creamy');
  await expect(node(page,'Tuberose','note')).toHaveClass(/related/);
  await expect(node(page,'Rose','note')).toHaveClass(/receded/);
  await page.locator('.shared-family').filter({hasText:'Woody'}).click();
  await node(page,'Cedarwood','note').click();
  await expect(node(page,'Dry','descriptor')).toHaveClass(/related/);
  await expect(node(page,'Creamy','descriptor')).toHaveClass(/receded/);
});

test('Vanilla keeps one definition and changes its contextual explanation',async({page})=>{
  await page.goto(`${atlas}&family=gourmand&concept=note%3Avanilla`);
  const definition=await page.locator('.definition').textContent();
  await expect(page.locator('.context-note')).toContainText('디저트');
  await page.locator('.shared-family').filter({hasText:'Ambrée'}).click();
  await expect(page.locator('.definition')).toHaveText(definition);
  await expect(page.locator('.context-note')).toContainText('레진');
  await page.goBack();
  await expect(page.locator('.context-note')).toContainText('디저트');
});

test('Musk and original Soapy comparison remain reachable as secondary connections',async({page})=>{
  await page.goto(`${atlas}&family=floral`);
  await page.getByText('다른 표현과 보조 연결',{exact:true}).click();
  await page.locator('.advanced [data-concept="note:musk"]').click();
  await expect(page.locator('.detail-label')).toContainText('NOTE');
  await node(page,'Musky','descriptor').click();
  await expect(page.locator('.detail-label')).toContainText('DESCRIPTOR');
  await page.goto(`${atlas}&family=floral&concept=descriptor%3Asoapy`);
  await page.locator('[data-compare="clean"]').click();
  await expect(page.locator('#compare')).toBeVisible();
  await expect(page.locator('.difference')).toContainText('비누의 연상');
  await page.keyboard.press('Escape');
  await expect(page.locator('#compare')).not.toBeVisible();
  await expect(page.locator('.detail-title')).toHaveText('Soapy');
});

test('comparison tabs work on keyboard and closing preserves focus and atlas state',async({page})=>{
  await page.goto(`${atlas}&family=woody&concept=note%3Asandalwood`);
  const before=page.url();
  await page.locator('.compare-trigger').click();
  await expect(page.locator('#compare')).toBeVisible();
  await page.locator('#trait-0').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#trait-1')).toHaveAttribute('aria-selected','true');
  await expect(page.locator('#trait-panel')).toContainText('연필');
  await page.keyboard.press('End');
  await expect(page.locator('#trait-2')).toBeFocused();
  await page.locator('.close-compare').click();
  await expect(page.locator('.compare-trigger')).toBeFocused();
  await expect(node(page,'Sandalwood','note')).toHaveAttribute('aria-current','true');
  expect(page.url()).toBe(before);
  await page.locator('.help-control').click();
  await expect(page.locator('#help')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.help-control')).toBeFocused();
});

test('dynamic layout supports more than seven notes without crashing or hiding them',async({page})=>{
  await page.route('**/prototype-editorial/data.js*',async route=>{
    const response=await route.fetch();
    await route.fulfill({response,body:(await response.text())+'\nfamilies.find(f => f.key === "woody").notes.push("note:musk", "note:incense");\n'});
  });
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${atlas}&family=woody`);
  await expect(page.locator('.map-node.note')).toHaveCount(8);
  await node(page,'Musk','note').click();
  await expect(page.locator('.detail-title')).toHaveText('Musk');
  expect(errors).toEqual([]);
});

for(const width of [320,390,768,1024,1440]){
  test(`editorial screens fit ${width}px; atlas nodes are readable and do not overlap`,async({page})=>{
    await page.setViewportSize({width,height:1000});
    await page.emulateMedia({reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    async function fits(){expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
    for(const view of ['home','learn','atlas']){await page.goto(`${url}?view=${view}`);await fits();}
    for(const f of families){
      await node(page,f.name,'family').click();await fits();
      const bounds=await page.locator('.map-node').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {name:n.textContent.trim(),x:r.x,y:r.y,width:r.width,height:r.height};}));
      for(let i=0;i<bounds.length;i++)for(let j=i+1;j<bounds.length;j++){
        const a=bounds[i],b=bounds[j];
        const overlap=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>1 && Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>1;
        expect(overlap,`${f.name}: ${a.name} overlaps ${b.name} at ${width}px`).toBe(false);
      }
    }
    await page.goto(`${atlas}&family=woody&concept=note%3Asandalwood`);
    await page.locator('.compare-trigger').click();await fits();
    const dialog=await page.locator('#compare').boundingBox();expect(dialog.width).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}
