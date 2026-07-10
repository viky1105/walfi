import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity } from "lucide-react";

import useWalletLogin from "../hooks/useWalletLogin";

import Container from "../../../shared/components/ui/Container/Container";
import Card from "../../../shared/components/ui/Card/Card";

import Logo from "../../../shared/components/ui/Logo/Logo";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import WalletMultiButton from "../../../shared/components/ui/WalletMultiButton/WalletMultiButton";

export default function LoginPage() {
  const { login } = useWalletLogin();
  const wallet = useWallet();

  const hasLoggedIn = useRef(false);
  useEffect(() => {
    async function autoLogin() {
      if (
        wallet.connected &&
        wallet.publicKey &&
        wallet.signMessage &&
        !hasLoggedIn.current
      ) {
        hasLoggedIn.current = true;

        // Give Phantom a moment to finish connecting
        await new Promise((resolve) => setTimeout(resolve, 500));

        await login();
      }
    }

    autoLogin();

    if (!wallet.connected) {
      hasLoggedIn.current = false;
    }
  }, [wallet.connected, wallet.publicKey, wallet.signMessage]);
  return (
    <Container>
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:px-8">
        {/* Background Glow */}

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-700/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full flex-1"
        >
          <Logo />

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-400 sm:text-sm">
              SOLANA COPY TRADING
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Copy the smartest
              <br />
              wallets.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-8">
              Monitor elite Solana traders, receive live trading signals and
              execute copy trades with one click.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
            <Feature icon={<Activity size={22} />} title="Real-Time" />

            <Feature icon={<Zap size={22} />} title="Fast Signals" />

            <Feature icon={<ShieldCheck size={22} />} title="Secure" />
          </div>

          <div className="mt-10 flex flex-col gap-6 sm:mt-16 sm:flex-row sm:gap-10">
            {/* <Stat number="24/7" label="Monitoring" />

            <Stat number="Live" label="Signals" />

            <Stat number="SOL" label="Native" /> */}
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md self-center"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-2xl">
            <Logo />

            <h2 className="mt-8 text-center text-2xl font-black text-white sm:text-3xl">
              Welcome Back
            </h2>

            <p className="mt-4 text-center text-sm text-slate-400 sm:text-base">
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5">
      <div className="mb-3 text-violet-400">{icon}</div>

      <p className="font-semibold text-white">{title}</p>
    </div>
  );
}

// function Stat({ number, label }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-black text-white sm:text-3xl">{number}</h2>

//       <p className="mt-1 text-sm text-slate-400 sm:text-base">{label}</p>
//     </div>
//   );
// }
