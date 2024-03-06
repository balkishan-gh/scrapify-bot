const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const className = "._30jeq3" || "a-price-whole";

  await page.waitForSelector(className);

  const price = await page.$eval("._30jeq3", (element) => element.textContent);

  await browser.close();

  return { price };
}

module.exports = scrapeProduct;
