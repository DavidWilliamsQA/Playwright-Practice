const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
const payload = {
  userEmail: "test123333@test.com",
  userPassword: "Password$12",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
let token;
let orderId;
let response;

test.beforeAll(async () => {
  // Setup code before all tests run
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, payload);
  response = await apiUtils.createOrder(orderPayload);
  orderId = response.orderId;
});

test("Web API test: Verify order appears in the list of orders", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

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
