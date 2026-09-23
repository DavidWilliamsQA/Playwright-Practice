# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebAPI2.spec.js >> Web API test2
- Location: tests/WebAPI2.spec.js:27:1

# Error details

```
ReferenceError: orderId is not defined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e28]:
    - paragraph [ref=e30]: Thank you for Shopping With Us
    - generic [ref=e31]:
      - generic [ref=e32]: order summary
      - generic [ref=e34]:
        - text: Order Id
        - generic [ref=e35]: 6ab4063b2be7a4bc2b6713a0
      - generic [ref=e37]:
        - generic [ref=e39]:
          - generic [ref=e40]: Billing Address
          - paragraph [ref=e41]: test123333@test.com
          - paragraph [ref=e42]: Country - India
        - generic [ref=e44]:
          - generic [ref=e45]: Delivery Address
          - paragraph [ref=e46]: test123333@test.com
          - paragraph [ref=e47]: Country - India
      - generic [ref=e48]: Product Ordered
      - generic [ref=e56]:
        - generic [ref=e57]: iphone 13 pro
        - generic [ref=e58]:
          - generic [ref=e59]: by ECOM
          - generic [ref=e60]: $ 55000
      - generic [ref=e61]: View Orders
```

# Test source

```ts
  1  | const { test, expect, request } = require("@playwright/test");
  2  | 
  3  | let webContext;
  4  | 
  5  | test.beforeAll(async ({ browser }) => {
  6  |   const context = await browser.newContext();
  7  |   const page = await context.newPage();
  8  |   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  9  | 
  10 |   const userEmail = page.locator("#userEmail");
  11 |   const userPassword = page.locator("#userPassword");
  12 |   const loginButton = page.locator("#login");
  13 | 
  14 |   const userEmailText = "test123333@test.com";
  15 |   const userPasswordText = "Password$12";
  16 | 
  17 |   await userEmail.fill(userEmailText);
  18 |   await userPassword.fill(userPasswordText);
  19 |   await loginButton.click();
  20 | 
  21 |   await page.waitForLoadState("networkidle");
  22 |   await context.storageState({ path: "state.json" });
  23 | 
  24 |   webContext = await browser.newContext({ storageState: "state.json" });
  25 | });
  26 | 
  27 | test("Web API test2", async ({}) => {
  28 |   const page = await webContext.newPage();
  29 |   await page.goto("https://rahulshettyacademy.com/client/");
  30 | 
  31 |   const ordersButton = page.locator("button[routerlink*='myorders']");
  32 |   await ordersButton.click();
  33 | 
  34 |   await page.locator("tbody").waitFor();
  35 | 
  36 |   const rows = page.locator("tbody tr");
  37 |   const rowsCount = await rows.count();
  38 |   for (let i = 0; i < rowsCount; ++i) {
  39 |     const rowOrderId = await rows.nth(i).locator("th").textContent();
> 40 |     if (orderId.includes(rowOrderId)) {
     |     ^ ReferenceError: orderId is not defined
  41 |       await rows.nth(i).locator("button").first().click();
  42 |       break;
  43 |     }
  44 |   }
  45 | 
  46 |   const orderIdDetails = await page.locator(".col-text").textContent();
  47 |   expect(orderId.includes(orderIdDetails)).toBeTruthy();
  48 | });
  49 | 
```