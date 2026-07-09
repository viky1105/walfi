import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { getRecentActivity } from "../api/activityApi";
import { useSocket } from "../../../shared/context/SocketContext";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
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
    loadActivity();
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
            Live Feed
          </p>

          <h1 className="mt-2 text-4xl font-black">Wallet Activity</h1>

          <p className="mt-2 text-slate-400">
            Real-time trades from every wallet you're tracking.
          </p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-xl bg-slate-900 border border-slate-700 p-6">
          <p className="text-slate-400">No activity yet.</p>
        </div>
      ) : (
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      )}
    </div>
  );
}
