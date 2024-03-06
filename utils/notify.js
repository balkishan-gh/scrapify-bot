const scrapeProduct = require("./scrapper");

async function checkPriceAndNotify(url, priceLimit) {
  const productData = await scrapeProduct(url);
  if (parseFloat(productData.price.replace(/[^0-9.]/g, "")) > priceLimit) {
    return productData;
  } else {
    console.log("Some error occured");
  }
}

module.exports = checkPriceAndNotify;

// parseFloat(productData.price.replace(/[^0-9.]/g, ""))
