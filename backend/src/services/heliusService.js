const axios = require("axios");

const API_KEY = process.env.HELIUS_API_KEY;
const WEBHOOK_ID = process.env.HELIUS_WEBHOOK_ID;
const HELIUS_WEBHOOK_API = "https://api-mainnet.helius-rpc.com/v0/webhooks";

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

  const url = `${HELIUS_WEBHOOK_API}/${WEBHOOK_ID}?api-key=${API_KEY}`;

  const response = await axios.put(url, {
    webhookURL: required.WEBHOOK_URL,

    accountAddresses,

    transactionTypes: ["ANY"],

    webhookType: "enhanced",
  });

  let webhook = response.data;

  if (webhook.active === false) {
    const reactivated = await axios.patch(url, { active: true });
    webhook = reactivated.data;
    console.log("Helius webhook was disabled and has been re-enabled.");
  }

  if (webhook.active === false) {
    throw new Error("Helius webhook is inactive after synchronization.");
  }

  console.log(
    `Helius webhook synced with ${accountAddresses.length} wallet(s) at ${required.WEBHOOK_URL}.`,
  );
  return webhook;
}

module.exports = {
  updateWebhook,
};
