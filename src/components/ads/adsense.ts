const PUBLISHER_ID_PATTERN = /^pub-\d{16}$/;

export type AdSenseRuntimeStatus =
  | "enabled"
  | "non-production"
  | "missing-publisher-id"
  | "invalid-publisher-id";

export type AdSenseRuntimeConfig = {
  enabled: boolean;
  status: AdSenseRuntimeStatus;
  publisherId: string | null;
  clientId: string | null;
};

type AdSenseEnvironment = {
  vercelEnv?: string;
  nodeEnv?: string;
  publisherId?: string;
};

export function normalizeAdSensePublisherId(value?: string) {
  const normalized = value?.trim().replace(/^ca-/, "") ?? "";
  return PUBLISHER_ID_PATTERN.test(normalized) ? normalized : null;
}

export function getAdSenseRuntimeConfig(
  env: AdSenseEnvironment = {
    vercelEnv: process.env.VERCEL_ENV,
    nodeEnv: process.env.NODE_ENV,
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID,
  },
): AdSenseRuntimeConfig {
  const isProduction = env.vercelEnv
    ? env.vercelEnv === "production"
    : env.nodeEnv === "production";

  if (!isProduction) {
    return {
      enabled: false,
      status: "non-production",
      publisherId: null,
      clientId: null,
    };
  }

  const publisherId = normalizeAdSensePublisherId(env.publisherId);
  if (!publisherId) {
    return {
      enabled: false,
      status: env.publisherId ? "invalid-publisher-id" : "missing-publisher-id",
      publisherId: null,
      clientId: null,
    };
  }

  return {
    enabled: true,
    status: "enabled",
    publisherId,
    clientId: `ca-${publisherId}`,
  };
}

export function createGoogleAdsTxtRecord(publisherId: string) {
  const normalized = normalizeAdSensePublisherId(publisherId);
  if (!normalized) {
    throw new Error("Invalid AdSense publisher ID");
  }

  return `google.com, ${normalized}, DIRECT, f08c47fec0942fa0`;
}
