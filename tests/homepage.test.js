const puppeteer = require('puppeteer');

const utils = require('./utils.js');


utils.runForEachDevice('Homepage on %s', (name, device) => {
  let browser, page;

  beforeAll(async () => browser = await puppeteer.launch());

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:4000/');
    await page.emulate(device);
  });

  test('Projects can be loaded', async () => {
    await page.click('header a[href*="projects"]');
    expect(await page.title()).toMatch('Archive');
  });

  test('Contributions can be loaded', async () => {
    await page.click('header a[href*="contributions"]');
    expect(await page.title()).toMatch('Archive');
  });

  test('Snippets can be loaded', async () => {
    await page.click('header a[href*="snippets"]');
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
    expect(await page.title()).toMatch('Timeline');
  });

  afterEach(async () => {
    await utils.takeScreenshot(page, name);
    await page.close();
  });

  afterAll(async () => await browser.close());
});
