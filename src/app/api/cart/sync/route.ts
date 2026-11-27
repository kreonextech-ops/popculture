import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/customerAuth";
import { readStore, writeStore, type CustomerCartItem } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ ok: true, synced: false, reason: "guest" });
    }

    const body = (await req.json()) as { items?: CustomerCartItem[] };
    const items = Array.isArray(body.items) ? body.items : [];

    const store = readStore();
    const idx = store.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      store.users[idx].cartItems = items;
      store.users[idx].cartUpdatedAt = new Date().toISOString();
      writeStore(store);
    }

    return NextResponse.json({ ok: true, synced: true, count: items.length });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Sync failed" },
      { status: 500 }
    );
  }
}
