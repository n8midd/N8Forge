import type { Metadata } from "next";
import { ServicePageContent } from "../../components/ServicePageContent";
import { SiteShell } from "../../components/SiteShell";
import { CTA, owner } from "../../lib/contact";

export const metadata: Metadata = {
  title: "About Nathan Middleton | N8Forge Nacogdoches",
  description:
    "Meet Nathan Middleton, N8Forge owner and developer in Nacogdoches, TX. 18 years of software experience. You work directly with the person building your site.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <ServicePageContent
        eyebrow="About"
        title={`${owner.name} — Nacogdoches web developer`}
        intro={`I build custom websites for East Texas service businesses. I'm based in ${owner.location}, with ${owner.experience.toLowerCase()}. ${owner.tagline}`}
        sections={[
          {
            heading: "Why local and direct matters",
            body: "When something breaks or you want a change, you know exactly who to call or text. No ticket queue and no handoff between sales and a remote team that never met your business.",
          },
          {
            heading: "How projects run",
            body: `We start with a free website game plan: structure, features, and a flat price. ${CTA.turnaround} After launch, optional Monthly Care keeps hosting and small updates covered if you want ongoing help.`,
          },
          {
            heading: "Service area",
            body: "Primarily East Texas businesses — Nacogdoches and nearby communities — who need more calls, bookings, and customers from their site, not a generic template.",
          },
        ]}
      />
    </SiteShell>
  );
}
