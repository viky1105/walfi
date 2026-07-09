const executionService = require("../services/executionService");

exports.executeTrade = async (req, res) => {
  try {
    const result = await executionService.prepareTrade(
      req.params.id,
      req.user.id,
      req.body.publicKey,
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Unable to prepare trade.",
    });
  }
};
