import { executeTrade } from "../api/executionApi";
import { broadcastTrade } from "../api/broadcastApi";

import { useState } from "react";
import ExecuteTradeModal from "./ExecuteTradeModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { signSwapTransaction } from "../utils/signTransaction";

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
    READY: "bg-blue-600",
    EXECUTING: "bg-amber-500",
    READY_TO_SIGN: "bg-violet-600",
    CONFIRMED: "bg-emerald-600",
    FAILED: "bg-red-600",
  };
  const labels = {
    READY: "Ready",
    EXECUTING: "Executing",
    READY_TO_SIGN: "Ready to Sign",
    CONFIRMED: "Confirmed",
    FAILED: "Failed",
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">{trade.token_symbol}</h2>

          <p className="text-slate-400 text-sm mt-1">{trade.side}</p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
            statusColor[trade.status] ?? "bg-slate-600"
          }`}
        >
          {labels[trade.status] ?? trade.status}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p>
          Amount:
          <span className="ml-2 font-semibold">{trade.amount}</span>
        </p>

        <p>
          Expected Out:
          <span className="ml-2 font-semibold">
            {Number(trade.expected_out).toLocaleString()}
          </span>
        </p>
      </div>
      {trade.status === "READY_TO_SIGN" && (
        <button
          onClick={() => setOpen(true)}
          className="mt-5 w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-700 transition"
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
