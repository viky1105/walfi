const crypto = require("crypto");
const copyRepository = require("../repositories/copyRepository");

const LINK_CODES = new Map();

async function getSettings(userId) {
  return copyRepository.getSettings(userId);
}

async function saveSettings(userId, settings) {
  const sanitizedSettings = {};

  if (typeof settings.enabled === "boolean") {
    sanitizedSettings.enabled = settings.enabled;
  }

  if (Number.isFinite(Number(settings.fixed_sol))) {
    sanitizedSettings.fixed_sol = Number(settings.fixed_sol);
  }

  if (Number.isInteger(Number(settings.slippage_bps))) {
    sanitizedSettings.slippage_bps = Number(settings.slippage_bps);
  }

  if (typeof settings.execution_wallet === "string") {
    sanitizedSettings.execution_wallet = settings.execution_wallet;
  }

  return copyRepository.saveSettings(userId, sanitizedSettings);
}

async function generateLinkCode(userId) {
  for (const [existingCode, entry] of LINK_CODES) {
    if (entry.expiresAt < new Date()) {
      LINK_CODES.delete(existingCode);
    }
  }

  const code = crypto.randomBytes(8).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  LINK_CODES.set(code, {
    userId,
    expiresAt,
  });

  return { code, expiresAt: expiresAt.toISOString() };
}

async function linkTelegramChat(code, chatId) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  const entry = LINK_CODES.get(normalizedCode);

  if (!entry) {
    throw new Error("Invalid link code.");
  }

  if (entry.expiresAt < new Date()) {
    LINK_CODES.delete(normalizedCode);
    throw new Error("Link code has expired.");
  }

  const existingSettings = await copyRepository.getSettingsByTelegramChatId(chatId);

  if (existingSettings && existingSettings.user_id !== entry.userId) {
    throw new Error("This Telegram chat is already linked to another Walfi account.");
  }

  const settings = await copyRepository.saveSettings(entry.userId, {
    telegram_chat_id: chatId,
  });

  LINK_CODES.delete(normalizedCode);

  return settings;
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

async function unlinkTelegramChat(chatId) {
  const settings = await copyRepository.getSettingsByTelegramChatId(chatId);

  if (!settings) {
    throw new Error("Telegram chat is not linked to a Walfi account.");
  }

  return copyRepository.saveSettings(settings.user_id, {
    telegram_chat_id: null,
  });
}

module.exports = {
  getSettings,
  saveSettings,
  generateLinkCode,
  linkTelegramChat,
  setBotExecutionWallet,
  unlinkTelegramChat,
};
