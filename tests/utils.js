const path = require('path');


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

  takeScreenshot: async (page, filename) => {
    await page.screenshot({
      path: `${ARTIFACTS_PATH}/${filename}.png`
    });
  }
};
