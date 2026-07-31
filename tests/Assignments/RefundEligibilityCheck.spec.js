const { test, expect } = require("@playwright/test");

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const USER_EMAIL = "test123333@test.com";
const USER_PASSWORD = "Password$12";

async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  const userEmail = page.getByPlaceholder("you@email.com");
  const userPassword = page.getByLabel("Password");
  const loginButton = page.locator("#login-btn");

  await userEmail.fill(USER_EMAIL);
  await userPassword.fill(USER_PASSWORD);
  await loginButton.click();
}

test("Test 1 - Single ticket booking is eligible for refund", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page);

  await expect(page.getByText("Browse Events →")).toBeVisible();

  await page.goto(`${BASE_URL}/events`);

  await page.locator("#event-card").first().waitFor();

  const events = page.locator("[data-testid='event-card']");
  await events.first().locator("[data-testid='book-now-btn']").click();

  await expect(page.locator("#ticket-count")).toHaveText("1");
  const fullName = page.getByLabel("Full Name");
  const email = page.locator("#customer-email");
  const phoneNumber = page.getByPlaceholder("+91 98765 43210");
  const confirmBookingButton = page.locator(".confirm-booking-btn");

  await fullName.fill("John Doe");
  await email.fill("test13@test.com");
  await phoneNumber.fill("+91 98765 43210");
  await confirmBookingButton.click();

  await expect(page.getByText("Booking Confirmed!")).toBeVisible();

  const bookingsPage = page.locator("#nav-bookings");
  await bookingsPage.click();

  await expect(
    page.getByText("View and manage all your ticket bookings"),
  ).toBeVisible();
  expect(page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");

  await page
    .locator("#booking-card")
    .first()
    .locator('a[href*="/bookings"]')
    .click();

  await expect(page.getByText("Booking Information")).toBeVisible();

  const bookingRef = await page.locator(".font-mono").first().textContent();
  const bookingRefFirstLetter = bookingRef[0];

  const eventTitleText = await page.locator("h1").first().textContent();
  const eventTitleFirstLetter = eventTitleText[0];

  expect(bookingRefFirstLetter).toBe(eventTitleFirstLetter);

  const refundButton = page.locator("#check-refund-btn");
  await refundButton.click();

  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  const result = await page.locator("#refund-result");
  await expect(result).toBeVisible();
  const resultText = await result.textContent();
  await expect(resultText).toContain("Eligible for refund");
  await expect(resultText).toContain(
    "Single-ticket bookings qualify for a full refund",
  );
});

test.only("Test 2 - Group ticket booking is NOT eligible for refund", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page);

  await expect(page.getByText("Browse Events →")).toBeVisible();

  await page.goto(`${BASE_URL}/events`);

  await page.locator("#event-card").first().waitFor();

  const events = page.locator("[data-testid='event-card']");
  await events.first().locator("[data-testid='book-now-btn']").click();

  await expect(page.locator("#ticket-count")).toHaveText("1");

  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();

  const fullName = page.getByLabel("Full Name");
  const email = page.locator("#customer-email");
  const phoneNumber = page.getByPlaceholder("+91 98765 43210");
  const confirmBookingButton = page.locator(".confirm-booking-btn");

  await fullName.fill("John Doe");
  await email.fill("test13@test.com");
  await phoneNumber.fill("+91 98765 43210");
  await confirmBookingButton.click();

  await expect(page.getByText("Booking Confirmed!")).toBeVisible();

  const bookingsPage = page.locator("#nav-bookings");
  await bookingsPage.click();

  await expect(
    page.getByText("View and manage all your ticket bookings"),
  ).toBeVisible();
  expect(page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");

  await page
    .locator("#booking-card")
    .first()
    .locator('a[href*="/bookings"]')
    .click();

  await expect(page.getByText("Booking Information")).toBeVisible();

  const bookingRef = await page.locator(".font-mono").first().textContent();
  const bookingRefFirstLetter = bookingRef[0];

  const eventTitleText = await page.locator("h1").first().textContent();
  const eventTitleFirstLetter = eventTitleText[0];

  expect(bookingRefFirstLetter).toBe(eventTitleFirstLetter);

  const refundButton = page.locator("#check-refund-btn");
  await refundButton.click();

  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  const result = await page.locator("#refund-result");
  await expect(result).toBeVisible();
  const resultText = await result.textContent();
  await expect(resultText).toContain("Not eligible for refund");
  await expect(resultText).toContain(
    "Group bookings (3 tickets) are non-refundable",
  );
});
