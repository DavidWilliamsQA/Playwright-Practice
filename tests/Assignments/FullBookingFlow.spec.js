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

  await expect(page.getByText("New Event")).toBeVisible();

  const eventTitleText = `Test Event ${Date.now()}`;
  const eventDescriptionText = "This is a test event description.";
  const eventCityText = "Test City";
  const eventVenueText = "Test Venue";
  const eventPriceText = "100";
  const eventTotalSeatsText = "50";

  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7); // 7 days from now

  // Format as YYYY-MM-DD
  const formatted = futureDate.toISOString().split("T")[0]; // "2026-08-06"
  const eventDateTime = `${formatted}T10:00`;

  const eventTitle = page.locator("#event-title-input");
  const eventDescription = page.locator("#admin-event-form textarea");
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
  await eventTotalSeats.fill(eventTotalSeatsText);
  await eventDateTimeInput.fill(eventDateTime);
  //   await page.fill('input[type="datetime-local"]', '2026-07-30T14:30');
  await addEventButton.click();

  const toastMessage = await page.getByText("Event created!");
  await expect(toastMessage).toBeVisible();

  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  await expect(page.getByText("Upcoming Events")).toBeVisible();

  await page.locator("#event-card").first().waitFor();
  const events = page.locator("[data-testid='event-card']");

  let seatsBeforeBooking = 0;

  const count = await events.count();

  for (let i = 0; i < count; ++i) {
    if ((await events.nth(i).locator("h3").textContent()) === eventTitleText) {
      const text = await events.nth(i).locator(".text-xs").nth(1).textContent();
      seatsBeforeBooking = parseInt(text.match(/\d+/)[0]);
      await events.nth(i).locator("[data-testid='book-now-btn']").click();
      break;
    }
  }

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
  await expect(await page.locator(".booking-ref").first()).toBeVisible();

  const bookingRef = await page.locator(".booking-ref").first().textContent();
  console.log("Booking Reference: ", bookingRef);
});
