export default function ExecuteTradeModal({ trade, open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[450px] rounded-2xl bg-slate-900 border border-slate-700 p-6">
        <h2 className="text-2xl font-bold">Confirm Copy Trade</h2>

        <div className="mt-6 space-y-3">
          <p>
            Token:
            <strong className="ml-2">{trade.token_symbol}</strong>
          </p>

          <p>
            Side:
            <strong className="ml-2">{trade.side}</strong>
          </p>

          <p>
            Amount:
            <strong className="ml-2">{trade.amount}</strong>
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-600 py-3"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-violet-600 py-3 hover:bg-violet-700"
          >
            Sign & Execute
          </button>
        </div>
      </div>
    </div>
  );
}
