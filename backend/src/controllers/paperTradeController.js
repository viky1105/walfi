const paperTradeService = require("../services/paperTradeService");

exports.getPaperTrades = async (req, res) => {
  try {
    const trades = await paperTradeService.getPaperTrades(req.user.id);

    res.json(trades);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to load paper trades.",
    });
  }
};
