const base = require("@playwright/test");
const { request } = require("@playwright/test");
const { APIUtils } = require("./APIUtils");
const payload = {
  userEmail: "test123333@test.com",
  userPassword: "Password$12",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

const customtest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const cartButton = page.locator("[routerlink*='cart']");
    const userEmailText = "test123333@test.com";
    const userPasswordText = "Password$12";
    await userEmail.fill(userEmailText);
    await userPassword.fill(userPasswordText);
    await loginButton.click();
    await page.waitForLoadState("networkidle");
    await use(page);
    // code put in here will run after the test is done, for example, cleanup code
  },
  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, payload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    // code put in here will run after the test is done, for example, cleanup code
  },
});

module.exports = { customtest };
