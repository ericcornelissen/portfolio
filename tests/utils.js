const path = require('path');
const puppeteer = require('puppeteer');

const devices = require('./device-descriptors.js');

const ARTIFACTS_PATH = path.join(__dirname, '_artifacts');

module.exports = {
  ARTIFACTS_PATH: ARTIFACTS_PATH,

  allowDownloads: async (page) => {
    // Thanks to https://docs.browserless.io/docs/downloading-files.html
    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: ARTIFACTS_PATH,
    });
  },

  runForEachDevice: describe.each([
    ['Desktop (large)', devices['Desktop 1920x1080']],
    ['Desktop (medium)', devices['Desktop 1280x720']],
    ['Mobile (portrait)', puppeteer.devices['Nexus 4']],
    ['Mobile (landscape)', puppeteer.devices['Nexus 4 landscape']],
  ]),

  takeScreenshot: async (page, filePrefix) => {
    const pageTitle = await page.title();
    await page.screenshot({path: `${ARTIFACTS_PATH}/${filePrefix}_${pageTitle}.png`});
  },
};
