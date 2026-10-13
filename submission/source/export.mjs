import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseURL = process.env.SUBMISSION_BASE_URL || 'http://127.0.0.1:5173/submission/';
const python = () => {
  const result = spawnSync('python3', [path.join(root, 'source/build_submission.py')], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Submission build failed');
};
python();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1400, height: 700 }, reducedMotion: 'reduce' });
for (const name of ['sitemap', 'user-flow', 'wireframe-desktop', 'wireframe-perspectives', 'wireframe-compare', 'wireframe-responsive']) {
  await page.goto(baseURL + 'assets/' + name + '.svg');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, 'assets', name + '.png') });
}

const proto = baseURL + 'prototype/index.html';
await page.setViewportSize({ width: 1440, height: 1100 });
await page.goto(proto);
const errors = []; page.on('pageerror', (error) => errors.push(error.message));
for (const mode of ['notes', 'feel', 'family']) {
  await page.locator('#tab-' + mode).click();
  await page.locator('.study').screenshot({ path: path.join(root, 'assets', 'study-' + mode + '.png'), animations: 'disabled' });
}
await page.locator('#tab-notes').click();
await page.locator('[data-case="sandal"]').click();
await page.locator('.study').screenshot({ path: path.join(root, 'assets/study-sandal.png'), animations: 'disabled' });

const checks = [];
function check(name, value) { assert.ok(value, name); checks.push({ name, passed: true }); }
await page.locator('[data-case="cedar"]').click();
check('Notes: Rose + Cedarwood is displayed', (await page.locator('.panel h2').textContent()).includes('Rose + Cedarwood'));
await page.locator('#tab-feel').click();
check('Feel: Dry expression is displayed', await page.locator('.panel h2').textContent() === 'Dry');
await page.locator('[data-case="sandal"]').click();
check('Case swap keeps lens and updates expression', await page.locator('.panel h2').textContent() === 'Creamy' && await page.locator('#tab-feel').getAttribute('aria-selected') === 'true');
await page.locator('[data-part="rose"]').click();
await page.locator('#tab-notes').click();
check('Changing perspective preserves the focused element', await page.locator('.panel h2').textContent() === 'Rose' && await page.locator('.scene').getAttribute('data-isolate') === 'rose');
await page.locator('[data-case="cedar"]').click();
check('Case swap preserves Rose focus', await page.locator('.panel h2').textContent() === 'Rose');
await page.locator('#tab-feel').click();
check('Feel describes the selected Rose element', await page.locator('.panel h2').textContent() === '꽃잎의 인상');
await page.locator('#tab-family').click();
check('Family describes the selected Rose direction', await page.locator('.panel h2').textContent() === 'Floral');
check('Family labels are directions, not note names', await page.locator('#wood-label').textContent() === 'Woody' && (await page.locator('.context').textContent()).includes('확정할 수 없습니다'));
await page.locator('#tab-family').focus();
await page.keyboard.press('ArrowRight');
check('Keyboard wraps Family to Notes', await page.locator('#tab-notes').getAttribute('aria-selected') === 'true');
await page.keyboard.press('End');
check('End key selects Family', await page.locator('#tab-family').getAttribute('aria-selected') === 'true');
await page.locator('#clear-isolation').click();
check('Reset focus preserves case and perspective', await page.locator('.scene').getAttribute('data-isolate') === 'all' && await page.locator('#tab-family').getAttribute('aria-selected') === 'true' && await page.locator('[data-case="cedar"]').getAttribute('aria-pressed') === 'true');
await page.locator('[data-term="feel"]').click();
check('Connection exploration explains type distinction', (await page.locator('#connection-copy').textContent()).includes('감각 표현'));
for (const width of [320, 390, 680, 681, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  check(`No horizontal overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
}
check('No JavaScript errors', errors.length === 0);
const motion = await page.locator('.petal').first().evaluate((el) => getComputedStyle(el).transitionDuration);
check('Reduced motion disables transitions', motion === '0s');
await page.setViewportSize({ width: 390, height: 900 });
await page.locator('#tab-notes').click();
await page.locator('#study').scrollIntoViewIfNeeded();
await page.evaluate(() => scrollTo(0, document.querySelector('#study').getBoundingClientRect().top + scrollY - 8));
await page.screenshot({ path: path.join(root, 'assets/study-mobile.png') });
writeFileSync(path.join(root, 'prototype-validation.json'), JSON.stringify({ checks, total: checks.length, browser: 'Chromium', scope: 'standalone submission design prototype' }, null, 2));
console.log(`Prototype: ${checks.length} checks passed.`);

python();
await page.setViewportSize({ width: 1600, height: 950 });
await page.goto(baseURL + 'presentation.html');
await page.evaluate(() => document.fonts.ready);
const slideCount = await page.locator('.slide').count();
check('All slide images loaded', await page.locator('img').evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)));
const overflow = await page.locator('.txt').evaluateAll((nodes) => nodes.filter((node) => node.scrollHeight > node.clientHeight + 2 || node.scrollWidth > node.clientWidth + 2).map((node) => ({ text: node.textContent, scrollHeight: node.scrollHeight, height: node.clientHeight, scrollWidth: node.scrollWidth, width: node.clientWidth, slide: [...document.querySelectorAll('.slide')].indexOf(node.closest('.slide')) + 1 })));
// Hidden slides must be made visible for a complete text measurement.
await page.evaluate(() => document.querySelectorAll('.slide').forEach((s) => { s.style.display = 'block'; s.style.transform = 'none'; }));
const allOverflow = await page.locator('.txt').evaluateAll((nodes) => nodes.filter((node) => node.scrollHeight > node.clientHeight + 2 || node.scrollWidth > node.clientWidth + 2).map((node) => ({ text: node.textContent, scrollHeight: node.scrollHeight, height: node.clientHeight, slide: [...document.querySelectorAll('.slide')].indexOf(node.closest('.slide')) + 1 })));
writeFileSync(path.join(root, 'layout-validation.json'), JSON.stringify({ slideCount, textOverflow: allOverflow }, null, 2));
if (allOverflow.length) console.log('Review text overflow:', JSON.stringify(allOverflow));
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: path.join(root, 'The-Anatomy-of-Scent.pdf'), preferCSSPageSize: true, printBackground: true });
await page.goto(baseURL + 'project-proposal.html');
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: path.join(root, 'Project-Proposal.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font-family:Arial;font-size:8px;width:100%;margin:0 19mm;color:#657369;display:flex;justify-content:space-between"><span>THE ANATOMY OF SCENT / MIDTERM DESIGN PROPOSAL</span><span class="pageNumber"></span></div>' });
await browser.close();
console.log(`Exported ${slideCount} slides to PPTX, HTML and PDF; exported written proposal to DOCX and PDF.`);
