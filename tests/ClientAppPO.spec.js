const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { CheckoutPage } = require("../pageobjects/CheckoutPage");
const {
  OrderConfirmationPage,
} = require("../pageobjects/OrderConfirmationPage");
const { YourOrdersPage } = require("../pageobjects/YourOrdersPage");
test.only("Implementing Page Object Model for login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = "test123333@test.com";
  const password = "Password$12";

  const productName = "iphone 13 pro";

  const cvvCode = "123";
  const nameOnCard = "John Doe";
  const applyCoupon = "rahulshettyacademy";

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);
  const yourOrdersPage = new YourOrdersPage(page);

  //LOGIN PROCESS
  await loginPage.goTo();
  await loginPage.validLogin(username, password);

  //SEARCH AND ADD PRODUCT TO CART
  await dashboardPage.searchProductAndAddToCart(productName);
  await dashboardPage.navigateToCart();

  //VERIFY CART AND PROCEED TO CHECKOUT
  await cartPage.waitForCartItems();
  const isVisible = await cartPage.checkIfProductIsInCart(productName);
  expect(isVisible).toBeTruthy();
  await cartPage.proceedToCheckout();

  //FILL CHECKOUT INFORMATION AND PLACE ORDER
  await checkoutPage.fillPersonalInformation(cvvCode, nameOnCard, applyCoupon);
  await checkoutPage.clickCouponButton();
  expect(await checkoutPage.checkIfCouponApplied()).toBeTruthy();
  await checkoutPage.selectCountryFromDropdown("India");
  expect(await checkoutPage.checkIfUserEmailDisplayed(username)).toBeTruthy();
  await checkoutPage.clickPlaceOrderButton();

  //VERIFY ORDER CONFIRMATION
  expect(await orderConfirmationPage.checkThankYouMessage()).toBe(
    " Thankyou for the order. ",
  );
  let orderId = await orderConfirmationPage.getOrderId();
  await orderConfirmationPage.clickMyOrdersButton();

  //VERIFY ORDER IN YOUR ORDERS PAGE
  await yourOrdersPage.waitForTableToAppear();
  await yourOrdersPage.searchOrderIdAndClick(orderId);

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
