import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity } from "lucide-react";

import useWalletLogin from "../hooks/useWalletLogin";

import Container from "../../../shared/components/ui/Container/Container";
import Card from "../../../shared/components/ui/Card/Card";
import Button from "../../../shared/components/ui/Button/Button";
import Logo from "../../../shared/components/ui/Logo/Logo";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function LoginPage() {
  const { login } = useWalletLogin();
  const wallet = useWallet();

  const hasLoggedIn = useRef(false);
  useEffect(() => {
    if (wallet.connected && wallet.publicKey && !hasLoggedIn.current) {
      hasLoggedIn.current = true;
      login();
    }

    if (!wallet.connected) {
      hasLoggedIn.current = false;
    }
  }, [wallet.connected, wallet.publicKey]);
  return (
    <Container>
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-20 px-8">
        {/* Background Glow */}

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-700/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex-1"
        >
          <Logo />

          <div className="mt-10">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
              SOLANA COPY TRADING
            </p>

            <h1 className="mt-5 text-6xl font-black leading-tight tracking-tight text-white">
              Copy the smartest
              <br />
              wallets.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
              Monitor elite Solana traders, receive live trading signals and
              execute copy trades with one click.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <Feature icon={<Activity size={22} />} title="Real-Time" />

            <Feature icon={<Zap size={22} />} title="Fast Signals" />

            <Feature icon={<ShieldCheck size={22} />} title="Secure" />
          </div>

          <div className="mt-16 flex gap-10">
            <Stat number="24/7" label="Monitoring" />

            <Stat number="Live" label="Signals" />

            <Stat number="SOL" label="Native" />
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-2xl">
            <Logo />

            <h2 className="mt-8 text-center text-3xl font-black text-white">
              Welcome Back
            </h2>

            <p className="mt-4 text-center text-slate-400">
              Connect your wallet to access your dashboard.
            </p>

            <div className="mt-10">
              <WalletMultiButton />
            </div>

            <p className="mt-8 text-center text-xs text-slate-500">
              Non-custodial • Phantom Wallet • Secure
            </p>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-3 text-violet-400">{icon}</div>

      <p className="font-semibold text-white">{title}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <h2 className="text-3xl font-black text-white">{number}</h2>

      <p className="mt-1 text-slate-400">{label}</p>
    </div>
  );
}
