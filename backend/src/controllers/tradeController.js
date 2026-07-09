const tradeService = require("../services/tradeService");

exports.getTrades = async (req, res) => {
  try {
    const trades = await tradeService.getTrades(req.user.id);

    res.json(trades);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTrade = async (req, res) => {
  try {
    const trade = await tradeService.getTrade(req.params.id, req.user.id);

    res.json(trade);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
