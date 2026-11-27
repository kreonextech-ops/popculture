import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedBrowserClient: SupabaseClient | null = null;
let cachedConfigPromise: Promise<{ url: string; anonKey: string } | null> | null = null;
const inflightSyncs = new Map<string, Promise<unknown>>();

function buildBrowserClient(url: string, anonKey: string): SupabaseClient {
  if (!cachedBrowserClient) {
    cachedBrowserClient = createClient(url, anonKey, {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return cachedBrowserClient;
}

export function getSupabaseBrowser(): SupabaseClient | null {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  if (!url || !anonKey) return null;
  return buildBrowserClient(url, anonKey);
}

/**
 * Resolves the browser Supabase client synchronously from inlined NEXT_PUBLIC_*
 * env vars when available, or falls back to /api/auth/public-config at runtime.
 */
export async function getSupabaseBrowserAsync(): Promise<SupabaseClient | null> {
  const syncClient = getSupabaseBrowser();
  if (syncClient) return syncClient;

  if (typeof window === "undefined") return null;

  if (!cachedConfigPromise) {
    cachedConfigPromise = fetch("/api/auth/public-config", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.url && data?.anonKey) {
          return { url: String(data.url), anonKey: String(data.anonKey) };
        }
        return null;
      })
      .catch(() => null);
  }

  const cfg = await cachedConfigPromise;
  if (!cfg) {
    cachedConfigPromise = null;
    return null;
  }

  return buildBrowserClient(cfg.url, cfg.anonKey);
}

function parseHashAccessToken(): string | null {
  if (typeof window === "undefined" || !window.location.hash) return null;
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return hashParams.get("access_token");
}

function cleanOAuthParamsFromUrl(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const keysToDelete = [
    "code",
    "state",
    "error",
    "error_code",
    "error_description",
    "sb_flow_id",
  ];
  let changed = false;
  for (const k of keysToDelete) {
    if (url.searchParams.has(k)) {
      url.searchParams.delete(k);
      changed = true;
    }
  }
  if (url.hash && url.hash.includes("access_token")) {
    url.hash = "";
    changed = true;
  }
  if (changed) {
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }
}

export async function syncSupabaseAccessToken<T = unknown>(
  accessToken: string
): Promise<T | null> {
  const res = await fetch("/api/auth/oauth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: accessToken }),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) {
    throw new Error(json.error || "Failed creating account session.");
  }
  return (json.user as T) || null;
}

/**
 * Helper to generate random raw nonce string.
 */
function generateRawNonce(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Computes SHA-256 hex hash of the raw nonce using browser Web Crypto API.
 */
async function hashNonce(nonce: string): Promise<string> {
  if (
    typeof crypto !== "undefined" &&
    crypto.subtle &&
    typeof crypto.subtle.digest === "function"
  ) {
    const encoder = new TextEncoder();
    const data = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return nonce;
}

/**
 * Signs in with a Google ID Token directly (Google Identity Services / One Tap).
 * This completely bypasses redirecting through the Supabase domain, keeping the user
 * on the branded Pop Culture domain and showing "Sign in to Pop Culture with Google".
 */
export async function signInWithGoogleIdToken<T = unknown>(
  idToken: string,
  rawNonce?: string
): Promise<{
  ok: boolean;
  user?: T | null;
  error?: string;
}> {
  const supabase = await getSupabaseBrowserAsync();
  if (!supabase) {
    return { ok: false, error: "Supabase client not initialized." };
  }

  let res = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
    ...(rawNonce ? { nonce: rawNonce } : {}),
  });

  // If Supabase rejected because of nonce mismatch (e.g. Skip nonce checks toggled on or off)
  if (res.error && res.error.message.toLowerCase().includes("nonce")) {
    if (rawNonce) {
      // Try once without nonce parameter
      const retryWithoutNonce = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });
      if (!retryWithoutNonce.error) {
        res = retryWithoutNonce;
      }
    }
  }

  if (res.error) {
    return { ok: false, error: res.error.message };
  }

  if (res.data?.session?.access_token) {
    const user = await syncSupabaseAccessToken<T>(res.data.session.access_token);
    return { ok: true, user };
  }

  return { ok: true, user: null };
}

/**
 * Triggers Google Sign-In: uses Google Identity Services (One Tap / popup)
 * when available so users see "Sign in to Pop Culture" on the local domain,
 * completely bypassing the raw "hoxdfbawldqiyxuaoawj.supabase.co" domain.
 * Seamlessly falls back to standard startGoogleOAuth if GIS is not loaded.
 */
