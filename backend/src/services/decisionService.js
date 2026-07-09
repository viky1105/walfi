async function shouldAutoBuy(userId) {
  // Later we'll load user settings from the DB.
  // For now, always allow auto-buy.

  return {
    shouldBuy: true,
    reason: "Auto-buy enabled (development mode)",
  };
}

module.exports = {
  shouldAutoBuy,
};
