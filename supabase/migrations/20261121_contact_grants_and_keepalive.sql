-- The Edge Functions use the service_role key, but this project does not grant
-- table privileges to it by default, so every insert/select failed with
-- "permission denied for table pending_messages" (42501). Only service_role gets
-- access; anon/authenticated keep none (RLS stays enabled as a second guard).
grant select, insert, update, delete on table public.pending_messages to service_role;

-- Lightweight endpoint for the scheduled keep-alive workflow
-- (.github/workflows/supabase-keepalive.yml): a real Postgres call that exposes
-- no data, so the free project is not paused for inactivity.
create or replace function public.keepalive()
returns boolean
language sql
stable
as $$ select true $$;

revoke all on function public.keepalive() from public;
grant execute on function public.keepalive() to anon;
