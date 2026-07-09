export default function PortfolioStats({ trades }) {
  const totalPositions = trades.length;

  const openPositions = trades.filter(
    (trade) => trade.status === "OPEN",
  ).length;

  const portfolioValue = trades.reduce(
    (sum, trade) => sum + trade.buy_price * trade.amount,
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Total Positions</p>

        <h2 className="mt-2 text-3xl font-bold">{totalPositions}</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Open Positions</p>

        <h2 className="mt-2 text-3xl font-bold">{openPositions}</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Portfolio Value</p>

        <h2 className="mt-2 text-3xl font-bold">{portfolioValue.toFixed(2)}</h2>
      </div>
    </div>
  );
}
