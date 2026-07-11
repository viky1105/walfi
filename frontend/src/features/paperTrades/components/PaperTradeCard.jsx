import { executeTrade } from "../api/executionApi";
import { broadcastTrade } from "../api/broadcastApi";

import { useState } from "react";
import {
  ArrowRightLeft,
  CircleDollarSign,
  Sparkles,
  TimerReset,
} from "lucide-react";
import ExecuteTradeModal from "./ExecuteTradeModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { signSwapTransaction } from "../utils/signTransaction";

function formatMetric(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString(undefined, {
    maximumFractionDigits: 6,
  });
}

export default function PaperTradeCard({ trade }) {
  const [open, setOpen] = useState(false);
  const wallet = useWallet();

  async function handleExecute() {
    try {
      const prepared = await executeTrade(
        trade.id,
        wallet.publicKey.toBase58(),
      );

      const signed = await signSwapTransaction(
        wallet,
        prepared.swapTransaction,
      );

      const result = await broadcastTrade(trade.id, signed);

      console.log(result);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  const statusColor = {
    READY: "bg-sky-600/20 text-sky-300 border-sky-500/20",
    EXECUTING: "bg-amber-600/20 text-amber-300 border-amber-500/20",
    READY_TO_SIGN: "bg-violet-600/20 text-violet-300 border-violet-500/20",
    CONFIRMED: "bg-emerald-600/20 text-emerald-300 border-emerald-500/20",
    FAILED: "bg-red-600/20 text-red-300 border-red-500/20",
  };

  const labels = {
    READY: "Ready",
    EXECUTING: "Executing",
    READY_TO_SIGN: "Ready to Sign",
    CONFIRMED: "Confirmed",
    FAILED: "Failed",
  };

  const sideLabel = trade.side === "BUY" ? "Buy setup" : "Sell setup";

  return (
    <div className="group rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-violet-500/30">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
            <ArrowRightLeft size={18} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              {trade.token_symbol || trade.symbol || "Unknown token"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{sideLabel}</p>
          </div>
        </div>

        <div
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            statusColor[trade.status] ??
            "border-slate-600/20 bg-slate-700/50 text-slate-300"
          }`}
        >
          {labels[trade.status] ?? trade.status}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <CircleDollarSign size={16} />
            <span className="text-sm">Size</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-white">
            {formatMetric(trade.amount)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles size={16} />
            <span className="text-sm">Expected out</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-white">
            {formatMetric(trade.expected_out)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-400">
        <TimerReset size={16} />
        <span>
          {trade.status === "READY_TO_SIGN"
            ? "This trade is ready to be executed from the wallet"
            : "The trade is being tracked and can be reviewed at any time"}
        </span>
      </div>

      {trade.status === "READY_TO_SIGN" && (
        <button
          onClick={() => setOpen(true)}
          className="mt-5 w-full rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Execute Trade
        </button>
      )}

      <ExecuteTradeModal
        trade={trade}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleExecute}
      />
    </div>
  );
}
