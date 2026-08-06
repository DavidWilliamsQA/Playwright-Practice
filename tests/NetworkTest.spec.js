const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
const payload = {
  userEmail: "test123333@test.com",
  userPassword: "Password$12",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const fakePayload = { date: [], message: "No Orders" };

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

test.only("Web API test: Intercepting the network payload", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a51693785b8849b49de892d",
    async (route) => {
      // intercepting the response
      const response = await page.request.fetch(route.request());
      let body = fakePayload;
      route.fulfill({
        response,
        body: JSON.stringify(body),
      });
    },
  );

  await page.pause();

  const ordersButton = page.locator("button[routerlink*='myorders']");
  await ordersButton.click();

  await page.locator("tbody").waitFor();
});
