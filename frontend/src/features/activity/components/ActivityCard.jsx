import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Circle } from "lucide-react";

export default function ActivityCard({ activity }) {
  const isBuy = activity.side === "BUY";

  const date = new Date(activity.created_at);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative mb-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* Glow */}

      <div
        className={`absolute right-0 top-0 h-36 w-36 rounded-full blur-3xl ${
          isBuy ? "bg-emerald-500/10" : "bg-red-500/10"
        }`}
      />

      <div className="relative">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                isBuy ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {isBuy ? (
                <ArrowUpRight className="text-emerald-400" size={24} />
              ) : (
                <ArrowDownRight className="text-red-400" size={24} />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold">{activity.token_symbol}</h2>

              <p className="mt-1 text-sm text-slate-400">
                {activity.tracked_wallets?.nickname}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              isBuy
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {activity.side}
          </span>
        </div>

        {/* Details */}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Info
            label="Amount"
            value={Number(activity.amount).toLocaleString()}
          />

          <Info label="Price" value={`${activity.price} SOL`} />
        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex items-center gap-2">
            <Circle
              size={10}
              className="live-dot fill-emerald-400 text-emerald-400"
            />
            <span className="text-sm text-slate-400">Live</span>
          </div>

          <span className="text-sm text-slate-500">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-black/20 p-4">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <h3 className="mt-2 text-lg font-bold">{value}</h3>
    </div>
  );
}
