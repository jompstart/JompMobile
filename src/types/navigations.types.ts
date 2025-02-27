import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  SignUp: undefined;
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
  CreateSavings: undefined;
  SavingsTransactions: undefined;
  Receipt: undefined;
  TransportDetails: undefined;
};

type AuthScreenProps = {
  [AuthPage: string]: {
    data?: string;
    nonce?: string;
    phantom_encryption_public_key?: string;
    show_bottomsheet?: string;
  };
};

type SignupWithWalletPageParams = {
  [SignupWithWallet: string]: {
    walletType: 'metamask' | 'phantom';
    data?: string;
    nonce?: string;
    phantom_encryption_public_key?: string;
  };
};
type EmailConfirmationPageParams = {
  [EmailConfirmation: string]: {
    email: string;
    password: string;
    otp: string;
  };
};

// export type SignupWithWalletPageProps = {
//   navigation: NavigationProp<RootStackParamList, 'SignupWithWallet'>;
//   route: RouteProp<SignupWithWalletPageParams, 'SignupWithWallet'>;
// };
