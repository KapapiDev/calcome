import { describe, expect, it } from "vitest";
import { calculateStakingReward } from "./calculate";

describe("calculateStakingReward", () => {
  it("calculates monthly compounded rewards for one year", () => {
    const result = calculateStakingReward({
      stakedAmount: 100,
      annualRewardRatePercent: 12,
      stakingDays: 365,
      compoundsPerYear: 12,
    });

    expect(result.finalBalance).toBeCloseTo(112.6825030132, 10);
    expect(result.rewardsEarned).toBeCloseTo(12.6825030132, 10);
    expect(result.periodYieldPercent).toBeCloseTo(12.6825030132, 10);
    expect(result.dailyAverageReward).toBeCloseTo(0.0347465836, 10);
  });

  it("supports simple rewards when compounding is disabled", () => {
    const result = calculateStakingReward({
      stakedAmount: 250,
      annualRewardRatePercent: 8,
      stakingDays: 180,
      compoundsPerYear: 0,
    });

    expect(result.rewardsEarned).toBeCloseTo(9.8630136986, 10);
    expect(result.finalBalance).toBeCloseTo(259.8630136986, 10);
  });

  it("rejects invalid staking periods and compounding frequencies", () => {
    expect(() =>
      calculateStakingReward({
        stakedAmount: 100,
        annualRewardRatePercent: 10,
        stakingDays: 0,
        compoundsPerYear: 12,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateStakingReward({
        stakedAmount: 100,
        annualRewardRatePercent: 10,
        stakingDays: 365,
        compoundsPerYear: 400,
      }),
    ).toThrow(RangeError);
  });
});
