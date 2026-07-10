import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import ActivityFeed from "../components/ActivityFeed";

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Live Feed
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Activity</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Review recent wallet activity and stay updated on the latest moves.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}
