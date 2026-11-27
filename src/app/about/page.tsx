"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Quote,
  Flame,
  CheckCircle2,
  Scroll,
  X,
  MapPin,
  Sparkle,
  Layers,
  Leaf,
  Check,
  Camera,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import InfiniteAssetMarquee from "@/components/InfiniteAssetMarquee";
import { smoothScrollTo } from "@/components/LenisProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FounderKey = "nikhil" | "priyaank";

type StoryLine = {
  words: string[];
  accentWords?: string[];
};

type FounderProfile = {
  id: FounderKey;
  name: string;
  role: string;
  location: string;
  initials: string;
  avatarColor: string;
  badge: string;
  tagline: string;
  hookLine1: string[];
  hookLine2: string[];
  storyLines: StoryLine[];
  chapters: {
    number: string;
    tag: string;
    title: string;
    paragraphs: string[];
    callout?: { title: string; desc: string };
  }[];
  quote: string;
  signoff: string;
};

const FOUNDER_DATA: Record<FounderKey, FounderProfile> = {
  nikhil: {
    id: "nikhil",
    name: "Nikhil Raj",
    role: "Founder & Vision Lead",
    location: "From Khagaria, Bihar • Based in Siliguri HQ",
    initials: "NR",
    avatarColor: "bg-[#25100E] text-[#FAC537]",
    badge: "Vision & Brand Strategy",
    tagline: "Building a modern snack brand for young India from the ground up.",
    hookLine1: ["THE", "STORY", "OF"],
    hookLine2: ["NIKHIL", "RAJ"],
    storyLines: [
      {
        words: ["IT", "BEGAN", "IN", "KHAGARIA,", "BIHAR,"],
        accentWords: ["KHAGARIA,", "BIHAR,"],
      },
      {
        words: ["WHERE", "BIG", "DREAMS", "DIDN'T", "COME", "WITH", "BIG", "RESOURCES."],
      },
      {
        words: ["IN", "HIS", "FAMILY'S", "TRADE,", "HE", "LEARNED", "FROM", "THE", "GROUND", "UP:"],
        accentWords: ["GROUND", "UP:"],
      },
      {
        words: ["HONEST", "DEALINGS,", "REAL", "QUALITY,", "AND", "EARNING", "TRUST", "ONE", "CUSTOMER", "AT", "A", "TIME."],
      },
      {
        words: ["BUT", "EVERY", "INDIAN", "SNACK", "SHELF", "HAD", "THE", "SAME", "FLAW:"],
        accentWords: ["SAME", "FLAW:"],
      },
      {
        words: ["TASTY", "BUT", "DEEP-FRIED", "IN", "PALM", "OIL,", "OR", "HEALTHY", "BUT", "LIFELESS."],
        accentWords: ["DEEP-FRIED", "LIFELESS."],
      },
      {
        words: ["NOBODY", "WAS", "MAKING", "CLEAN", "SNACKING", "FEEL", "EXCITING,", "BOLD,", "AND", "MODERN."],
      },
      {
        words: ["SO", "WE", "REWROTE", "THE", "STORY", "WITH", "POP", "CULTURE."],
        accentWords: ["POP", "CULTURE."],
      },
      {
        words: ["MAKING", "SLOW-ROASTED", "LOTUS", "SEEDS", "THE", "DEFAULT", "CLEAN", "CRUNCH", "ACROSS", "INDIA."],
        accentWords: ["SLOW-ROASTED", "CLEAN", "CRUNCH"],
      },
    ],
    chapters: [
      {
        number: "01",
        tag: "ORIGIN & EARLY GRIT",
        title: "Where You Start Doesn't Decide Where You Go",
        paragraphs: [
          "Nikhil Raj’s story starts in Khagaria, a small town in Bihar, where big dreams didn’t come with big resources. Growing up, he learned early that value comes from honest dealings, hard work, and showing up every single day.",
          "He began in the family business, learning the craft from the ground up: how to deal with suppliers, manage inventory, and earn trust one customer at a time. Those years gave him a deep respect for quality and an instinct for what people actually crave.",
        ],
      },
      {
        number: "02",
        tag: "THE TURNING POINT",
        title: "Tasty But Unhealthy, Or Healthy But Boring",
        paragraphs: [
          "Running a business was one thing. Building a brand people genuinely love was another. Nikhil kept noticing the exact same problem on every Indian snack shelf: snacks were either tasty but deep-fried in palm oil, or healthy but completely lifeless.",
          "Nobody was making clean snacking feel exciting, bold, and modern. That missing link became Pop Culture.",
        ],
        callout: {
          title: "Built on One Simple Conviction",
          desc: "Healthy snacking should be the coolest thing on your shelf. Every pack is designed to deliver explosive crunch and honest nutrition that fits effortlessly into how young India lives, works, and shares.",
        },
      },
      {
        number: "03",
        tag: "THE MISSION",
        title: "Changing How India Snacks",
        paragraphs: [
          "From a small town in Bihar to building a nationwide snack movement, Nikhil’s journey is proof that origin doesn’t cap ambition.",
          "Today, he and his team are on an uncompromising mission: making hand-sorted, slow-roasted lotus seeds the default choice across India for every desk snack, midnight study session, and weekend road trip.",
        ],
      },
    ],
    quote: "Healthy snacking doesn’t have to taste like medicine. We made it the coolest crunch in the room.",
    signoff: "— Nikhil Raj, Founder & Vision Lead",
  },
  priyaank: {
    id: "priyaank",
    name: "Priyaank Sinhal",
    role: "Co-Founder & Craft Lead",
    location: "Siliguri Roastery Base",
    initials: "PS",
    avatarColor: "bg-[#D73B3A] text-white",
    badge: "Craft & Quality Lead",
    tagline: "Obsessed with 360° even masala dusting and zero compromises.",
    hookLine1: ["THE", "CRAFT", "OF"],
    hookLine2: ["PRIYAANK", "SINHAL"],
    storyLines: [
      {
        words: ["PRIYAANK", "STARTED", "AT", "JUST", "21", "WITH", "AN", "IRON", "CONVICTION:"],
        accentWords: ["JUST", "21"],
      },
      {
        words: ["BUILD", "SOMETHING", "WORLD-CLASS", "FROM", "THE", "GROUND", "UP."],
      },
      {
        words: ["DOING", "A", "FEW", "THINGS", "EXCEPTIONALLY", "WELL", "BEATS", "DOING", "TWENTY", "HALFWAY."],
        accentWords: ["EXCEPTIONALLY", "WELL"],
      },
      {
        words: ["IN", "OUR", "SILIGURI", "ROASTERY,", "CRAFT", "IS", "AN", "IRON", "LAW:"],
        accentWords: ["SILIGURI", "ROASTERY,"],
      },
      {
        words: ["PROPRIETARY", "360°", "EVEN", "SPICE", "DUSTING", "AND", "PERFECT", "AIRY", "CRUNCH."],
        accentWords: ["360°", "EVEN", "SPICE", "DUSTING"],
      },
      {
        words: ["IF", "A", "BATCH", "HAS", "A", "STICKY", "CLUMP,", "IT", "GETS", "REJECTED", "ON", "THE", "SPOT."],
        accentWords: ["REJECTED"],
      },
      {
        words: ["ZERO", "PALM", "OIL.", "NEVER", "DEEP-FRIED.", "100%", "HONEST", "INGREDIENTS."],
        accentWords: ["ZERO", "PALM", "OIL.", "NEVER", "DEEP-FRIED."],
      },
      {
        words: ["EVERY", "PACK", "IS", "PURE", "FOOD", "CRAFTED", "WITH", "GENUINE", "PRIDE", "FOR", "OUR", "FAMILIES."],
        accentWords: ["PURE", "FOOD", "GENUINE", "PRIDE"],
      },
    ],
    chapters: [
      {
        number: "01",
        tag: "STARTING YOUNG",
        title: "The 21-Year-Old Catalyst",
        paragraphs: [
          "Priyaank Sinhal started young. At just 21, while most people his age were still figuring out their next step, he had already chosen his path: build something world-class of his own.",
          "What set him apart was an instinct to reject the easy shortcut. While others chased endless product catalogs, Priyaank believed that doing a few things exceptionally well beats doing many things halfway.",
        ],
      },
      {
        number: "02",
        tag: "THE UNBENDING STANDARD",
        title: "Quality Over Quantity Is A Rule, Not A Slogan",
        paragraphs: [
          "That mindset shows up in every micro-detail of our product line. From the acoustic resonance of a slow-roasted lotus seed to our proprietary 360° even spice dusting, Priyaank catches what others overlook.",
          "If a batch doesn't achieve the exact airy crunch or has even a single sticky clump, it gets rejected on the spot. Quality isn’t marketing here — it is an iron law.",
        ],
        callout: {
          title: "The Relentless Daily Grind",
          desc: "Not the titles, not the spotlight, but the daily craft of roasting, seasoning, and testing until every bite meets our gold standard.",
        },
      },
      {
        number: "03",
        tag: "THE PROMISE",
        title: "Zero Palm Oil. 100% Honest Ingredients.",
        paragraphs: [
          "As Co-Founder and Craft Lead, Priyaank ensures every foil pouch carries the hallmark of Siliguri’s finest roasting technology.",
          "We never blend inferior filler seeds, we never deep-fry, and we never add artificial colourings. Every handful is pure food crafted with genuine pride.",
        ],
      },
    ],
    quote: "Doing a few things exceptionally well beats doing twenty things halfway. Quality over quantity is our rule.",
    signoff: "— Priyaank Sinhal, Co-Founder & Craft Lead",
  },
};

