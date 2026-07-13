-- Settings required for linked Telegram alerts and copy-trade preparation.
-- Safe to run after the Telegram-link migration.
alter table public.copy_settings
  add column if not exists execution_wallet text,
  add column if not exists enabled boolean not null default false,
  add column if not exists fixed_sol numeric not null default 0.1,
  add column if not exists slippage_bps integer not null default 50;

update public.copy_settings
set
  enabled = coalesce(enabled, false),
  fixed_sol = coalesce(fixed_sol, 0.1),
  slippage_bps = coalesce(slippage_bps, 50);

-- The app currently has no deactivate control. Make all existing tracked
-- wallets eligible for the Helius monitoring sync and default future ones on.
alter table public.tracked_wallets
  alter column is_active set default true;

update public.tracked_wallets
set is_active = true
where is_active is distinct from true;
