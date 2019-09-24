const puppeteer = require('puppeteer');

const utils = require('./utils.js');


let browser, page;

beforeAll(async () => browser = await puppeteer.launch());
beforeEach(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:4000/');
});
afterEach(async () => page.close());
afterAll(async () => await browser.close());

test('Projects can be loaded', async () => {
  await page.click('header a[href*="projects"]');
  await utils.takeScreenshot(page, 'projects');
  expect(await page.title()).toMatch('Archive');
});

test('Contributions can be loaded', async () => {
  await page.click('header a[href*="contributions"]');
  await utils.takeScreenshot(page, 'contributions');
  expect(await page.title()).toMatch('Archive');
});

test('Snippets can be loaded', async () => {
  await page.click('header a[href*="snippets"]');
  await utils.takeScreenshot(page, 'snippters');
  expect(await page.title()).toMatch('Snippets');
});

test('Resume can be loaded', async () => {
  await utils.allowDownloads(page);
  const matcher = 'downloads';

  page.on('response', response => {
    if (response._url.match(matcher)) {
      const contentType = response._headers['content-type'];
      expect(contentType).toBe('application/pdf');
    }
  });

  await page.click(`header a[href*="${matcher}"]`);
  expect.assertions(1);
});

test('Timeline can be loaded', async () => {
  await page.click('header a[href*="timeline"]');
  await utils.takeScreenshot(page, 'timeline');
  expect(await page.title()).toMatch('Timeline');
});
