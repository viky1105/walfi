import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { getTrade } from "../api/portfolioApi";

export default function PortfolioDetailsPage() {
  const { id } = useParams();

  const [trade, setTrade] = useState(null);

  useEffect(() => {
    async function loadTrade() {
      try {
        const data = await getTrade(id);
        setTrade(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTrade();
  }, [id]);

  if (!trade) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">{trade.token_symbol}</h1>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 space-y-4">
        <div className="flex justify-between">
          <span>Status</span>
          <span>{trade.status}</span>
        </div>

        <div className="flex justify-between">
          <span>Amount</span>
          <span>{trade.amount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Buy Price</span>
          <span>{trade.buy_price}</span>
        </div>

        <div className="flex justify-between">
          <span>Contract</span>
          <span className="truncate max-w-sm">{trade.contract_address}</span>
        </div>

        <div className="flex justify-between">
          <span>Signature</span>
          <span className="truncate max-w-sm">{trade.signature || "N/A"}</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
