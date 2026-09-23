const playwright = require("@playwright/test");
const { PageObjectManager } = require("../../pageobjects/PageObjectManager");
const { Before, After, AfterStep } = require("@cucumber/cucumber");

Before(async function () {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();

  this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function () {
  console.log("After hook executed");
});

AfterStep(async function ({ result }) {
  console.log("After step executed");
  if (result.status === "FAILED") {
    await this.page.screenshot({ path: `error-${Date.now()}.png` });
    console.log("Step failed");
  } else if (result.status === "PASSED") {
    console.log("Step passed");
  }
});
