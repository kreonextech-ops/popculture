"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Gift,
  Flame,
  Leaf,
  Filter,
  SlidersHorizontal,
  Plus,
  Heart,
} from "lucide-react";
import { PRODUCTS, COMBOS, ProductDetails, ComboItem } from "@/data/products";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import InfiniteAssetMarquee from "@/components/InfiniteAssetMarquee";
import type { StoreProduct } from "@/lib/store";

export default function ShopPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | "flavours" | "combos">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customProducts, setCustomProducts] = useState<StoreProduct[]>([]);
  const { totalCount, openCart, addItem } = useCart();
  const { isFavorite, toggleFavorite } = useAuth();

  const recordFlavourClick = (flavourSlug: string) => {
    try {
      void fetch("/api/analytics/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flavourSlug }),
      });
    } catch {
      // non-blocking
    }
  };

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.products)) {
          setCustomProducts(data.products);
        }
      })
      .catch(() => {
        // fallback to static PRODUCTS & COMBOS
      });
  }, []);

  const staticProductSlugs = new Set(Object.keys(PRODUCTS));
  const staticComboSlugs = new Set(Object.keys(COMBOS));

  const extraStoreFlavours = customProducts.filter(
    (p) => !p.isCombo && !staticProductSlugs.has(p.slug)
  );
  const extraStoreCombos = customProducts.filter(
    (p) => p.isCombo && !staticComboSlugs.has(p.slug)
  );

  // Overlay live admin prices if updated in store
  const liveBySlug = new Map(customProducts.map((p) => [p.slug, p]));

  const productList: ProductDetails[] = [
    ...Object.values(PRODUCTS).map((p) => {
      const live = liveBySlug.get(p.slug);
      if (!live || !live.variants[0]) return p;
      const singlePrice = parseFloat(live.variants[0].price) || p.pricing.single.price;
      const trioPrice = live.variants[1] ? parseFloat(live.variants[1].price) : p.pricing.trio.price;
      const partyPrice = live.variants[2] ? parseFloat(live.variants[2].price) : p.pricing.party.price;
      return {
        ...p,
        pricing: {
          single: { ...p.pricing.single, price: singlePrice },
          trio: { ...p.pricing.trio, price: trioPrice },
          party: { ...p.pricing.party, price: partyPrice },
        },
      };
    }),
    ...extraStoreFlavours.map((sp) => {
      const v0 = sp.variants[0];
      const price = v0 ? parseFloat(v0.price) : 149;
      const orig = price;
      return {
        ...Object.values(PRODUCTS)[0],
        slug: sp.slug,
        id: String(sp.id),
        numericId: sp.id,
        variantIds: {
          single: v0?.id || sp.id * 100 + 1,
          trio: sp.variants[1]?.id || sp.id * 100 + 2,
          party: sp.variants[2]?.id || sp.id * 100 + 3,
        },
        name: sp.title,
        badge: sp.badge,
        emoji: sp.emoji,
        tagline: sp.tagline,
        shortDesc: sp.body_html.replace(/<[^>]+>/g, ""),
        themeColor: sp.themeColor,
        accentBg: sp.accentBg,
        packImage: sp.image,
        pricing: {
          single: {
            label: v0?.title || (sp.slug === "raw-makhana" ? "1 Pouch (250g)" : "1 Pouch (55g)"),
            count: sp.slug === "raw-makhana" ? "250g Pouch" : "55g Pouch",
            price,
            originalPrice: orig,
          },
          trio: {
            label: "Pack of 3",
            count: sp.slug === "raw-makhana" ? "3 × 250g (750g)" : "3 × 55g (165g)",
            price: price * 3,
            originalPrice: orig * 3,
          },
          party: {
            label: "Pack of 6",
            count: sp.slug === "raw-makhana" ? "6 × 250g (1.5kg)" : "6 × 55g (330g)",
            price: price * 6,
            originalPrice: orig * 6,
          },
        },
      };
    }),
  ];

  const comboList: ComboItem[] = [
    ...Object.values(COMBOS).map((c) => {
      const live = liveBySlug.get(c.slug);
      if (!live || !live.variants[0]) return c;
      return {
        ...c,
        price: parseFloat(live.variants[0].price) || c.price,
        originalPrice: parseFloat(live.variants[0].price) || c.price,
      };
    }),
    ...extraStoreCombos.map((sp) => {
      const v0 = sp.variants[0];
      return {
        slug: sp.slug,
        id: String(sp.id),
        numericId: sp.id,
        variantId: v0?.id || sp.id * 100 + 1,
        name: sp.title,
        badge: sp.badge,
        emoji: sp.emoji,
        tagline: sp.tagline,
        shortDesc: sp.body_html.replace(/<[^>]+>/g, ""),
        packImage: sp.image,
        secondaryImage: sp.secondaryImage,
        includedFlavours: sp.includedFlavours || [],
        themeColor: sp.themeColor,
        accentBg: sp.accentBg,
        price: v0 ? parseFloat(v0.price) : 115,
        originalPrice: v0 ? parseFloat(v0.compare_at_price) : 135,
        savingsBadge: "NEW COMBO",
        rating: 4.9,
        reviewsCount: 1,
        packCountText: sp.packCountText || v0?.title || "Combo Box",
      };
    }),
  ];

  const handleAddToCart = (item: {
    variantId: number;
    slug: string;
    name: string;
    variantLabel: string;
    price: number;
    originalPrice?: number;
    image: string;
  }) => {
    recordFlavourClick(item.slug);
    addItem(item, 1, false);
    setToastMessage(`Added 1 × ${item.name} (₹${item.price}) to your cart! 🍿`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const sortedProducts = [...productList].sort((a, b) => {
    if (sortBy === "price-asc") return a.pricing.single.price - b.pricing.single.price;
    if (sortBy === "price-desc") return b.pricing.single.price - a.pricing.single.price;
    return 0;
  });

  const sortedCombos = [...comboList].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] font-sans antialiased selection:bg-[#D73B3A] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Floating Cart Notification Toast */}
      {toastMessage && (
        <div className="animate-toast-in fixed bottom-6 right-6 z-50 bg-[#25100E] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-[#FAC537]">
          <span className="text-xl">✨</span>
          <div>
            <p className="text-xs font-black uppercase text-[#FAC537]">Munch Box Updated!</p>
            <p className="text-[11px] text-white/90 font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          HERO BANNER & TRUST TICKER
          ========================================================================= */}
      <section className="relative w-full pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-[#FFF3E3] via-[#FFF8EE] to-[#FFF8EE] border-b border-[#522C28]/10 overflow-hidden">
        {/* Landscape Dune Background Illustration */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-multiply select-none">
          <source media="(max-width: 640px)" srcSet="/shop/shop-hero-mobile-bg.png" />
          <img src="/shop/shop-hero-bg.png" alt="" className="w-full h-full object-cover object-bottom" />
        </picture>

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D73B3A]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#FAC537]/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Brand Copy & Trust Highlights */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D73B3A]/10 text-[#D73B3A] text-[11px] font-black uppercase tracking-widest border border-[#D73B3A]/20 mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D73B3A]" />
                <span>ALL NATURAL ROASTED FOXNUTS</span>
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#25100E] leading-[0.95] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                THE MUNCH <span className="text-[#D73B3A]">SHOP.</span>
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#522C28]/85 font-semibold max-w-xl mt-3 leading-relaxed">
                Small bites, big goodness. Explore our 4 signature flavours and value-packed
                combo boxes—slow-roasted to crunchy perfection with 0g trans fat and zero palm oil.
              </p>

              {/* 4 Trust Highlights Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mt-5 text-[10px] sm:text-xs font-black uppercase text-[#522C28]">
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#522C28]/10 shadow-2xs">
                  <span className="text-[#3CA837]">✔</span> 100% Slow-Roasted, Never Fried
                </span>
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#522C28]/10 shadow-2xs">
                  <span className="text-[#3CA837]">✔</span> 0g Trans Fat & Gluten Free
                </span>
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#522C28]/10 shadow-2xs">
                  <span className="text-[#3CA837]">✔</span> Free Delivery Above ₹699+
                </span>
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#522C28]/10 shadow-2xs">
                  <span className="text-[#3CA837]">✔</span> Ships within 24 Hours
                </span>
              </div>
            </div>

            {/* Right Column: Hero Showcase Image (Fox + 4 Signature Packets) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-2 lg:pt-0">
              {/* Golden Ambient Halo */}
              <div className="absolute inset-0 m-auto w-60 sm:w-72 h-60 sm:h-72 bg-[#FAC537]/30 rounded-full blur-3xl pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute -top-3 right-4 sm:right-6 z-30 bg-[#25100E] text-[#FAC537] border-2 border-[#FAC537] px-3.5 py-1 rounded-full shadow-lg font-display text-[11px] sm:text-xs font-black uppercase tracking-wider rotate-3 animate-pulse">
                ✦ 100% CRUNCH ✦
              </div>

              {/* 4 Packets + Mascot Staging */}
              <div className="relative flex items-end justify-center w-full max-w-sm sm:max-w-md h-52 sm:h-64 lg:h-72">
                {/* 1. Cheddar Cheese */}
                <div className="relative -mr-6 sm:-mr-8 z-10 -rotate-12 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/cheddar-cheese.png"
                    alt="Cheddar Cheese"
                    className="h-36 sm:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                  />
                </div>

                {/* 2. Peri Peri */}
                <div className="relative -mr-5 sm:-mr-7 z-20 -rotate-4 -translate-y-2 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/peri-peri.png"
                    alt="Peri Peri"
                    className="h-40 sm:h-48 lg:h-56 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* 3. Cream & Onion */}
                <div className="relative -mr-5 sm:-mr-7 z-30 rotate-3 -translate-y-2.5 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/cream-n-onion.png"
                    alt="Cream & Onion"
                    className="h-40 sm:h-48 lg:h-56 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* 4. Himalayan Pink Salt */}
                <div className="relative z-10 rotate-12 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/himalayan-salt.png"
                    alt="Himalayan Pink Salt"
                    className="h-36 sm:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                  />
                </div>

                {/* Fox mascot in front */}
                <img
                  src="/Sunglasses Fox With Sweeping Tail.png"
                  alt="Pop Culture Fox Mascot"
                  className="pointer-events-none select-none absolute -bottom-2 -left-4 sm:-left-8 z-40 w-[120px] sm:w-[150px] lg:w-[175px] h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FILTER & SORT BAR
          ========================================================================= */}
      <section className="sticky top-0 z-30 bg-[#FFF8EE]/95 backdrop-blur-md border-b border-[#522C28]/10 py-3 sm:py-4 transition-[box-shadow] duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#522C28]/15 shadow-xs w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-[transform,background-color,color,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#25100E] text-[#FAC537] shadow-xs"
                  : "text-[#522C28] hover:text-[#25100E] hover:bg-[#FFF3E3]"
              }`}
            >
              All Items ({productList.length + comboList.length})
            </button>
            <button
              onClick={() => setActiveFilter("flavours")}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-[transform,background-color,color,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 cursor-pointer ${
                activeFilter === "flavours"
                  ? "bg-[#25100E] text-[#FAC537] shadow-xs"
                  : "text-[#522C28] hover:text-[#25100E] hover:bg-[#FFF3E3]"
              }`}
            >
              Flavours ({productList.length})
            </button>
            <button
              onClick={() => setActiveFilter("combos")}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-[transform,background-color,color,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 cursor-pointer ${
                activeFilter === "combos"
                  ? "bg-[#25100E] text-[#FAC537] shadow-xs"
                  : "text-[#522C28] hover:text-[#25100E] hover:bg-[#FFF3E3]"
              }`}
            >
              Combos & Bundles ({comboList.length})
            </button>
          </div>

          {/* Results Summary + Sort Selector */}
          <div className="flex items-center gap-3 text-xs font-bold text-[#522C28]/70">
            <span>
              Showing{" "}
              <span className="font-black text-[#25100E]">
                {activeFilter === "all"
                  ? sortedProducts.length + sortedCombos.length
                  : activeFilter === "flavours"
                  ? sortedProducts.length
                  : sortedCombos.length}
              </span>{" "}
              tasty picks
            </span>
            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")
              }
              className="bg-white border border-[#522C28]/20 rounded-full px-3 py-1.5 text-xs font-black text-[#522C28] focus:outline-none focus:border-[#D73B3A]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>
      </section>

      {/* =========================================================================
          PRODUCT LISTINGS GRID
          ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* SECTION 1: COMBOS & VALUE BUNDLES (Shown if "all" or "combos") */}
        {(activeFilter === "all" || activeFilter === "combos") && (
          <section className="mb-14 sm:mb-20 rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#FFF5DE] via-[#FFF8EE] to-[#FFEEC4] border-2 sm:border-3 border-[#FAC537]/60 shadow-xl relative overflow-hidden">
            {/* Ambient Lighting & Texture */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FAC537]/25 blur-3xl pointer-events-none -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D73B3A]/10 blur-2xl pointer-events-none -ml-16 -mb-16" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-[#522C28]/15 gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D73B3A] text-white text-[11px] font-black uppercase tracking-widest mb-2 shadow-xs">
                  <span>🎁</span>
                  <span>VALUE BUNDLES & SAVINGS</span>
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#25100E] mt-0.5 tracking-tight">
                  Combos & Variety Bundles
                </h2>
              </div>
              <span className="text-xs font-black text-[#25100E] bg-[#FAC537] px-4 py-1.5 rounded-full border border-[#25100E]/15 shadow-xs self-start sm:self-auto">
                Save up to 22% on bundles
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {sortedCombos.map((combo) => (
                <div
                  key={combo.slug}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("button, a")) return;
                    recordFlavourClick(combo.slug);
                    router.push(`/product/${combo.slug}`);
                  }}
                  className="rounded-3xl bg-white border-2 border-[#522C28]/15 shadow-md hover:shadow-2xl transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 will-change-transform cursor-pointer"
                >
                  {/* Top Badge Strip */}
                  <div className="p-5 pb-0 flex items-start justify-between relative z-20">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#FFF8EE] text-[#25100E] text-[11px] font-black uppercase tracking-wider border border-[#25100E]/15">
                        {combo.badge}
                      </span>
                      {combo.savingsBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D73B3A] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                          {combo.savingsBadge}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void toggleFavorite(combo.slug);
                      }}
                      className="p-1.5 rounded-full bg-[#FFF8EE] border border-[#522C28]/15 hover:border-[#D73B3A] text-[#522C28] hover:text-[#D73B3A] transition-colors cursor-pointer"
                      title={isFavorite(combo.slug) ? "Remove from favorites" : "Save to favorites"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite(combo.slug) ? "fill-[#D73B3A] text-[#D73B3A]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Packet Showcase Image Stage with Responsive Background Wave Layer (Mobile + Desktop) */}
                  <Link
                    href={`/product/${combo.slug}`}
                    onClick={() => recordFlavourClick(combo.slug)}
                    className="relative h-56 sm:h-64 flex items-center justify-center p-4 my-2 overflow-hidden rounded-2xl mx-4 cursor-pointer group/stage block"
                  >
                    {/* Responsive Flavour Background Wave Layer (Mobile + Desktop) */}
                    {combo.bgSvg && (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <picture>
                          {combo.bgMobileSvg && (
                            <source
                              media="(max-width: 640px)"
                              srcSet={combo.bgMobileSvg}
                            />
                          )}
                          <img
                            src={combo.bgSvg}
                            alt={`${combo.name} background`}
                            className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </picture>
                        {/* Soft ambient gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    )}

                    <div
                      style={{ backgroundColor: combo.themeColor }}
                      className="absolute inset-8 rounded-full opacity-35 blur-2xl group-hover:opacity-50 transition-opacity"
                    />

                    {/* Balanced Variety Showcase */}
                    <div className="relative z-10 flex items-end justify-center h-48 sm:h-56 w-full pt-4">
                      {combo.secondaryImage && (
                        <img
                          src={combo.secondaryImage}
                          alt=""
                          className="h-38 sm:h-44 w-auto object-contain drop-shadow-md -rotate-[10deg] -mr-6 sm:-mr-8 translate-y-2 z-10 transition-transform duration-300 group-hover:-translate-x-1"
                        />
                      )}
                      <img
                        src={combo.packImage}
                        alt={combo.name}
                        className="h-44 sm:h-52 w-auto object-contain drop-shadow-xl z-20 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      <img
                        src="/packets/himalayan-salt.png"
                        alt=""
                        className="h-38 sm:h-44 w-auto object-contain drop-shadow-md rotate-[10deg] -ml-6 sm:-ml-8 translate-y-2 z-10 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>

                  {/* Details & Actions */}
                  <div className="p-5 sm:p-6 bg-[#FFF8EE]/60 border-t border-[#522C28]/10 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-black text-[#25100E]">{combo.rating}</span>
                        <span className="text-[11px] text-[#522C28]/60 font-semibold">
                          ({combo.reviewsCount} reviews)
                        </span>
                      </div>

                      <Link href={`/product/${combo.slug}`} onClick={() => recordFlavourClick(combo.slug)}>
                        <h3 className="font-display text-xl font-black uppercase text-[#25100E] hover:text-[#D73B3A] transition-colors leading-snug">
                          {combo.name}
                        </h3>
                      </Link>

                      <p className="text-xs font-bold text-[#D73B3A] mt-1">
                        {combo.tagline}
                      </p>

                      <p className="text-xs text-[#522C28]/80 font-medium mt-2 leading-relaxed line-clamp-2">
                        {combo.shortDesc}
                      </p>

                      {/* Included Flavour Pills */}
                      <div className="mt-3.5 pt-3 border-t border-[#522C28]/10 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#522C28]/70">
                          Inside the Box:
                        </span>
                        {combo.includedFlavours.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-bold text-[#25100E] flex items-center gap-1"
                          >
                            <span className="text-[#3CA837]">✔</span> {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="mt-5 pt-4 border-t border-[#522C28]/15 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-black text-[#25100E]">
                            ₹{combo.price}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#522C28]/70 font-semibold">
                          {combo.packCountText}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart({
                              variantId: combo.variantId,
                              slug: combo.slug,
                              name: combo.name,
                              variantLabel: combo.packCountText,
                              price: combo.price,
                              originalPrice: combo.originalPrice,
                              image: combo.packImage,
                            });
                          }}
                          className="px-4 py-2.5 rounded-full bg-[#25100E] text-[#FAC537] hover:bg-[#1A0A09] font-black text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ring-2 ring-[#FAC537]/50"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add Box</span>
                        </button>
                        <Link
                          href={`/product/${combo.slug}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            recordFlavourClick(combo.slug);
                          }}
                          className="px-3 py-2.5 rounded-full bg-white hover:bg-[#FFF8EE] text-[#25100E] border-2 border-[#25100E]/20 hover:border-[#25100E] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MID-PAGE INFINITE MARQUEE STRIP (Shown in "all" view to separate Combos & Flavours) */}
        {activeFilter === "all" && (
          <div className="my-10 sm:my-14 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
            <InfiniteAssetMarquee text="POP CULTURE" />
          </div>
        )}

        {/* SECTION 2: INDIVIDUAL SIGNATURE FLAVOURS (Shown if "all" or "flavours") */}
        {(activeFilter === "all" || activeFilter === "flavours") && (
          <section className="mb-14 sm:mb-20 rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#FFF9F2] via-[#FFF8EE] to-[#FFF1E8] border-2 sm:border-3 border-[#D73B3A]/30 shadow-xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D73B3A]/10 blur-3xl pointer-events-none -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#FAC537]/15 blur-3xl pointer-events-none -ml-16 -mb-16" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-[#522C28]/15 gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25100E] text-[#FAC537] text-[11px] font-black uppercase tracking-widest mb-2 shadow-xs">
                  <span>✦</span>
                  <span>100% SLOW ROASTED SIGNATURES</span>
                  <span>✦</span>
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#25100E] mt-0.5 tracking-tight">
                  Single Flavours & Packs
                </h2>
              </div>
              <span className="text-xs font-bold text-[#522C28]/80 bg-white/80 px-3.5 py-1.5 rounded-full border border-[#522C28]/15 shadow-xs self-start sm:self-auto">
                Choose 1 pouch, 3-pack, or 6-pack box
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {sortedProducts.map((product) => (
                <div
                  key={product.slug}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("button, a")) return;
                    recordFlavourClick(product.slug);
                    router.push(`/product/${product.slug}`);
                  }}
                  className="rounded-3xl bg-white border-2 border-[#522C28]/15 shadow-md hover:shadow-2xl transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 will-change-transform cursor-pointer"
                >
                  {/* Packet Showcase Image Stage with Official Snack Wave Background (Desktop & Mobile) */}
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => recordFlavourClick(product.slug)}
                    className="relative h-60 sm:h-68 flex items-center justify-center p-4 overflow-hidden cursor-pointer group/stage"
                  >
                    {/* Responsive Flavour Background Wave Layer (Mobile + Desktop) */}
                    {product.bgSvg && (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <picture>
                          {product.bgMobileSvg && (
                            <source
                              media="(max-width: 640px)"
                              srcSet={product.bgMobileSvg}
                            />
                          )}
                          <img
                            src={product.bgSvg}
                            alt={`${product.name} background`}
                            className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </picture>
                        {/* Soft ambient gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    )}

                    {/* Flavour theme glow */}
                    <div
                      style={{ backgroundColor: product.themeColor }}
                      className="absolute inset-8 rounded-full opacity-35 blur-2xl group-hover:opacity-50 transition-opacity"
                    />

                    {/* Top Floating Badge Strip over the background */}
                    <div className="absolute top-4 inset-x-4 flex items-start justify-between z-20">
                      <div className="flex items-center gap-1.5 pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#25100E] text-[11px] font-black uppercase tracking-wider border border-white/60 shadow-sm">
                          {product.badge}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>100% ROASTED</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void toggleFavorite(product.slug);
                        }}
                        className="p-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-white/60 text-[#522C28] hover:text-[#D73B3A] shadow-sm transition-colors cursor-pointer"
                        title={isFavorite(product.slug) ? "Remove from favorites" : "Save to favorites"}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite(product.slug) ? "fill-[#D73B3A] text-[#D73B3A]" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* 3D Pouch Image */}
                    <img
                      src={product.packImage}
                      alt={product.name}
                      className="relative z-10 h-44 sm:h-52 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] will-change-transform mt-6"
                    />
                  </Link>

                  {/* Details & Actions */}
                  <div className="p-5 sm:p-6 bg-[#FFF8EE]/60 border-t border-[#522C28]/10 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-black text-[#25100E]">4.9</span>
                        <span className="text-[11px] text-[#522C28]/60 font-semibold">
                          (420+ reviews)
                        </span>
                      </div>

                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-display text-2xl font-black uppercase text-[#25100E] hover:text-[#D73B3A] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs font-bold text-[#D73B3A] mt-1">
                        {product.tagline}
                      </p>

                      <p className="text-xs text-[#522C28]/80 font-medium mt-2 leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>

                      {/* Health Matrix Tag Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#522C28]/10">
                        {product.keyBenefits.slice(0, 3).map((benefit, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white border border-[#522C28]/10 text-[10px] font-bold text-[#25100E]"
                          >
                            ✦ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-[#522C28]/15">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-black text-[#25100E]">
                              ₹{product.pricing.single.price}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#522C28]/70 font-semibold">
                            {product.pricing.single.count} (Pack of 3: ₹{product.pricing.trio.price})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart({
                              variantId: product.variantIds.single,
                              slug: product.slug,
                              name: product.name,
                              variantLabel: product.pricing.single.label,
                              price: product.pricing.single.price,
                              originalPrice: product.pricing.single.originalPrice,
                              image: product.packImage,
                            });
                          }}
                          className="flex-1 py-2.5 rounded-full bg-[#25100E] text-[#FAC537] hover:bg-[#1A0A09] font-black text-xs uppercase tracking-wider shadow-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer ring-2 ring-[#FAC537]/50"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </button>

                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => recordFlavourClick(product.slug)}
                          className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF8EE] text-[#25100E] border-2 border-[#25100E]/20 hover:border-[#25100E] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            CUSTOM BUNDLE BUILDER TEASER BANNER
            ========================================================================= */}
        <section className="mt-16 sm:mt-24 rounded-3xl bg-gradient-to-br from-[#7D1212] via-[#B91C1C] to-[#5A0C0E] text-[#FFF8EE] p-6 sm:p-10 lg:p-12 relative overflow-hidden border-2 sm:border-3 border-[#FAC537] shadow-2xl">
          {/* Subtle Ambient Lighting and Dot Texture */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAC537]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/25 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAC537] text-[#25100E] text-[11px] font-black uppercase tracking-wider shadow-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#25100E]" />
                <span>Build Your Own Crunch Box</span>
              </span>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight tracking-tight">
                Want Custom <span className="text-[#FAC537]">Flavour Ratios?</span>
              </h3>

              <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 font-medium mt-3 leading-relaxed max-w-lg">
                Mix and match your favourite pouches in any ratio you love. Handpick 4, 6, or 12 packs and unlock an instant <strong className="text-[#FAC537] font-black">20% discount</strong> with free express delivery!
              </p>

              {/* 3 Value Pillars */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] sm:text-xs font-bold text-white/95">
                  <span className="text-[#FAC537]">✦</span> Any Flavour Combo
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] sm:text-xs font-bold text-white/95">
                  <span className="text-[#FAC537]">✦</span> Flat 20% Bundle Savings
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] sm:text-xs font-bold text-white/95">
                  <span className="text-[#FAC537]">✦</span> Free Express Shipping
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3.5 justify-center lg:justify-start w-full sm:w-auto">
                <Link
                  href="/build-a-box"
                  className="px-7 py-3.5 rounded-full bg-[#FAC537] hover:bg-[#FFE07D] text-[#25100E] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all inline-flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Build A Box & Save 20%</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={() => {
                    setActiveFilter("combos");
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 hover:border-white/50 backdrop-blur-xs transition-all inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Gift className="w-4 h-4 text-[#FAC537]" />
                  <span>View Pre-Made Combos</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column: Balanced 4-Flavour Fan Cluster */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              {/* Warm Backlight Halo */}
              <div className="absolute inset-0 m-auto w-52 sm:w-64 h-52 sm:h-64 bg-[#FAC537]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Floating Discount Tag */}
              <div className="absolute -top-2 right-4 sm:right-8 z-30 bg-[#25100E] text-[#FAC537] border-2 border-[#FAC537] px-3 py-1 rounded-full shadow-xl font-display text-[11px] sm:text-xs font-black uppercase tracking-wider -rotate-6 animate-pulse">
                ✦ 20% OFF ✦
              </div>

              {/* 4 Balanced Pouches */}
              <div className="relative flex items-end justify-center h-48 sm:h-56 lg:h-64 w-full max-w-sm sm:max-w-md">
                {/* 1. Cheddar Cheese */}
                <div className="relative -mr-6 sm:-mr-8 z-10 -rotate-12 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/cheddar-cheese.png"
                    alt="Cheddar Cheese"
                    className="h-32 sm:h-40 lg:h-48 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
                  />
                </div>

                {/* 2. Peri Peri */}
                <div className="relative -mr-5 sm:-mr-7 z-20 -rotate-4 -translate-y-2 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/peri-peri.png"
                    alt="Peri Peri"
                    className="h-36 sm:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* 3. Cream & Onion */}
                <div className="relative -mr-5 sm:-mr-7 z-30 rotate-3 -translate-y-2.5 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/cream-n-onion.png"
                    alt="Cream & Onion"
                    className="h-36 sm:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* 4. Himalayan Pink Salt */}
                <div className="relative z-10 rotate-12 transition-transform duration-300 hover:scale-110 hover:z-40">
                  <img
                    src="/packets/himalayan-salt.png"
                    alt="Himalayan Pink Salt"
                    className="h-32 sm:h-40 lg:h-48 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          BOTTOM STRAIGHT MARQUEE RIBBON
          ========================================================================= */}
      <InfiniteAssetMarquee text="POP CULTURE" />
    </div>
  );
}
