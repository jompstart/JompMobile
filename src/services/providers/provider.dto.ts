export interface CustomerServiceDetails {
  id: string;
  name: string;
  description: string;
  currencyCode: string;
  price: number;
  status: string;
  displayPicture: string;
}
export interface CalculateLoanDto {
  salary: number;
  loanAmount: number;
  durationInMonths: number;
}

export interface CalculateLoanResponse {
  approvedLoanAmount: number;
  durationInMonths: number;
  isApproved: boolean;
  message: string;
  monthlyRepayment: number;
}
