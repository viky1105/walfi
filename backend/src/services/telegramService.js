const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN) {
    console.warn("Telegram bot token is not configured.");
    return null;
  }

  if (!chatId) {
    console.warn("Telegram chat ID is not configured for this user.");
    return null;
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      },
    );

    return response.data;
  } catch (err) {
    console.error("Telegram send error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = {
  sendTelegramMessage,
};
