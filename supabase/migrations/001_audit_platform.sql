-- Website Audit Platform schema (Phase 1)

create extension if not exists "pgcrypto";

create type audit_status as enum ('pending', 'running', 'completed', 'failed');
create type audit_source as enum ('self_serve', 'prospect');
create type growth_opportunity as enum ('high', 'medium', 'low');
create type finding_category as enum (
  'seo',
  'performance',
  'local',
  'conversion',
  'trust',
  'mobile'
);
create type finding_priority as enum ('high', 'medium', 'low');
create type finding_difficulty as enum ('easy', 'medium', 'advanced');
create type lead_status as enum (
  'new',
  'not_contacted',
  'contacted',
  'interested',
  'demo_meeting',
  'quote_sent',
  'won',
  'lost'
);

create table public.audits (
  id uuid primary key default gen_random_uuid(),
  public_slug text not null unique,
  url text not null,
  normalized_url text not null,
  status audit_status not null default 'pending',
  source audit_source not null default 'self_serve',
  business_name text,
  overall_score integer,
  seo_score integer,
  performance_score integer,
  local_score integer,
  lead_gen_score integer,
  mobile_score integer,
  trust_score integer,
  growth_opportunity growth_opportunity,
  high_priority_count integer not null default 0,
  medium_priority_count integer not null default 0,
  low_priority_count integer not null default 0,
  error_message text,
  raw_metrics jsonb not null default '{}'::jsonb,
  crawled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index audits_status_idx on public.audits (status);
create index audits_created_at_idx on public.audits (created_at desc);
create index audits_normalized_url_idx on public.audits (normalized_url);

create table public.audit_pages (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits (id) on delete cascade,
  url text not null,
  status_code integer,
  title text,
  meta_description text,
  is_homepage boolean not null default false,
  signals jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index audit_pages_audit_id_idx on public.audit_pages (audit_id);

create table public.audit_findings (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits (id) on delete cascade,
  code text not null,
  category finding_category not null,
  priority finding_priority not null,
  difficulty finding_difficulty not null,
  title text not null,
  issue text not null,
  why_it_matters text not null,
  recommended_fix text not null,
  is_unlocked_only boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index audit_findings_audit_id_idx on public.audit_findings (audit_id);
create index audit_findings_priority_idx on public.audit_findings (audit_id, priority, sort_order);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits (id) on delete cascade,
  name text not null,
  business_name text not null,
  email text not null,
  phone text,
  website text,
  lead_status lead_status not null default 'new',
  quote_requested boolean not null default false,
  quote_note text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_audit_id_idx on public.leads (audit_id);
create index leads_email_idx on public.leads (email);
create index leads_status_idx on public.leads (lead_status);

-- Server uses service role for all audit writes.
-- Anon may read completed audit metadata by slug (public shareable reports).
-- Finding detail gated in application layer (free top vs unlocked).

alter table public.audits enable row level security;
alter table public.audit_pages enable row level security;
alter table public.audit_findings enable row level security;
alter table public.leads enable row level security;

create policy "Public can read completed audits"
  on public.audits
  for select
  to anon, authenticated
  using (status = 'completed');

create policy "Public can read pages of completed audits"
  on public.audit_pages
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.audits a
      where a.id = audit_pages.audit_id and a.status = 'completed'
    )
  );

create policy "Public can read free findings of completed audits"
  on public.audit_findings
  for select
  to anon, authenticated
  using (
    is_unlocked_only = false
    and exists (
      select 1 from public.audits a
      where a.id = audit_findings.audit_id and a.status = 'completed'
    )
  );

-- No public policies on leads (service role only).
-- Authenticated admin operations go through service role after email allowlist check.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger audits_updated_at
  before update on public.audits
  for each row execute function public.set_updated_at();

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();
