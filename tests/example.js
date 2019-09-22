// run using `$ node tests/example.js`

const mkdir = require('make-dir');
const path = require('path');
const puppeteer = require('puppeteer');

const ARTIFACTS = path.join(__dirname, '_artifacts');
mkdir.sync(ARTIFACTS);

(async () => {
  // start browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load apge
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

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: `${ARTIFACTS}/6-back-home.png`});

  // Go to snippets page
  await page.click('header a[href*="snippets"]');
  await page.screenshot({path: `${ARTIFACTS}/7-snippets.png`});

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: `${ARTIFACTS}/8-back-home.png`});

  // Go to timeline page
  await page.click('header a[href*="timeline"]');
  await page.screenshot({path: `${ARTIFACTS}/9-timeline.png`});

  // Close the browser
  await browser.close();
})();
