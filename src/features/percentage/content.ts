export type PercentageLocale = "ko" | "en";

export const percentageContent = {
  ko: {
    title: "퍼센트 계산기",
    description:
      "어떤 수의 몇 퍼센트인지, 한 값이 전체의 몇 퍼센트인지, 이전 값에서 새 값으로 얼마나 증감했는지 한 번에 계산합니다.",
    category: "사업·생활",
    input: "퍼센트 계산 입력",
    percentOfTitle: "값의 퍼센트 구하기",
    percent: "퍼센트",
    baseValue: "기준값",
    partOfWholeTitle: "전체에서 차지하는 비율",
    partValue: "부분값",
    wholeValue: "전체값",
    changeTitle: "퍼센트 증감률",
    oldValue: "이전 값",
    newValue: "새 값",
    calculate: "퍼센트 계산하기",
    reset: "초기화",
    result: "계산 결과",
    percentOfValue: "기준값의 해당 퍼센트",
    partAsPercent: "부분값이 전체에서 차지하는 비율",
    percentChange: "이전 값 대비 증감률",
    error:
      "모든 값에 유효한 숫자를 입력하고 전체값과 이전 값은 0이 아니어야 합니다.",
    note: "증감률은 (새 값 - 이전 값) ÷ |이전 값| × 100으로 계산합니다. 이전 값이 0이면 퍼센트 변화율을 정의할 수 없습니다.",
    method:
      "퍼센트 값은 기준값 × 퍼센트 ÷ 100, 구성비는 부분값 ÷ 전체값 × 100, 증감률은 변화량을 이전 값의 절댓값으로 나눈 뒤 100을 곱해 계산합니다.",
    tips: "할인율, 전환율, 점유율, 성장률처럼 비율을 빠르게 비교할 때 사용할 수 있습니다. 금액 단위는 따로 가정하지 않으므로 숫자 단위를 서로 맞춰 입력하세요.",
    metaTitle: "퍼센트 계산기 | 비율·구성비·증감률 계산",
  },
  en: {
    title: "Percentage Calculator",
    description:
      "Calculate a percentage of a value, find what percentage one number is of another, and measure percentage increase or decrease in one place.",
    category: "Business & Everyday",
    input: "Percentage inputs",
    percentOfTitle: "Find a percentage of a value",
    percent: "Percentage",
    baseValue: "Base value",
    partOfWholeTitle: "Find what percent one value is of another",
    partValue: "Part value",
    wholeValue: "Whole value",
    changeTitle: "Percentage change",
    oldValue: "Old value",
    newValue: "New value",
    calculate: "Calculate percentages",
    reset: "Reset",
    result: "Results",
    percentOfValue: "Percentage of the base value",
    partAsPercent: "Part as a percentage of whole",
    percentChange: "Percentage change from old value",
    error:
      "Enter valid numbers for every field. Whole value and old value must not be zero.",
    note: "Percentage change uses (new value - old value) ÷ |old value| × 100. A change rate is undefined when the old value is zero.",
    method:
      "Percentage-of-value multiplies the base by the percentage divided by 100. Part-of-whole divides the part by the whole and multiplies by 100. Percentage change divides the difference by the absolute old value and multiplies by 100.",
    tips: "Use it for discounts, conversion rates, market shares, growth, or any other ratio. The calculator is unit-neutral, so keep the units of compared numbers consistent.",
    metaTitle: "Percentage Calculator | Percent, Ratio & Percentage Change",
  },
} satisfies Record<PercentageLocale, Record<string, string>>;
