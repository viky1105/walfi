const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getAlerts, markAsRead } = require("../controllers/alertController");

router.get("/", authMiddleware, getAlerts);

router.patch("/:id/read", authMiddleware, markAsRead);

module.exports = router;
