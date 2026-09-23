const { test, expect } = require("@playwright/test");
const { customtest } = require("../utils/test-base");
const { PageObjectManager } = require("../pageobjects/PageObjectManager");
const testData = JSON.parse(
  JSON.stringify(require("../utils/ClientAppPOTestData.json")),
);

for (const data of testData) {
  test(`Implementing Page Object Model for the End to end flow test: ${data.productName}`, async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

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
    await loginPage.validLogin(data.userEmail, data.userPassword);

    //SEARCH AND ADD PRODUCT TO CART
    await dashboardPage.searchProductAndAddToCart(data.productName);
    await dashboardPage.navigateToCart();

    //VERIFY CART AND PROCEED TO CHECKOUT
    await cartPage.waitForCartItems();
    const isVisible = await cartPage.checkIfProductIsInCart(data.productName);
    expect(isVisible).toBeTruthy();
    await cartPage.proceedToCheckout();

    //FILL CHECKOUT INFORMATION AND PLACE ORDER
    await checkoutPage.fillPersonalInformation(
      data.cvvCode,
      data.nameOnCard,
      data.applyCoupon,
    );
    await checkoutPage.clickCouponButton();
    expect(await checkoutPage.checkIfCouponApplied()).toBeTruthy();
    await checkoutPage.selectCountryFromDropdown("India");
    expect(
      await checkoutPage.checkIfUserEmailDisplayed(data.userEmail),
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
}

customtest(
  `Implementing Page Object Model for the End to end flow test: custom fixtures`,
  async ({ browser, testDataForOrder }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

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
    await loginPage.validLogin(
      testDataForOrder.userEmail,
      testDataForOrder.userPassword,
    );

    //SEARCH AND ADD PRODUCT TO CART
    await dashboardPage.searchProductAndAddToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    //VERIFY CART AND PROCEED TO CHECKOUT
    await cartPage.waitForCartItems();
    const isVisible = await cartPage.checkIfProductIsInCart(
      testDataForOrder.productName,
    );
    expect(isVisible).toBeTruthy();
    await cartPage.proceedToCheckout();

    //FILL CHECKOUT INFORMATION AND PLACE ORDER
    await checkoutPage.fillPersonalInformation(
      testDataForOrder.cvvCode,
      testDataForOrder.nameOnCard,
      testDataForOrder.applyCoupon,
    );
    await checkoutPage.clickCouponButton();
    expect(await checkoutPage.checkIfCouponApplied()).toBeTruthy();
    await checkoutPage.selectCountryFromDropdown("India");
    expect(
      await checkoutPage.checkIfUserEmailDisplayed(testDataForOrder.userEmail),
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
  },
);
