import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Easing, Animated, Platform } from 'react-native';
import { RootStackParamList } from '../types/navigations.types';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';
import VerifyBvn from '../screens/compliance/VerifyBvn';
import AccountPreference from '../screens/onboarding/AccountPreference';
import VerifyNin from '../screens/compliance/VerifyNin';
import BottomtabNavigation from './BottomtabNavigation';
import Profile from '../screens/Dashboard/Profile';
import AddBank from '../screens/Dashboard/AddBank';
import WithdrawFunds from '../screens/Dashboard/WithdrawFunds';
import GuardianDetails from '../screens/ChildBills/GuardianDetails';
import SelfDetails from '../screens/ChildBills/SelfDetails';
import LoanPage from '../screens/LoanCalculator/LoanPage';
import SchoolFees from '../screens/LoanCalculator/SchoolFees';
import Transport from '../screens/LoanCalculator/Transport';
import HouseRent from '../screens/LoanCalculator/HouseRent';
import UserCreated from '../screens/services/UserCreated';
import PayServices from '../screens/services/PayServices';
import PreviewRequest from '../shared/PreviewRequest';
import SavingsGoal from '../screens/Savings/SavingsGoal';
import CreateSavings from '../screens/Savings/CreateSavings';
import SavingsTransactions from '../screens/Savings/SavingsTransactions';
import SavingsDetails from '../screens/Savings/SavingsDetails';
import TransportDetails from '../screens/TransportCredit/TransportDetails';
import OtherServices from '../screens/services/OtherServices';
import AddCard from '../screens/Cards/AddCard';
import FundWallet from '../screens/Savings/FundWallet';
import Verification from '../screens/compliance/Verification';
import HouseRentService from '../screens/services/HouseRentService';
import SuccessPage from '../screens/services/SuccessPage';
import CreatedServices from '../screens/services/CreatedServices';
import Support from '../screens/Support/Support';
import CustomerSupport from '../screens/Support/CustomerSupport';
import Faqs from '../screens/Support/Faqs';
import Request from '../screens/Support/Request';
interface pages {
  name: keyof RootStackParamList;
  component: any;
}
const MainNavigator = () => {
  const AppStack = createStackNavigator<RootStackParamList>();
  const config = {
    animation: Animated.timing,
    config: {
      duration: 200,
      easing: Easing.linear,
      // Placeholder value; adjust according to your needs
    },
  };

  const closeconfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };
  const pages: pages[] = [
    {
      name: 'SplashScreen',
      component: SplashScreen,
    },
    {
      name: 'OnboardingScreen',
      component: OnboardingScreen,
    },
    {
      name: 'AccountPreference',
      component: AccountPreference,
    },
    {
      name: 'SignUp',
      component: SignUp,
    },

    {
      name: 'Login',
      component: Login,
    },
    {
      name: 'VerifyBvn',
      component: VerifyBvn,
    },
    {
      name: 'VerifyNin',
      component: VerifyNin,
    },
    {
      name: 'BottomtabNavigation',
      component: BottomtabNavigation,
    },
    {
      name: 'Profile',
      component: Profile,
    },
    {
      name: 'AddBank',
      component: AddBank,
    },
    {
      name: 'WithdrawFunds',
      component: WithdrawFunds,
    },
    {
      name: 'GuardianDetails',
      component: GuardianDetails,
    },
    {
      name: 'SelfDetails',
      component: SelfDetails,
    },
    {
      name: 'LoanPage',
      component: LoanPage,
    },
    {
      name: 'SchoolFees',
      component: SchoolFees,
    },
    {
      name: 'Transport',
      component: Transport,
    },
    {
      name: 'HouseRent',
      component: HouseRent,
    },
    {
      name: 'UserCreated',
      component: UserCreated,
    },
    {
      name: 'PayServices',
      component: PayServices,
    },
    {
      name: 'SavingsGoal',
      component: SavingsGoal,
    },
    {
      name: 'CreateSavings',
      component: CreateSavings,
    },
    {
      name: 'SavingsTransactions',
      component: SavingsTransactions,
    },
    {
      name: 'SavingsDetails',
      component: SavingsDetails,
    },
    {
      name: 'TransportDetails',
      component: TransportDetails,
    },
    {
      name: 'PreviewRequest',
      component: PreviewRequest,
    },
    {
      name: 'OtherServices',
      component: OtherServices,
    },

    {
      name: 'FundWallet',
      component: FundWallet,
    },
    {
      name: 'AddCard',
      component: AddCard,
    },
    {
      name: 'Verification',
      component: Verification,
    },
    {
      name: 'HouseRentService',
      component: HouseRentService,
    },
    {
      name: 'SuccessPage',
      component: SuccessPage,
    },
    {
      name: 'CreatedServices',
      component: CreatedServices,
    },
    {
      name: 'Support',
      component: Support,
    },
    {
      name: 'CustomerSupport',
      component: CustomerSupport,
    },
    {
      name: 'Faqs',
      component: Faqs,
    },
    {
      name: 'Request',
      component: Request,
    },
  ];

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: config as any,
          close: closeconfig as any,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {pages.map((page) => (
        <AppStack.Screen
          key={page.name}
          name={page.name}
          component={page.component}
        />
      ))}
    </AppStack.Navigator>
  );
};
export default MainNavigator;
