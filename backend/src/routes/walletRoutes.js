const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addWallet,
  getWallets,
  getWallet,
} = require("../controllers/walletController");

router.get("/", authMiddleware, getWallets);

router.get("/:id", authMiddleware, getWallet);

router.post("/", authMiddleware, addWallet);

module.exports = router;
