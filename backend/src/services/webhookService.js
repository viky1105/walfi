const { parseSwap } = require("./transactionParser");
const { processEvent } = require("./eventEngine");

async function processTransactions(transactions) {
  for (const tx of transactions) {
    console.log("------------------------------------------------");
    console.log("Transaction Type:", tx.type);

    // Ignore NFT transactions
    if (tx.type === "NFT_SALE") {
      console.log("Ignoring NFT Sale");
      continue;
    }

    // Ignore transfers
    if (tx.type === "TRANSFER") {
      console.log("Ignoring Transfer");
      continue;
    }

    // Only continue with swaps
    if (tx.type !== "SWAP") {
      console.log("Unsupported:", tx.type);
      continue;
    }

    console.log("SWAP DETECTED");

    const parsed = parseSwap(tx);

    await processEvent(parsed);
  }
}

module.exports = {
  processTransactions,
};
