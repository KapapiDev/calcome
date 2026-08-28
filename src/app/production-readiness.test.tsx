import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import ErrorPage from "./error";
import { createRootMetadata } from "./layout";
import Loading from "./loading";
import manifest from "./manifest";
import NotFound from "./not-found";
import Home, { metadata as homeMetadata } from "./page";
import robots from "./robots";
import sitemap from "./sitemap";

describe("production metadata routes", () => {
  it("defines consistent global metadata and social cards", () => {
    const metadata = createRootMetadata("/ko");

    expect(metadata.title).toMatchObject({
      default: "CalCome - 금융 계산을 쉽게.",
      template: "%s | CalCome",
    });
    expect(metadata.alternates).toEqual({
      canonical: "/ko",
      languages: {
        "ko-KR": "/ko",
        "en-US": "/en",
        "x-default": "/ko",
      },
    });
    expect(homeMetadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      locale: "ko_KR",
      alternateLocale: "en_US",
      siteName: "CalCome",
      url: "/ko",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.verification).toEqual({
      other: {
        "naver-site-verification": [
          "61d4b932c5e6b51be3b7221317d9f6e71ac9343a",
          "a29b19e1e2434d8a1f3165e813e4abfbf791bf23",
        ],
      },
    });
  });

  it("provides a Korean web app manifest with branded icons", () => {
    expect(manifest()).toMatchObject({
      name: "CalCome - 금융 계산을 쉽게.",
      short_name: "CalCome",
      start_url: "/",
      scope: "/",
      display: "standalone",
      lang: "ko-KR",
    });
    expect(manifest().icons).toEqual([
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ]);
  });

  it("publishes crawl rules and only canonical public routes", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.calcome.com/sitemap.xml",
      host: "https://www.calcome.com",
    });
    expect(sitemap().map(({ url }) => url)).toEqual(
      expect.arrayContaining([
        "https://www.calcome.com/",
        "https://www.calcome.com/calculators",
        "https://www.calcome.com/about",
        "https://www.calcome.com/privacy",
        "https://www.calcome.com/terms",
        "https://www.calcome.com/contact",
      ]),
    );
  });

  it("keeps sitemap and hreflang URLs on the production host", () => {
    const productionHost = new URL(robots().host!).host;
    for (const entry of sitemap()) {
      expect(new URL(entry.url).host).toBe(productionHost);
      for (const alternate of Object.values(
        entry.alternates?.languages ?? {},
      )) {
        expect(alternate).toBeDefined();
        if (!alternate) continue;
        expect(new URL(alternate).host).toBe(productionHost);
      }
    }
  });
});

describe("production recovery and navigation", () => {
  it("positions the homepage around the calculator catalog", () => {
    const { container } = render(<Home />);
    expect(
      screen.getByRole("heading", { name: "금융 계산을 쉽게." }),
    ).toBeVisible();
    expect(screen.getByText("CalCome")).toBeVisible();
    expect(screen.getByText("복리, 대출, 적금, 예금, ETF까지.")).toBeVisible();
    expect(
      screen.getByText("누구나 쉽게 사용할 수 있는 금융 계산기를 제공합니다."),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "전체 계산기 보기" }),
    ).toHaveAttribute("href", "/calculators");
    expect(
      screen.queryByRole("link", { name: "GitHub에서 보기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "인기 계산기" })).toBeVisible();
    const popularGrid = screen.getByTestId("popular-calculator-grid");
    expect(popularGrid).toHaveClass("sm:grid-cols-2");
    expect(popularGrid).toHaveClass("lg:grid-cols-3");
    expect(popularGrid.children).toHaveLength(6);
    expect(
      Array.from(popularGrid.children).map((item) => item.textContent),
    ).toEqual([
      expect.stringContaining("복리 계산기"),
      expect.stringContaining("대출 계산기"),
      expect.stringContaining("예금 계산기"),
      expect.stringContaining("적금 계산기"),
      expect.stringContaining("CAGR 계산기"),
      expect.stringContaining("퇴직금 계산기"),
    ]);
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/fixed-deposit",
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );
    expect(screen.getByRole("link", { name: /적금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/savings",
    );
    expect(screen.getByRole("link", { name: /CAGR 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/cagr",
    );
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/compound-interest",
    );
    expect(screen.getByRole("link", { name: /퇴직금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/employment/severance-pay",
    );
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "WebSite",
      name: "CalCome",
      url: "https://www.calcome.com/",
    });
  });

  it("keeps shared navigation limited to valid destinations", () => {
    const { unmount } = render(<SiteHeader />);
    const headerNavigation = screen.getByRole("navigation", {
      name: "주요 탐색",
    });
    expect(headerNavigation).toHaveTextContent("계산기");
    expect(screen.getByRole("link", { name: "계산기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
    expect(
      screen.queryByRole("link", { name: "모든 계산기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /모드로 전환/ })).toBeVisible();
    expect(screen.queryByText("금융 가이드")).not.toBeInTheDocument();
    expect(screen.queryByText("블로그")).not.toBeInTheDocument();
    expect(screen.queryByText("즐겨찾기")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "복리 계산기" }),
    ).not.toBeInTheDocument();
    unmount();
    render(<SiteFooter />);
    const footerNavigation = screen.getByRole("navigation", {
      name: "하단 탐색",
    });
    expect(footerNavigation).toHaveTextContent(
      "계산기소개개인정보처리방침이용약관문의",
    );
    expect(screen.getByRole("link", { name: "계산기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(
      screen.getByRole("link", { name: "개인정보처리방침" }),
    ).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "이용약관" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: "문의" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(
      screen.queryByRole("link", { name: "GitHub" }),
    ).not.toBeInTheDocument();
  });

  it("offers useful recovery from a missing page", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: "페이지를 찾을 수 없습니다" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "홈으로 돌아가기" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "복리 계산기" })).toHaveAttribute(
      "href",
      "/ko/finance/compound-interest",
    );
  });

  it("announces loading without requiring motion", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  });

  it("lets users retry a route error", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    render(<ErrorPage error={new Error("test")} unstable_retry={retry} />);
    await user.click(screen.getByRole("button", { name: "다시 시도" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
