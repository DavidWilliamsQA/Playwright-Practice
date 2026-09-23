# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignments/RefundEligibilityCheck.spec.js >> Test 2 - Group ticket booking is NOT eligible for refund
- Location: tests/Assignments/RefundEligibilityCheck.spec.js:88:1

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
  3   | const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  4   | const USER_EMAIL = "test123333@test.com";
  5   | const USER_PASSWORD = "Password$12";
  6   | 
  7   | async function login(page) {
  8   |   await page.goto(`${BASE_URL}/login`);
  9   | 
  10  |   const userEmail = page.getByPlaceholder("you@email.com");
  11  |   const userPassword = page.getByLabel("Password");
  12  |   const loginButton = page.locator("#login-btn");
  13  | 
  14  |   await userEmail.fill(USER_EMAIL);
  15  |   await userPassword.fill(USER_PASSWORD);
  16  |   await loginButton.click();
  17  | }
  18  | 
  19  | test("Test 1 - Single ticket booking is eligible for refund", async ({
  20  |   browser,
  21  | }) => {
  22  |   const context = await browser.newContext();
  23  |   const page = await context.newPage();
  24  | 
  25  |   await login(page);
  26  | 
  27  |   await expect(page.getByText("Browse Events →")).toBeVisible();
  28  | 
  29  |   await page.goto(`${BASE_URL}/events`);
  30  | 
  31  |   await page.locator("#event-card").first().waitFor();
  32  | 
  33  |   const events = page.locator("[data-testid='event-card']");
  34  |   await events.first().locator("[data-testid='book-now-btn']").click();
  35  | 
  36  |   await expect(page.locator("#ticket-count")).toHaveText("1");
  37  |   const fullName = page.getByLabel("Full Name");
  38  |   const email = page.locator("#customer-email");
  39  |   const phoneNumber = page.getByPlaceholder("+91 98765 43210");
  40  |   const confirmBookingButton = page.locator(".confirm-booking-btn");
  41  | 
  42  |   await fullName.fill("John Doe");
  43  |   await email.fill("test13@test.com");
  44  |   await phoneNumber.fill("+91 98765 43210");
  45  |   await confirmBookingButton.click();
  46  | 
  47  |   await expect(page.getByText("Booking Confirmed!")).toBeVisible();
  48  | 
  49  |   const bookingsPage = page.locator("#nav-bookings");
  50  |   await bookingsPage.click();
  51  | 
  52  |   await expect(
  53  |     page.getByText("View and manage all your ticket bookings"),
  54  |   ).toBeVisible();
  55  |   expect(page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");
  56  | 
  57  |   await page
  58  |     .locator("#booking-card")
  59  |     .first()
  60  |     .locator('a[href*="/bookings"]')
  61  |     .click();
  62  | 
  63  |   await expect(page.getByText("Booking Information")).toBeVisible();
  64  | 
  65  |   const bookingRef = await page.locator(".font-mono").first().textContent();
  66  |   const bookingRefFirstLetter = bookingRef[0];
  67  | 
  68  |   const eventTitleText = await page.locator("h1").first().textContent();
  69  |   const eventTitleFirstLetter = eventTitleText[0];
  70  | 
  71  |   expect(bookingRefFirstLetter).toBe(eventTitleFirstLetter);
  72  | 
  73  |   const refundButton = page.locator("#check-refund-btn");
  74  |   await refundButton.click();
  75  | 
  76  |   await expect(page.locator("#refund-spinner")).toBeVisible();
  77  |   await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  78  | 
  79  |   const result = await page.locator("#refund-result");
  80  |   await expect(result).toBeVisible();
  81  |   const resultText = await result.textContent();
  82  |   await expect(resultText).toContain("Eligible for refund");
  83  |   await expect(resultText).toContain(
  84  |     "Single-ticket bookings qualify for a full refund",
  85  |   );
  86  | });
  87  | 
  88  | test("Test 2 - Group ticket booking is NOT eligible for refund", async ({
  89  |   browser,
  90  | }) => {
  91  |   const context = await browser.newContext();
  92  |   const page = await context.newPage();
  93  | 
  94  |   await login(page);
  95  | 
> 96  |   await expect(page.getByText("Browse Events →")).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  97  | 
  98  |   await page.goto(`${BASE_URL}/events`);
  99  | 
  100 |   await page.locator("#event-card").first().waitFor();
  101 | 
  102 |   const events = page.locator("[data-testid='event-card']");
  103 |   await events.first().locator("[data-testid='book-now-btn']").click();
  104 | 
  105 |   await expect(page.locator("#ticket-count")).toHaveText("1");
  106 | 
  107 |   await page.locator('button:has-text("+")').click();
  108 |   await page.locator('button:has-text("+")').click();
  109 | 
  110 |   const fullName = page.getByLabel("Full Name");
  111 |   const email = page.locator("#customer-email");
  112 |   const phoneNumber = page.getByPlaceholder("+91 98765 43210");
  113 |   const confirmBookingButton = page.locator(".confirm-booking-btn");
  114 | 
  115 |   await fullName.fill("John Doe");
  116 |   await email.fill("test13@test.com");
  117 |   await phoneNumber.fill("+91 98765 43210");
  118 |   await confirmBookingButton.click();
  119 | 
  120 |   await expect(page.getByText("Booking Confirmed!")).toBeVisible();
  121 | 
  122 |   const bookingsPage = page.locator("#nav-bookings");
  123 |   await bookingsPage.click();
  124 | 
  125 |   await expect(
  126 |     page.getByText("View and manage all your ticket bookings"),
  127 |   ).toBeVisible();
  128 |   expect(page.url()).toBe("https://eventhub.rahulshettyacademy.com/bookings");
  129 | 
  130 |   await page
  131 |     .locator("#booking-card")
  132 |     .first()
  133 |     .locator('a[href*="/bookings"]')
  134 |     .click();
  135 | 
  136 |   await expect(page.getByText("Booking Information")).toBeVisible();
  137 | 
  138 |   const bookingRef = await page.locator(".font-mono").first().textContent();
  139 |   const bookingRefFirstLetter = bookingRef[0];
  140 | 
  141 |   const eventTitleText = await page.locator("h1").first().textContent();
  142 |   const eventTitleFirstLetter = eventTitleText[0];
  143 | 
  144 |   expect(bookingRefFirstLetter).toBe(eventTitleFirstLetter);
  145 | 
  146 |   const refundButton = page.locator("#check-refund-btn");
  147 |   await refundButton.click();
  148 | 
  149 |   await expect(page.locator("#refund-spinner")).toBeVisible();
  150 |   await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  151 | 
  152 |   const result = await page.locator("#refund-result");
  153 |   await expect(result).toBeVisible();
  154 |   const resultText = await result.textContent();
  155 |   await expect(resultText).toContain("Not eligible for refund");
  156 |   await expect(resultText).toContain(
  157 |     "Group bookings (3 tickets) are non-refundable",
  158 |   );
  159 | });
  160 | 
```