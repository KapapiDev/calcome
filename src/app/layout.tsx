import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

import { PrivacyControl } from "@/components/ads/privacy-control";
import { classifyGoogleConsentRegion } from "@/components/ads/privacy-region";
import { getAdSenseRuntimeConfig } from "@/components/ads/adsense";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { themeInitializationScript } from "@/components/theme/theme-provider";
import { siteConfig } from "@/config/site";
import { localizedSeoPaths, socialLocale } from "@/lib/seo/metadata";

import "./globals.css";

export function createRootMetadata(pathname: string): Metadata {
  const seo = localizedSeoPaths(pathname);
  const social = socialLocale(seo.locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} - ${siteConfig.slogan}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    category: "finance",
    alternates: {
      canonical: seo.canonical,
      languages: seo.languages,
    },
    openGraph: {
      type: "website",
      locale: social.locale,
      alternateLocale: social.alternateLocale,
      siteName: siteConfig.name,
      title: `${siteConfig.name} - ${siteConfig.slogan}`,
      description: siteConfig.description,
      url: seo.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} - ${siteConfig.slogan}`,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      other: {
        "naver-site-verification": [
          "61d4b932c5e6b51be3b7221317d9f6e71ac9343a",
          "a29b19e1e2434d8a1f3165e813e4abfbf791bf23",
        ],
      },
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-calcome-pathname") ?? "/ko";

  return createRootMetadata(pathname);
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#171820" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-calcome-locale") === "en" ? "en" : "ko";
  const pathname = requestHeaders.get("x-calcome-pathname") ?? "/";
  const adsense = getAdSenseRuntimeConfig();
  const privacyRegion = adsense.enabled
    ? classifyGoogleConsentRegion(requestHeaders.get("x-vercel-ip-country"))
    : null;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        {adsense.enabled && adsense.clientId ? (
          <script
            async
            crossOrigin="anonymous"
            data-ad-runtime-status={adsense.status}
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.clientId}`}
          />
        ) : null}
      </head>
      <body
        className="min-h-screen bg-background font-sans text-foreground antialiased"
        data-ad-runtime-status={adsense.status}
      >
        <SkipLink locale={locale} />
        <div className="flex min-h-screen flex-col">
          <SiteHeader locale={locale} pathname={pathname} />
          {children}
          <RelatedCalculators locale={locale} pathname={pathname} />
          <SiteFooter locale={locale} />
        </div>
        {privacyRegion ? (
          <PrivacyControl locale={locale} region={privacyRegion} />
        ) : null}
      </body>
    </html>
  );
}
