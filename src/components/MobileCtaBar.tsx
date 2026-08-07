import { contact, CTA } from "../lib/contact";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-steel-light/50 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
        <a
          href={contact.phoneHref}
          className="flex-1 bg-charcoal py-2.5 text-center text-xs font-semibold text-white"
        >
          Call
        </a>
        <a
          href={contact.smsHref}
          className="flex-1 border border-charcoal py-2.5 text-center text-xs font-semibold text-charcoal"
        >
          Text
        </a>
        <a
          href={CTA.href}
          className="flex-[1.4] bg-ember py-2.5 text-center text-xs font-semibold text-white"
        >
          Free Game Plan
        </a>
      </div>
    </div>
  );
}
