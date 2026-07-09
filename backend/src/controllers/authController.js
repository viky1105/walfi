const authService = require("../services/authService");

exports.getChallenge = async (req, res) => {
  try {
    const wallet = req.query.wallet;

    if (!wallet) {
      return res.status(400).json({
        message: "Wallet address required",
      });
    }

    const challenge = await authService.createChallenge(wallet);

    res.json(challenge);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const result = await authService.verifySignature(req.body);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(400).json({
      message: err.message,
    });
  }
};
