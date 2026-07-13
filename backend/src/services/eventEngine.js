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

async function processEvent(parsedTx) {
  console.log("Parsed wallet:", parsedTx.wallet);

  const wallet = await walletRepository.getWalletByAddress(parsedTx.wallet);
  console.log("Tracked wallet from DB:", wallet);
  if (!wallet) {
    console.log("Wallet not tracked.");

    return;
  }
  const alreadyProcessed = await activityRepository.activityExists(
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
    const buyPrice = calculateBuyPrice(parsedTx);
    const activity = {
      walletId: wallet.id,
      tokenSymbol: metadata.symbol,
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
      tokenSymbol: metadata.symbol,
      contractAddress: token.mint,
      buyPrice,
      amount: token.amount,
      signature: parsedTx.signature,
    });

    const alert = await alertService.createAlert({
      user_id: wallet.user_id,
      title: `Swap detected for ${wallet.nickname}`,
      message: `${metadata.symbol} swap detected from ${wallet.nickname} at ${new Date(parsedTx.timestamp).toLocaleString()}`,
      is_read: false,
    });

    const userSettings = await copyService.getSettings(wallet.user_id);

    if (userSettings?.telegram_chat_id) {
      await telegramService.sendTelegramMessage(
        userSettings.telegram_chat_id,
        `*Walfi Alert*
Tracked wallet *${wallet.nickname}* made a swap.
Token: *${metadata.symbol}*
Amount: *${token.amount}*
Time: *${new Date(parsedTx.timestamp).toLocaleString()}*`,
      );
    }

    try {
      await copyTradeEngine.processCopyTrade({
        wallet,
        token,
        metadata,
      });
    } catch (err) {
      console.error("========== COPY TRADE ERROR ==========");
      console.error(err);
      console.error(err.stack);
      console.error("======================================");
    }
  }

  console.log("Activity created.");
  const io = getIO();

  io.emit("wallet_activity", {
    wallet: wallet.nickname,
    signature: parsedTx.signature,
    timestamp: parsedTx.timestamp,
  });

  console.log("📡 Live event emitted.");
}

module.exports = {
  processEvent,
};
