const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;
const WEBHOOK_ID = process.env.HELIUS_WEBHOOK_ID;

async function updateWebhook(accountAddresses) {
  const url = `https://api.helius.xyz/v0/webhooks/${WEBHOOK_ID}?api-key=${API_KEY}`;

  const response = await axios.put(url, {
    webhookURL: process.env.WEBHOOK_URL,

    accountAddresses,

    transactionTypes: ["ANY"],

    webhookType: "enhanced",
  });

  return response.data;
}

module.exports = {
  updateWebhook,
};
