import { calculatorExampleSources } from "./calculator-examples";

export type LocalizedSourceContext = { ko: string; en: string };

// These notes describe source applicability, not certification of a calculator.
// Existing explanation-review dates remain separate from a rule's effective date.
export const calculatorSourceScopes: Record<string, LocalizedSourceContext> = {
  ltv: {
    ko: "미국 CFPB의 자동차 대출 설명은 대출액을 담보가치로 나누는 LTV의 뜻을 뒷받침합니다. 한국 주택대출의 지역별 한도나 승인 요건을 정하는 자료는 아니며, 입력한 한도율은 별도로 확인해야 합니다.",
    en: "The U.S. CFPB auto-loan explanation supports LTV as loan amount divided by collateral value. It does not establish South Korea housing-loan limits or approval rules; verify any entered limit separately.",
  },
  dti: {
    ko: "미국 CFPB는 부채 상환액과 소득을 같은 기간으로 맞추어 비율을 계산하는 개념을 설명합니다. 한국의 DTI·DSR·스트레스 DSR에 포함되는 부채, 심사금리와 규제 한도를 검증하는 출처는 아닙니다.",
    en: "The U.S. CFPB explains comparing debt payments with income over the same period. It does not verify which debts, stress rates or regulatory limits apply to South Korea DTI, DSR or stress-DSR underwriting.",
  },
  amortization: {
    ko: "미국 CFPB의 주택대출 자료는 납입금의 원금·이자 구분과 잔액 감소에 따른 상환 구조를 설명합니다. 계산기의 가상 금리·납입 시점·수수료나 국내 금융사의 약관을 확인한 자료는 아닙니다.",
    en: "The U.S. CFPB mortgage reference explains principal, interest and repayment as the balance falls. It does not verify this calculator's illustrative rates, payment timing, fees or a Korean lender's contract.",
  },
  compound: {
    ko: "미국 SEC의 도구는 초기 금액·정기 납입·기간·가정 이율·복리 주기에 따른 성장을 다룹니다. 여기의 수익률·물가상승률·인출률은 입력 가정이며, 이 출처가 노후자금의 충분성이나 수익 지속성을 보증하지 않습니다.",
    en: "The U.S. SEC tool illustrates growth from starting capital, recurring contributions, time, an assumed rate and compounding frequency. Entered return, inflation or withdrawal rates remain assumptions; this source does not establish retirement adequacy or sustainable returns.",
  },
  returns: {
    ko: "FINRA 교육 자료는 손익·배당 등 투자 수입과 투자금 대비 수익률, 비용의 영향을 설명합니다. 예시 거래·평균단가·세금 입력은 CalCome의 산술 조건이며 실제 계좌나 미래 성과를 검증한 값이 아닙니다.",
    en: "FINRA education explains gains, losses, distributions, return on invested capital and costs. Example trades, average costs and tax inputs are CalCome arithmetic assumptions, not verified account records or future performance.",
  },
  dca: {
    ko: "미국 SEC의 용어 설명은 일정 금액을 일정 간격으로 투자하면 가격에 따라 매수 수량이 달라지는 원리를 다룹니다. 실제 가격 경로나 적립식 투자의 수익 우위를 보장하지 않습니다.",
    en: "The U.S. SEC definition explains how equal investments at regular intervals buy different quantities as prices change. It does not supply a price path or guarantee that periodic investing outperforms alternatives.",
  },
  fees: {
    ko: "미국 SEC 자료는 투자 수수료가 장기 누적금액을 줄이는 효과를 설명합니다. 입력 수수료가 특정 상품의 모든 비용을 포함한다는 뜻은 아니며 실제 과금 방식은 약관에서 확인해야 합니다.",
    en: "U.S. SEC guidance explains how fees reduce accumulated investment value. It does not establish that an entered fee includes every product cost; check the actual charging method in the product terms.",
  },
  emergency: {
    ko: "미국 CFPB는 비상자금의 목적과 필요액이 개인 사정에 따라 달라짐을 설명합니다. 계산기에 넣는 생활비 개월 수와 추가 지출은 사용자의 계획이며 보편적인 권장 금액이 아닙니다.",
    en: "The U.S. CFPB explains the purpose of emergency savings and why the amount depends on personal circumstances. Entered months of expenses and extra costs are planning choices, not a universal recommended reserve.",
  },
  allocation: {
    ko: "미국 SEC의 자산배분 정의는 투자를 여러 자산군으로 나누는 개념을 뒷받침합니다. 목표 비중과 매매 수량은 입력값에 따른 산술 결과이며 개인에게 적합한 포트폴리오를 추천한 것이 아닙니다.",
    en: "The U.S. SEC definition supports dividing investments among asset classes. Target weights and trades are arithmetic based on inputs, not a recommendation that a portfolio suits your circumstances.",
  },
  bonds: {
    ko: "미국 SEC 자료는 채권의 이자·만기 원금과 투자 위험을 설명합니다. 계산기는 입력한 현금흐름을 할인하며 실제 호가, 발행사의 지급 능력이나 옵션 조건을 검증하지 않습니다.",
    en: "U.S. SEC education describes bond interest, principal repayment and investment risks. The calculator discounts entered cash flows; it does not verify market quotes, issuer solvency or embedded options.",
  },
  crypto: {
    ko: "미국 SEC 직원의 투자자 경고는 가상자산의 변동성·손실·보관 위험을 다루는 배경 자료입니다. 평균단가·손익·스테이킹 보상 공식이나 특정 코인의 법적 지위·보상률을 인증한 자료는 아닙니다.",
    en: "This U.S. SEC staff investor alert provides background on crypto-asset volatility, loss and custody risks. It does not certify average-cost, profit or staking formulas, a token's legal status, or an entered reward rate.",
  },
  fx: {
    ko: "ECB 자료는 유로를 기준통화로 한 참고환율과 그 정보 제공 목적을 설명합니다. 계산기는 사용자가 넣은 환율을 사용하므로 예시 환율을 ECB 실시간 환율이나 거래 가능한 견적으로 해석하면 안 됩니다.",
    en: "ECB material explains euro-base reference quotes and their informational purpose. The calculator uses entered rates; example rates are not live ECB data or executable transaction quotes.",
  },
  nps: {
    ko: "국민연금공단은 사업장가입자의 근로자·사용자 분담과 기준소득월액을 설명합니다. 안내의 2026년 보험료율과 2026년 7월~2027년 6월 소득 상한은 적용 기간이 다르므로 급여월·신고소득·가입 조건을 따로 맞춰야 합니다.",
    en: "NPS explains workplace employee/employer contributions and the standard monthly income base. Its 2026 contribution rate and July 2026–June 2027 income ceiling have different effective periods; align the payroll month, reported income and coverage conditions.",
  },
  health: {
    ko: "국민건강보험공단의 2026년 안내는 직장 건강보험료율, 노사 분담과 건강보험료에서 장기요양보험료를 구하는 비율을 제시합니다. 실제 보수월액·정산·상하한·가입 여부는 개별 조건이며 단순 급여 곱셈과 다를 수 있습니다.",
    en: "The NHIS 2026 notice supplies workplace health rates, cost sharing and the long-term-care ratio applied to health contributions. Actual reported remuneration, adjustments, limits and coverage can differ from a simple salary multiplication.",
  },
  withholding: {
    ko: "국세청 안내는 월 과세급여·본인 포함 가족 수에 따른 간이세액표와 80%·100%·120% 선택을 설명합니다. 연환산 추정식이나 임의 입력 세율을 인증하는 자료는 아닙니다. 안내에 과거 자녀 조정액이 남아 있으므로 자녀 관련 적용액·적용일은 현행 표와 별도로 대조해야 합니다.",
    en: "NTS explains monthly taxable-pay tables, employee-inclusive family counts and 80%/100%/120% elections. It does not validate an annualized estimate or an arbitrary entered rate. The page retains older child adjustments; check child amounts and effective dates against the applicable table separately.",
  },
  freelancer: {
    ko: "국세청 자료는 원천징수 대상 사업소득의 소득세 징수 구조를 설명합니다. 계약 명칭만으로 사업소득 여부가 결정되거나 원천징수액이 최종 종합소득세가 되는 것은 아니며, 지방소득세와 실제 소득 구분도 확인해야 합니다.",
    en: "NTS explains income-tax withholding on qualifying business income. A contract label does not determine income classification, and withholding is not final comprehensive income tax; check classification and local income tax separately.",
  },
  retirementTax: {
    ko: "국세청 자료는 퇴직소득의 근속연수공제·환산급여공제·세율 적용 흐름과 적용 시기별 차이를 설명합니다. 중간정산·비과세·과거 근속기간 등 개인 이력은 간편 예시에 포함되지 않을 수 있습니다.",
    en: "NTS describes service-year deductions, converted-income deductions, tax brackets and changes across effective periods. Interim settlements, exempt payments and employment history may fall outside the simplified example.",
  },
  pensionCredit: {
    ko: "국세청 자료는 연간 근로소득세액공제의 급여별 한도와 연금계좌 납입 세액공제를 구분합니다. 월 간이세액표가 아니며, 입력한 공제율·납입액만으로 개인의 공제 자격이나 실제 환급액이 확정되지 않습니다.",
    en: "NTS distinguishes wage-dependent annual earned-income credit limits from pension-account contribution credits. It is not a monthly withholding table; entered rates and contributions alone do not establish eligibility or an actual refund.",
  },
  gift: {
    ko: "국세청은 증여재산·기존 증여 합산·관계별 공제와 누진세율을 설명합니다. 예시의 공제액이 누구에게나 적용되는 것은 아니며 10년 합산, 평가, 채무·할증·추가 공제 등 개별 조건을 확인해야 합니다.",
    en: "NTS describes gift valuation, aggregation, relationship-based deductions and progressive rates. An example deduction is not universal; check ten-year aggregation, valuation, debt, surcharges and additional deductions for the actual gift.",
  },
  inheritance: {
    ko: "국세청 자료는 상속재산에서 공제·채무 등을 반영해 과세표준과 세액을 구하는 구조를 설명합니다. 거주자 여부·사전증여·배우자 공제·평가와 세액공제는 상속별로 달라 간편 입력만으로 확정되지 않습니다.",
    en: "NTS outlines inheritance valuation, debts, deductions, taxable base and tax. Residency, prior gifts, spouse deductions, valuation and credits vary by estate and are not resolved by simplified inputs alone.",
  },
  vat: {
    ko: "국세청의 부가가치세 개요는 일반과세·간이과세와 매출세액·매입세액의 차이를 설명합니다. 공급가액과 부가세를 분리하는 계산은 실제 신고세액, 면세·영세율 여부나 공제 가능한 매입세액을 판정하지 않습니다.",
    en: "The NTS VAT overview distinguishes taxpayer regimes and output/input tax. Splitting a price into supply value and VAT does not determine return liability, exemptions, zero-rating or deductible input tax.",
  },
  overtime: {
    ko: "고용노동부 상담은 연장·야간·휴일 근로 가산의 구분과 상시 근로자 수 등 적용 조건을 설명합니다. 입력 시간·통상임금·가산율과 중복 가산 여부는 실제 근무기록·계약에 맞춰 확인해야 합니다.",
    en: "MOEL consultation explains overtime, night and holiday premiums and conditions such as workplace size. Check entered hours, ordinary wage, premium rates and overlapping premiums against actual work records and terms.",
  },
  acquisition: {
    ko: "가평군의 취득세 안내는 과세대상·과세표준과 주택 수·지역에 따른 세율 차이를 설명합니다. 입력 세율이나 예시가 취득일의 감면·중과·부가세목까지 판정한 것은 아니므로 관할 지자체와 실제 취득 조건을 대조해야 합니다.",
    en: "Gapyeong's acquisition-tax guide explains taxable property, valuation and rate differences by home count and area. An entered rate or example does not determine acquisition-date exemptions, surcharges or additional levies; verify the transaction with the responsible local authority.",
  },
  capitalGains: {
    ko: "국세청 개요는 양도소득 과세대상과 비과세·감면 및 신고 구조를 설명합니다. 매각대금에서 입력 세금을 빼는 계산이나 단순 차익 계산이 주택 수·거주기간·취득일별 실제 세액을 판정하지는 않습니다.",
    en: "The NTS overview describes taxable disposals, exemptions and filing. Subtracting an entered tax from sale proceeds or calculating a simplified gain does not determine liability for the property's ownership, residency or acquisition history.",
  },
  propertyEducation: {
    ko: "충청북도의 지방교육세 안내는 재산세 등에 덧붙는 지방교육세의 과세표준과 비율을 다룹니다. 이 출처만으로 주택 재산세 본세·공정시장가액비율·도시지역분·감면까지 확인되는 것은 아닙니다.",
    en: "Chungcheongbuk-do's local education-tax guide covers its basis and rate as an addition to taxes such as property tax. It does not by itself verify housing property-tax brackets, assessment ratios, urban levies or relief.",
  },
  holdingTax: {
    ko: "연결된 국세청 안내는 종합부동산세 납부·분납과 농어촌특별세 부가 관계를 설명합니다. 그 자료만으로 계산기의 기본공제·공정시장가액비율·누진세율·개인별 감면이 모두 검증되는 것은 아닙니다.",
    en: "The linked NTS page explains comprehensive real-estate holding-tax payment/installments and the special rural-tax addition. It does not by itself verify every basic deduction, assessment ratio, progressive bracket or individual relief used by the calculator.",
  },
  incomeTax: {
    ko: "국세청 개요는 종합소득 신고 대상과 필요경비를 차감하는 소득금액 계산을 설명합니다. 수입·과세표준·산출세액은 서로 다르며, 입력 공제와 세액공제만으로 모든 소득 합산과 최종 납부액을 확정하지 않습니다.",
    en: "The NTS overview explains filing scope and income after allowable expenses. Receipts, taxable base and calculated tax differ; entered deductions and credits do not establish complete income aggregation or final liability.",
  },
  isa: {
    ko: "미래에셋증권의 상품 안내는 ISA 유형별 가입 요건·비과세 한도·유지 조건을 설명하는 금융회사 자료입니다. 입력 수익·손실의 세무 구분이나 가입자 자격을 자동 판정하지 않으며 실제 계좌 약관과 적용 시점을 확인해야 합니다.",
    en: "Mirae Asset's provider information explains ISA account types, eligibility, exemptions and holding conditions. It does not automatically classify entered gains/losses or establish your eligibility; check the actual account terms and effective date.",
  },
  severance: {
    ko: "고용노동부의 계산 안내는 퇴직 전 평균임금과 근속기간을 사용하는 퇴직금 구조를 보여 줍니다. 제외 기간·상여·연차수당·통상임금과의 비교·수급 요건은 실제 이력에 맞춰 확인해야 합니다.",
    en: "MOEL's calculator explains severance using pre-retirement average wage and service duration. Check excluded periods, bonus and leave-pay treatment, ordinary-wage comparisons and eligibility against actual employment history.",
  },
  unemployment: {
    ko: "고용노동부 상담은 평균임금에 따른 구직급여 일액과 상·하한, 수급 요건을 설명합니다. 상담 답변일과 이직일의 적용 기준을 구분해야 하며 계산 결과만으로 수급 자격·실업인정일·지급일수가 확정되지는 않습니다.",
    en: "MOEL consultation explains daily unemployment benefit based on average wage, floors/caps and eligibility. Distinguish the answer date from rules applicable on separation; a calculation does not establish eligibility, recognized unemployment days or payment duration.",
  },
  minimum: {
    ko: "최저임금위원회는 적용 연도별 시간급과 고시상 월 209시간 환산액을 제시합니다. 209시간이 모든 근로자의 실제 근로시간은 아니며, 선택 연도·주휴·산입 임금 범위를 맞춰 비교해야 합니다.",
    en: "The Minimum Wage Commission publishes hourly rates by effective year and the notified 209-hour monthly equivalent. That is not every worker's actual schedule; align the year, paid weekly holiday and included wage components.",
  },
  employmentInsurance: {
    ko: "고용노동부 자료는 실업급여 보험료의 노사 분담과 사업규모별 사업주 추가 부담을 구분합니다. 신고 보수월액·가입 범위·사업규모·산재보험은 별도 조건으로 단순 급여 비율 계산과 다를 수 있습니다.",
    en: "MOEL distinguishes shared unemployment-insurance contributions from employer-only charges by business size. Reported remuneration, coverage, business size and industrial-accident insurance require separate checks beyond multiplying salary by a rate.",
  },
  annualLeave: {
    ko: "고용노동부 상담은 출근율·근속기간·사업장 규모에 따른 연차 발생과 미사용 수당 조건을 설명합니다. 계산기에 넣은 잔여 일수가 법적으로 확정된 일수라는 뜻은 아니며 사용촉진·퇴직일·취업규칙도 확인해야 합니다.",
    en: "MOEL consultation explains leave accrual and unused-leave pay conditions involving attendance, service and workplace size. Entered unused days are not legally established entitlements; check leave-use procedures, termination date and workplace rules.",
  },
  dailyWorker: {
    ko: "국세청 자료는 일용근로소득과 일반 근로소득의 구분, 일별 공제·세액공제·원천징수 구조를 설명합니다. 실제 일용근로자 해당 여부와 지급 묶음·소액부징수·지방소득세 처리는 지급 조건별로 확인해야 합니다.",
    en: "NTS distinguishes daily-worker from regular employment income and explains daily deductions, credits and withholding. Verify worker classification, grouped payments, small-tax collection thresholds and local income-tax handling for the actual payment.",
  },
  parental: {
    ko: "고용노동부의 해당 상담은 통상임금 기준 일반 육아휴직급여의 기간별 비율·상한을 설명합니다. 부모 동시·순차 사용 특례, 한부모·분할 사용·연장 자격 등 모든 경우를 계산기가 자동 판정한다는 뜻은 아닙니다.",
    en: "This MOEL consultation explains standard parental-leave benefit percentages and caps by period using ordinary wage. It does not establish automatic handling of joint/sequential-parent schemes, single-parent cases, split leave or extension eligibility.",
  },
  maternity: {
    ko: "고용노동부 상담은 2026년 출산전후휴가 급여 상한과 기업 규모·휴가 유형별 지원 기간을 설명합니다. 휴가 개시·지급 시점, 피보험 자격·하한·사업주 차액과 특수 휴가 유형은 개인별로 확인해야 합니다.",
    en: "MOEL consultation explains the 2026 maternity-benefit cap and support periods by employer size and leave type. Check leave/payment dates, insurance eligibility, floors, employer top-ups and special leave types for the individual case.",
  },
  hf: {
    ko: "한국주택금융공사 안내는 일반전세자금보증의 요건과 여러 한도 중 작은 금액을 적용하는 구조를 설명합니다. 다른 보증상품·지역·주택 보유·기존 보증·은행 심사는 별도이며 계산값이 대출 승인액은 아닙니다.",
    en: "HF explains eligibility for its general jeonse guarantee and taking the smallest of several limits. Other products, location, home ownership, existing guarantees and bank underwriting need separate checks; the result is not an approved loan amount.",
  },
  brokerage: {
    ko: "서울시 자료는 물건·거래 유형별 중개보수 상한과 그 이내 협의 원칙을 설명합니다. 상한이 반드시 실제 청구액은 아니며 다른 지역의 적용 규정·부가세·합의한 보수를 확인해야 합니다.",
    en: "Seoul guidance explains brokerage ceilings by property/transaction type and negotiation within those limits. A ceiling is not necessarily the charged fee; check applicable local rules, VAT and the agreed commission.",
  },
  calendar: {
    ko: "미 해군천문대 자료는 그레고리력과 윤년 규칙의 근거입니다. 법적 나이의 예외, 한국 공휴일·영업일 또는 유급 근로시간을 정하는 자료는 아니며 포함일·제외일은 계산기의 표시 기준을 따릅니다.",
    en: "USNO explains Gregorian-calendar and leap-year rules. It does not establish legal-age exceptions, Korean holidays/business days or paid working hours; included and excluded endpoints follow this calculator's stated convention.",
  },
};

