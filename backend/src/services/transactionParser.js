function parseSwap(tx) {
  const received = [];
  const sent = [];

  for (const transfer of tx.tokenTransfers || []) {
    if (transfer.toUserAccount === tx.feePayer) {
      received.push({
        mint: transfer.mint,
        amount: transfer.tokenAmount,
      });
    }

    if (transfer.fromUserAccount === tx.feePayer) {
      sent.push({
        mint: transfer.mint,
        amount: transfer.tokenAmount,
      });
    }
  }

  return {
    signature: tx.signature,
    wallet: tx.feePayer,
    timestamp: tx.timestamp,
    received,
    sent,
  };
}

module.exports = {
  parseSwap,
};
