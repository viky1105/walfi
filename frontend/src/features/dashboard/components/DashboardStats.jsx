import { Wallet, Activity, Bell, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import StatCard from "./StatCard";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    trackedWallets: 0,
    signalsToday: 0,
    activeAlerts: 0,
    winRate: "--",
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={Wallet}
        color="from-violet-600 to-indigo-600"
        title="Tracked Wallets"
        value={stats.trackedWallets}
      />

      <StatCard
        icon={Activity}
        color="from-cyan-500 to-blue-600"
        title="Signals Today"
        value={stats.signalsToday}
      />

      <StatCard
        icon={Bell}
        color="from-orange-500 to-red-500"
        title="Active Alerts"
        value={stats.activeAlerts}
      />

      <StatCard
        icon={Trophy}
        color="from-emerald-500 to-green-600"
        title="Win Rate"
        value={stats.winRate}
      />
    </div>
  );
}
