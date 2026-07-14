const walletService = require("../services/walletService");

exports.addWallet = async (req, res) => {
  try {
    const result = await walletService.addWallet(
      req.user.id,

      req.body,
    );

    res.status(201).json(result);
  } catch (err) {
    console.error(err);

    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getWallets = async (req, res) => {
  try {
    const wallets = await walletService.getWallets(req.user.id);

    res.json(wallets);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const wallet = await walletService.getWallet(req.user.id, req.params.id);

    res.json(wallet);
  } catch (err) {
    console.error(err);

    res.status(404).json({
      message: err.message,
    });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    await walletService.deleteWallet(req.user.id, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
