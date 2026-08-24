import { headers } from "next/headers";

export default async function Loading() {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-calcome-locale") === "en" ? "en" : "ko";
  const loadingLabel =
    locale === "en" ? "Loading the page." : "페이지를 불러오는 중입니다.";

  return (
    <main id="main-content" className="flex flex-1 items-center">
      <div
        role="status"
        aria-live="polite"
        className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
      >
        <div className="max-w-2xl animate-pulse motion-reduce:animate-none">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-5 h-11 w-4/5 rounded bg-muted" />
          <div className="mt-4 h-6 w-full rounded bg-muted" />
          <div className="mt-2 h-6 w-2/3 rounded bg-muted" />
        </div>
        <span className="sr-only">{loadingLabel}</span>
      </div>
    </main>
  );
}
