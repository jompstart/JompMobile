import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { UserAccountPreference } from '../models/user';
import { CreateSavingsFormState } from '../features/Savings/savings.reducer';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  SplashScreen: undefined;
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
  HouseRent: undefined;
  UserCreated: undefined;
  PayServices: undefined;
  SavingsGoal: undefined;
  CreateSavings: CreateSavingsFormState;
  SavingsTransactions: undefined;
  SavingsDetails: {
    goalId: string;
  };
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

type CreateSavingsParams = {
  [CreateSavings: string]: CreateSavingsFormState;
};

export type CreateSavingsScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'CreateSavings'>;
  route: RouteProp<CreateSavingsParams, 'CreateSavings'>;
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
