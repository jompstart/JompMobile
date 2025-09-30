import { StyleSheet, Platform, View } from 'react-native';
import React, { useState, useReducer, useEffect } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CheckIcon from '../../../assets/svgs/Onboarding/CheckIcon';
import CancelIcon from '../../../assets/svgs/Onboarding/CancelIcon';
import CTextInput from '../../shared/CTextInput';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as AppleAuthentication from 'expo-apple-authentication';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import Feather from '@expo/vector-icons/build/Feather';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import SuccessModal from '../../shared/SuccessModal';
import VerifyEmailBottomsheet from '../../components/auth/VerifyEmailBottomsheet';
import ShowLoader from '../../shared/ShowLoader';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import FacebookIcon from '../../../assets/svgs/Onboarding/FacebookIcon';
import { useMutation } from '@tanstack/react-query';
import { SignUpScreenProps } from '../../types/navigations.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthService } from '../../services/auth';
import { StackActions } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import {
  signUpFormReducer,
  signUpInitailState,
} from '../../features/signup_onboarding/onboarding.reducers';
import { UserAccount } from '../../enums/user.enums';
import { updateToast } from '../../features/ui/ui.slice';
import { useAppDispatch } from '../../controller/redux.controller';
import { jwtDecode } from 'jwt-decode';

