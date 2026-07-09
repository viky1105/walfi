const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getRecentActivity,
  seedActivity,
} = require("../controllers/activityController");

router.get("/", authMiddleware, getRecentActivity);

module.exports = router;
