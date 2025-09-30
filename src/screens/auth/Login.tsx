import { Pressable, StyleSheet, View, Platform, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { size } from '../../config/size';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CText from '../../shared/CText';
import { jwtDecode } from 'jwt-decode';
import CTextInput from '../../shared/CTextInput';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import Feather from '@expo/vector-icons/build/Feather';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import ForgotPasswordModal from '../../components/auth/ForgotPasswordModal';
import { useAppDispatch } from '../../controller/redux.controller';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import ShowLoader from '../../shared/ShowLoader';
import {
  changeUserState,
  updateUserState,
} from '../../features/user/user.slice';
import SuccessModal from '../../shared/SuccessModal';
import { obfuscateEmail } from '../../utils/stringManipulation';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { updateToast } from '../../features/ui/ui.slice';
import VerifyEmailBottomsheet from '../../components/auth/VerifyEmailBottomsheet';
import { ComplianceService } from '../../services/compliance';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { AuthErrorHandler } from '../../utils/errorHandler';

// Enhanced error messages for better user experience
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Unable to connect to our servers. Please check your internet connection and try again.",
  INVALID_CREDENTIALS: "The email or password you entered is incorrect. Please check your credentials and try again.",
  EMAIL_NOT_VERIFIED: "Your email address needs to be verified. Please check your inbox for a verification email.",
  ACCOUNT_LOCKED: "Your account has been temporarily locked for security reasons. Please try again later or contact support.",
  SERVER_ERROR: "We're experiencing technical difficulties. Please try again in a few moments.",
  GOOGLE_LOGIN_FAILED: "Google sign-in was unsuccessful. Please try again or use email and password instead.",
  NOTIFICATION_SETUP_FAILED: "We couldn't set up notifications, but you can still use the app. You can enable them later in settings.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_REQUIRED: "Please enter your password.",
  DEVICE_TOKEN_FAILED: "We couldn't register this device for notifications. Don't worry, this won't affect your app experience.",
  PROJECT_CONFIG_ERROR: "There's a configuration issue with the app. Please update to the latest version or contact support.",
};

// Utility function to get user-friendly error message
function getUserFriendlyErrorMessage(error: any): string {
  if (!error) return ERROR_MESSAGES.SERVER_ERROR;
  
  const errorMessage = error.message?.toLowerCase() || '';
  const statusCode = error.statusCode || error.status;
  
  // Network-related errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || 
      errorMessage.includes('timeout') || errorMessage.includes('connection')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  // Authentication errors based on status codes
  switch (statusCode) {
    case 400:
      if (errorMessage.includes('email') && errorMessage.includes('verify')) {
        return ERROR_MESSAGES.EMAIL_NOT_VERIFIED;
      }
      return ERROR_MESSAGES.INVALID_CREDENTIALS;
    case 401:
      return ERROR_MESSAGES.INVALID_CREDENTIALS;
    case 403:
      return ERROR_MESSAGES.ACCOUNT_LOCKED;
    case 429:
      return "Too many login attempts. Please wait a few minutes before trying again.";
    case 500:
    case 502:
    case 503:
    case 504:
     
        case 404:
          return 'User not found';
        case 422:
          return 'Validation error. Please check your input.';
   
        default:
          return 'Login failed. Please check your credentials and try again.';
  }
  
  // Specific error message patterns
  if (errorMessage.includes('credential') || errorMessage.includes('password') || 
      errorMessage.includes('unauthorized')) {
    return ERROR_MESSAGES.INVALID_CREDENTIALS;
  }
  
  if (errorMessage.includes('email') && errorMessage.includes('verify')) {
    return ERROR_MESSAGES.EMAIL_NOT_VERIFIED;
  }
  
  if (errorMessage.includes('locked') || errorMessage.includes('suspended')) {
    return ERROR_MESSAGES.ACCOUNT_LOCKED;
  }
  
  if (errorMessage.includes('google') || errorMessage.includes('oauth')) {
    return ERROR_MESSAGES.GOOGLE_LOGIN_FAILED;
  }
  
  if (errorMessage.includes('projectid') || errorMessage.includes('configuration')) {
    return ERROR_MESSAGES.PROJECT_CONFIG_ERROR;
  }
  
  // Return the original message if it's already user-friendly, otherwise use generic error
  if (error.message && error.message.length < 100 && !error.message.includes('Error:')) {
    return error.message;
  }
  
  return ERROR_MESSAGES.SERVER_ERROR;
}

