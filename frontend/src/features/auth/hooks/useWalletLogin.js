import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useNavigate } from "react-router-dom";

import { getChallenge, verifySignature } from "../api/authApi";

export default function useWalletLogin() {
  const wallet = useWallet();
  const navigate = useNavigate();
  async function login() {
    if (!wallet.connected || !wallet.publicKey) {
      console.log("Wallet not connected");
      console.log("Login button clicked");
      return;
    }
    const address = wallet.publicKey.toBase58();

    console.log("Wallet:", address);

    const challenge = await getChallenge(address);
    const encodedMessage = new TextEncoder().encode(challenge.message);

    try {
      const signature = await wallet.signMessage(encodedMessage);

      const result = await verifySignature({
        wallet: address,
        message: challenge.message,
        signature: bs58.encode(signature),
      });

      localStorage.setItem("walfi_token", result.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign message failed", err);
    }
  }

  return {
    login,
  };
}
