const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addWallet,
  getWallets,
  getWallet,
  deleteWallet,
} = require("../controllers/walletController");

router.get("/", authMiddleware, getWallets);

router.get("/:id", authMiddleware, getWallet);

router.post("/", authMiddleware, addWallet);

router.delete("/:id", authMiddleware, deleteWallet);

module.exports = router;
