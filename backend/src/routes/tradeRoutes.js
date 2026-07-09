const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getTrades, getTrade } = require("../controllers/tradeController");

router.get("/", authMiddleware, getTrades);

router.get("/:id", authMiddleware, getTrade);

module.exports = router;
