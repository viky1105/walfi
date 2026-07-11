import { useNavigate } from "react-router-dom";
import { ArrowRight, Coins, DollarSign, TrendingUp } from "lucide-react";

export default function PortfolioCard({ trade }) {
  const value = trade.buy_price * trade.amount;
  const navigate = useNavigate();

  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-violet-500/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
            <Coins size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {trade.token_symbol || trade.symbol || "Unknown token"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {trade.status || "Unknown"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            trade.status === "OPEN"
              ? "border border-emerald-500/20 bg-emerald-600/20 text-emerald-300"
              : "border border-rose-500/20 bg-rose-600/20 text-rose-300"
          }`}
        >
          {trade.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Coins size={16} />
            <span className="text-sm">Position</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-white">
            {Number(trade.amount).toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <DollarSign size={16} />
            <span className="text-sm">Buy price</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-white">
            {Number(trade.buy_price).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center gap-2 text-slate-400">
          <TrendingUp size={16} />
          <span className="text-sm">Current value</span>
        </div>
        <p className="mt-2 text-xl font-semibold text-white">
          {value.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => navigate(`/dashboard/portfolio/${trade.id}`)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
      >
        View Details
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
