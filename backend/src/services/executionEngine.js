const paperTradeService = require("./paperTradeService");

async function executeTrade(paperTrade) {
  console.log("🚀 Executing paper trade:", paperTrade.id);

  await paperTradeService.updateStatus(paperTrade.id, {
    status: "EXECUTING",
  });

  // Live execution comes next sprint.

  await paperTradeService.updateStatus(paperTrade.id, {
    status: "READY_TO_SIGN",
  });

  console.log("✅ Trade ready for wallet signature.");
}

module.exports = {
  executeTrade,
};
