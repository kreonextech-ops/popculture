"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DiscoverFoxGame from "@/components/DiscoverFoxGame";
import InfiniteAssetMarquee from "@/components/InfiniteAssetMarquee";
import { Sparkles, Trophy, Gift, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col selection:bg-[#FAC537] selection:text-[#25100E]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 text-center px-4 max-w-4xl mx-auto overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E53925]/10 border border-[#E53925]/20 text-[#E53925] text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-xs">
          <Trophy className="w-4 h-4 text-[#FFCD3C]" />
          <span>MONTHLY SNACK HAMPER CHALLENGE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#25100E] leading-[1.04]">
          POP FOX <span className="text-[#D73B3A]">RUNNER</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-[#522C28]/85 font-medium max-w-2xl mx-auto leading-relaxed">
          Sprint across desert dunes, leap over samosas & jalebis, and duck under flying obstacles!
          Play as a guest for casual fun, or login to save your distance on the leaderboard and win free monthly snack hampers.
        </p>

        {/* 3 Quick Contest Perks */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono font-bold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#522C28]/15 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-[#D73B3A]" />
            <span>Monthly Hamper for #1 Scorer</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#522C28]/15 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-[#FFCD3C]" />
            <span>Live Contest Leaderboard</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#522C28]/15 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3CA837]" />
            <span>Casual Guest Mode Supported</span>
          </span>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-y-2 border-[#25100E] shadow-sm select-none mb-8">
        <InfiniteAssetMarquee text="POP FOX RUNNER ✦ SPRINT & WIN" />
      </div>

      {/* Interactive Arcade Stage */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full pb-20">
        <div className="bg-white rounded-3xl border-2 border-[#25100E] shadow-xl p-3 sm:p-6 overflow-hidden">
          <DiscoverFoxGame />
        </div>

        {/* Contest Rules & How It Works */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#522C28]/15 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#E53925]/10 text-[#E53925] flex items-center justify-center font-display font-black text-lg mb-3">
              01
            </div>
            <h4 className="font-display text-lg uppercase text-[#25100E]">Guest vs Ranked</h4>
            <p className="text-xs text-[#522C28]/80 font-medium mt-1 leading-relaxed">
              Anyone can play as a Guest right away! To save your high score and participate in the monthly prize pool, simply sign in with Google or Email.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#522C28]/15 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FAC537]/20 text-[#855D00] flex items-center justify-center font-display font-black text-lg mb-3">
              02
            </div>
            <h4 className="font-display text-lg uppercase text-[#25100E]">Monthly Hamper</h4>
            <p className="text-xs text-[#522C28]/80 font-medium mt-1 leading-relaxed">
              The longest runner at the end of each calendar month wins an exclusive VIP hamper with all 4 signature flavours + custom crunch goodies delivered free!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#522C28]/15 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-display font-black text-lg mb-3">
              03
            </div>
            <h4 className="font-display text-lg uppercase text-[#25100E]">Free Doorstep Delivery</h4>
            <p className="text-xs text-[#522C28]/80 font-medium mt-1 leading-relaxed">
              At the close of each month, we reach out to the #1 scorer and dispatch the Grand Snack Hamper straight to their doorstep completely free of charge!
            </p>
          </div>
        </div>
      </main>

      <InfiniteAssetMarquee text="POP CULTURE" />
    </div>
  );
}
