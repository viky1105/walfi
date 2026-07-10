import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-transparent text-white">
      <Sidebar />

      <motion.main
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="flex-1 overflow-y-auto"
      >
        <div className="mx-auto max-w-[1700px] p-4 pt-16 sm:p-6 sm:pt-20 md:p-8 lg:p-10">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
