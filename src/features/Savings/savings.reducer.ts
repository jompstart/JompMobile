import { MediaFile } from '../../interface/provider';

export interface CreateSavingsFormState {
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
  cardDetails: CardDetails;
  duration: Date | null;
  durationString: string;
  interestRate: string | null;
}
export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiry_year: string;
  cvv: string;
}

export const createSavingsInitialState: CreateSavingsFormState = {
  goalName: '',
  targetAmount: '',
  monthlyContribution: '',
  status: '',
  savingsType: '',
  savingCategory: '',
  savingSource: '',
  frequency: '',
  startDate: new Date(),
  endDate: new Date(),
  preferredTime: '',
  savingsTime: '',
  targetBreakBeforeEndDate: false,
  autoSave: false,
  autoWithdrawal: false,
  interestTagentSaving: false,
  cardDetails: {
    cardNumber: '',
    expiryMonth: '',
    expiry_year: '',
    cvv: '',
  },
  duration: null,
  durationString: '',
  interestRate: null,
};

export type FormAction =
  | { type: 'SET_GOAL_NAME'; payload: string }
  | { type: 'SET_TARGET_AMOUNT'; payload: string }
  | { type: 'SET_MONTHLY_CONTRIBUTION'; payload: string }
  | { type: 'SET_STATUS'; payload: string }
  | { type: 'SET_SAVINGS_TYPE'; payload: string }
  | { type: 'SET_SAVING_CATEGORY'; payload: string }
  | { type: 'SET_SAVING_SOURCE'; payload: string }
  | { type: 'SET_FREQUENCY'; payload: string }
  | { type: 'SET_START_DATE'; payload: Date }
  | { type: 'SET_END_DATE'; payload: Date }
  | { type: 'SET_PREFERRED_TIME'; payload: string }
  | { type: 'SET_SAVINGS_TIME'; payload: string }
  | { type: 'SET_TARGET_BREAK_BEFORE_END_DATE'; payload: boolean }
  | { type: 'SET_AUTO_SAVE'; payload: boolean }
  | { type: 'SET_AUTO_WITHDRAWAL'; payload: boolean }
  | { type: 'SET_INTEREST_TAGENT_SAVING'; payload: boolean }
  | { type: 'SET_CARD_DETAILS'; payload: CardDetails }
  | { type: 'SET_DURATION'; payload: Date }
  | { type: 'SET_INTEREST_RATE'; payload: string }
  | { type: 'SET_DURATION_STRING'; payload: string };

export const savingsFormReducer = (
  state: CreateSavingsFormState,
  action: FormAction
): CreateSavingsFormState => {
  switch (action.type) {
    case 'SET_GOAL_NAME':
      return { ...state, goalName: action.payload };
    case 'SET_TARGET_AMOUNT':
      return { ...state, targetAmount: action.payload };
    case 'SET_MONTHLY_CONTRIBUTION':
      return { ...state, monthlyContribution: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_SAVINGS_TYPE':
      return { ...state, savingsType: action.payload };
    case 'SET_SAVING_CATEGORY':
      return { ...state, savingCategory: action.payload };
    case 'SET_SAVING_SOURCE':
      return { ...state, savingSource: action.payload };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_PREFERRED_TIME':
      return { ...state, preferredTime: action.payload };
    case 'SET_SAVINGS_TIME':
      return { ...state, savingsTime: action.payload };
    case 'SET_TARGET_BREAK_BEFORE_END_DATE':
      return { ...state, targetBreakBeforeEndDate: action.payload };
    case 'SET_AUTO_SAVE':
      return { ...state, autoSave: action.payload };
    case 'SET_AUTO_WITHDRAWAL':
      return { ...state, autoWithdrawal: action.payload };
    case 'SET_INTEREST_TAGENT_SAVING':
      return { ...state, interestTagentSaving: action.payload };
    case 'SET_CARD_DETAILS':
      return {
        ...state,
        cardDetails: { ...state.cardDetails, ...action.payload },
      };

    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_DURATION_STRING':
      return { ...state, durationString: action.payload };
    case 'SET_INTEREST_RATE':
      return { ...state, interestRate: action.payload };
    default:
      return state;
  }
};
