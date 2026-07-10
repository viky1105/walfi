import { WalletMultiButton as SolanaWalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletMultiButton({
  className = "",
  children,
  ...props
}) {
  return (
    <div className={`flex justify-center ${className}`.trim()}>
      <SolanaWalletMultiButton {...props}>{children}</SolanaWalletMultiButton>
    </div>
  );
}
