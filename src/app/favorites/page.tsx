"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  LogIn,
  Check,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import InfiniteAssetMarquee from "@/components/InfiniteAssetMarquee";
import { useAuth } from "@/components/AuthContext";
import { useCart } from "@/components/CartContext";
import { PRODUCTS, COMBOS } from "@/data/products";
import { launchGoogleSignIn } from "@/lib/supabaseBrowser";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading, toggleFavorite, isFavorite } = useAuth();
  const { addItem } = useCart();
  const [googleBusy, setGoogleBusy] = React.useState(false);

  const getFavoriteProduct = (slug: string) => {
    const p = Object.values(PRODUCTS).find((item) => item.slug === slug);
    if (p) {
      return {
        slug: p.slug,
        name: p.name,
        badge: p.badge,
        tagline: p.tagline,
        packImage: p.packImage,
        price: p.pricing.single.price,
        packText: p.pricing.single.count,
        variantId: p.variantIds.single,
        isCombo: false,
      };
    }
    const c = Object.values(COMBOS).find((item) => item.slug === slug);
    if (c) {
      return {
        slug: c.slug,
        name: c.name,
        badge: c.badge,
        tagline: c.tagline,
        packImage: c.packImage,
        price: c.price,
        packText: c.packCountText,
        variantId: c.variantId,
        isCombo: true,
      };
    }
    return null;
  };

  const handleAddFavoriteToCart = (item: NonNullable<ReturnType<typeof getFavoriteProduct>>) => {
    addItem(
      {
        variantId: item.variantId,
        slug: item.slug,
        name: item.name,
        variantLabel: item.packText,
        price: item.price,
        image: item.packImage,
      },
      1,
      true
    );
  };

  const handleGoogleLogin = async () => {
    setGoogleBusy(true);
    try {
      await launchGoogleSignIn("/favorites");
    } finally {
      setGoogleBusy(false);
    }
  };

  const favoriteItems = (user?.favorites || [])
    .map((slug) => getFavoriteProduct(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getFavoriteProduct>> => item !== null);

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#25100E] flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16 border-b-2 border-[#25100E] bg-gradient-to-b from-[#FFF8EE] via-[#FFEECB]/40 to-[#FFF8EE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D73B3A]/10 border border-[#D73B3A]/20 text-[#D73B3A] text-xs font-black uppercase tracking-widest mb-3">
                <Heart className="w-3.5 h-3.5 fill-[#D73B3A]" />
                <span>YOUR HANDPICKED CRAVINGS</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#25100E] leading-none">
                MY <span className="text-[#D73B3A]">FAVORITES</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#522C28]/80 font-medium max-w-xl">
                Quick-order your saved slow-roasted snacks and curated combos in 1 tap.
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-3">
              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-full bg-[#25100E] hover:bg-black text-[#FAC537] text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse All Snacks</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {loading ? (
          <div className="py-20 text-center font-black uppercase text-xs text-[#522C28]/60">
            Loading your favorites...
          </div>
        ) : !user ? (
          /* Logged out state */
          <div className="max-w-lg mx-auto bg-white rounded-3xl border-2 border-[#522C28]/15 p-8 text-center shadow-md space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-[#D73B3A] flex items-center justify-center">
              <Heart className="w-8 h-8 fill-[#D73B3A]" />
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase text-[#25100E]">
                Sign In to View Your Favorites
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70 mt-1">
                Log in with Google to sync your saved snacks across mobile and desktop and reorder in seconds!
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleBusy}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-neutral-50 text-[#25100E] font-black text-xs uppercase tracking-wider border-2 border-[#522C28]/20 flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{googleBusy ? "Opening Google Sign-In..." : "Continue with Google"}</span>
              </button>

              <Link
                href="/login?redirect=/favorites"
                className="w-full py-2.5 px-4 rounded-full bg-[#FFF8EE] hover:bg-[#FFEECB] text-[#522C28] font-bold text-xs uppercase tracking-wider border border-[#522C28]/15 flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Email Sign In</span>
              </Link>
            </div>
          </div>
        ) : favoriteItems.length === 0 ? (
          /* Empty state */
          <div className="max-w-md mx-auto text-center bg-white rounded-3xl border-2 border-[#522C28]/15 p-10 shadow-md space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-[#D73B3A] flex items-center justify-center">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-display text-2xl uppercase text-[#25100E]">
              No Favorites Saved Yet
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70 leading-relaxed">
              Tap the heart icon on any snack pouch or bundle box in our shop to curate your personal crunch collection right here!
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D73B3A] hover:bg-[#c9302f] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <span>Explore Snacks & Add Favorites</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <div
                key={item.slug}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button, a")) return;
                  router.push(`/product/${item.slug}`);
                }}
                className="bg-white rounded-3xl border-2 border-[#522C28]/15 hover:border-[#D73B3A]/40 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group p-5 sm:p-6 cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#FFF8EE] border border-[#522C28]/15 text-[10px] sm:text-xs font-black uppercase text-[#25100E]">
                      {item.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        void toggleFavorite(item.slug);
                      }}
                      className="p-2 rounded-full bg-rose-50 border border-rose-200 text-[#D73B3A] hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-[#D73B3A]" />
                    </button>
                  </div>

                  <Link
                    href={`/product/${item.slug}`}
                    className="h-44 sm:h-48 flex items-center justify-center py-2 group-hover:scale-105 transition-transform duration-300 block cursor-pointer"
                  >
                    <img
                      src={item.packImage}
                      alt={item.name}
                      className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    />
                  </Link>

                  <div className="mt-4">
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="font-display text-lg sm:text-xl uppercase text-[#25100E] hover:text-[#D73B3A] transition-colors leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-[#522C28]/65 mt-0.5 line-clamp-1">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#522C28]/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#522C28]/60 uppercase block">
                      {item.packText}
                    </span>
                    <span className="font-display text-xl sm:text-2xl text-[#25100E] font-black">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFavoriteToCart(item);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#25100E] hover:bg-black text-[#FAC537] hover:text-white font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edge-to-edge Marquee above footer */}
      <InfiniteAssetMarquee text="THE COOLEST WAY TO SNACK BETTER" />
    </div>
  );
}
