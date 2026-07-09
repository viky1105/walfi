import { useState } from "react";
import { addWallet } from "../api/walletApi";

export default function AddWalletForm({ onWalletAdded }) {
  const [nickname, setNickname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await addWallet({
        nickname,
        wallet_address: walletAddress,
      });

      setNickname("");
      setWalletAddress("");

      onWalletAdded();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        className="w-full rounded-lg p-3 bg-slate-800 text-white"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <input
        className="w-full rounded-lg p-3 bg-slate-800 text-white"
        placeholder="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-violet-600 p-3 font-semibold"
      >
        {loading ? "Tracking..." : "Track Wallet"}
      </button>
    </form>
  );
}
