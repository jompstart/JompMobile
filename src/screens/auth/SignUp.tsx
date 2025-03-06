import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect, useReducer } from 'react';
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
import LockIcon from '../../../assets/svgs/Onboarding/LockIcon';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import VerifyEmailBottomsheet from '../../components/auth/VerifyEmailBottomsheet';
import PhoneIcon from '../../../assets/svgs/Dashboard/PhoneIcon';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import FacebookIcon from '../../../assets/svgs/Onboarding/FacebookIcon';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { SignupScreenProps } from '../../types/navigations.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthService } from '../../services/auth';
import {
  signUpFormReducer,
  signUpInitailState,
} from '../../features/signup_onboarding/onboarding.reducers';
const SignUp = ({
  route: {
    params: { accountPreference },
  },
}: SignupScreenProps) => {
  //https://github.dev/jompstart/jomp_frontend/blob/main/src/api/axios.ts
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
  const [showVerifyEmailBottomsheet, setShowVerifyEmailBottomsheet] =
    useState(false);

  const [state, dispatch] = useReducer(signUpFormReducer, signUpInitailState);
  const navigation = useNavigation();
  const authInstance = new AuthService();
  const { mutate: validateEmail } = useMutation({
    mutationFn: authInstance.validateEmail,
    onSuccess: async (data) => {
      try {
        console.log('========= otp response here ======');
        console.log(data.message);

        if (data.statusCode === 200 && data.success === true) {
          const resendOtpResponse = await authInstance.resendOTP(state.email);
          console.log('======= otp response here ======');
          console.log(state.email);
          console.log(resendOtpResponse);
        }
      } catch (error) {
        console.log('========= otp error here ======');
        console.log(error);
      }
    },
    onError: (error) => {
      console.log('========= otp error here ======');
      console.log(error);
    },
  });

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
          extraScrollHeight={size.getHeightSize(16)}
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
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_EMAIL',
                  payload: text,
                })
              }
              keyboardType="email-address"
              title="Email Address"
              placeholder="@mail.com"
              rightIcon={<MailIcon size={size.getHeightSize(24)} />}
            />
            <CTextInput
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_FIRST_NAME',
                  payload: text,
                })
              }
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
              secureTextEntry
              placeholder="Password"
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
              rightIcon={<LockIcon size={size.getHeightSize(24)} />}
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
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              title="Confirm password"
              placeholder="Password"
              rightIcon={<LockIcon size={size.getHeightSize(24)} />}
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
            onPress={() => {
              validateEmail(state.email);
            }}
            style={{
              marginTop: size.getHeightSize(24),
            }}
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
              icon={<GoogleIcon size={size.getHeightSize(24)} />}
              label="Sign up with Google"
            />
            <SecondaryButton
              icon={<AppleIcon size={size.getHeightSize(24)} />}
              label="Sign up with Apple"
            />
            <SecondaryButton
              icon={<FacebookIcon size={size.getHeightSize(24)} />}
              label="Sign up with Facebook"
            />
          </View>
          <CText
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            Already have an account?{' '}
            <CText color="secondary" fontFamily="semibold">
              Login
            </CText>
          </CText>
        </KeyboardAwareScrollView>
      </View>
      <VerifyEmailBottomsheet isVisible={showVerifyEmailBottomsheet} />
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
