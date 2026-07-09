const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controllers/paperTradeController");

router.get("/", authMiddleware, controller.getPaperTrades);

module.exports = router;
