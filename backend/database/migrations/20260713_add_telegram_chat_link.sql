-- Stores the private Telegram chat linked to a Walfi account.
-- Safe to run against existing installations.
alter table public.copy_settings
  add column if not exists telegram_chat_id text;

-- A private Telegram chat can only belong to one Walfi account.
create unique index if not exists copy_settings_telegram_chat_id_unique
  on public.copy_settings (telegram_chat_id)
  where telegram_chat_id is not null;
