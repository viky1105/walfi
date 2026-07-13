import { useEffect, useState } from "react";
import {
  getSettings,
  saveSettings,
  generateLinkCode,
} from "../api/settingsApi";

export default function CopySettingsForm() {
  const [settings, setSettings] = useState({
    enabled: false,
    telegram_chat_id: "",
    execution_wallet: "",
    fixed_sol: "0.1",
    slippage_bps: "50",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [linkCodeData, setLinkCodeData] = useState(null);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [linkMessage, setLinkMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        setSettings({
          enabled: data?.enabled ?? false,
          telegram_chat_id: data?.telegram_chat_id ?? "",
          execution_wallet: data?.execution_wallet ?? "",
          fixed_sol: data?.fixed_sol?.toString() ?? "0.1",
          slippage_bps: data?.slippage_bps?.toString() ?? "50",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      await saveSettings({
        enabled: settings.enabled,
        telegram_chat_id: settings.telegram_chat_id,
        execution_wallet: settings.execution_wallet,
        fixed_sol: parseFloat(settings.fixed_sol),
        slippage_bps: parseInt(settings.slippage_bps, 10),
      });
      setMessage("Settings saved successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
          Auto Buy Settings
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">
          Execution & Alerts
        </h2>
        <p className="mt-3 text-slate-400">
          Configure your wallet, Telegram notifications, and auto-buy
          parameters.
        </p>

        <div className="mt-6 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-5 text-sm text-slate-200">
          <p className="font-semibold text-white">Link your Walfi account</p>
          <p className="mt-2 text-slate-400">
            Generate a one-time Walfi link code, then send it to the shared
            Telegram bot. The bot will link your Telegram chat to your Walfi
            account.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-400">
            <li>Generate a link code and copy it to your clipboard.</li>
            <li>Send the code to the shared Walfi Telegram bot.</li>
            <li>
              The bot will confirm your account link and allow wallet creation.
            </li>
          </ol>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={async () => {
                setGeneratingCode(true);
                setLinkMessage("");
                try {
                  const data = await generateLinkCode();
                  setLinkCodeData(data);
                  setLinkMessage(
                    "Link code generated. Send it to the shared bot to link your account.",
                  );
                } catch (err) {
                  console.error(err);
                  setLinkMessage("Unable to generate link code.");
                } finally {
                  setGeneratingCode(false);
                }
              }}
              disabled={generatingCode}
              className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generatingCode ? "Generating..." : "Generate link code"}
            </button>
            {linkCodeData && (
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Your link code</p>
                <p className="my-2 break-all text-violet-200">
                  {linkCodeData.code}
                </p>
                <p className="text-slate-400">
                  Expires at:{" "}
                  {new Date(linkCodeData.expires_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
          {linkMessage && (
            <p className="mt-3 text-sm text-slate-300">{linkMessage}</p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-slate-400">
          Loading settings...
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <span className="text-sm text-slate-400">Enable auto buy</span>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      enabled: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 rounded border-slate-700 bg-slate-900"
                />
                <span className="text-sm text-white">Auto buy enabled</span>
              </div>
            </label>

            <label className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <span className="text-sm text-slate-400">Telegram chat ID</span>
              <input
                value={settings.telegram_chat_id}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    telegram_chat_id: event.target.value,
                  }))
                }
                placeholder="123456789"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <p className="text-sm text-slate-500">
                Enter the chat ID for your Telegram bot or group. Use bot
                getUpdates or a Telegram chat inspector to find this value.
              </p>
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <span className="text-sm text-slate-400">Execution wallet</span>
              <input
                value={settings.execution_wallet}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    execution_wallet: event.target.value,
                  }))
                }
                placeholder="Solana wallet address"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <p className="text-sm text-slate-500">
                Use the Solana wallet address that should fund auto-buy orders.
                This wallet will execute trades when a tracked wallet swap is
                found.
              </p>
            </label>

            <label className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <span className="text-sm text-slate-400">
                Fixed order size (SOL)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={settings.fixed_sol}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    fixed_sol: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <span className="text-sm text-slate-400">Max slippage (bps)</span>
              <input
                type="number"
                min="0"
                max="500"
                value={settings.slippage_bps}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    slippage_bps: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />
            </label>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">How this works</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>• Wallet address is used for execution.</li>
                <li>• Telegram chat ID sends swap alerts.</li>
                <li>• Fixed SOL determines order amount.</li>
                <li>• Slippage is passed to Jupiter quotes.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">{message}</p>
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save settings"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
