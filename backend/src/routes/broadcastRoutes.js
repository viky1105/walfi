const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controllers/broadcastController");

router.post("/", authMiddleware, controller.broadcast);

module.exports = router;
