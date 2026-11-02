export const editorialPolicyReviewedOn = "2026-11-02";
export const developmentRepository = "https://github.com/KapapiDev/calcome";

export const editorialPolicy = {
  ko: {
    title: "계산 검증·편집 및 수정 기준",
    description:
      "CalCome의 계산식 검증, 공식 출처 확인, 콘텐츠 책임 범위와 주요 수정 기록을 공개합니다.",
    byline: "문서 관리: CalCome 편집 · 검토일: ",
    sections: [
      [
        "콘텐츠 책임과 개발 기록",
        "계산기 설명과 가이드는 CalCome 편집 명의로 제공합니다. 개발·수정 이력은 공개 저장소 KapapiDev/calcome에서 확인할 수 있습니다. ‘CalCome 편집’ 표기는 서비스의 편집 주체를 나타내며, 회계사·세무사·노무사 등 외부 전문가의 자격이나 별도 검수를 뜻하지 않습니다.",
      ],
      [
        "계산식은 어떻게 확인하나요?",
        "먼저 입력값의 단위, 기간, 현금흐름 시점과 포함 비용을 정리합니다. 공개한 숫자 예시를 실제 계산 함수와 대조하고, 0·음수·상한·기간 경계·반올림 등 해당 모델의 중요한 조건을 자동 테스트합니다. 한국어와 영어의 설명·링크 및 배포된 결과도 확인합니다.",
      ],
      [
        "정책·세금·급여의 출처 선택",
        "국세청, 고용노동부, 국민연금공단 등 담당 기관의 공식 안내와 현행 법령을 우선합니다. 금융사 자료는 해당 상품 조건의 자료로 구분합니다. 확인한 출처와 기준 확인일은 계산기 또는 가이드에 표시하며, 법령 적용일·상품 가입일·개인의 자격 요건은 따로 확인해야 합니다.",
      ],
      [
        "검토일과 적용일을 구분합니다",
        "설명 검토일은 그 설명을 확인한 날짜입니다. 모든 법령을 그날 전수 검증했다거나 모든 사람에게 그 기준이 적용된다는 뜻은 아닙니다. 사용자가 입력하는 세율·금리·공제액은 가정값일 수 있습니다. 간편 추정식, 제외된 비용, 자격 자동 판정 여부는 각 페이지의 가정과 한계를 확인하세요.",
      ],
      [
        "오류 제보와 수정 절차",
        "계산기 주소, 재현할 수 있는 가상 입력값, 예상 결과와 실제 결과를 문의 채널로 보내 주세요. 정책·요율 제보에는 공식 출처와 적용일을 함께 적어 주세요. 확인된 오류는 원인을 재현하고 필요한 계산·설명과 회귀 테스트를 수정한 뒤 배포합니다. 결과 해석에 영향을 주는 주요 수정은 아래에 기록합니다.",
      ],
    ],
    repositoryLabel: "공개 개발·수정 이력",
    updatesTitle: "주요 수정 기록",
    updatesIntro:
      "아래는 결과 해석에 중요한 변경의 요약입니다. 전체 코드 변경 이력은 공개 저장소에서 확인할 수 있습니다.",
    reporting: "계산 오류 제보·문의",
    sourceLabel: "확인 근거",
    changes: [
      {
        date: "2026-11-02",
        title: "검증 기준과 비교 사례 공개",
        body: "검증·편집 및 수정 절차를 공개하고, 기존 가이드에 조건별 비교 사례를 추가했습니다. 이 변경 자체는 계산 공식이나 세율을 바꾸지 않습니다.",
        href: "/guides",
        label: "비교 가이드 보기",
        source: "https://github.com/KapapiDev/calcome",
      },
      {
        date: "2026-10-30",
        title: "출산전후휴가 급여의 2026년 상한 수정",
        body: "고용보험 지원 상한을 30일당 210만원에서 220만원으로 수정했습니다. 월 통상임금 300만원·일반 단태아 90일·우선지원 대상기업 예시는 고용보험 660만원, 사업주 차액 160만원, 합계 820만원입니다. 별도 휴가 유형·급여 하한·개별 수급 자격은 계산기의 포함 범위를 확인하세요.",
        href: "/ko/employment/maternity-leave-benefit",
        label: "출산전후휴가 급여 계산기",
        source: "https://1350.moel.go.kr/rtmview.do?id=1000325544",
      },
      {
        date: "2026-10-30",
        title: "실수령액 추정의 자녀 공제 수정",
        body: "간편 소득세 추정의 월 자녀 공제를 1명 20,830원, 2명 45,830원, 2명 초과 1명당 추가 33,330원으로 수정했습니다. 실제 급여 원천징수는 가족·자녀 요건과 간이세액표 적용을 확인해야 하며, 이 계산기의 연환산 추정과 다를 수 있습니다.",
        href: "/ko/employment/net-salary",
        label: "실수령액 계산기",
        source:
          "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596",
      },
    ],
  },
  en: {
    title: "Verification and Corrections Policy",
    description:
      "How CalCome checks formulas and official sources, identifies editorial responsibility, and records material corrections.",
    byline: "Maintained by CalCome editorial · Reviewed: ",
    sections: [
      [
        "Editorial responsibility and development history",
        "Calculator explanations and guides are published under the CalCome editorial name. Public development and correction history is available in KapapiDev/calcome. This editorial credit identifies the service's publishing responsibility; it does not claim an external accountant, tax adviser or labor specialist's credentials or independent review.",
      ],
      [
        "How calculations are checked",
        "We define input units, periods, cash-flow timing and included costs first. Published numerical examples are compared with the actual calculation functions. Relevant zero/negative inputs, limits, date boundaries and rounding are covered by automated tests. We also check Korean/English explanations, links and deployed results.",
      ],
      [
        "Sources for policy, tax and payroll",
        "We prioritize the responsible South Korea authority's guidance and applicable statutes, including NTS, MOEL and NPS. Financial providers' materials are identified as product-specific information. Sources and review dates appear on calculators or guides; effective dates, enrollment dates and individual eligibility still require separate confirmation.",
      ],
      [
        "Review dates are different from effective dates",
        "An explanation's review date records when that explanation was checked. It does not certify every law as current that day or every user's eligibility. Entered tax rates, interest rates and deductions may be assumptions. Read the page's model scope, excluded costs and eligibility limitations.",
      ],
      [
        "Reporting and correcting an error",
        "Send the calculator URL, reproducible fictional inputs, expected output and actual output through our contact channel. For policy/rate issues, include the official source and effective date. A confirmed issue is reproduced, corrected in the relevant calculation or explanation, tested and deployed. Material corrections affecting interpretation are recorded below.",
      ],
    ],
    repositoryLabel: "Public development and correction history",
    updatesTitle: "Material corrections",
    updatesIntro:
      "These entries summarize changes important to interpreting results. The public repository contains the full code-change history.",
    reporting: "Report a calculation issue",
    sourceLabel: "Supporting reference",
    changes: [
      {
        date: "2026-11-02",
        title: "Verification policy and comparison cases published",
        body: "Published the verification/editorial/correction process and added assumption-by-assumption comparisons to existing guides. This release does not itself change calculation formulas or tax rates.",
        href: "/en/guides",
        label: "Read the comparison guides",
        source: "https://github.com/KapapiDev/calcome",
      },
      {
        date: "2026-10-30",
        title: "2026 South Korea maternity benefit cap corrected",
        body: "Corrected the insurance cap from KRW 2.1 million to 2.2 million per 30 days. A KRW 3 million ordinary wage, ordinary 90-day singleton leave and priority-supported employer example now gives KRW 6.6 million insurance, 1.6 million employer top-up and 8.2 million total. Check the model's exclusions for other leave types, benefit floors and individual eligibility.",
        href: "/en/employment/maternity-leave-benefit",
        label: "Maternity Leave Benefit Calculator",
        source: "https://1350.moel.go.kr/rtmview.do?id=1000325544",
      },
      {
        date: "2026-10-30",
        title: "Take-home salary child credit corrected",
        body: "Corrected the simplified monthly child-credit adjustment to KRW 20,830 for one child, 45,830 for two, plus 33,330 per child above two. Actual South Korea payroll withholding requires the applicable family/child conditions and monthly withholding table; it can differ from this annualized estimate.",
        href: "/en/employment/net-salary",
        label: "Net Salary Calculator",
        source:
          "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596",
      },
    ],
  },
} as const;
