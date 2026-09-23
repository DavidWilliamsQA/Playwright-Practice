# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignments/FullBookingFlow.spec.js >> Assignment: Full booking event Flow
- Location: tests/Assignments/FullBookingFlow.spec.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Browse Events →')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Browse Events →') with timeout 5000ms
  - waiting for getByText('Browse Events →')

```

```yaml
- text: RSA Rahul Shetty Academy eventhub.app
- img "EventHub app preview"
- list:
  - listitem: ⚡ Live REST APIs — test real endpoints, not mocks
  - listitem: 🔒 Isolated sandbox — your data, your tests, no conflicts
  - listitem: 🎫 Auth, CRUD, bookings — flows you'll face on the job
  - listitem: 🤖 Built for Selenium, Playwright, RestAssured & more
- paragraph: 50,000+
- paragraph: QA engineers trained worldwide
- 'heading "The #1 QA Practice Hub for Automation Engineers" [level=2]'
- paragraph: EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.
- link "API Documentation (Swagger)":
  - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - img
  - text: API Documentation (Swagger)
- img
- heading "Sign in to EventHub" [level=1]
- paragraph: Enter your credentials to continue
- text: Email
- textbox "Email":
  - /placeholder: you@email.com
  - text: test123333@test.com
- text: Password
- textbox "Password":
  - /placeholder: ••••••
  - text: Password$12
- button "Sign In"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
- paragraph:
  - text: A practice environment by
  - link "RahulShettyAcademy.com":
    - /url: https://rahulshettyacademy.com
  - text: — used by QA engineers worldwide to master automation testing.
- text: ✕
- paragraph: Invalid email or password
- button "Dismiss": ×
- alert
```

# Test source

```ts
  1   | const { test, expect } = require("@playwright/test");
  2   | 
  3   | test("Assignment: Full booking event Flow", async ({ browser }) => {
  4   |   const context = await browser.newContext();
  5   |   const page = await context.newPage();
  6   |   await page.goto("https://eventhub.rahulshettyacademy.com/login");
  7   | 
  8   |   const eventsPage = page.locator("#nav-events");
  9   | 
  10  |   const userEmail = page.getByPlaceholder("you@email.com");
  11  |   const userPassword = page.getByLabel("Password");
  12  |   const loginButton = page.locator("#login-btn");
  13  | 
  14  |   const userEmailText = "test123333@test.com";
  15  |   const userPasswordText = "Password$12";
  16  | 
  17  |   await userEmail.fill(userEmailText);
  18  |   await userPassword.fill(userPasswordText);
  19  |   await loginButton.click();
  20  | 
> 21  |   await expect(page.getByText("Browse Events →")).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  22  | 
  23  |   await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
  24  | 
  25  |   await expect(page.getByText("New Event")).toBeVisible();
  26  | 
  27  |   const eventTitleText = `Test Event ${Date.now()}`;
  28  |   const eventDescriptionText = "This is a test event description.";
  29  |   const eventCityText = "Test City";
  30  |   const eventVenueText = "Test Venue";
  31  |   const eventPriceText = "100";
  32  |   const eventTotalSeatsText = "50";
  33  | 
  34  |   const today = new Date();
  35  |   const futureDate = new Date(today);
  36  |   futureDate.setDate(today.getDate() + 7); // 7 days from now
  37  | 
  38  |   // Format as YYYY-MM-DD
  39  |   const formatted = futureDate.toISOString().split("T")[0]; // "2026-08-06"
  40  |   const eventDateTime = `${formatted}T10:00`;
  41  | 
  42  |   const eventTitle = page.locator("#event-title-input");
  43  |   const eventDescription = page.locator("#admin-event-form textarea");
  44  |   const eventCity = page.getByLabel("City");
  45  |   const eventVenue = page.getByLabel("Venue");
  46  |   const eventPrice = page.getByLabel("Price ($)");
  47  |   const eventTotalSeats = page.getByLabel("Total Seats");
  48  |   const eventDateTimeInput = page.getByLabel("Event Date & Time");
  49  |   const createEventButton = page.locator("#create-event-btn");
  50  |   const addEventButton = page.locator("#add-event-btn");
  51  | 
  52  |   await eventTitle.fill(eventTitleText);
  53  |   await eventDescription.fill(eventDescriptionText);
  54  |   await eventCity.fill(eventCityText);
  55  |   await eventVenue.fill(eventVenueText);
  56  |   await eventPrice.fill(eventPriceText);
  57  |   await eventTotalSeats.fill(eventTotalSeatsText);
  58  |   await eventDateTimeInput.fill(eventDateTime);
  59  |   //   await page.fill('input[type="datetime-local"]', '2026-07-30T14:30');
  60  |   await addEventButton.click();
  61  | 
  62  |   const toastMessage = await page.getByText("Event created!");
  63  |   await expect(toastMessage).toBeVisible();
  64  | 
  65  |   await eventsPage.click();
  66  | 
  67  |   await expect(page.getByText("Upcoming Events")).toBeVisible();
  68  | 
  69  |   await page.locator("#event-card").first().waitFor();
  70  |   const events = page.locator("[data-testid='event-card']");
  71  | 
  72  |   let seatsBeforeBooking = 0;
  73  | 
  74  |   const count = await events.count();
  75  | 
  76  |   for (let i = 0; i < count; ++i) {
  77  |     if ((await events.nth(i).locator("h3").textContent()) === eventTitleText) {
  78  |       const text = await events.nth(i).locator(".text-xs").nth(1).textContent();
  79  |       seatsBeforeBooking = parseInt(text.match(/\d+/)[0]);
  80  |       await events.nth(i).locator("[data-testid='book-now-btn']").click();
  81  |       break;
  82  |     }
  83  |   }
  84  | 
  85  |   await expect(page.locator("#ticket-count")).toHaveText("1");
  86  |   const fullName = page.getByLabel("Full Name");
  87  |   const email = page.locator("#customer-email");
  88  |   const phoneNumber = page.getByPlaceholder("+91 98765 43210");
  89  |   const confirmBookingButton = page.locator(".confirm-booking-btn");
  90  | 
  91  |   await fullName.fill("John Doe");
  92  |   await email.fill("test13@test.com");
  93  |   await phoneNumber.fill("+91 98765 43210");
  94  |   await confirmBookingButton.click();
  95  | 
  96  |   await expect(page.getByText("Booking Confirmed!")).toBeVisible();
  97  |   await expect(await page.locator(".booking-ref").first()).toBeVisible();
  98  | 
  99  |   const bookingRef = await page.locator(".booking-ref").first().textContent();
  100 | 
  101 |   const myBookings = page.locator("#nav-bookings");
  102 |   await myBookings.click();
  103 | 
  104 |   await expect(
  105 |     page.getByText("View and manage all your ticket bookings"),
  106 |   ).toBeVisible();
  107 |   expect(page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");
  108 | 
  109 |   const bookingCards = page.locator("#booking-card");
  110 |   await expect(bookingCards.first()).toBeVisible();
  111 |   const bookingCount = await bookingCards.count();
  112 | 
  113 |   for (let i = 0; i < bookingCount; ++i) {
  114 |     if (
  115 |       (await bookingCards.nth(i).locator(".booking-ref").textContent()) ===
  116 |       bookingRef
  117 |     ) {
  118 |       await expect(bookingCards.nth(i)).toBeVisible();
  119 |       await expect(bookingCards.nth(i)).toContainText(eventTitleText);
  120 |       break;
  121 |     }
```