const { test, expect, request } = require("@playwright/test");
const payloadYahoo = {
  email: "test123333@yahoo.com",
  password: "Password$12",
};

const payloadGmail = {
  email: "test123333@gmail.com",
  password: "Password$12",
};
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

test.only("Cross User booking Access Denied", async ({ page }) => {
  const apiContext = await request.newContext();
  const responseYahoo = await apiContext.post(API_URL + "/auth/login", {
    data: payloadYahoo,
  });
  const responseBodyYahoo = await responseYahoo.json();
  const tokenYahoo = responseBodyYahoo.token;
  await expect(responseYahoo.ok()).toBeTruthy();

  const getResponseYahoo = await apiContext.get(API_URL + "/events", {
    headers: {
      Authorization: "Bearer " + tokenYahoo,
    },
  });

  expect(getResponseYahoo.ok()).toBeTruthy();
  const getResponseBodyYahoo = await getResponseYahoo.json();
  const eventId = getResponseBodyYahoo.data[0].id;

  const createBooking = await apiContext.post(API_URL + "/bookings", {
    headers: {
      Authorization: "Bearer " + tokenYahoo,
    },
    data: {
      eventId: eventId,
      customerName: "Yahoo User",
      customerEmail: payloadYahoo.email,
      customerPhone: "+91-9876543210",
      quantity: 1,
    },
  });
  expect(createBooking.ok()).toBeTruthy();
  const yahooBookingId = (await createBooking.json()).data.id;

  await loginAs(page, payloadGmail);

  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Access Denied")).toBeVisible();
  await expect(
    page.getByText("You are not authorized to view this booking"),
  ).toBeVisible();

  await page.pause();
});

async function loginAs(page, payload) {
  await page.goto(BASE_URL);
  const userEmail = page.getByPlaceholder("you@email.com");
  const userPassword = page.getByLabel("Password");
  const loginButton = page.locator("#login-btn");

  await userEmail.fill(payload.email);
  await userPassword.fill(payload.password);
  await loginButton.click();
  await expect(page.getByText("Browse Events →")).toBeVisible();
}
