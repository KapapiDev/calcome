export type StakingRewardLocale = "ko" | "en";

export const stakingRewardContent = {
  ko: {
    title: "스테이킹 보상 계산기",
    description:
      "스테이킹 수량, 연 보상률, 기간과 보상 재투자 빈도를 입력해 예상 보상 수량과 최종 보유량을 계산합니다.",
    category: "투자",
    input: "스테이킹 조건",
    stakedAmount: "스테이킹 수량",
    annualRewardRatePercent: "연 보상률 (%)",
    stakingDays: "스테이킹 기간 (일)",
    compoundsPerYear: "보상 재투자 빈도",
    simple: "재투자 안 함 (단리)",
    annual: "연 1회",
    monthly: "월 1회",
    weekly: "주 1회",
    daily: "매일",
    calculate: "보상 계산하기",
    reset: "초기화",
    result: "예상 스테이킹 보상",
    finalBalance: "예상 최종 수량",
    rewardsEarned: "예상 보상 수량",
    periodYieldPercent: "기간 수익률",
    dailyAverageReward: "일평균 예상 보상",
    error:
      "스테이킹 수량과 기간은 0보다 커야 하며, 연 보상률과 재투자 빈도를 올바르게 입력해 주세요.",
    note: "입력한 연 보상률이 기간 내 일정하다고 가정한 단순 추정입니다. 실제 보상률, 검증자 수수료, 언본딩 기간, 슬래싱, 토큰 가격과 네트워크 규칙은 반영하지 않습니다.",
    method:
      "재투자를 선택하지 않으면 연 보상률을 기간에 비례해 단리로 적용합니다. 재투자를 선택하면 연 보상률을 선택한 빈도로 나눠 복리로 계산하고, 최종 수량에서 초기 스테이킹 수량을 뺀 값을 예상 보상으로 표시합니다.",
    tips: "프로토콜마다 표시하는 APR·APY 방식과 보상 지급 주기가 다릅니다. 실제 서비스의 보상률 정의와 수수료, 락업·언본딩 조건을 확인한 뒤 비교용으로 사용하세요.",
    metaTitle: "스테이킹 보상 계산기 | 코인 복리·예상 보상",
  },
  en: {
    title: "Staking Reward Calculator",
    description:
      "Estimate staking rewards, ending token balance, and period yield from the amount staked, annual reward rate, staking period, and reward compounding frequency.",
    category: "Investing",
    input: "Staking assumptions",
    stakedAmount: "Amount staked",
    annualRewardRatePercent: "Annual reward rate (%)",
    stakingDays: "Staking period (days)",
    compoundsPerYear: "Reward compounding",
    simple: "No compounding (simple)",
    annual: "Annually",
    monthly: "Monthly",
    weekly: "Weekly",
    daily: "Daily",
    calculate: "Calculate rewards",
    reset: "Reset",
    result: "Estimated staking rewards",
    finalBalance: "Estimated ending balance",
    rewardsEarned: "Estimated rewards earned",
    periodYieldPercent: "Yield over period",
    dailyAverageReward: "Average reward per day",
    error:
      "Enter valid staking assumptions. Amount and staking days must be greater than zero.",
    note: "This is a simple estimate that assumes the entered annual reward rate stays constant. Validator fees, unbonding, slashing, token-price movement, and protocol-specific rules are excluded.",
    method:
      "Without compounding, the annual reward rate is prorated by the staking period. With compounding, the rate is divided by the selected frequency and compounded over the period. Estimated rewards equal ending token balance minus the initial staked amount.",
    tips: "Protocols may quote APR or APY differently and pay rewards on different schedules. Check the protocol's rate definition, fees, lockup, and unbonding rules before using the estimate for decisions.",
    metaTitle: "Staking Reward Calculator | Crypto Rewards & Compounding",
  },
} satisfies Record<StakingRewardLocale, Record<string, string>>;
