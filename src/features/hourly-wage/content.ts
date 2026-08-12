import type { HourlyWageLocale, PayUnit } from "./types";

export const hourlyWageContent = {
  ko: {
    title: "시급 계산기",
    metaTitle: "시급 계산기 - 월급·연봉 시간급 환산",
    description:
      "시급·일급·주급·월급·연봉을 시간급으로 환산하고 일·주·월·연 예상 급여와 2026년 최저임금 차이를 확인합니다.",
    category: "근로·급여 계산기",
    intro:
      "급여에 포함된 항목과 유급시간에 따라 실제 통상임금은 달라질 수 있으므로 근로계약 확인을 위한 비교값으로 사용하세요.",
    inputTitle: "급여 환산 조건",
    payAmount: "급여 금액",
    payUnit: "급여 단위",
    dailyHours: "1일 소정근로시간",
    weeklyHours: "주 소정근로시간",
    includePaidHoliday: "주 15시간 이상일 때 유급 주휴시간 포함",
    calculate: "시급 계산하기",
    reset: "초기화",
    validation:
      "급여와 1~8시간의 일 근로시간, 1~40시간의 주 근로시간을 입력하세요.",
    resultTitle: "환산 결과",
    hourlyWage: "환산 시급",
    monthlyPay: "월 환산액",
    annualPay: "연 환산액",
    dailyPay: "일 환산액",
    weeklyPay: "주 환산액",
    paidHours: "급여 환산 시간",
    minimumComparison: "2026 최저임금 비교",
    aboveMinimum: "입력 조건의 환산 시급은 2026년 최저임금 이상입니다.",
    belowMinimum:
      "입력 조건의 환산 시급은 2026년 최저임금보다 낮습니다. 산입 임금과 적용 제외 여부를 별도로 확인하세요.",
    empty:
      "급여 조건을 입력하면 동일한 기준의 시급·일급·주급·월급·연봉이 표시됩니다.",
    detailsTitle: "급여 단위별 환산",
    period: "단위",
    amount: "환산 금액",
    hours: "적용 시간",
    units: {
      hourly: "시급",
      daily: "일급",
      weekly: "주급",
      monthly: "월급",
      annual: "연봉",
    } satisfies Record<PayUnit, string>,
    formulaTitle: "계산 방법",
    formula: [
      "월급은 월 통상임금 산정 기준시간으로 나누어 시급으로 환산합니다. 주 40시간과 유급주휴 8시간이면 월 기준시간은 약 209시간입니다.",
      "주 15시간 이상이며 주휴시간을 포함하도록 선택한 경우 주 소정근로시간 ÷ 5를 유급시간으로 더하며 최대 8시간으로 제한합니다.",
      "일·주·월·연 환산액은 같은 환산 시급에 각 기간의 유급 기준시간을 곱한 비교값입니다.",
    ],
    cautionTitle: "확인할 사항",
    cautions: [
      "기본급 외 수당이 통상임금이나 최저임금 산입범위에 포함되는지는 지급 조건에 따라 달라질 수 있습니다.",
      "교대제, 감시·단속적 근로, 수습, 단시간근로 및 주휴일 적용 여부는 별도로 확인해야 합니다.",
      "세금과 사회보험은 차감하지 않은 세전 환산액이며 임금 지급액을 보장하지 않습니다.",
    ],
    faq: [
      [
        "월급을 시급으로 바꿀 때 왜 209시간을 쓰나요?",
        "주 40시간과 유급주휴 8시간을 합한 48시간에 연평균 주 수를 곱하고 12개월로 나눈 고시 기준입니다.",
      ],
      [
        "주 15시간 미만도 주휴시간을 더하나요?",
        "이 계산기는 주 15시간 미만이면 유급 주휴시간을 더하지 않습니다. 실제 적용은 근무형태와 개근 등 요건을 확인하세요.",
      ],
      [
        "환산 시급이 최저임금보다 낮으면 위반인가요?",
        "바로 단정할 수 없습니다. 최저임금 산입 임금, 적용 제외, 근로시간 기록을 확인한 뒤 관할 노동관서에 문의하세요.",
      ],
      [
        "세후 금액도 계산하나요?",
        "아닙니다. 이 계산기는 급여 단위를 같은 세전 시간급 기준으로 환산하며 세금과 사회보험은 반영하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Hourly Wage Calculator",
    metaTitle: "South Korea Hourly Wage Calculator - KRW Pay Conversion",
    description:
      "Convert hourly, daily, weekly, monthly, or annual pay in KRW into a comparable hourly wage under South Korean wage-hour assumptions and compare it with the 2026 South Korea minimum wage.",
    category: "Employment calculator",
    intro:
      "This calculator applies to South Korea and expects every pay amount in KRW. Use the result as a comparison; the legal ordinary-wage base depends on which pay items and paid hours apply to the employment contract.",
    inputTitle: "South Korea pay conversion settings (KRW)",
    payAmount: "Pay amount (KRW)",
    payUnit: "Pay period",
    dailyHours: "Scheduled daily hours",
    weeklyHours: "Scheduled weekly hours",
    includePaidHoliday: "Include paid weekly-holiday hours at 15+ weekly hours",
    calculate: "Calculate hourly wage",
    reset: "Reset",
    validation: "Enter pay in KRW, 1–8 daily hours, and 1–40 weekly hours.",
    resultTitle: "South Korea converted results (KRW)",
    hourlyWage: "Converted hourly wage (KRW)",
    monthlyPay: "Monthly equivalent (KRW)",
    annualPay: "Annual equivalent (KRW)",
    dailyPay: "Daily equivalent (KRW)",
    weeklyPay: "Weekly equivalent (KRW)",
    paidHours: "Conversion hours",
    minimumComparison: "2026 South Korea minimum-wage comparison (KRW)",
    aboveMinimum:
      "The converted hourly wage is at or above the 2026 South Korea minimum wage in KRW.",
    belowMinimum:
      "The converted hourly wage is below the 2026 South Korea minimum wage in KRW. Confirm included wages and any applicable exception separately.",
    empty:
      "Enter South Korea pay conditions in KRW to compare hourly, daily, weekly, monthly, and annual equivalents on one basis.",
    detailsTitle: "South Korea pay equivalents (KRW)",
    period: "Period",
    amount: "Equivalent pay (KRW)",
    hours: "Applied hours",
    units: {
      hourly: "Hourly",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      annual: "Annual",
    } satisfies Record<PayUnit, string>,
    formulaTitle: "How it is calculated",
    formula: [
      "Monthly pay in KRW is divided by monthly ordinary-wage hours. A 40-hour week plus eight paid weekly-holiday hours corresponds to about 209 monthly hours under the South Korean wage-hour basis used here.",
      "When selected and weekly hours are at least 15, paid holiday hours equal weekly hours divided by five, capped at eight.",
      "Daily, weekly, monthly, and annual equivalents multiply the same converted hourly wage by the applicable paid hours. All monetary results remain in KRW; no foreign-exchange conversion is performed.",
    ],
    cautionTitle: "Important cautions",
    cautions: [
      "Whether allowances count toward ordinary wage or minimum wage under South Korean rules depends on their payment conditions.",
      "Shift work, approved exceptions, probation, short-hour work, and paid-holiday eligibility require separate review.",
      "Values are pre-tax KRW comparisons and do not guarantee wages payable under a contract.",
    ],
    faq: [
      [
        "Why are 209 hours used for a monthly wage?",
        "It is the South Korean conversion used here for a 40-hour week plus eight paid weekly-holiday hours, averaged across a year and divided by 12.",
      ],
      [
        "Are paid holiday hours added below 15 weekly hours?",
        "No. This calculator adds none below 15 hours. Actual eligibility also depends on attendance and work arrangements.",
      ],
      [
        "Does a result below minimum wage prove a violation?",
        "No. Confirm includable wage items, any exception, and recorded hours with the competent South Korean labor office.",
      ],
      [
        "Are taxes deducted?",
        "No. This calculator compares gross KRW pay units and does not deduct taxes or social insurance.",
      ],
    ] as const,
  },
} as const;

export type HourlyWageContent = (typeof hourlyWageContent)[HourlyWageLocale];
