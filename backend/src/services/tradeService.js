const tradeRepository = require("../repositories/tradeRepository");

async function getTrades(userId) {
  return tradeRepository.getTrades(userId);
}

async function getTrade(id, userId) {
  return tradeRepository.getTrade(id, userId);
}

async function createTrade(trade) {
  return tradeRepository.createTrade(trade);
}

module.exports = {
  getTrades,
  getTrade,
  createTrade,
};
