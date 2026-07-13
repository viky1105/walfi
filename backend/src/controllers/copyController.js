const copyService = require("../services/copyService");

exports.getSettings = async (req, res) => {
  try {
    const settings = await copyService.getSettings(req.user.id);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.saveSettings = async (req, res) => {
  try {
    const settings = await copyService.saveSettings(req.user.id, req.body);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.generateLinkCode = async (req, res) => {
  const { code, expiresAt } = await copyService.generateLinkCode(req.user.id);

  res.json({ code, expires_at: expiresAt });
};

exports.linkTelegramChat = async (req, res) => {
  const { code, chat_id, telegram_user_id } = req.body;

  if (!code || !chat_id) {
    return res.status(400).json({ message: "code and chat_id are required" });
  }

  const settings = await copyService.linkTelegramChat(
    code,
    chat_id,
    telegram_user_id,
  );

  res.json(settings);
};

exports.setBotExecutionWallet = async (req, res) => {
  const { chat_id, execution_wallet } = req.body;

  if (!chat_id || !execution_wallet) {
    return res
      .status(400)
      .json({ message: "chat_id and execution_wallet are required" });
  }

  const settings = await copyService.setBotExecutionWallet(
    chat_id,
    execution_wallet,
  );

  res.json(settings);
};
