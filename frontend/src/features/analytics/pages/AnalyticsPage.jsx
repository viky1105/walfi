import { useEffect, useState } from "react";

import DashboardLayout from "../../../shared/layouts/DashboardLayout";

import { getAnalytics } from "../api/analyticsApi";

import AnalyticsCard from "../components/AnalyticsCard";

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getAnalytics();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadAnalytics();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <p>Loading analytics...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard title="Total Trades" value={stats.totalTrades} />

        <AnalyticsCard title="Open Positions" value={stats.openPositions} />

        <AnalyticsCard title="Closed Positions" value={stats.closedPositions} />

        <AnalyticsCard
          title="Total Volume"
          value={stats.totalVolume.toFixed(2)}
        />
      </div>
    </DashboardLayout>
  );
}
