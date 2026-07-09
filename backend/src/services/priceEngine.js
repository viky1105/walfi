const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

function calculateBuyPrice(parsedTx) {
  const usdcSent = parsedTx.sent.find((t) => t.mint === USDC_MINT);

  if (!usdcSent) {
    return 0;
  }

  const bought = parsedTx.received[0];

  if (!bought) {
    return 0;
  }

  return usdcSent.amount / bought.amount;
}

module.exports = {
  calculateBuyPrice,
};
