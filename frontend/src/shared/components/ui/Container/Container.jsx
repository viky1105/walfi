export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-[#070B14] relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-violet-700/20 blur-[140px]" />

      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      {children}
    </div>
  );
}
