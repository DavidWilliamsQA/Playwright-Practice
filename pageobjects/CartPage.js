class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator("div li");
    this.checkoutButton = page.locator("text=Checkout");
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async checkIfProductIsInCart(productName) {
    const isVisible = await this.page
      .locator(`h3:has-text('${productName}')`)
      .isVisible();
    return isVisible;
  }

  async waitForCartItems() {
    await this.cartItems.first().waitFor();
  }
}

module.exports = { CartPage };
