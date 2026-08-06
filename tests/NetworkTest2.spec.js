const { test, expect, request } = require("@playwright/test");

test("Security Test request intercept", async ({ page }) => {
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) => {
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a74cca385b8849b493342ec",
      });
    },
  );
  await page.locator("button:has-text('View')").first().click();
});
