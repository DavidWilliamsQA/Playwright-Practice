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
  - text:    
  - generic [ref=e25]:
    - paragraph [ref=e26]: Home | Search
    - heading "Filters" [level=4] [ref=e28]
    - generic [ref=e29]:
      - textbox "search" [ref=e31]
      - generic [ref=e32]:
        - heading "Price Range" [level=6] [ref=e33]
        - generic [ref=e34]:
          - textbox "Min Price" [ref=e36]
          - textbox "Max Price" [ref=e38]
      - generic [ref=e39]:
        - heading "Categories" [level=6] [ref=e40]
        - generic [ref=e41]: 
        - generic [ref=e43]:
          - checkbox [ref=e44]
          - generic [ref=e45]: fashion
        - generic [ref=e46]:
          - checkbox [ref=e47]
          - generic [ref=e48]: electronics
        - generic [ref=e49]:
          - checkbox [ref=e50]
          - generic [ref=e51]: household
      - generic [ref=e52]:
        - heading "Sub Categories" [level=6] [ref=e53]
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - checkbox [ref=e57]
          - generic [ref=e58]: t-shirts
        - generic [ref=e59]:
          - checkbox [ref=e60]
          - generic [ref=e61]: shirts
        - generic [ref=e62]:
          - checkbox [ref=e63]
          - generic [ref=e64]: shoes
        - generic [ref=e65]:
          - checkbox [ref=e66]
          - generic [ref=e67]: mobiles
        - generic [ref=e68]:
          - checkbox [ref=e69]
          - generic [ref=e70]: laptops
      - generic [ref=e71]:
        - heading "Search For" [level=6] [ref=e72]
        - generic [ref=e73]: 
        - generic [ref=e75]:
          - checkbox [ref=e76]
          - generic [ref=e77]: men
        - generic [ref=e78]:
          - checkbox [ref=e79]
          - generic [ref=e80]: women
  - generic [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e84]: Showing 3 results |
        - generic [ref=e85]: User can only see maximum 9 products on a page
      - generic [ref=e86]:
        - generic [ref=e90]:
          - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
          - generic [ref=e92]: $ 11500
          - button "View" [ref=e94] [cursor=pointer]:
            - generic [aria-hidden] [ref=e95]: 
            - text: View
          - button " Add To Cart" [ref=e96] [cursor=pointer]:
            - generic [ref=e97]: 
            - text: Add To Cart
        - generic [ref=e101]:
          - heading "ZARA COAT 3" [level=5] [ref=e102]
          - generic [ref=e103]: $ 11500
          - button "View" [ref=e105] [cursor=pointer]:
            - generic [aria-hidden] [ref=e106]: 
            - text: View
          - button " Add To Cart" [ref=e107] [cursor=pointer]:
            - generic [ref=e108]: 
            - text: Add To Cart
        - generic [ref=e112]:
          - heading "iphone 13 pro" [level=5] [ref=e113]
          - generic [ref=e114]: $ 55000
          - button "View" [ref=e116] [cursor=pointer]:
            - generic [aria-hidden] [ref=e117]: 
            - text: View
          - button " Add To Cart" [ref=e118] [cursor=pointer]:
            - generic [ref=e119]: 
            - text: Add To Cart
    - list "Pagination" [ref=e124]:
      - listitem [ref=e125]:
        - text: «
        - generic [ref=e126]:
          - text: Previous
          - generic [ref=e127]: page
      - listitem [ref=e128]:
        - generic [ref=e129]: You're on page
        - text: "1"
      - listitem [ref=e130]:
        - generic [ref=e131]:
          - text: Next
          - generic [ref=e132]: page
        - text: »
  - generic [ref=e133]: Design and Developed By - Kunal Sharma
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