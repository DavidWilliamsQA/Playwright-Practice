const { test, expect } = require("@playwright/test");

test.only("End to End test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";

  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");
  const loginButton = page.locator("#login");
  const cartButton = page.locator("[routerlink*='cart']");
  await userEmail.fill("test123333@test.com");
  await userPassword.fill("Password$12");
  await loginButton.click();

  await page.locator(".card-body b").first().waitFor();

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await cartButton.click();
  await page.locator("div li").first().waitFor();

  await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();
});
