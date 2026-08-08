import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ko",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/finance/compound-interest",
        destination: "/ko/finance/compound-interest",
        permanent: true,
      },
      {
        source: "/finance/cagr",
        destination: "/ko/finance/cagr",
        permanent: true,
      },
      {
        source: "/finance/savings",
        destination: "/ko/finance/savings",
        permanent: true,
      },
      {
        source: "/finance/deposit",
        destination: "/ko/finance/fixed-deposit",
        permanent: true,
      },
      {
        source: "/finance/loan",
        destination: "/ko/finance/loan",
        permanent: true,
      },
      {
        source: "/finance/dsr",
        destination: "/ko/finance/dsr",
        permanent: true,
      },
      {
        source: "/finance/dti",
        destination: "/ko/finance/dti",
        permanent: true,
      },
      {
        source: "/finance/ltv",
        destination: "/ko/finance/ltv",
        permanent: true,
      },
      {
        source: "/finance/loan-interest-comparison",
        destination: "/ko/finance/loan-interest-comparison",
        permanent: true,
      },
      {
        source: "/finance/loan-refinancing-savings",
        destination: "/ko/finance/loan-refinancing-savings",
        permanent: true,
      },
      {
        source: "/finance/balloon-payment",
        destination: "/ko/finance/balloon-payment",
        permanent: true,
      },
      {
        source: "/finance/mortgage-payment",
        destination: "/ko/finance/mortgage-payment",
        permanent: true,
      },
      {
        source: "/finance/jeonse-loan-interest",
        destination: "/ko/finance/jeonse-loan-interest",
        permanent: true,
      },
      {
        source: "/finance/credit-loan-interest",
        destination: "/ko/finance/credit-loan-interest",
        permanent: true,
      },
      {
        source: "/finance/early-loan-repayment-fee",
        destination: "/ko/finance/early-loan-repayment-fee",
        permanent: true,
      },
      {
        source: "/finance/real-estate-acquisition-tax",
        destination: "/ko/finance/real-estate-acquisition-tax",
        permanent: true,
      },
      {
        source: "/finance/capital-gains-tax",
        destination: "/ko/finance/capital-gains-tax",
        permanent: true,
      },
      {
        source: "/finance/gift-tax",
        destination: "/ko/finance/gift-tax",
        permanent: true,
      },
      {
        source: "/finance/inheritance-tax",
        destination: "/ko/finance/inheritance-tax",
        permanent: true,
      },
      {
        source: "/finance/property-tax",
        destination: "/ko/finance/property-tax",
        permanent: true,
      },
      {
        source: "/finance/comprehensive-real-estate-holding-tax",
        destination: "/ko/finance/comprehensive-real-estate-holding-tax",
        permanent: true,
      },
      {
        source: "/finance/value-added-tax",
        destination: "/ko/finance/value-added-tax",
        permanent: true,
      },
      {
        source: "/finance/comprehensive-income-tax",
        destination: "/ko/finance/comprehensive-income-tax",
        permanent: true,
      },
      {
        source: "/finance/withholding-tax",
        destination: "/ko/finance/withholding-tax",
        permanent: true,
      },
      {
        source: "/finance/freelancer-3-3-tax",
        destination: "/ko/finance/freelancer-3-3-tax",
        permanent: true,
      },
      {
        source: "/finance/loan-affordability",
        destination: "/ko/finance/loan-affordability",
        permanent: true,
      },
      {
        source: "/finance/debt-repayment-period",
        destination: "/ko/finance/debt-repayment-period",
        permanent: true,
      },
      {
        source: "/finance/credit-card-installment-interest",
        destination: "/ko/finance/credit-card-installment-interest",
        permanent: true,
      },
      {
        source: "/finance/rent-conversion-rate",
        destination: "/ko/finance/rent-conversion-rate",
        permanent: true,
      },
      {
        source: "/finance/jeonse-monthly-rent-conversion",
        destination: "/ko/finance/jeonse-monthly-rent-conversion",
        permanent: true,
      },
      {
        source: "/finance/real-estate-brokerage-fee",
        destination: "/ko/finance/real-estate-brokerage-fee",
        permanent: true,
      },
      {
        source: "/finance/stock-average-cost",
        destination: "/ko/finance/stock-average-cost",
        permanent: true,
      },
      {
        source: "/finance/stock-profit-loss",
        destination: "/ko/finance/stock-profit-loss",
        permanent: true,
      },
      {
        source: "/finance/dividend",
        destination: "/ko/finance/dividend",
        permanent: true,
      },
      {
        source: "/finance/dividend-yield",
        destination: "/ko/finance/dividend-yield",
        permanent: true,
      },
      {
        source: "/employment/net-salary",
        destination: "/ko/employment/net-salary",
        permanent: true,
      },
      {
        source: "/employment/severance-pay",
        destination: "/ko/employment/severance-pay",
        permanent: true,
      },
      {
        source: "/employment/unemployment-benefits",
        destination: "/ko/employment/unemployment-benefits",
        permanent: true,
      },
      {
        source: "/employment/weekly-holiday-pay",
        destination: "/ko/employment/weekly-holiday-pay",
        permanent: true,
      },
      {
        source: "/employment/annual-leave-allowance",
        destination: "/ko/employment/annual-leave-allowance",
        permanent: true,
      },
      {
        source: "/employment/hourly-wage",
        destination: "/ko/employment/hourly-wage",
        permanent: true,
      },
      {
        source: "/employment/social-insurance",
        destination: "/ko/employment/social-insurance",
        permanent: true,
      },
      {
        source: "/employment/average-wage",
        destination: "/ko/employment/average-wage",
        permanent: true,
      },
      {
        source: "/employment/salary-raise",
        destination: "/ko/employment/salary-raise",
        permanent: true,
      },
      {
        source: "/employment/gross-up-salary",
        destination: "/ko/employment/gross-up-salary",
        permanent: true,
      },
      {
        source: "/employment/salary-conversion",
        destination: "/ko/employment/salary-conversion",
        permanent: true,
      },
      {
        source: "/employment/overtime-pay",
        destination: "/ko/employment/overtime-pay",
        permanent: true,
      },
      {
        source: "/employment/night-work-pay",
        destination: "/ko/employment/night-work-pay",
        permanent: true,
      },
      {
        source: "/employment/holiday-work-pay",
        destination: "/ko/employment/holiday-work-pay",
        permanent: true,
      },
      {
        source: "/employment/minimum-wage",
        destination: "/ko/employment/minimum-wage",
        permanent: true,
      },
      {
        source: "/employment/retirement-pension",
        destination: "/ko/employment/retirement-pension",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
