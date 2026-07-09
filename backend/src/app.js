require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const alertRoutes = require("./routes/alertRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const copyRoutes = require("./routes/copyRoutes");
const paperTradeRoutes = require("./routes/paperTradeRoutes");
const executionRoutes = require("./routes/executionRoutes");
const broadcastRoutes = require("./routes/broadcastRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Walfi API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/trades", tradeRoutes);

app.use("/api/alerts", alertRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/copy", copyRoutes);
app.use("/api/paper-trades", paperTradeRoutes);
app.use("/api/execute", executionRoutes);
app.use("/api/broadcast", broadcastRoutes);

module.exports = app;
