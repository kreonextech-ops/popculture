import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { verifyPasswordResetToken, hashPassword } from "@/lib/customerAuth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = (await req.json()) as {
      token?: string;
      newPassword?: string;
    };

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid password reset token." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const payload = verifyPasswordResetToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Your password reset link has expired or is invalid. Please request a new one.",
        },
        { status: 400 }
      );
    }

    const store = readStore();
    const userIdx = store.users.findIndex(
      (u) =>
        u.id === payload.uid || u.email.toLowerCase() === payload.email.toLowerCase()
    );
    const newHash = hashPassword(newPassword);
    const now = new Date().toISOString();

    if (userIdx >= 0) {
      store.users[userIdx].passwordHash = newHash;
      store.users[userIdx].updatedAt = now;
      writeStore(store);
    }

    if (isSupabaseConfigured()) {
      const sb = getSupabaseAdmin();
      if (sb) {
        try {
          await sb.auth.admin.updateUserById(payload.uid, {
            password: newPassword,
          });
        } catch {
          // Non-blocking if account was created outside Supabase GoTrue
        }
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Your password has been reset successfully! You can now sign in with your new password.",
    });
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "Failed resetting password.";
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
