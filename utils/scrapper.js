const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const className = ".Nx9bqj" || "a-price-whole";

  await page.waitForSelector(className);

  const price = await page.$eval(".Nx9bqj", (element) => element.textContent);

  await browser.close();

  return { price };
}

module.exports = scrapeProduct;
