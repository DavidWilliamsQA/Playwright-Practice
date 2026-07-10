const { test, expect } = require("@playwright/test");

test.only("Child Window/Tab handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pagetitle = await page.title();
  expect(pagetitle).toBe("LoginPage Practise | Rahul Shetty Academy");
  const username = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");

  const documentationLink = page.locator("[href*='documents-request']");

  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    documentationLink.click(),
  ]); // We need to do this because the click will open a new tab and we need to wait for that tab to open before we can interact with it.

  const page2Title = await page2.title();
  expect(page2Title).toBe("RS Academy");

  const text = await page2.locator(".red").textContent();
  const arrayText = text.split("@"); // We are splitting the text by the "@" symbol because we want to get the domain name of the email address.
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);

  await page.locator("#username").fill(domain);
  console.log("input value: " + (await page.locator("#username").inputValue())); // We are getting the value of the input field to verify that we have filled it correctly.
});
