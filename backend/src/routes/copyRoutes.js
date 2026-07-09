const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controllers/copyController");

router.get("/", authMiddleware, controller.getSettings);
router.put("/", authMiddleware, controller.saveSettings);

module.exports = router;
