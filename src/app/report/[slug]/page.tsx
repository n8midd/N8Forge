import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuditShell } from "../../../components/audit/AuditShell";
import { FindingCard } from "../../../components/audit/FindingCard";
import { FixThisForMeGlobal } from "../../../components/audit/FixThisForMeGlobal";
import { LeadCaptureForm } from "../../../components/audit/LeadCaptureForm";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "../../../lib/supabase/server";
import type { AuditFindingRow, AuditRow } from "../../../lib/supabase/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Website Report — ${slug}`,
    robots: { index: false, follow: false },
  };
}

function ScorePill({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="border border-steel-light/40 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-steel">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-charcoal">
        {value == null ? "—" : value}
        <span className="text-base font-medium text-steel"> / 100</span>
      </p>
    </div>
  );
}

function growthLabel(g: AuditRow["growth_opportunity"]) {
  if (g === "high") return "HIGH";
  if (g === "medium") return "MEDIUM";
  if (g === "low") return "LOW";
  return "—";
}

export default async function ReportPage({ params }: Props) {
  if (!isSupabaseConfigured()) {
    return (
      <AuditShell>
        <div className="mx-auto max-w-lg px-6 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Service unavailable</h1>
          <p className="mt-3 text-neutral">
            The audit database is not configured yet.
          </p>
        </div>
      </AuditShell>
    );
  }

  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: audit } = await supabase
    .from("audits")
    .select("*")
    .eq("public_slug", slug)
    .maybeSingle();

  if (!audit || audit.status !== "completed") {
    notFound();
  }

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("audit_id", audit.id)
    .limit(1)
    .maybeSingle();

  const unlocked = Boolean(lead) || audit.source === "prospect";

  let findingsQuery = supabase
    .from("audit_findings")
    .select("*")
    .eq("audit_id", audit.id)
    .order("sort_order", { ascending: true });

  if (!unlocked) {
    findingsQuery = findingsQuery.eq("is_unlocked_only", false);
  }

  const { data: findings } = await findingsQuery;

  const freeFindings = (findings || []) as AuditFindingRow[];
  const lockedCount = unlocked
    ? 0
    : Math.max(
        0,
        audit.high_priority_count +
          audit.medium_priority_count +
          audit.low_priority_count -
          freeFindings.length,
      );

  return (
    <AuditShell>
      <div className="border-b border-steel-light/30 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <p className="text-sm font-medium text-steel">
            Website audit ·{" "}
            <a
              href={audit.normalized_url}
              className="text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {audit.normalized_url.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-charcoal md:text-4xl">
            Your Website Score
          </h1>
          <p className="mt-4 font-display text-6xl font-bold text-primary md:text-7xl">
            {audit.overall_score ?? "—"}
            <span className="text-3xl font-semibold text-steel"> / 100</span>
          </p>
          {audit.business_name ? (
            <p className="mt-2 text-neutral">{audit.business_name}</p>
          ) : null}

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ScorePill label="SEO" value={audit.seo_score} />
            <ScorePill label="Performance" value={audit.performance_score} />
            <ScorePill label="Local Visibility" value={audit.local_score} />
            <ScorePill label="Lead Generation" value={audit.lead_gen_score} />
            <ScorePill label="Mobile Experience" value={audit.mobile_score} />
            <ScorePill label="Trust" value={audit.trust_score} />
          </div>

          <div className="mt-10 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-steel">
              Growth opportunity
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-ember">
              {growthLabel(audit.growth_opportunity)}
            </p>
            <p className="mt-3 text-neutral">
              We found{" "}
              <strong className="text-charcoal">
                {audit.high_priority_count} high-priority
              </strong>
              , {audit.medium_priority_count} medium-priority, and{" "}
              {audit.low_priority_count} smaller improvements.
            </p>
            <div className="mt-6">
              <FixThisForMeGlobal auditId={audit.id} hasLead={unlocked} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {unlocked ? "Full findings" : "Top problems"}
        </h2>
        <p className="mt-2 max-w-2xl text-neutral">
          {unlocked
            ? "Prioritized issues with plain-English recommendations."
            : "The most important issues holding back leads and search visibility."}
        </p>

        <div className="mt-6">
          {freeFindings.length === 0 ? (
            <p className="text-neutral">
              No major issues detected with current checks — still room to grow
              with content and conversion testing.
            </p>
          ) : (
            freeFindings.map((f) => (
              <FindingCard
                key={f.id}
                finding={f}
                auditId={audit.id}
                showFixCta={unlocked}
              />
            ))
          )}
        </div>

        {!unlocked ? (
          <section className="mt-14 border border-steel-light/40 bg-white p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-charcoal md:text-2xl">
              See everything you should fix
            </h2>
            <p className="mt-2 text-neutral">
              We found{" "}
              <strong className="text-charcoal">
                {lockedCount > 0 ? lockedCount : "additional"}
              </strong>{" "}
              more opportunities beyond the free list. Enter your details to
              unlock the complete report — free, explained in plain English.
            </p>
            <LeadCaptureForm
              auditId={audit.id}
              defaultWebsite={audit.normalized_url}
            />
          </section>
        ) : (
          <section className="mt-14 border border-primary/15 bg-primary/5 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-charcoal">
              Want this handled for you?
            </h2>
            <p className="mt-2 max-w-xl text-neutral">
              Packages typically start around SEO, local, or conversion work
              ($250–$500) up to full site optimization. Request a custom quote
              and I&apos;ll reply with a clear plan.
            </p>
            <div className="mt-5">
              <FixThisForMeGlobal auditId={audit.id} hasLead />
            </div>
          </section>
        )}

        <p className="mt-12 text-sm text-steel">
          <Link href="/audit" className="text-primary hover:underline">
            Run another audit
          </Link>
        </p>
      </div>
    </AuditShell>
  );
}
