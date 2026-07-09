const scoreService = require("../services/scoreService");

exports.getWalletScores = async (req, res) => {
  try {
    const data = await scoreService.getWalletScores(req.user.id);

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
