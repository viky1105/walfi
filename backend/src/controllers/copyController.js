const copyService = require("../services/copyService");
const telegramService = require("../services/telegramService");

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
    const fixedSol = Number(req.body.fixed_sol);
    const slippageBps = Number(req.body.slippage_bps);

    if (!Number.isFinite(fixedSol) || fixedSol <= 0) {
      return res.status(400).json({ message: "fixed_sol must be greater than zero" });
    }

    if (!Number.isInteger(slippageBps) || slippageBps < 0 || slippageBps > 5_000) {
      return res.status(400).json({ message: "slippage_bps must be between 0 and 5000" });
    }

    const settings = await copyService.saveSettings(req.user.id, {
      enabled: Boolean(req.body.enabled),
      fixed_sol: fixedSol,
      slippage_bps: slippageBps,
      // The signed-in wallet is the only wallet this account can use for copy trades.
      execution_wallet: req.user.wallet,
    });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.generateLinkCode = async (req, res) => {
  try {
    const { code, expiresAt } = await copyService.generateLinkCode(req.user.id);

    res.json({
      code,
      expires_at: expiresAt,
      bot_url: telegramService.getBotDeepLink(code),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to generate a Telegram link code." });
  }
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
  const { execution_wallet } = req.body;

  if (!execution_wallet) {
    return res
      .status(400)
      .json({ message: "execution_wallet is required" });
  }

  if (execution_wallet !== req.user.wallet) {
    return res.status(400).json({
      message: "Execution wallet must match the wallet signed in to Walfi.",
    });
  }

  const settings = await copyService.saveSettings(req.user.id, {
    execution_wallet,
  });

  res.json(settings);
};
