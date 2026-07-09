import { motion } from "framer-motion";
import "./AuthHero.css";

export default function AuthHero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 hidden lg:flex flex-col justify-center"
    >
      <h1 className="text-6xl font-bold text-white leading-tight new">
        Wallet
        <br />
        Intelligence
        <br />
        Platform
      </h1>

      <p className="text-slate-400 text-xl mt-8 max-w-lg">
        Track whale wallets, monitor X accounts, receive instant alerts, and
        execute copy trades automatically.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-5 max-w-md">
        <StatCard title="Tracked Wallets" value="10K+" />

        <StatCard title="Signals" value="1.2M" />

        <StatCard title="Transactions" value="$250M" />

        <StatCard title="Latency" value="<2s" />
      </div>
    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <div className="text-3xl font-bold text-white">{value}</div>

      <div className="text-slate-400 mt-2">{title}</div>
    </div>
  );
}
