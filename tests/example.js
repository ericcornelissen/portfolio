const puppeteer = require('puppeteer');

(async () => {
  // start browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load apge
  await page.goto('http://localhost:4000/');
  await page.screenshot({path: './tests/1-start.png'});

  // Go to projects page
  await page.click('header a[href*="projects"]');
  await page.screenshot({path: './tests/2-projects.png'});

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: './tests/3-back-home.png'});

  // Go to snippets page
  await page.click('header a[href*="snippets"]');
  await page.screenshot({path: './tests/4-snippets.png'});

  // Go back home
  await page.click('header a[href="/"]');
  await page.screenshot({path: './tests/5-back-home.png'});

  // Go to timeline page
  await page.click('header a[href*="timeline"]');
  await page.screenshot({path: './tests/6-timeline.png'});

  // Close the browser
  await browser.close();
})();
