-- Abuse protection for the contact form (see ADR 0005, amendment 2026-11).
-- Rate limits are counted per sender email, per client IP and globally, so the
-- form cannot be used to flood third-party inboxes or exhaust the Resend quota.

alter table public.pending_messages
  add column if not exists ip text;

-- "confirming" marks a row while the owner notification is being sent, so two
-- simultaneous confirmations cannot both email the owner.
alter table public.pending_messages
  drop constraint if exists pending_messages_status_check;
alter table public.pending_messages
  add constraint pending_messages_status_check
  check (status in ('pending', 'confirming', 'confirmed', 'expired'));

-- server-side size limits, mirroring the Edge Function validation
alter table public.pending_messages
  drop constraint if exists pending_messages_size_check;
alter table public.pending_messages
  add constraint pending_messages_size_check
  check (char_length(name) <= 100 and char_length(email) <= 254 and char_length(message) <= 5000)
  not valid; -- existing rows are not re-checked

create index if not exists pending_messages_email_created_idx
  on public.pending_messages (email, created_at desc);
create index if not exists pending_messages_ip_created_idx
  on public.pending_messages (ip, created_at desc);
create index if not exists pending_messages_created_idx
  on public.pending_messages (created_at desc);
