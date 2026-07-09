const { Connection, VersionedTransaction } = require("@solana/web3.js");

const paperTradeRepository = require("../repositories/paperTradeRepository");

const connection = new Connection(process.env.SOLANA_RPC);

async function broadcastTrade(userId, tradeId, signedTransaction) {
  const trade = await paperTradeRepository.getTrade(tradeId, userId);

  if (!trade) {
    throw new Error("Trade not found.");
  }

  if (trade.status !== "READY_TO_SIGN") {
    throw new Error("Trade is no longer executable.");
  }

  await paperTradeRepository.updateStatus(tradeId, "EXECUTING");

  const tx = VersionedTransaction.deserialize(
    Buffer.from(signedTransaction, "base64"),
  );

  const signature = await connection.sendTransaction(tx);

  await connection.confirmTransaction(signature);

  await paperTradeRepository.finishTrade(tradeId, signature);

  return {
    signature,
  };
}

module.exports = {
  broadcastTrade,
};
