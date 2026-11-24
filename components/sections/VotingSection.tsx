"use client";

import React from "react";
import { VoteCard } from "../ui/VoteCard";
import voteCandidatesData from "@/data/vote-candidates.json";
import { VoteCandidate } from "@/lib/types";
import { COPY } from "@/data/copy";

export function VotingSection() {
  const candidates = voteCandidatesData as VoteCandidate[];
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votesCount, 0);

  return (
    <section id="vote" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((cand) => (
            <VoteCard key={cand.id} candidate={cand} totalVotes={totalVotes} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-scale-12 text-muted max-w-xl mx-auto">
            {COPY.voting.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
