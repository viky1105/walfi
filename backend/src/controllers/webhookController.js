const webhookService = require("../services/webhookService");

exports.heliusWebhook = async (req, res) => {
  try {
    await webhookService.processTransactions(req.body);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);

    res.sendStatus(500);
  }
};
