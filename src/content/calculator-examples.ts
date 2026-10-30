export type CalculatorExampleCopy = {
  answer: string;
  example: string;
  check: string;
};
export type CalculatorExample = {
  ko: CalculatorExampleCopy;
  en: CalculatorExampleCopy;
  sources: string[];
  related: string[];
};
export type CalculatorExampleSource = { href: string; ko: string; en: string };

export const calculatorExampleSources: Record<string, CalculatorExampleSource> =
  {
    ltv: {
      href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-loan-to-value-ratio-in-an-auto-loan-en-769/",
      ko: "CFPB: LTV 비율의 정의",
      en: "CFPB: loan-to-value definition",
    },
    dti: {
      href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/",
      ko: "CFPB: 부채/소득 비율",
      en: "CFPB: debt-to-income ratio",
    },
    amortization: {
      href: "https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/",
      ko: "CFPB: 원금·이자와 대출 상환",
      en: "CFPB: principal, interest and amortization",
    },
    compound: {
      href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
      ko: "SEC Investor.gov: 복리와 정기 납입",
      en: "SEC Investor.gov: compounding and contributions",
    },
    returns: {
      href: "https://syndication.finra.org/content/key-concepts-return-and-rate-return",
      ko: "FINRA: 손익과 수익률",
      en: "FINRA: return and rate of return",
    },
    dca: {
      href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging",
      ko: "SEC Investor.gov: 정액 적립식 투자",
      en: "SEC Investor.gov: dollar-cost averaging",
    },
    fees: {
      href: "https://www.investor.gov/introduction-investing/getting-started/understanding-fees",
      ko: "SEC Investor.gov: 수수료의 누적 영향",
      en: "SEC Investor.gov: investment fees",
    },
    emergency: {
      href: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      ko: "CFPB: 비상자금의 목적과 개인별 필요액",
      en: "CFPB: emergency-fund planning",
    },
    allocation: {
      href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/asset-allocation",
      ko: "SEC Investor.gov: 자산 배분",
      en: "SEC Investor.gov: asset allocation",
    },
    bonds: {
      href: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds",
      ko: "SEC Investor.gov: 채권 현금흐름과 위험",
      en: "SEC Investor.gov: bond cash flows and risks",
    },
    crypto: {
      href: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/crypto-asset-securities",
      ko: "SEC Investor.gov: 가상자산 투자 위험",
      en: "SEC Investor.gov: crypto-asset investment risks",
    },
    fx: {
      href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      ko: "ECB: 기준환율의 방향과 용도",
      en: "ECB: reference-rate direction and purpose",
    },
    nps: {
      href: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do",
      ko: "국민연금공단: 사업장 보험료와 기준소득",
      en: "NPS: workplace contributions and income base",
    },
    health: {
      href: "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html",
      ko: "국민건강보험: 2026년 건강·장기요양 요율",
      en: "NHIS: 2026 health and long-term care rates",
    },
    withholding: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862",
      ko: "국세청: 근로소득 간이세액표",
      en: "NTS: earned-income withholding table",
    },
    freelancer: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7902&mi=6466",
      ko: "국세청: 사업소득 원천징수",
      en: "NTS: business-income withholding",
    },
    retirementTax: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7880",
      ko: "국세청: 퇴직소득세 계산 구조",
      en: "NTS: retirement-income tax calculation",
    },
    pensionCredit: {
      href: "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596",
      ko: "국세청: 근로소득 세액공제와 연금계좌",
      en: "NTS: earned-income credits and pension accounts",
    },
    gift: {
      href: "https://s.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7960&mi=6533",
      ko: "국세청: 증여세 산출 구조",
      en: "NTS: gift-tax calculation",
    },
    inheritance: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7720&mi=2312",
      ko: "국세청: 상속세 과세와 공제",
      en: "NTS: inheritance-tax rates and deductions",
    },
    vat: {
      href: "https://b.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272",
      ko: "국세청: 부가가치세 개요",
      en: "NTS: VAT overview",
    },
    overtime: {
      href: "https://1350.moel.go.kr/rtmview.do?id=1000111373",
      ko: "고용노동부: 연장·야간·휴일 근로 가산",
      en: "MOEL: overtime, night and holiday premiums",
    },
    acquisition: {
      href: "https://www.gp.go.kr/portal/contents.do?key=799",
      ko: "가평군: 취득세와 적용 조건",
      en: "Gapyeong: acquisition-tax scope and conditions",
    },
    capitalGains: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308",
      ko: "국세청: 양도소득세 개요",
      en: "NTS: capital-gains tax overview",
    },
    propertyEducation: {
      href: "https://www.chungbuk.go.kr/tax/contents.do?key=1219",
      ko: "충청북도: 지방교육세 과세 기준",
      en: "Chungcheongbuk-do: local education tax",
    },
    holdingTax: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7734&mi=2354",
      ko: "국세청: 종부세와 농어촌특별세",
      en: "NTS: holding tax and special rural tax",
    },
    incomeTax: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7664&mi=2224",
      ko: "국세청: 종합소득세 개요",
      en: "NTS: comprehensive income tax overview",
    },
    isa: {
      href: "https://trading.securities.miraeasset.com/hks/hks4659/n02.do",
      ko: "미래에셋증권: ISA 유형별 세제·유지 조건",
      en: "Mirae Asset: ISA account types and tax conditions",
    },
    severance: {
      href: "https://1350.moel.go.kr/home/hp/retirementpaycal/retirementpaycal.jsp",
      ko: "고용노동부: 평균임금과 퇴직금 계산",
      en: "MOEL: average wage and severance",
    },
    unemployment: {
      href: "https://1350.moel.go.kr/rtmview.do?id=1000320790",
      ko: "고용노동부: 2026년 구직급여 산정",
      en: "MOEL: 2026 unemployment benefit calculation",
    },
    minimum: {
      href: "https://www.minimumwage.go.kr/minWage/policy/decisionMain.do",
      ko: "최저임금위원회: 적용 연도별 최저임금",
      en: "Minimum Wage Commission: annual minimum wage",
    },
    employmentInsurance: {
      href: "https://www.moel.go.kr/info/astmgmt/employ/employList.do",
      ko: "고용노동부: 고용보험 요율과 사업주 부담",
      en: "MOEL: employment-insurance contributions",
    },
    annualLeave: {
      href: "https://1350.moel.go.kr/rtmview.do?id=1000135863",
      ko: "고용노동부: 연차휴가 발생 조건",
      en: "MOEL: annual-leave eligibility",
    },
    dailyWorker: {
      href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7863&mi=6584",
      ko: "국세청: 일용근로소득 원천징수",
      en: "NTS: daily-worker income withholding",
    },
    parental: {
      href: "https://1350.moel.go.kr/rtmview.do?id=1000325830&page=5&type=ALL",
      ko: "고용노동부: 육아휴직 급여 구간과 상한",
      en: "MOEL: parental-leave benefit tiers",
    },
    maternity: {
      href: "https://1350.moel.go.kr/rtmview.do?id=1000325544",
      ko: "고용노동부: 2026년 출산전후휴가 급여 상한",
      en: "MOEL: 2026 maternity-leave benefit cap",
    },
    hf: {
      href: "https://www.hf.go.kr/ko/sub02/sub02_01_02.do",
      ko: "한국주택금융공사: 일반전세자금보증 한도",
      en: "HF: general jeonse guarantee limits",
    },
    brokerage: {
      href: "https://land.seoul.go.kr/land/broker/brokerageCommission.do",
      ko: "서울부동산정보광장: 중개보수 상한과 협의",
      en: "Seoul: negotiated brokerage fees and ceilings",
    },
    calendar: {
      href: "https://aa.usno.navy.mil/faq/calendars",
      ko: "미 해군천문대: 그레고리력과 윤년",
      en: "USNO: Gregorian calendar and leap years",
    },
  };

