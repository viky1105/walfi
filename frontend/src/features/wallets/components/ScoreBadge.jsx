export default function ScoreBadge({ score }) {
  let bg = "bg-red-600";

  if (score >= 90) {
    bg = "bg-green-600";
  } else if (score >= 75) {
    bg = "bg-yellow-500";
  }

  return (
    <span
      className={`${bg} rounded-full px-3 py-1 text-sm font-bold text-white`}
    >
      ⭐ {score}
    </span>
  );
}
