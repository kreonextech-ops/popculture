import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/customerAuth";
import { readStore, writeStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { flavourSlug?: string };
    const slug = (body.flavourSlug || "").trim().toLowerCase();
    if (!slug) {
      return NextResponse.json({ ok: false, error: "Missing flavourSlug" }, { status: 400 });
    }

    const store = readStore();
    if (!store.flavourClicks) {
      store.flavourClicks = {};
    }
    store.flavourClicks[slug] = (store.flavourClicks[slug] || 0) + 1;

    const user = await getCurrentUser();
    if (user) {
      const idx = store.users.findIndex((u) => u.id === user.id);
      if (idx >= 0) {
        const u = store.users[idx];
        if (!u.flavourClicks) u.flavourClicks = {};
        u.flavourClicks[slug] = (u.flavourClicks[slug] || 0) + 1;

        // Recalculate most clicked flavour
        let topFlavour = slug;
        let topCount = 0;
        for (const [fSlug, count] of Object.entries(u.flavourClicks)) {
          if (count > topCount) {
            topCount = count;
            topFlavour = fSlug;
          }
        }
        u.mostClickedFlavour = topFlavour;
      }
    }

    writeStore(store);
    return NextResponse.json({ ok: true, slug, totalClicks: store.flavourClicks[slug] });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Click record failed" },
      { status: 500 }
    );
  }
}
