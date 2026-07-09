const repository = require("../repositories/paperTradeRepository");

async function createPaperTrade(trade) {
  return repository.createPaperTrade(trade);
}

async function getPaperTrades(userId) {
  return repository.getPaperTrades(userId);
}
async function updateStatus(id, updates) {
  return repository.updateStatus(id, updates);
}
module.exports = {
  createPaperTrade,
  getPaperTrades,
  updateStatus,
};
