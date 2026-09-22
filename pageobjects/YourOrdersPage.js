class YourOrdersPage {
  constructor(page) {
    this.page = page;
    this.table = this.page.locator("tbody");
    this.rows = page.locator("tbody tr");
  }

  async waitForTableToAppear() {
    await this.table.waitFor();
  }

  async searchOrderIdAndClick(orderId) {
    const rowsCount = await this.rows.count();
    for (let i = 0; i < rowsCount; ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}

module.exports = { YourOrdersPage };
