import { test, expect } from "@playwright/test";
import {
  concepts,
  relations,
  familyMembers,
  comparisons,
  impressions,
} from "../src/data.js";
const families = concepts.filter((c) => c.type === "family");

test("five types, eight consistent families and explained many-to-many relations", () => {
  expect(new Set(concepts.map((c) => c.type))).toEqual(
    new Set(["family", "note", "descriptor", "accord", "material"]),
  );
  expect(families.map((c) => c.name)).toEqual([
    "Fresh",
    "Floral",
    "Floriental",
    "Ambrée",
    "Gourmand",
    "Chypre",
    "Woody",
    "Fougère",
  ]);
  expect(new Set(concepts.map((c) => c.id)).size).toBe(concepts.length);
  expect(concepts.find((c) => c.id === "musk").type).toBe("note");
  expect(concepts.find((c) => c.id === "musky").type).toBe("descriptor");
  expect(concepts.find((c) => c.id === "fresh").type).toBe("family");
  expect(concepts.find((c) => c.id === "fresh-impression").type).toBe(
    "descriptor",
  );
  for (const edge of relations) {
    expect(concepts.some((c) => c.id === edge.fromId)).toBe(true);
    expect(concepts.some((c) => c.id === edge.toId)).toBe(true);
    expect(edge.explanation.length).toBeGreaterThan(15);
    expect(edge.source).toBeTruthy();
    expect(edge.kind).toBeTruthy();
  }
  expect(
    Object.values(familyMembers).filter((ids) => ids.includes("bergamot"))
      .length,
  ).toBeGreaterThan(1);
  expect(concepts.find((c) => c.id === "sandalwood").facets).toContain(
    "creamy",
  );
  for (const comparison of Object.values(comparisons)) {
    expect(comparison.axes).toHaveLength(5);
    expect(
      comparison.axes.every(
        (axis) => axis.length === 4 && axis.every((v) => typeof v === "string"),
      ),
    ).toBe(true);
  }
  expect(Object.values(impressions).every((c) => !("values" in c))).toBe(true);
});

test("overview shows only eight families; expansion retains all other directions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".map-node")).toHaveCount(8);
  await expect(page.locator(".map-node.note")).toHaveCount(0);
  await page.locator('[data-concept="woody"]').click();
  await expect(page.locator(".map-node.family")).toHaveCount(8);
  await expect(page.locator("#expanded-layer .map-node")).toHaveCount(7);
  await expect(page.locator('[data-concept="creamy"]')).toHaveClass(/related/);
  await expect(page.locator('[data-concept="floral"]')).toHaveClass(/distant/);
  await expect(page.locator(".detail-name")).toContainText("Woody");
  await page.locator("#reset-map").click();
  await expect(page.locator(".map-node")).toHaveCount(8);
  await expect(page.locator("#compare-dialog")).not.toBeVisible();
});

test("all eight directions reveal notes, descriptors and their meanings", async ({
  page,
}) => {
  await page.goto("/");
  for (const family of families) {
    await page.locator(`[data-concept="${family.id}"]`).click();
    await expect(page.locator(".detail-description")).toHaveText(
      family.description,
    );
    await expect(page.locator("#expanded-layer .map-node")).toHaveCount(
      familyMembers[family.id].length,
    );
    await expect(page.locator(".map-node.family")).toHaveCount(8);
  }
});

test("note facets and professional material details remain distinct", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-concept="woody"]').click();
  await page.locator('[data-concept="sandalwood"]').click();
  await expect(page.locator(".type-tag")).toContainText("NOTE");
  await expect(
    page.locator('#expanded-layer [data-concept="creamy"]'),
  ).toBeVisible();
  await expect(
    page.locator('#expanded-layer [data-concept="warm"]'),
  ).toBeVisible();
  await page.locator(".professional-detail summary").click();
  await expect(page.locator(".professional-detail")).toContainText(
    "Sandalwood Oil",
  );
  await expect(page.locator(".professional-detail")).toContainText("MATERIAL");
  await page.locator('.shared-families [data-select="gourmand"]').click();
  await expect(page.locator(".detail-name")).toContainText("Gourmand");
});

