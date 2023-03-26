let page;

afterEach(() => {
  page.close();
});

describe("Github/team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 7000);
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com");
  });

  test("Should open Pricing title", async () => {
    const pricingLink = "nav > ul > li > a";
    await page.waitForSelector(pricingLink);
    await page.click(pricingLink);
    await page.waitForTimeout(2000);
    const pricingTitle = await page.title();
    expect(pricingTitle).toContain("Plans for every developer");
  }, 10000);

  test("Should open 'Sign in to GitHub' title", async () => {
    const loginLink = 'a[href="/login"]';
    await page.waitForSelector(loginLink);
    await page.click(loginLink);
    await page.waitForTimeout(2000);
    const loginTitle = await page.title();
    expect(loginTitle).toContain("Sign in to GitHub");
  }, 10000);
});

test("Should open 'Join GitHub' title", async () => {
  page = await browser.newPage();
  await page.goto(
    "https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"
  );
  const signupTitle = await page.title();
  expect(signupTitle).toContain("Join GitHub");
}, 10000);