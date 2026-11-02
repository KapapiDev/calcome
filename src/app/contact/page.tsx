import { InfoPage } from "@/components/layout/info-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { EditorialLinks } from "@/components/content/editorial-links";

export const metadata = createPageMetadata({
  title: "문의",
  description:
    "CalCome 서비스 이용 문의, 오류 제보, 개선 의견과 제휴 문의 방법을 안내합니다.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="CONTACT"
      title="문의"
      description="서비스 이용 문의, 오류 제보, 개선 의견과 제휴 문의를 이메일로 보내 주세요."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          이메일로 문의하기
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          서비스 이용 문의, 계산 오류 제보, 개선 의견과 제휴 문의를 받습니다.
          오류를 제보할 때는 문제를 재현할 수 있는 단계와 기대한 결과를 함께
          적어 주세요.
        </p>
        <a
          href="mailto:hello@calcome.com"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          hello@calcome.com
        </a>
      </section>

      <section className="rounded-xl border bg-muted/40 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          민감한 정보는 올리지 마세요
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          비밀번호, 계정 인증 정보, 주민등록번호, 금융 계좌 정보와 그 밖의
          민감한 개인정보를 이메일에 포함하지 마세요.
        </p>
      </section>
      <EditorialLinks locale="ko" />
    </InfoPage>
  );
}
