export type StakingRewardInput = {
  stakedAmount: number;
  annualRewardRatePercent: number;
  stakingDays: number;
  compoundsPerYear: number;
};

export type StakingRewardResult = {
  finalBalance: number;
  rewardsEarned: number;
  periodYieldPercent: number;
  dailyAverageReward: number;
};

export function calculateStakingReward(
  input: StakingRewardInput,
): StakingRewardResult {
  const values = [
    input.stakedAmount,
    input.annualRewardRatePercent,
    input.stakingDays,
    input.compoundsPerYear,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.stakedAmount <= 0 || input.stakingDays <= 0) {
    throw new RangeError("stakedAmount and stakingDays must be greater than zero");
  }
  if (input.annualRewardRatePercent > 10_000) {
    throw new RangeError("annualRewardRatePercent is outside the supported range");
  }
  if (!Number.isInteger(input.compoundsPerYear) || input.compoundsPerYear > 365) {
    throw new RangeError("compoundsPerYear must be an integer from 0 to 365");
  }

  const annualRate = input.annualRewardRatePercent / 100;
  const years = input.stakingDays / 365;
  const finalBalance =
    input.compoundsPerYear === 0
      ? input.stakedAmount * (1 + annualRate * years)
      : input.stakedAmount *
        Math.pow(
          1 + annualRate / input.compoundsPerYear,
          input.compoundsPerYear * years,
        );
  const rewardsEarned = finalBalance - input.stakedAmount;
  const periodYieldPercent = (rewardsEarned / input.stakedAmount) * 100;
  const dailyAverageReward = rewardsEarned / input.stakingDays;

  return {
    finalBalance,
    rewardsEarned,
    periodYieldPercent,
    dailyAverageReward,
  };
}
