# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignments/Assignment3.spec.js >> Test 2 - Banner is NOT visible when 4 events are returned
- Location: tests/Assignments/Assignment3.spec.js:186:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Browse Events →')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Browse Events →') with timeout 50000ms
  - waiting for getByText('Browse Events →')
    12 × waiting for "https://eventhub.rahulshettyacademy.com/login" navigation to finish...
       - navigated to "https://eventhub.rahulshettyacademy.com/login"
  - Test timeout of 30000ms exceeded.

```

```yaml
- status "Loading"
```

# Test source

```ts
  102 |       price: "999",
  103 |       totalSeats: 200,
  104 |       availableSeats: 150,
  105 |       imageUrl: null,
  106 |       isStatic: false,
  107 |     },
  108 |     {
  109 |       id: 2,
  110 |       title: "Rock Night Live",
  111 |       category: "Concert",
  112 |       eventDate: "2025-06-05T18:00:00.000Z",
  113 |       venue: "Palace Grounds",
  114 |       city: "Bangalore",
  115 |       price: "1500",
  116 |       totalSeats: 500,
  117 |       availableSeats: 300,
  118 |       imageUrl: null,
  119 |       isStatic: false,
  120 |     },
  121 |     {
  122 |       id: 3,
  123 |       title: "IPL Finals",
  124 |       category: "Sports",
  125 |       eventDate: "2025-06-10T19:30:00.000Z",
  126 |       venue: "Chinnaswamy",
  127 |       city: "Bangalore",
  128 |       price: "2000",
  129 |       totalSeats: 800,
  130 |       availableSeats: 50,
  131 |       imageUrl: null,
  132 |       isStatic: false,
  133 |     },
  134 |     {
  135 |       id: 4,
  136 |       title: "UX Design Workshop",
  137 |       category: "Workshop",
  138 |       eventDate: "2025-06-15T09:00:00.000Z",
  139 |       venue: "WeWork",
  140 |       city: "Mumbai",
  141 |       price: "500",
  142 |       totalSeats: 50,
  143 |       availableSeats: 20,
  144 |       imageUrl: null,
  145 |       isStatic: false,
  146 |     },
  147 |   ],
  148 |   pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
  149 | };
  150 | 
  151 | test("Test 1 - Banner IS visible when 6 events are returned", async ({
  152 |   page,
  153 | }) => {
  154 |   const apiContext = await request.newContext();
  155 |   await page.route("**/api/events**", async (route) => {
  156 |     let body = SIX_EVENTS_RESPONSE;
  157 |     route.fulfill({
  158 |       status: 200,
  159 |       contentType: "application/json",
  160 |       body: JSON.stringify(body),
  161 |     });
  162 |   });
  163 | 
  164 |   const utils = new AssignmentUtils(page, apiContext, payload);
  165 |   await utils.loginAndGoToEvents();
  166 | 
  167 |   await expect(page.getByText("Browse Events →")).toBeVisible();
  168 | 
  169 |   await page.goto("https://eventhub.rahulshettyacademy.com/events");
  170 | 
  171 |   const events = page.locator('[data-testid="event-card"]');
  172 | 
  173 |   await expect(events.first()).toBeVisible();
  174 | 
  175 |   await expect(events).toHaveCount(6);
  176 | 
  177 |   await page.locator("text=/sandbox holds up to/i");
  178 | 
  179 |   await expect(page.getByText(/sandbox holds up to/i)).toBeVisible();
  180 | 
  181 |   await expect(page.getByText(/sandbox holds up to/i)).toContainText(
  182 |     "9 bookings",
  183 |   );
  184 | });
  185 | 
  186 | test("Test 2 - Banner is NOT visible when 4 events are returned", async ({
  187 |   page,
  188 | }) => {
  189 |   const apiContext = await request.newContext();
  190 |   await page.route("**/api/events**", async (route) => {
  191 |     let body = FOUR_EVENTS_RESPONSE;
  192 |     route.fulfill({
  193 |       status: 200,
  194 |       contentType: "application/json",
  195 |       body: JSON.stringify(body),
  196 |     });
  197 |   });
  198 | 
  199 |   const utils = new AssignmentUtils(page, apiContext, payload);
  200 |   await utils.loginAndGoToEvents();
  201 | 
> 202 |   await expect(page.getByText("Browse Events →")).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  203 | 
  204 |   await page.goto("https://eventhub.rahulshettyacademy.com/events");
  205 | 
  206 |   const events = page.locator('[data-testid="event-card"]');
  207 | 
  208 |   await expect(events.first()).toBeVisible();
  209 | 
  210 |   await expect(events).toHaveCount(4);
  211 | 
  212 |   await page.locator("text=/sandbox holds up to/i");
  213 | 
  214 |   await expect(page.getByText(/sandbox holds up to/i)).toBeHidden();
  215 | });
  216 | 
```