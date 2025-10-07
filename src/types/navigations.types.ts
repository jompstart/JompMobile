import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { UserAccountPreference } from "../models/user";
import { CreateSavingsFormState } from "../features/Savings/savings.reducer";
import { loanType } from "./loanCalculator";
import { NotificationItemData } from "../screens/Notifications/Notification";

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
  LoanBreakdown: { id: string; notification: NotificationItemData };
  NotificationDetails: { notification: NotificationItemData };
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
  UpdateVerificationInfo: undefined;
  AddBank: undefined;
  WithdrawFunds: undefined;
  GuardianDetails: undefined;
  SelfDetails: undefined;
  ServiceDetailScreen: undefined;
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
    savedAmount: number;
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
  CreateServices: undefined;
  Support: undefined;
  CustomerSupport: undefined;
  Faqs: undefined;
  Request: undefined;
  AcceptService: undefined;
  PendingService: undefined;
  AcceptPendingService: {
    serviceId: string;
    serviceType: string;
  };
  UpdateProfile: undefined;
};

type SignUpScreenParams = {
  [SignUpScreenProps: string]: {
    accountPreference: UserAccountPreference;
  };
};

type SavingsDetailsParams = {
  [SavingsDetails: string]: {
    goalId: string;
    savedAmount: number;
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

type AcceptPendingServiceParams = {
  [AcceptPendingService: string]: {
    serviceId: string;
    serviceType: string;
  };
};
export type AcceptPendingServiceProps = {
  navigation: NavigationProp<RootStackParamList, "AcceptPendingService">;
  route: RouteProp<AcceptPendingServiceParams, "AcceptPendingService">;
};

export type CreateSavingsScreenProps = {
  navigation: NavigationProp<RootStackParamList, "CreateSavings">;
  route: RouteProp<CreateSavingsParams, "CreateSavings">;
};

export type NotificationScreenProps = {
  navigation: NavigationProp<RootStackParamList, "Notification">;
  route: RouteProp<NotificationParams, "Notification">;
};

export type LoanCalculatorFormProps = {
  navigation: NavigationProp<RootStackParamList, "LoanCalculatorForm">;
  route: RouteProp<LoanCalculatorFormParams, "LoanCalculatorForm">;
};

export type SignUpScreenProps = {
  navigation: NavigationProp<RootStackParamList, "SignUp">;
  route: RouteProp<SignUpScreenParams, "SignUp">;
};

export type SavingsDetailsScreenProps = {
  navigation: NavigationProp<RootStackParamList, "SavingsDetails">;
  route: RouteProp<SavingsDetailsParams, "SavingsDetails">;
};

export type SuccessPageScreenProps = {
  navigation: NavigationProp<RootStackParamList, "SuccessPage">;
  route: RouteProp<SuccessPageParams, "SuccessPage">;
};
