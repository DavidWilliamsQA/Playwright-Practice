class OrderConfirmationPage {
  constructor(page) {
    this.page = page;
    this.myOrdersButton = this.page.locator("button[routerlink*='myorders']");
  }

  async getOrderId() {
    const orderId = await this.page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    return orderId.replaceAll("|", "").trim();
  }

  async getOrderIdDetails() {
    return await this.page.locator(".col-text").textContent();
  }

  async checkThankYouMessage() {
    const thankYoumessage = await this.page
      .locator(".hero-primary")
      .textContent();
    return thankYoumessage;
  }

  async clickMyOrdersButton() {
    await this.myOrdersButton.click();
  }
}

module.exports = { OrderConfirmationPage };
