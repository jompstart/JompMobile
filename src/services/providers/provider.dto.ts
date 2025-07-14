import { MediaFile } from '../../interface/provider';

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

export interface ServicesCategories {
  name: string;
  description: string;
  duration: string;
  id: string;
  createAt: string;
  updateAt: string;
}

export interface PaymentOptionResponse {
  id: string;
  name: string;
  description: string;
}
[];

export interface OtherBillsDto {
  ServiceName: string; //
  ServiceCompletionStatus: string; // ui
  ServiceDate: string; //
  LoanAmountRequested: string; //
  ServiceProvider: string;
  GuarantorAddress: string; //
  GuarantorPhoneNumber: string; //
  CostOfService: string; //
  ServiceCategory: string;
  ReasonForLoan: string; //
  GuarantorName: string; //
  RecurringPaymentOptionId: string;
  CustomerId: string; //
  ServiceProviderContact: string;
  PaymentTypeId: string;
  RepaymentPlan: string; // ui
  ProofOfService: MediaFile; //
  ValidateId: MediaFile;
  BankStatement: MediaFile; //
  UtilityBill: MediaFile; //
  IdempotencyKey: string;
}

export interface PendingService {
  id: string;
  name: string;
  description: string;
}

export interface SingelServiceDetail {
  requestAmount: number;
  disturbmentAmount?: number;
  userContribution?: number;
  descriptions: string;
  fullName: string;
  houseRent: number;
  bankStatement: string;
  utilityBill: string;
  idCard: string;
  tenancyAgreement: string;
  landLordDetailsResponse: {
    landLordName: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    contactNumber: string;
  };
  rentEmployeerResponse: {
    occupaction: string;
    companyName: string;
    companyPhone: string;
    yearsOfWorkinWithThem: string;
    companyEmail: string;
    companyLocation: string;
  };
}

export interface AcceptLoandDto {
  amountDisbursed: number;
  contactaddress: string;
  customerContribution: number;
  interestRate: number;
  loanDuration: string;
  marginAmount: number;
  monthlyInstallment: number;
  serviceId: string;
  status: string;
}

export interface MakePaymentDto {
  amount: number;
  loanAgreement: boolean;
}

export interface MakePaymnetApiResponse {
  paymentUrl: string;
  reference: string;
}
