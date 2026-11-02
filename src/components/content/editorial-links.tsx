import Link from "next/link";

export function EditorialLinks({ locale }: { locale: "ko" | "en" }) {
  const prefix = locale === "en" ? "/en" : "";
  return (
    <p className="text-sm leading-7 text-muted-foreground" data-editorial-links>
      {locale === "ko"
        ? "CalCome의 계산식·출처 확인 및 수정 절차: "
        : "How CalCome checks calculations, sources and corrections: "}
      <Link
        className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
        href={prefix + "/editorial-policy"}
      >
        {locale === "ko"
          ? "검증·편집 기준"
          : "Verification and editorial policy"}
      </Link>
      {" · "}
      <Link
        className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
        href={prefix + "/editorial-policy#updates"}
      >
        {locale === "ko" ? "주요 수정 기록" : "Material corrections"}
      </Link>
    </p>
  );
}
