"use client";

import React, { useState } from "react";
import { X, Sparkles, Loader2, ArrowRight, Check, ShieldCheck, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth, type AuthUser } from "./AuthContext";
import { launchGoogleSignIn } from "@/lib/supabaseBrowser";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: AuthUser) => void;
  title?: string;
  subtitle?: string;
  intent?: "checkout" | "game" | "general";
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  subtitle,
  intent = "general",
}: AuthModalProps) {
  const { refreshUser } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const defaultTitle =
    intent === "checkout"
      ? "Sign In To Checkout"
      : intent === "game"
      ? "Login & Compete For Prizes"
      : "Welcome to Pop Culture";

  const defaultSubtitle =
    intent === "checkout"
      ? "Sign in with Google or Email to track your order live, get WhatsApp delivery updates, and save your favorites."
      : intent === "game"
      ? "Save your high score on the Monthly Leaderboard. Top scorers win free Pop Culture crunch boxes!"
      : "Access order updates, track shipments, and unlock exclusive member perks.";

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      // In checkout or game, we want to stay on current page or redirect back
      const returnUrl = typeof window !== "undefined" ? window.location.href : "/account";
      const res = await launchGoogleSignIn(returnUrl);
      if (res.ok && res.user && onSuccess) {
        onSuccess(res.user as AuthUser);
        onClose();
        return;
      }
      if (!res.ok) {
        setError(res.error || "Google Sign-In failed. Please try again.");
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed launching Google Sign-In.");
      setGoogleLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setForgotSuccess(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed sending reset link.");
        setLoading(false);
        return;
      }
      setForgotSuccess(
        data.message || "Password reset link sent! Check your inbox."
      );
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login" ? { email, password } : { email, password, fullName, phone };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const freshUser = await refreshUser();
      setLoading(false);
      onClose();
      if (freshUser && onSuccess) {
        onSuccess(freshUser);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#FFF8EE] rounded-3xl border-2 border-[#25100E] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 border border-[#522C28]/20 flex items-center justify-center text-[#522C28] hover:bg-[#25100E] hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pt-7 px-6 pb-4 text-center border-b border-[#522C28]/10 bg-white/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E53925]/10 text-[#E53925] text-[11px] font-black uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFCD3C] fill-[#FFCD3C]" />
            <span>CRUNCH CLUB ACCOUNT</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#25100E]">
            {title || defaultTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#522C28]/80 font-medium mt-1 leading-snug">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary Preferred Option: One-Click Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-[#25100E] font-extrabold text-sm border-2 border-[#522C28]/20 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#D73B3A]" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                {/* SVG Google 'G' Mark */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#522C28]/15" />
            </div>
            <span className="relative px-3 bg-[#FFF8EE] text-[11px] font-black uppercase tracking-wider text-[#522C28]/60">
              Or with email & password
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#522C28]/80 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#522C28]/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#522C28]/20 text-xs sm:text-sm font-semibold text-[#25100E] focus:outline-none focus:border-[#D73B3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#522C28]/80 mb-1">
                    Phone Number (for delivery tracking)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#522C28]/40" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#522C28]/20 text-xs sm:text-sm font-semibold text-[#25100E] focus:outline-none focus:border-[#D73B3A]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#522C28]/80 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#522C28]/40" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#522C28]/20 text-xs sm:text-sm font-semibold text-[#25100E] focus:outline-none focus:border-[#D73B3A]"
                />
              </div>
            </div>

            {mode === "forgot" ? (
              <div>
                <p className="text-xs text-[#522C28]/80 font-medium mb-3">
                  Enter your email address and we will send you a secure link to reset your password.
                </p>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleForgotSubmit}
                  className="w-full mt-2 py-3 rounded-2xl bg-[#D73B3A] hover:bg-[#FB0008] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : null}
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {forgotSuccess && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                    {forgotSuccess}
                  </div>
                )}
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setForgotSuccess(null);
                    }}
                    className="text-xs font-bold text-[#522C28]/70 hover:text-[#D73B3A] cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#522C28]/80">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setError(null);
                          setForgotSuccess(null);
                        }}
                        className="text-[10px] font-bold text-[#D73B3A] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#522C28]/40" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#522C28]/20 text-xs sm:text-sm font-semibold text-[#25100E] focus:outline-none focus:border-[#D73B3A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full mt-2 py-3 rounded-2xl bg-[#25100E] hover:bg-[#1A0A09] text-[#FFCD3C] font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFCD3C]" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === "login" ? "Sign In & Continue" : "Create Account & Continue"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Toggle Login / Register */}
          {mode !== "forgot" && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode((m) => (m === "login" ? "register" : "login"));
                  setError(null);
                  setForgotSuccess(null);
                }}
                className="text-xs font-bold text-[#D73B3A] hover:underline cursor-pointer"
              >
                {mode === "login"
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Sign in here"}
              </button>
            </div>
          )}

          {/* Benefits bullets */}
          <div className="mt-5 pt-4 border-t border-[#522C28]/10 flex items-center justify-around text-[10px] font-mono font-bold text-[#522C28]/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live WhatsApp Updates</span>
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#3CA837]" />
              <span>100% Free Shipping</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
