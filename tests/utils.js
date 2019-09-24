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
    ['Desktop', devices['Desktop 1920x1080']],
    ['Mobile', puppeteer.devices['Pixel 2']],
  ]),

  takeScreenshot: async (page, filePrefix) => {
    const pageTitle = await page.title();
    await page.screenshot({path: `${ARTIFACTS_PATH}/${filePrefix}_${pageTitle}.png`});
  },
};
