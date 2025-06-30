import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { UserAccountPreference } from '../models/user';
import { CreateSavingsFormState } from '../features/Savings/savings.reducer';
import { loanType } from './loanCalculator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  SplashScreen: undefined;
  Notification: {
    token: string;
    CustomerRequest: string;
    ApprovedAmount: string;
    DisbursedAmount: string;
    ServiceCategory: string;
    UserContribution: string;
    ServiceId: string;
    action: string;
  };
  Report: undefined;
  OnboardingScreen: undefined;
  SignUp: {
    accountPreference: UserAccountPreference;
  };
  AccountPreference: undefined;
  Login: undefined;
  VerifyBvn: undefined;
  VerifyNin: undefined;
  BottomtabNavigation: undefined;
  Profile: undefined;
  AddBank: undefined;
  WithdrawFunds: undefined;
  GuardianDetails: undefined;
  SelfDetails: undefined;
  LoanPage: undefined;
  SchoolFees: undefined;
  Transport: undefined;
  LoanCalculatorForm: {
    loanType: loanType;
  };
  UserCreated: undefined;
  PayServices: undefined;
  SavingsGoal: undefined;
  CreateSavings: CreateSavingsFormState;
  SavingsTransactions: undefined;
  SavingsDetails: {
    goalId: string;
  };
  NavigationDrawer: undefined;
  TransportDetails: undefined;
  PreviewRequest: undefined;
  OtherServices: undefined;
  AddCard: undefined;
  FundWallet: undefined;
  Verification: undefined;
  HouseRentService: undefined;
  SuccessPage?: {
    title?: string;
    message?: string;
  };
  CreatedServices: undefined;
  Support: undefined;
  CustomerSupport: undefined;
  Faqs: undefined;
  Request: undefined;
  AcceptService: undefined;
};

type SignUpScreenParams = {
  [SignUpScreenProps: string]: {
    accountPreference: UserAccountPreference;
  };
};

type SavingsDetailsParams = {
  [SavingsDetails: string]: {
    goalId: string;
  };
};

type SuccessPageParams = {
  [SuccessPage: string]: {
    title?: string;
    message?: string;
  };
};
type LoanCalculatorFormParams = {
  [LoanCalculatorForm: string]: {
    loanType: loanType;
  };
};
type CreateSavingsParams = {
  [CreateSavings: string]: CreateSavingsFormState;
};

type NotificationParams = {
  [Notification: string]: {
    token: string;
    CustomerRequest: string;
    ApprovedAmount: string;
    DisbursedAmount: string;
    ServiceCategory: string;
    UserContribution: string;
    ServiceId: string;
    action: string;
  };
};

export type CreateSavingsScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'CreateSavings'>;
  route: RouteProp<CreateSavingsParams, 'CreateSavings'>;
};

export type NotificationScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Notification'>;
  route: RouteProp<NotificationParams, 'Notification'>;
};

export type LoanCalculatorFormProps = {
  navigation: NavigationProp<RootStackParamList, 'LoanCalculatorForm'>;
  route: RouteProp<LoanCalculatorFormParams, 'LoanCalculatorForm'>;
};

export type SignUpScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'SignUp'>;
  route: RouteProp<SignUpScreenParams, 'SignUp'>;
};

export type SavingsDetailsScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'SavingsDetails'>;
  route: RouteProp<SavingsDetailsParams, 'SavingsDetails'>;
};

export type SuccessPageScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'SuccessPage'>;
  route: RouteProp<SuccessPageParams, 'SuccessPage'>;
};
