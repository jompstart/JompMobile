import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus, Platform, Alert, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainNavigator from './src/routes';
import { loadAppFonts } from './src/constants/fonts';
import WalletAccountDetails from './src/components/Dashboard/WalletAccountDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PayBills from './src/components/Dashboard/PayBills';
import BillTypes from './src/components/Dashboard/BillTypes';
import SchoolPreference from './src/components/Dashboard/SchoolPreference';
import FilterBottomsheet from './src/components/Savings/FilterBottomsheet';
import { Provider } from 'react-redux';
import { store } from './src/app/redux.store';
import LogoutAccountModal from './src/shared/LogoutAccountModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompliancePromptModal from './src/components/compliance/CompliancePromptModal';
import OverlayWrapper from './src/shared/OverlayWrapper';
import { LinkingOptions } from '@react-navigation/native';
import * as ExpoLinking from 'expo-linking';
import { navigationRef } from './src/routes/RootNavigation';
import { RootStackParamList } from './src/types/navigations.types';
import TermsAndCondition from './src/shared/TermsAndCondition';
import PayNowBottomsheet from './src/shared/PayNowBottomsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountDetailsBottomsheet from './src/shared/AccountDetailsBottomsheet';
import { StackActions } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Application from 'expo-application';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Enhanced error handling
function handleRegistrationError(errorMessage: string) {
  console.error('Push notification registration error:', errorMessage);
  // Only show alert in development or for critical errors
  if (__DEV__) {
    Alert.alert('Notification Error', errorMessage);
  }
}

// Enhanced permission request with better UX
async function requestNotificationPermissions() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      // Show helpful guidance to user (only in production if necessary)
      if (__DEV__) {
        Alert.alert(
          'Permission Required',
          'Please enable notifications to receive important updates about your account.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Maybe Later',
              style: 'cancel',
            },
          ]
        );
      }
      return null;
    }
    return finalStatus;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return null;
  }
}

// Function to get or generate a valid project ID
function getValidProjectId(): string {
  // Try multiple sources for project ID
  const sources = [
    Constants.expoConfig?.extra?.eas?.projectId,
    Constants.expoConfig?.projectId,
    Constants.manifest?.extra?.eas?.projectId,
    Constants.manifest2?.extra?.eas?.projectId,
  ];

  // Check each source for a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  for (const source of sources) {
    if (source && typeof source === 'string' && uuidRegex.test(source)) {
      console.log('Found valid project ID:', source);
      return source;
    }
  }

  // Fallback to hardcoded project ID (ensure this is your actual project ID)
  const fallbackProjectId = 'beff92a5-f32e-49f1-a5fa-e616f0e8b13e';
  
  if (uuidRegex.test(fallbackProjectId)) {
    console.log('Using fallback project ID:', fallbackProjectId);
    return fallbackProjectId;
  }

  throw new Error('No valid project ID found. Please check your app.json/app.config.js configuration.');
}

