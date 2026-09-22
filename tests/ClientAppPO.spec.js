const { test, expect } = require("@playwright/test");
const { PageObjectManager } = require("../pageobjects/PageObjectManager");
const testData = JSON.parse(
  JSON.stringify(require("../utils/ClientAppPOTestData.json")),
);

test.only("Implementing Page Object Model for the End to end flow test", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // const username = "test123333@test.com";
  // const password = "Password$12";

  // const productName = "iphone 13 pro";

  // const cvvCode = "123";
  // const nameOnCard = "John Doe";
  // const applyCoupon = "rahulshettyacademy";

  const pageObjectManager = new PageObjectManager(page);

  const loginPage = pageObjectManager.getLoginPage();
  const dashboardPage = pageObjectManager.getDashboardPage();
  const cartPage = pageObjectManager.getCartPage();
  const checkoutPage = pageObjectManager.getCheckoutPage();
  const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();
  const yourOrdersPage = pageObjectManager.getYourOrdersPage();
  const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

  //LOGIN PROCESS
  await loginPage.goTo();
  await loginPage.validLogin(testData.userEmail, testData.userPassword);

  //SEARCH AND ADD PRODUCT TO CART
  await dashboardPage.searchProductAndAddToCart(testData.productName);
  await dashboardPage.navigateToCart();

  //VERIFY CART AND PROCEED TO CHECKOUT
  await cartPage.waitForCartItems();
  const isVisible = await cartPage.checkIfProductIsInCart(testData.productName);
  expect(isVisible).toBeTruthy();
  await cartPage.proceedToCheckout();

  //FILL CHECKOUT INFORMATION AND PLACE ORDER
  await checkoutPage.fillPersonalInformation(
    testData.cvvCode,
    testData.nameOnCard,
    testData.applyCoupon,
  );
  await checkoutPage.clickCouponButton();
  expect(await checkoutPage.checkIfCouponApplied()).toBeTruthy();
  await checkoutPage.selectCountryFromDropdown("India");
  expect(
    await checkoutPage.checkIfUserEmailDisplayed(testData.userEmail),
  ).toBeTruthy();
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

  //VERIFY ORDER DETAILS IN ORDER SUMMARY PAGE
  const orderIdDetails = await orderSummaryPage.getOrderDetails();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
