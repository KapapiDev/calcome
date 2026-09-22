import { headers } from "next/headers";

import { classifyGoogleConsentRegion } from "@/components/ads/privacy-region";

/**
 * The only genuinely request-scoped value left in the app: the visitor's
 * country, used to decide whether a Google-certified CMP is required.
 *
 * Isolating it in this handler keeps every page statically prerenderable.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const requestHeaders = await headers();
  const region = classifyGoogleConsentRegion(
    requestHeaders.get("x-vercel-ip-country"),
  );

  return Response.json(
    { region },
    {
      headers: {
        // Per-visitor answer; safe to reuse for the rest of the session.
        "Cache-Control": "private, max-age=3600",
      },
    },
  );
}
