import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import DashboardStats from "../components/DashboardStats";
import WalletsPage from "../../wallets/pages/WalletsPage";
import ActivityFeed from "../../activity/components/ActivityFeed";
import AlertPanel from "../../alerts/components/AlertPanel";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-10">
        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
          Dashboard
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-tight">
          Welcome back.
        </h1>

        <p className="mt-3 text-slate-400 max-w-xl">
          Monitor wallets, execute copy trades, and track your Solana portfolio
          in real time.
        </p>
      </div>

      <DashboardStats />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <WalletsPage />
        </div>

        <div className="space-y-8">
          <ActivityFeed />

          <AlertPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
