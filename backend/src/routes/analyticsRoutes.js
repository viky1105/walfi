const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getAnalytics } = require("../controllers/analyticsController");

router.get("/", authMiddleware, getAnalytics);

module.exports = router;
