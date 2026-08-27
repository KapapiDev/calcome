import { notFound } from "next/navigation";
import { LocalizedJeonseVsRentPage } from "@/features/jeonse-vs-rent/components/localized-jeonse-vs-rent-page";
import { createJeonseVsRentMetadata } from "@/features/jeonse-vs-rent/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en" ? createJeonseVsRentMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedJeonseVsRentPage locale={locale} />;
}
