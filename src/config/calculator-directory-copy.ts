import { calculatorDirectoryCategories } from "./calculator-directory";

type EnglishDirectoryCategoryCopy = {
  name: string;
  description: string;
};

function assertEnglishDirectoryCategoryCopyCoverage(
  categoryIds: readonly string[],
  copy: Record<string, EnglishDirectoryCategoryCopy>,
) {
  const copyIds = Object.keys(copy);

  if (
    copyIds.length !== categoryIds.length ||
    copyIds.some((id, index) => id !== categoryIds[index])
  ) {
    throw new Error(
      "English directory category copy must exactly match calculator directory category order.",
    );
  }

  for (const categoryId of categoryIds) {
    const categoryCopy = copy[categoryId];
    if (
      !categoryCopy ||
      categoryCopy.name.trim().length === 0 ||
      categoryCopy.description.trim().length === 0
    ) {
      throw new Error(
        `Missing explicit English directory category copy for: ${categoryId}`,
      );
    }
  }
}

const englishDirectoryCategoryCopySource: Record<
  string,
  EnglishDirectoryCategoryCopy
> = {
  employment: {
    name: "Pay & Employment",
    description:
      "Pay, benefits, insurance, leave, and working-time calculators.",
  },
  loan: {
    name: "Loans & Credit",
    description:
      "Loan payments, affordability, refinancing, and credit calculators.",
  },
  tax: {
    name: "Tax",
    description: "Tax and filing calculators with clearly stated assumptions.",
  },
  housing: {
    name: "Housing & Property",
    description: "Housing, rent, property, and transaction-cost calculators.",
  },
  savings: {
    name: "Savings & Retirement",
    description: "Savings, deposits, goals, and retirement calculators.",
  },
  investment: {
    name: "Investing",
    description: "Returns, stocks, dividends, fees, and investing calculators.",
  },
  "business-life": {
    name: "Business & Everyday",
    description:
      "Practical calculators for business and everyday money decisions.",
  },
};

assertEnglishDirectoryCategoryCopyCoverage(
  calculatorDirectoryCategories.map((category) => category.id),
  englishDirectoryCategoryCopySource,
);

export const englishDirectoryCategoryCopy = englishDirectoryCategoryCopySource;