export const retainedSourceScopes: Record<string, LocalizedSourceContext> = {
  "https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields":
    {
      ko: "금융회사 Fidelity는 현재수익률과 만기수익률, 쿠폰·가격·상환금의 관계를 설명합니다. 계산기의 지급 주기·재투자·세금·옵션 가정이나 실제 채권 가격을 인증하는 자료는 아닙니다.",
      en: "Financial provider Fidelity explains current yield, yield to maturity, coupons, price and repayment. It does not certify this tool's payment-frequency, reinvestment, tax or option assumptions, or an actual bond quote.",
    },
  "https://www.sec.gov/investor/pubs/begfinstmtguide.htm": {
    ko: "미국 SEC의 재무제표 입문 자료는 매출·비용·영업이익·현금흐름의 차이를 설명합니다. 입력 비용의 회계상 분류나 완전성을 감사한 것이 아니므로 실제 회사의 회계정책·비용 누락을 확인해야 합니다.",
    en: "The U.S. SEC financial-statements primer distinguishes revenue, expenses, operating profit and cash flow. It does not audit the classification or completeness of entered costs; check the business's accounting policies and omitted costs.",
  },
  "https://1350.moel.go.kr/rtmview.do?id=1000278825": {
    ko: "고용노동부 상담은 소정근로시간·개근 등 주휴 요건과 규칙적·불규칙적 근무의 시간 산정을 설명합니다. 계산기의 비례 환산이 모든 근무형태에 동일하게 적용된다는 뜻은 아니며 계약상 소정근로일을 확인해야 합니다.",
    en: "MOEL consultation explains weekly paid-holiday conditions and hours for regular versus irregular schedules. The calculator's proportional conversion does not apply identically to every work pattern; check the contracted workdays and scheduled hours.",
  },
  "https://aa.usno.navy.mil/faq/leap_years": {
    ko: "미 해군천문대 자료는 그레고리력의 평균 1년이 365.2425일인 이유를 설명합니다. 이를 주·월로 바꾸는 값은 평균 환산이며 실제 급여월의 일수나 한국의 법정 유급시간 기준은 아닙니다.",
    en: "USNO explains the Gregorian average year of 365.2425 days. Converting it into weeks/months is an averaging convention, not the days in a particular payroll month or a South Korea statutory paid-hour rule.",
  },
};

