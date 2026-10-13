import { test, expect } from '@playwright/test';
import { concepts, relations, impressions } from '../src/data.js';

test('content distinguishes information types and links have explanations', () => {
  const ids = concepts.map((c) => c.id);
  expect(new Set(ids).size).toBe(12);
  expect(concepts.find((c) => c.id === 'woody').type).toBe('family');
  expect(concepts.find((c) => c.id === 'rose').type).toBe('note');
  expect(concepts.find((c) => c.id === 'powdery').type).toBe('descriptor');
  for (const [a, b, label, explanation] of relations) {
    expect(ids).toContain(a); expect(ids).toContain(b);
    expect(label.length).toBeGreaterThan(0); expect(explanation.length).toBeGreaterThan(15);
  }
  for (const c of concepts) {
    expect(relations.some(([a,b]) => a === c.id || b === c.id)).toBe(true);
    expect(c.pair.every((id) => impressions.some((i) => i.id === id))).toBe(true);
  }
});

test('family selection emphasizes explained relations and de-emphasizes others', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-concept="woody"]').click();
  await expect(page.locator('.detail-name')).toContainText('Woody');
  await expect(page.locator('.type-tag')).toContainText('FRAGRANCE FAMILY');
  await expect(page.locator('[data-concept="dry"]')).toHaveClass(/related/);
  await expect(page.locator('[data-concept="creamy"]')).toHaveClass(/related/);
  await expect(page.locator('[data-concept="rose"]')).toHaveClass(/distant/);
  await expect(page.locator('.relation-item')).toHaveCount(4);
  await page.locator('[data-select="cedarwood"]').click();
  await expect(page.locator('.type-tag')).toContainText('NOTE');
  await expect(page.locator('.detail-name')).toContainText('Cedarwood');
});

test('all twelve concepts expose meaningful explanations and valid comparisons', async ({ page }) => {
  await page.goto('/');
  for (const c of concepts) {
    await page.locator(`[data-concept="${c.id}"]`).click();
    await expect(page.locator('.detail-description')).toHaveText(c.description);
    await expect(page.locator('.attention')).toContainText(c.attention);
    await expect(page.locator('.detail-compare')).toHaveAttribute('data-compare', c.pair.join(','));
  }
});

test('question shortcuts connect context, pentagon and distinguishing clues', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-question="wood"]').click();
  await expect(page.locator('#compare-a')).toHaveValue('dry-woody');
  await expect(page.locator('#compare-b')).toHaveValue('creamy-woody');
  await expect(page.locator('#difference-note')).toContainText('같은 나무');
  const dryShape = await page.locator('.shape-a').getAttribute('points');
  await page.locator('[data-preset="musk"]').click();
  await expect(page.locator('#compare-a')).toHaveValue('clean-musk');
  await expect(page.locator('#compare-b')).toHaveValue('warm-musk');
  await expect(page.locator('.shape-a')).not.toHaveAttribute('points', dryShape);
  await expect(page.locator('#difference-note')).toContainText('모순이 아니에요');
});

test('custom and same-object comparisons stay consistent with text alternatives', async ({ page }) => {
  await page.goto('/');
  await page.locator('#compare-a').selectOption('creamy');
  await page.locator('#compare-b').selectOption('dry');
  await expect(page.locator('#difference-note')).toContainText('Creamy × Dry');
  await page.locator('.axis-detail summary').click();
  await expect(page.locator('#axis-table tbody tr')).toHaveCount(5);
  await expect(page.locator('#axis-table')).toContainText('마른 질감');
  await page.locator('#compare-b').selectOption('creamy');
  await expect(page.locator('#difference-note')).toContainText('같은 인상');
  expect(await page.locator('.shape-a').getAttribute('points')).toBe(await page.locator('.shape-b').getAttribute('points'));
});

test('reset, keyboard operation, modal dismissal and reduced motion work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#reset-map').click();
  await expect(page.locator('.map-node.selected')).toHaveCount(0);
  await expect(page.locator('.detail-name')).toHaveText('Stay curious.');
  await page.locator('[data-concept="soapy"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-concept="soapy"]')).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('.map-node').first().evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
  await page.locator('#open-method').click();
  await expect(page.locator('#method-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#method-dialog')).not.toBeVisible();
  await expect(page.locator('#open-method')).toBeFocused();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`at ${width}px the map works without horizontal overflow or overlapping nodes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = []; page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.locator('[data-concept="powdery"]').click();
    await expect(page.locator('.detail-name')).toContainText('Powdery');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const rects = await page.locator('.map-node').evaluateAll((nodes) => nodes.map((node) => { const {x,y,width,height} = node.getBoundingClientRect(); return {x,y,width,height}; }));
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      expect(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y).toBe(false);
    }
    expect(errors).toEqual([]);
  });
}
