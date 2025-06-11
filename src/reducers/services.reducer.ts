import { MediaFile } from '../interface/provider';
import { OtherBillsDto } from '../services/providers/provider.dto';
export interface HouseRentLoanFormState {
  rentAmount: string;
  requestedAmount: string;
  landlordName: string;
  landlordAccountName: string;
  landlordAccountNumber: string;
  landlordBankName: string;
  landlordContactNumber: string;
  occupation: string;
  companyName: string;
  companyPhone: string;
  yearsInCompany: string;
  companyEmail: string;
  companyAddress: string;
  id: MediaFile;
  utilityBill: MediaFile;
  bankStatement: MediaFile;
  tenancyAgreement: MediaFile;
  payMentSlip: MediaFile;
  bankStatement2: MediaFile;
  bankStatement3: MediaFile;
  IdempotencyKey: string;
}

export type OtherBillsFormState = Omit<OtherBillsDto, 'CustomerId'>;

export const otherBillsInitialState: OtherBillsFormState = {
  ServiceName: '',
  ServiceCompletionStatus: '',
  ServiceDate: '',
  LoanAmountRequested: '',
  ServiceProvider: '',
  GuarantorAddress: '',
  GuarantorPhoneNumber: '',
  CostOfService: '',
  ServiceCategory: '',
  ReasonForLoan: '',
  GuarantorName: '',
  RecurringPaymentOptionId: '',
  ServiceProviderContact: '',
  PaymentTypeId: '',
  RepaymentPlan: '',
  ProofOfService: {
    uri: '',
    type: '',
    name: '',
  },
  ValidateId: {
    uri: '',
    type: '',
    name: '',
  },
  BankStatement: {
    uri: '',
    type: '',
    name: '',
  },
  UtilityBill: {
    uri: '',
    type: '',
    name: '',
  },
  IdempotencyKey: '',
};

export const rentLoanInitailState: HouseRentLoanFormState = {
  rentAmount: '',
  requestedAmount: '',
  landlordName: '',
  landlordAccountName: '',
  landlordAccountNumber: '',
  landlordBankName: '',
  landlordContactNumber: '',
  occupation: '',
  companyName: '',
  companyPhone: '',
  yearsInCompany: '',
  companyEmail: '',
  companyAddress: '',
  id: {
    uri: '',
    type: '',
    name: '',
  },
  utilityBill: {
    uri: '',
    type: '',
    name: '',
  },
  bankStatement: {
    uri: '',
    type: '',
    name: '',
  },
  tenancyAgreement: {
    uri: '',
    type: '',
    name: '',
  },
  payMentSlip: {
    uri: '',
    type: '',
    name: '',
  },
  bankStatement2: {
    uri: '',
    type: '',
    name: '',
  },
  bankStatement3: {
    uri: '',
    type: '',
    name: '',
  },
  IdempotencyKey: '',
};

export type OtherBillsAction =
  | { type: 'SET_SERVICE_NAME'; payload: string }
  | { type: 'SET_SERVICE_COMPLETION_STATUS'; payload: string }
  | { type: 'SET_SERVICE_DATE'; payload: string }
  | { type: 'SET_LOAN_AMOUNT_REQUESTED'; payload: string }
  | { type: 'SET_SERVICE_PROVIDER'; payload: string }
  | { type: 'SET_GUARANTOR_ADDRESS'; payload: string }
  | { type: 'SET_GUARANTOR_PHONE_NUMBER'; payload: string }
  | { type: 'SET_COST_OF_SERVICE'; payload: string }
  | { type: 'SET_SERVICE_CATEGORY'; payload: string }
  | { type: 'SET_REASON_FOR_LOAN'; payload: string }
  | { type: 'SET_GUARANTOR_NAME'; payload: string }
  | { type: 'SET_RECURRING_PAYMENT_OPTION_ID'; payload: string }
  | { type: 'SET_SERVICE_PROVIDER_CONTACT'; payload: string }
  | { type: 'SET_PAYMENT_TYPE_ID'; payload: string }
  | { type: 'SET_REPAYMENT_PLAN'; payload: string }
  | { type: 'SET_PROOF_OF_SERVICE'; payload: MediaFile }
  | { type: 'SET_VALIDATE_ID'; payload: MediaFile }
  | { type: 'SET_BANK_STATEMENT'; payload: MediaFile }
  | { type: 'SET_UTILITY_BILL'; payload: MediaFile };
export type FormAction =
  | { type: 'SET_RENT_AMOUNT'; payload: string }
  | { type: 'SET_REQUESTED_AMOUNT'; payload: string }
  | { type: 'SET_LANDLORD_NAME'; payload: string }
  | { type: 'SET_LANDLORD_ACCOUNT_NAME'; payload: string }
  | { type: 'SET_LANDLORD_ACCOUNT_NUMBER'; payload: string }
  | { type: 'SET_LANDLORD_BANK_NAME'; payload: string }
  | { type: 'SET_LANDLORD_CONTACT_NUMBER'; payload: string }
  | { type: 'SET_OCCUPATION'; payload: string }
  | { type: 'SET_COMPANY_NAME'; payload: string }
  | { type: 'SET_COMPANY_PHONE'; payload: string }
  | { type: 'SET_YEARS_IN_COMPANY'; payload: string }
  | { type: 'SET_COMPANY_EMAIL'; payload: string }
  | { type: 'SET_COMPANY_ADDRESS'; payload: string }
  | { type: 'SET_ID'; payload: MediaFile }
  | { type: 'SET_UTILITY_BILL'; payload: MediaFile }
  | { type: 'SET_BANK_STATEMENT'; payload: MediaFile }
  | { type: 'SET_TENANCY_AGREEMENT'; payload: MediaFile }
  | { type: 'SET_PAYMENT_SLIP'; payload: MediaFile }
  | { type: 'SET_BANK_STATEMENT2'; payload: MediaFile }
  | { type: 'SET_BANK_STATEMENT3'; payload: MediaFile };