const scopesByHref = new Map(
  Object.entries(calculatorExampleSources).map(([key, source]) => [
    source.href,
    calculatorSourceScopes[key],
  ]),
);

export function getCalculatorSourceScope(href: string) {
  return scopesByHref.get(href) ?? retainedSourceScopes[href];
}

// These tools use explicit arithmetic assumptions, not an external policy rate.
// List each exception so new unsourced tools cannot silently inherit boilerplate.
export const calculatorArithmeticBasis: Record<string, LocalizedSourceContext> =
  {
    "salary-raise": {
      ko: "기존 급여 × (1 + 인상률)이라는 산술 모델입니다. 인상률은 입력 가정이며 시장 연봉 통계나 실수령 증가율의 근거를 인용하지 않습니다.",
      en: "This is current pay × (1 + entered raise). The raise is an assumption; no market-pay dataset or take-home growth estimate is being cited.",
    },
    "salary-conversion": {
      ko: "연간 금액을 12개월·52주로 나누는 명시적 환산 모델입니다. 52주는 편의를 위한 기준이며 달력의 정확한 길이나 법정 유급시간 산식의 출처를 인용한 것이 아닙니다.",
      en: "The model divides annual pay by 12 months or 52 weeks. The 52-week convention is explicit, not a cited exact calendar length or statutory paid-hour formula.",
    },
    "gross-up-salary": {
      ko: "목표 순액 ÷ (1 − 가정 공제율)이라는 역산입니다. 공제율은 고정 입력값이며 누진세·보험료를 역산하는 법정 급여 모델의 출처를 주장하지 않습니다.",
      en: "This reverses a flat deduction: target net ÷ (1 − assumed rate). The fixed input is not a sourced statutory inversion of progressive taxes or insurance contributions.",
    },
    "total-compensation-comparison": {
      ko: "반복되는 연 보상에 비교 연수를 곱하고 일회성 보너스를 한 번 더하는 비교입니다. 주식·복지·보너스 금액은 입력 가정이며 시장가치·권리 확정·세무 처리를 검증한 외부 자료가 아닙니다.",
      en: "The comparison multiplies recurring annual compensation by years and adds a one-time bonus once. Equity, benefits and bonuses are inputs, not externally verified values, vesting entitlements or tax treatment.",
    },
    "salary-negotiation-target": {
      ko: "현재 연봉에 사용자가 정한 인상률을 각각 적용합니다. 목표 구간은 산술 시나리오이며 채용시장 통계나 협상 성공률을 인용한 권고가 아닙니다.",
      en: "Each entered raise percentage is applied to current annual pay. The targets are arithmetic scenarios, not recommendations derived from labor-market data or negotiation success rates.",
    },
    percentage: {
      ko: "부분÷전체, 기준값×비율 등 표시된 분모에 따른 산술입니다. 음수 기준의 변화율에는 이전 값의 절댓값을 쓰는 모델 규칙을 적용하며 특정 통계 표준을 인용하지 않습니다.",
      en: "This uses the stated arithmetic denominators, such as part ÷ whole. Changes from a negative baseline use the model's absolute-previous-value convention, not a cited statistical standard.",
    },
    "discount-sale-price": {
      ko: "단가에 할인율을 적용한 뒤 수량을 곱합니다. 할인율·수량은 가정 입력이며 판매자의 실제 쿠폰·세금·배송 조건을 확인한 견적은 아닙니다.",
      en: "The model discounts a unit price and multiplies by quantity. Rates and quantities are inputs, not a verified seller quote including coupon, tax and shipping conditions.",
    },
    "rent-conversion-rate": {
      ko: "연간 월세 ÷ 보증금 차액으로 입력 계약의 환산 비율을 계산합니다. 법정 전월세 전환율 상한이나 지역 시세를 출처로 사용하거나 자동 판정하지 않습니다.",
      en: "Annual rent ÷ deposit difference describes the entered terms. The calculator does not source or automatically determine a legal rent-conversion ceiling or local market rate.",
    },
    "jeonse-monthly-rent-conversion": {
      ko: "보증금 차액 × 입력 연이율 ÷ 12의 산술 환산입니다. 입력 이율은 가정값이며 법정 상한·계약 갱신 요건·시장 환산율의 검증 자료를 인용하지 않습니다.",
      en: "This converts deposit difference × entered annual rate ÷ 12. The rate is assumed, not evidence of a legal ceiling, renewal eligibility or prevailing market conversion rate.",
    },
    "rent-affordability": {
      ko: "선택한 주거비 비율과 지출 후 남는 예산 중 작은 값을 사용합니다. 주거비 비율은 사용자가 정한 계획이며 모든 가구에 적합하다는 연구·정책 기준을 인용하지 않습니다.",
      en: "The model takes the smaller of the chosen housing-income share and remaining cash-flow budget. The share is a planning choice, not a cited research or policy threshold suitable for every household.",
    },
    "jeonse-vs-rent": {
      ko: "대출이자·월세와 자기자금의 가정 기회비용을 같은 기간으로 비교합니다. 기회수익률과 금리는 입력값이며 보증금 회수 가능성이나 미래 수익의 외부 검증 자료가 아닙니다.",
      en: "The model compares loan interest, rent and an assumed opportunity cost over the same period. Entered rates do not provide external evidence of deposit recoverability or future investment returns.",
    },
    "rental-yield": {
      ko: "공실을 반영한 임대수입에서 운영비를 뺀 뒤 매입가로 나누는 모델입니다. 임대료·공실률·비용은 입력 가정이며 감정평가나 해당 지역의 시장조사 결과를 인용하지 않습니다.",
      en: "The model deducts operating costs from vacancy-adjusted rent and divides by purchase price. Rent, vacancy and costs are assumptions, not a cited appraisal or local-market survey.",
    },
    "apartment-management-fee-budget": {
      ko: "월 지출에 연간 특별부담금의 12분의 1을 더하는 예산입니다. 입력값은 가정 또는 사용자의 고지서 값이며 공공 관리비 통계나 법적 부담 의무를 자동 조회하지 않습니다.",
      en: "The budget adds monthly costs and one-twelfth of annual assessments. Inputs are assumptions or your bill amounts; the calculator does not retrieve public fee statistics or determine legal payment obligations.",
    },
    "break-even-sales": {
      ko: "고정비를 단위 공헌이익 또는 공헌이익률로 나누는 모델입니다. 판매가격·변동비가 유지된다는 가정이며 시장 수요나 회사 회계자료의 완전성을 검증하는 외부 출처는 없습니다.",
      en: "The model divides fixed costs by unit contribution or contribution margin. It assumes stable price and variable cost; it does not cite external verification of demand or the completeness of company accounts.",
    },
    "business-cash-runway": {
      ko: "보유 현금 ÷ 월 순현금유출의 일정 현금흐름 모델입니다. 현금·수입·지출은 입력값이며 매출채권 회수나 미래 조달을 검증한 외부 자료가 아닙니다. 순유출이 0 이하이면 유한한 소진 개월 수를 계산하지 않습니다.",
      en: "This is a constant-cash-flow model: available cash ÷ monthly net outflow. Cash, receipts and payments are inputs, not externally verified collections or future funding. Non-positive net outflow does not produce a finite runway.",
    },
  };
