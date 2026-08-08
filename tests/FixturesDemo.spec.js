const { test, expect } = require("@playwright/test");
const { customtest } = require("./utils/fixtures");

customtest("Fixtures demo", async ({ authenticatedPage, createOrder }) => {
  await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
  const ordersButton = authenticatedPage.locator(
    "button[routerlink*='myorders']",
  );
  await ordersButton.click();
  await authenticatedPage.locator("tbody").waitFor();
  await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
});
