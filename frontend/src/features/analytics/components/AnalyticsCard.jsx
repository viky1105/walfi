export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <p className="text-slate-400 text-sm">{title}</p>

      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}
