export function OperatorContact({ locale }: { locale: "ko" | "en" }) {
  return (
    <section
      className="rounded-xl border bg-card p-5"
      aria-label={
        locale === "ko" ? "운영 책임 및 연락처" : "Operator and contact"
      }
      data-operator-contact
    >
      <h2 className="text-xl font-semibold">
        {locale === "ko"
          ? "운영·콘텐츠 책임: 칼컴(CalCome)"
          : "Operator and content responsibility: CalCome"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {locale === "ko"
          ? "칼컴은 이 서비스를 운영하고 계산기·가이드의 수정과 오류 제보를 담당하는 서비스 명칭입니다."
          : "CalCome is the service name responsible for operating this site, maintaining calculators and guides, and receiving correction reports."}
      </p>
      <a
        className="mt-3 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
        href="mailto:hello@calcome.com"
      >
        hello@calcome.com
      </a>
    </section>
  );
}
