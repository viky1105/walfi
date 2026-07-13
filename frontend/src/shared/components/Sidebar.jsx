import {
  LayoutDashboard,
  Wallet,
  Bell,
  Settings,
  Briefcase,
  BarChart3,
  ClipboardList,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsOpen(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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
      icon: BookOpen,
      label: "Docs",
      path: "/dashboard/docs",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed left-3 top-3 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-lg backdrop-blur md:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isMobile ? (isOpen ? 0 : -320) : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-black/90 backdrop-blur-2xl md:sticky md:translate-x-0 md:bg-black/20"
      >
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
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
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
            <p className="text-xs uppercase tracking-widest opacity-70">
              Status
            </p>

            <h2 className="mt-2 font-bold">Live</h2>

            <p className="mt-2 text-sm opacity-80">Connected to Solana</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
