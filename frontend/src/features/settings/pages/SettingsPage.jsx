import DashboardLayout from "../../../shared/layouts/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Preferences
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Settings</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Manage your trading preferences and account configuration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
            <p className="mt-2 text-sm text-slate-400">
              Configure alerts for wallet activity and copied trades.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="mt-2 text-sm text-slate-400">
              Review wallet permissions and connected accounts.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
