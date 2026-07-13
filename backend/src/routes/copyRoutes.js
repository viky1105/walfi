const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controllers/copyController");

router.post("/link-code", authMiddleware, controller.generateLinkCode);
router.post("/link", controller.linkTelegramChat);
router.post(
  "/bot/execution-wallet",
  authMiddleware,
  controller.setBotExecutionWallet,
);

router.get("/", authMiddleware, controller.getSettings);
router.put("/", authMiddleware, controller.saveSettings);

module.exports = router;
