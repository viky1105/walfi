const copyService = require("./copyService");
const { getQuote } = require("./jupiterService");
const { getSwapTransaction } = require("./jupiterSwapService");
const paperTradeService = require("./paperTradeService");
const { SOL_MINT } = require("../config/constants");
const executionQueue = require("./executionQueue");
const { Connection, PublicKey } = require("@solana/web3.js");

const LAMPORTS_PER_SOL = 1_000_000_000;
const FEE_RESERVE_LAMPORTS = 10_000_000; // 0.01 SOL for transaction and account-creation costs.
const connection = process.env.SOLANA_RPC
  ? new Connection(process.env.SOLANA_RPC, "confirmed")
  : null;

async function processCopyTrade({ wallet, token, metadata }) {
  try {
    console.log("[Copy Engine] Starting...");

    const settings = await copyService.getSettings(wallet.user_id);
    console.log("[Copy Engine] Looking for settings for user:", wallet.user_id);

    console.log("[Copy Engine] Settings:", settings);

    if (!settings || !settings.enabled) {
      console.log("[Copy Engine] Copy trading disabled.");
      return { status: "skipped", reason: "Copy trading is disabled." };
    }

    if (token.mint === SOL_MINT) {
      console.log(
        "[Copy Engine] Skipping copy trade because token mint matches SOL mint.",
      );
      return { status: "skipped", reason: "SOL is not a copy-trade target." };
    }

    const fixedSol = Number(settings.fixed_sol || 0);
    const lamports = Math.floor(fixedSol * LAMPORTS_PER_SOL);
    const slippageBps = Number(settings.slippage_bps || 50);
    const executionWallet = settings.execution_wallet;

    if (!executionWallet) {
      console.warn("[Copy Engine] No execution wallet is connected for this user.");
      return { status: "skipped", reason: "No execution wallet is connected." };
    }

    if (!Number.isFinite(lamports) || lamports <= 0) {
      console.warn("[Copy Engine] Fixed SOL amount must be greater than zero.");
      return { status: "skipped", reason: "Invalid fixed SOL amount." };
    }

    if (!connection) {
      return {
        status: "failed",
        reason: "Walfi cannot verify your SOL balance because SOLANA_RPC is not configured.",
      };
    }

    let availableLamports;
    try {
      availableLamports = await connection.getBalance(
        new PublicKey(executionWallet),
        "confirmed",
      );
    } catch (err) {
      return {
        status: "failed",
        reason: `Walfi could not check the connected wallet balance: ${err.message}`,
      };
    }

    const requiredLamports = lamports + FEE_RESERVE_LAMPORTS;
    if (availableLamports < requiredLamports) {
      return {
        status: "failed",
        reason: `Insufficient SOL. Available: ${(availableLamports / LAMPORTS_PER_SOL).toFixed(4)} SOL. Required: at least ${(requiredLamports / LAMPORTS_PER_SOL).toFixed(4)} SOL, including a 0.01 SOL fee reserve.`,
      };
    }

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
    return { status: "ready", paperTrade };
  } catch (err) {
    console.error("[Copy Engine] ERROR:");
    console.error(err);
    return { status: "failed", reason: err.message };
  }
}

module.exports = {
  processCopyTrade,
};
