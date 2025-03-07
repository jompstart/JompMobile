import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CTextInput from '../../shared/CTextInput';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import LockIcon from '../../../assets/svgs/Onboarding/LockIcon';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import FacebookIcon from '../../../assets/svgs/Onboarding/FacebookIcon';
import ForgotPasswordModal from '../../components/auth/ForgotPasswordModal';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigation = useNavigation();
  return (
    <CustomSafeArea statusBarColor={colors.appBackground()}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
          backgroundColor: colors.appBackground(),
        }}
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
            title="Email Address"
            placeholder="@mail.com"
            rightIcon={<MailIcon size={size.getHeightSize(24)} />}
          />
          <CTextInput
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
          label="Get Started"
          style={{
            marginTop: size.getHeightSize(24),
          }}
          onPress={() => navigation.navigate('VerifyBvn')}
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
          <CText color="secondary" fontFamily="semibold">
            Get Started
          </CText>
        </CText>
        <ForgotPasswordModal
          onClose={() => {
            setShowForgotPasswordModal(false);
          }}
          isVisible={showForgotPasswordModal}
        />
      </View>
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
