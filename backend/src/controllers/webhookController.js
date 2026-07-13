const webhookService = require("../services/webhookService");
const telegramService = require("../services/telegramService");

exports.heliusWebhook = async (req, res) => {
  try {
    const transactions = Array.isArray(req.body) ? req.body : [];
    console.log(`Helius webhook received ${transactions.length} transaction(s).`);

    if (transactions.length === 0) {
      return res.status(400).json({ message: "Expected a Helius transaction array." });
    }

    await webhookService.processTransactions(transactions);

    console.log("Helius webhook processed successfully.");
    res.sendStatus(200);
  } catch (err) {
    console.error("Helius webhook processing failed:", err);

    res.sendStatus(500);
  }
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
