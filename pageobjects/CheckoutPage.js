class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cvvCode = page.locator(".input.txt").nth(1);
    this.nameOnCard = page.locator(".input.txt").nth(2);
    this.applyCoupon = page.locator(".input.txt").nth(3);
    this.selectCountry = page.locator(".input.txt").nth(5);
    this.couponButton = page.locator(".btn.btn-primary.mt-1");
    this.countryOption = page.locator(".ta-results");
    this.placeorderButton = page.locator(".action__submit");
  }

  async fillPersonalInformation(cvv, nameOnCard, applyCoupon) {
    await this.cvvCode.fill(cvv);
    await this.nameOnCard.fill(nameOnCard);
    await this.applyCoupon.fill(applyCoupon);
  }

  async clickCouponButton() {
    await this.couponButton.click();
  }

  async selectCountryFromDropdown(countryName) {
    await this.selectCountry.pressSequentially(countryName, { delay: 100 });
    await this.countryOption.waitFor();
    const optionsCount = await this.countryOption.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const optionText = await this.countryOption
        .locator("button")
        .nth(i)
        .textContent();
      if (optionText.trim() === "India") {
        await this.countryOption.locator("button").nth(i).click();
        break;
      }
    }
  }

  async clickPlaceOrderButton() {
    await this.placeorderButton.click();
  }

  async checkIfCouponApplied() {
    const couponMessage = await this.page
      .locator(".mt-1.ng-star-inserted")
      .textContent();
    return couponMessage.includes("* Coupon Applied");
  }

  async checkIfUserEmailDisplayed(expectedEmail) {
    const userEmailDisplayed = await this.page
      .locator(".user__name [type='text']")
      .first()
      .textContent();
    return userEmailDisplayed.trim() === expectedEmail;
  }
}

module.exports = { CheckoutPage };
