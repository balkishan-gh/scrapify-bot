require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { Client, GatewayIntentBits } = require("discord.js");
const scrapeProduct = require("./utils/scrapper");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const api = express();

api.use(cors());
api.use(express.json());

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("scrape")) {
    const arr = message.content.split(/\s+/);
    const url = arr[1];
    const priceLimit = parseInt(arr[2]);
    async function checkPriceAndNotify(url, priceLimit) {
      const productData = await scrapeProduct(url);
      if (parseFloat(productData.price.replace(/[^0-9.]/g, "")) > priceLimit) {
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

// const router = express.Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

// api.use("/api/", router);

// const handler = serverless(api);

// module.exports = handler;

api.listen(3000);
