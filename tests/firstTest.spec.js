const { test, expect } = require("@playwright/test");

test("First Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  const pagetitle = await page.title();
  console.log(await page.title());
  expect(pagetitle).toBe("Google");
});

test("Testing Login to Rahul Shetty Academy with Invalid Credentials", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pagetitle = await page.title();
  expect(pagetitle).toBe("LoginPage Practise | Rahul Shetty Academy");

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");

  await username.fill("invalidUser");
  await password.fill("invalidPassword");
  await signInButton.click();

  const errorMessage = page.locator(".alert-danger");
  await expect(errorMessage).toHaveText("Incorrect username/password.");
});

test("Testing Login to Rahul Shetty Academy", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pagetitle = await page.title();
  expect(pagetitle).toBe("LoginPage Practise | Rahul Shetty Academy");

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");

  await username.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInButton.click();

  const firstItem = await page.locator(".card-body a").nth(0).textContent();
  expect(firstItem).toBe("iphone X");
});
