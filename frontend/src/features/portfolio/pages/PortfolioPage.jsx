import { useEffect, useState } from "react";
import { BriefcaseBusiness, TrendingUp, Wallet2 } from "lucide-react";
import { getPortfolio } from "../api/portfolioApi";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import PortfolioStats from "../components/PortfolioStats";
import PortfolioCard from "../components/PortfolioCard";

export default function PortfolioPage() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPortfolio();
        setTrades(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }

    loadPortfolio();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/60 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                Portfolio
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
                Your on-chain positions, neatly organized.
              </h1>
              <p className="mt-3 text-slate-400">
                Track open positions, monitor portfolio value, and drill into
                each trade without leaving the dashboard.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              <BriefcaseBusiness size={16} />
              Active watchlist
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <Wallet2 size={16} />
                <span className="text-sm">Total positions</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {trades.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp size={16} />
                <span className="text-sm">Momentum ready</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {trades.filter((trade) => trade.status === "OPEN").length}
              </p>
            </div>
          </div>
        </div>

        <PortfolioStats trades={trades} />

        {trades.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white">No positions yet</h2>
            <p className="mt-2 text-slate-400">
              Your portfolio will appear here as soon as positions are detected.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {trades.map((trade) => (
              <PortfolioCard key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
