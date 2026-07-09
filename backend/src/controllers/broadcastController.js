const broadcastService = require("../services/broadcastService");

exports.broadcast = async (req, res) => {
  try {
    const result = await broadcastService.broadcastTrade(
      req.user.id,
      req.body.tradeId,
      req.body.signedTransaction,
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};
