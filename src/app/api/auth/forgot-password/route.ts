import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { createPasswordResetToken } from "@/lib/customerAuth";
import { sendMail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const store = readStore();
    let user = store.users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user && isSupabaseConfigured()) {
      const sb = getSupabaseAdmin();
      if (sb) {
        const { data: prof } = await sb
          .from("profiles")
          .select("*")
          .eq("email", cleanEmail)
          .single();
        if (prof) {
          user = {
            id: prof.id,
            email: prof.email,
            fullName: prof.full_name || "Valued Customer",
            phone: prof.phone || "",
            passwordHash: prof.password_hash || "",
            role: "customer",
            createdAt: prof.created_at,
            updatedAt: prof.updated_at,
            gameHighScore: prof.game_high_score || 0,
            totalRuns: prof.total_runs || 0,
            totalDistance: prof.total_distance || 0,
            loyaltyPoints: 0,
          };
        }
      }
    }

    // Generic safe response even if email not found to prevent user enumeration
    if (!user) {
      return NextResponse.json({
        ok: true,
        message:
          "If an account with that email exists, a password reset link has been dispatched to your inbox.",
      });
    }

    const resetToken = createPasswordResetToken(user.id, user.email);
    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "localhost:3001";
    const proto = req.headers.get("x-forwarded-proto") || "http";
    const resetUrl = `${proto}://${host}/reset-password?token=${encodeURIComponent(
      resetToken
    )}`;

    await sendMail({
      to: user.email,
      subject: "Reset your Pop Culture password",
      eventTag: "PASSWORD_RESET_EMAIL",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #FFF8EE; border: 2px solid #522C28; border-radius: 24px; color: #25100E;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #D73B3A; font-size: 28px; margin: 0; font-weight: 900; letter-spacing: -0.5px;">POP CULTURE</h1>
            <p style="color: #522C28; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; font-weight: 800; letter-spacing: 1px;">The Coolest Way To Snack Better</p>
          </div>
          
          <div style="background: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid rgba(82, 44, 40, 0.15);">
            <h2 style="margin: 0 0 12px; font-size: 18px; color: #25100E;">Reset Your Password</h2>
            <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.5; color: #522C28;">
              Hi <strong>${user.fullName || "Crunch Fan"}</strong>,<br/><br/>
              We received a request to reset your Pop Culture customer account password. Click the button below to choose a new password:
            </p>
            
            <div style="text-align: center; margin: 24px 0;">
              <a href="${resetUrl}" style="background: #D73B3A; color: #ffffff; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
                Reset Password →
              </a>
            </div>
            
            <p style="margin: 0; font-size: 12px; color: #522C28; opacity: 0.7; line-height: 1.4;">
              This link is valid for <strong>1 hour</strong>. If you didn't ask to reset your password, you can safely ignore this email — your account remains secure.
            </p>
          </div>
          
          <p style="text-align: center; margin-top: 24px; font-size: 11px; color: #522C28; opacity: 0.6;">
            Pop Culture Snacks • Freshly Roasted Makhana
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message:
        "If an account with that email exists, a password reset link has been dispatched to your inbox.",
    });
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "Failed processing reset request.";
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