export default function AboutPage() {
  const storySectionRef = useRef<HTMLDivElement>(null);
  const storyArenaRef = useRef<HTMLDivElement>(null);
  const storyScrollContentRef = useRef<HTMLDivElement>(null);
  const [selectedFounder, setSelectedFounder] = useState<FounderKey | null>(null);

  // Initialize GSAP ScrollTrigger for the progressive letter-by-letter cascade (homepage style, refined size)
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (!selectedFounder || !storySectionRef.current) return;

    // Immediately trigger Lenis resize so scroll height matches newly mounted section
    window.__lenis?.resize();
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event("resize"));

    const scrollTimer = setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
      if (storySectionRef.current) {
        smoothScrollTo(storySectionRef.current);
      }
    }, 120);

    const refreshTimer = setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 350);

    const ctx = gsap.context(() => {
      const container = storySectionRef.current;
      const scrollContent = storyScrollContentRef.current;
      const arena = storyArenaRef.current;
      if (!container || !scrollContent) return;

      // Watch container and pin-spacer for dynamic DOM size changes so Lenis never gets clamped
      const ro = new ResizeObserver(() => {
        window.__lenis?.resize();
        ScrollTrigger.refresh();
      });
      ro.observe(container);
      if (container.parentElement) ro.observe(container.parentElement);

      const allLetters = gsap.utils.toArray<HTMLElement>(".story-cascade-letter");
      const quoteBox = document.querySelector<HTMLElement>(".story-quote-box");

      // Initial state: letters masked below, quote box hidden, scroll container at 0
      gsap.set(allLetters, { yPercent: 115, scale: 0.92, autoAlpha: 0 });
      gsap.set(scrollContent, { y: 0 });
      if (quoteBox) {
        gsap.set(quoteBox, { autoAlpha: 0, y: 30, scale: 0.95 });
      }

      // Master Pinned Timeline with scrub (balanced height so Lenis never runs out of scroll)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2200",
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pBar = document.getElementById("founder-scroll-progress-fill");
            if (pBar) {
              pBar.style.width = `${Math.min(100, Math.max(0, self.progress * 100)).toFixed(1)}%`;
            }
          },
        },
      });

      const numLines = FOUNDER_DATA[selectedFounder].storyLines.length;
      const stepDuration = 0.65;

      // Animate each line with the letter-by-letter scrub cascade (all lines stay 100% visible)
      for (let i = 0; i < numLines; i++) {
        const lineLetters = gsap.utils.toArray<HTMLElement>(`.story-line-${i}-letter`);
        if (lineLetters.length > 0) {
          masterTl.fromTo(
            lineLetters,
            { yPercent: 115, scale: 0.92, autoAlpha: 0 },
            {
              yPercent: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.68,
              stagger: 0.02,
              ease: "power2.out",
              force3D: true,
            },
            i * stepDuration
          );
        }
      }

      // Upward translation ONLY starts near the end (line 6+) so earlier lines stay comfortable
      const startShiftIndex = Math.max(2, numLines - 3);
      const startShiftTime = startShiftIndex * stepDuration;
      const endShiftTime = numLines * stepDuration + 0.3;
      const shiftAmount = arena
        ? Math.max(180, scrollContent.scrollHeight - arena.clientHeight + 60)
        : 240;

      masterTl.to(
        scrollContent,
        {
          y: -shiftAmount,
          duration: endShiftTime - startShiftTime,
          ease: "power1.inOut",
        },
        startShiftTime
      );

      // Quote springs into view when all story lines are complete
      const tQuote = numLines * stepDuration + 0.35;
      if (quoteBox) {
        masterTl.fromTo(
          quoteBox,
          { autoAlpha: 0, y: 30, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "back.out(1.2)",
          },
          tQuote
        );
      }

      // Hold briefly so user can read complete story and quote before unpinning
      masterTl.to({}, { duration: 1.0 });

      ScrollTrigger.refresh();
      window.__lenis?.resize();

      return () => {
        ro.disconnect();
      };
    }, storySectionRef);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [selectedFounder]);

  const handleOpenFounder = (founder: FounderKey) => {
    setSelectedFounder(founder);
    setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
      if (storySectionRef.current) {
        smoothScrollTo(storySectionRef.current);
      }
    }, 60);
  };

  const handleCloseStory = () => {
    setSelectedFounder(null);
    const foundersSection = document.getElementById("founders-section");
    if (foundersSection) {
      foundersSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeData = selectedFounder ? FOUNDER_DATA[selectedFounder] : null;

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col selection:bg-[#FAC537] selection:text-[#25100E]">
      <Navbar />

      {/* =========================================================================
          1. HERO SECTION (With High-Resolution Landscape Artwork)
          ========================================================================= */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex flex-col items-center justify-center pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 w-full text-center overflow-hidden border-b-2 border-[#25100E]">
        {/* Background Image Layer (Responsive Desktop & Mobile Dunes Artwork) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/about/our-story-hero-mobile.png" />
            <img
              src="/about/our-story-hero.png"
              alt="Our Story Hero Background"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-bottom"
            />
          </picture>
          {/* Legibility Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8EE]/90 via-[#FFF8EE]/65 to-[#FFF8EE]/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D73B3A]/10 border border-[#D73B3A]/20 text-[#D73B3A] text-xs sm:text-sm font-black uppercase tracking-widest mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FAC537] fill-[#FAC537]" />
            <span>OUR STORY</span>
          </div>

          <h1 className="max-w-4xl mx-auto flex flex-col items-center text-balance">
            {/* Line 1: Manrope (Clean modern sans setup) */}
            <span className="font-sans font-extrabold text-base sm:text-2xl md:text-3xl uppercase tracking-[0.14em] text-[#522C28]/85 mb-2 sm:mb-3">
              Healthy Snacking Should Be
            </span>
            {/* Line 2: Lilita One (Iconic bold display punchline) */}
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] uppercase tracking-tight text-[#D73B3A] leading-[1.04]">
              The Coolest Thing On Your Shelf.
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#522C28]/85 font-medium max-w-2xl mx-auto leading-relaxed text-balance">
            Every snack shelf in India tells the same story — junk you love, or health food you can’t finish. We got tired of that story. <span className="text-[#25100E] font-bold">So we rewrote it.</span>
          </p>
        </div>
      </section>

      {/* =========================================================================
          INFINITE MARQUEE DIVIDER
          ========================================================================= */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-b-2 border-[#25100E] shadow-sm select-none">
        <InfiniteAssetMarquee text="POP CULTURE" />
      </div>

      {/* =========================================================================
          2. ABOUT THE COMPANY & ALL (With Official Fox in Makhana Bowl Dunes Artwork)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 border-b border-[#522C28]/10 relative overflow-hidden">
        {/* Background Image Layer (Who We Are Official Artwork) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/about/who-we-are-mobile-bg.png" />
            <img
              src="/about/who-we-are-bg.png"
              alt="Who We Are Background"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[right_bottom] opacity-95"
            />
          </picture>
          {/* Responsive legibility scrim so the fox & dunes shine while text remains completely legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8EE] via-[#FFF8EE]/80 to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8EE] via-[#FFF8EE]/75 to-transparent md:hidden" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Clean Headline & Origin Facts */}
            <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D73B3A] mb-2.5">
                WHO WE ARE
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#25100E] tracking-tight leading-[1.05]">
                The Pop Culture Story
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#25100E] font-semibold leading-relaxed">
                Born out of a simple frustration: why were Indian snack shelves filled with either palm-oil junk or tasteless diet bars?
              </p>

              {/* Minimal 3-Point Markers */}
              <div className="mt-8 pt-6 border-t border-[#522C28]/10 space-y-3.5">
                <div className="flex items-start gap-3">
                  <span className="text-[#D73B3A] font-black text-xs sm:text-sm tracking-wider">01</span>
                  <p className="text-xs sm:text-sm text-[#522C28]/85 font-medium">
                    <strong className="text-[#25100E] font-bold">Jumbo 5-Sutta Seeds</strong> sourced from Khagaria, Bihar
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D73B3A] font-black text-xs sm:text-sm tracking-wider">02</span>
                  <p className="text-xs sm:text-sm text-[#522C28]/85 font-medium">
                    <strong className="text-[#25100E] font-bold">Slow-Roasted</strong> in our own Siliguri facility
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D73B3A] font-black text-xs sm:text-sm tracking-wider">03</span>
                  <p className="text-xs sm:text-sm text-[#522C28]/85 font-medium">
                    <strong className="text-[#25100E] font-bold">Zero Palm Oil</strong> • Never deep-fried
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Editorial Prose & Pull Quote */}
            <div className="lg:col-span-7 flex flex-col space-y-5 text-xs sm:text-base text-[#522C28]/85 font-normal leading-relaxed">
              <p className="text-sm sm:text-lg text-[#25100E] font-medium leading-relaxed">
                Snacking is India’s national pastime, but the choices were broken. The snacks everyone loved were deep-fried in cheap palm oil and soaked in synthetic additives. The healthy alternatives tasted like punishment.
              </p>

              <p>
                We believed people shouldn’t have to pick between crunch and conscience. That belief led us straight to Khagaria, Bihar — the heartland of world-class water lily lotus seeds.
              </p>

              <p>
                Instead of deep-frying, we slow-roast each seed to golden airy perfection. Instead of powdery clumps, our proprietary tumbling coats every seed with a seamless 360° spice layer. The result? Unapologetic crunch, restaurant-grade flavour, and zero heavy stomach regret.
              </p>

              {/* Minimal Pull Quote */}
              <div className="pt-6 mt-4 border-t border-[#522C28]/10">
                <div className="max-w-md bg-[#FFF8EE]/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#522C28]/10 shadow-xs">
                  <blockquote className="font-display text-lg sm:text-2xl text-[#25100E] uppercase leading-snug tracking-tight">
                    “We don’t make snacks we wouldn’t proudly share with our own families every single day.”
                  </blockquote>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#D73B3A]">
                    — The Pop Culture Standard
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. 2 IMAGES (THE TWO FOUNDERS - PROFESSIONAL PORTRAIT FRAMES)
          ========================================================================= */}
      <section id="founders-section" className="w-full py-16 sm:py-24 relative overflow-hidden border-b border-[#522C28]/10">
        {/* Background Image Layer (Founders Warm Waves) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/about/founders-mobile-bg.png" />
            <img
              src="/about/founders-bg.png"
              alt="Founders Background"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-75"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8EE]/90 via-[#FFF8EE]/55 to-[#FFF8EE]/90" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#D73B3A]">
              THE FOUNDERS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#25100E] tracking-tight mt-1">
              Meet The Minds Behind The Crunch
            </h2>
            <p className="text-xs sm:text-sm text-[#522C28]/70 font-semibold mt-1.5 max-w-md mx-auto">
              Click on either founder below to read their personal journey and founding story.
            </p>
          </div>

          {/* 2 Professional Editorial Portrait Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            
            {/* PORTRAIT CARD 1: NIKHIL RAJ */}
            <div
              onClick={() => handleOpenFounder("nikhil")}
              className={`group rounded-3xl p-4 sm:p-5 border transition-all duration-300 flex flex-col cursor-pointer bg-white ${
                selectedFounder === "nikhil"
                  ? "border-[#D73B3A] shadow-xl ring-2 ring-[#D73B3A]/20"
                  : "border-[#522C28]/12 hover:border-[#25100E]/30 hover:shadow-lg"
              }`}
            >
              {/* Professional Photographic Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#2E1614] via-[#25100E] to-[#180A09] border border-[#25100E]/15 shadow-inner">
                {/* Real Photo (Loads automatically if /about/nikhil.jpg is placed) */}
                <img
                  src="/about/nikhil.jpg"
                  alt="Nikhil Raj — Founder &amp; Vision Lead"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />

                {/* Editorial Studio Fallback & Viewfinder Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 pointer-events-none select-none">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-[#FAC537] border border-white/15 uppercase">
                      01 / FOUNDER
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3CA837] animate-pulse" />
                      <span className="text-[10px] font-mono text-white/80 tracking-wider">PORTRAIT</span>
                    </div>
                  </div>

                  {/* Studio Mark & Placeholder */}
                  <div className="flex flex-col items-center justify-center my-auto py-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner group-hover:border-[#FAC537]/60 group-hover:scale-105 transition-all duration-300">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white/50 group-hover:text-[#FAC537] transition-colors" />
                    </div>
                    <span className="text-white/85 font-display text-base uppercase tracking-wider mt-3">
                      Nikhil Raj
                    </span>
                    <span className="text-white/40 text-[10px] font-mono mt-0.5">
                      Portrait Frame · Khagaria Roots
                    </span>
                  </div>

                  {/* Bottom Studio Captions */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/70 pt-2.5 border-t border-white/15">
                    <span>ORIGIN: BIHAR</span>
                    <span>BASE: SILIGURI HQ</span>
                  </div>
                </div>

                {/* Corner guide crop marks */}
                <div className="absolute top-2.5 left-2.5 text-white/25 text-xs font-mono pointer-events-none">┌</div>
                <div className="absolute top-2.5 right-2.5 text-white/25 text-xs font-mono pointer-events-none">┐</div>
                <div className="absolute bottom-2.5 left-2.5 text-white/25 text-xs font-mono pointer-events-none">└</div>
                <div className="absolute bottom-2.5 right-2.5 text-white/25 text-xs font-mono pointer-events-none">┘</div>
              </div>

              {/* Founder Information & Bio */}
              <div className="mt-5 px-1 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#25100E] tracking-tight">
                      Nikhil Raj
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#D73B3A] bg-[#D73B3A]/10 px-2.5 py-0.5 rounded-full border border-[#D73B3A]/20">
                      Founder
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#D73B3A] mt-1">
                    Founder &amp; Vision Lead
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#522C28]/70 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#D73B3A] shrink-0" />
                    <span>From Khagaria, Bihar • Based in Siliguri HQ</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#522C28]/85 font-medium leading-relaxed">
                    Learned business from the ground up in Bihar. Passionate about turning clean snacking into the coolest crunch in India.
                  </p>
                </div>

                {/* Sleek CTA Button */}
                <div className="mt-6 pt-4 border-t border-[#522C28]/10 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#25100E] group-hover:text-[#D73B3A] transition-colors flex items-center gap-1.5">
                    {selectedFounder === "nikhil" ? "Viewing Story" : "Read Founder Story"}
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      selectedFounder === "nikhil" ? "rotate-90 text-[#D73B3A]" : "group-hover:translate-x-1"
                    }`} />
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    selectedFounder === "nikhil" ? "bg-[#D73B3A] text-white" : "bg-[#522C28]/5 text-[#522C28]/60"
                  }`}>
                    {selectedFounder === "nikhil" ? "Active" : "Click to view"}
                  </span>
                </div>
              </div>
            </div>

            {/* PORTRAIT CARD 2: PRIYAANK SINHAL */}
            <div
              onClick={() => handleOpenFounder("priyaank")}
              className={`group rounded-3xl p-4 sm:p-5 border transition-all duration-300 flex flex-col cursor-pointer bg-white ${
                selectedFounder === "priyaank"
                  ? "border-[#FAC537] shadow-xl ring-2 ring-[#FAC537]/30"
                  : "border-[#522C28]/12 hover:border-[#25100E]/30 hover:shadow-lg"
              }`}
            >
              {/* Professional Photographic Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#25100E] via-[#1D0C0A] to-[#120504] border border-[#25100E]/15 shadow-inner">
                {/* Real Photo (Loads automatically if /about/priyaank.jpg is placed) */}
                <img
                  src="/about/priyaank.jpg"
                  alt="Priyaank Sinhal — Co-Founder &amp; Craft Lead"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />

                {/* Editorial Studio Fallback & Viewfinder Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 pointer-events-none select-none">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-[#FAC537] border border-white/15 uppercase">
                      02 / CO-FOUNDER
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FAC537] animate-pulse" />
                      <span className="text-[10px] font-mono text-white/80 tracking-wider">PORTRAIT</span>
                    </div>
                  </div>

                  {/* Studio Mark & Placeholder */}
                  <div className="flex flex-col items-center justify-center my-auto py-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner group-hover:border-[#FAC537]/60 group-hover:scale-105 transition-all duration-300">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white/50 group-hover:text-[#FAC537] transition-colors" />
                    </div>
                    <span className="text-white/85 font-display text-base uppercase tracking-wider mt-3">
                      Priyaank Sinhal
                    </span>
                    <span className="text-white/40 text-[10px] font-mono mt-0.5">
                      Portrait Frame · Craft Obsession
                    </span>
                  </div>

                  {/* Bottom Studio Captions */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/70 pt-2.5 border-t border-white/15">
                    <span>ROLE: CRAFT LEAD</span>
                    <span>BASE: SILIGURI ROASTERY</span>
                  </div>
                </div>

                {/* Corner guide crop marks */}
                <div className="absolute top-2.5 left-2.5 text-white/25 text-xs font-mono pointer-events-none">┌</div>
                <div className="absolute top-2.5 right-2.5 text-white/25 text-xs font-mono pointer-events-none">┐</div>
                <div className="absolute bottom-2.5 left-2.5 text-white/25 text-xs font-mono pointer-events-none">└</div>
                <div className="absolute bottom-2.5 right-2.5 text-white/25 text-xs font-mono pointer-events-none">┘</div>
              </div>

              {/* Founder Information & Bio */}
              <div className="mt-5 px-1 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#25100E] tracking-tight">
                      Priyaank Sinhal
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#855D00] bg-[#FAC537]/20 px-2.5 py-0.5 rounded-full border border-[#FAC537]/40">
                      Co-Founder
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#E53925] mt-1">
                    Co-Founder &amp; Craft Lead
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#522C28]/70 font-medium">
                    <Sparkle className="w-3.5 h-3.5 text-[#FAC537] shrink-0" />
                    <span>Craft Obsession • Siliguri Roastery Base</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#522C28]/85 font-medium leading-relaxed">
                    Doing a few things exceptionally well beats doing twenty halfway. The guardian of 360° even spice dusting and zero-compromise roasting.
                  </p>
                </div>

                {/* Sleek CTA Button */}
                <div className="mt-6 pt-4 border-t border-[#522C28]/10 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#25100E] group-hover:text-[#D73B3A] transition-colors flex items-center gap-1.5">
                    {selectedFounder === "priyaank" ? "Viewing Story" : "Read Founder Story"}
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      selectedFounder === "priyaank" ? "rotate-90 text-[#D73B3A]" : "group-hover:translate-x-1"
                    }`} />
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    selectedFounder === "priyaank" ? "bg-[#FAC537] text-[#25100E]" : "bg-[#522C28]/5 text-[#522C28]/60"
                  }`}>
                    {selectedFounder === "priyaank" ? "Active" : "Click to view"}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. THE PINNED PROGRESSIVE STORY SCROLL SECTION
          ========================================================================= */}
      {selectedFounder && activeData && (
        <section
          ref={storySectionRef}
          id="founder-story-scroll-section"
          className="w-full h-screen bg-[#FFF8EE] text-[#522C28] relative overflow-hidden flex flex-col justify-between z-20 border-y border-[#522C28]/15 select-none"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            <picture className="w-full h-full block">
              <source media="(max-width: 768px)" srcSet="/about/our-story-hero-mobile.png" />
              <img
                src="/about/our-story-hero.png"
                alt="Story Background"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center opacity-40"
              />
            </picture>
            {/* Legibility Scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8EE]/95 via-[#FFF8EE]/88 to-[#FFF8EE]/95 backdrop-blur-[1px]" />
          </div>

          {/* 1. TOP DOCKED STATUS INDICATOR */}
          <div className="relative z-30 w-full max-w-5xl mx-auto pt-6 sm:pt-8 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-3 shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D73B3A]/10 border border-[#D73B3A]/20 text-[#D73B3A] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#FAC537] fill-[#FAC537]" />
              <span>THE FOUNDER STORY · {activeData.name}</span>
            </div>

            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#522C28]/50 hidden sm:inline-block">
              SCROLL DOWN TO UNROLL STORY ↓
            </span>
          </div>

          {/* 2. CENTER READING ARENA */}
          <div
            ref={storyArenaRef}
            className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-start overflow-hidden pt-3 sm:pt-6 pb-4 sm:pb-6"
          >
            <div
              ref={storyScrollContentRef}
              className="w-full flex flex-col items-start will-change-transform"
            >
              {/* Story Header */}
              <div className="story-title-row mb-4 sm:mb-6 text-left">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-[#D73B3A] mb-1 block">
                  ✦ {activeData.badge} ✦
                </span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-[#25100E] tracking-tight">
                  The Story of {activeData.name}
                </h2>
              </div>

              {/* The Story Lines (Letter-by-Letter cascade, dynamically wrapping to screen width) */}
              <div className="space-y-3 sm:space-y-4 font-display uppercase tracking-tight text-left w-full">
                {activeData.storyLines.map((line, lineIdx) => (
                  <div
                    key={lineIdx}
                    id={`story-line-row-${lineIdx}`}
                    className={`story-line-row story-line-row-${lineIdx} flex flex-wrap items-center justify-start leading-[1.2] text-[17px] min-[400px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[34px] w-full will-change-transform`}
                  >
                    {line.words.map((word, wIdx) => {
                      const isAccent = line.accentWords?.includes(word);
                      return (
                        <span key={`${word}-${wIdx}`} className="inline-flex overflow-hidden py-0.5 -my-0.5 mr-[0.24em]">
                          {word.split("").map((letter, lIdx) => (
                            <span
                              key={`${word}-${lIdx}`}
                              className={`story-cascade-letter story-line-${lineIdx}-letter font-display inline-block will-change-transform ${
                                isAccent ? "text-[#D73B3A]" : "text-[#25100E]"
                              }`}
                            >
                              {letter}
                            </span>
                          ))}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Founder Quote Card (Appears when story is fully revealed) */}
              <div className="story-quote-box mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white/95 border-2 border-[#FAC537] shadow-lg flex items-start gap-4 max-w-3xl w-full will-change-transform">
                <Quote className="w-8 h-8 text-[#FAC537] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-base sm:text-xl uppercase tracking-tight text-[#25100E] leading-snug">
                    “{activeData.quote}”
                  </p>
                  <p className="mt-2 text-xs font-mono font-bold text-[#D73B3A] uppercase tracking-wider">
                    {activeData.signoff}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM SCRUB PROGRESS BAR */}
          <div className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pb-5 sm:pb-6 flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#522C28]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D73B3A] animate-ping" />
                KEEP SCROLLING DOWN
              </span>
              <span>STORY PROGRESSION → ADVANCES TO CORE STANDARDS</span>
            </div>
            <div className="w-full h-1.5 bg-[#522C28]/10 rounded-full overflow-hidden">
              <div
                id="founder-scroll-progress-fill"
                className="h-full bg-gradient-to-r from-[#FAC537] to-[#D73B3A] rounded-full w-0 transition-all duration-75"
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          5. OUR CORE STANDARDS (THE 4 RULES WE NEVER BREAK - MINIMALIST EDITORIAL)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 relative overflow-hidden border-b border-[#522C28]/10">
        {/* Background Image Layer (Core Standards Waves) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/about/standards-mobile-bg.png" />
            <img
              src="/about/standards-bg.png"
              alt="Core Standards Background"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-80"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8EE]/90 via-[#FFF8EE]/60 to-[#FFF8EE]/90" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-[#522C28]/15">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D73B3A] block mb-2">
                OUR CORE STANDARDS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#25100E] tracking-tight">
                The 4 Rules We Never Break
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#522C28]/70 font-semibold max-w-sm md:text-right leading-relaxed">
              From wetland harvest in Khagaria to airtight roastery foil — our unbending promise in every bite.
            </p>
          </div>

          {/* Minimalist Editorial Rows */}
          <div className="divide-y divide-[#522C28]/12">
            
            {/* Rule 01 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start transition-colors duration-200">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-base sm:text-lg font-black text-[#D73B3A] tracking-wider">01</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/40 lg:hidden">Micro-Dusting</span>
              </div>
              
              <div className="lg:col-span-5">
                <span className="hidden lg:block text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/45 mb-1.5">
                  Micro-Dusting Tumbler
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#25100E] tracking-tight leading-snug group-hover:text-[#D73B3A] transition-colors">
                  360° Even Masala, Zero Powdery Lumps
                </h3>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#522C28]/85 font-normal leading-relaxed">
                  Ever had a snack with a powdery clump in one bite and tasteless air in the next? We engineered our proprietary tumbling drums for seamless, 360° even spice adhesion. Every single seed gets uniform flavour.
                </p>
                <div className="mt-4 pt-3 border-t border-[#522C28]/10 flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-[#25100E] uppercase tracking-wider">100% Uniform Coating</span>
                  <span className="text-[#D73B3A] uppercase tracking-wider">Zero Clumps</span>
                </div>
              </div>
            </div>

            {/* Rule 02 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start transition-colors duration-200">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-base sm:text-lg font-black text-[#D73B3A] tracking-wider">02</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/40 lg:hidden">Seed Purity</span>
              </div>
              
              <div className="lg:col-span-5">
                <span className="hidden lg:block text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/45 mb-1.5">
                  Khagaria Wetland Origin
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#25100E] tracking-tight leading-snug group-hover:text-[#D73B3A] transition-colors">
                  Genuine 5-Sutta Jumbo Lotus Seeds
                </h3>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#522C28]/85 font-normal leading-relaxed">
                  Directly hand-sorted from the historic wetlands of Khagaria, Bihar. We strictly reject smaller, dense filler seeds and pick only airy, jumbo pops that deliver that signature acoustic melt-in-mouth crunch.
                </p>
                <div className="mt-4 pt-3 border-t border-[#522C28]/10 flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-[#25100E] uppercase tracking-wider">Direct Farmer Sourced</span>
                  <span className="text-[#D73B3A] uppercase tracking-wider">Zero Filler</span>
                </div>
              </div>
            </div>

            {/* Rule 03 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start transition-colors duration-200">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-base sm:text-lg font-black text-[#D73B3A] tracking-wider">03</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/40 lg:hidden">The Roastery Law</span>
              </div>
              
              <div className="lg:col-span-5">
                <span className="hidden lg:block text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/45 mb-1.5">
                  Siliguri Roastery Base
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#25100E] tracking-tight leading-snug group-hover:text-[#D73B3A] transition-colors">
                  Zero Palm Oil, Never Deep-Fried
                </h3>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#522C28]/85 font-normal leading-relaxed">
                  Zero palm oil, zero trans-fats, zero deep-frying. Roasted to golden airy perfection in our proprietary Siliguri roastery facility so you can munch freely all day without heavy stomach regret.
                </p>
                <div className="mt-4 pt-3 border-t border-[#522C28]/10 flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-[#25100E] uppercase tracking-wider">100% Clean Slow-Roast</span>
                  <span className="text-[#D73B3A] uppercase tracking-wider">Zero Frying</span>
                </div>
              </div>
            </div>

            {/* Rule 04 */}
            <div className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start transition-colors duration-200">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-base sm:text-lg font-black text-[#D73B3A] tracking-wider">04</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/40 lg:hidden">Quality Gate</span>
              </div>
              
              <div className="lg:col-span-5">
                <span className="hidden lg:block text-[11px] font-mono font-bold uppercase tracking-wider text-[#522C28]/45 mb-1.5">
                  Priyaank’s Batch Gate
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#25100E] tracking-tight leading-snug group-hover:text-[#D73B3A] transition-colors">
                  If It’s Not Right, It Doesn’t Ship
                </h3>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#522C28]/85 font-normal leading-relaxed">
                  Priyaank’s golden rule: doing a few things exceptionally well beats doing twenty halfway. Strict airtight multi-barrier foil sealing and acoustic crunch testing ensure every pouch is restaurant-grade fresh.
                </p>
                <div className="mt-4 pt-3 border-t border-[#522C28]/10 flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="text-[#25100E] uppercase tracking-wider">Airtight Multi-Barrier Foil</span>
                  <span className="text-[#D73B3A] uppercase tracking-wider">Batch Tested</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CLOSING CRAFT PROMISE CTA
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-14 md:p-16 rounded-3xl bg-gradient-to-b from-[#2A1311] to-[#1C0B0A] text-white border-2 border-[#FAC537]/30 shadow-2xl relative overflow-hidden">
          {/* Background Image Layer for CTA Card */}
          <picture className="absolute inset-0 z-0 pointer-events-none select-none block w-full h-full">
            <source media="(max-width: 768px)" srcSet="/about/craft-cta-mobile-bg.png" />
            <img
              src="/about/craft-cta-bg.png"
              alt="Craft CTA Background"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center opacity-85"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#25100E]/70 via-[#25100E]/30 to-[#25100E]/80 pointer-events-none z-0" />

          {/* Subtle warm ambient highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#D73B3A]/20 blur-3xl pointer-events-none z-0" />

          <div className="relative z-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#FAC537] block mb-3">
              ✦ THE CRAFT PROMISE ✦
            </span>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.08]">
              Small Bites. <br className="hidden sm:inline" />
              <span className="text-[#FAC537]">Unapologetic Crunch.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/85 font-normal max-w-xl mx-auto leading-relaxed">
              Four signature flavours, zero palm oil, and slow-roasted lotus seeds that actually love your body back. Experience the difference honest craft makes.
            </p>

            {/* Minimal 3-point hallmark tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono font-semibold">
              <span className="inline-flex items-center gap-1.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAC537]" />
                Jumbo 5-Sutta
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D73B3A]" />
                Slow-Roasted
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81C784]" />
                Zero Palm Oil
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/#flavours"
                className="px-7 py-3.5 rounded-full bg-[#D73B3A] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-[#c9302f] hover:shadow-lg transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore The Flavours</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <span>Shop All Munch Packs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM STRAIGHT MARQUEE RIBBON
          ========================================================================= */}
      <InfiniteAssetMarquee text="POP CULTURE" />

    </div>
  );
}
