const axios = require("axios");
const crypto = require("crypto");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function getBotApiUrl(method) {
  return `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
}

function getBotDeepLink(code) {
  const username = process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, "");

  if (!username) {
    return null;
  }

  return `https://t.me/${username}?start=${encodeURIComponent(code)}`;
}

function isValidWebhookSecret(receivedSecret) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!expectedSecret || !receivedSecret) {
    return false;
  }

  const expected = Buffer.from(expectedSecret);
  const received = Buffer.from(receivedSecret);

  return (
    expected.length === received.length &&
    crypto.timingSafeEqual(expected, received)
  );
}

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
      getBotApiUrl("sendMessage"),
      {
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      },
    );

    return response.data;
  } catch (err) {
    console.error("Telegram send error:", err.response?.data || err.message);
    return null;
  }
}

async function linkChat(chatId, linkCode) {
  const copyService = require("./copyService");
  await copyService.linkTelegramChat(linkCode, chatId);

  await sendTelegramMessage(
    chatId,
    "Your Telegram account is now linked to Walfi. You will receive swap alerts here for wallets you track.",
  );
}

async function handleTelegramUpdate(update) {
  const message = update?.message;
  const chat = message?.chat;
  const text = message?.text?.trim();

  if (!chat || chat.type !== "private" || !text) {
    return;
  }

  const startMatch = text.match(/^\/start(?:@\w+)?(?:\s+(.+))?$/i);
  const linkMatch = text.match(/^\/link(?:@\w+)?\s+(.+)$/i);
  const isLinkCode = /^[A-F0-9]{16}$/i.test(text);
  const linkCode = startMatch?.[1] || linkMatch?.[1] || (isLinkCode ? text : null);

  if (linkCode) {
    try {
      await linkChat(chat.id, linkCode);
    } catch (err) {
      await sendTelegramMessage(chat.id, `Unable to link your Walfi account: ${err.message}`);
    }
    return;
  }

  if (/^\/unlink(?:@\w+)?$/i.test(text)) {
    try {
      const copyService = require("./copyService");
      await copyService.unlinkTelegramChat(chat.id);
      await sendTelegramMessage(chat.id, "Your Telegram account has been unlinked from Walfi.");
    } catch (err) {
      await sendTelegramMessage(chat.id, `Unable to unlink this chat: ${err.message}`);
    }
    return;
  }

  await sendTelegramMessage(
    chat.id,
    "Welcome to Walfi. Generate a link code in Walfi Settings, then open this bot from the link or send the code here. Use /unlink to disconnect later.",
  );
}

async function registerWebhook() {
  const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!BOT_TOKEN || !webhookUrl || !webhookSecret) {
    console.warn(
      "Telegram webhook not configured. Set TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_URL, and TELEGRAM_WEBHOOK_SECRET to enable the Walfi bot.",
    );
    return null;
  }

  try {
    const response = await axios.post(getBotApiUrl("setWebhook"), {
      url: webhookUrl,
      secret_token: webhookSecret,
      allowed_updates: ["message"],
    });

    console.log("Telegram webhook configured.");
    return response.data;
  } catch (err) {
    console.error("Telegram webhook setup error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = {
  sendTelegramMessage,
  getBotDeepLink,
  isValidWebhookSecret,
  handleTelegramUpdate,
  registerWebhook,
};
