import { motion } from "framer-motion";
import { ArrowUpRight, Circle, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScoreBadge from "./ScoreBadge";

export default function WalletCard({ wallet, score }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => navigate(`/dashboard/wallets/${wallet.id}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl">
              <Wallet size={24} className="text-white" />
            </div>

            <div>
              <h3 className="text-xl font-bold">{wallet.nickname}</h3>

              <div className="mt-1 flex items-center gap-2">
                <Circle
                  size={10}
                  className="fill-emerald-400 text-emerald-400"
                />

                <span className="text-sm text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          <ArrowUpRight className="opacity-30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
        </div>

        <div className="mt-6 rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-sm text-slate-300">
            {wallet.wallet_address}
          </p>
        </div>

        {score && (
          <div className="mt-6">
            <ScoreBadge score={score.score} />

            <div className="mt-5 grid grid-cols-3 gap-4">
              <Metric title="Win Rate" value={`${score.winRate}%`} />

              <Metric title="Activity" value={score.activityScore} />

              <Metric title="Consistency" value={score.consistencyScore} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-2xl bg-black/20 p-4 text-center">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black">{value}</h2>
    </div>
  );
}
