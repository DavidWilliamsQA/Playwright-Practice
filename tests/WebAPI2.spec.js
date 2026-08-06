const { test, expect, request } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");
  const loginButton = page.locator("#login");

  const userEmailText = "test123333@test.com";
  const userPasswordText = "Password$12";

  await userEmail.fill(userEmailText);
  await userPassword.fill(userPasswordText);
  await loginButton.click();

  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
});

test.only("Web API test2", async ({}) => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  const ordersButton = page.locator("button[routerlink*='myorders']");
  await ordersButton.click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const rowsCount = await rows.count();
  for (let i = 0; i < rowsCount; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
