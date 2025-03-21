import { MediaFile } from '../../interface/provider';

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
}

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
};

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
