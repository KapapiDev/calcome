import {
  createGoogleAdsTxtRecord,
  getAdSenseRuntimeConfig,
} from "@/components/ads/adsense";

// publisherId comes from process.env only, which is fixed for the lifetime of
// a deployment, so this can be baked at build time instead of per request.
export const dynamic = "force-static";

export function GET() {
  const config = getAdSenseRuntimeConfig();

  if (!config.enabled || !config.publisherId) {
    return new Response("Not Found\n", {
      status: 404,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Content-Type": "text/plain; charset=utf-8",
        "X-CalCome-AdSense-Status": config.status,
      },
    });
  }

  return new Response(`${createGoogleAdsTxtRecord(config.publisherId)}\n`, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "text/plain; charset=utf-8",
      "X-CalCome-AdSense-Status": config.status,
    },
  });
}
