class OrderSummaryPage {
  constructor(page) {
    this.page = page;
  }

  async getOrderDetails() {
    const orderIdDetails = await this.page.locator(".col-text").textContent();
    return orderIdDetails;
  }
}

module.exports = { OrderSummaryPage };