const SignUp = ({
  route: {
    params: { accountPreference },
  },
  navigation,
}: SignUpScreenProps) => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialCharacter: false,
    number: false,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [showVerifyEmailBottomsheet, setShowVerifyEmailBottomsheet] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showSucessModal, setShowSuccessModal] = useState(false);
  const [state, dispatch] = useReducer(signUpFormReducer, signUpInitailState);
  const stateDispatch = useAppDispatch();
  
  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId:
      '801607727056-tfa731fpcvcn45qjlbso5rutbffvi891.apps.googleusercontent.com',
    iosClientId:
      '801607727056-4praconm2f06hvvek28slfenq30gpoer.apps.googleusercontent.com',
  });

  // Normalize email to lowercase
  const normalizeEmail = (email: string) => {
    return email.toLowerCase().trim();
  };

  // Validate form fields
  const validateForm = () => {
    if (!state.email) {
      return 'Please enter your email address';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      return 'Please enter a valid email address';
    }
    
    if (!state.firstName) {
      return 'Please enter your first name';
    }
    
    if (!state.lastName) {
      return 'Please enter your last name';
    }
    
    if (!state.password) {
      return 'Please enter a password';
    }
    
    if (!passwordValidation.length || 
        !passwordValidation.uppercase || 
        !passwordValidation.lowercase || 
        !passwordValidation.specialCharacter || 
        !passwordValidation.number) {
      return 'Please ensure your password meets all requirements';
    }
    
    if (state.password !== confirmPassword) {
      return 'Passwords do not match';
    }
    
    return null;
  };

  const authInstance = new AuthService();
  
  const { mutate: validateEmail, isPending } = useMutation({
    mutationFn: authInstance.validateEmail,
    onSuccess: async (data) => {
      try {
        if (data.statusCode === 200 && data.success === true) {
          // Use normalized email for signup
          const normalizedEmail = normalizeEmail(state.email);
          const signupData = accountPreference == UserAccount.Customer
            ? { ...state, email: normalizedEmail }
            : {
                businessEmail: normalizedEmail,
                countryID: 125,
                firstName: state.firstName,
                lastName: state.lastName,
                password: state.password,
              };

          const createUserAccountResponse = await authInstance.signup(
            accountPreference,
            signupData
          );
          
          if (
            createUserAccountResponse.statusCode === 200 &&
            createUserAccountResponse.success === true &&
            createUserAccountResponse?.data?.otp
          ) {
            setOtp(createUserAccountResponse?.data?.otp);
            setShowVerifyEmailBottomsheet(true);
          } else {
            stateDispatch(
              updateToast({
                displayToast: true,
                toastMessage: createUserAccountResponse.message || 'Failed to create account. Please try again.',
                toastType: 'info',
              })
            );
          }
        }
      } catch (error: any) {
        console.log('Signup error:', error);
        let errorMessage = 'An unexpected error occurred. Please try again.';
        
        if (error.message?.includes('network') || error.message?.includes('offline')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message?.includes('email') || error.message?.includes('already exists')) {
          errorMessage = 'This email address is already registered. Please try logging in or use a different email.';
        }
        
        stateDispatch(
          updateToast({
            displayToast: true,
            toastMessage: errorMessage,
            toastType: 'info',
          })
        );
      }
    },
    onError: (error: any) => {
      console.log('Email validation error:', error);
      let errorMessage = 'Failed to validate email. Please try again.';
      
      if (error.message?.includes('network') || error.message?.includes('offline')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message?.includes('invalid email') || error.message?.includes('format')) {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.message?.includes('already exists')) {
        errorMessage = 'This email address is already registered. Please try logging in.';
      }
      
      stateDispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'info',
        })
      );
    },
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google authentication successful');
      getUserInfo(authentication?.accessToken!);
    } else if (response?.type === 'error') {
      console.log('Google authentication error:', response.error);
      stateDispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Google sign-in failed. Please try again.',
          toastType: 'info',
        })
      );
    }
  }, [response]);

  const getUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info from Google');
      }
      
      const userInfoResponse = await response.json();
      
      // Normalize Google email
      const normalizedEmail = normalizeEmail(userInfoResponse.email);
      dispatch({
        type: 'SET_EMAIL',
        payload: normalizedEmail,
      });
      
      await createUser(userInfoResponse, normalizedEmail);
    } catch (error) {
      console.log('Error fetching Google user info:', error);
      setIsLoading(false);
      stateDispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Failed to get user information from Google. Please try again.',
          toastType: 'info',
        })
      );
    }
  };

  const createUser = async (userInfoResponse: any, normalizedEmail: string) => {
    try {
      const createUserAccountResponse = await authInstance.signup(
        accountPreference,
        accountPreference == UserAccount.Customer
          ? {
              email: normalizedEmail,
              firstName: userInfoResponse.given_name || 'User',
              lastName: userInfoResponse.family_name || '',
              password: userInfoResponse.id,
            }
          : {
              businessEmail: normalizedEmail,
              countryID: 125,
              firstName: userInfoResponse.given_name || 'Business',
              lastName: userInfoResponse.family_name || 'User',
              password: userInfoResponse.id,
            }
      );
      
      setIsLoading(false);
      
      if (
        createUserAccountResponse.statusCode === 200 &&
        createUserAccountResponse.success === true &&
        createUserAccountResponse?.data?.otp
      ) {
        setOtp(createUserAccountResponse?.data?.otp);
        setShowVerifyEmailBottomsheet(true);
      } else {
        stateDispatch(
          updateToast({
            displayToast: true,
            toastMessage: createUserAccountResponse.message || 'Google sign-up failed. Please try again.',
            toastType: 'info',
          })
        );
      }
    } catch (error: any) {
      console.log('Google signup error:', error);
      setIsLoading(false);
      let errorMessage = 'Failed to create account with Google. Please try again.';
      
      if (error.message?.includes('already exists')) {
        errorMessage = 'This Google account is already registered. Please try logging in.';
      }
      
      stateDispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'info',
        })
      );
    }
  };

  const handleSignUp = () => {
    const formError = validateForm();
    if (formError) {
      stateDispatch(
        updateToast({
          displayToast: true,
          toastMessage: formError,
          toastType: 'info',
        })
      );
      return;
    }

    // Normalize email before validation
    const normalizedEmail = normalizeEmail(state.email);
    dispatch({
      type: 'SET_EMAIL',
      payload: normalizedEmail,
    });

    validateEmail(normalizedEmail);
  };

  const handleEmailChange = (text: string) => {
    // Auto-format email to lowercase as user types
    const normalizedEmail = normalizeEmail(text);
    dispatch({
      type: 'SET_EMAIL',
      payload: normalizedEmail,
    });
  };

  return (
    <CustomSafeArea statusBarColor={colors.appBackground()}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
          backgroundColor: colors.appBackground(),
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: size.getHeightSize(24),
            }}
          >
            <JompLogo size={size.getHeightSize(44)} />
            <JompTextLogo
              width={size.getWidthSize(155.27)}
              height={size.getHeightSize(30.19)}
            />
          </View>
          <CText
            fontSize={16}
            lineHeight={22}
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            Let's get you started!
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
              letterSpacing: size.getWidthSize(0.2),
            }}
          >
            Create an account on Jompstart to get started
          </CText>
          <View
            style={{
              marginTop: size.getHeightSize(32),
              gap: size.getHeightSize(16),
            }}
          >
            <CTextInput
              onChangeText={handleEmailChange}
              value={state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              title="Email Address"
              placeholder="example@mail.com"
              rightIcon={<MailIcon size={size.getHeightSize(24)} />}
            />
            <CTextInput
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_FIRST_NAME',
                  payload: text,
                })
              }
              value={state.firstName}
              keyboardType="default"
              title="First Name"
              placeholder="Enter your first name"
              rightIcon={
                <Ionicons
                  name="person"
                  color={colors.primary()}
                  size={size.getHeightSize(20)}
                />
              }
            />
            <CTextInput
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_LAST_NAME',
                  payload: text,
                })
              }
              value={state.lastName}
              title="Last Name"
              placeholder="Enter your last name"
              rightIcon={
                <Ionicons
                  name="person"
                  color={colors.primary()}
                  size={size.getHeightSize(20)}
                />
              }
            />
            <CTextInput
              title="Password"
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={state.password}
              onChangeText={(text) => {
                dispatch({
                  type: 'SET_PASSWORD',
                  payload: text,
                });

                setPassword(text);
                setPasswordValidation({
                  length: text.length >= 8,
                  uppercase: /[A-Z]/.test(text),
                  lowercase: /[a-z]/.test(text),
                  specialCharacter: /[^A-Za-z0-9]/.test(text),
                  number: /[0-9]/.test(text),
                });
              }}
              rightIcon={
                <Feather
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  name={showPassword ? 'eye' : 'eye-off'}
                  color={colors.primary()}
                  size={size.getHeightSize(24)}
                />
              }
            />
          </View>
          {password.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: size.getWidthSize(16),
                marginTop: size.getHeightSize(8),
              }}
            >
              <View
                style={{
                  flex: 1,
                  gap: size.getHeightSize(8),
                }}
              >
                <View style={styles.row}>
                  {passwordValidation.length ? (
                    <CheckIcon size={size.getHeightSize(16)} />
                  ) : (
                    <CancelIcon size={size.getHeightSize(16)} />
                  )}
                  <CText
                    color={passwordValidation.length ? 'success' : 'warning'}
                    fontSize={12}
                    lineHeight={16}
                  >
                    Minimum 8 characters
                  </CText>
                </View>

                <View style={styles.row}>
                  {passwordValidation.uppercase ? (
                    <CheckIcon size={size.getHeightSize(16)} />
                  ) : (
                    <CancelIcon size={size.getHeightSize(16)} />
                  )}
                  <CText
                    color={passwordValidation.uppercase ? 'success' : 'warning'}
                    fontSize={12}
                    lineHeight={16}
                  >
                    One uppercase character
                  </CText>
                </View>
                <View style={styles.row}>
                  {passwordValidation.lowercase ? (
                    <CheckIcon size={size.getHeightSize(16)} />
                  ) : (
                    <CancelIcon size={size.getHeightSize(16)} />
                  )}
                  <CText
                    color={passwordValidation.lowercase ? 'success' : 'warning'}
                    fontSize={12}
                    lineHeight={16}
                  >
                    One lowercase character
                  </CText>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  gap: size.getHeightSize(8),
                }}
              >
                <View style={styles.row}>
                  {passwordValidation.specialCharacter ? (
                    <CheckIcon size={size.getHeightSize(16)} />
                  ) : (
                    <CancelIcon size={size.getHeightSize(16)} />
                  )}
                  <CText
                    color={
                      passwordValidation.specialCharacter
                        ? 'success'
                        : 'warning'
                    }
                    fontSize={12}
                    lineHeight={16}
                  >
                    One special character
                  </CText>
                </View>
                <View style={styles.row}>
                  {passwordValidation.number ? (
                    <CheckIcon size={size.getHeightSize(16)} />
                  ) : (
                    <CancelIcon size={size.getHeightSize(16)} />
                  )}
                  <CText
                    color={passwordValidation.number ? 'success' : 'warning'}
                    fontSize={12}
                    lineHeight={16}
                  >
                    One number
                  </CText>
                </View>
              </View>
            </View>
          )}

          <View
            style={{
              marginTop: size.getHeightSize(16),
              gap: size.getHeightSize(8),
            }}
          >
            <CTextInput
              secureTextEntry={!showConfirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              title="Confirm password"
              placeholder="Password"
              rightIcon={
                <Feather
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  color={colors.primary()}
                  size={size.getHeightSize(24)}
                />
              }
            />

            {confirmPassword.length > 0 && confirmPassword !== password && (
              <View style={styles.row}>
                <CancelIcon size={size.getHeightSize(16)} />

                <CText color={'warning'} fontSize={12} lineHeight={16}>
                  Password does not match
                </CText>
              </View>
            )}
          </View>

          <PrimaryButton
            label="Get Started"
            onPress={handleSignUp}
            style={{
              marginTop: size.getHeightSize(24),
            }}
            disabled={
              !state.email ||
              !state.password ||
              !state.firstName ||
              !state.lastName ||
              !passwordValidation.length ||
              !passwordValidation.uppercase ||
              !passwordValidation.lowercase ||
              !passwordValidation.specialCharacter ||
              !passwordValidation.number ||
              state.password !== confirmPassword
            }
          />
          <View
            style={{
              marginTop: size.getHeightSize(26),
              width: '100%',
            }}
          >
            <View
              style={{
                width: '100%',
                height: size.getHeightSize(1),
                backgroundColor: '#E0E0E0',
              }}
            />
            <CText
              color="secondaryBlack"
              fontSize={14}
              lineHeight={19.6}
              fontFamily="semibold"
              style={{
                position: 'absolute',
                backgroundColor: colors.appBackground(),
                bottom: size.getHeightSize(-11),
                alignSelf: 'center',
                paddingHorizontal: size.getWidthSize(16),
              }}
            >
              OR
            </CText>
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(26),
              gap: size.getHeightSize(16),
            }}
          >
            <SecondaryButton
              onPress={() => {
                prompAsync();
              }}
              icon={<GoogleIcon size={size.getHeightSize(24)} />}
              label="Sign up with Google"
            />
            {Platform.OS == 'ios' && (
              <SecondaryButton
                onPress={async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });

                    if (credential?.identityToken) {
                      const decoded = jwtDecode(credential.identityToken);
                      // Handle Apple signup logic here
                      console.log('Apple signup successful:', decoded);
                    }
                  } catch (error: any) {
                    console.log('Apple signup error:', error);
                    if (error.code !== 'ERR_CANCELED') {
                      stateDispatch(
                        updateToast({
                          displayToast: true,
                          toastMessage: 'Apple sign-in failed. Please try again.',
                          toastType: 'info',
                        })
                      );
                    }
                  }
                }}
                icon={<AppleIcon size={size.getHeightSize(24)} />}
                label="Sign up with Apple"
              />
            )}
          </View>
          <CText
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            Already have an account?{' '}
            <CText
              onPress={() => {
                navigation.dispatch(StackActions.replace('Login'));
              }}
              color="secondary"
              fontFamily="semibold"
            >
              Login
            </CText>
          </CText>
        </KeyboardAwareScrollView>
      </View>
      <VerifyEmailBottomsheet
        onClose={() => {
          setShowVerifyEmailBottomsheet(false);
        }}
        otp={otp}
        onSuccess={() => {
          setShowVerifyEmailBottomsheet(false);
          setShowSuccessModal(true);
        }}
        email={state.email}
        isVisible={showVerifyEmailBottomsheet}
      />
      <SuccessModal
        onClose={() => {
          setShowSuccessModal(false);
        }}
        description="Your email address has been successfully verified, proceed to complete your onboarding details."
        buttonText="Okay"
        title="Email Verification Successful!"
        onContinue={() => {
          navigation.dispatch(StackActions.replace('Login'));
        }}
        visibility={showSucessModal}
      />
      <ShowLoader isLoading={isPending || isLoading} />
    </CustomSafeArea>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
  },
});