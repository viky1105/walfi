const { parseSwap } = require("./transactionParser");
const { processEvent } = require("./eventEngine");

const SOL_MINT = "So11111111111111111111111111111111111111112";

function isBuyLikeSwap(tx) {
  if (tx.type === "SWAP" || tx.events?.swap) {
    return true;
  }

  // Some DEX routes are not classified by Helius and arrive as UNKNOWN.
  // Treat those as a swap only when the fee payer receives a non-SOL token
  // and sends an asset out in the same transaction.
  if (tx.type !== "UNKNOWN") {
    return false;
  }

  const parsed = parseSwap(tx);
  const receivesToken = parsed.received.some(
    (token) => token.mint !== SOL_MINT && Number(token.amount) > 0,
  );
  const sendsToken = parsed.sent.some((token) => Number(token.amount) > 0);
  const sendsSol = (tx.nativeTransfers || []).some(
    (transfer) =>
      transfer.fromUserAccount === tx.feePayer &&
      Number(transfer.amount) >= 1_000_000,
  );

  return receivesToken && (sendsToken || sendsSol);
}

async function processTransactions(transactions) {
  for (const tx of transactions) {
    console.log("------------------------------------------------");
    console.log("Transaction Type:", tx.type);

    // Ignore NFT transactions
    if (tx.type === "NFT_SALE") {
      console.log("Ignoring NFT Sale");
      continue;
    }

    if (!isBuyLikeSwap(tx)) {
      console.log("Not a buy-like swap:", tx.type);
      continue;
    }

    console.log(
      tx.type === "SWAP" ? "SWAP DETECTED" : "BUY-LIKE SWAP INFERRED",
    );

    const parsed = parseSwap(tx);

    await processEvent(parsed);
  }
}

module.exports = {
  processTransactions,
  isBuyLikeSwap,
};
