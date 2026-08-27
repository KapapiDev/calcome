export type PortfolioRebalancingAsset = {
  currentValue: number;
  targetWeightPercent: number;
};

export type PortfolioRebalancingInput = {
  assets: PortfolioRebalancingAsset[];
};

export type PortfolioRebalancingAssetResult = PortfolioRebalancingAsset & {
  currentWeightPercent: number;
  targetValue: number;
  tradeAmount: number;
};

export type PortfolioRebalancingResult = {
  totalPortfolioValue: number;
  totalBuyAmount: number;
  totalSellAmount: number;
  turnoverAmount: number;
  turnoverPercent: number;
  assets: PortfolioRebalancingAssetResult[];
};

export function calculatePortfolioRebalancing(
  input: PortfolioRebalancingInput,
): PortfolioRebalancingResult {
  if (input.assets.length < 2 || input.assets.length > 8) {
    throw new RangeError("assets must contain between 2 and 8 entries");
  }

  for (const asset of input.assets) {
    if (!Number.isFinite(asset.currentValue) || asset.currentValue < 0) {
      throw new RangeError("currentValue must be finite and zero or greater");
    }
    if (
      !Number.isFinite(asset.targetWeightPercent) ||
      asset.targetWeightPercent < 0 ||
      asset.targetWeightPercent > 100
    ) {
      throw new RangeError("targetWeightPercent must be between 0 and 100");
    }
  }

  const totalPortfolioValue = input.assets.reduce(
    (sum, asset) => sum + asset.currentValue,
    0,
  );
  if (totalPortfolioValue <= 0) {
    throw new RangeError("total portfolio value must be greater than zero");
  }

  const targetWeightTotal = input.assets.reduce(
    (sum, asset) => sum + asset.targetWeightPercent,
    0,
  );
  if (Math.abs(targetWeightTotal - 100) > 1e-8) {
    throw new RangeError("target weights must sum to 100 percent");
  }

  const assets = input.assets.map((asset) => {
    const targetValue =
      totalPortfolioValue * (asset.targetWeightPercent / 100);
    return {
      ...asset,
      currentWeightPercent: (asset.currentValue / totalPortfolioValue) * 100,
      targetValue,
      tradeAmount: targetValue - asset.currentValue,
    };
  });

  const totalBuyAmount = assets.reduce(
    (sum, asset) => sum + Math.max(0, asset.tradeAmount),
    0,
  );
  const totalSellAmount = assets.reduce(
    (sum, asset) => sum + Math.max(0, -asset.tradeAmount),
    0,
  );
  const turnoverAmount =
    assets.reduce((sum, asset) => sum + Math.abs(asset.tradeAmount), 0) / 2;

  return {
    totalPortfolioValue,
    totalBuyAmount,
    totalSellAmount,
    turnoverAmount,
    turnoverPercent: (turnoverAmount / totalPortfolioValue) * 100,
    assets,
  };
}
