const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getWalletScores } = require("../controllers/scoreController");

router.get("/", authMiddleware, getWalletScores);

module.exports = router;
