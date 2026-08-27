import { notFound } from "next/navigation";
import { LocalizedApartmentManagementFeeBudgetPage } from "@/features/apartment-management-fee-budget/components/localized-apartment-management-fee-budget-page";
import { createApartmentManagementFeeBudgetMetadata } from "@/features/apartment-management-fee-budget/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createApartmentManagementFeeBudgetMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedApartmentManagementFeeBudgetPage locale={locale} />;
}
