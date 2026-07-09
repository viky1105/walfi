import { useEffect, useState } from "react";

import WalletList from "../components/WalletList";
import AddWalletForm from "../components/AddWalletForm";

import { getWallets } from "../api/walletApi";
import { getWalletScores } from "../api/scoreApi";
import ScoreBadge from "../components/ScoreBadge";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([]);
  const [scores, setScores] = useState([]);

  async function loadWallets() {
    const walletData = await getWallets();
    setWallets(walletData);

    const scoreData = await getWalletScores();
    setScores(scoreData);
  }

  useEffect(() => {
    loadWallets();
  }, []);

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Wallet Intelligence
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Tracked Wallets
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Monitor high-performing Solana wallets in real time and receive
            instant copy-trading signals.
          </p>
        </div>
      </div>

      <AddWalletForm onWalletAdded={loadWallets} />

      <WalletList wallets={wallets} scores={scores} />
    </div>
  );
}
