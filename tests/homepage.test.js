const utils = require('./utils.js');

utils.runForEachDevice('Homepage on %s', (name, device) => {
  beforeEach(async () => {
    await page.goto('http://localhost:4000/');
    await page.emulate(device);
  });

  test('Projects can be loaded', async () => {
    await utils.clickAndWait(page, 'header a[href*="projects"]');
    await expect(page.title()).resolves.toMatch('Archive');
  });

  test('Contributions can be loaded', async () => {
    await utils.clickAndWait(page, 'header a[href*="contributions"]');
    await expect(page.title()).resolves.toMatch('Archive');
  });

  test('Snippets can be loaded', async () => {
    await utils.clickAndWait(page, 'header a[href*="snippets"]');
    await expect(page.title()).resolves.toMatch('Snippets');
  });

  test.skip('Resume can be loaded', async () => {
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
    await utils.clickAndWait(page, 'header a[href*="timeline"]');
    await expect(page.title()).resolves.toMatch('Timeline');
  });

  afterEach(async () => {
    await utils.takeScreenshot(page, name);
  });
});
