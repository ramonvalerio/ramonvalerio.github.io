create table if not exists public.pending_messages (
  id uuid primary key default gen_random_uuid(),
  token uuid not null unique default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'expired')),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create index if not exists pending_messages_token_idx on public.pending_messages (token);

-- Row Level Security: no public access at all.
-- Edge Functions use the service_role key, which bypasses RLS entirely.
alter table public.pending_messages enable row level security;
