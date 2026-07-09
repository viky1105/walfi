import { useEffect, useState } from "react";
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
        setTrades(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadPortfolio();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      <PortfolioStats trades={trades} />

      {trades.length === 0 ? (
        <p>No positions yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {trades.map((trade) => (
            <PortfolioCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
