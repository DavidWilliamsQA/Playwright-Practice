const { test, expect } = require("@playwright/test");

test("Popup validation", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://google.com");
  //   await page.goBack()
  //   await page.goForward();
  //   await page.goBack();

  await expect(page.locator("#displayed-text")).toBeVisible();

  const hideButton = page.locator("#hide-textbox");
  await hideButton.click();

  await expect(page.locator("#displayed-text")).toBeHidden();

  const showButton = page.locator("#show-textbox");
  await showButton.click();

  await expect(page.locator("#displayed-text")).toBeVisible();

  page.on("dialog", (dialog) => dialog.accept());

  const confirmButton = page.locator("#confirmbtn");
  await confirmButton.click();

  await page.locator("#mousehover").hover();

  const framesPage = await page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //Picking the element that is visible on the page

  const text = await framesPage.locator(".text h2").textContent();
  const extractedText = text.split(" ")[1];
  console.log(extractedText);
});

test.only("Screenshots and visual comparisons", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "displayed-text.png" });
  const hideButton = page.locator("#hide-textbox");
  await hideButton.click();
  await page.screenshot({ path: "screenshot.png" });

  await expect(page.locator("#displayed-text")).toBeHidden();
});
