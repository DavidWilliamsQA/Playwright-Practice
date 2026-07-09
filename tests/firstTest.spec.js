const { test, expect } = require("@playwright/test");

test("First Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  const pagetitle = await page.title();
  console.log(await page.title());
  expect(pagetitle).toBe("Google");
});

test.only("Testing Login to Rahul Shetty Academy with Invalid Credentials", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pagetitle = await page.title();
  expect(pagetitle).toBe("LoginPage Practise | Rahul Shetty Academy");

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");

  await username.type("invalidUser");
  await password.type("invalidPassword");
  await signInButton.click();

  const errorMessage = page.locator(".alert-danger");
  await expect(errorMessage).toHaveText("Incorrect username/password.");
});
