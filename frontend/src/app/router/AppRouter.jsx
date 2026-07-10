import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";
import EarlyAccessPage from "../../features/auth/pages/EarlyAccessPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import WalletDetailsPage from "../../features/wallets/pages/WalletDetailsPage";
import PortfolioPage from "../../features/portfolio/pages/PortfolioPage";
import PortfolioDetailsPage from "../../features/portfolio/pages/PortfolioDetailsPage";
import AnalyticsPage from "../../features/analytics/pages/AnalyticsPage";
import PaperTradesPage from "../../features/paperTrades/pages/PaperTradesPage";
import WalletPage from "../../features/wallets/pages/WalletPage";
import ActivityPage from "../../features/activity/pages/ActivityPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EarlyAccessPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/wallets" element={<WalletPage />} />
        <Route path="/dashboard/wallets/:id" element={<WalletDetailsPage />} />
        <Route path="/dashboard/activity" element={<ActivityPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/portfolio" element={<PortfolioPage />} />
        <Route
          path="/dashboard/portfolio/:id"
          element={<PortfolioDetailsPage />}
        />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/paperTrades" element={<PaperTradesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
