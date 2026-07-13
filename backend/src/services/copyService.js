const crypto = require("crypto");
const copyRepository = require("../repositories/copyRepository");

const LINK_CODES = new Map();

async function getSettings(userId) {
  return copyRepository.getSettings(userId);
}

async function saveSettings(userId, settings) {
  return copyRepository.saveSettings(userId, settings);
}

async function generateLinkCode(userId) {
  const code = crypto.randomBytes(8).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  LINK_CODES.set(code, {
    userId,
    expiresAt,
  });

  return { code, expiresAt: expiresAt.toISOString() };
}

async function linkTelegramChat(code, chatId) {
  const entry = LINK_CODES.get(code);

  if (!entry) {
    throw new Error("Invalid link code.");
  }

  if (entry.expiresAt < new Date()) {
    LINK_CODES.delete(code);
    throw new Error("Link code has expired.");
  }

  LINK_CODES.delete(code);

  return copyRepository.saveSettings(entry.userId, {
    telegram_chat_id: chatId,
  });
}

async function setBotExecutionWallet(chatId, executionWallet) {
  const settings = await copyRepository.getSettingsByTelegramChatId(chatId);

  if (!settings) {
    throw new Error("Telegram chat is not linked to a Walfi account.");
  }

  return copyRepository.saveSettings(settings.user_id, {
    execution_wallet: executionWallet,
  });
}

module.exports = {
  getSettings,
  saveSettings,
  generateLinkCode,
  linkTelegramChat,
  setBotExecutionWallet,
};

module.exports = {
  getSettings,
  saveSettings,
  generateLinkCode,
  linkTelegramChat,
  setBotExecutionWallet,
};
