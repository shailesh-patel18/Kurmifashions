import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | KURMI.FASHIONS",
  description: "India DPDP Act aligned privacy policy for KURMI FASHIONS pre-launch demand validation.",
};

export default function PrivacyPage() {
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
          <strong className="font-bold">Legal Disclaimer:</strong> Pre-launch draft aligned with India's Digital Personal Data Protection (DPDP) Act. Review with a certified legal counsel before commercial transaction launch.
        </div>

        <div className="space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            COMPLIANCE VERSION 1.0 (DPDP ACT 2023)
          </span>
          <h1 className="font-fraunces text-scale-40 font-bold text-ink">
            Privacy Policy
          </h1>
          <p className="text-scale-14 text-muted">
            Last Updated: November 2026 • KURMI FASHIONS Demand Validation
          </p>
        </div>

        <div className="space-y-6 text-scale-16 text-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              1. What Data We Collect
            </h2>
            <p>
              When you submit a pre-launch inquiry on KURMI.FASHIONS, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full Name</li>
              <li>WhatsApp phone number (+91 Indian mobile number)</li>
              <li>Email address (optional)</li>
              <li>City / Town</li>
              <li>Pledged garment selections (species design, size, fit, quantity)</li>
              <li>Optional notes/preferences for our illustrators</li>
              <li>Cryptographic hash of your IP address (for anti-spam rate limiting; raw IPs are never stored)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              2. Why We Collect This Data (Specified Purpose)
            </h2>
            <p>
              Your personal data is collected solely for the following specified purpose:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Validating demand threshold (1,000 inquiries) to initiate manufacturing of Drop 01.</li>
              <li>Notifying you via WhatsApp or Email when your requested design reaches manufacturing.</li>
              <li>Reserving your selected size in the initial batch allocation.</li>
            </ul>
            <p>
              We do NOT sell, rent, monetize, or disclose your contact details to third-party ad networks or marketing brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              3. Data Retention Period
            </h2>
            <p>
              In accordance with DPDP principles, unfulfilled or unconverted inquiry records will be automatically erased 12 months after the initial drop launch, unless renewed consent is explicitly given.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-fraunces text-scale-20 font-bold text-ink">
              4. Your Right to Erasure & Grievance Redressal
            </h2>
            <p>
              You have the unconditional right to inspect, correct, or request total deletion of your inquiry data at any time.
            </p>
            <div className="p-4 rounded-card bg-surface border border-line flex items-center gap-3">
              <Mail className="w-5 h-5 text-terracotta" />
              <div>
                <span className="font-semibold text-ink text-scale-14 block">Data Protection Officer & Grievance:</span>
                <a href="mailto:privacy@kurmi.fashions" className="text-terracotta text-scale-14 hover:underline">
                  privacy@kurmi.fashions
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
