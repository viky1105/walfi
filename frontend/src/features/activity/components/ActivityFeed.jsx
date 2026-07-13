import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ActivityCard from "./ActivityCard";
import { getRecentActivity } from "../api/activityApi";
import { useSocket } from "../../../shared/context/useSocket";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const socket = useSocket();

  async function loadActivity() {
    try {
      const data = await getRecentActivity();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void loadActivity();
    });
  }, []);
  useEffect(() => {
    socket.on("wallet_activity", async () => {
      console.log("📡 Live activity received");

      await loadActivity();
    });

    return () => {
      socket.off("wallet_activity");
    };
  }, [socket]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Live Feed
          </p>

          <h1 className="mt-2 text-4xl font-black">Wallet Activity</h1>

          <p className="mt-2 text-slate-400">
            Real-time trades from every wallet you're tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
        >
          {isExpanded ? "Collapse" : "Expand"}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <>
          {activities.length === 0 ? (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
              <p className="text-slate-400">No activity yet.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          )}
        </>
      )}
    </div>
  );
}
