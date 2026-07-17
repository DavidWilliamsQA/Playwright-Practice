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
