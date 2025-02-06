import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Easing, Animated, Platform } from 'react-native';
import { RootStackParamList } from '../types/navigations.types';
import SplashScreen from '../screens/onboarding/SplashScreen';

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
