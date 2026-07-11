import { useEffect, useState } from "react";
import { Activity, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

import { getPaperTrades } from "../api/paperTradeApi";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import PaperTradeCard from "../components/PaperTradeCard";

export default function PaperTradesPage() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPaperTrades();

        setTrades(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load paper trades", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load paper trades.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalTrades = trades.length;
  const readyToSign = trades.filter(
    (trade) => trade.status === "READY_TO_SIGN",
  ).length;
  const confirmed = trades.filter(
    (trade) => trade.status === "CONFIRMED",
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/60 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                Paper Trading
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
                Simulated trades, designed to feel real.
              </h1>
              <p className="mt-3 text-slate-400">
                Review your paper trades, monitor readiness, and test execution
                ideas without putting real capital at risk.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              <Sparkles size={16} />
              Live simulation mode
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={16} />
                <span className="text-sm">Total trades</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {totalTrades}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp size={16} />
                <span className="text-sm">Ready to sign</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {readyToSign}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck size={16} />
                <span className="text-sm">Confirmed</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {confirmed}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <p className="text-slate-400">Loading paper trades...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-800/50 bg-red-950/40 p-10 text-center backdrop-blur-xl">
            <h2 className="text-xl font-bold text-red-200">
              Unable to load paper trades
            </h2>
            <p className="mt-2 text-slate-400">{error}</p>
          </div>
        ) : trades.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white">
              No paper trades yet
            </h2>
            <p className="mt-2 text-slate-400">
              Trigger a tracked wallet swap to see simulated trades appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {trades.map((trade) => (
              <PaperTradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
