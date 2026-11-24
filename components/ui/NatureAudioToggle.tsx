"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function NatureAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    // Pause when page is hidden
    const handleVisibility = () => {
      if (document.hidden && audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      } else if (!document.hidden && isPlaying && audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopAudio();
    };
  }, [isPlaying]);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime); // Gentle low volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Soft wind breeze (Brown/Pink noise filtered)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. Ambient harmonic chime/birdsong chirps at gentle intervals
      const playChirp = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();

        // Pentatonic woodland frequency
        const notes = [1200, 1440, 1600, 1800, 2160, 2400];
        const freq = notes[Math.floor(Math.random() * notes.length)];

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.18);

        chirpGain.gain.setValueAtTime(0, now);
        chirpGain.gain.linearRampToValueAtTime(0.025, now + 0.03);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        osc.connect(chirpGain);
        chirpGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.25);
      };

      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.4) playChirp();
      }, 3200);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio not supported or blocked:", e);
    }
  };

  const stopAudio = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`h-10 px-3 rounded-full border border-line flex items-center gap-1.5 text-[11px] font-semibold transition-all ${
        isPlaying
          ? "bg-forest text-surface border-forest shadow-xs animate-pulse"
          : "bg-surface text-muted hover:text-ink hover:bg-sand/60"
      }`}
      aria-label={isPlaying ? "Mute forest calm ambient audio" : "Play forest calm ambient audio"}
      title="Calm Forest Ambient Sound"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">Forest Calm</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Forest Calm</span>
        </>
      )}
    </button>
  );
}
