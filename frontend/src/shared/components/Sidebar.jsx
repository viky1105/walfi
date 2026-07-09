import {
  LayoutDashboard,
  Wallet,
  Bell,
  Settings,
  Briefcase,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Wallet,
      label: "Wallets",
      path: "/dashboard/wallets",
    },
    {
      icon: Bell,
      label: "Activity",
      path: "/dashboard/activity",
    },
    {
      icon: Briefcase,
      label: "Portfolio",
      path: "/dashboard/portfolio",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/dashboard/analytics",
    },
    {
      icon: ClipboardList,
      label: "Paper Trades",
      path: "/dashboard/paperTrades",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-black/20 backdrop-blur-2xl">
      <div className="border-b border-white/10 px-8 py-8">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-white">Wal</span>

          <span className="text-violet-500">fi</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">Solana Copy Trading</p>
      </div>

      <nav className="flex-1 space-y-2 p-6">
        {items.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <motion.button
              whileHover={{
                x: 5,
              }}
              whileTap={{
                scale: 0.98,
              }}
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon size={20} />

              {item.label}
            </motion.button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-6">
        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5">
          <p className="text-xs uppercase tracking-widest opacity-70">Status</p>

          <h2 className="mt-2 font-bold">Live</h2>

          <p className="mt-2 text-sm opacity-80">Connected to Solana</p>
        </div>
      </div>
    </aside>
  );
}
