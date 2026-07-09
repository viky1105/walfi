const decisionService = require("./decisionService");

async function processSignal(userId, activity) {
  const decision = await decisionService.shouldAutoBuy(userId);

  if (!decision.shouldBuy) {
    return {
      executed: false,
      reason: decision.reason,
    };
  }

  // We'll call Jupiter here later.

  console.log("🚀 BUY:", activity.token_symbol);

  return {
    executed: true,
    token: activity.token_symbol,
    amount: 0.1,
  };
}

module.exports = {
  processSignal,
};
