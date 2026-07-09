const paperTradeRepository = require("../repositories/paperTradeRepository");
const { getSwapTransaction } = require("./jupiterSwapService");

async function prepareTrade(id, userId, publicKey) {
  const trade = await paperTradeRepository.getTrade(id, userId);

  if (!trade) {
    throw new Error("Trade not found.");
  }
  console.log("Connected wallet:", publicKey);

  const swap = await getSwapTransaction(trade.quote, publicKey);

  return {
    id: trade.id,
    swapTransaction: swap.swapTransaction,
    status: trade.status,
  };
}

module.exports = {
  prepareTrade,
};
