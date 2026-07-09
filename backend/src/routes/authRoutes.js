const express = require("express");
const router = express.Router();

const {
  getChallenge,
  verifySignature,
} = require("../controllers/authController");

router.get("/challenge", getChallenge);

router.post("/verify", verifySignature);

module.exports = router;