export const calculatorExamples: Record<string, CalculatorExample> = {
  ltv: {
    ko: {
      answer:
        "LTV는 담보가치에 대한 대출금의 비율입니다. 목표 비율로 구한 금액은 담보 기준의 비교값입니다.",
      example:
        "담보가치 300,000,000원, 대출 180,000,000원이라면 LTV는 60%입니다. 목표 LTV 70%의 금액은 210,000,000원, 추가 여력은 30,000,000원입니다.",
      check:
        "목표 70%는 예시 입력값입니다. DSR·소득·담보평가와 금융기관 심사에 따른 실제 한도를 별도로 확인하세요.",
    },
    en: {
      answer:
        "LTV is the loan amount divided by collateral value. A target ratio gives a collateral-based comparison amount.",
      example:
        "A property value of 300,000,000 and loan of 180,000,000 give 60% LTV. A hypothetical 70% target gives 210,000,000, leaving 30,000,000 of capacity in the same currency.",
      check:
        "The 70% target is hypothetical. Income, debt service, valuation and lender underwriting can impose a lower limit.",
    },
    sources: ["ltv"],
    related: ["dsr", "mortgage-loan-limit"],
  },
  dsr: {
    ko: {
      answer:
        "이 계산기의 DSR은 기존 연간 원리금과 신규 대출의 연간 원리금을 합쳐 연소득으로 나눈 값입니다.",
      example:
        "연소득 60,000,000원, 기존 연간 원리금 6,000,000원, 신규 대출 12,000,000원·1년·금리 0%의 비교 조건이면 신규 월 상환액은 1,000,000원, DSR은 30%입니다.",
      check:
        "0%는 계산 구조를 보여 주는 예시입니다. 대출 종류별 인정 만기·스트레스금리·제외 항목을 모두 재현하는 규제 심사기가 아닙니다.",
    },
    en: {
      answer:
        "This DSR model divides existing plus new annual principal-and-interest payments by annual income.",
      example:
        "For annual income 60,000,000, existing annual debt service 6,000,000 and a 12,000,000 one-year loan at a hypothetical 0% rate, the new monthly payment is 1,000,000 and DSR is 30%.",
      check:
        "The 0% rate illustrates the arithmetic. Product-specific recognized terms, stress rates and regulatory exclusions can change an actual assessment.",
    },
    sources: ["dti", "amortization"],
    related: ["stress-dsr", "loan-affordability"],
  },
  dti: {
    ko: {
      answer:
        "주택대출 월 원리금과 입력한 기타 월 부채를 연간으로 환산해 연소득 대비 비율을 구합니다.",
      example:
        "연소득 60,000,000원, 주택대출 12,000,000원·1년·예시 금리 0%, 기타 월 부채 500,000원이면 월 부채 합계 1,500,000원, DTI 30%입니다.",
      check:
        "기타 월 부채는 이 모델에 포함하려는 금액을 입력합니다. 한국의 상품별 규제 DTI와 일반적인 부채/소득 비율의 산입 범위는 다를 수 있습니다.",
    },
    en: {
      answer:
        "The calculator annualizes mortgage payments plus entered other monthly debt and divides by annual income.",
      example:
        "Annual income of 60,000,000, a 12,000,000 one-year mortgage at an illustrative 0%, and other monthly debt of 500,000 give total monthly debt of 1,500,000 and DTI of 30%.",
      check:
        "Enter the other monthly debt you want included. This general debt-payment model can differ from a jurisdiction's product-specific regulatory DTI.",
    },
    sources: ["dti"],
    related: ["dsr", "mortgage-payment"],
  },
  loan: {
    ko: {
      answer:
        "상환 방식에 따라 월 납부액과 총 이자가 달라집니다. 원금균등은 남은 원금이 줄면서 월 이자도 감소합니다.",
      example:
        "12,000,000원, 연 12%, 12개월, 원금균등이면 매월 원금 1,000,000원입니다. 첫 달 납부액은 1,120,000원, 마지막은 1,010,000원, 총 이자는 780,000원입니다.",
      check:
        "금리는 예시이며 일정한 월 금리를 가정합니다. 실제 일수 이자·변동금리·수수료·회차별 절사는 계약과 다를 수 있습니다.",
    },
    en: {
      answer:
        "Repayment method changes both payment timing and total interest. Equal-principal repayment reduces interest as the balance falls.",
      example:
        "For 12,000,000 at 12% annually over 12 months with equal-principal repayment, principal is 1,000,000 monthly. The first payment is 1,120,000, the last is 1,010,000 and total interest is 780,000.",
      check:
        "Rates are illustrative and constant monthly periods are assumed. Daily accrual, variable rates, fees and installment rounding depend on the contract.",
    },
    sources: ["amortization"],
    related: ["loan-interest-comparison", "early-loan-repayment-fee"],
  },
  "loan-interest-comparison": {
    ko: {
      answer:
        "같은 원금과 기간의 원리금균등 상환을 두 금리로 비교합니다. 비교 결과는 입력 금리의 이자 차이입니다.",
      example:
        "원금 12,000,000원·12개월에서 A와 B를 모두 예시 금리 6%로 두면 월 상환액과 총 이자가 같아 이자 절감액은 0원입니다. 한쪽 금리만 낮추면 차이를 확인할 수 있습니다.",
      check:
        "상환 기간과 방식이 같은 조건의 비교입니다. 보증료·취급비·우대 조건은 포함되지 않으므로 갈아타기 비용은 별도로 합산하세요.",
    },
    en: {
      answer:
        "Compare two rates on the same principal and equal-payment term. The result isolates interest differences for the entered assumptions.",
      example:
        "For 12,000,000 over 12 months with both illustrative rates set to 6%, payments and total interest match, so interest savings are zero. Change just one rate to compare the difference.",
      check:
        "Use matching terms and repayment methods. Guarantee fees, arrangement costs and eligibility conditions are excluded; add refinancing costs separately.",
    },
    sources: ["amortization"],
    related: ["loan-refinancing-savings", "loan"],
  },
  "loan-refinancing-savings": {
    ko: {
      answer:
        "대환 순절감액은 남은 기간의 이자 감소액에서 대환 비용을 뺀 값입니다. 월 납부액 감소만으로 유리함을 판단하지 않습니다.",
      example:
        "잔액 12,000,000원·잔여 12개월, 기존/신규 금리를 모두 6%, 대환 비용을 100,000원으로 입력하면 이자 절감은 0원, 순절감은 −100,000원입니다.",
      check:
        "같은 잔여 만기의 원리금균등 비교입니다. 중도상환수수료 등 실제 비용을 입력하고, 월 절감액이 0 이하이면 비용 회수 기간을 해석하지 마세요.",
    },
    en: {
      answer:
        "Net refinancing savings subtract switching costs from remaining-term interest savings. A smaller monthly payment alone does not establish a benefit.",
      example:
        "With a 12,000,000 balance, 12 remaining months, both rates at 6% and switching costs of 100,000, interest savings are zero and net savings are −100,000.",
      check:
        "This assumes equal-payment loans with the same remaining term. Include actual switching costs; a nonpositive monthly saving has no positive break-even period.",
    },
    sources: ["amortization"],
    related: ["early-loan-repayment-fee", "loan-interest-comparison"],
  },
  "balloon-payment": {
    ko: {
      answer:
        "잔존가치·유예 원금은 매월 납부액 외에 만기에 남는 상환 부담입니다.",
      example:
        "원금 12,000,000원, 예시 금리 0%, 12개월, 만기 유예금 6,000,000원이면 매월 500,000원을 내고 만기에 유예금 6,000,000원을 추가로 상환합니다.",
      check:
        "낮은 월 납부액이 총비용 감소를 뜻하지는 않습니다. 만기 유예금 조달, 실제 금리와 약정 수수료를 함께 확인하세요.",
    },
    en: {
      answer:
        "A balloon is deferred principal due at maturity in addition to regular installments.",
      example:
        "For principal 12,000,000, an illustrative 0% rate, 12 months and a 6,000,000 balloon, regular payments are 500,000 monthly, with the 6,000,000 balloon added at maturity.",
      check:
        "A low installment need not mean lower total cost. Plan for the balloon funding and check the actual rate and contractual fees.",
    },
    sources: ["amortization"],
    related: ["loan", "mortgage-payment"],
  },
  "mortgage-payment": {
    ko: {
      answer:
        "월 주택비는 대출 원리금에 입력한 월 추가 비용을 더한 금액입니다.",
      example:
        "집값 300,000,000원, 자기자금 180,000,000원, 예시 금리 0%, 10년이면 대출은 120,000,000원이고 월 원리금은 1,000,000원입니다. 월 추가 비용 200,000원을 더하면 1,200,000원입니다.",
      check:
        "세금·보험·관리비는 월 추가 비용에 직접 반영해야 합니다. 취득세와 초기 거래 비용은 별도이며 대출 승인을 예측하지 않습니다.",
    },
    en: {
      answer:
        "Estimated monthly housing cost adds entered recurring costs to mortgage principal and interest.",
      example:
        "A 300,000,000 home with 180,000,000 down, a hypothetical 0% rate and ten years needs a 120,000,000 loan. Monthly principal is 1,000,000; adding 200,000 recurring costs gives 1,200,000.",
      check:
        "Enter taxes, insurance and management fees in recurring costs if relevant. Acquisition and closing costs are separate; this is not an approval prediction.",
    },
    sources: ["amortization"],
    related: ["home-purchase-total-cost", "mortgage-loan-limit"],
  },
  "jeonse-loan-interest": {
    ko: {
      answer:
        "보증금에서 자기자금을 뺀 대출금에 연이율을 적용해 월 이자와 입력 수수료를 합산합니다.",
      example:
        "보증금 200,000,000원, 자기자금 80,000,000원, 연 4%, 기간 2년, 월 수수료 10,000원이면 대출 120,000,000원, 월 이자 400,000원, 월 부담 410,000원입니다.",
      check:
        "이자만 납부하고 원금은 유지하는 단순 모델입니다. 보증료·변동금리·원금 상환·대출 가능 여부는 별도 확인이 필요합니다.",
    },
    en: {
      answer:
        "Subtract own funds from the jeonse deposit, calculate loan interest and add entered monthly fees.",
      example:
        "A KRW 200,000,000 deposit, KRW 80,000,000 own funds, 4% annual interest, two years and KRW 10,000 monthly fees give a KRW 120,000,000 loan, KRW 400,000 monthly interest and KRW 410,000 monthly cost.",
      check:
        "This simple interest-only model keeps principal constant. Guarantee fees, rate resets, principal repayments and eligibility require separate checks.",
    },
    sources: ["amortization"],
    related: ["jeonse-loan-limit", "jeonse-vs-rent"],
  },
  "credit-loan-interest": {
    ko: {
      answer:
        "만기일시상환처럼 원금을 유지하는 조건의 이자와 월 수수료를 계산합니다.",
      example:
        "대출 30,000,000원·연 6%·12개월·월 수수료 10,000원이면 월 이자 150,000원, 월 부담 160,000원, 기간 이자와 수수료 합계 1,920,000원입니다.",
      check:
        "기간 비용에는 원금 상환액을 포함하지 않습니다. 원리금균등이나 원금균등 대출은 대출 계산기로 비교하세요.",
    },
    en: {
      answer:
        "Calculate interest and monthly fees while holding principal constant, as in an interest-only comparison.",
      example:
        "A 30,000,000 loan at 6% for 12 months plus 10,000 monthly fees gives 150,000 monthly interest, 160,000 monthly cost and 1,920,000 total interest plus fees.",
      check:
        "Period cost excludes principal repayment. Use the loan calculator for amortizing equal-payment or equal-principal schedules.",
    },
    sources: ["amortization"],
    related: ["loan", "debt-repayment-period"],
  },
  "early-loan-repayment-fee": {
    ko: {
      answer:
        "입력 수수료율에 약정기간 중 남은 기간 비율을 곱하는 비례 추정입니다.",
      example:
        "상환액 20,000,000원·수수료율 1.2%·약정 36개월·경과 12개월이면 남은 비율은 24/36이고 수수료는 160,000원입니다.",
      check:
        "실제 면제 기간·일수 계산·부분 면제·상품별 산식과 다를 수 있습니다. 1.2%는 현행 표준 요율이 아니라 예시 입력입니다.",
    },
    en: {
      answer:
        "The estimate scales the entered fee rate by the fraction of the original term remaining.",
      example:
        "For repayment 20,000,000, an illustrative 1.2% fee, 36 original months and 12 elapsed months, the remaining fraction is 24/36 and the estimated fee is 160,000.",
      check:
        "Actual waivers, daily calculations, partial exemptions and product formulas can differ. The 1.2% input is an example, not a current standard rate.",
    },
    sources: ["amortization"],
    related: ["loan-refinancing-savings", "loan"],
  },
  "loan-affordability": {
    ko: {
      answer:
        "입력한 소득 대비 상환 한도에서 기존 월 부채를 빼 신규 대출에 쓸 월 상환액을 구합니다.",
      example:
        "연소득 60,000,000원·비교 한도 40%·기존 월 부채 500,000원이면 가용 월 상환액은 1,500,000원입니다. 예시 금리 0%·10년이면 원금 비교값은 180,000,000원입니다.",
      check:
        "입력 40%는 예산 가정입니다. 실제 규제 비율이나 신용·담보 심사 결과로 보지 마세요.",
    },
    en: {
      answer:
        "Subtract existing monthly debt from the entered income-based debt-service budget to find capacity for a new loan.",
      example:
        "Annual income 60,000,000, a hypothetical 40% debt-service budget and 500,000 existing monthly debt leave 1,500,000 monthly. At an illustrative 0% over ten years, the principal comparison is 180,000,000.",
      check:
        "The 40% input is a budgeting assumption, not a statement of applicable regulation or credit approval.",
    },
    sources: ["dti", "amortization"],
    related: ["dsr", "mortgage-loan-limit"],
  },
  "debt-repayment-period": {
    ko: {
      answer:
        "월 납부액이 월 이자를 넘겨야 원금이 줄어듭니다. 마지막 회차는 남은 원리금만 납부합니다.",
      example:
        "잔액 1,200,000원·연 12%·월 납부 112,000원이면 첫 달 이자 12,000원, 원금 감소 100,000원입니다. 같은 잔액에서 월 12,000원만 내면 원금이 줄지 않아 상환 완료 기간을 구할 수 없습니다.",
      check:
        "추가 사용·연체·수수료·금리 변경은 반영하지 않습니다. 1,200개월 이내 상환되지 않는 조건도 완료 기간을 표시하지 않습니다.",
    },
    en: {
      answer:
        "Monthly payment must exceed monthly interest to reduce principal. The final installment pays only the remaining amount due.",
      example:
        "For a balance of 1,200,000 at 12% and monthly payment 112,000, first-month interest is 12,000 and principal falls by 100,000. Paying only 12,000 monthly would not reduce principal, so no payoff period is produced.",
      check:
        "New borrowing, arrears, fees and rate changes are excluded. The tool also does not return a payoff period beyond its 1,200-month horizon.",
    },
    sources: ["amortization"],
    related: ["credit-loan-interest", "loan"],
  },
  "credit-card-installment-interest": {
    ko: {
      answer:
        "매월 같은 원금을 갚고 남은 원금에 월 수수료율을 적용하는 비교 모델입니다.",
      example:
        "결제 1,200,000원·12개월·예시 연 수수료율 12%이면 첫 회 112,000원, 마지막 회 101,000원, 총 수수료 78,000원, 총 납부액 1,278,000원입니다.",
      check:
        "무이자 행사·부분 무이자·카드사의 일수 산식과 회차별 절사는 별도입니다. 카드 명세서와 약정 요율을 확인하세요.",
    },
    en: {
      answer:
        "This comparison repays equal principal monthly and applies the monthly fee rate to the remaining principal.",
      example:
        "A 1,200,000 purchase over 12 months at an illustrative 12% annual fee rate gives a first payment of 112,000, a last payment of 101,000, fees of 78,000 and total payments of 1,278,000.",
      check:
        "Interest-free promotions, partial waivers, day-count rules and installment rounding are separate. Check the card statement and contractual rate.",
    },
    sources: ["amortization"],
    related: ["discount-sale-price", "debt-repayment-period"],
  },
  "stress-dsr": {
    ko: {
      answer:
        "입력 대출금리에 스트레스 가산금리를 더해 같은 조건의 상환 부담을 다시 계산합니다.",
      example:
        "기본 금리 3%에 가산금리 1.5%p를 입력하면 스트레스 비교 금리는 4.5%입니다. 3% × 1.5로 계산하는 것이 아닙니다.",
      check:
        "가산금리는 사용자가 입력하는 비교 조건입니다. 현재 규제 단계·상품별 적용률·지역별 규정을 자동 판정하지 않습니다.",
    },
    en: {
      answer:
        "Add the entered stress-rate adjustment to the loan rate and recalculate the same debt-service assumptions.",
      example:
        "A 3% base rate plus a hypothetical 1.5 percentage-point adjustment produces a 4.5% stress comparison rate; it is not 3% multiplied by 1.5.",
      check:
        "The adjustment is a user-entered scenario. Current regulatory stages, product treatment and regional rules are not automatically determined.",
    },
    sources: ["dti", "amortization"],
    related: ["dsr", "mortgage-loan-limit"],
  },
  "mortgage-loan-limit": {
    ko: {
      answer:
        "담보 비율로 구한 한도와 소득·상환 능력으로 구한 한도 중 작은 금액을 비교값으로 사용합니다.",
      example:
        "집값 300,000,000원·LTV 70%면 담보 한도는 210,000,000원입니다. 연소득 60,000,000원·기존 연 원리금 6,000,000원·DSR 40%·예시 금리 0%·10년이면 상환 기준 한도는 180,000,000원, 최종 비교값도 180,000,000원입니다.",
      check:
        "LTV·DSR 입력값은 예시입니다. 스트레스금리, 대출 종류, 지역·차주 조건과 금융기관 심사를 반영한 승인 금액은 아닙니다.",
    },
    en: {
      answer:
        "The comparison uses the lower of the collateral-based limit and the debt-service-based limit.",
      example:
        "For a 300,000,000 home and hypothetical 70% LTV, collateral capacity is 210,000,000. Income 60,000,000, existing annual debt 6,000,000, a 40% DSR budget, 0% example interest and ten years give 180,000,000 debt-service capacity, which is the lower limit.",
      check:
        "LTV and DSR inputs are hypothetical. Stress rates, product, region, borrower circumstances and lender underwriting can change the approved amount.",
    },
    sources: ["ltv", "dti"],
    related: ["ltv", "loan-affordability"],
  },
  "severance-pay": {
    ko: {
      answer:
        "확인한 1일 평균임금에 30일과 재직일수/365를 곱해 퇴직금의 기본 산식을 계산합니다.",
      example:
        "적용 1일 평균임금 100,000원·재직 730일이면 100,000 × 30 × 730/365 = 세전 6,000,000원입니다.",
      check:
        "계속근로 1년 이상·평균 주 15시간 등 지급 요건을 별도로 확인하세요. 제외 기간·상여/연차 산입과 통상임금 비교를 마친 임금을 입력하며 퇴직소득세는 별도입니다.",
    },
    en: {
      answer:
        "Multiply the verified daily average wage by 30 days and service days divided by 365.",
      example:
        "At an applicable daily average wage of KRW 100,000 and 730 service days, 100,000 × 30 × 730/365 = KRW 6,000,000 before tax.",
      check:
        "Check eligibility including service duration and average weekly hours separately. Enter a wage after excluded periods, bonus/leave inclusion and ordinary-wage comparison; retirement tax is separate.",
    },
    sources: ["severance"],
    related: ["average-wage", "retirement-income-tax"],
  },
  "unemployment-benefits": {
    ko: {
      answer:
        "이직 전 평균임금의 60%에 모델의 2026년 상·하한을 적용하고 입력 가입기간·연령에 따른 지급일수를 곱합니다.",
      example:
        "1일 평균임금 120,000원·가입 24개월·만 35세·장애 없음·1일 8시간이면 60%는 72,000원이지만 상한 68,100원이 적용됩니다. 지급일수 150일의 총 비교액은 10,215,000원입니다.",
      check:
        "수급 자격·이직 사유·피보험단위기간·실업인정과 이직일 기준 적용 규칙은 자동 판정하지 않습니다. 상용근로자 비교 모델이며 예술인·자영업 등은 별도입니다.",
    },
    en: {
      answer:
        "Apply the model's 2026 daily floor/cap to 60% of average wage, then multiply by the duration implied by entered insurance history and age.",
      example:
        "At daily average wage KRW 120,000, 24 insured months, age 35, no disability and an eight-hour day, 60% is KRW 72,000 but the KRW 68,100 cap applies. The modeled 150 days total KRW 10,215,000.",
      check:
        "Eligibility, separation reason, insured qualifying days, unemployment certification and separation-date rules are not determined. This is an employee model, not a model for every insured category.",
    },
    sources: ["unemployment"],
    related: ["average-wage", "emergency-fund"],
  },
  "net-salary": {
    ko: {
      answer:
        "세전 급여에서 선택한 사회보험과 간편 소득세 추정 공제를 빼 실수령액을 비교합니다.",
      example:
        "월급 3,000,000원·상여/비과세 0원·보험 4항목 포함·소득세와 지방소득세는 제외 선택 시 보험 합계 291,522원, 비교 실수령액은 2,708,478원입니다.",
      check:
        "예시는 보험만 분리한 비교이며 실제 세후 월급이 아닙니다. 소득세는 연환산 간편 추정이므로 국세청 간이세액표 결과와 다를 수 있습니다. 정확한 표 기준 비교는 근로소득 원천징수 계산기를 사용하세요.",
    },
    en: {
      answer:
        "Subtract selected social-insurance deductions and simplified income-tax estimates from gross pay.",
      example:
        "With monthly salary KRW 3,000,000, no bonus/non-taxable amount, all four insurance deductions on and income/local income tax switched off, insurance totals KRW 291,522 and modeled take-home pay is KRW 2,708,478.",
      check:
        "The example isolates insurance and is not actual after-tax salary. Income tax uses a simplified annualized estimate, which can differ from the statutory monthly table; use the dedicated withholding calculator for that comparison.",
    },
    sources: [
      "nps",
      "health",
      "employmentInsurance",
      "withholding",
      "pensionCredit",
    ],
    related: ["earned-income-withholding-tax", "social-insurance"],
  },
  "hourly-wage": {
    ko: {
      answer:
        "입력한 급여 기간의 유급시간으로 급여를 나눠 환산 시급을 계산합니다.",
      example:
        "일급 96,000원·하루 8시간·주 40시간·주휴 제외이면 환산 시급 12,000원, 하루 급여 96,000원, 주급 비교액 480,000원입니다.",
      check:
        "월·연 환산은 이 페이지의 평균 주수 모델을 사용하며 공식 209시간 기준과 다를 수 있습니다. 최저임금 판단은 산입 임금·소정근로시간·주휴 요건을 확인해야 합니다.",
    },
    en: {
      answer:
        "Divide pay by the modeled paid hours for the selected pay period to estimate an hourly rate.",
      example:
        "Daily pay KRW 96,000, eight hours daily, 40 hours weekly and paid weekly holidays off give an hourly equivalent KRW 12,000, daily pay KRW 96,000 and weekly pay KRW 480,000.",
      check:
        "Monthly/yearly conversions use this page's average-week model, which can differ from the official 209-hour basis. Minimum-wage compliance depends on includable pay, scheduled hours and holiday eligibility.",
    },
    sources: ["minimum"],
    related: ["minimum-wage", "work-hours-converter"],
  },
  "social-insurance": {
    ko: {
      answer:
        "근로자 공제액과 사업주 부담액을 분리하고, 사업주 고용안정 부담률·산재 요율을 추가합니다.",
      example:
        "월 보수 3,000,000원·비과세 0원·150인 미만·예시 산재요율 1%이면 근로자 합계 291,522원, 사업주 합계 329,022원, 합계 620,544원입니다.",
      check:
        "산재 1%는 업종 공통 요율이 아닙니다. 보험별 보수 기준·가입 예외·정산과 국민연금 기준소득 하한 등을 단순화하므로 실제 신고액은 각 공단에서 확인하세요.",
    },
    en: {
      answer:
        "Separate employee deductions from employer contributions, including the selected employer training and accident-insurance rates.",
      example:
        "At monthly pay KRW 3,000,000, no non-taxable pay, the under-150 category and an illustrative 1% accident rate, employee contributions total KRW 291,522 and employer contributions KRW 329,022: KRW 620,544 combined.",
      check:
        "The 1% accident rate is not universal. Insurance-specific pay bases, coverage exceptions, reconciliation and income floors are simplified; confirm actual filed amounts with the agencies.",
    },
    sources: ["nps", "health", "employmentInsurance"],
    related: ["net-salary", "employer-total-labor-cost"],
  },
  "average-wage": {
    ko: {
      answer:
        "산정 대상 임금총액을 그 기간의 총 달력일수로 나눕니다. 통상일급을 넣으면 더 큰 금액도 함께 비교합니다.",
      example:
        "기간 임금총액 9,000,000원·총 90일이면 산술 평균일급은 100,000원입니다. 확인한 통상일급 110,000원을 함께 입력하면 적용 비교일급 110,000원, 30일분 3,300,000원입니다.",
      check:
        "90일은 예시이며 매번 고정된 3개월 일수가 아닙니다. 임금 산입·상여/연차·제외 기간과 통상임금의 적정성을 먼저 확인하세요.",
    },
    en: {
      answer:
        "Divide eligible wage total by calendar days in the period. Enter ordinary daily wage to compare the higher applicable amount.",
      example:
        "KRW 9,000,000 over 90 calendar days gives a calculated daily average KRW 100,000. Entering verified ordinary daily wage KRW 110,000 produces an applied comparison of KRW 110,000 and KRW 3,300,000 for 30 days.",
      check:
        "Ninety days is an example, not a fixed length for every three-month period. Verify includable pay, bonus/leave amounts, excluded periods and the ordinary-wage basis.",
    },
    sources: ["severance"],
    related: ["severance-pay", "annual-leave-allowance"],
  },
  "salary-raise": {
    ko: {
      answer: "연봉 인상액은 현재 급여에 인상률을 곱한 세전 비교액입니다.",
      example:
        "현재 연봉 36,000,000원·인상률 5%이면 새 연봉 37,800,000원, 연 증가액 1,800,000원, 월평균 증가액 150,000원입니다.",
      check:
        "상여·퇴직급여·비과세·수당의 포함 범위를 두 급여에 같게 맞추세요. 실수령 인상률은 세금과 보험 때문에 다를 수 있습니다.",
    },
    en: {
      answer:
        "The gross raise equals current pay multiplied by the entered increase percentage.",
      example:
        "Current annual salary 36,000,000 with a 5% raise gives 37,800,000 new annual pay, a 1,800,000 annual increase and 150,000 monthly equivalent increase.",
      check:
        "Match the inclusion of bonuses, severance, non-taxable pay and allowances. Take-home percentage growth can differ because of tax and insurance.",
    },
    sources: [],
    related: ["net-salary", "salary-negotiation-target"],
  },
  "salary-conversion": {
    ko: {
      answer: "연·월·주 급여를 같은 세전 총액 기준으로 바꾸는 단순 환산입니다.",
      example:
        "연봉 52,000,000원은 월 52,000,000 ÷ 12 ≈ 4,333,333원, 이 도구의 52주 기준 주급은 1,000,000원입니다.",
      check:
        "주급은 정확한 달력 주수나 법정 유급시간 환산이 아닙니다. 월별 상여 분배·일수·공제와 실제 지급일은 반영하지 않습니다.",
    },
    en: {
      answer:
        "Convert annual, monthly and weekly pay on a matching gross-pay basis.",
      example:
        "Annual pay 52,000,000 gives 52,000,000 ÷ 12 ≈ 4,333,333 monthly and 1,000,000 weekly on this tool's 52-week basis.",
      check:
        "The weekly amount is not an exact calendar-week or statutory paid-hour conversion. Bonus timing, calendar days, deductions and pay dates are excluded.",
    },
    sources: [],
    related: ["hourly-wage", "work-hours-converter"],
  },
  "overtime-pay": {
    ko: {
      answer:
        "입력 연장근로시간의 기본임금과 선택 가산률에 따른 가산임금을 나눠 계산합니다.",
      example:
        "통상시급 12,000원·연장 10시간·가산률 50%이면 기본 120,000원 + 가산 60,000원 = 180,000원입니다.",
      check:
        "5인 이상 적용 여부와 실제 연장근로 시간을 확인하세요. 휴게시간·통상임금 산입·단시간근로·야간/휴일 중복과 보상휴가를 자동 판정하지 않습니다.",
    },
    en: {
      answer:
        "Separate base pay from the premium for entered overtime hours at the selected premium rate.",
      example:
        "Ordinary hourly wage KRW 12,000, ten overtime hours and a 50% premium give KRW 120,000 base plus KRW 60,000 premium: KRW 180,000 total.",
      check:
        "Verify workplace coverage and qualifying overtime. Breaks, includable ordinary wage, part-time rules, overlapping night/holiday work and compensatory leave are not determined automatically.",
    },
    sources: ["overtime"],
    related: ["night-work-pay", "holiday-work-pay"],
  },
  "night-work-pay": {
    ko: {
      answer: "야간 가산 대상 시간에 대한 기본임금과 입력 가산률을 계산합니다.",
      example:
        "통상시급 12,000원·대상 야간 6시간·가산률 50%이면 기본 72,000원, 가산 36,000원, 합계 108,000원입니다.",
      check:
        "대상 시간은 오후 10시~오전 6시 중 실제 근로시간에서 휴게를 뺀 값으로 확인하세요. 사업장 적용 여부·연장/휴일 중복 가산은 별도로 검토합니다.",
    },
    en: {
      answer:
        "Calculate base pay and the entered premium for hours that qualify as night work.",
      example:
        "At KRW 12,000 hourly, six qualifying night hours and a 50% premium, base pay is KRW 72,000, premium KRW 36,000 and total KRW 108,000.",
      check:
        "Verify actual work between 10 p.m. and 6 a.m. after breaks. Workplace coverage and overlapping overtime/holiday premiums require separate review.",
    },
    sources: ["overtime"],
    related: ["overtime-pay", "holiday-work-pay"],
  },
  "holiday-work-pay": {
    ko: {
      answer:
        "5인 이상 모델은 휴일근로 8시간까지 50%, 초과분 100%의 가산임금을 기본 근로임금에 더합니다.",
      example:
        "통상시급 12,000원·휴일근로 10시간·5인 이상이면 기본 120,000원 + 8시간 가산 48,000원 + 초과 2시간 가산 24,000원 = 192,000원입니다.",
      check:
        "표시 합계는 해당 근로의 기본임금과 가산분입니다. 월급에 이미 포함된 유급휴일 임금, 야간 중복, 휴일 해당 여부와 5인 미만 계약 가산은 별도로 확인하세요.",
    },
    en: {
      answer:
        "For the five-or-more-worker model, add a 50% premium for the first eight holiday hours and 100% for hours beyond eight.",
      example:
        "At KRW 12,000 hourly for ten holiday-work hours in the five-or-more category, KRW 120,000 base + KRW 48,000 first-eight-hour premium + KRW 24,000 excess premium = KRW 192,000.",
      check:
        "The total covers base pay for those hours plus premiums. Paid-holiday wages already in salary, night overlaps, holiday classification and contractual under-five premiums are separate.",
    },
    sources: ["overtime"],
    related: ["night-work-pay", "weekly-holiday-pay"],
  },
  "annual-leave-allowance": {
    ko: {
      answer:
        "모델에서 발생한 연차일수에서 사용일수를 빼고 입력한 통상일급을 곱해 미사용 수당을 비교합니다.",
      example:
        "근속 만 3년·출근율 80% 이상·사용 6일·통상시급 12,000원·일 8시간이면 발생 16일 중 잔여 10일, 통상일급 96,000원, 예상 수당 960,000원입니다.",
      check:
        "상시 5인·평균 주 15시간 등 적용 요건과 권리 발생일을 먼저 확인하세요. 사용촉진·소멸·퇴사일·회계연도 정산·단시간 비례가 지급 여부를 바꿀 수 있습니다.",
    },
    en: {
      answer:
        "Subtract used days from modeled accrued leave and multiply by the entered ordinary daily wage.",
      example:
        "With three completed years, at least 80% attendance, six days used, ordinary hourly pay KRW 12,000 and eight hours daily, modeled leave is 16 days, ten remain and the allowance is KRW 96,000 × 10 = KRW 960,000.",
      check:
        "Check workplace/hour coverage and when rights arise. Leave promotion, expiry, departure date, fiscal-year reconciliation and part-time proportionality can change entitlement.",
    },
    sources: ["annualLeave"],
    related: ["average-wage", "hourly-wage"],
  },
  "retirement-pension": {
    ko: {
      answer: "월 기말에 일정액을 적립하는 퇴직연금 자산의 성장 비교입니다.",
      example:
        "월 300,000원씩 10년·예시 수익률 0%이면 원금은 300,000 × 120 = 36,000,000원이고 예상 잔액도 36,000,000원입니다.",
      check:
        "DC·IRP 적립금의 단순 금융 비교이며 DB 퇴직급여·국민연금 수급액을 계산하지 않습니다. 세금·보수·변동 수익률과 납입 누락은 제외합니다.",
    },
    en: {
      answer:
        "Model retirement-account growth from constant end-of-month contributions.",
      example:
        "Monthly contributions of 300,000 for ten years at a hypothetical 0% return give 300,000 × 120 = 36,000,000 principal and the same ending balance.",
      check:
        "This is a simple DC/IRP accumulation comparison, not a DB severance or statutory pension calculation. Taxes, fees, variable returns and missed contributions are excluded.",
    },
    sources: ["compound"],
    related: ["pension-future-monthly-income", "retirement-pension-tax-credit"],
  },
  "gross-up-salary": {
    ko: {
      answer:
        "목표 실수령액을 1−가정 공제율로 나눠 필요한 세전 급여를 역산합니다.",
      example:
        "월 실수령 목표 3,000,000원·예시 공제율 20%이면 3,000,000 ÷ 0.8 = 필요한 세전 월급 3,750,000원입니다. 목표액에 20%를 더한 3,600,000원과 다릅니다.",
      check:
        "정률 공제 가정이라 실제 누진 소득세·사회보험 상한·부양가족을 역산하지 않습니다. 실수령액 계산기와 실제 급여 조건으로 다시 비교하세요.",
    },
    en: {
      answer:
        "Divide target net pay by one minus the assumed deduction rate to estimate required gross pay.",
      example:
        "A monthly net target of 3,000,000 and hypothetical flat 20% deductions require 3,000,000 ÷ 0.8 = 3,750,000 gross, not 3,600,000 from adding 20% to the target.",
      check:
        "A flat percentage does not invert progressive taxes, insurance caps or family deductions. Recheck using actual payroll assumptions and the net-salary calculator.",
    },
    sources: [],
    related: ["net-salary", "salary-negotiation-target"],
  },
  "daily-worker-pay": {
    ko: {
      answer:
        "일용근로자 모델은 비과세와 일 150,000원 공제 후 일 세액을 구하고 입력 지급일수로 합산합니다.",
      example:
        "일급 200,000원·5일·비과세 0원이면 일 공제 후 50,000원, 일 소득세 1,350원, 합산 소득세 6,750원과 지방세 670원으로 총 공제 7,420원, 예상 실수령 992,580원입니다.",
      check:
        "세법상 일용근로자 해당 여부와 실제 합산 지급 단위를 확인하세요. 사회보험·업종별 자격·개별 지급 소액부징수 판단은 입력 조건과 다를 수 있습니다.",
    },
    en: {
      answer:
        "The daily-worker model subtracts non-taxable pay and the KRW 150,000 daily deduction before calculating and aggregating tax.",
      example:
        "At KRW 200,000 daily for five days with no non-taxable pay, the post-deduction daily base is KRW 50,000 and daily income tax KRW 1,350. Aggregated income tax KRW 6,750 plus local tax KRW 670 gives KRW 992,580 net.",
      check:
        "Verify daily-worker tax status and the actual payment aggregation unit. Social insurance, occupation-specific status and small-collection treatment can differ.",
    },
    sources: ["dailyWorker"],
    related: ["earned-income-withholding-tax", "hourly-wage"],
  },
  "total-compensation-comparison": {
    ko: {
      answer:
        "반복 연간 보상은 비교 연수만큼 합산하고 입사 일시금은 한 번만 더합니다.",
      example:
        "A는 연 기본급 50,000,000원·연 상여 5,000,000원·입사금 5,000,000원, B는 연 기본급 56,000,000원·나머지 0원이라고 가정하면 2년 합계는 A 115,000,000원, B 112,000,000원입니다.",
      check:
        "주식 보상은 실제 베스팅·가격, 복리후생은 현금 환산, 입사금은 반환 조건을 확인하세요. 세후 가치·현재가치·성과 달성 가능성은 반영하지 않습니다.",
    },
    en: {
      answer:
        "Multiply recurring annual compensation by the comparison horizon and add the sign-on bonus once.",
      example:
        "Assume A offers base 50,000,000, annual bonus 5,000,000 and sign-on 5,000,000, while B offers base 56,000,000 and zero other items. With equity/benefits also zero, two-year totals are A 115,000,000 and B 112,000,000.",
      check:
        "Check vesting/prices for equity, cash equivalence of benefits and bonus clawbacks. Taxes, present value and performance uncertainty are not modeled.",
    },
    sources: [],
    related: ["salary-raise", "net-salary"],
  },
  "salary-negotiation-target": {
    ko: {
      answer:
        "같은 현재 연봉을 기준으로 최소·목표·도전 인상률을 각각 적용해 협상 금액을 비교합니다.",
      example:
        "현재 연봉 50,000,000원·최소 5%·목표 10%·도전 15%이면 각각 52,500,000원·55,000,000원·57,500,000원입니다.",
      check:
        "입력 인상률은 시장 연봉 자료나 채용 확률이 아닙니다. 기본급·상여·주식 포함 범위와 세후 증가액을 함께 비교하세요.",
    },
    en: {
      answer:
        "Apply minimum, target and stretch raise percentages independently to the same current annual salary.",
      example:
        "Current annual salary 50,000,000 with minimum 5%, target 10% and stretch 15% gives 52,500,000, 55,000,000 and 57,500,000 respectively.",
      check:
        "Entered percentages are not market salary evidence or hiring probabilities. Match base/bonus/equity scope and compare after-tax increases separately.",
    },
    sources: [],
    related: ["salary-raise", "total-compensation-comparison"],
  },
  "employer-total-labor-cost": {
    ko: {
      answer:
        "직원에게 지급할 월 급여와 사업주 보험 부담·선택한 퇴직급여 충당액을 합칩니다.",
      example:
        "월 급여 3,000,000원·고용안정 부담률 0.25%·예시 산재 1%·퇴직 충당 포함이면 사업주 추가 부담은 579,022원, 월 총 인건비는 3,579,022원입니다.",
      check:
        "보험별 보수 기준·상하한·가입 예외를 적용한 신고서가 아닙니다. 산재율은 실제 업종을 확인하고 월급/12의 퇴직 충당은 실제 퇴직부채와 구분하세요.",
    },
    en: {
      answer:
        "Add gross monthly wage, employer insurance contributions and the optional retirement provision.",
      example:
        "Monthly wage KRW 3,000,000, a selected 0.25% training rate, illustrative 1% accident rate and retirement provision on give employer on-cost KRW 579,022 and total monthly labor cost KRW 3,579,022.",
      check:
        "This is not an insurance filing with all bases, floors/caps and exceptions. Verify the industry accident rate and distinguish wage/12 provisioning from actual retirement liabilities.",
    },
    sources: ["nps", "health", "employmentInsurance"],
    related: ["social-insurance", "business-cash-runway"],
  },
  "parental-leave-benefit": {
    ko: {
      answer:
        "일반 육아휴직 모델은 1~3개월·4~6개월·7개월 이후의 지급률과 상한을 나눠 합산합니다.",
      example:
        "월 통상임금 3,000,000원·12개월이면 처음 3개월은 월 2,500,000원, 다음 3개월은 월 2,000,000원, 나머지 6개월은 월 1,600,000원으로 합계 23,100,000원입니다.",
      check:
        "휴직 개시일의 통상임금과 고용보험 자격을 확인하세요. 6+6·한부모 특례·18개월 사용 자격·부분 월 일할과 회사 지급금은 별도입니다.",
    },
    en: {
      answer:
        "The general parental-leave model separately applies rates/caps for months 1–3, 4–6 and 7 onward.",
      example:
        "At monthly ordinary wage KRW 3,000,000 for 12 months, the first three months pay KRW 2,500,000 each, the next three KRW 2,000,000 and the remaining six KRW 1,600,000: KRW 23,100,000 total.",
      check:
        "Verify ordinary wage at leave start and insurance eligibility. The 6+6 scheme, single-parent rules, 18-month eligibility, partial months and employer payments are separate.",
    },
    sources: ["parental"],
    related: ["maternity-leave-benefit", "emergency-fund"],
  },
  "maternity-leave-benefit": {
    ko: {
      answer:
        "휴가 기간의 고용보험 지원액과 사업주가 부담할 통상임금 차액을 구분합니다.",
      example:
        "2026년 월 통상임금 3,000,000원·일반 단태아 90일·우선지원 대상기업이면 상한 월 2,200,000원 기준 고용보험 6,600,000원, 최초 60일 사업주 차액 1,600,000원, 합계 8,200,000원입니다.",
      check:
        "2026년 상한의 일반 90/120일 모델입니다. 미숙아 100일·유산/사산·일별 하한·계약종료·중복 지급·개별 수급요건과 부분 월은 별도로 확인하세요.",
    },
    en: {
      answer:
        "Separate employment-insurance support from the ordinary-wage difference paid by the employer.",
      example:
        "For 2026 ordinary wage KRW 3,000,000, ordinary 90-day singleton leave and a priority-supported employer, the KRW 2,200,000 monthly cap gives KRW 6,600,000 insurance support plus KRW 1,600,000 employer top-up for the first 60 days: KRW 8,200,000 total.",
      check:
        "This is a 2026-cap ordinary 90/120-day model. Premature-birth leave, miscarriage/stillbirth, daily floors, contract expiry, overlapping payments, eligibility and partial months need separate treatment.",
    },
    sources: ["maternity"],
    related: ["parental-leave-benefit", "net-salary"],
  },
  percentage: {
    ko: {
      answer:
        "특정 비율의 금액·전체 중 비중·이전 값 대비 변화율은 분모가 서로 다른 계산입니다.",
      example:
        "200의 15%는 30, 전체 200 중 부분 30의 비중은 15%, 이전 100에서 120으로의 변화율은 20%입니다.",
      check:
        "비중의 전체값과 변화율의 이전 값은 0일 수 없습니다. 이 모델은 음수 이전 값의 절댓값을 변화율 분모로 사용하므로 지표의 관례와 맞는지 확인하세요.",
    },
    en: {
      answer:
        "Percent of a value, share of a whole and percentage change use different denominators.",
      example:
        "Fifteen percent of 200 is 30; 30 as a share of 200 is 15%; the change from 100 to 120 is 20%.",
      check:
        "The whole and previous value cannot be zero. This model uses the absolute previous value for changes from a negative baseline; check whether that convention suits the metric.",
    },
    sources: [],
    related: ["discount-sale-price", "salary-raise"],
  },
  "discount-sale-price": {
    ko: {
      answer: "할인액을 정가에서 빼 개당 판매가를 구하고 수량을 곱합니다.",
      example:
        "정가 100,000원·할인율 20%·수량 3개이면 개당 80,000원, 총 결제 비교액 240,000원, 총 절약액 60,000원입니다.",
      check:
        "배송비·세금·최소 주문액·쿠폰 한도는 제외합니다. 여러 할인 단계를 단순 합산하지 말고 각 단계가 적용되는 가격을 확인하세요.",
    },
    en: {
      answer:
        "Subtract the discount from the original unit price, then multiply by quantity.",
      example:
        "Original unit price 100,000, discount 20% and quantity three give a sale price of 80,000 each, total 240,000 and total savings 60,000.",
      check:
        "Shipping, tax, minimum orders and coupon caps are excluded. Do not simply add sequential discounts; check the price to which each stage applies.",
    },
    sources: [],
    related: ["percentage", "credit-card-installment-interest"],
  },
  age: {
    ko: {
      answer:
        "기준일까지 생일을 지났는지 확인해 만 나이를 계산하고 다음 생일까지의 날짜 차이를 표시합니다.",
      example:
        "생년월일 2000-06-15·기준일 2026-06-14이면 만 25세이며 다음 생일 2026-06-15까지 1일입니다.",
      check:
        "날짜 단위 모델로 출생 시각을 사용하지 않습니다. 2월 29일생의 평년 생일을 2월 28일로 처리하므로 법적 자격·보험·기관별 연령 기준과는 별도로 확인하세요.",
    },
    en: {
      answer:
        "Check whether the birthday has occurred by the reference date to calculate completed years and days until the next birthday.",
      example:
        "For birth date 2000-06-15 and reference date 2026-06-14, completed age is 25 and the next birthday, 2026-06-15, is one day away.",
      check:
        "This date-only model ignores birth time and treats a February 29 birthday as February 28 in a non-leap year. Check legal, insurance and agency-specific age conventions separately.",
    },
    sources: ["calendar"],
    related: ["date-difference", "d-day"],
  },
  "d-day": {
    ko: {
      answer: "선택한 두 날짜의 차이로 남은 날·당일·지난 날을 구분합니다.",
      example:
        "기준일 2026-10-30·목표일 2026-11-01이면 2일 남았습니다. 목표일을 기준일과 같게 입력하면 차이는 0일입니다.",
      check:
        "시각을 제외한 달력 날짜 차이이며 시작일을 1일로 세는 포괄 일수와 다릅니다. 영업일·공휴일·법정 기한의 포함 규칙은 자동 적용하지 않습니다.",
    },
    en: {
      answer:
        "Use the difference between two selected dates to distinguish future, same-day and past events.",
      example:
        "Reference date 2026-10-30 and target date 2026-11-01 are two days apart. Identical reference and target dates have a zero-day difference.",
      check:
        "This is a date-only difference, not an inclusive count starting at day one. Business days, holidays and statutory deadline-inclusion rules are not applied.",
    },
    sources: ["calendar"],
    related: ["date-difference", "age"],
  },
  "date-difference": {
    ko: {
      answer:
        "전체 일수 차이와 달력 기준 연·월·일 구분을 함께 표시합니다. 한 달을 항상 30일로 보지 않습니다.",
      example:
        "2024-02-28에서 2024-03-01까지는 윤일을 지나므로 2일입니다. 순서를 바꾸면 부호는 −2일, 절대 차이는 2일입니다.",
      check:
        "기준 날짜는 0일로 세며 휴일을 빼지 않습니다. 월말·윤일을 보정하는 달력 구분은 금융의 30/360 일수법이나 계약상 포함 일수와 다를 수 있습니다.",
    },
    en: {
      answer:
        "Show total elapsed days alongside a calendar years/months/days breakdown; a month is not always thirty days.",
      example:
        "From 2024-02-28 to 2024-03-01 the leap day makes the difference two days. Reversing the dates gives −2 signed days and two absolute days.",
      check:
        "The start date is day zero and holidays are not excluded. Month-end/leap-day calendar adjustments differ from financial 30/360 conventions or contractually inclusive counts.",
    },
    sources: ["calendar"],
    related: ["d-day", "age"],
  },
  "rent-conversion-rate": {
    ko: {
      answer:
        "전월세 전환율은 연간 월세를 전세 보증금과 월세 보증금의 차액으로 나눈 비율입니다.",
      example:
        "전세 보증금 200,000,000원·월세 보증금 50,000,000원·월세 500,000원이면 전환 보증금 150,000,000원, 연 월세 6,000,000원, 연 전환율 4%입니다.",
      check:
        "월세 보증금을 뺀 차액을 분모로 사용합니다. 이 비율은 계약 조건의 계산값이며 법정 상한·계약 적용 여부나 현재 시장 전환율을 자동 판정하지 않습니다.",
    },
    en: {
      answer:
        "The conversion rate is annual rent divided by the difference between the jeonse and monthly-rent deposits.",
      example:
        "Jeonse deposit KRW 200,000,000, monthly-rent deposit KRW 50,000,000 and rent KRW 500,000 give a KRW 150,000,000 deposit difference and KRW 6,000,000 annual rent: a 4% annual conversion rate.",
      check:
        "Use the deposit difference as denominator. The result describes entered terms; it does not determine a legal ceiling, contractual applicability or current market rates.",
    },
    sources: [],
    related: ["jeonse-monthly-rent-conversion", "jeonse-vs-rent"],
  },
  "jeonse-monthly-rent-conversion": {
    ko: {
      answer:
        "전세에서 줄이는 보증금에 입력한 연 전환율을 적용한 뒤 12로 나눠 월세를 계산합니다.",
      example:
        "전세 보증금 200,000,000원·변경 보증금 50,000,000원·예시 연 전환율 4%이면 월세는 (200,000,000 − 50,000,000) × 0.04 ÷ 12 = 500,000원입니다.",
      check:
        "4%는 예시 입력값입니다. 신규 계약·기존 계약 변경의 법적 취급과 적용 가능한 전환 상한을 확인하고, 관리비·보증료는 별도로 비교하세요.",
    },
    en: {
      answer:
        "Apply the entered annual conversion rate to the reduction in deposit, then divide by twelve for monthly rent.",
      example:
        "A KRW 200,000,000 jeonse deposit changed to KRW 50,000,000 at an illustrative annual 4% rate gives (200,000,000 − 50,000,000) × 0.04 ÷ 12 = KRW 500,000 monthly rent.",
      check:
        "The 4% rate is hypothetical. Check treatment of a new lease versus conversion of an existing lease and any applicable ceiling; management and guarantee fees are separate.",
    },
    sources: [],
    related: ["rent-conversion-rate", "rent-affordability"],
  },
  "real-estate-brokerage-fee": {
    ko: {
      answer:
        "확인한 거래금액과 협의 요율로 중개보수를 구한 뒤 입력 부가세율을 적용합니다.",
      example:
        "거래금액 300,000,000원·예시 협의 요율 0.4%·부가세율 10%이면 보수 1,200,000원, 부가세 120,000원, 합계 1,320,000원입니다.",
      check:
        "요율·금액 상한·거래 유형·지역과 월세의 환산 거래금액을 자동 선정하지 않습니다. 실제 협의액과 중개업자의 과세 유형에 맞는 VAT를 확인하세요.",
    },
    en: {
      answer:
        "Calculate brokerage from the verified transaction amount and agreed rate, then apply the entered VAT rate.",
      example:
        "At transaction amount KRW 300,000,000, illustrative agreed fee rate 0.4% and VAT 10%, brokerage is KRW 1,200,000 plus KRW 120,000 VAT: KRW 1,320,000 total.",
      check:
        "Rate and monetary caps, transaction type, locality and monthly-lease conversion amounts are not selected automatically. Confirm the negotiated amount and the broker's VAT treatment.",
    },
    sources: ["brokerage"],
    related: ["real-estate-acquisition-tax", "home-purchase-total-cost"],
  },
  "jeonse-loan-limit": {
    ko: {
      answer:
        "HF 일반전세자금보증의 과목·소요자금·상환능력 산식 중 최솟값을 비교합니다. 보증한도와 실제 대출액은 다릅니다.",
      example:
        "보증금 300,000,000원·신청 220,000,000원·기존 보증 0원·HF 연간인정소득 250,000,000원·연 부채상환 20,000,000원·우대 0원·무주택·수도권/규제지역 아님이면 과목 400,000,000원, 소요자금 220,000,000원, 상환능력 230,000,000원 중 220,000,000원입니다.",
      check:
        "연간인정소득을 단순 연봉과 혼동하지 말고 HF 기준 산정값을 확인하세요. 수도권·규제지역 8/9 조정, 주택 보유·보증 대상·신청 시점과 은행 심사는 별도 조건입니다.",
    },
    en: {
      answer:
        "Compare the minimum of HF general jeonse subject, funding and repayment-capacity formulas. A guarantee limit is different from actual borrowing.",
      example:
        "For deposit KRW 300,000,000, request KRW 220,000,000, no existing guarantee, HF-recognized annual income KRW 250,000,000, annual debt service KRW 20,000,000, zero preference, no owned home and no capital/regulated-area adjustment, limits are KRW 400,000,000, 220,000,000 and 230,000,000: the minimum is KRW 220,000,000.",
      check:
        "Do not confuse HF-recognized income with gross salary. Check HF's assessment, the 8/9 area adjustment, ownership/property conditions, application timing and lender underwriting.",
    },
    sources: ["hf"],
    related: ["jeonse-loan-interest", "jeonse-vs-rent"],
  },
  "rent-affordability": {
    ko: {
      answer:
        "소득 비율로 정한 월세 한도와 현금흐름으로 남길 수 있는 한도 중 작은 값을 구합니다.",
      example:
        "월 실수령 3,000,000원·고정지출 1,200,000원·남길 금액 900,000원·월세 외 주거비 200,000원·선택 주거비율 30%이면 두 기준의 월세 한도는 각각 700,000원입니다.",
      check:
        "30%는 개인이 정한 예산 가정이며 보편적 권장치가 아닙니다. 보증금 조달·부채 증가·수입 변동과 누락 지출을 함께 비교하세요.",
    },
    en: {
      answer:
        "Use the smaller of an income-share rent budget and the amount available after your cash-flow commitments.",
      example:
        "Net monthly income 3,000,000, fixed obligations 1,200,000, desired leftover 900,000, non-rent housing costs 200,000 and a selected 30% housing share give a rent cap of 700,000 under both methods.",
      check:
        "Thirty percent is a selected assumption, not a universal recommendation. Also consider deposit funding, debt, variable income and omitted expenses.",
    },
    sources: [],
    related: ["apartment-management-fee-budget", "emergency-fund"],
  },
  "jeonse-vs-rent": {
    ko: {
      answer:
        "전세 대출이자와 자기자금 기회비용을, 월세 및 월세 보증금 기회비용과 비교합니다.",
      example:
        "전세 보증금 200,000,000원·대출 100,000,000원·연 대출금리 4%, 월세 보증금 20,000,000원·월세 600,000원, 기회수익률 연 3%·12개월이면 전세 비교비용 7,000,000원, 월세 7,800,000원입니다.",
      check:
        "기회비용은 실제 청구되는 비용이 아닙니다. 보증금 미회수 위험·거래 비용·변동금리·이사와 자금 유동성은 별도로 검토해야 합니다.",
    },
    en: {
      answer:
        "Compare jeonse loan interest plus the opportunity cost of own funds with rent plus the opportunity cost of its deposit.",
      example:
        "A KRW 200,000,000 jeonse deposit with KRW 100,000,000 borrowed at 4%, versus a KRW 20,000,000 rent deposit and KRW 600,000 monthly rent, at an assumed 3% opportunity return over 12 months, gives jeonse cost KRW 7,000,000 versus rent cost KRW 7,800,000.",
      check:
        "Opportunity cost is not a cash bill. Deposit recovery risk, transaction costs, rate changes, moving costs and liquidity require separate consideration.",
    },
    sources: [],
    related: ["jeonse-loan-interest", "rent-affordability"],
  },
  "home-purchase-total-cost": {
    ko: {
      answer:
        "주택 매매가격에 직접 입력한 초기 비용을 더하고 대출금을 빼 필요한 현금을 계산합니다.",
      example:
        "매매가 300,000,000원·대출 180,000,000원에 취득세 3,300,000원, 중개 1,000,000원, 법무 700,000원, 대출 200,000원, 이사 800,000원, 수리/가구 4,000,000원·기타 0원이면 총비용 310,000,000원, 필요 현금 130,000,000원입니다.",
      check:
        "세금과 수수료를 자동 산정하거나 대출 승인을 판정하지 않습니다. 예시 비용 대신 실제 견적을 넣고 보증금 반환·잔금일·향후 월 상환액을 별도로 확인하세요.",
    },
    en: {
      answer:
        "Add entered upfront costs to purchase price and subtract loan funding to estimate cash required.",
      example:
        "For a 300,000,000 purchase and 180,000,000 loan, enter acquisition tax 3,300,000, brokerage 1,000,000, legal 700,000, loan/appraisal 200,000, moving 800,000, renovation/furniture 4,000,000 and other costs zero. Total cost is 310,000,000 and cash required is 130,000,000.",
      check:
        "Tax/fees and loan eligibility are not determined automatically. Replace example costs with quotes and check deposit recovery, closing dates and future monthly payments separately.",
    },
    sources: ["acquisition", "brokerage"],
    related: ["real-estate-acquisition-tax", "mortgage-payment"],
  },
  "home-sale-net-proceeds": {
    ko: {
      answer:
        "매각 순수령액은 매도가에서 매도 비용과 대출 상환액을 뺀 현금 흐름입니다. 취득 원가를 뺀 투자 이익과 다릅니다.",
      example:
        "매도가 400,000,000원·대출 상환 220,000,000원·중개 1,600,000원·양도세 20,000,000원·법무 400,000원·수리 3,000,000원·이사 1,000,000원·기타 0원이면 매도 비용 26,000,000원, 순수령액 154,000,000원입니다.",
      check:
        "양도세는 실제 계산한 세액을 직접 입력합니다. 취득 원가·과거 보유비·보증금 반환 등 빠진 현금 의무가 있으면 따로 반영해야 합니다.",
    },
    en: {
      answer:
        "Net sale proceeds are sale price less selling costs and mortgage payoff. This is cash released, not profit after acquisition cost.",
      example:
        "Sale price 400,000,000 less mortgage payoff 220,000,000 and selling costs of brokerage 1,600,000, transfer tax 20,000,000, legal 400,000, repair 3,000,000, moving 1,000,000 and other zero leaves 154,000,000 net proceeds.",
      check:
        "Enter independently calculated transfer tax. Acquisition cost, past ownership costs, tenant-deposit return and any omitted cash obligations require separate treatment.",
    },
    sources: ["capitalGains", "brokerage"],
    related: ["capital-gains-tax", "home-purchase-total-cost"],
  },
  "rental-yield": {
    ko: {
      answer:
        "연 임대수입에 공실률을 적용하고 운영비를 빼 매입가 대비 순운영 수익률을 구합니다.",
      example:
        "매입가 200,000,000원·월세 1,000,000원·기타 연 수입 0원·공실률 10%·연 운영비 2,000,000원이면 유효 수입 10,800,000원, 순운영 수입 8,800,000원, 순수익률 4.4%입니다.",
      check:
        "분모는 자기자본이 아닌 매입가입니다. 대출이자·취득 부대비·매각차익·세금은 해당 입력에 포함하지 않으면 반영되지 않습니다.",
    },
    en: {
      answer:
        "Apply vacancy to annual rental income, subtract operating costs and compare net operating income with purchase price.",
      example:
        "Purchase price 200,000,000, monthly rent 1,000,000, no other income, 10% vacancy and 2,000,000 annual operating costs give effective income 10,800,000 and net operating income 8,800,000: a 4.4% net yield.",
      check:
        "The denominator is purchase price, not equity. Debt interest, acquisition costs, capital gains and taxes are excluded unless represented in the stated inputs.",
    },
    sources: [],
    related: ["property-tax", "mortgage-payment"],
  },
  "apartment-management-fee-budget": {
    ko: {
      answer:
        "반복 월 비용에 연간 특별지출의 월 환산액을 더해 관리·공과금 예산을 비교합니다.",
      example:
        "관리비 200,000원·공과금 100,000원·주차 등 20,000원·연 특별지출 1,200,000원·면적 84㎡·월 실수령 4,200,000원이면 월 예산 420,000원, 연 5,040,000원, ㎡당 월 5,000원, 소득 비중 10%입니다.",
      check:
        "전기·수도 등이 관리비에 이미 포함됐는지 확인해 중복 입력하지 마세요. 특별지출 월평균은 실제 청구 월을 뜻하지 않으며 월세·대출금은 별도입니다.",
    },
    en: {
      answer:
        "Add recurring monthly costs and one-twelfth of annual special assessments to estimate the housing-fee budget.",
      example:
        "Management fee 200,000, utilities 100,000, parking/other 20,000, annual special assessments 1,200,000, area 84 m² and net monthly income 4,200,000 give a monthly budget of 420,000, annual 5,040,000, 5,000 per m² monthly and 10% of income.",
      check:
        "Avoid double-counting utilities already in the management bill. Monthly averaging does not predict when special costs are billed; rent and mortgage payments are separate.",
    },
    sources: [],
    related: ["rent-affordability", "emergency-fund"],
  },
  "compound-interest": {
    ko: {
      answer:
        "복리는 원금뿐 아니라 이전에 쌓인 이자에도 다음 이자를 적용합니다.",
      example:
        "초기금 1,000,000원·연 10%·연 1회 복리·2년·추가 납입 0원·세금/물가 0%이면 1,000,000 × 1.1² = 1,210,000원입니다. 이자는 210,000원입니다.",
      check:
        "추가 납입이 있으면 납입 주기와 기초/기말 시점을 맞추세요. 일정한 수익률의 가상 비교이며 실제 투자 성과나 지급 보장이 아닙니다.",
    },
    en: {
      answer:
        "Compounding earns the next period's return on both principal and previously accumulated interest.",
      example:
        "With 1,000,000 initially, 10% annual interest compounded yearly for two years, no contributions and zero tax/inflation, 1,000,000 × 1.1² = 1,210,000. Interest is 210,000.",
      check:
        "Match contribution frequency and beginning/end timing when adding payments. Constant returns are hypothetical, not guaranteed investment performance.",
    },
    sources: ["compound"],
    related: ["cagr", "investment-fee-impact"],
  },
  "fixed-deposit": {
    ko: {
      answer:
        "한 번 맡긴 원금의 세전 이자와 입력한 세율을 차감한 만기액을 구합니다.",
      example:
        "원금 10,000,000원·연 3%·12개월·단리·예시 세율 0%이면 이자는 300,000원이고 만기액은 10,300,000원입니다.",
      check:
        "기간을 개월로 입력합니다. 복리 선택 시 월 복리 모델이며 세율·중도해지·우대 조건은 실제 상품과 대조하세요.",
    },
    en: {
      answer:
        "Calculate interest on a lump-sum deposit and the maturity amount after the tax rate you enter.",
      example:
        "Principal of 10,000,000 at 3% for 12 months with simple interest and a hypothetical 0% tax rate earns 300,000, for 10,300,000 at maturity.",
      check:
        "Enter months. Compound mode uses monthly compounding; verify tax treatment, early withdrawal and preferential conditions against the actual product.",
    },
    sources: ["compound"],
    related: ["savings", "compound-interest"],
  },
  savings: {
    ko: {
      answer:
        "정기 납입 적금은 각 납입금의 운용 기간이 달라 총 납입금 전체에 1년 이율을 곱하지 않습니다.",
      example:
        "매월 초 100,000원씩 12개월·연 6%·단리·예시 세율 0%이면 납입 원금 1,200,000원, 이자 39,000원, 만기액 1,239,000원입니다.",
      check:
        "기말 납입은 마지막 납입금의 이자가 없으므로 결과가 달라집니다. 월 단위 비교 모델로 실제 일수·세금 절사는 상품 약관을 확인하세요.",
    },
    en: {
      answer:
        "Recurring deposits earn interest for different lengths of time; the full year's rate does not apply to the entire final contribution total.",
      example:
        "Depositing 100,000 at each month's beginning for 12 months at 6% simple interest and a hypothetical 0% tax gives principal 1,200,000, interest 39,000 and maturity value 1,239,000.",
      check:
        "End-of-month deposits produce a different result because the last deposit earns no interest. Actual day counts and tax rounding depend on the product.",
    },
    sources: ["compound"],
    related: ["fixed-deposit", "savings-goal"],
  },
  "stock-average-cost": {
    ko: {
      answer:
        "평균 매입단가는 수량으로 가중한 총 매입금액을 총 보유수량으로 나눈 값입니다.",
      example:
        "10주를 주당 10,000원에 보유하고 20주를 7,000원에 추가하면 총 30주·매입액 240,000원, 새 평단은 8,000원입니다.",
      check:
        "서로 다른 수량의 단가를 단순 평균하지 마세요. 매수 수수료·세금·주식 분할과 매도에 따른 세무상 원가 변화는 별도입니다.",
    },
    en: {
      answer:
        "Average purchase price is total purchase cost divided by total shares, weighted by quantity.",
      example:
        "Holding 10 shares at 10,000 and buying 20 more at 7,000 gives 30 shares, total cost 240,000 and a new average price of 8,000.",
      check:
        "Do not take a simple average when quantities differ. Fees, taxes, splits and tax-basis changes after sales are separate.",
    },
    sources: ["returns"],
    related: ["stock-profit-loss", "dollar-cost-averaging"],
  },
  "stock-profit-loss": {
    ko: {
      answer:
        "평가손익은 현재 평가액에서 매입 원가를 뺀 값이며 수익률의 분모는 매입 원가입니다.",
      example:
        "10주·매입 평단 10,000원·현재가 12,000원이면 원가 100,000원, 평가액 120,000원, 손익 +20,000원, 수익률 +20%입니다.",
      check:
        "배당·거래 수수료·세금·환율 변동은 제외한 가격 기준 손익입니다. 매도 전에는 실현 이익이 아닙니다.",
    },
    en: {
      answer:
        "Unrealized profit/loss is current market value minus purchase cost; return uses purchase cost as its denominator.",
      example:
        "For 10 shares bought at an average 10,000 with current price 12,000, cost is 100,000, value 120,000, profit 20,000 and return 20%.",
      check:
        "This price-only result excludes dividends, fees, taxes and currency movement. Profit is unrealized until a sale.",
    },
    sources: ["returns"],
    related: ["stock-average-cost", "dividend"],
  },
  dividend: {
    ko: {
      answer:
        "연간 주당 배당금에 보유 주수를 곱한 뒤 입력한 차감률을 적용합니다. 월평균은 지급 일정과 다릅니다.",
      example:
        "100주·연간 주당 배당 2,000원·연 4회·예시 차감률 10%이면 연 세전 200,000원, 회당 세전 50,000원, 연 차감 후 180,000원, 월평균 15,000원입니다.",
      check:
        "10%는 계산 예시용 입력값입니다. 실제 국가·계좌·조세협약별 세율과 배당 변경·지급일을 별도로 확인하세요.",
    },
    en: {
      answer:
        "Multiply annual dividend per share by shares, then apply the entered withholding assumption. A monthly average is not the payment schedule.",
      example:
        "For 100 shares, annual dividend per share 2,000, four payments yearly and a hypothetical 10% withholding rate, gross annual dividend is 200,000, gross per payment 50,000, net annual 180,000 and monthly average 15,000.",
      check:
        "The 10% rate is illustrative. Actual jurisdiction, account and treaty treatment, dividend changes and payment dates require separate checks.",
    },
    sources: ["returns"],
    related: ["dividend-yield", "dividend-reinvestment"],
  },
  "dividend-yield": {
    ko: {
      answer:
        "배당수익률은 연간 주당 배당금을 주가로 나눈 비율로, 주가 변동을 포함한 총수익률과 다릅니다.",
      example:
        "주가 100·연간 주당 배당 4이면 배당수익률은 4%입니다. 투자금 10,000이면 수량 비교값 100주, 예상 연간 배당 400입니다.",
      check:
        "현재 입력 주가와 배당금이 유지된다는 가정입니다. 소수 주수·세금·지급일·미래 배당 축소와 원금 변동은 별도입니다.",
    },
    en: {
      answer:
        "Dividend yield divides annual dividend per share by share price. It is different from total return including price changes.",
      example:
        "At share price 100 and annual dividend per share 4, yield is 4%. An investment amount of 10,000 implies 100 shares and 400 annual dividends.",
      check:
        "This assumes the entered price and dividend persist. Fractional share availability, taxes, dates, dividend cuts and principal changes are separate.",
    },
    sources: ["returns"],
    related: ["dividend", "stock-profit-loss"],
  },
  "dollar-cost-averaging": {
    ko: {
      answer:
        "이 도구는 매월 같은 금액을 기말에 투자하는 적립식 자산 성장 모델입니다.",
      example:
        "초기금 1,200,000원·월 납입 100,000원·1년·예시 수익률 0%이면 총 투자 원금과 예상 잔액은 모두 2,400,000원입니다.",
      check:
        "실제 가격 경로에 따른 매수 주수나 평균 단가를 재현하지 않습니다. 일정 수익률 가정이며 적립식 투자가 손실을 막거나 이익을 보장하지 않습니다.",
    },
    en: {
      answer:
        "This tool models asset growth from equal end-of-month contributions.",
      example:
        "With 1,200,000 initially, 100,000 monthly for one year and a hypothetical 0% return, both contributions and ending balance are 2,400,000.",
      check:
        "It does not reconstruct purchases along an actual price path. Returns are assumed constant; regular investing cannot guarantee profit or prevent losses.",
    },
    sources: ["dca", "compound"],
    related: ["stock-average-cost", "savings-goal"],
  },
  "savings-goal": {
    ko: {
      answer:
        "목표금액에서 현재 자금의 예상 미래가치를 빼고, 부족분을 월 기말 납입으로 채우는 모델입니다.",
      example:
        "목표 12,000,000원·현재 저축 2,400,000원·2년·예시 수익률 0%이면 부족한 9,600,000원을 24개월로 나눠 월 400,000원이 필요합니다.",
      check:
        "세금·수수료·물가·수익률 변동과 납입 누락은 제외합니다. 이미 목표를 충족하는 경우 추가 월 납입액은 0으로 표시합니다.",
    },
    en: {
      answer:
        "Subtract the projected future value of existing savings from the goal and fund the gap with end-of-month contributions.",
      example:
        "A goal of 12,000,000, existing savings 2,400,000, two years and a hypothetical 0% return leave 9,600,000 to fund over 24 months: 400,000 per month.",
      check:
        "Taxes, fees, inflation, variable returns and missed payments are excluded. If existing funds already meet the modeled goal, required monthly contribution is zero.",
    },
    sources: ["compound"],
    related: ["savings", "emergency-fund"],
  },
  "investment-fee-impact": {
    ko: {
      answer:
        "입력 연 수익률에서 연 수수료율을 뺀 뒤 월 단위로 복리 비교합니다. 수수료의 누적 영향에는 잃은 복리 성장도 포함됩니다.",
      example:
        "초기금 10,000·월 추가 0·연 수익률 6%·연 수수료 1%·1년이면 수수료 전 잔액은 약 10,616.78, 수수료 반영 후 약 10,511.62, 차이는 약 105.16입니다.",
      check:
        "수수료를 연 수익률에서 차감하는 단순 모델입니다. 실제 보수 부과 주기·성과보수·거래 수수료·세금은 다를 수 있습니다.",
    },
    en: {
      answer:
        "Subtract the annual fee rate from the assumed annual return and compare monthly compounding. The impact includes foregone growth.",
      example:
        "For initial funds 10,000, no contributions, 6% assumed annual return, 1% annual fee and one year, the modeled balance is about 10,616.78 before fees versus 10,511.62 after, a difference of about 105.16.",
      check:
        "The fee is a simplified return reduction. Actual charging frequency, performance fees, transaction charges and taxes can differ.",
    },
    sources: ["fees"],
    related: ["compound-interest", "inflation-purchasing-power"],
  },
  "inflation-purchasing-power": {
    ko: {
      answer:
        "미래 필요 명목금액은 물가 배율을 곱하고, 현재 돈의 미래 구매력은 같은 배율로 나눕니다.",
      example:
        "현재 금액 1,000,000원·가상 물가상승률 연 2%·2년이면 같은 물건의 미래 비용은 1,040,400원, 현재 돈의 미래 구매력은 약 961,169원입니다.",
      check:
        "2%는 전망이나 현재 통계가 아니라 예시입니다. 개인 소비 구성과 변동 물가·세후 투자 수익은 별도로 고려하세요.",
    },
    en: {
      answer:
        "Multiply by the inflation factor for future nominal cost; divide by it for future purchasing power of today's money.",
      example:
        "At 1,000,000 today, a hypothetical 2% annual inflation rate and two years, the same basket costs 1,040,400 in future nominal money; the purchasing power of today's amount becomes about 961,169.",
      check:
        "The 2% rate is an example, not current statistics or a forecast. Personal spending mix, changing inflation and after-tax returns are separate.",
    },
    sources: ["compound"],
    related: ["investment-fee-impact", "fire-retirement-target"],
  },
  "emergency-fund": {
    ko: {
      answer:
        "비상자금 목표는 월 필수지출에 입력한 준비 개월 수를 곱한 금액입니다.",
      example:
        "월 필수지출 2,000,000원·목표 6개월·현재 4,000,000원·월 저축 1,000,000원이면 목표 12,000,000원, 부족분 8,000,000원, 목표까지 8개월입니다.",
      check:
        "6개월은 예시 선택값이며 모든 가구에 맞는 기준이 아닙니다. 고용 안정성·부양가족·보험과 자금의 인출 가능성을 함께 보세요.",
    },
    en: {
      answer:
        "The emergency-fund target is monthly essential expenses multiplied by your chosen coverage months.",
      example:
        "Essential expenses of 2,000,000 monthly, a six-month target, current savings 4,000,000 and monthly additions of 1,000,000 give a 12,000,000 target, 8,000,000 gap and eight months to fund it.",
      check:
        "Six months is a selected example, not a universal requirement. Consider income stability, dependants, insurance and access to the funds.",
    },
    sources: ["emergency"],
    related: ["savings-goal", "business-cash-runway"],
  },
  "fire-retirement-target": {
    ko: {
      answer: "목표 자산은 연간 생활비를 입력 인출률로 나눈 계획용 금액입니다.",
      example:
        "월 생활비 2,000,000원·예시 인출률 4%이면 연 지출 24,000,000원 ÷ 0.04 = 목표 자산 600,000,000원입니다. 현재 100,000,000원이면 부족분은 500,000,000원입니다.",
      check:
        "4%는 안전 인출률 보장이 아닙니다. 세금·물가·수익 순서 위험·은퇴 기간을 함께 고려하고 다른 인출률도 비교하세요.",
    },
    en: {
      answer:
        "The target portfolio divides annual expenses by the withdrawal rate you choose.",
      example:
        "Monthly expenses of 2,000,000 and a hypothetical 4% withdrawal rate give annual expenses of 24,000,000 and a 600,000,000 target. With 100,000,000 currently invested, the gap is 500,000,000.",
      check:
        "The 4% input is not a guarantee of a safe withdrawal rate. Consider taxes, inflation, sequence risk and retirement duration, and compare alternatives.",
    },
    sources: ["compound"],
    related: ["retirement-withdrawal", "inflation-purchasing-power"],
  },
  "retirement-withdrawal": {
    ko: {
      answer:
        "매월 수익을 반영한 뒤 정액을 인출하며, 잔액이 부족한 마지막 달에는 남은 금액만 인출합니다.",
      example:
        "초기 자산 12,000,000원·월 인출 1,000,000원·예시 수익률 0%·계획 2년이면 12개월에 소진되고 총 인출액은 12,000,000원입니다.",
      check:
        "인출액은 물가에 연동되지 않고 수익률은 일정합니다. 실제 수익 순서·세금·급변동을 반영하는 확률적 생존 분석은 아닙니다.",
    },
    en: {
      answer:
        "Apply the monthly return, then withdraw a fixed amount; the last withdrawal cannot exceed the remaining balance.",
      example:
        "With initial assets 12,000,000, monthly withdrawals 1,000,000, a hypothetical 0% return and a two-year plan, funds run out in month 12 after 12,000,000 total withdrawals.",
      check:
        "Withdrawals are not inflation-linked and returns are constant. This is not a probabilistic survival analysis of sequence risk, taxes or market shocks.",
    },
    sources: ["compound"],
    related: ["fire-retirement-target", "pension-future-monthly-income"],
  },
  "pension-future-monthly-income": {
    ko: {
      answer:
        "적립 기간의 잔액을 예상한 뒤 선택한 지급 기간 동안 나눠 받는 금융 모델입니다.",
      example:
        "현재 12,000,000원·월 납입 1,000,000원·적립 1년·적립/지급 수익률 모두 0%·지급 2년이면 은퇴 시 24,000,000원, 월 지급 비교값은 1,000,000원입니다.",
      check:
        "국민연금의 가입기간·소득·수급 연령으로 산정하는 공적 연금액이나 종신 지급 보장이 아닙니다. 세금·물가는 제외합니다.",
    },
    en: {
      answer:
        "Project the accumulation balance, then calculate payments over the payout term you choose.",
      example:
        "Current savings 12,000,000 plus 1,000,000 monthly for one year, zero accumulation/payout returns and two payout years give 24,000,000 at retirement and modeled monthly payments of 1,000,000.",
      check:
        "This does not calculate statutory pension entitlements or guarantee lifetime income. Taxes and inflation are excluded.",
    },
    sources: ["compound"],
    related: ["retirement-pension", "retirement-withdrawal"],
  },
  "dividend-reinvestment": {
    ko: {
      answer:
        "배당을 같은 자산에 재투자하는 경우와 현금으로 보유하는 경우의 최종 합계를 비교합니다.",
      example:
        "초기금 1,000·초기 배당수익률 10%·주가/주당 배당 성장률 모두 0%·2년이면 재투자 잔액은 1,210, 현금 배당 포함 합계는 1,200, 차이는 10입니다.",
      check:
        "연 단위 배당과 즉시 소수 단위 재투자, 세금·수수료 0을 가정합니다. 10%는 시장 배당률이나 보장 수익률이 아닙니다.",
    },
    en: {
      answer:
        "Compare reinvesting dividends into the asset with retaining dividends as cash.",
      example:
        "Starting with 1,000, a hypothetical 10% dividend yield, zero price/dividend growth and two years gives 1,210 with reinvestment versus 1,200 including cash dividends, a difference of 10.",
      check:
        "Assumes annual dividends, immediate fractional reinvestment and no tax or fees. The 10% example is not a market yield or guaranteed return.",
    },
    sources: ["returns", "compound"],
    related: ["dividend", "dividend-yield"],
  },
  "portfolio-rebalancing": {
    ko: {
      answer:
        "목표 비중에 맞는 자산별 금액에서 현재 평가액을 빼 매수·매도 비교액을 구합니다.",
      example:
        "총 1,000,000 중 A 800,000·B 200,000을 목표 A 60%·B 40%로 맞추려면 A 200,000을 매도하고 B 200,000을 매수합니다.",
      check:
        "목표 합계는 100%여야 합니다. 세금·수수료·최소 주문단위·매매 불가능 자산은 반영하지 않으며 권장 배분을 제시하는 기능도 아닙니다.",
    },
    en: {
      answer:
        "Subtract each current holding from its target allocation amount to estimate buys and sells.",
      example:
        "With a 1,000,000 portfolio split A 800,000 and B 200,000, target weights of 60%/40% imply selling 200,000 of A and buying 200,000 of B.",
      check:
        "Targets must total 100%. Taxes, fees, minimum order sizes and illiquid assets are excluded; the tool does not recommend an allocation.",
    },
    sources: ["allocation"],
    related: ["stock-profit-loss", "investment-fee-impact"],
  },
  "bond-price": {
    ko: {
      answer:
        "고정 쿠폰과 만기 원금의 미래 현금흐름을 입력한 시장 수익률로 할인해 가격을 계산합니다.",
      example:
        "액면 1,000·연 쿠폰 5%·잔존 1년·연 1회 지급·시장 수익률 10%이면 1년 뒤 1,050을 받으므로 가격은 1,050 ÷ 1.1 ≈ 954.55입니다.",
      check:
        "지급일 사이의 경과이자·수수료·세금·조기상환·채무불이행은 제외합니다. 실제 채권의 호가 단위와 쿠폰 지급 주기를 맞추세요.",
    },
    en: {
      answer:
        "Discount fixed coupon payments and maturity principal at the entered market yield to estimate price.",
      example:
        "For face value 1,000, a 5% annual coupon, one year remaining, annual payments and a 10% market yield, the 1,050 maturity cash flow has a price of 1,050 ÷ 1.1 ≈ 954.55.",
      check:
        "Accrued interest between payment dates, fees, taxes, calls and default are excluded. Match the actual quote units and coupon frequency.",
    },
    sources: ["bonds"],
    related: ["bond-yield-to-maturity", "guides:bond-price-and-yield"],
  },
  "apr-apy-conversion": {
    ko: {
      answer:
        "이 도구의 APR↔APY는 명목 연이율과 복리 빈도에 따른 유효 연이율의 수학적 변환입니다.",
      example:
        "명목 연이율 12%·분기 복리 4회이면 APY는 [(1 + 0.12/4)^4 − 1] × 100 = 약 12.550881%입니다.",
      check:
        "수수료를 포함하는 국가별 법정 대출 APR 공시를 재현하지 않습니다. 복리 빈도와 금리 표시 기준을 같은 조건으로 비교하세요.",
    },
    en: {
      answer:
        "Here APR↔APY is a mathematical conversion between a nominal annual rate and the effective annual rate at a chosen compounding frequency.",
      example:
        "A nominal 12% annual rate compounded quarterly gives APY = [(1 + 0.12/4)^4 − 1] × 100 ≈ 12.550881%.",
      check:
        "This does not reconstruct jurisdiction-specific statutory loan APR disclosures including fees. Compare matching rate conventions and compounding frequencies.",
    },
    sources: ["compound"],
    related: ["compound-interest", "fixed-deposit"],
  },
  "crypto-average-cost": {
    ko: {
      answer: "보유 수량과 추가 매수 수량으로 가중한 매입 원가의 평균입니다.",
      example:
        "기존 1개·평단 100, 추가 1개·가격 80이면 총 2개·원가 180, 새 평단은 90입니다.",
      check:
        "같은 자산·가격 표시 통화로 입력합니다. 거래 수수료·체인 수수료·세금·스테이킹 수량 변화는 포함하지 않습니다.",
    },
    en: {
      answer:
        "Average entry price weights each purchase price by the quantity bought.",
      example:
        "One unit held at average cost 100 plus one unit bought at 80 gives two units, total cost 180 and a new average of 90.",
      check:
        "Use the same asset and quote currency. Trading/network fees, taxes and staking-related quantity changes are excluded.",
    },
    sources: ["crypto"],
    related: ["crypto-profit-loss", "foreign-currency-average-cost"],
  },
  "crypto-profit-loss": {
    ko: {
      answer:
        "매수 수수료를 원가에 더하고 예상 매도 수수료를 평가액에서 빼 손익을 구합니다.",
      example:
        "수량 2·매입 단가 100·현재가 120·매수/매도 수수료 각각 1%이면 원가 202, 예상 순매도액 237.6, 손익 +35.6입니다.",
      check:
        "실제 체결 전 예상 손익입니다. 세금·스프레드·슬리피지·출금/네트워크 비용·환율은 추가로 반영하지 않습니다.",
    },
    en: {
      answer:
        "Add buy fees to cost and subtract estimated sell fees from current value to calculate net profit/loss.",
      example:
        "For two units bought at 100, current price 120 and 1% buy/sell fees, total cost is 202, estimated net sale value 237.6 and profit 35.6.",
      check:
        "This is an estimate before execution. Taxes, spread, slippage, withdrawal/network costs and exchange rates are not added.",
    },
    sources: ["crypto"],
    related: ["crypto-average-cost", "percentage"],
  },
  "staking-reward": {
    ko: {
      answer:
        "예상 보상률과 기간으로 토큰 수량의 단리 또는 복리 증가를 비교합니다.",
      example:
        "예치 수량 1,000·연 보상률 10%·365일·복리 횟수 0(단리)이면 예상 보상 100, 최종 수량 1,100입니다.",
      check:
        "토큰 가격과 원화 수익은 계산하지 않습니다. 보상률 변화·잠금·슬래싱·플랫폼 위험·세금이 있어 표시 수량이 보장되지 않습니다.",
    },
    en: {
      answer:
        "Compare simple or compounded token-quantity growth at an assumed reward rate over the chosen period.",
      example:
        "For 1,000 tokens, a hypothetical 10% annual reward rate, 365 days and zero compounding periods (simple interest), modeled rewards are 100 and the final quantity is 1,100.",
      check:
        "It does not calculate token price or fiat profit. Variable rewards, lockups, slashing, platform risk and taxes mean the quantity is not guaranteed.",
    },
    sources: ["crypto", "compound"],
    related: ["crypto-profit-loss", "apr-apy-conversion"],
  },
  "foreign-currency-average-cost": {
    ko: {
      answer:
        "각 외화 매입 수량에 적용 환율을 곱한 원가 합계를 총 외화 수량으로 나눕니다.",
      example:
        "기존 1,000 USD를 1,300 KRW/USD에 보유하고 1,000 USD를 1,400에 추가하면 총 2,000 USD·원가 2,700,000 KRW, 평균 환율은 1,350 KRW/USD입니다.",
      check:
        "두 환율의 방향과 통화를 통일하세요. 예시 환율은 실시간 시세가 아니며 수수료·이자·매도 후 세무상 원가는 제외합니다.",
    },
    en: {
      answer:
        "Divide total quote-currency purchase cost by total foreign-currency units.",
      example:
        "Holding USD 1,000 at KRW 1,300/USD and buying USD 1,000 at 1,400 gives USD 2,000, KRW 2,700,000 total cost and an average rate of KRW 1,350/USD.",
      check:
        "Use matching currencies and rate directions. Example rates are not live quotes; fees, interest and tax basis after sales are excluded.",
    },
    sources: ["fx"],
    related: ["currency-conversion", "guides:currency-conversion-rate-check"],
  },
  "break-even-sales": {
    ko: {
      answer:
        "손익분기점은 고정비를 단위 공헌이익 또는 공헌이익률로 나눠 구합니다.",
      example:
        "고정비 1,000,000원·단위 판매가 10,000원·단위 변동비 6,000원이면 공헌이익은 4,000원, 손익분기 판매량 250개, 매출액 2,500,000원입니다.",
      check:
        "판매가가 변동비보다 커야 합니다. 소수 판매량은 실제 판매 단위에 맞춰 올림하고, 누락된 비용·세금·판매 구성 변화는 별도로 보세요.",
    },
    en: {
      answer:
        "Break-even divides fixed costs by contribution per unit, or by the contribution-margin ratio for sales value.",
      example:
        "Fixed costs 1,000,000, price per unit 10,000 and variable cost 6,000 give contribution 4,000, break-even volume 250 units and sales 2,500,000.",
      check:
        "Price must exceed variable cost. Round fractional units up where needed and account separately for missing costs, taxes and a changing product mix.",
    },
    sources: [],
    related: ["operating-profit", "business-cash-runway"],
  },
  "real-estate-acquisition-tax": {
    ko: {
      answer:
        "취득가액에 사용자가 확인해 입력한 세목별 요율을 각각 곱하고 기타 비용을 더합니다.",
      example:
        "취득가 300,000,000원·예시 취득세율 1%·지방교육세율 0.1%·농어촌특별세율 0%·기타 비용 1,000,000원이면 세금 합계 3,300,000원, 총 취득 비용 304,300,000원입니다.",
      check:
        "요율을 자동 판정하지 않습니다. 주택 수·취득 원인·면적·중과·감면과 취득일 기준 적용 요율을 관할 지자체나 위택스에서 먼저 확인하세요.",
    },
    en: {
      answer:
        "Multiply acquisition value by each tax rate you have verified, then add other costs.",
      example:
        "For KRW 300,000,000 and illustrative rates of 1% acquisition tax, 0.1% education tax and 0% rural tax, plus KRW 1,000,000 other costs, taxes total KRW 3,300,000 and total acquisition cost is KRW 304,300,000.",
      check:
        "Rates are not determined automatically. Verify property count, transaction type, size, surcharges, relief and acquisition-date rules with the local authority or Wetax.",
    },
    sources: ["acquisition"],
    related: ["home-purchase-total-cost", "real-estate-brokerage-fee"],
  },
  "capital-gains-tax": {
    ko: {
      answer:
        "양도 차익에서 입력 공제를 뺀 과세표준에 입력 세율을 적용하는 단순 비교입니다.",
      example:
        "매도가 200,000,000원·취득가 150,000,000원·필요경비 10,000,000원·기본공제 2,500,000원·예시 소득세율 20%·지방세율 10%(소득세액 기준)이면 과세 차익 37,500,000원, 세금 합계 8,250,000원입니다.",
      check:
        "자산 종류별 누진세율·장기보유 공제·비과세·중과·손익 통산을 자동 적용하지 않습니다. 이 모델의 입력 요율을 실제 신고 세율로 간주하지 마세요.",
    },
    en: {
      answer:
        "This simplified comparison applies your entered tax rate to gain after entered deductions.",
      example:
        "Sale price KRW 200,000,000, acquisition KRW 150,000,000, expenses KRW 10,000,000, entered deduction KRW 2,500,000, hypothetical income-tax rate 20% and local tax at 10% of income tax produce taxable gain KRW 37,500,000 and total tax KRW 8,250,000.",
      check:
        "It does not automatically apply asset-specific progressive rates, holding-period relief, exemptions, surcharges or loss netting. Entered rates are not a determination of filing liability.",
    },
    sources: ["capitalGains"],
    related: ["home-sale-net-proceeds", "comprehensive-income-tax"],
  },
  "gift-tax": {
    ko: {
      answer:
        "확인한 공제·세율·누진공제와 신고공제율을 직접 넣어 증여세 계산 과정을 비교합니다.",
      example:
        "증여 100,000,000원·인수 채무 0원·입력 공제 50,000,000원·세율 10%·누진공제 0원·신고공제율 3%의 예시에서는 산출세액 5,000,000원, 공제 150,000원, 추정 납부액 4,850,000원입니다.",
      check:
        "공제 50,000,000원이 모든 관계에 적용되지는 않습니다. 증여자와의 관계·나이·10년 합산·특례·세대생략·부담부증여는 별도로 판정해야 합니다.",
    },
    en: {
      answer:
        "Compare gift-tax arithmetic using deductions, rates, progressive deductions and filing-credit assumptions you enter.",
      example:
        "For a KRW 100,000,000 gift, no assumed debt, entered deduction KRW 50,000,000, 10% tax, zero progressive deduction and a hypothetical 3% filing credit, tax before credit is KRW 5,000,000, credit KRW 150,000 and estimated tax KRW 4,850,000.",
      check:
        "The KRW 50,000,000 deduction is not universal. Relationship, age, ten-year aggregation, special relief, generation-skipping and debt-assumed gifts require separate assessment.",
    },
    sources: ["gift"],
    related: ["inheritance-tax", "capital-gains-tax"],
  },
  "inheritance-tax": {
    ko: {
      answer:
        "상속 재산에서 채무·장례비·입력 공제를 뺀 뒤 확인한 요율로 세액을 비교합니다.",
      example:
        "재산 600,000,000원·채무 50,000,000원·장례비 10,000,000원·입력 공제 500,000,000원·세율 10%·누진공제 0원·신고공제율 3%이면 과세표준 40,000,000원, 추정 세액 3,880,000원입니다.",
      check:
        "예시 공제를 자동 인정하는 기능이 아닙니다. 배우자·일괄 공제 요건, 사전 증여, 재산 평가·합산, 공제 한도와 실제 신고공제 요건을 확인하세요.",
    },
    en: {
      answer:
        "Subtract debts, funeral expenses and entered deductions from the estate, then compare tax using verified rate inputs.",
      example:
        "Estate KRW 600,000,000 less debts KRW 50,000,000, funeral costs KRW 10,000,000 and entered deductions KRW 500,000,000 gives a KRW 40,000,000 base. At entered 10% tax, no progressive deduction and 3% filing credit, estimated tax is KRW 3,880,000.",
      check:
        "Example deductions are not automatically established entitlements. Check spouse/lump-sum relief, prior gifts, valuation, aggregation, limits and filing-credit eligibility.",
    },
    sources: ["inheritance"],
    related: ["gift-tax", "home-sale-net-proceeds"],
  },
  "property-tax": {
    ko: {
      answer:
        "공시가격에 입력 과세표준 비율을 적용한 뒤 재산세·도시지역분과 재산세액의 지방교육세를 합산합니다.",
      example:
        "공시가격 300,000,000원·입력 과표비율 60%·재산세율 0.2%·누진공제 0원·도시지역분 0.14%의 예시는 과표 180,000,000원, 재산세 360,000원, 도시지역분 252,000원, 교육세 72,000원, 합계 684,000원입니다.",
      check:
        "입력 요율은 예시입니다. 주택 특례·세부담 상한·감면·지역자원시설세 등 고지서 항목을 모두 재현하지 않습니다. 교육세 20%의 기준은 도시지역분을 제외한 재산세입니다.",
    },
    en: {
      answer:
        "Apply the entered tax-base ratio to assessed value, then combine property tax, urban-area tax and education tax on property tax.",
      example:
        "At assessed value KRW 300,000,000, hypothetical base ratio 60%, property-tax rate 0.2%, no progressive deduction and urban rate 0.14%, the base is KRW 180,000,000; property tax KRW 360,000, urban tax KRW 252,000 and education tax KRW 72,000 total KRW 684,000.",
      check:
        "Rates are illustrative. Special housing treatment, burden caps, relief and all bill items are not reconstructed. The modeled 20% education tax applies to property tax excluding the urban component.",
    },
    sources: ["propertyEducation"],
    related: ["comprehensive-real-estate-holding-tax", "rental-yield"],
  },
  "comprehensive-real-estate-holding-tax": {
    ko: {
      answer:
        "입력한 기본공제·공정시장가액비율·요율과 재산세 공제를 순서대로 적용하는 종부세 비교 모델입니다.",
      example:
        "합산 공시가격 1,000,000,000원·입력 기본공제 900,000,000원·비율 60%·세율 0.5%·누진공제 0원·재산세 공제 100,000원이면 과표 60,000,000원, 종부세 200,000원, 농특세 40,000원, 합계 240,000원입니다.",
      check:
        "예시 공제와 비율을 모든 보유자에게 적용하지 마세요. 주택 수·1세대 1주택·연령·보유기간·세부담 상한과 과세기준일을 별도로 확인해야 합니다.",
    },
    en: {
      answer:
        "This holding-tax comparison applies entered deductions, valuation ratio, rates and property-tax credit in sequence.",
      example:
        "Assessed value KRW 1,000,000,000, entered deduction KRW 900,000,000, 60% ratio, 0.5% rate, no progressive deduction and KRW 100,000 property-tax credit give a KRW 60,000,000 base, KRW 200,000 holding tax and KRW 40,000 rural tax: KRW 240,000 total.",
      check:
        "Example deductions and ratios are not universal. Check ownership count, single-home status, age/holding relief, burden caps and the assessment date.",
    },
    sources: ["holdingTax"],
    related: ["property-tax", "rental-yield"],
  },
  "value-added-tax": {
    ko: {
      answer:
        "부가세 포함 금액의 세액은 전체 금액에 세율을 바로 곱하지 않고 공급가액을 먼저 역산합니다.",
      example:
        "부가세 포함 110,000원·세율 10%이면 공급가액은 110,000 ÷ 1.1 = 100,000원, 부가세는 10,000원입니다. 별도 방식에서는 공급가액 100,000원에 10,000원을 더합니다.",
      check:
        "이 도구는 입력 요율에 따른 포함/별도 금액 분리입니다. 면세·영세율·간이과세 판정, 매입세액 공제와 실제 신고 납부액은 계산하지 않습니다.",
    },
    en: {
      answer:
        "For a VAT-inclusive amount, first recover the pre-tax supply amount rather than multiplying the full total by the tax rate.",
      example:
        "For a tax-inclusive KRW 110,000 at 10%, supply value is 110,000 ÷ 1.1 = KRW 100,000 and VAT is KRW 10,000. Exclusive mode adds KRW 10,000 to a KRW 100,000 supply value.",
      check:
        "This splits inclusive/exclusive amounts at the entered rate. It does not determine exemption, zero-rating, simplified-taxpayer status, input credits or actual VAT payable.",
    },
    sources: ["vat"],
    related: ["withholding-tax", "percentage"],
  },
  "comprehensive-income-tax": {
    ko: {
      answer:
        "수입에서 경비와 소득공제를 뺀 과세표준에 입력 세율·누진공제를 적용하고 세액공제를 차감합니다.",
      example:
        "수입 50,000,000원·경비 20,000,000원·소득공제 10,000,000원·입력 세율 15%·누진공제 1,260,000원·세액공제 240,000원·지방세율 10%(국세 기준)이면 국세 1,500,000원, 지방세 150,000원, 합계 1,650,000원입니다.",
      check:
        "누진 구간·경비 인정·세액공제와 분리과세 소득을 자동 판정하지 않습니다. 기납부 원천징수세를 차감한 최종 납부/환급액도 아닙니다.",
    },
    en: {
      answer:
        "Subtract expenses and income deductions, apply the entered rate/progressive deduction, then subtract tax credits.",
      example:
        "Income KRW 50,000,000 less expenses KRW 20,000,000 and deductions KRW 10,000,000 gives a KRW 20,000,000 base. Entering 15%, progressive deduction KRW 1,260,000, credit KRW 240,000 and local tax at 10% of national tax gives KRW 1,650,000 total.",
      check:
        "The tool does not select brackets, deductible expenses, credits or separately taxed income. This is not final settlement after prepaid withholding.",
    },
    sources: ["incomeTax"],
    related: ["freelancer-3-3-tax", "year-end-tax-refund"],
  },
  "withholding-tax": {
    ko: {
      answer:
        "입력 소득세율을 적용한 뒤 그 소득세액에 지방소득세율을 곱하는 원천징수 비교입니다.",
      example:
        "총 지급액 1,000,000원·제외액 0원·예시 소득세율 3%·지방세율 10%(소득세액 기준)이면 국세 30,000원, 지방세 3,000원, 원천징수 33,000원, 실수령 967,000원입니다.",
      check:
        "지방세율 10%를 총 지급액에 곱하는 방식이 아닙니다. 소득 종류·비과세·절사·간이세액표 대상 여부를 확인한 뒤 요율을 입력하세요.",
    },
    en: {
      answer:
        "Apply the entered national rate to payment, then apply the local rate to the resulting national tax.",
      example:
        "For KRW 1,000,000, no exclusion, an entered 3% national rate and local rate 10% of national tax, national tax is KRW 30,000, local tax KRW 3,000, total withholding KRW 33,000 and net payment KRW 967,000.",
      check:
        "The local 10% is not charged on gross payment. Verify income type, exemptions, rounding and whether a withholding table applies before choosing rates.",
    },
    sources: ["freelancer", "withholding"],
    related: ["freelancer-3-3-tax", "earned-income-withholding-tax"],
  },
  "freelancer-3-3-tax": {
    ko: {
      answer:
        "대상 사업소득의 지급액에 대한 3.3%는 최종 세금이 아니라 미리 납부하는 원천징수세입니다.",
      example:
        "원천징수 대상 지급액 1,000,000원·확인한 제외액 0원이면 소득세 30,000원과 지방소득세 3,000원, 합계 33,000원을 빼 실수령액은 967,000원입니다.",
      check:
        "일반 필요경비를 원천징수 제외액에 임의로 넣지 마세요. 실제 지급 대상·제외 근거를 확인하고, 경비·공제에 따른 최종 정산은 종합소득세 신고에서 확인합니다.",
    },
    en: {
      answer:
        "The 3.3% withholding on eligible South Korean business-income payments is prepaid tax, not final liability.",
      example:
        "For an eligible KRW 1,000,000 payment with no confirmed exclusion, national withholding KRW 30,000 plus local tax KRW 3,000 gives KRW 33,000 withheld and KRW 967,000 net.",
      check:
        "Do not deduct ordinary business expenses as withholding exclusions without a valid basis. Confirm payment eligibility and settle expenses/credits separately in the income-tax return.",
    },
    sources: ["freelancer"],
    related: ["comprehensive-income-tax", "withholding-tax"],
  },
  "pension-savings-tax-credit": {
    ko: {
      answer:
        "연금저축 납입 한도와 퇴직연금을 합친 공제 대상 한도를 구분해 소득세 공제를 계산합니다.",
      example:
        "총급여 50,000,000원·연금저축 6,000,000원·퇴직연금 추가 납입 3,000,000원이면 공제 대상은 9,000,000원, 적용률 15%의 소득세 공제 비교액은 1,350,000원입니다.",
      check:
        "결과는 지방세 효과를 더한 16.5% 환급액이 아닙니다. 실제 결정세액 한도·납입 인정·중도 인출과 ISA 전환 특례는 별도로 확인하세요.",
    },
    en: {
      answer:
        "Distinguish the pension-savings sublimit from the combined pension-account limit to estimate national income-tax credit.",
      example:
        "For salary KRW 50,000,000, pension-savings contributions KRW 6,000,000 and retirement-pension additions KRW 3,000,000, eligible contributions are KRW 9,000,000 and the modeled national income-tax credit at 15% is KRW 1,350,000.",
      check:
        "The result is not a refund calculated at 16.5% including local-tax effects. Actual tax liability, eligible deposits, withdrawals and ISA-transfer relief need separate checks.",
    },
    sources: ["pensionCredit"],
    related: ["retirement-pension-tax-credit", "year-end-tax-refund"],
  },
  "isa-tax-savings": {
    ko: {
      answer:
        "ISA 계좌의 입력 순이익에 비과세 한도와 초과분 세율을 적용해 일반 과세 비교액과의 차이를 구합니다.",
      example:
        "일반형·순이익 3,000,000원이면 모델의 비과세 2,000,000원 초과 1,000,000원에 9.9%를 적용해 ISA 세금 99,000원입니다. 같은 이익의 15.4% 비교액 462,000원과의 차이는 363,000원입니다.",
      check:
        "의무 유지·가입/계좌 유형·손익 통산·과세 대상 이익과 해지 조건을 확인하세요. 비교용 15.4%가 계좌 밖의 모든 투자 수익에 적용되는 것은 아닙니다.",
    },
    en: {
      answer:
        "Apply an ISA exemption and excess-profit tax rate to entered net profit, then compare ordinary withholding.",
      example:
        "For a general account and KRW 3,000,000 net profit, the model exempts KRW 2,000,000 and taxes the remaining KRW 1,000,000 at 9.9%: KRW 99,000. Ordinary 15.4% withholding on the same amount is KRW 462,000, a KRW 363,000 difference.",
      check:
        "Verify holding requirements, eligibility, account type, loss netting, taxable profit and closure conditions. The 15.4% comparison does not apply to every investment outside an ISA.",
    },
    sources: ["isa"],
    related: ["pension-savings-tax-credit", "investment-fee-impact"],
  },
  "retirement-pension-tax-credit": {
    ko: {
      answer:
        "이미 납입한 연금저축을 고려해 IRP 등 퇴직연금의 공제 가능 추가 납입 여력을 계산합니다.",
      example:
        "총급여 50,000,000원·연금저축 6,000,000원·퇴직연금 납입 1,000,000원이면 합산 한도 내 추가 납입 여력은 2,000,000원, 15% 소득세 추가 공제 비교액은 300,000원입니다.",
      check:
        "공제 한도와 계좌의 총 납입 한도는 다릅니다. 사용자 부담금·이연 퇴직금·계좌이체를 개인의 신규 공제 납입으로 중복 계산하지 마세요.",
    },
    en: {
      answer:
        "Account for pension-savings deposits when estimating remaining credit-eligible IRP/retirement-pension contribution capacity.",
      example:
        "Salary KRW 50,000,000, pension savings KRW 6,000,000 and retirement-pension deposits KRW 1,000,000 leave KRW 2,000,000 of additional eligible capacity. At 15%, the modeled extra national tax credit is KRW 300,000.",
      check:
        "Credit eligibility differs from total account deposit limits. Do not double-count employer contributions, deferred severance or account transfers as new personal credit-eligible deposits.",
    },
    sources: ["pensionCredit"],
    related: ["pension-savings-tax-credit", "retirement-pension"],
  },
  "year-end-tax-refund": {
    ko: {
      answer:
        "정산 차액은 결정세액에서 입력한 기납부세액 합계를 뺀 값입니다. 음수이면 환급, 양수이면 추가 납부입니다.",
      example:
        "결정 소득세 1,000,000원·기납부 소득세 1,200,000원·추가 기납부 항목 100,000원이면 정산 차액은 −300,000원, 환급 비교액은 300,000원입니다.",
      check:
        "결정세액을 총급여·소득공제액과 혼동하지 마세요. 같은 세목의 확정된 원천징수영수증 수치를 사용하며 지방세는 별도로 맞춰야 합니다.",
    },
    en: {
      answer:
        "Settlement is determined tax minus entered prepaid tax. A negative balance indicates a refund; a positive balance indicates additional payment.",
      example:
        "Determined income tax KRW 1,000,000 minus prepaid tax KRW 1,200,000 and another KRW 100,000 entered prepaid item gives settlement −KRW 300,000 and a modeled refund of KRW 300,000.",
      check:
        "Do not substitute salary or deductions for determined tax. Use confirmed figures for the same tax type from the withholding statement, and reconcile local tax separately.",
    },
    sources: ["withholding"],
    related: ["earned-income-withholding-tax", "pension-savings-tax-credit"],
  },
  "retirement-income-tax": {
    ko: {
      answer:
        "퇴직급여에서 근속연수공제를 뺀 뒤 환산급여 공제와 세율을 적용해 근속연수에 맞게 다시 환산합니다.",
      example:
        "과세 퇴직급여 100,000,000원·근속 20년·비과세 0원이면 근속공제 40,000,000원, 환산급여 36,000,000원, 환산 과표 11,200,000원입니다. 소득세 1,120,000원과 지방세 112,000원으로 합계 1,232,000원입니다.",
      check:
        "중간정산·이연 퇴직소득·과거 지급분·근속연수 법정 계산과 연금 수령에 따른 과세는 별도입니다. 실제 원천징수영수증과 대조하세요.",
    },
    en: {
      answer:
        "Apply service-year and converted-salary deductions, tax the converted base, then scale back to the service period.",
      example:
        "For retirement pay KRW 100,000,000, 20 service years and no tax-exempt amount, the service deduction is KRW 40,000,000, converted salary KRW 36,000,000 and converted tax base KRW 11,200,000. Income tax KRW 1,120,000 plus local tax KRW 112,000 totals KRW 1,232,000.",
      check:
        "Interim settlements, deferred income, prior payments, statutory service-year counting and pension payouts require separate treatment. Compare against the actual withholding statement.",
    },
    sources: ["retirementTax"],
    related: ["severance-pay", "retirement-pension"],
  },
  "earned-income-withholding-tax": {
    ko: {
      answer:
        "월 과세급여·공제 대상 가족·대상 자녀 수와 선택 징수 비율을 간이세액표에 적용합니다.",
      example:
        "내장 표 기준 월 과세급여 3,500,000원·본인 포함 가족 4명·대상 자녀 2명·징수 100%이면 기본 표 세액 49,340원에서 자녀 조정 45,830원을 빼 소득세 3,510원, 지방세 350원, 합계 3,860원입니다.",
      check:
        "가족 수에는 본인을 포함하고 자녀는 안내된 공제 연령·요건을 충족해야 합니다. 선택 징수 80/100/120%는 최종 세율이 아니며 회사 실제 징수액·연말 결정세액과 다를 수 있습니다.",
    },
    en: {
      answer:
        "Apply the withholding table to monthly taxable salary, dependants, eligible children and the selected withholding percentage.",
      example:
        "Using the embedded table, monthly taxable salary KRW 3,500,000, four eligible family members including the employee, two eligible children and 100% withholding give base tax KRW 49,340 less child adjustment KRW 45,830: income tax KRW 3,510 plus local tax KRW 350, total KRW 3,860.",
      check:
        "Count the employee among dependants and follow the stated child-age/eligibility rules. The 80/100/120% choice is a withholding percentage, not a final tax rate; actual payroll and year-end liability can differ.",
    },
    sources: ["withholding", "pensionCredit"],
    related: ["net-salary", "year-end-tax-refund"],
  },
};
