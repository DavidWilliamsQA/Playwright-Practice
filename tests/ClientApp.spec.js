const { test, expect } = require("@playwright/test");

test.only("Register a new user", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const registerLink = page.locator(".text-reset");
  await registerLink.click();
  await expect(page.locator(".login-title")).toHaveText("Register");

  const firstName = page.locator("#firstName");
  const lastName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const userMobile = page.locator("#userMobile");
  const confirmPassword = page.locator("#confirmPassword");
  const registerButton = page.locator("#login");
  const occupationDropdown = page.locator(
    'select[formcontrolname="occupation"]',
  );
  const maleRadio = page.locator('input[type="radio"][value="Male"]');
  const femaleRadio = page.locator('input[type="radio"][value="Female"]');
  const ageCheckbox = page.locator('input[type="checkbox"]');

  await firstName.fill("John");
  await lastName.fill("Doe");
  await email.fill(`test${Date.now()}@test.com`);
  await password.fill("Password123");
  await confirmPassword.fill("Password123");
  await occupationDropdown.selectOption({ label: "Student" });
  await maleRadio.check();
  await userMobile.fill("1234567890");
  await ageCheckbox.check();
  await registerButton.click();

  await expect(page.locator(".headcolor")).toHaveText(
    "Account Created Successfully",
  );
});
