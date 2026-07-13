import { useState } from "react";
import { Check, Copy } from "lucide-react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import DashboardStats from "../components/DashboardStats";
import WalletsPage from "../../wallets/pages/WalletsPage";
import ActivityFeed from "../../activity/components/ActivityFeed";
import AlertPanel from "../../alerts/components/AlertPanel";

const UTILITY_TOKEN_CA = "FPd1DFZvYAtPFumaWmQpfCKcYRdG4vB463LWnYuBpump";

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);

  async function copyTokenAddress() {
    try {
      await navigator.clipboard.writeText(UTILITY_TOKEN_CA);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    } catch (err) {
      console.error("Unable to copy the utility token address.", err);
    }
  }

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

      <section className="mb-10 rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-600/15 to-cyan-500/10 p-5 shadow-lg shadow-violet-950/20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Walfi utility token
        </p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="break-all font-mono text-sm text-white">
            {UTILITY_TOKEN_CA}
          </p>
          <button
            type="button"
            onClick={copyTokenAddress}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "Copied" : "Copy CA"}
          </button>
        </div>
      </section>

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
