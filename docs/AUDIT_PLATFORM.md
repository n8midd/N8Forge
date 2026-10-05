# Website Audit Platform (Phase 1)

## Setup

1. Create a Supabase project and run the SQL in [`supabase/migrations/001_audit_platform.sql`](supabase/migrations/001_audit_platform.sql) (SQL editor or CLI).
2. In Supabase Auth, create an admin user (email/password).
3. Copy [`.env.example`](.env.example) to `.env.local` and fill:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server only) |
| `ADMIN_EMAILS` | Comma-separated emails allowed at `/admin` |
| `PAGESPEED_API_KEY` | Google PageSpeed Insights (recommended) |
| `OPENAI_API_KEY` | Plain-English findings (optional templates work without) |
| `RESEND_*` | Lead / quote notification emails |

4. `npm run dev` → open `/audit`

## Routes

- `/audit` — public free audit
- `/audit/running/[id]` — progress while pipeline runs
- `/report/[slug]` — scores + top 5 free; full report after lead capture
- `/admin` — sales CRM (Supabase Auth + `ADMIN_EMAILS`)
- `/admin/prospect` — outbound shareable full reports
