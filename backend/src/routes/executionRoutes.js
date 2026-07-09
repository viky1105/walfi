const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controllers/executionController");

router.post("/:id", authMiddleware, controller.executeTrade);

module.exports = router;
