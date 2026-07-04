const { test, expect } = require("@playwright/test");

test("First Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  const pagetitle = await page.title();
  expect(pagetitle, "Google");
});
