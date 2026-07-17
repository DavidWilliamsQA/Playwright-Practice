import { test, expect } from "@playwright/test";

test("Get by locators: Using locators to get elements on the page", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");

  await page.getByPlaceholder("Password").fill("Password12345!");
  await page.getByRole("button", { name: "Submit" }).click();

  await page
    .getByText("Success! The Form has been submitted successfully!")
    .waitFor();

  expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
});

test("End to End test using Get By Locators", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";

  const userEmail = page.getByPlaceholder("email@example.com");
  const userPassword = page.getByPlaceholder("enter your passsword");
  const loginButton = page.getByRole("button", { name: "Login" });
  const cartButton = page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" });
  const userEmailText = "test123333@test.com";
  const userPasswordText = "Password$12";
  await userEmail.fill(userEmailText);
  await userPassword.fill(userPasswordText);
  await loginButton.click();

  await page.locator(".card-body b").first().waitFor();

  await products
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await cartButton.click();

  await page.locator("div li").first().waitFor();

  expect(page.getByText("iphone 13 pro")).toBeVisible();

  const checkoutButton = page.getByRole("button", { name: "Checkout" });
  await checkoutButton.click();

  const cvvCode = await page.locator(".input.txt").nth(1);
  const nameOnCard = await page.locator(".input.txt").nth(2);
  const applyCoupon = await page.locator(".input.txt").nth(3);
  const selectCountry = await page.getByPlaceholder("Select Country");
  const couponButton = await page.locator(".btn.btn-primary.mt-1");

  await cvvCode.fill("123");
  await nameOnCard.fill("John Doe");
  await applyCoupon.fill("rahulshettyacademy");

  await couponButton.click();
  expect(await page.locator(".mt-1.ng-star-inserted").textContent()).toContain(
    "* Coupon Applied",
  );

  await selectCountry.pressSequentially("ind", { delay: 100 });

  await page.getByRole("button", { name: "India" }).nth(1).click();

  const userEmailDisplayed = await page
    .locator(".user__name [type='text']")
    .first()
    .textContent();
  expect(userEmailDisplayed.trim()).toBe(userEmailText);

  const placeorderButton = page.getByText("Place Order");
  await placeorderButton.click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  let orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  orderId = orderId.replaceAll("|", "").trim();

  console.log(orderId);

  const ordersButton = page.getByRole("button", { name: "Orders" });
  await ordersButton.click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  await rows
    .filter({ hasText: orderId })
    .getByRole("button", { name: "View" })
    .click();

  await page.getByText("order summary").waitFor();

  const orderIdDetails = await page.getByText(orderId);
  expect(orderId.includes(await orderIdDetails.textContent())).toBeTruthy();
});
