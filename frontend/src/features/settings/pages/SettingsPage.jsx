import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import CopySettingsForm from "../components/CopySettingsForm";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Preferences
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Settings</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Configure Telegram alerts, execution wallet funding, and auto-buy
            parameters for your tracked wallet signals.
          </p>
        </div>

        <CopySettingsForm />
      </div>
    </DashboardLayout>
  );
}
