const webhookService = require("../services/webhookService");
const telegramService = require("../services/telegramService");

exports.heliusWebhook = async (req, res) => {
  try {
    await webhookService.processTransactions(req.body);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);

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
