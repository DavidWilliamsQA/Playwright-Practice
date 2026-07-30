const { test, expect } = require("@playwright/test");

test.only("", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/login");

  const userEmail = page.getByPlaceholder("you@email.com");
  const userPassword = page.getByLabel("Password");
  const loginButton = page.locator("#login-btn");

  const userEmailText = "test123333@test.com";
  const userPasswordText = "Password$12";

  await userEmail.fill(userEmailText);
  await userPassword.fill(userPasswordText);
  await loginButton.click();

  await expect(page.getByText("Browse Events →")).toBeVisible();

  await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");

  const eventTitleText = `Test Event ${Date.now()}`;
  const eventDescriptionText = "This is a test event description.";
  const eventCityText = "Test City";
  const eventVenueText = "Test Venue";
  const eventPriceText = "100";
  const eventTotalSeats = "50";
  const eventDateTime = `${Date.futureDate(7)}T10:00`;

  const eventTitle = page.loctor("#event-title-input");
  const eventDescription = page.locator("#admin-event-form");
  const eventCity = page.getByLabel("City");
  const eventVenue = page.getByLabel("Venue");
  const eventPrice = page.getByLabel("Price ($)");
  const eventTotalSeats = page.getByLabel("Total Seats");
  const eventDateTimeInput = page.getByLabel("Event Date & Time");
  const createEventButton = page.locator("#create-event-btn");
  const addEventButton = page.locator("#add-event-btn");

  await eventTitle.fill(eventTitleText);
  await eventDescription.fill(eventDescriptionText);
  await eventCity.fill(eventCityText);
  await eventVenue.fill(eventVenueText);
  await eventPrice.fill(eventPriceText);
  await eventTotalSeats.fill(eventTotalSeats);
  await eventDateTimeInput.fill(eventDateTime);
  //   await page.fill('input[type="datetime-local"]', '2026-07-30T14:30');
  await addEventButton.click();
});
