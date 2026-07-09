import { useNavigate } from "react-router-dom";

export default function PortfolioCard({ trade }) {
  const value = trade.buy_price * trade.amount;
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{trade.token_symbol}</h2>

        <span
          className={`rounded-full px-3 py-1 text-sm ${
            trade.status === "OPEN" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {trade.status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">Position</span>

          <span>{trade.amount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Buy Price</span>

          <span>{trade.buy_price}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Current Value</span>

          <span>{value.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/dashboard/portfolio/${trade.id}`)}
        className="mt-6 w-full rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-700"
      >
        View Details
      </button>
    </div>
  );
}
