export interface CreateSavingsRequestDto {
  customerId: string;
  goalName: string;
  targetAmount: string;
  monthlyContribution: string;
  status: string;
  savingsType: string;
  savingCategory: string;
  savingSource: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
  preferredTime: string;
  savingsTime: string;
  targetBreakBeforeEndDate: boolean;
  autoSave: boolean;
  autoWithdrawal: boolean;
  interestTagentSaving: boolean;
  cardDetails: {
    cardNumber: '';
    expiryMonth: '';
    expiry_year: '';
    cvv: '';
  };
}

export type GetSavingsCategoryResponseDto = {
  id: string;
  name: string;
}[];
export type GetSavingsSourceResponseDto = {
  id: string;
  name: string;
}[];

export interface SavingsTypeDto {
  id: string;
  name: string;
  interestRate: number;
}

export interface ReInvestSavingsRequestDto {
  goalName: string;
}

export interface SavingsResponseDto {
  id: string;
  goalName: string;
  targetAmount: number;
  savedAmount: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  isAchieved: boolean;
  createdAt: Date;
  status: string;
}

export interface SingleSavingsResponseDto {
  goalName: string;
  targetAmount: number;
  preferedSavingAmount: number;
  startDate: Date;
  endDate: Date;
  nextSavingDate: string;
  status: string;
  duration: number;
  savingsFrequency: string;
  savingType: string;
  interest: number;
  savingMethod: string;
  autoWithDraw: boolean;
  autoSave: boolean;
}
