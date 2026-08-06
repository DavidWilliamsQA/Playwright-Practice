const { test, expect, request } = require("@playwright/test");

test.only("Security Test request intercepting the request", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";

  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");
  const loginButton = page.locator("#login");
  const cartButton = page.locator("[routerlink*='cart']");
  const userEmailText = "test123333@test.com";
  const userPasswordText = "Password$12";
  await userEmail.fill(userEmailText);
  await userPassword.fill(userPasswordText);
  await loginButton.click();

  await page.locator(".card-body b").first().waitFor();

  const ordersButton = page.locator("button[routerlink*='myorders']");
  await ordersButton.click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) => {
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      });
    },
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
