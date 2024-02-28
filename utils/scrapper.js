const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector("._30jeq3");

  const price = await page.$eval("._30jeq3", (element) => element.textContent);

  await browser.close();

  return { price };
}

module.exports = scrapeProduct;
