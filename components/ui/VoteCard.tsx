"use client";

import React, { useState } from "react";
import { VoteCandidate } from "@/lib/types";
import { useKurmi } from "@/lib/context";
import { Check, Sparkles } from "lucide-react";
import { COPY } from "@/data/copy";

interface VoteCardProps {
  candidate: VoteCandidate;
  totalVotes: number;
}

export function VoteCard({ candidate, totalVotes }: VoteCardProps) {
  const { votedCandidates, castVote } = useKurmi();
  const [isVoting, setIsVoting] = useState(false);
  const isVoted = votedCandidates.includes(candidate.id);

  const percentage = totalVotes > 0 ? Math.round((candidate.votesCount / totalVotes) * 100) : 0;

  const handleVote = async () => {
    if (isVoted || isVoting) return;
    setIsVoting(true);
    await castVote(candidate.id);
    setIsVoting(false);
  };

  return (
    <div
      className={`p-5 bg-surface dark:bg-surface rounded-card border ${
        isVoted ? "border-terracotta ring-1 ring-terracotta" : "border-line"
      } shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover overflow-hidden`}
    >
      <div>
        {/* Real Wildlife Photo Header */}
        {candidate.image && (
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-line bg-sand/30">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-surface/90 text-[10px] font-bold text-forest dark:text-ink uppercase tracking-wider backdrop-blur-xs">
              {candidate.expectedGarment}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            {candidate.species}
          </span>
        </div>

        <h3 className="font-fraunces text-scale-20 font-bold text-ink mb-1">
          {candidate.name}
        </h3>
        <p className="text-scale-12 text-muted leading-relaxed mb-3">
          {candidate.story}
        </p>

        <div className="text-[11px] text-muted space-y-0.5 mb-4">
          <p><span className="font-medium text-ink">Habitat:</span> {candidate.habitat}</p>
          <p><span className="font-medium text-ink">Palette:</span> {candidate.palette}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-line/60 space-y-3">
        {/* Animated Result Bar */}
        <div>
          <div className="flex justify-between text-scale-12 font-medium mb-1.5">
            <span className="text-muted">{candidate.votesCount} community votes</span>
            <span className="font-bold text-ink">{percentage}%</span>
          </div>
          <div className="h-2 w-full bg-sand/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-terracotta rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleVote}
          disabled={isVoted || isVoting}
          className={`w-full h-10 rounded-full font-medium text-scale-14 flex items-center justify-center gap-1.5 transition-all duration-200 ${
            isVoted
              ? "bg-sand text-forest font-semibold cursor-default"
              : "bg-forest hover:bg-forest-hover text-surface hover:-translate-y-0.5 shadow-sm"
          }`}
          aria-pressed={isVoted}
        >
          {isVoted ? (
            <>
              <Check className="w-4 h-4 text-terracotta" />
              <span>{COPY.voting.votedButton}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVoting ? "Registering..." : COPY.voting.voteButton}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
