"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Check, Share2, Copy, AlertTriangle, ArrowRight, ArrowLeft, ShieldCheck, Award, Calendar, Gift, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useKurmi } from "@/lib/context";
import { InquiryFormSchema } from "@/lib/validation";
import { InquiryFormValues, Product } from "@/lib/types";
import { InputField, TextareaField } from "./FormField";
import { Button } from "./Button";
import { COPY } from "@/data/copy";
import productsData from "@/data/products.json";

export function InquiryModal() {
  const {
    isInquiryModalOpen,
    setIsInquiryModalOpen,
    interestList,
    clearInterestList,
    refreshStats,
    supporterNumber,
    setSupporterNumber,
  } = useKurmi();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [submittedName, setSubmittedName] = useState<string>("");
  const [sanctuaryVote, setSanctuaryVote] = useState<string>("gir-lion");
  const [preferredLength, setPreferredLength] = useState<"regular" | "tall">("regular");

  const handleCopyLink = async () => {
    try {
      const inviteUrl = `${window.location.origin}?ref=${referralCode}`;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = inviteUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      setCopiedLink(true);
    }
  };

  const products = productsData as Product[];
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquiryFormSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      city: "",
      preferredContact: "whatsapp",
      message: "",
      consent: true,
      consentVersion: COPY.inquiryModal.consentVersion,
      items: interestList,
      honeypot: "",
    },
  });

  // Re-sync items when interest list changes
  useEffect(() => {
    reset((prev) => ({
      ...prev,
      items: interestList,
    }));
  }, [interestList, reset]);

  // Escape key handler & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isInquiryModalOpen) {
        setIsInquiryModalOpen(false);
      }
    };
    if (isInquiryModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInquiryModalOpen, setIsInquiryModalOpen]);

  const handleNext = async () => {
    const valid = await trigger(["name", "whatsapp", "city"]);
    if (valid) {
      setStep(2);
      setServerError(null);
    }
  };

  const onSubmit = async (data: InquiryFormValues) => {
    if (isSubmitting) return; // Prevent double submit
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry. Please try again.");
      }

      // Success
      setSubmittedName(data.name);
      setSupporterNumber(json.supporterNumber || Math.floor(Math.random() * 50) + 1);
      setReferralCode(json.referralCode || `KURMI-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
      setIsSuccess(true);
      clearInterestList();
      refreshStats();

      // Celebratory leaf confetti
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#1F3D2B", "#D2693A", "#EAE2D0", "#C99757"],
        });
      } catch {}
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//KURMI FASHIONS//Drop 01 Milestone Forecast//EN",
      "BEGIN:VEVENT",
      "SUMMARY:🌿 KURMI.FASHIONS Drop 01 Milestone Launch",
      "DESCRIPTION:Manufacturing milestone forecast for KURMI FASHIONS Drop 01 wildlife apparel collection. Check your reserved size preference at https://kurmi.fashions",
      "LOCATION:https://kurmi.fashions",
      "STATUS:CONFIRMED",
      "TRANSP:TRANSPARENT",
      `DTSTART:${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTEND:${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 3600000).toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "kurmi-drop-01-milestone.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    const inviteUrl = `${window.location.origin}?ref=${referralCode}`;
    const text = encodeURIComponent(
      `I just pledged interest as Supporter #${supporterNumber} for KURMI.FASHIONS first wildlife apparel drop! ₹0 cost to reserve. Check out the species designs: ${inviteUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (!isInquiryModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsInquiryModalOpen(false)}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface dark:bg-surface rounded-card border border-line shadow-2xl p-6 md:p-8 z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsInquiryModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
          aria-label="Close inquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Step Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-scale-12 font-bold ${
                  step === 1 ? "bg-forest text-surface" : "bg-emerald-600 text-surface"
                }`}
              >
                1
              </span>
              <div
                className={`h-1 flex-1 rounded-full ${
                  step === 2 ? "bg-forest" : "bg-line"
                } transition-colors`}
              />
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-scale-12 font-bold ${
                  step === 2 ? "bg-forest text-surface" : "bg-sand text-muted"
                }`}
              >
                2
              </span>
            </div>

            {/* Modal Heading */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
                FIELD INQUIRY • PRE-LAUNCH (₹0)
              </span>
              <h2
                id="inquiry-modal-title"
                className="font-fraunces text-scale-20 md:text-scale-28 font-bold text-ink mt-1"
              >
                {step === 1
                  ? COPY.inquiryModal.step1Title
                  : COPY.inquiryModal.step2Title}
              </h2>
              <p className="text-scale-14 text-muted mt-1">
                {step === 1
                  ? COPY.inquiryModal.step1Subtitle
                  : COPY.inquiryModal.step2Subtitle}
              </p>
            </div>

            {/* Server Error Callout */}
            {serverError && (
              <div
                role="alert"
                className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-scale-12 flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field (hidden from humans) */}
              <input
                type="text"
                {...register("honeypot")}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {step === 1 ? (
                /* Step 1: Supporter Contact Information */
                <div className="space-y-4">
                  <InputField
                    label={COPY.inquiryModal.nameLabel}
                    placeholder={COPY.inquiryModal.namePlaceholder}
                    required
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <div className="space-y-1">
                    <label className="text-scale-14 font-medium text-ink">
                      {COPY.inquiryModal.whatsappLabel}{" "}
                      <span className="text-terracotta">*</span>
                    </label>
                    <div className="flex rounded-input border border-line bg-surface overflow-hidden focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta">
                      <span className="px-3 py-2.5 bg-sand/60 text-scale-14 font-medium text-ink border-r border-line select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder={COPY.inquiryModal.whatsappPlaceholder}
                        className="flex-1 px-3 py-2.5 bg-transparent text-scale-14 text-ink placeholder:text-muted/60 focus:outline-none"
                        {...register("whatsapp")}
                      />
                    </div>
                    {errors.whatsapp?.message && (
                      <span className="text-scale-12 text-red-600 font-medium">
                        {errors.whatsapp.message}
                      </span>
                    )}
                  </div>

                  <InputField
                    label={COPY.inquiryModal.emailLabel}
                    type="email"
                    placeholder={COPY.inquiryModal.emailPlaceholder}
                    {...register("email")}
                    error={errors.email?.message}
                    hint="Optional"
                  />

                  <InputField
                    label={COPY.inquiryModal.cityLabel}
                    placeholder={COPY.inquiryModal.cityPlaceholder}
                    required
                    {...register("city")}
                    error={errors.city?.message}
                  />

                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handleNext}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      {COPY.inquiryModal.nextButton}
                    </Button>
                  </div>
                </div>
              ) : (
                /* Step 2: Picks Review, Preferences & Consent */
                <div className="space-y-4">
                  {/* Selected Species Summary */}
                  <div className="p-3.5 bg-sand/40 dark:bg-sand/20 rounded-xl border border-line space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block">
                      Registered Selections:
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {interestList.map((item) => {
                        const prod = products.find((p) => p.id === item.productId);
                        return (
                          <div
                            key={`${item.productId}-${item.size}`}
                            className="flex justify-between items-center text-scale-12"
                          >
                            <span className="font-medium text-ink truncate">
                              {prod?.name || item.productId} (Size {item.size})
                            </span>
                            <span className="text-muted font-semibold">Qty: {item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Garment Fit Length Preference */}
                  <div className="space-y-1.5">
                    <label className="text-scale-14 font-medium text-ink flex items-center justify-between">
                      <span>Garment Cut Preference</span>
                      <span className="text-[11px] text-muted font-normal">Customizes your reserved silhouette</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPreferredLength("regular")}
                        className={`p-3 rounded-input border text-left transition-all ${
                          preferredLength === "regular"
                            ? "border-forest bg-forest/5 dark:bg-emerald-950/20 ring-1 ring-forest"
                            : "border-line bg-surface hover:border-forest/40"
                        }`}
                      >
                        <span className="block text-scale-14 font-semibold text-ink">Regular Torso</span>
                        <span className="block text-[11px] text-muted">Standard naturalist drape</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredLength("tall")}
                        className={`p-3 rounded-input border text-left transition-all ${
                          preferredLength === "tall"
                            ? "border-forest bg-forest/5 dark:bg-emerald-950/20 ring-1 ring-forest"
                            : "border-line bg-surface hover:border-forest/40"
                        }`}
                      >
                        <span className="block text-scale-14 font-semibold text-ink">Longline / Tall (+2.5")</span>
                        <span className="block text-[11px] text-muted">Extra back coverage</span>
                      </button>
                    </div>
                  </div>

                  {/* 1% Sanctuary Conservation Voting */}
                  <div className="space-y-1.5">
                    <label className="text-scale-14 font-medium text-ink flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-terracotta" />
                      <span>Vote 1% Conservation Sanctuary Allocation</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "gir-lion", name: "Gir Forest Asiatic Lion Corridor", loc: "Saurashtra, Gujarat" },
                        { id: "hornbill", name: "Great Hornbill Canopy Haven", loc: "Western Ghats, Kerala" },
                        { id: "snow-leopard", name: "Himalayan Snow Leopard Reserve", loc: "Spiti Valley, HP" },
                      ].map((sanctuary) => (
                        <label
                          key={sanctuary.id}
                          className={`flex items-center justify-between p-2.5 rounded-input border cursor-pointer transition-colors ${
                            sanctuaryVote === sanctuary.id
                              ? "border-forest bg-forest/5 dark:bg-emerald-950/20"
                              : "border-line bg-surface hover:border-forest/30"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="sanctuaryVote"
                              value={sanctuary.id}
                              checked={sanctuaryVote === sanctuary.id}
                              onChange={() => setSanctuaryVote(sanctuary.id)}
                              className="accent-terracotta"
                            />
                            <div>
                              <span className="text-scale-12 font-medium text-ink block">{sanctuary.name}</span>
                              <span className="text-[10px] text-muted block">{sanctuary.loc}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold uppercase text-terracotta px-2 py-0.5 rounded-full bg-sand/60">
                            1% Drop Fund
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-1.5">
                    <label className="text-scale-14 font-medium text-ink">
                      {COPY.inquiryModal.contactPrefLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 p-3 rounded-input border border-line bg-surface cursor-pointer hover:border-forest/50">
                        <input
                          type="radio"
                          value="whatsapp"
                          {...register("preferredContact")}
                          className="accent-terracotta"
                        />
                        <span className="text-scale-14 font-medium text-ink">WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 rounded-input border border-line bg-surface cursor-pointer hover:border-forest/50">
                        <input
                          type="radio"
                          value="email"
                          {...register("preferredContact")}
                          className="accent-terracotta"
                        />
                        <span className="text-scale-14 font-medium text-ink">Email</span>
                      </label>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <TextareaField
                    label={COPY.inquiryModal.messageLabel}
                    placeholder={COPY.inquiryModal.messagePlaceholder}
                    {...register("message")}
                    error={errors.message?.message}
                  />

                  {/* Required DPDP Act Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="mt-1 h-4 w-4 rounded border-line text-forest focus:ring-terracotta accent-forest"
                      />
                      <span className="text-scale-12 text-muted leading-relaxed">
                        {COPY.inquiryModal.consentText}
                      </span>
                    </label>
                    {errors.consent?.message && (
                      <p className="text-scale-12 text-red-600 mt-1 font-medium">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {/* Actions: Back & Submit */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(1)}
                      icon={<ArrowLeft className="w-4 h-4" />}
                    >
                      {COPY.inquiryModal.backButton}
                    </Button>
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting
                        ? COPY.inquiryModal.submittingButton
                        : COPY.inquiryModal.submitButton}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Success Screen: Digital Supporter Field Pass & Referral */
          <div className="text-center py-2 space-y-6 animate-in fade-in duration-300">
            {/* Visual Digital Supporter Field Pass Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sand/70 via-sand/40 to-surface border-2 border-dashed border-terracotta/70 text-left relative overflow-hidden shadow-lg">
              {/* Top Bar with Seal */}
              <div className="flex justify-between items-center pb-3 border-b border-line/80 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-line">
                    <img src="/images/kurmi-logo.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-fraunces font-bold text-scale-14 text-forest dark:text-emerald-400 block leading-tight">
                      KURMI FASHIONS
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-muted block">
                      OFFICIAL FIELD PASS • DROP 01
                    </span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-forest text-surface font-fraunces font-bold text-scale-14">
                  #{supporterNumber || 1}
                </div>
              </div>

              {/* Supporter Details */}
              <div className="space-y-1.5 mb-4">
                <p className="text-[11px] text-muted uppercase tracking-wider">Pledged Holder</p>
                <p className="font-fraunces font-bold text-scale-18 text-ink">
                  {submittedName || "Founding Supporter"}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-forest dark:text-emerald-400 font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-terracotta shrink-0" />
                  <span>Reserved at ₹0 • Launch Milestone Active</span>
                </div>
                {/* Backer Tier Perk Pill */}
                <div className="mt-2.5 p-2 rounded-lg bg-surface/90 border border-line text-[11px] flex items-center gap-2">
                  <Award className="w-4 h-4 text-terracotta shrink-0" />
                  <span className="font-medium text-ink">
                    {(supporterNumber || 1) <= 100
                      ? "Tier: Founding 100 • Serialized First Pressing + Free Botanical Tote"
                      : (supporterNumber || 1) <= 500
                      ? "Tier: Pioneer 500 • Drop 01 Priority Production Queue"
                      : "Tier: Milestone Backer • Guaranteed ₹899 Launch Price Locked"}
                  </span>
                </div>
              </div>

              {/* Referral Code Footer */}
              <div className="pt-3 border-t border-line/80 flex justify-between items-center text-scale-12">
                <span className="text-muted font-mono text-[11px]">PASS CODE: {referralCode}</span>
                <span className="text-terracotta font-semibold text-[11px]">DPDP Validated</span>
              </div>
            </div>

            <div>
              <h2 className="font-fraunces text-scale-28 font-bold text-ink">
                {COPY.success.title}
              </h2>
              <p className="text-scale-14 text-muted mt-1">
                You are registered on our founding launch ledger. Share your pass to move up the early drop list.
              </p>
            </div>

            {/* Referral Sharing Action Buttons & Actions */}
            <div className="p-4 rounded-xl bg-sand/40 dark:bg-sand/20 border border-line text-left space-y-3">
              <p className="text-scale-12 font-medium text-ink">
                {COPY.success.referralPrompt}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 h-11 px-4 rounded-full bg-surface border border-line font-medium text-scale-12 text-ink flex items-center justify-center gap-2 hover:bg-sand/50 transition-colors shadow-xs"
                >
                  <Copy className="w-4 h-4 text-terracotta" />
                  <span>{copiedLink ? COPY.success.copiedLinkButton : COPY.success.copyLinkButton}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="h-11 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-surface font-semibold text-scale-12 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{COPY.success.whatsappShareButton}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  title="Add drop forecast to Google/Apple Calendar"
                  className="h-11 px-4 rounded-full bg-surface border border-line hover:border-forest/50 text-ink font-medium text-scale-12 flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-forest dark:text-emerald-400" />
                  <span>Drop Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* Backer Referral Reward Ladder */}
            <div className="p-4 rounded-xl bg-surface border border-line text-left space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-terracotta" />
                  Referral Unlock Ladder
                </span>
                <span className="text-[10px] text-muted">Zero payment required for invites</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-sand/30 border border-line/60">
                  <span className="block text-[10px] font-bold text-forest dark:text-emerald-400">1 Friend</span>
                  <span className="block text-[10px] text-ink font-medium">Day 1 Priority Dispatch</span>
                </div>
                <div className="p-2 rounded-lg bg-sand/30 border border-line/60">
                  <span className="block text-[10px] font-bold text-forest dark:text-emerald-400">3 Friends</span>
                  <span className="block text-[10px] text-ink font-medium">Organic Canvas Tote</span>
                </div>
                <div className="p-2 rounded-lg bg-sand/30 border border-line/60">
                  <span className="block text-[10px] font-bold text-forest dark:text-emerald-400">5 Friends</span>
                  <span className="block text-[10px] text-ink font-medium">Archival Wildlife Print</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Community Channel Invite */}
            <a
              href="https://chat.whatsapp.com/invite/kurmi-naturalists"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-left hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-surface flex items-center justify-center font-bold text-scale-12">
                  🌿
                </span>
                <div>
                  <span className="text-scale-12 font-semibold text-emerald-900 dark:text-emerald-200 block">
                    Join Kurmi Naturalists Club on WhatsApp
                  </span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">
                    Behind-the-scenes dye tests, fabric updates & voting
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
            </a>

            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsInquiryModalOpen(false);
                setIsSuccess(false);
                setStep(1);
              }}
            >
              {COPY.success.viewMoreDesigns}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
