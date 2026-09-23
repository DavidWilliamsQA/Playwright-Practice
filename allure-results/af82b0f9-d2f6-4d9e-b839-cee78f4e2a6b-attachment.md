# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Morevalidations.spec.js >> Visual Testing
- Location: tests/Morevalidations.spec.js:53:1

# Error details

```
Error: expect(Buffer).toMatchSnapshot(expected) failed

  5476 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: google-homepage.png

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [aria-hidden] [ref=e2]:
    - navigation [ref=e3]:
      - link [ref=e4] [cursor=pointer]:
        - /url: https://about.google/?fg=1&utm_source=google-GB&utm_medium=referral&utm_campaign=hp-header
        - text: About
      - link [ref=e5] [cursor=pointer]:
        - /url: https://store.google.com/GB?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-GB
        - text: Store
      - generic [ref=e7]:
        - generic [ref=e8]:
          - link [ref=e10] [cursor=pointer]:
            - /url: https://mail.google.com/mail/&ogbl
            - text: Gmail
          - link [ref=e12] [cursor=pointer]:
            - /url: https://www.google.com/imghp?hl=en&ogbl
            - text: Images
        - button [ref=e15] [cursor=pointer]
        - link [ref=e20] [cursor=pointer]:
          - /url: https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
          - generic [ref=e21]: Sign in
    - search [ref=e32]:
      - generic [ref=e34]:
        - generic [ref=e36]:
          - combobox [ref=e43]
          - generic [ref=e44]:
            - generic [ref=e45]:
              - button [ref=e46] [cursor=pointer]
              - button [ref=e49] [cursor=pointer]
            - link [ref=e52] [cursor=pointer]:
              - generic [ref=e54]: AI Mode
        - generic [ref=e65]:
          - button [ref=e66] [cursor=pointer]: Google Search
          - button [ref=e67] [cursor=pointer]: I'm Feeling Lucky
    - contentinfo [ref=e70]:
      - generic [ref=e71]: United Kingdom
      - generic [ref=e72]:
        - generic [ref=e73]:
          - link [ref=e74] [cursor=pointer]:
            - /url: https://www.google.com/intl/en_uk/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1
            - text: Advertising
          - link [ref=e75] [cursor=pointer]:
            - /url: https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1
            - text: Business
          - link [ref=e76] [cursor=pointer]:
            - /url: https://google.com/search/howsearchworks/?fg=1
            - text: How Search works
        - link [ref=e78] [cursor=pointer]:
          - /url: https://ai.google/helpful-tools/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer
          - text: Build, create, and do more with AI tools from Google
        - generic [ref=e79]:
          - link [ref=e80] [cursor=pointer]:
            - /url: https://policies.google.com/privacy?hl=en-GB&fg=1
            - text: Privacy
          - link [ref=e81] [cursor=pointer]:
            - /url: https://policies.google.com/terms?hl=en-GB&fg=1
            - text: Terms
          - button [ref=e85] [cursor=pointer]:
            - generic [ref=e86]: Settings
  - generic:
    - dialog "Before you continue to Google Search":
      - generic [ref=e93]:
        - generic [ref=e95]:
          - img "Google" [ref=e96]
          - generic [ref=e97]:
            - 'button "Language: ‪English‬" [active] [ref=e99] [cursor=pointer]':
              - generic [ref=e100]: en
            - link "Sign in" [ref=e102] [cursor=pointer]
        - generic [ref=e103]:
          - heading "Before you continue to Google" [level=1] [ref=e104]
          - generic [ref=e105]:
            - generic [ref=e106]:
              - text: We use
              - link "cookies" [ref=e107] [cursor=pointer]:
                - /url: https://policies.google.com/technologies/cookies?utm_source=ucbs&hl=en-GB
              - text: and data, including IP addresses, to
              - list [ref=e108]:
                - listitem [ref=e109]: Deliver and maintain Google services
                - listitem [ref=e110]: Track outages and protect against spam, fraud and abuse
                - listitem [ref=e111]: Measure audience engagement and site statistics to understand how our services are used and enhance the quality of those services
            - generic [ref=e112]:
              - text: If you choose to 'Accept all', we will also use cookies and data, including IP addresses, to
              - list [ref=e113]:
                - listitem [ref=e114]: Develop and improve new services
                - listitem [ref=e115]: Deliver and measure the effectiveness of ads
                - listitem [ref=e116]: Show personalised content, depending on your settings
                - listitem [ref=e117]: Show personalised ads, depending on your settings
              - generic [ref=e118]: If you choose to 'Reject all', we will not use cookies or IP addresses for these additional purposes.
            - generic [ref=e119]: Non-personalised content is influenced by things like the content that you’re currently viewing, activity in your active Search session, and your location. Non-personalised ads are influenced by the content that you’re currently viewing and your general location. Personalised content and ads can also include more relevant results, recommendations and tailored ads based on past activity from this browser, like previous Google searches. We also use cookies and data to tailor the experience to be age-appropriate, if relevant.
            - generic [ref=e120]: Select 'More options' to see additional information, including details about managing your privacy settings. You can also visit g.co/privacytools at any time.
        - generic [ref=e121]:
          - generic [ref=e122]:
            - button "Reject all" [ref=e123] [cursor=pointer]
            - button "Accept all" [ref=e124] [cursor=pointer]
          - link "More options for personalisation settings and cookies" [ref=e126] [cursor=pointer]:
            - generic "More options for personalisation settings and cookies" [ref=e127]: More options
        - generic [ref=e128]:
          - link "Privacy" [ref=e129] [cursor=pointer]:
            - /url: https://policies.google.com/privacy?hl=en-GB&fg=1&utm_source=ucbs
          - generic [aria-hidden] [ref=e130]: ·
          - link "Terms" [ref=e131] [cursor=pointer]:
            - /url: https://policies.google.com/terms?hl=en-GB&fg=1&utm_source=ucbs
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | test("Popup validation", async ({ browser }) => {
  4  |   const context = await browser.newContext();
  5  |   const page = await context.newPage();
  6  |   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  7  |   //   await page.goto("https://google.com");
  8  |   //   await page.goBack()
  9  |   //   await page.goForward();
  10 |   //   await page.goBack();
  11 | 
  12 |   await expect(page.locator("#displayed-text")).toBeVisible();
  13 | 
  14 |   const hideButton = page.locator("#hide-textbox");
  15 |   await hideButton.click();
  16 | 
  17 |   await expect(page.locator("#displayed-text")).toBeHidden();
  18 | 
  19 |   const showButton = page.locator("#show-textbox");
  20 |   await showButton.click();
  21 | 
  22 |   await expect(page.locator("#displayed-text")).toBeVisible();
  23 | 
  24 |   page.on("dialog", (dialog) => dialog.accept());
  25 | 
  26 |   const confirmButton = page.locator("#confirmbtn");
  27 |   await confirmButton.click();
  28 | 
  29 |   await page.locator("#mousehover").hover();
  30 | 
  31 |   const framesPage = await page.frameLocator("#courses-iframe");
  32 |   await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //Picking the element that is visible on the page
  33 | 
  34 |   const text = await framesPage.locator(".text h2").textContent();
  35 |   const extractedText = text.split(" ")[1];
  36 |   console.log(extractedText);
  37 | });
  38 | 
  39 | test("Screenshots and visual comparisons", async ({ page }) => {
  40 |   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  41 | 
  42 |   await expect(page.locator("#displayed-text")).toBeVisible();
  43 |   await page
  44 |     .locator("#displayed-text")
  45 |     .screenshot({ path: "displayed-text.png" });
  46 |   const hideButton = page.locator("#hide-textbox");
  47 |   await hideButton.click();
  48 |   await page.screenshot({ path: "screenshot.png" });
  49 | 
  50 |   await expect(page.locator("#displayed-text")).toBeHidden();
  51 | });
  52 | 
  53 | test("Visual Testing", async ({ page }) => {
  54 |   await page.goto("https://www.google.com/");
> 55 |   expect(await page.screenshot()).toMatchSnapshot("google-homepage.png");
     |                                   ^ Error: expect(Buffer).toMatchSnapshot(expected) failed
  56 | });
  57 | 
```