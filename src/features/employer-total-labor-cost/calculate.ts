export type EmploymentTrainingRate = 0.25 | 0.45 | 0.65 | 0.85;

export type EmployerTotalLaborCostInput = {
  monthlyWage: number;
  employmentTrainingRate: EmploymentTrainingRate;
  industrialAccidentRate: number;
  includeRetirementProvision: boolean;
};

export type EmployerTotalLaborCostResult = {
  monthlyWage: number;
  nationalPension: number;
  healthAndLongTermCare: number;
  employmentInsurance: number;
  industrialAccidentInsurance: number;
  retirementProvision: number;
  monthlyEmployerOnCost: number;
  monthlyTotalLaborCost: number;
  annualTotalLaborCost: number;
  employerOnCostPercent: number;
};

export const EMPLOYER_RATES_2026 = {
  nationalPension: 4.75,
  healthAndLongTermCare: 4.0674,
  unemployment: 0.9,
} as const;

export function calculateEmployerTotalLaborCost(
  input: EmployerTotalLaborCostInput,
): EmployerTotalLaborCostResult {
  if (
    !Number.isFinite(input.monthlyWage) ||
    input.monthlyWage <= 0 ||
    ![0.25, 0.45, 0.65, 0.85].includes(input.employmentTrainingRate) ||
    !Number.isFinite(input.industrialAccidentRate) ||
    input.industrialAccidentRate < 0 ||
    input.industrialAccidentRate > 20
  ) {
    throw new RangeError("Invalid employer total labor cost input");
  }

  const nationalPension =
    input.monthlyWage * (EMPLOYER_RATES_2026.nationalPension / 100);
  const healthAndLongTermCare =
    input.monthlyWage * (EMPLOYER_RATES_2026.healthAndLongTermCare / 100);
  const employmentInsurance =
    input.monthlyWage *
    ((EMPLOYER_RATES_2026.unemployment + input.employmentTrainingRate) / 100);
  const industrialAccidentInsurance =
    input.monthlyWage * (input.industrialAccidentRate / 100);
  const retirementProvision = input.includeRetirementProvision
    ? input.monthlyWage / 12
    : 0;

  const monthlyEmployerOnCost =
    nationalPension +
    healthAndLongTermCare +
    employmentInsurance +
    industrialAccidentInsurance +
    retirementProvision;
  const monthlyTotalLaborCost = input.monthlyWage + monthlyEmployerOnCost;

  return {
    monthlyWage: input.monthlyWage,
    nationalPension,
    healthAndLongTermCare,
    employmentInsurance,
    industrialAccidentInsurance,
    retirementProvision,
    monthlyEmployerOnCost,
    monthlyTotalLaborCost,
    annualTotalLaborCost: monthlyTotalLaborCost * 12,
    employerOnCostPercent: (monthlyEmployerOnCost / input.monthlyWage) * 100,
  };
}
