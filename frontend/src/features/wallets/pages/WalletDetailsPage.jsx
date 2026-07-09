import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { getWallet } from "../api/walletApi";

export default function WalletDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    async function loadWallet() {
      try {
        const data = await getWallet(id);
        setWallet(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadWallet();
  }, [id]);

  if (!wallet) {
    return (
      <DashboardLayout>
        <p>Loading wallet...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>
      <h1 className="text-4xl font-bold mb-4">{wallet.nickname}</h1>

      <p className="text-slate-400 break-all">{wallet.wallet_address}</p>
    </DashboardLayout>
  );
}
