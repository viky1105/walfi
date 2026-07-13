const webhookService = require("../services/webhookService");
const telegramService = require("../services/telegramService");

exports.heliusWebhook = (req, res) => {
  const transactions = Array.isArray(req.body) ? req.body : [];
  console.log(`Helius webhook received ${transactions.length} transaction(s).`);

  if (transactions.length === 0) {
    return res.status(400).json({ message: "Expected a Helius transaction array." });
  }

  // Helius requires a successful acknowledgement within one second. The
  // transaction work can involve external APIs, so handle it after replying.
  res.sendStatus(200);

  void webhookService
    .processTransactions(transactions)
    .then(() => console.log("Helius webhook processed successfully."))
    .catch((err) => console.error("Helius webhook processing failed:", err));
};

exports.telegramWebhook = async (req, res) => {
  if (!telegramService.isValidWebhookSecret(
    req.get("X-Telegram-Bot-Api-Secret-Token"),
  )) {
    return res.sendStatus(401);
  }

  try {
    await telegramService.handleTelegramUpdate(req.body);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return res.sendStatus(500);
  }
};
