"use client";

import React, { useState } from "react";
import { VoteCard } from "../ui/VoteCard";
import voteCandidatesData from "@/data/vote-candidates.json";
import { VoteCandidate } from "@/lib/types";
import { COPY } from "@/data/copy";
import { Sparkles, Send, CheckCircle2, MessageSquarePlus, Sliders } from "lucide-react";

export function VotingSection() {
  const candidates = voteCandidatesData as VoteCandidate[];
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votesCount, 0);

  const [suggestedSpecies, setSuggestedSpecies] = useState("");
  const [submittedSuggestion, setSubmittedSuggestion] = useState(false);
  const [fitPreference, setFitPreference] = useState<"regular" | "oversized">("regular");
  const [votedFit, setVotedFit] = useState(false);

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestedSpecies.trim()) return;
    setSubmittedSuggestion(true);
    setSuggestedSpecies("");
    setTimeout(() => setSubmittedSuggestion(false), 4000);
  };

  const handleFitPoll = (choice: "regular" | "oversized") => {
    setFitPreference(choice);
    setVotedFit(true);
    if (typeof window !== "undefined" && navigator?.vibrate) {
      navigator.vibrate(12);
    }
  };

  return (
    <section id="vote" className="w-full py-20 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            {COPY.voting.tag}
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            {COPY.voting.title}
          </h2>
          <p className="text-scale-16 text-muted">
            {COPY.voting.subtitle}
          </p>
        </div>

        {/* Existing 3 Vote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((cand) => (
            <VoteCard key={cand.id} candidate={cand} totalVotes={totalVotes} />
          ))}
        </div>

        {/* Point 41 & 46: Community Species Suggestion Box & Fit Poll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Point 41: Suggest a Species */}
          <div className="p-6 rounded-2xl bg-sand/30 dark:bg-sand/15 border border-line space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-terracotta" />
              <h3 className="font-fraunces font-bold text-scale-18 text-ink">
                Community Species Suggestion Box
              </h3>
            </div>
            <p className="text-scale-12 text-muted leading-relaxed">
              Have a favorite Indian wildlife species you want our naturalist illustrator to draw next (e.g. *Gharial*, *Snow Leopard*, *Nilgiri Tahr*, *Great Indian Bustard*)?
            </p>

            <form onSubmit={handleSuggest} className="flex gap-2">
              <input
                type="text"
                value={suggestedSpecies}
                onChange={(e) => setSuggestedSpecies(e.target.value)}
                placeholder="E.g. Himalayan Snow Leopard, Chambal Gharial..."
                className="flex-1 h-11 px-4 rounded-full border border-line bg-surface text-scale-12 text-ink focus:outline-none focus:border-forest"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-full bg-forest text-surface font-semibold text-scale-12 hover:bg-forest/90 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </form>

            {submittedSuggestion && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your species nomination has been logged in our Drop 02 sketch queue!</span>
              </p>
            )}
          </div>

          {/* Point 46: Supporter Poll on Future Drop Fits */}
          <div className="p-6 rounded-2xl bg-sand/30 dark:bg-sand/15 border border-line space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-forest dark:text-emerald-400" />
              <h3 className="font-fraunces font-bold text-scale-18 text-ink">
                Supporter Fit Preference Poll
              </h3>
            </div>
            <p className="text-scale-12 text-muted leading-relaxed">
              Help our master pattern makers dial in factory sizing. Which silhouette do you wear most?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFitPoll("regular")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  fitPreference === "regular"
                    ? "border-forest bg-forest text-surface shadow-xs"
                    : "border-line bg-surface hover:border-forest/50 text-ink"
                }`}
              >
                <span className="block font-bold text-scale-14">Standard Regular</span>
                <span className="block text-[10px] opacity-80">Timeless naturalist drape</span>
              </button>

              <button
                type="button"
                onClick={() => handleFitPoll("oversized")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  fitPreference === "oversized"
                    ? "border-forest bg-forest text-surface shadow-xs"
                    : "border-line bg-surface hover:border-forest/50 text-ink"
                }`}
              >
                <span className="block font-bold text-scale-14">Oversized Boxy</span>
                <span className="block text-[10px] opacity-80">Drop shoulder + heavy drape</span>
              </button>
            </div>

            {votedFit && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Preference recorded for factory pattern grading. Thank you!</span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-scale-12 text-muted max-w-xl mx-auto">
            {COPY.voting.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
