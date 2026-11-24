import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Pre-Launch Interest | KURMI.FASHIONS",
  description: "Terms and conditions for pre-launch inquiries and demand validation on KURMI.FASHIONS.",
};

export default function TermsPage() {
  return (
    <div className="w-full py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-scale-14 font-semibold text-muted hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to homepage</span>
        </Link>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-scale-12 text-amber-800 dark:text-amber-300">
          <strong className="font-bold">Notice:</strong> Pre-launch inquiry terms. Flagged for review with certified legal counsel.
        </div>

        <div className="space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            DEMAND-VALIDATION AGREEMENT
          </span>
          <h1 className="font-fraunces text-scale-40 font-bold text-ink">
            Terms of Pre-Launch Interest
          </h1>
          <p className="text-scale-14 text-muted">
            Effective Date: November 2026 • Zero Financial Liability
          </p>
        </div>

        <div className="space-y-6 text-scale-16 text-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              1. Non-Binding Nature of Inquiries
            </h2>
            <p>
              KURMI.FASHIONS is currently operating strictly as a demand-validation pre-launch platform. Registering an inquiry does not constitute a sale, purchase contract, or financial debt. No payment, credit card details, or delivery commitments are accepted on this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              2. Launch Milestone & Manufacturing Trigger
            </h2>
            <p>
              Production of Drop 01 garments commences only upon logging 1,000 genuine inquiries. Reaching this milestone does not obligate any supporter to purchase. Once manufacturing is unlocked, supporters receive an invitation to inspect finalized specs and choose whether to proceed with a purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              3. Intellectual Property
            </h2>
            <p>
              All wildlife illustrations, brand emblems, botanical artwork, and copy on KURMI.FASHIONS are the proprietary intellectual property of KURMI FASHIONS. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
