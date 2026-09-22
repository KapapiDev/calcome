import type { Metadata, Viewport } from "next";

import { PrivacyControl } from "@/components/ads/privacy-control";
import { getAdSenseRuntimeConfig } from "@/components/ads/adsense";
import { DocumentLanguage } from "@/components/layout/document-language";
import { themeInitializationScript } from "@/components/theme/theme-provider";
import { siteConfig } from "@/config/site";
import { localizedSeoPaths, socialLocale } from "@/lib/seo/metadata";

import "./globals.css";

/**
 * Applied synchronously before first paint so `/en/*` documents report the
 * right language without making the layout request-dependent. Soft
 * navigations are handled afterwards by <DocumentLanguage />.
 */
const documentLanguageScript = `(function(){try{var p=window.location.pathname;document.documentElement.lang=(p==="/en"||p.indexOf("/en/")===0)?"en":"ko";}catch(e){}})();`;

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

/**
 * Static defaults. Every route below this layout sets its own
 * `alternates.canonical`/`languages`, which override these, so the root no
 * longer needs the request pathname to emit correct SEO metadata.
 */
export const metadata: Metadata = createRootMetadata("/ko");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#171820" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsense = getAdSenseRuntimeConfig();

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <script dangerouslySetInnerHTML={{ __html: documentLanguageScript }} />
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
        <DocumentLanguage />
        {children}
        {adsense.enabled ? <PrivacyControl /> : null}
      </body>
    </html>
  );
}
