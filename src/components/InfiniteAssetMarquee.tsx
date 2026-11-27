"use client";

import React from "react";

interface InfiniteAssetMarqueeProps {
  reverse?: boolean;
  className?: string;
  text?: string;
}

export default function InfiniteAssetMarquee({
  reverse = false,
  className = "",
  text = "POP CULTURE",
}: InfiniteAssetMarqueeProps) {
  return (
    <div
      className={`relative z-25 w-full bg-gradient-to-r from-[#C92328] via-[#E23E3E] to-[#C92328] border-t-2 border-[#FFF8EE]/40 border-b-2 border-[#1A0A09]/20 shadow-lg py-2 sm:py-3 md:py-3.5 overflow-hidden select-none [contain:layout_paint] ${className}`}
    >
      <div
        className={`flex w-max ${
          reverse ? "animate-wave-marquee-reverse" : "animate-wave-marquee"
        }`}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex shrink-0 items-center gap-6 sm:gap-8 md:gap-10 pr-6 sm:pr-8 md:pr-10"
          >
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 sm:gap-8 md:gap-10 font-display text-[15px] sm:text-[22px] md:text-[26px] text-[#FFF8EE] uppercase font-bold tracking-[0.1em] whitespace-nowrap"
              >
                <span className="font-display tracking-[0.1em]">{text}</span>
                <span className="font-display text-[#FFCD3C] leading-none select-none">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
