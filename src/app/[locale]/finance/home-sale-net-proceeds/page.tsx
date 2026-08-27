import { notFound } from "next/navigation";
import { LocalizedHomeSaleNetProceedsPage } from "@/features/home-sale-net-proceeds/components/localized-home-sale-net-proceeds-page";
import { createHomeSaleNetProceedsMetadata } from "@/features/home-sale-net-proceeds/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createHomeSaleNetProceedsMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedHomeSaleNetProceedsPage locale={locale} />;
}
