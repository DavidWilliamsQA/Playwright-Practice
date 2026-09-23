const { Given, When, Then } = require("@cucumber/cucumber");
const { playwright } = require("@playwright/test");
const { PageObjectManager } = require("../../pageobjects/PageObjectManager");

Given(
  "I login using the {string} and {string} credentials",
  async function (username, password) {
    this.userEmail = username;
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pageObjectManager = new PageObjectManager(this.page);

    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  },
);

When("I add {string} to the cart", async function (product) {
  const dashboardPage = this.pageObjectManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(product);
  await dashboardPage.navigateToCart();
});

Then("I should see the {string} in the cart", async function (product) {
  const cartPage = this.pageObjectManager.getCartPage();
  await cartPage.waitForCartItems();
  const isVisible = await cartPage.checkIfProductIsInCart(product);
  expect(isVisible).toBeTruthy();
});

Then("I should proceed to checkout", async function () {
  const cartPage = this.pageObjectManager.getCartPage();
  await cartPage.proceedToCheckout();
});

When(
  "I fill in the checkout information: CVV - {}, Name on card - {} and coupon - {}",
  async function (cvv, nameOnCard, coupon) {
    const checkoutPage = this.pageObjectManager.getCheckoutPage();
    await checkoutPage.fillPersonalInformation(cvv, nameOnCard, coupon);
  },
);

Then("I should see the coupon applied", async function () {
  const checkoutPage = this.pageObjectManager.getCheckoutPage();
  await checkoutPage.clickCouponButton();
  expect(await checkoutPage.checkIfCouponApplied()).toBeTruthy();
});

Then("I should select the country from the dropdown", async function () {
  const checkoutPage = this.pageObjectManager.getCheckoutPage();
  await checkoutPage.selectCountryFromDropdown("India");
});

Then("I should see my email displayed", async function () {
  const checkoutPage = this.pageObjectManager.getCheckoutPage();
  expect(
    await checkoutPage.checkIfUserEmailDisplayed(this.userEmail),
  ).toBeTruthy();
});

Then("I should place the order successfully", async function () {
  const checkoutPage = this.pageObjectManager.getCheckoutPage();
  await checkoutPage.placeOrder();
});

Then("I should see the order confirmation", async function () {
  const orderConfirmationPage =
    this.pageObjectManager.getOrderConfirmationPage();
  expect(await orderConfirmationPage.checkThankYouMessage()).toBe(
    " Thankyou for the order. ",
  );
});