export const rentLoanFormReducer = (
  state: HouseRentLoanFormState,
  action: FormAction
): HouseRentLoanFormState => {
  switch (action.type) {
    case 'SET_RENT_AMOUNT':
      return { ...state, rentAmount: action.payload };
    case 'SET_REQUESTED_AMOUNT':
      return { ...state, requestedAmount: action.payload };
    case 'SET_LANDLORD_NAME':
      return { ...state, landlordName: action.payload };
    case 'SET_LANDLORD_ACCOUNT_NAME':
      return { ...state, landlordAccountName: action.payload };
    case 'SET_LANDLORD_ACCOUNT_NUMBER':
      return { ...state, landlordAccountNumber: action.payload };
    case 'SET_LANDLORD_BANK_NAME':
      return { ...state, landlordBankName: action.payload };
    case 'SET_LANDLORD_CONTACT_NUMBER':
      return { ...state, landlordContactNumber: action.payload };
    case 'SET_OCCUPATION':
      return { ...state, occupation: action.payload };
    case 'SET_COMPANY_NAME':
      return { ...state, companyName: action.payload };
    case 'SET_COMPANY_PHONE':
      return { ...state, companyPhone: action.payload };
    case 'SET_YEARS_IN_COMPANY':
      return { ...state, yearsInCompany: action.payload };
    case 'SET_COMPANY_EMAIL':
      return { ...state, companyEmail: action.payload };
    case 'SET_COMPANY_ADDRESS':
      return { ...state, companyAddress: action.payload };
    case 'SET_ID':
      return { ...state, id: action.payload };
    case 'SET_UTILITY_BILL':
      return { ...state, utilityBill: action.payload };
    case 'SET_BANK_STATEMENT':
      return { ...state, bankStatement: action.payload };
    case 'SET_TENANCY_AGREEMENT':
      return { ...state, tenancyAgreement: action.payload };
    case 'SET_PAYMENT_SLIP':
      return { ...state, payMentSlip: action.payload };
    case 'SET_BANK_STATEMENT2':
      return { ...state, bankStatement2: action.payload };
    case 'SET_BANK_STATEMENT3':
      return { ...state, bankStatement3: action.payload };

    default:
      return state;
  }
};

export const otherBillsFormReducer = (
  state: OtherBillsFormState,
  action: OtherBillsAction
): OtherBillsFormState => {
  switch (action.type) {
    case 'SET_SERVICE_NAME':
      return { ...state, ServiceName: action.payload };
    case 'SET_SERVICE_COMPLETION_STATUS':
      return { ...state, ServiceCompletionStatus: action.payload };
    case 'SET_SERVICE_DATE':
      return { ...state, ServiceDate: action.payload };
    case 'SET_LOAN_AMOUNT_REQUESTED':
      return { ...state, LoanAmountRequested: action.payload };
    case 'SET_SERVICE_PROVIDER':
      return { ...state, ServiceProvider: action.payload };
    case 'SET_GUARANTOR_ADDRESS':
      return { ...state, GuarantorAddress: action.payload };
    case 'SET_GUARANTOR_PHONE_NUMBER':
      return { ...state, GuarantorPhoneNumber: action.payload };
    case 'SET_COST_OF_SERVICE':
      return { ...state, CostOfService: action.payload };
    case 'SET_SERVICE_CATEGORY':
      return { ...state, ServiceCategory: action.payload };
    case 'SET_REASON_FOR_LOAN':
      return { ...state, ReasonForLoan: action.payload };
    case 'SET_GUARANTOR_NAME':
      return { ...state, GuarantorName: action.payload };
    case 'SET_RECURRING_PAYMENT_OPTION_ID':
      return { ...state, RecurringPaymentOptionId: action.payload };
    case 'SET_SERVICE_PROVIDER_CONTACT':
      return { ...state, ServiceProviderContact: action.payload };
    case 'SET_PAYMENT_TYPE_ID':
      return { ...state, PaymentTypeId: action.payload };
    case 'SET_REPAYMENT_PLAN':
      return { ...state, RepaymentPlan: action.payload };
    case 'SET_PROOF_OF_SERVICE':
      return { ...state, ProofOfService: action.payload };
    case 'SET_VALIDATE_ID':
      return { ...state, ValidateId: action.payload };
    case 'SET_BANK_STATEMENT':
      return { ...state, BankStatement: action.payload };
    case 'SET_UTILITY_BILL':
      return { ...state, UtilityBill: action.payload };

    default:
      return state;
  }
};
