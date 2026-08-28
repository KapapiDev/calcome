const ORIGIN = process.env.CALCOME_ORIGIN ?? "https://www.calcome.com";
const REQUEST_TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;
const MIN_EXPECTED_SITEMAP_URLS = 212;

function normalizeUrl(value) {
  const url = new URL(value);
  const pathname =
    url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");

  return `${url.origin}${pathname}`;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    decodeXml(match[1].trim()),
  );
}

function parseAttributes(tag) {
  const attributes = new Map();

  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*["']([^"']*)["']/g)) {
    attributes.set(match[1].toLowerCase(), match[2]);
  }

  return attributes;
}

function extractLinkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map((match) =>
    parseAttributes(match[0]),
  );
}

function extractMetaTags(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) =>
    parseAttributes(match[0]),
  );
}

function hasNoIndex(html) {
  return extractMetaTags(html).some((attributes) => {
    const name = attributes.get("name")?.toLowerCase();
    const content = attributes.get("content")?.toLowerCase() ?? "";

    return name === "robots" && content.includes("noindex");
  });
}

function verifyDocumentSeo(url, html) {
  const linkTags = extractLinkTags(html);
  const canonicalLinks = linkTags.filter((attributes) =>
    (attributes.get("rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical"),
  );

  if (canonicalLinks.length !== 1) {
    throw new Error(`expected exactly one canonical, found ${canonicalLinks.length}`);
  }

  const canonicalHref = canonicalLinks[0].get("href");
  if (!canonicalHref || normalizeUrl(canonicalHref) !== normalizeUrl(url)) {
    throw new Error(`canonical mismatch: ${canonicalHref ?? "missing"}`);
  }

  if (hasNoIndex(html)) {
    throw new Error("page contains robots noindex");
  }

  const alternates = new Set(
    linkTags
      .filter((attributes) =>
        (attributes.get("rel") ?? "")
          .toLowerCase()
          .split(/\s+/)
          .includes("alternate"),
      )
      .map((attributes) => attributes.get("hreflang"))
      .filter(Boolean),
  );

  for (const locale of ["ko", "en", "x-default"]) {
    if (!alternates.has(locale)) {
      throw new Error(`missing hreflang ${locale}`);
    }
  }

  if (!/<title>[^<]+<\/title>/i.test(html)) {
    throw new Error("missing non-empty title");
  }
}

async function fetchText(url, expectedContentType) {
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      Accept: expectedContentType,
      "User-Agent": "CalCome-Live-SEO-Monitor/1.0",
    },
  });

  if (response.status >= 300 && response.status < 400) {
    throw new Error(
      `unexpected redirect ${response.status} -> ${response.headers.get("location") ?? "unknown"}`,
    );
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes(expectedContentType.split("/")[1])) {
    throw new Error(`unexpected content-type ${contentType || "missing"}`);
  }

  return response.text();
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker()),
  );

  return results;
}

async function main() {
  const robotsUrl = `${ORIGIN}/robots.txt`;
  const sitemapUrl = `${ORIGIN}/sitemap.xml`;

  const robots = await fetchText(robotsUrl, "text/plain");
  if (!robots.includes(`Sitemap: ${sitemapUrl}`)) {
    throw new Error(`robots.txt is missing canonical sitemap ${sitemapUrl}`);
  }
  if (!robots.includes(`Host: ${ORIGIN}`)) {
    throw new Error(`robots.txt is missing canonical host ${ORIGIN}`);
  }

  const sitemap = await fetchText(sitemapUrl, "application/xml");
  const sitemapUrls = extractSitemapUrls(sitemap);

  if (sitemapUrls.length < MIN_EXPECTED_SITEMAP_URLS) {
    throw new Error(
      `sitemap URL count regressed: ${sitemapUrls.length} < ${MIN_EXPECTED_SITEMAP_URLS}`,
    );
  }

  const uniqueUrls = new Set(sitemapUrls);
  if (uniqueUrls.size !== sitemapUrls.length) {
    throw new Error(
      `sitemap contains ${sitemapUrls.length - uniqueUrls.size} duplicate URL(s)`,
    );
  }

  for (const value of sitemapUrls) {
    const url = new URL(value);
    if (url.origin !== ORIGIN || url.search || url.hash) {
      throw new Error(`invalid sitemap URL ${value}`);
    }
  }

  const failures = [];
  await mapWithConcurrency(sitemapUrls, CONCURRENCY, async (url) => {
    try {
      const html = await fetchText(url, "text/html");
      verifyDocumentSeo(url, html);
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  if (failures.length > 0) {
    console.error(`Live SEO check failed for ${failures.length} URL(s):`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Live SEO check passed: robots.txt, sitemap.xml, and ${sitemapUrls.length} public URLs verified.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
