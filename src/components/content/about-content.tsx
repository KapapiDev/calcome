import Link from "next/link";
import { InfoPage } from "@/components/layout/info-page";
import { EditorialLinks } from "./editorial-links";
import { developmentRepository } from "@/content/editorial-policy";

export function AboutContent({ locale }: { locale: "ko" | "en" }) {
  const ko = locale === "ko";
  return (
    <InfoPage
      eyebrow="ABOUT"
      title={ko ? "CalCome 소개" : "About CalCome"}
      description={
        ko
          ? "CalCome(캘컴)은 누구나 이해하기 쉬운 금융 계산기를 제공합니다. 입력값·가정·검증 근거를 확인하며 사용할 수 있습니다."
          : "CalCome provides financial calculators with clear inputs, assumptions and verifiable calculation references."
      }
    >
      <section>
        <h2 className="text-2xl font-semibold">
          {ko ? "무엇을 제공하나요?" : "What we publish"}
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {ko
            ? "저축, 투자, 대출, 급여·근로, 세금, 주거와 생활의 숫자를 비교하는 계산 도구와 설명 가이드를 제공합니다. 대한민국 제도를 적용하는 계산기는 해당 범위와 통화·기준일을 페이지에서 안내합니다. 금리와 미래 수익률을 직접 넣는 계산은 그 가정에 따른 결과입니다."
            : "We publish calculation tools and guides for savings, investing, loans, payroll, tax, housing and everyday decisions. Tools using South Korea rules identify that jurisdiction, currency and relevant dates. Calculations with entered interest rates or future returns describe those assumptions, not a forecast."}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">
          {ko
            ? "콘텐츠 책임과 공개 개발 기록"
            : "Editorial responsibility and public development"}
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {ko
            ? "설명과 가이드는 CalCome 편집 명의로 관리합니다. 공개 저장소 KapapiDev/calcome에서 계산 코드, 테스트와 수정 기록을 확인할 수 있습니다. 편집 명의는 별도 전문자격이나 외부 전문가 검수의 인증을 의미하지 않습니다."
            : "Explanations and guides are maintained under the CalCome editorial name. The public KapapiDev/calcome repository provides calculation code, tests and correction history. The editorial credit is not a professional credential or certification of independent expert review."}
        </p>
        <a
          className="mt-3 inline-flex min-h-11 items-center text-primary underline"
          href={developmentRepository}
        >
          {ko
            ? "공개 개발·수정 기록 보기"
            : "View public development and corrections"}
        </a>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">
          {ko ? "계산 결과를 확인하는 방법" : "How to check a result"}
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {ko
            ? "페이지의 숫자 예시를 재현하고, 단위·기간·납입 시점·비용 포함 여부를 확인하세요. 정책 계산은 연결된 공식 출처의 적용일과 본인의 조건을 함께 확인해야 합니다. 검토 날짜만으로 모든 개인의 적용 여부를 판단할 수는 없습니다."
            : "Reproduce the page's worked example and check units, periods, contribution timing and included costs. For policy calculations, check the linked authority's effective date and your circumstances. A review date alone does not determine individual applicability."}
        </p>
        <EditorialLinks locale={locale} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold">
          {ko ? "오류와 한계를 알려 주세요" : "Report errors and limitations"}
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {ko
            ? "계산 결과는 정보성 추정치이며 금융, 투자, 세금 또는 법률 자문이 아니며 실제 상품 조건이나 미래 결과를 보장하지 않습니다. 재현 가능한 오류를 발견하면 가상 입력값과 확인 근거를 보내 주세요. 민감한 개인정보는 보내지 마세요."
            : "Results are informational estimates, not financial, investment, tax or legal advice or guarantees of product terms. Report reproducible issues with fictional inputs and supporting evidence. Do not send sensitive personal information."}
        </p>
        <Link
          className="mt-3 inline-flex min-h-11 items-center text-primary underline"
          href={ko ? "/contact" : "/en/contact"}
        >
          {ko ? "오류 제보·문의" : "Contact and corrections"}
        </Link>
      </section>
    </InfoPage>
  );
}