// Enhanced registration function
async function registerForPushNotificationsAsync(): Promise<string | null> {
  try {
    // Configure Android channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        showBadge: true,
      });
    }

    if (!Device.isDevice) {
      console.warn('Must use physical device for push notifications');
      return null;
    }

    // Request permissions with enhanced UX
    const permissionStatus = await requestNotificationPermissions();
    if (permissionStatus !== 'granted') {
      console.warn('Notification permissions not granted');
      return null;
    }

    // Get valid project ID
    let projectId: string;
    try {
      projectId = getValidProjectId();
    } catch (error) {
      handleRegistrationError(`Project ID error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }

    console.log('Using project ID:', projectId);

    // Check if we have a cached valid token
    const cachedToken = await AsyncStorage.getItem('expoPushToken');
    const tokenLastUpdated = await AsyncStorage.getItem('pushTokenLastUpdated');
    
    if (cachedToken && tokenLastUpdated) {
      const lastUpdated = parseInt(tokenLastUpdated);
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      // If token is less than a day old and valid format, use it
      if (lastUpdated > oneDayAgo && cachedToken.startsWith('ExponentPushToken[')) {
        console.log('Using cached push token:', cachedToken);
        return cachedToken;
      }
    }

    // Get fresh push token
    console.log('Getting fresh push token...');
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    const pushTokenString = pushTokenData.data;
    console.log('Expo push token obtained:', pushTokenString);

    // Validate token format
    if (!pushTokenString.startsWith('ExponentPushToken[')) {
      handleRegistrationError('Invalid push token format received');
      return null;
    }

    // Store token for later use
    await AsyncStorage.setItem('expoPushToken', pushTokenString);
    await AsyncStorage.setItem('pushTokenLastUpdated', Date.now().toString());

    console.log('Push token successfully registered and cached');
    return pushTokenString;
  } catch (error: any) {
    console.error('Push notification registration error:', error);
    
    // More specific error handling
    if (error.message?.includes('projectId')) {
      handleRegistrationError('Invalid project ID configuration. Please check your app.json file.');
    } else if (error.message?.includes('network')) {
      handleRegistrationError('Network error during push token registration. Please check your internet connection.');
    } else {
      handleRegistrationError(`Failed to register for push notifications: ${error.message || 'Unknown error'}`);
    }
    
    return null;
  }
}

// Test notification function (only for development)
async function testLocalNotification() {
  if (!__DEV__) return;
  
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test Notification',
        body: 'This is a test notification from your app',
        data: { test: 'data' },
      },
      trigger: { seconds: 2 },
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
  }
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const appState = useRef(AppState.currentState);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          // Don't retry on 400 errors (client errors)
          if (error?.response?.status === 400) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });

  const loadFonts = async () => {
    try {
      await loadAppFonts();
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Set fonts as loaded even if there's an error to prevent infinite loading
      setFontsLoaded(true);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    // Register for push notifications
    const registerPushNotifications = async () => {
      try {
        console.log('Starting push notification registration...');
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setExpoPushToken(token);
          console.log('Push notification registration successful');
          
          // Test notification in development
          if (__DEV__) {
            setTimeout(() => testLocalNotification(), 3000);
          }
        } else {
          console.log('Push notification registration skipped or failed');
        }
      } catch (error) {
        console.error('Push notification registration failed:', error);
      }
    };

    // Only register if we're on a physical device
    if (Device.isDevice) {
      registerPushNotifications();
    } else {
      console.log('Skipping push notification registration on simulator/emulator');
    }

    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
      // Handle notification taps here - you can navigate to specific screens
      // based on the notification data
      const data = response.notification.request.content.data;
      if (data?.screen) {
        navigationRef.current?.navigate(data.screen as any, data.params);
      }
    });

    // Cleanup
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  const APP_EXIT_TIMESTAMP_KEY = 'lastBackgroundTime';
  const SESSION_TIMEOUT = 180; // 3 minutes in seconds

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      try {
        if (appState.current.match(/active/) && nextAppState === 'background') {
          const now = new Date().toISOString();
          await AsyncStorage.setItem(APP_EXIT_TIMESTAMP_KEY, now);
        }

        if (appState.current.match(/background|inactive/) && nextAppState === 'active') {
          const lastTimestamp = await AsyncStorage.getItem(APP_EXIT_TIMESTAMP_KEY);
          if (lastTimestamp) {
            const lastTime = new Date(lastTimestamp);
            const now = new Date();
            const diff = (now.getTime() - lastTime.getTime()) / 1000; // in seconds

            if (diff > SESSION_TIMEOUT) {
              console.log('Session expired, redirecting to login');
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('customerId'); // Also remove customerId if stored
              navigationRef.current?.dispatch(StackActions.replace('Login'));
            }
          }
        }
        appState.current = nextAppState;
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
    },
    []
  );

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [ExpoLinking.createURL('/')],
  config: {
    screens: {
      Notification:
        'Notifications/:action/:token/:CustomerRequest/:ApprovedAmount/:DisbursedAmount/:ServiceCategory/:UserContribution',
      SplashScreen: '*',
    },
  },
};

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return null; // You could return a custom loading component here
  }

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer linking={linking} ref={navigationRef}>
            <MainNavigator />
            <WalletAccountDetails />
            <PayBills />
            <BillTypes />
            <TermsAndCondition />
            <SchoolPreference />
            <FilterBottomsheet />
            <CompliancePromptModal />
            <LogoutAccountModal />
            <PayNowBottomsheet />
            <AccountDetailsBottomsheet />
          </NavigationContainer>
          <OverlayWrapper />
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
// export default function App() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const appState = useRef(AppState.currentState);

//   const queryClient = new QueryClient();

//   const loadFonts = async () => {
//     await loadAppFonts();
//     setFontsLoaded(true);
//   };

//   useEffect(() => {
//     loadFonts();
//   }, []);

//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       'change',
//       handleAppStateChange
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const APP_EXIT_TIMESTAMP_KEY = 'lastBackgroundTime';
//   const handleAppStateChange = useCallback(
//     async (nextAppState: AppStateStatus) => {
//       if (appState.current.match(/active/) && nextAppState === 'background') {
//         const now = new Date().toISOString();
//         await AsyncStorage.setItem(APP_EXIT_TIMESTAMP_KEY, now);
//       }

//       if (
//         appState.current.match(/background|inactive/) &&
//         nextAppState === 'active'
//       ) {
//         const lastTimestamp = await AsyncStorage.getItem(
//           APP_EXIT_TIMESTAMP_KEY
//         );
//         if (lastTimestamp) {
//           const lastTime = new Date(lastTimestamp);
//           const now = new Date();
//           const diff = (now.getTime() - lastTime.getTime()) / 1000; // in seconds

//           if (diff > 180) {
//             AsyncStorage.removeItem('token');
//             navigationRef.current?.dispatch(StackActions.replace('Login'));
//           }
//         }
//       }
//       appState.current = nextAppState;
//     },
//     []
//   );
//   const linking: LinkingOptions<RootStackParamList> = {
//     prefixes: [Linking.createURL('/')],
//     config: {
//       screens: {
//         Notification:
//           'Notifications/:action/:token/:CustomerRequest/:ApprovedAmount/:DisbursedAmount/:ServiceCategory/:UserContribution/:ServiceId',
//         SplashScreen: '*',
//       },
//     },
//   };

//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <GestureHandlerRootView style={styles.gestureHandler}>
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           <NavigationContainer linking={linking} ref={navigationRef}>
//             <MainNavigator />
//             <WalletAccountDetails />
//             <PayBills />
//             <BillTypes />
//             <TermsAndCondition />
//             <SchoolPreference />
//             <FilterBottomsheet />
//             <CompliancePromptModal />
//             <LogoutAccountModal />
//             <PayNowBottomsheet />
//             <AccountDetailsBottomsheet />
//           </NavigationContainer>
//           <OverlayWrapper />
//         </Provider>
//       </QueryClientProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   gestureHandler: {
//     flex: 1,
//   },
// });
