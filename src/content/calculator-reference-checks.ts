export type CalculatorReferenceCheck = {
  slug: string;
  reviewedOn: string;
  basis: "published-example" | "rule-derived" | "arithmetic";
  sourceUrls: readonly string[];
  ko: { inputs: string; expected: string; scope: string };
  en: { inputs: string; expected: string; scope: string };
};

// Expected values are fixed reference cases, not results generated at render time.
// Engine tests independently reproduce each case in calculator-reference-checks.test.ts.
export const calculatorReferenceChecks: readonly CalculatorReferenceCheck[] = [
  {
    slug: "net-salary",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7871&mi=6592",
      "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596",
    ],
    ko: {
      inputs:
        "월 과세급여 3,500,000원, 상여·비과세·본인 외 가족·자녀 0, 보험 4항목 끔, 소득세·지방소득세 켬.",
      expected:
        "연 과세급여 42,000,000원, 세액공제 한도 668,000원. 월 소득세 201,208원 + 지방소득세 20,120원 = 221,328원.",
      scope:
        "공식 공제 규칙에서 별도로 계산한 세금 방식 비교입니다. 보험 미납부 선택을 권하거나 실제 실수령액·법정 월 원천징수·최종 연말정산 세금을 뜻하지 않습니다. 다른 공제·감면은 제외합니다.",
    },
    en: {
      inputs:
        "Monthly taxable pay KRW 3,500,000; no bonus, non-taxable pay, other family or children; four insurance items off, both taxes on.",
      expected:
        "Annual taxable pay KRW 42,000,000; credit cap KRW 668,000. Monthly income tax KRW 201,208 + local tax KRW 20,120 = KRW 221,328.",
      scope:
        "Independently derived from official deduction rules to compare tax methods. It does not recommend skipping insurance or predict actual take-home pay, statutory monthly withholding or final annual liability. Other deductions and reliefs are excluded.",
    },
  },
  {
    slug: "earned-income-withholding-tax",
    reviewedOn: "2026-11-02",
    basis: "published-example",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583",
      "https://www.law.go.kr/LSW/flDownload.do?flSeq=164357181&bylClsCd=110201",
    ],
    ko: {
      inputs:
        "월 과세급여 3,500,000원, 본인 포함 가족 1명, 자녀 0명, 원천징수 비율 100%.",
      expected:
        "국세청 표의 350만원 이상 352만원 미만·가족 1명 행: 소득세 127,220원. 지방소득세 12,720원을 더한 모델 합계 139,940원.",
      scope:
        "공식 표에 공개된 행과 소득세를 대조했습니다. 지방소득세는 모델의 10%·10원 미만 버림 계산입니다. 자녀 공제액, 개인 자격, 다른 지급월 적용표의 최신성을 이 사례로 검증하지 않습니다.",
    },
    en: {
      inputs:
        "Monthly taxable pay KRW 3,500,000; one family member including the employee, no children, 100% withholding.",
      expected:
        "The published NTS KRW 3.50m–below 3.52m row for one family member gives income tax KRW 127,220. Model local tax KRW 12,720 gives total KRW 139,940.",
      scope:
        "Checks the income-tax amount in a published official row. Local tax uses the model's 10% and KRW 10 truncation. This case does not verify child credits, eligibility or the applicable table for another payment date.",
    },
  },
  {
    slug: "social-insurance",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do",
      "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html",
      "https://www.moel.go.kr/info/astmgmt/employ/employList.do",
    ],
    ko: {
      inputs:
        "월 보수 3,000,000원, 비과세 0원, 150인 미만 사업장, 입력 산재요율 1%.",
      expected:
        "근로자: 연금 142,500원 + 건강 107,850원 + 장기요양 14,172원 + 고용 27,000원 = 291,522원. 사업주 모델 합계 329,022원.",
      scope:
        "2026년 공식 요율을 별도로 적용한 산술 사례입니다. 산재 1%는 가정값입니다. 실제 신고 보수·가입 자격·지원금·상하한 및 기관별 반올림은 별도이며, 이 금액은 보험 고지서 대조 사례가 아닙니다.",
    },
    en: {
      inputs:
        "Monthly pay KRW 3,000,000, no non-taxable pay, workplace under 150 employees, entered accident rate 1%.",
      expected:
        "Employee pension 142,500 + health 107,850 + long-term care 14,172 + employment 27,000 = KRW 291,522. Modeled employer total KRW 329,022.",
      scope:
        "Arithmetic independently derived using official 2026 rates. The 1% accident rate is hypothetical. Reported remuneration, eligibility, subsidies, limits and agency rounding remain separate; this is not a matched insurance bill.",
    },
  },
  {
    slug: "maternity-leave-benefit",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: ["https://1350.moel.go.kr/rtmview.do?id=1000325544"],
    ko: {
      inputs: "월 통상임금 3,000,000원, 일반 단태아 90일, 우선지원대상기업.",
      expected:
        "보험 지원 2,200,000원 × 3 = 6,600,000원. 첫 60일 사업주 차액 800,000원 × 2 = 1,600,000원. 합계 8,200,000원.",
      scope:
        "2026-01-01 이후 휴가의 월 220만원 상한을 적용한 별도 계산입니다. 수급 자격 판정·급여 하한·미숙아 등 별도 휴가 유형은 포함하지 않습니다.",
    },
    en: {
      inputs:
        "Ordinary monthly wage KRW 3,000,000, ordinary 90-day singleton leave, priority-supported employer.",
      expected:
        "Insurance KRW 2,200,000 × 3 = 6,600,000; employer top-up for the first 60 days KRW 800,000 × 2 = 1,600,000; total KRW 8,200,000.",
      scope:
        "Independently derived with the KRW 2.2m monthly cap for leave from 2026-01-01. Eligibility, minimum benefits and separate leave categories such as premature births are excluded.",
    },
  },
  {
    slug: "parental-leave-benefit",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://1350.moel.go.kr/rtmview.do?id=1000325830&page=5&type=ALL",
    ],
    ko: {
      inputs: "월 통상임금 3,000,000원, 일반 육아휴직 12개월, 특별제도 제외.",
      expected:
        "1~3개월 월 2,500,000원, 4~6개월 월 2,000,000원, 7~12개월 월 1,600,000원. 총 23,100,000원.",
      scope:
        "공식 단계별 비율·상한으로 별도 계산했습니다. 고용보험 자격, 18개월 연장 요건, 6+6·한부모 특례 및 월 미만 일할계산은 검증 범위 밖입니다.",
    },
    en: {
      inputs:
        "Ordinary monthly wage KRW 3,000,000, 12 full months of standard parental leave, no special program.",
      expected:
        "Months 1–3 KRW 2,500,000/month; 4–6 KRW 2,000,000/month; 7–12 KRW 1,600,000/month; total KRW 23,100,000.",
      scope:
        "Independently derived from official staged rates and caps. Insurance eligibility, 18-month extension, 6+6 or single-parent provisions and partial-month proration are outside this case.",
    },
  },
  {
    slug: "retirement-income-tax",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7880",
    ],
    ko: {
      inputs: "퇴직급여 100,000,000원, 비과세 0원, 세법상 근속연수 20년.",
      expected:
        "근속공제 40,000,000원, 환산급여 36,000,000원, 과세표준 11,200,000원. 퇴직소득세 1,120,000원 + 지방소득세 112,000원 = 1,232,000원.",
      scope:
        "국세청 공제·환산 규칙으로 별도 계산한 예시입니다. 지방세는 모델의 10% 산술입니다. 과거 퇴직금 합산·중간정산·과세이연·특례와 개인별 근속연수 판정은 제외합니다.",
    },
    en: {
      inputs:
        "Retirement pay KRW 100,000,000, no non-taxable amount, 20 tax service years.",
      expected:
        "Service deduction KRW 40,000,000; converted salary 36,000,000; tax base 11,200,000. Income tax 1,120,000 + local tax 112,000 = KRW 1,232,000.",
      scope:
        "Independently derived from NTS deduction and conversion rules. Local tax is model arithmetic at 10%. Prior payouts, interim settlements, tax deferral, special cases and individual service-year eligibility are excluded.",
    },
  },
  {
    slug: "pension-savings-tax-credit",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsId=001565&lsJoLnkSeq=1000819707&print=print",
    ],
    ko: {
      inputs:
        "급여소득만 연 55,000,000원, 연금저축 납입 8,000,000원, 퇴직연금 본인 납입 4,000,000원.",
      expected:
        "공제대상 연금저축 6,000,000원 + 퇴직연금 3,000,000원 = 9,000,000원. 국세 공제 15% = 1,350,000원. 한도 밖 납입 3,000,000원.",
      scope:
        "소득세법 제59조의3의 일반 한도·비율을 별도 적용했습니다. 지방소득세·실제 환급·납부세액 한도·ISA 전환 추가한도·사용자 부담금은 포함하지 않습니다.",
    },
    en: {
      inputs:
        "Salary-only annual pay KRW 55,000,000; pension savings 8,000,000 and personal retirement-account contributions 4,000,000.",
      expected:
        "Eligible savings 6,000,000 + retirement account 3,000,000 = KRW 9,000,000; national credit at 15% = 1,350,000; contributions above limits 3,000,000.",
      scope:
        "Independently applies the ordinary limits and rates in Income Tax Act Article 59-3. Local tax, actual refunds, available-tax limits, extra ISA-transfer limits and employer contributions are excluded.",
    },
  },
  {
    slug: "retirement-pension-tax-credit",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsId=001565&lsJoLnkSeq=1000819707&print=print",
    ],
    ko: {
      inputs:
        "급여소득만 연 55,000,000원, 연금저축 6,000,000원, 퇴직연금 본인 납입 1,000,000원.",
      expected:
        "현재 국세 공제 1,050,000원. 퇴직연금 추가 납입 여지 2,000,000원, 그에 따른 추가 국세 공제 300,000원. 일반 한도 내 최대 국세 공제 1,350,000원.",
      scope:
        "법정 일반 납입 한도와 15%의 산술 비교입니다. 추가 납입을 권하는 것이 아니며 실제 환급액·납부세액·연금 인출 과세·ISA 추가한도는 계산하지 않습니다.",
    },
    en: {
      inputs:
        "Salary-only annual pay KRW 55,000,000; savings contributions 6,000,000 and personal retirement contributions 1,000,000.",
      expected:
        "Current national credit KRW 1,050,000; further retirement contribution capacity 2,000,000; additional national credit 300,000; maximum ordinary national credit 1,350,000.",
      scope:
        "Arithmetic using ordinary statutory contribution limits and 15%. It is not a contribution recommendation; actual refunds, available tax, withdrawal taxation and extra ISA limits are not calculated.",
    },
  },
  {
    slug: "freelancer-3-3-tax",
    reviewedOn: "2026-11-02",
    basis: "published-example",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7902&mi=6466",
    ],
    ko: {
      inputs: "원천징수 대상 사업소득 지급액 5,000,000원, 별도 제외액 0원.",
      expected:
        "국세청 공개 사례의 소득세 5,000,000원 × 3% = 150,000원. 모델 지방세 15,000원 포함 원천징수 165,000원, 지급 후 4,835,000원.",
      scope:
        "공식 사례는 국세 3%를 뒷받침합니다. 지방세는 모델의 추가 0.3% 산술입니다. 모든 프리랜서의 소득 분류나 비용 차감 가능 여부, 최종 세금·환급액을 검증하지 않습니다.",
    },
    en: {
      inputs:
        "Business-income payment subject to withholding KRW 5,000,000; no separately excluded amount.",
      expected:
        "Published NTS national-tax example: KRW 5,000,000 × 3% = 150,000. Modeled local tax 15,000 gives withholding 165,000 and payment after withholding 4,835,000.",
      scope:
        "The official example supports national withholding at 3%. Local tax is model arithmetic at an additional 0.3%. This does not verify every freelancer's income category, deductible expenses or final tax/refund.",
    },
  },
  {
    slug: "value-added-tax",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7696&mi=2275",
    ],
    ko: {
      inputs:
        "일반 과세거래의 공급가액 1,000,000원, 입력 세율 10%. 역산은 부가세 포함 1,100,000원.",
      expected:
        "부가세 100,000원, 합계 1,100,000원. 포함금액을 1.1로 나누면 공급가액 1,000,000원으로 돌아옵니다.",
      scope:
        "공식 일반과세 세율로 별도 계산한 과세거래 예시입니다. 면세·영세율·간이과세·매입세액공제나 실제 신고 납부세액을 판정하지 않습니다.",
    },
    en: {
      inputs:
        "Taxable supply KRW 1,000,000 at entered rate 10%; reverse case uses inclusive total KRW 1,100,000.",
      expected:
        "VAT KRW 100,000; total KRW 1,100,000. Dividing the inclusive total by 1.1 returns supply value KRW 1,000,000.",
      scope:
        "Independently derived for a taxable transaction at the official ordinary VAT rate. Exemptions, zero rating, simplified taxation, input credits and actual return liability are not determined.",
    },
  },
  {
    slug: "comprehensive-income-tax",
    reviewedOn: "2026-11-02",
    basis: "rule-derived",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7667&mi=2227",
    ],
    ko: {
      inputs:
        "소득 20,000,000원, 경비·소득공제·세액공제 0원, 입력 세율 15%, 누진공제 1,260,000원, 지방세율 0%로 국세만 비교.",
      expected:
        "국세 20,000,000원 × 15% − 1,260,000원 = 1,740,000원. 구간별 합산 14,000,000원 × 6% + 6,000,000원 × 15%와 같습니다.",
      scope:
        "공식 세율표의 해당 구간을 사용자가 맞게 입력한 산술 사례입니다. 계산기가 세율 구간·소득 분류·공제 자격을 자동 판정한다는 뜻이 아니며 지방세와 실제 신고는 별도입니다.",
    },
    en: {
      inputs:
        "Income KRW 20,000,000; no expenses, deductions or credits; entered rate 15%, progressive deduction 1,260,000, local rate 0% to isolate national tax.",
      expected:
        "National tax KRW 20,000,000 × 15% − 1,260,000 = 1,740,000, equal to 14,000,000 × 6% + 6,000,000 × 15%.",
      scope:
        "Arithmetic with the correct band entered from the official schedule. This does not mean the calculator automatically determines brackets, income categories or eligibility. Local tax and actual filing remain separate.",
    },
  },
  {
    slug: "withholding-tax",
    reviewedOn: "2026-11-02",
    basis: "arithmetic",
    sourceUrls: [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7902&mi=6466",
    ],
    ko: {
      inputs:
        "지급액 1,000,000원, 비과세 0원, 사용자가 입력한 국세율 3%, 국세 대비 지방세율 10%.",
      expected:
        "국세 30,000원, 지방세 3,000원, 합계 33,000원, 지급 후 967,000원. 지방세 10%는 지급액의 10%가 아닙니다.",
      scope:
        "입력한 비율을 검산하는 산술 사례입니다. 국세청의 사업소득 3% 안내는 그 소득 유형의 참고이며 모든 지급에 3%가 적용된다는 근거가 아닙니다. 비과세와 적용세율은 사용자가 확인해야 합니다.",
    },
    en: {
      inputs:
        "Payment KRW 1,000,000, no non-taxable amount, user-entered national rate 3% and local rate 10% of national tax.",
      expected:
        "National tax KRW 30,000; local tax 3,000; total 33,000; payment after withholding 967,000. The 10% applies to national tax, not the payment.",
      scope:
        "An arithmetic check of entered rates. The NTS 3% business-income reference is context for that income type, not evidence that every payment uses 3%. Users must verify exclusions and applicable rates.",
    },
  },
];
