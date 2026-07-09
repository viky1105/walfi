const router = require("express").Router();

const { heliusWebhook } = require("../controllers/webhookController");

router.post("/helius", heliusWebhook);

module.exports = router;
