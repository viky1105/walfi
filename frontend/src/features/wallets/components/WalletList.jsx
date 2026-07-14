import WalletCard from "./WalletCard";

export default function WalletList({ wallets, scores, onWalletDeleted }) {
  if (!wallets.length) {
    return <div className="text-slate-400">No tracked wallets yet.</div>;
  }

  return (
    <div className="grid gap-4">
      {wallets.map((wallet) => {
        const score = scores.find((s) => s.id === wallet.id);

        return (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            score={score}
            onWalletDeleted={onWalletDeleted}
          />
        );
      })}
    </div>
  );
}