test("accord and material are disclosed inside a family, not as map categories", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-concept="fougere"]').click();
  await page.locator(".professional-detail summary").click();
  await expect(page.locator(".professional-detail")).toContainText(
    "Fougère Accord",
  );
  await expect(page.locator(".professional-detail")).toContainText("Coumarin");
  await expect(page.locator(".map-node.accord,.map-node.material")).toHaveCount(
    0,
  );
});

test("Musk note and Musky descriptor stay separate while expanding within Floral", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-concept="floral"]').click();
  await page.locator('[data-concept="musk"]').click();
  await expect(page.locator(".type-tag")).toContainText("NOTE");
  await expect(
    page.locator('#expanded-layer [data-concept="musky"]'),
  ).toBeVisible();
  await page.locator('#expanded-layer [data-concept="musky"]').click();
  await expect(page.locator(".type-tag")).toContainText("DESCRIPTOR");
  await expect(page.locator("#map-breadcrumb")).toContainText("Floral");
});

test("contextual comparison preserves map state and provides qualitative pentagon", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-concept="woody"]').click();
  await page.locator(".detail-compare").click();
  await expect(page.locator("#compare-dialog")).toBeVisible();
  await expect(page.locator("#comparison-context")).toContainText("Woody");
  await expect(page.locator("#compare-a")).toHaveValue("dry-woody");
  await expect(page.locator("#axis-table tbody tr")).toHaveCount(5);
  await expect(page.locator("#axis-table")).toContainText("마른 결");
  await expect(page.locator("#radar .facet-frame")).toHaveCount(1);
  await expect(page.locator("#radar .radar-shape")).toHaveCount(0);
  await page.locator("#compare-b").selectOption("dry-woody");
  await expect(page.locator("#difference-note")).toContainText("같은 인상");
  await page.keyboard.press("Escape");
  await expect(page.locator("#compare-dialog")).not.toBeVisible();
  await expect(page.locator(".detail-name")).toContainText("Woody");
  await expect(page.locator(".detail-compare")).toBeFocused();
});

for (const [family, note, key] of [
  ["floral", "powdery", "clean"],
  ["floral", "musk", "musk"],
]) {
  test(`${key} comparison is nested in the selected concept and uses suitable axes`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator(`[data-concept="${family}"]`).click();
    await page.locator(`[data-concept="${note}"]`).click();
    await page.locator(".detail-compare").click();
    await expect(page.locator("#comparison-within")).toContainText(
      comparisons[key].within,
    );
    await expect(page.locator("#axis-table")).toContainText(
      comparisons[key].axes[0][0],
    );
    await expect(page.locator("#compare-a option")).toHaveCount(2);
  });
}

test("keyboard, reset, method dialog and reduced motion work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('[data-concept="woody"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-concept="woody"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(
    await page
      .locator(".map-node")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await page.locator("#open-method").click();
  await expect(page.locator("#method-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#open-method")).toBeFocused();
  await page.locator("#reset-map").click();
  await expect(page.locator(".map-node")).toHaveCount(8);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`at ${width}px overview, all expanded families and comparison have no overflow`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 950 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    for (const family of families) {
      await page.locator(`[data-concept="${family.id}"]`).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const rects = await page.locator(".map-node").evaluateAll((nodes) =>
        nodes.map((n) => {
          const { x, y, width, height } = n.getBoundingClientRect();
          return { x, y, width, height };
        }),
      );
      for (let i = 0; i < rects.length; i++)
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i],
            b = rects[j];
          expect(
            a.x < b.x + b.width &&
              a.x + a.width > b.x &&
              a.y < b.y + b.height &&
              a.y + a.height > b.y,
          ).toBe(false);
        }
    }
    await page.locator('[data-concept="woody"]').click();
    await page.locator(".detail-compare").click();
    expect(
      await page
        .locator("#compare-dialog")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
