const router = require("express").Router();

const {
  heliusWebhook,
  telegramWebhook,
} = require("../controllers/webhookController");

router.post("/helius", heliusWebhook);
router.post("/telegram", telegramWebhook);

module.exports = router;
