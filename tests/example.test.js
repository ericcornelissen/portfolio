const puppeteer = require('puppeteer');

const { ARTIFACTS } = require('./utils.js');


let browser, page;

beforeAll(async () => browser = await puppeteer.launch());
beforeEach(async () => page = await browser.newPage());
afterEach(async () => page.close());
afterAll(async () => await browser.close());

test('adds 1 + 2 to equal 3', async () => {
  // Load page
  await page.goto('http://localhost:4000/');
  await page.screenshot({path: `${ARTIFACTS}/1-start.png`});

  // Go to projects page
  await page.click('header a[href*="projects"]');
  await page.screenshot({path: `${ARTIFACTS}/2-projects.png`});

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: `${ARTIFACTS}/3-back-home.png`});

  // Go to contributions page
  await page.click('header a[href*="contributions"]');
  await page.screenshot({path: `${ARTIFACTS}/5-contributions.png`});

  expect(1 + 2).toBe(3);
});

test('adds 2 + 1 to equal 3', async () => {
  // Load page
  await page.goto('http://localhost:4000/');
  await page.screenshot({path: `${ARTIFACTS}/6-start.png`});

  // Go to snippets page
  await page.click('header a[href*="snippets"]');
  await page.screenshot({path: `${ARTIFACTS}/7-snippets.png`});

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: `${ARTIFACTS}/8-back-home.png`});

  // Go to timeline page
  await page.click('header a[href*="timeline"]');
  await page.screenshot({path: `${ARTIFACTS}/9-timeline.png`});

  expect(2 + 1).toBe(3);
});