export async function launchGoogleSignIn(nextUrl = "/account"): Promise<{
  ok: boolean;
  navigated?: boolean;
  user?: unknown;
  url?: string;
  error?: string;
}> {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { google?: { accounts?: { id?: unknown } } }).google?.accounts?.id
  ) {
    const googleId = (
      window as unknown as {
        google: {
          accounts: {
            id: {
              initialize: (opts: unknown) => void;
              prompt: (cb?: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
            };
          };
        };
      }
    ).google.accounts.id;

    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "126179482540-kv1d3ncegeggr2bkicmvo7763074g41d.apps.googleusercontent.com";

    const rawNonce = generateRawNonce();
    let hashedNonce = "";
    try {
      hashedNonce = await hashNonce(rawNonce);
    } catch {
      hashedNonce = "";
    }

    return new Promise((resolve) => {
      let resolved = false;

      try {
        googleId.initialize({
          client_id: clientId,
          ...(hashedNonce ? { nonce: hashedNonce } : {}),
          callback: async (response: { credential?: string }) => {
            if (resolved) return;
            resolved = true;
            if (!response.credential) {
              resolve({ ok: false, error: "Google did not return an ID token." });
              return;
            }
            const res = await signInWithGoogleIdToken(
              response.credential,
              hashedNonce ? rawNonce : undefined
            );
            if (res.ok) {
              if (nextUrl && typeof window !== "undefined") {
                window.location.assign(nextUrl);
                resolve({ ok: true, navigated: true, user: res.user });
              } else {
                resolve({ ok: true, navigated: false, user: res.user });
              }
            } else {
              resolve({ ok: false, error: res.error });
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        googleId.prompt((notification) => {
          if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
            if (!resolved) {
              resolved = true;
              void startGoogleOAuth(nextUrl).then(resolve);
            }
          }
        });
      } catch {
        if (!resolved) {
          resolved = true;
          void startGoogleOAuth(nextUrl).then(resolve);
        }
      }
    });
  }

  return startGoogleOAuth(nextUrl);
}

/**
 * Initiates Google OAuth via Supabase and breaks out of preview iframes safely.
 */
export async function startGoogleOAuth(nextUrl = "/account"): Promise<{
  ok: boolean;
  url?: string;
  navigated?: boolean;
  error?: string;
}> {
  const supabase = await getSupabaseBrowserAsync();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Google Sign-In needs NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY configured.",
    };
  }

  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
    nextUrl
  )}`;
  const { data, error: oauthErr } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
      queryParams: { prompt: "select_account" },
    },
  });

  if (oauthErr) {
    return { ok: false, error: oauthErr.message };
  }

  const targetUrl = data?.url;
  if (!targetUrl) {
    return {
      ok: false,
      error: "Supabase did not return a Google login URL. Check Auth Providers -> Google.",
    };
  }

  const inIframe = window.self !== window.top;
  if (inIframe) {
    try {
      if (window.top) {
        window.top.location.href = targetUrl;
        return { ok: true, url: targetUrl, navigated: true };
      }
    } catch {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      return { ok: true, url: targetUrl, navigated: false };
    }
  }

  window.location.assign(targetUrl);
  return { ok: true, url: targetUrl, navigated: true };
}

/**
 * Completes Google OAuth whether Supabase redirected to /auth/callback OR fell back
 * to the main site URL (/) with ?code=... or #access_token=... or an active Supabase session.
 */
export async function completeOAuthIfNeeded<T = unknown>(options?: {
  explicitCode?: string | null;
  cleanUrl?: boolean;
  throwOnMissingSession?: boolean;
}): Promise<T | null> {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const code = options?.explicitCode !== undefined ? options.explicitCode : urlParams.get("code");
  const hashToken = parseHashAccessToken();
  const hasOAuthParams = Boolean(code || hashToken);
  const key = code || hashToken || "supabase_existing_session";

  const existing = inflightSyncs.get(key);
  if (existing) return existing as Promise<T | null>;

  const task = (async (): Promise<T | null> => {
    const supabase = await getSupabaseBrowserAsync();
    if (!supabase) {
      if (options?.throwOnMissingSession) {
        throw new Error("Supabase browser configuration is missing.");
      }
      return null;
    }

    // 1. Wait for Supabase client initialization (which auto-handles detectSessionInUrl)
    let { data: sessData } = await supabase.auth.getSession();

    // 2. If URL had ?code= and session isn't resolved yet, exchange PKCE code once
    if (!sessData.session && code) {
      const { data: exData, error: exErr } = await supabase.auth.exchangeCodeForSession(code);
      if (exErr) {
        const retry = await supabase.auth.getSession();
        if (retry.data.session) {
          sessData = retry.data;
        } else if (options?.throwOnMissingSession || hasOAuthParams) {
          throw new Error(exErr.message);
        }
      } else {
        sessData = { session: exData.session };
      }
    }

    const accessToken = sessData.session?.access_token || hashToken;
    if (!accessToken) {
      if (options?.throwOnMissingSession) {
        throw new Error("Could not complete Google Sign-In session. Please try again.");
      }
      return null;
    }

    const user = await syncSupabaseAccessToken<T>(accessToken);
    if (options?.cleanUrl !== false) {
      cleanOAuthParamsFromUrl();
    }
    return user;
  })();

  inflightSyncs.set(key, task);
  try {
    return await task;
  } finally {
    setTimeout(() => inflightSyncs.delete(key), 5000);
  }
}

export async function signOutSupabaseBrowser(): Promise<void> {
  try {
    const supabase = await getSupabaseBrowserAsync();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch {
    // Non-fatal
  }
}
