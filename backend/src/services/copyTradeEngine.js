const copyService = require("./copyService");
const { getQuote } = require("./jupiterService");
const { getSwapTransaction } = require("./jupiterSwapService");
const paperTradeService = require("./paperTradeService");
const { SOL_MINT } = require("../config/constants");
const executionQueue = require("./executionQueue");

async function processCopyTrade({ wallet, token, metadata }) {
  try {
    console.log("[Copy Engine] Starting...");

    const settings = await copyService.getSettings(wallet.user_id);
    console.log("[Copy Engine] Looking for settings for user:", wallet.user_id);

    console.log("[Copy Engine] Settings:", settings);

    if (!settings || !settings.enabled) {
      console.log("[Copy Engine] Copy trading disabled.");
      return;
    }

    if (token.mint === SOL_MINT) {
      console.log(
        "[Copy Engine] Skipping copy trade because token mint matches SOL mint.",
      );
      return;
    }

    const lamports = Math.floor(Number(settings.fixed_sol || 0) * 1_000_000_000);
    const slippageBps = Number(settings.slippage_bps || 50);
    const executionWallet = settings.execution_wallet || wallet.wallet_address;

    console.log("[Copy Engine] Requesting Jupiter quote...");

    const quote = await getQuote(SOL_MINT, token.mint, lamports, slippageBps);

    console.log("[Copy Engine] Quote received.");

    const swap = await getSwapTransaction(quote, executionWallet);

    console.log("[Copy Engine] Swap transaction built.");

    const paperTrade = await paperTradeService.createPaperTrade({
      user_id: wallet.user_id,
      tracked_wallet_id: wallet.id,

      token_symbol: metadata.symbol,
      token_mint: token.mint,

      side: "BUY",

      amount: token.amount,

      expected_out: quote.outAmount,

      quote,

      swap,

      status: "READY",
    });

    executionQueue.addTrade(paperTrade);

    console.log("[Copy Engine] ✅ Paper trade saved.");
  } catch (err) {
    console.error("[Copy Engine] ERROR:");
    console.error(err);
  }
}

module.exports = {
  processCopyTrade,
};
