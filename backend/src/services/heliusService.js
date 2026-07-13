const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;
const WEBHOOK_ID = process.env.HELIUS_WEBHOOK_ID;

async function updateWebhook(accountAddresses) {
  const required = {
    HELIUS_API_KEY: API_KEY,
    HELIUS_WEBHOOK_ID: WEBHOOK_ID,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
  };
  const missing = Object.keys(required).filter((key) => !required[key]);

  if (missing.length > 0) {
    throw new Error(`Helius monitoring is not configured: ${missing.join(", ")}`);
  }

  if (accountAddresses.length === 0) {
    throw new Error("No active wallets are available to sync to Helius.");
  }

  const url = `https://api.helius.xyz/v0/webhooks/${WEBHOOK_ID}?api-key=${API_KEY}`;

  const response = await axios.put(url, {
    webhookURL: required.WEBHOOK_URL,

    accountAddresses,

    transactionTypes: ["ANY"],

    webhookType: "enhanced",
  });

  console.log(`Helius webhook synced with ${accountAddresses.length} wallet(s).`);
  return response.data;
}

module.exports = {
  updateWebhook,
};
