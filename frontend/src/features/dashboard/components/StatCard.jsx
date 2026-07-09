import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color }) {
  const numeric = typeof value === "number";

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* Glow */}

      <div
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl transition duration-500 group-hover:opacity-40`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            {numeric ? value : value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
        >
          {Icon && <Icon size={24} className="text-white" />}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <span className="text-sm text-slate-500">Live Data</span>

        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          ● Live
        </span>
      </div>
    </motion.div>
  );
}
