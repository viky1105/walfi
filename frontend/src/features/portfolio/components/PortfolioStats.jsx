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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <p className="text-sm text-slate-400">Total positions</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{totalPositions}</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <p className="text-sm text-slate-400">Open positions</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{openPositions}</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <p className="text-sm text-slate-400">Portfolio value</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          {portfolioValue.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
