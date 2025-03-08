import { Pressable, StyleSheet, View } from 'react-native';
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
import LockIcon from '../../../assets/svgs/Onboarding/LockIcon';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import FacebookIcon from '../../../assets/svgs/Onboarding/FacebookIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import ForgotPasswordModal from '../../components/auth/ForgotPasswordModal';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../controller/redux.controller';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import ShowLoader from '../../shared/ShowLoader';
import { updateUserState } from '../../features/user/user.slice';
import SuccessModal from '../../shared/SuccessModal';
import { obfuscateEmail } from '../../utils/stringManipulation';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState<any>();
  const [request, response, prompAsync] = Google.useAuthRequest({
    androidClientId:
      '801607727056-tfa731fpcvcn45qjlbso5rutbffvi891.apps.googleusercontent.com',
    iosClientId:
      '801607727056-4praconm2f06hvvek28slfenq30gpoer.apps.googleusercontent.com',
  });
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const getUserInfo = async (accessToken: string) => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfoResponse = await response.json();
    console.log('========= userInfoResponse here ======');
    console.log(userInfoResponse);
    setUserInfo(userInfoResponse);
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('========= authentication here ======');
      console.log(authentication?.accessToken);
      getUserInfo(authentication?.accessToken!);
    }
  }, [response]);
  const authInstance = new AuthService();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: authInstance.login,
    onSuccess: async (data) => {
      try {
        console.log('========= login data here ======');
        console.log(data);
        if (data.statusCode === 200 && data.success === true) {
          const decoded: any = jwtDecode(data.data?.token!);
          console.log('========= decoded here ======');
          console.log(decoded);
          await AsyncStorage.setItem('token', data.data?.token!);
          dispatch(
            updateUserState({
              accountPreference: decoded.clientId,
              token: data.data?.token!,
              customerId: decoded.customerId,
              userId: decoded.UserId,
            })
          );
          if (data.data?.complianceStatus == false) {
            navigation.navigate('Verification');
          }
          // const userInstance = new UserService(decoded.userId);
          // const user = await userInstance.getCustomer();

          // console.log('========= user here ======');
          // console.log(user);
        }
      } catch (error) {
        console.log('========= login error here ======');
        console.log(error);
      }
    },
    onError: (error) => {
      console.log('========= login error here ======');
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
            Welcome Back!
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
            Complete the fields below to continue enjoying Jompstart
          </CText>
          <View
            style={{
              marginTop: size.getHeightSize(32),
              gap: size.getHeightSize(16),
            }}
          >
            <CTextInput
              keyboardType="email-address"
              onChangeText={setEmail}
              title="Email Address"
              placeholder="@mail.com"
              rightIcon={<MailIcon size={size.getHeightSize(24)} />}
            />
            <CTextInput
              secureTextEntry
              onChangeText={setPassword}
              title="Password"
              placeholder="Password"
              rightIcon={<LockIcon size={size.getHeightSize(24)} />}
            />
          </View>
          <Pressable
            onPress={() => {
              setShowForgotPasswordModal(true);
            }}
            style={{
              gap: size.getWidthSize(16),
              marginTop: size.getHeightSize(8),
              alignSelf: 'flex-end',
            }}
          >
            <CText fontSize={14} lineHeight={19} color="warning">
              Forgot Password?
            </CText>
          </Pressable>
          <PrimaryButton
            disabled={!email || !password}
            label="Login"
            style={{
              marginTop: size.getHeightSize(24),
            }}
            onPress={() => {
              loginUser({
                email,
                password,
              });
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
              onPress={() => {
                prompAsync();
              }}
              icon={<GoogleIcon size={size.getHeightSize(24)} />}
              label="Login with Google"
            />
            <SecondaryButton
              icon={<AppleIcon size={size.getHeightSize(24)} />}
              label="Login with Apple"
            />
            <SecondaryButton
              icon={<FacebookIcon size={size.getHeightSize(24)} />}
              label="Login with Facebook"
            />
          </View>
          <CText
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            Don't have an account?{' '}
            <CText
              onPress={() => {
                navigation.navigate('AccountPreference');
              }}
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
          setShowSuccessModal(true);
        }}
        onClose={() => {
          setShowForgotPasswordModal(false);
        }}
        isVisible={showForgotPasswordModal}
      />
      <ShowLoader isLoading={isPending} />
      <SuccessModal
        visibility={showSuccessModal}
        buttonText="Okay"
        description={`Your password reset email has been successfully sent to ${obfuscateEmail(
          resetPasswordEmail
        )}, kindly proceed to click on the link in the password reset email.`}
        title="Email Successfully Sent"
        onClose={() => {
          setShowSuccessModal(false);
        }}
        onContinue={() => {
          setShowSuccessModal(false);
        }}
      />
    </CustomSafeArea>
  );
};

export default Login;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
  },
});
