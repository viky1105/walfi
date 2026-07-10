import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EarlyAccessPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!walletAddress.trim()) return;
    setShowModal(true);
    setWalletAddress("");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.2),_transparent_35%),linear-gradient(135deg,_#030712,_#111827)] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10 lg:p-14"
        >
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
              Early Access
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Walfi
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Join the waitlist for exclusive access to Solana copy trading.
              Enter your wallet address and we’ll register you for early access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl">
            <label htmlFor="walletAddress" className="mb-2 block text-sm font-medium text-slate-300">
              Wallet Address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="walletAddress"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your Solana wallet address"
                className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-violet-500"
              />
              <button
                type="submit"
                className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white">Wallet Registered</h2>
              <p className="mt-3 text-slate-400">
                Your wallet has been registered for early access.
              </p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mt-6 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
