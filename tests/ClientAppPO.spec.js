const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");

test.only("Implementing Page Object Model for login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = "test123333@test.com";
  const password = "Password$12";

  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validLogin(username, password);

  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";

  const cartButton = page.locator("[routerlink*='cart']");

  await page.locator(".card-body b").first().waitFor();

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await cartButton.click();
  await page.locator("div li").first().waitFor();

  const isVisible = await page
    .locator("h3:has-text('iphone 13 pro')")
    .isVisible();
  expect(isVisible).toBeTruthy();

  const checkoutButton = page.locator("text=Checkout");
  await checkoutButton.click();

  const cvvCode = await page.locator(".input.txt").nth(1);
  const nameOnCard = await page.locator(".input.txt").nth(2);
  const applyCoupon = await page.locator(".input.txt").nth(3);
  const selectCountry = await page.locator(".input.txt").nth(5);
  const couponButton = await page.locator(".btn.btn-primary.mt-1");

  await cvvCode.fill("123");
  await nameOnCard.fill("John Doe");
  await applyCoupon.fill("rahulshettyacademy");

  await couponButton.click();
  expect(await page.locator(".mt-1.ng-star-inserted").textContent()).toContain(
    "* Coupon Applied",
  );

  await selectCountry.pressSequentially("ind", { delay: 100 });
  const countryOption = page.locator(".ta-results");
  await countryOption.waitFor();
  const optionsCount = await countryOption.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const optionText = await countryOption
      .locator("button")
      .nth(i)
      .textContent();
    if (optionText.trim() === "India") {
      await countryOption.locator("button").nth(i).click();
      break;
    }
  }

  const userEmailDisplayed = await page
    .locator(".user__name [type='text']")
    .first()
    .textContent();
  expect(userEmailDisplayed.trim()).toBe(username);

  const placeorderButton = page.locator(".action__submit");
  await placeorderButton.click();

  const thankYoumessage = await page.locator(".hero-primary").textContent();
  expect(thankYoumessage).toBe(" Thankyou for the order. ");

  let orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  orderId = orderId.replaceAll("|", "").trim();

  console.log(orderId);

  const ordersButton = page.locator("button[routerlink*='myorders']");
  await ordersButton.click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const rowsCount = await rows.count();
  for (let i = 0; i < rowsCount; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
