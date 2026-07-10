const { test, expect } = require("@playwright/test");

test.only("Register a new user and login as the new user", async ({ page }) => {
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
  const firstNameValue = "John";
  const lastNameValue = "Doe";
  const emailValue = `test${Date.now()}@test.com`;
  const passwordValue = "Password123";
  const confirmPasswordValue = "Password123";
  const occupationValue = "Student";

  await firstName.fill(firstNameValue);
  await lastName.fill(lastNameValue);
  await email.fill(emailValue);
  await password.fill(passwordValue);
  await confirmPassword.fill(confirmPasswordValue);
  await occupationDropdown.selectOption({ label: occupationValue });
  await maleRadio.check();
  await userMobile.fill("1234567890");
  await ageCheckbox.check();
  await registerButton.click();

  await expect(page.locator(".headcolor")).toHaveText(
    "Account Created Successfully",
  );
  const loginButton = page.locator(".btn.btn-primary");

  await loginButton.click();

  await email.fill(emailValue);
  await password.fill(passwordValue);
  const loginSubmitButton = page.locator("#login");
  await loginSubmitButton.click();

  const firstItem = await page.locator(".card-body b").nth(0).textContent();
  expect(firstItem).toBe("ADIDAS ORIGINAL");
});
