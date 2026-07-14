-- Associates each swap alert with the tracked wallet that produced it.
alter table public.alerts
  add column if not exists tracked_wallet_id uuid;

create index if not exists alerts_tracked_wallet_id_idx
  on public.alerts (tracked_wallet_id);
