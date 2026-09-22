const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");
const { YourOrdersPage } = require("./YourOrdersPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");

class PageObjectManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderConfirmationPage = new OrderConfirmationPage(page);
    this.yourOrdersPage = new YourOrdersPage(page);
    this.orderSummaryPage = new OrderSummaryPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrderConfirmationPage() {
    return this.orderConfirmationPage;
  }

  getYourOrdersPage() {
    return this.yourOrdersPage;
  }

  getOrderSummaryPage() {
    return this.orderSummaryPage;
  }
}

module.exports = { PageObjectManager };
