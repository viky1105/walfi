import { useEffect, useState } from "react";
import { getAlerts } from "../api/alertApi";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  async function loadAlerts() {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void loadAlerts();
    });
  }, []);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-4">Alerts</h2>

      {alerts.length === 0 ? (
        <p className="text-slate-400">No alerts yet.</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="mb-3 rounded-lg border border-slate-800 p-4"
          >
            <h3 className="font-semibold">{alert.title}</h3>

            <p className="text-sm text-slate-400">{alert.message}</p>

            {!alert.is_read && (
              <span className="mt-2 inline-block rounded bg-green-600 px-2 py-1 text-xs">
                New
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
