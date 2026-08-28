import { InfoPage } from "@/components/layout/info-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "계산 결과를 의사결정에 쓰는 법",
  description:
    "계산기 결과를 비교하고 검증해 실제 금융 의사결정에 활용하는 CalCome 가이드입니다.",
  path: "/guides",
});

const steps = [
  {
    title: "1. 먼저 결정할 질문을 한 문장으로 적기",
    body: "계산부터 시작하지 말고 무엇을 결정하려는지 먼저 정합니다. 예를 들어 ‘월 납입액이 감당 가능한가’, ‘두 선택지 중 총비용이 낮은 쪽은 무엇인가’, ‘목표 금액까지 시간이 얼마나 필요한가’처럼 결과가 답해야 할 질문을 구체화하면 불필요한 숫자를 줄일 수 있습니다.",
  },
  {
    title: "2. 입력값을 사실·가정·변수로 나누기",
    body: "현재 잔액처럼 이미 확인된 값, 예상 수익률처럼 가정한 값, 금리나 기간처럼 바뀔 수 있는 값을 구분합니다. 특히 결과에 큰 영향을 주는 가정은 하나의 숫자로 고정하지 말고 보수적·기준·낙관 시나리오를 만들어 비교하는 편이 안전합니다.",
  },
  {
    title: "3. 결과보다 변화 폭을 보기",
    body: "한 번 계산한 숫자를 정답처럼 받아들이기보다 핵심 입력을 조금씩 바꿔 결과가 얼마나 달라지는지 확인합니다. 작은 입력 변화가 결과를 크게 흔든다면 그 계산은 ‘정밀한 예측’보다 ‘민감한 변수 찾기’에 더 유용합니다.",
  },
  {
    title: "4. 비용·세금·정책 조건을 별도로 확인하기",
    body: "계산기에 포함되지 않은 수수료, 세금, 상품별 제한, 적용 시점이 최종 결과를 바꿀 수 있습니다. 중요한 결정을 내리기 전에는 계산기에 표시된 가정과 검증일을 확인하고, 정책·세금·대출 규제처럼 바뀔 수 있는 조건은 최신 공식 자료와 실제 상품 조건을 다시 확인합니다.",
  },
  {
    title: "5. 숫자를 행동 기준으로 바꾸기",
    body: "마지막에는 결과를 ‘그래서 무엇을 할 것인가’로 변환합니다. 예를 들어 최대 월 납입액, 최소 비상자금, 허용 가능한 손실 범위처럼 실행 가능한 기준을 정하면 계산 결과가 단순한 숫자에서 의사결정 도구로 바뀝니다.",
  },
];

export default function GuidesPage() {
  return (
    <InfoPage
      eyebrow="GUIDES"
      title="계산 결과를 의사결정에 쓰는 법"
      description="계산기는 답을 대신 정해주는 도구가 아니라 선택지를 구조화하는 도구입니다. 아래 순서로 결과를 비교하고 검증하면 숫자를 더 안전하게 활용할 수 있습니다."
    >
      {steps.map((step) => (
        <section key={step.title}>
          <h2 className="text-2xl font-semibold tracking-tight">
            {step.title}
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">{step.body}</p>
        </section>
      ))}

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          계산 전·후 체크리스트
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-muted-foreground">
          <li>내가 결정하려는 질문이 명확한가?</li>
          <li>확정된 입력과 가정한 입력을 구분했는가?</li>
          <li>핵심 가정을 바꾼 시나리오를 비교했는가?</li>
          <li>결과에 포함되지 않은 비용이나 조건이 있는가?</li>
          <li>정책 민감 항목은 최신 공식 자료를 확인했는가?</li>
          <li>결과를 실제 행동 기준으로 바꿨는가?</li>
        </ul>
        <p className="mt-6 leading-8 text-muted-foreground">
          CalCome의 계산 결과는 입력값과 표시된 가정을 바탕으로 한 정보성
          추정치이며 금융, 투자, 세금 또는 법률 자문이 아닙니다.
        </p>
      </section>
    </InfoPage>
  );
}
