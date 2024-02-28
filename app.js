require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const scrapeProduct = require("./utils/scrapper");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const app = express();

app.use(express.json());

app.post("/startInterval", (req, res, next) => {
  // const url = req.headers.url;
  // const priceLimit = req.headers.price;
  // // Execute the function immediately
  // checkPriceAndNotify(url, priceLimit);
  // // Set up the interval to check price every hour
  // setInterval(() => checkPriceAndNotify(url, priceLimit), 10000); // Check every hour
  // res.send("Price checking interval started.");
  // client.on("ready", () => {
  //   console.log(`Logged in as ${client.user.tag}!`);
  // });
  // client.login(
  //   "MTIxMTk5MTAyODUxNzgzNDc1Mg.GMa4OX.hKF97dd14Gl_Pt_6L2vQR_9tfINICq_cBuMTpQ"
  // );
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("scrape")) {
    const arr = message.content.split(/\s+/);
    const url = arr[1];
    const priceLimit = parseInt(arr[2]);
    // const url =
    //   "https://www.flipkart.com/boat-airdopes-131-upto-60-hours-asap-charge-bluetooth-headset/p/itm2905dfd0be40c?pid=ACCFSDGXX3S6DVBG&lid=LSTACCFSDGXX3S6DVBGBQJG5E&marketplace=FLIPKART&q=boat+airdopes&store=0pm%2Ffcn%2F821%2Fa7x%2F2si&spotlightTagId=BestsellerId_0pm%2Ffcn%2F821%2Fa7x%2F2si&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_4_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_4_na_na_na&fm=search-autosuggest&iid=82d9df9f-a13f-425d-9d90-a5264ffa6d7d.ACCFSDGXX3S6DVBG.SEARCH&ppt=sp&ppn=sp&ssid=ic2385yikw0000001709023396970&qH=7c82039a894b5615";
    // const priceLimit = 100;
    async function checkPriceAndNotify(url, priceLimit) {
      const productData = await scrapeProduct(url);
      if (parseFloat(productData.price.replace(/[^0-9.]/g, "")) > priceLimit) {
        // sendNotification(
        //   `Price of ${productData.title} has dropped below ${priceLimit}`
        // );
        // res.json(productData);
        message.reply({ content: productData.price });
      } else {
        console.log("Some error occured");
      }
    }

    checkPriceAndNotify(url, priceLimit);
    setInterval(() => checkPriceAndNotify(url, priceLimit), 10000); // Check every hour
  } else {
    message.reply({ content: "Some error occured!" });
  }
});

client.login(process.env.DISCORD_TOKEN);

app.listen(3000);
