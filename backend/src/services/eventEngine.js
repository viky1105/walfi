const activityRepository = require("../repositories/activityRepository");
const walletRepository = require("../repositories/walletRepository");
const tradeService = require("./tradeService");
const tokenService = require("./tokenService");
const alertService = require("./alertService");
const telegramService = require("./telegramService");
const copyService = require("./copyService");
const { getIO } = require("../socket/socket");
const { calculateBuyPrice } = require("./priceEngine");
const copyTradeEngine = require("./copyTradeEngine");

function getTokenLabel(metadata) {
  if (metadata.name && metadata.name !== metadata.symbol) {
    return `${metadata.name} (${metadata.symbol})`;
  }

  return metadata.symbol;
}

async function processEvent(parsedTx) {
  console.log("Parsed wallet:", parsedTx.wallet);

  const wallets = await walletRepository.getWalletsByAddress(parsedTx.wallet);
  console.log("Tracked wallets from DB:", wallets.length);
  if (wallets.length === 0) {
    console.log("Wallet not tracked.");

    return;
  }

  const results = await Promise.allSettled(
    wallets.map((wallet) => processWalletEvent(wallet, parsedTx)),
  );

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Unable to process tracked-wallet event:", result.reason);
    }
  }

  const io = getIO();

  io.emit("wallet_activity", {
    wallet: parsedTx.wallet,
    signature: parsedTx.signature,
    timestamp: parsedTx.timestamp,
  });

  console.log("📡 Live event emitted.");
}

async function processWalletEvent(wallet, parsedTx) {
  const alreadyProcessed = await activityRepository.activityExists(
    wallet.id,
    parsedTx.signature,
  );

  if (alreadyProcessed) {
    console.log("⏭ Duplicate transaction ignored.");

    return;
  }

  console.log("Tracked wallet:", wallet.nickname);

  const SOL_MINT = "So11111111111111111111111111111111111111112";

  const tradableTokens = parsedTx.received.filter(
    (token) => token.mint !== SOL_MINT,
  );

  for (const token of tradableTokens) {
    const metadata = await tokenService.getMetadata(token.mint);
    const tokenLabel = getTokenLabel(metadata);
    const buyPrice = calculateBuyPrice(parsedTx);
    const activity = {
      walletId: wallet.id,
      tokenSymbol: tokenLabel,
      contractAddress: token.mint,
      side: "BUY",
      amount: token.amount,
      price: buyPrice,
      signature: parsedTx.signature,
    };

    const createdActivity = await activityRepository.createActivity(activity);

    if (!createdActivity) {
      console.log("⏭ Duplicate transaction ignored.");
      return;
    }

    await tradeService.createTrade({
      userId: wallet.user_id,
      tokenSymbol: tokenLabel,
      contractAddress: token.mint,
      buyPrice,
      amount: token.amount,
      signature: parsedTx.signature,
    });

    const alert = await alertService.createAlert({
      user_id: wallet.user_id,
      tracked_wallet_id: wallet.id,
      title: `Swap detected for ${wallet.nickname}`,
      message: `${tokenLabel} swap detected from ${wallet.nickname} at ${new Date(parsedTx.timestamp).toLocaleString()}`,
      is_read: false,
    });

    const userSettings = await copyService.getSettings(wallet.user_id);

    if (userSettings?.telegram_chat_id) {
      await telegramService.sendTelegramMessage(
        userSettings.telegram_chat_id,
        `Walfi alert\n\nTracked wallet ${wallet.nickname} made a swap.\nToken: ${tokenLabel}\nAmount: ${token.amount}\nTime: ${new Date(parsedTx.timestamp).toLocaleString()}`,
      );
    }

    try {
      const copyTrade = await copyTradeEngine.processCopyTrade({
        wallet,
        token,
        metadata,
      });

      if (copyTrade?.status === "ready" && userSettings?.telegram_chat_id) {
        await telegramService.sendTelegramMessage(
          userSettings.telegram_chat_id,
          `Auto-copy prepared for ${tokenLabel}. Open Walfi to review and sign the transaction with your connected wallet.`,
        );
      } else if (
        userSettings?.telegram_chat_id &&
        (copyTrade?.status === "failed" || copyTrade?.status === "skipped")
      ) {
        await telegramService.sendTelegramMessage(
          userSettings.telegram_chat_id,
          `Auto-copy was not prepared for ${tokenLabel}. Reason: ${copyTrade.reason}`,
        );
      }
    } catch (err) {
      console.error("========== COPY TRADE ERROR ==========");
      console.error(err);
      console.error(err.stack);
      console.error("======================================");
    }
  }

  console.log(`Activity created for ${wallet.nickname}.`);
}

module.exports = {
  processEvent,
};
