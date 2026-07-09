import { useEffect, useState } from "react";

import { getPaperTrades } from "../api/paperTradeApi";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import PaperTradeCard from "../components/PaperTradeCard";

function getCurrentUserId() {
  const token = localStorage.getItem("walfi_token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload?.id || null;
  } catch {
    return null;
  }
}

export default function PaperTradesPage() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    setCurrentUserId(getCurrentUserId());

    async function load() {
      try {
        const data = await getPaperTrades();
        console.log("PaperTrades API response:", data);

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

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Paper Trades</h1>
          {currentUserId ? (
            <span className="text-sm text-slate-400">
              Current user: {currentUserId}
            </span>
          ) : null}
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">Loading paper trades...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-700 bg-red-950 p-8 text-center">
            <h2 className="text-xl font-bold text-red-200">
              Unable to load paper trades
            </h2>
            <p className="text-slate-400 mt-2">{error}</p>
          </div>
        ) : trades.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
            <h2 className="text-xl font-bold">No Paper Trades Yet</h2>
            <p className="text-slate-400 mt-2">
              Trigger a tracked wallet swap to see simulated trades.
            </p>
          </div>
        ) : (
          trades.map((trade) => <PaperTradeCard key={trade.id} trade={trade} />)
        )}
      </div>
    </DashboardLayout>
  );
}
