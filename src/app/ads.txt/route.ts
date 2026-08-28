import {
  createGoogleAdsTxtRecord,
  getAdSenseRuntimeConfig,
} from "@/components/ads/adsense";

export const dynamic = "force-dynamic";

export function GET() {
  const config = getAdSenseRuntimeConfig();

  if (!config.enabled || !config.publisherId) {
    return new Response("Not Found\n", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
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
