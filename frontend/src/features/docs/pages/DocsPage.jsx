import DashboardLayout from "../../../shared/layouts/DashboardLayout";

const quickStartSteps = [
  {
    title: "Connect your wallet",
    description:
      "Sign in with your Solana wallet to unlock live trading insights and manage your portfolio.",
  },
  {
    title: "Add a wallet to follow",
    description:
      "Track experienced traders or high-performing wallets from the wallets section and monitor their activity.",
  },
  {
    title: "Review signals",
    description:
      "Use the activity feed, analytics, and portfolio views to understand current momentum before copying a trade.",
  },
  {
    title: "Start small",
    description:
      "Use paper trades first to test strategies safely, then move into live execution when you are comfortable.",
  },
];

const featureHighlights = [
  {
    title: "Copy trading",
    description:
      "Mirror wallet activity and follow proven Solana traders in real time with a simple, streamlined workflow.",
  },
  {
    title: "Portfolio tracking",
    description:
      "Keep an eye on holdings, performance, and recent moves without switching between multiple tools.",
  },
  {
    title: "Alerts and analytics",
    description:
      "Receive actionable alerts and analyze trade patterns to make smarter decisions quickly.",
  },
];

export default function DocsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Documentation
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
            Welcome to Walfi
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Walfi is a Solana-focused copy trading platform that helps you
            discover, follow, and learn from high-performing wallets while
            keeping your portfolio organized in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-slate-900 to-slate-950 p-8">
            <h2 className="text-2xl font-semibold text-white">
              What Walfi does
            </h2>
            <p className="mt-3 text-slate-300">
              The product combines wallet tracking, copy trading signals,
              portfolio monitoring, and analytics so you can move from discovery
              to execution with fewer steps.
            </p>
            <p className="mt-4 text-slate-300">
              Whether you are a beginner learning how Solana traders behave or
              an experienced user looking for faster decision-making, Walfi
              gives you a structured view of the market in real time.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Quick start</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              {quickStartSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-semibold text-violet-300">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-white">{step.title}</p>
                    <p className="mt-1 text-slate-400">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8">
          <h2 className="text-2xl font-semibold text-white">
            How to use the dashboard
          </h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-white">Monitor</h3>
              <p className="mt-2 text-slate-400">
                Use the dashboard to view your tracked wallets, recent trading
                activity, and account-level summaries at a glance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Analyze</h3>
              <p className="mt-2 text-slate-400">
                Review analytics, portfolio performance, and paper trade
                outcomes to compare strategies before deploying capital.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Act</h3>
              <p className="mt-2 text-slate-400">
                Configure alerts, follow promising wallets, and use the
                platform's execution tools when you are ready to trade.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Stay safe</h3>
              <p className="mt-2 text-slate-400">
                Start with small positions, review signals carefully, and use
                paper trading to build confidence before scaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
