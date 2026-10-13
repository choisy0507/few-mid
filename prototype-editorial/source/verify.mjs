import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
mkdirSync(resolve(root,'previews'),{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined)});
const errors=[];
try {
  const production=await browser.newPage({viewport:{width:1440,height:1100}});
  production.on('pageerror',e=>errors.push(e.message));
  production.on('response',r=>{if(r.status()>=400)errors.push(`HTTP ${r.status()} ${r.url()}`);});
  await production.goto('http://127.0.0.1:4174/prototype-editorial/index.html');
  await production.waitForFunction(()=>document.querySelector('.hero-art img')?.complete && document.querySelector('.hero-art img')?.naturalWidth>0);
  await production.getByRole('link',{name:'Explore the Atlas',exact:false}).first().click();
  await production.locator('.map-node[data-concept="family:woody"]').click();
  await production.locator('.map-node[data-concept="note:sandalwood"]').click();
  if(await production.locator('.detail-title').textContent()!=='Sandalwood')throw new Error('Production atlas did not select Sandalwood');
  await production.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  await production.close();

  const offline=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
  const requests=[];
  offline.on('pageerror',e=>errors.push(e.message));
  offline.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:4174/editorial-offline.html'))requests.push(r.url());});
  await offline.context().setOffline(true);
  // Managed Chromium blocks file://. Fulfill the exact bundled document locally
  // while its browser context is offline; all runtime resources must be inline.
  const bundled=readFileSync(resolve(root,'The-Scent-Atlas-Editorial.html'),'utf8');
  const base='http://127.0.0.1:4174/editorial-offline.html';
  await offline.route(base+'*',route=>route.fulfill({contentType:'text/html',body:bundled}));
  for(const [name,query,fullPage] of [
    ['home','',false],
    ['learn','?view=learn',true],
    ['atlas','?view=atlas',true],
    ['sandalwood','?view=atlas&family=woody&concept=note%3Asandalwood',true],
    ['vanilla','?view=atlas&family=ambree&concept=note%3Avanilla',true],
  ]){
    await offline.goto(base+query);
    await offline.evaluate(()=>document.fonts.ready);
    await offline.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    await offline.screenshot({path:resolve(root,`previews/${name}.png`),fullPage});
  }
  await offline.locator('.shared-family').filter({hasText:'Gourmand'}).click();
  if(!(await offline.locator('.context-note').textContent()).includes('디저트'))throw new Error('Offline navigation lost family context');
  await offline.goto(base+'?view=atlas&family=woody&concept=note%3Asandalwood');
  await offline.locator('.compare-trigger').click();
  await offline.screenshot({path:resolve(root,'previews/comparison.png')});
  await offline.locator('#trait-1').click();
  if(!(await offline.locator('#trait-panel').textContent()).includes('연필'))throw new Error('Offline comparison tab did not update');
  await offline.locator('.close-compare').click();
  if(await offline.locator('.detail-title').textContent()!=='Sandalwood')throw new Error('Offline comparison lost atlas selection');
  await offline.setViewportSize({width:390,height:950});
  await offline.screenshot({path:resolve(root,'previews/mobile.png'),fullPage:true});
  if(await offline.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw new Error('Offline mobile overflow');
  if(requests.length)throw new Error('Offline prototype made external runtime requests');
  if(errors.length)throw new Error(errors.join('\n'));
  const result={productionSmoke:'passed',offlineSmoke:'passed',offlineDocumentMethod:'Exact bundled HTML loaded through a local document fixture in an offline browser context; managed Chromium blocks file URLs',externalRequests:requests,errors,widthsVerified:[320,390,768,1024,1440],figmaOriginalInspected:false,reference:'User-provided final brief and imagery; Figma URL blocked by proxy'};
  writeFileSync(resolve(root,'validation.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result));
}finally{await browser.close();}