// Enhanced error handling for push notifications
function handleNotificationError(error: any, context: string = '') {
  console.error(`Push notification error ${context}:`, error);
  
  // Only show user-facing errors in development or for critical issues
  if (__DEV__) {
    const userMessage = getUserFriendlyErrorMessage(error);
    Alert.alert('Notification Setup', userMessage);
  }
}

// Enhanced permission request with better error handling
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
        },
      });
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      // Don't show alert in production to avoid annoying users
      if (__DEV__) {
        Alert.alert(
          'Enable Notifications',
          'Get notified about important updates to your account and transactions.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Not Now',
              style: 'cancel',
            },
          ]
        );
      }
      return null;
    }
    return finalStatus;
  } catch (error) {
    handleNotificationError(error, 'requesting permissions');
    return null;
  }
}

// Function to get or generate a valid project ID
function getValidProjectId(): string {
  const sources = [
    Constants.expoConfig?.extra?.eas?.projectId,
    Constants.manifest2?.extra?.eas?.projectId,
  ];

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  for (const source of sources) {
    if (source && typeof source === 'string' && uuidRegex.test(source)) {
      console.log('Found valid project ID:', source);
      return source;
    }
  }

  throw new Error('Project configuration missing. Please update the app or contact support.');
}

// Enhanced push notification registration with better error handling
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
      console.log('Push notifications require a physical device');
      return null;
    }

    // Request permissions
    const permissionStatus = await requestNotificationPermissions();
    if (permissionStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return null;
    }

    // Get valid project ID
    let projectId: string;
    try {
      projectId = getValidProjectId();
    } catch (error) {
      handleNotificationError(error, 'getting project ID');
      return null;
    }

    // Check for cached token
    const cachedToken = await AsyncStorage.getItem('expoPushToken');
    const tokenLastUpdated = await AsyncStorage.getItem('pushTokenLastUpdated');

    if (cachedToken && tokenLastUpdated) {
      const lastUpdated = parseInt(tokenLastUpdated);
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

      if (lastUpdated > oneDayAgo && cachedToken.startsWith('ExponentPushToken[')) {
        console.log('Using cached push token');
        return cachedToken;
      }
    }

    // Get fresh push token
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    const pushTokenString = pushTokenData.data;

    // Validate token format
    if (!pushTokenString.startsWith('ExponentPushToken[')) {
      throw new Error('Invalid notification token received');
    }

    // Store token
    await AsyncStorage.setItem('expoPushToken', pushTokenString);
    await AsyncStorage.setItem('pushTokenLastUpdated', Date.now().toString());

    console.log('Push notifications set up successfully');
    return pushTokenString;
  } catch (error: any) {
    handleNotificationError(error, 'during registration');
    return null;
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState<any>();
  const [showVerifyEmailBottomsheet, setShowVerifyEmailBottomsheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [succesModal, setSuccessModalText] = useState({
    description: '',
    title: '',
  });
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId: '801607727056-tfa731fpcvcn45qjlbso5rutbffvi891.apps.googleusercontent.com',
    iosClientId: '801607727056-4praconm2f06hvvek28slfenq30gpoer.apps.googleusercontent.com',
  });
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getLoginButtonText = (): string => {
    if (!email) return 'Enter your email';
    if (!validateEmail(email)) return 'Enter valid email';
    if (!password) return 'Enter your password';
    return 'Login';
  };

  // Register for push notifications on component mount
  useEffect(() => {
    const registerPushNotifications = async () => {
      try {
        if (Device.isDevice) {
          console.log('Setting up push notifications...');
          const token = await registerForPushNotificationsAsync();
          if (token) {
            setExpoPushToken(token);
          }
        }
      } catch (error) {
        console.log('Push notification setup completed with warnings');
      }
    };

    registerPushNotifications();
  }, []);

  // Enhanced device token update function
  const updateDeviceToken = async (userId: string, customerId: string) => {
    try {
      if (!customerId || !userId) {
        console.error('Missing user credentials for device token update');
        return;
      }

      let currentToken = expoPushToken;

      if (!currentToken) {
        currentToken = (await AsyncStorage.getItem('expoPushToken')) ?? '';
      }

      if (!currentToken) {
        console.log('Attempting to get fresh notification token...');
        const tokenResult = await registerForPushNotificationsAsync();
        currentToken = tokenResult ?? '';
        if (currentToken) {
          setExpoPushToken(currentToken);
        }
      }

      if (!currentToken) {
        console.log('No notification token available - user can still use app normally');
        return;
      }

      const userService = new UserService(customerId, userId);
      const response = await userService.updateDeviceToken({
        userId,
        deviceToken: currentToken,
      });

      if (response.success) {
        await AsyncStorage.setItem('expoPushToken', currentToken);
        console.log('Device registered for notifications successfully');
      } else {
        console.log('Device token update had issues but app will continue normally');
      }
    } catch (error) {
      console.log('Device token update completed with warnings - app functionality not affected');
      // Don't show error toast to user as this is not critical for app functionality
    }
  };

  const getUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to get Google account information');
      }

      const userInfoResponse = await response.json();
      setUserInfo(userInfoResponse);

      const loginResponse: any = await authInstance.login({
        email: userInfoResponse.email,
        password: userInfoResponse.id,
      });

      if (loginResponse.statusCode === 400 && loginResponse.success === false) {
        const errorMessage = getUserFriendlyErrorMessage(loginResponse);
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: errorMessage,
            toastType: 'info',
          })
        );
        setIsLoading(false);
        return;
      }

      setEmail(userInfoResponse.email);

      if (loginResponse.data.otp) {
        setOtp(loginResponse.data.otp);
        setShowVerifyEmailBottomsheet(true);
      } else if (loginResponse.data.token) {
        const decoded: any = jwtDecode(loginResponse.data.token);

        await AsyncStorage.setItem('token', loginResponse.data.token);
        dispatch(
          updateUserState({
            accountPreference: decoded.clientId,
            token: loginResponse.data.token,
            customerId: decoded.customerId,
            userId: decoded.UserId,
          })
        );

        // Update device token after successful login (non-blocking)
        updateDeviceToken(decoded.UserId, decoded.customerId);

        const userInstance = new UserService(decoded.customerId, decoded.UserId);
        const [user, wallet, userBanks] = await Promise.all([
          userInstance.getCustomer(),
          userInstance.getCustomerWallet(),
          userInstance.getUserBankDetails(),
        ]);

        if (!userBanks.data && user.data?.complianceFlag === true) {
          const complianceInstance = new ComplianceService(decoded.UserId, decoded.customerId);
          const createAccount = await complianceInstance.createAccount();
          if (createAccount.success === true) {
            const userBanksDetails = await userInstance.getUserBankDetails();
            if (userBanksDetails?.data) {
              dispatch(
                changeUserState({
                  key: 'bankDetails',
                  value: Array.isArray(userBanksDetails.data) ? userBanksDetails.data : [userBanksDetails.data],
                })
              );
            }
          }
        }

        if (userBanks?.data) {
          dispatch(
            changeUserState({
              key: 'bankDetails',
              value: Array.isArray(userBanks.data) ? userBanks.data : [userBanks.data],
            })
          );
        }

        if (wallet?.data) {
          dispatch(
            changeUserState({
              key: 'balance',
              value: wallet.data.balance,
            })
          );
          dispatch(
            changeUserState({
              key: 'ledger',
              value: wallet.data.ledgerBalance,
            })
          );
        }

        if (user.data) {
          const userUpdates = {
            ninStatus: user.data.ninStatus,
            email: user.data.email,
            fullName: user.data.fullName,
            bvnStatus: user.data.bvnStatus,
            complianceStatus: user.data.complianceFlag,
            niN: user.data.niN,
            bvn: user.data.bvn,
            phoneNumber: user.data.phoneNumber,
            address: user.data?.contactAddress || null,
          };

          Object.entries(userUpdates).forEach(([key, value]) => {
            dispatch(changeUserState({ key, value }));
          });
        }

        navigation.dispatch(StackActions.replace('NavigationDrawer'));
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      const errorMessage = getUserFriendlyErrorMessage(error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'info',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      getUserInfo(response.authentication?.accessToken!);
    } else if (response?.type === 'error') {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: ERROR_MESSAGES.GOOGLE_LOGIN_FAILED,
          toastType: 'info',
        })
      );
    }
  }, [response]);

  const authInstance = new AuthService();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: authInstance.login,
    onSuccess: async (data) => {
      try {
        if (data.statusCode === 200 && data.success === true) {
          const decoded: any = jwtDecode(data.data.token);

          await AsyncStorage.setItem('token', data.data.token);
          dispatch(
            updateUserState({
              accountPreference: decoded.clientId,
              token: data.data.token,
              customerId: decoded.customerId,
              userId: decoded.UserId,
            })
          );

          // Update device token after successful login (non-blocking)
          updateDeviceToken(decoded.UserId, decoded.customerId);

          const userInstance = new UserService(decoded.customerId, decoded.UserId);
          const [user, wallet] = await Promise.all([
            userInstance.getCustomer(),
            userInstance.getCustomerWallet(),
          ]);

          if (wallet?.data) {
            dispatch(
              changeUserState({
                key: 'balance',
                value: wallet.data.balance,
              })
            );
            dispatch(
              changeUserState({
                key: 'ledger',
                value: wallet.data.ledgerBalance,
              })
            );
          }

          if (user.data) {
            const userUpdates = {
              ninStatus: user.data.ninStatus,
              email: user.data.email,
              fullName: user.data.fullName,
              bvnStatus: user.data.bvnStatus,
              complianceStatus: user.data.complianceFlag,
              niN: user.data.niN,
              bvn: user.data.bvn,
              phoneNumber: user.data.phoneNumber,
              address: user.data?.contactAddress || null,
            };

            Object.entries(userUpdates).forEach(([key, value]) => {
              dispatch(changeUserState({ key, value }));
            });
          }

          navigation.dispatch(StackActions.replace('NavigationDrawer'));
        }
      } catch (error: any) {
        const errorMessage = getUserFriendlyErrorMessage(error);
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: errorMessage,
            toastType: 'info',
          })
        );
      }
    },
    onError: (error: any) => {
      const errorMessage = getUserFriendlyErrorMessage(error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'info',
        })
      );
    },
  });

  const handleLogin = () => {
    // Client-side validation
    if (!email) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: ERROR_MESSAGES.INVALID_EMAIL,
          toastType: 'info',
        })
      );
      return;
    }

    if (!validateEmail(email)) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: ERROR_MESSAGES.INVALID_EMAIL,
          toastType: 'info',
        })
      );
      return;
    }

    if (!password) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: ERROR_MESSAGES.PASSWORD_REQUIRED,
          toastType: 'info',
        })
      );
      return;
    }

    loginUser({ email, password });
  };

  return (
    <CustomSafeArea statusBarColor={colors.appBackground()}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={size.getHeightSize(16)}
        >
          <View style={styles.logoContainer}>
            <JompLogo size={size.getHeightSize(44)} />
            <JompTextLogo
              width={size.getWidthSize(155.27)}
              height={size.getHeightSize(30.19)}
            />
          </View>

          <CText style={styles.welcomeText}>Welcome Back!</CText>
          <CText style={styles.subtitle}>
            Complete the fields below to continue enjoying Jompstart
          </CText>

          <View style={styles.inputContainer}>
            <CTextInput
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text.trim().toLowerCase())}
              title="Email Address"
              value={email}
              placeholder="@mail.com"
              rightIcon={<MailIcon size={size.getHeightSize(24)} />}
            />
            <CTextInput
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              title="Password"
              placeholder="Password"
              rightIcon={
                <Feather
                  onPress={() => setShowPassword(!showPassword)}
                  name={showPassword ? 'eye' : 'eye-off'}
                  color={colors.primary()}
                  size={size.getHeightSize(24)}
                />
              }
            />
          </View>

          <Pressable
            onPress={() => setShowForgotPasswordModal(true)}
            style={styles.forgotPassword}
          >
            <CText fontSize={14} lineHeight={19} color="warning">
              Forgot Password?
            </CText>
          </Pressable>

          <PrimaryButton
            disabled={!email || !password || !validateEmail(email)}
            label={getLoginButtonText()}
            style={styles.loginButton}
            onPress={handleLogin}
          />

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <CText style={styles.separatorText}>OR</CText>
          </View>

          <View style={styles.socialButtons}>
            <SecondaryButton
              onPress={() => prompAsync()}
              icon={<GoogleIcon size={size.getHeightSize(24)} />}
              label="Login with Google"
            />
            {Platform.OS === 'ios' && (
              <SecondaryButton
                icon={<AppleIcon size={size.getHeightSize(24)} />}
                label="Login with Apple"
              />
            )}
          </View>

          <CText style={styles.signupText}>
            Don't have an account?{' '}
            <CText
              onPress={() => navigation.navigate('AccountPreference')}
              color="secondary"
              fontFamily="semibold"
            >
              Get Started
            </CText>
          </CText>
        </KeyboardAwareScrollView>
      </View>

      <ForgotPasswordModal
        onChangeText={setResetPasswordEmail}
        onSuccess={() => {
          setShowForgotPasswordModal(false);
          setSuccessModalText({
            description: `Your password reset email has been successfully sent to ${obfuscateEmail(resetPasswordEmail)}. Please check your inbox and click the link to reset your password.`,
            title: 'Reset Email Sent!',
          });
          setShowSuccessModal(true);
        }}
        onClose={() => setShowForgotPasswordModal(false)}
        isVisible={showForgotPasswordModal}
      />

      <ShowLoader isLoading={isPending || isLoading} />

      <SuccessModal
        visibility={showSuccessModal}
        buttonText="Got it"
        description={succesModal.description}
        title={succesModal.title}
        onClose={() => setShowSuccessModal(false)}
        onContinue={() => setShowSuccessModal(false)}
      />

      <VerifyEmailBottomsheet
        onClose={() => setShowVerifyEmailBottomsheet(false)}
        otp={otp}
        onSuccess={() => {
          setShowVerifyEmailBottomsheet(false);
          setSuccessModalText({
            description: 'Great! Your email has been verified successfully. You can now complete your account setup.',
            title: 'Email Verified!',
          });
          setShowSuccessModal(true);
        }}
        email={email}
        isVisible={showVerifyEmailBottomsheet}
      />
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.appBackground(),
  },
  scrollContent: {
    paddingBottom: size.getHeightSize(20),
  },
  logoContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size.getHeightSize(24),
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'semibold',
    textAlign: 'center',
    marginTop: size.getHeightSize(16),
  },
  subtitle: {
    color: 'secondaryBlack',
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: 'semibold',
    textAlign: 'center',
    marginTop: size.getHeightSize(16),
    letterSpacing: size.getWidthSize(0.2),
  },
  inputContainer: {
    marginTop: size.getHeightSize(32),
    gap: size.getHeightSize(16),
  },
  forgotPassword: {
    gap: size.getWidthSize(16),
    marginTop: size.getHeightSize(8),
    alignSelf: 'flex-end',
  },
  loginButton: {
    marginTop: size.getHeightSize(24),
  },
  separatorContainer: {
    marginTop: size.getHeightSize(26),
    width: '100%',
  },
  separatorLine: {
    width: '100%',
    height: size.getHeightSize(1),
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    color: 'secondaryBlack',
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: 'semibold',
    position: 'absolute',
    backgroundColor: colors.appBackground(),
    bottom: size.getHeightSize(-11),
    alignSelf: 'center',
    paddingHorizontal: size.getWidthSize(16),
  },
  socialButtons: {
    marginTop: size.getHeightSize(26),
    gap: size.getHeightSize(16),
  },
  signupText: {
    fontFamily: 'semibold',
    textAlign: 'center',
    marginTop: size.getHeightSize(16),
  },
});

export default Login;