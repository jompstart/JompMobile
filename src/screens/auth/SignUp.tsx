import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CheckIcon from '../../../assets/svgs/Onboarding/CheckIcon';
import CancelIcon from '../../../assets/svgs/Onboarding/CancelIcon';
import CTextInput from '../../shared/CTextInput';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import LockIcon from '../../../assets/svgs/Onboarding/LockIcon';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import SecondaryButton from '../../shared/SecondaryButtonWithIcon';
import GoogleIcon from '../../../assets/svgs/Onboarding/GoogleIcon';
import AppleIcon from '../../../assets/svgs/Onboarding/AppleIcon';
import FacebookIcon from '../../../assets/svgs/Onboarding/FacebookIcon';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(20),
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
                <CancelIcon size={size.getHeightSize(16)} />
                <CText color="warning" fontSize={12} lineHeight={16}>
                  Minimum 8 characters
                </CText>
              </View>

              <View style={styles.row}>
                <CancelIcon size={size.getHeightSize(16)} />
                <CText color="warning" fontSize={12} lineHeight={16}>
                  One uppercase character
                </CText>
              </View>
              <View style={styles.row}>
                <CancelIcon size={size.getHeightSize(16)} />
                <CText color="warning" fontSize={12} lineHeight={16}>
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
                <CancelIcon size={size.getHeightSize(16)} />
                <CText color="warning" fontSize={12} lineHeight={16}>
                  One special character
                </CText>
              </View>
              <View style={styles.row}>
                <CheckIcon size={size.getHeightSize(16)} />
                <CText color="success" fontSize={12} lineHeight={16}>
                  One number
                </CText>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(16),
            }}
          >
            <CTextInput
              title="Confirm password"
              placeholder="Password"
              rightIcon={<LockIcon size={size.getHeightSize(24)} />}
            />
          </View>
          <PrimaryButton
            label="Get Started"
            onPress={()=>{
              navigation.navigate('AccountPreference')
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
        </ScrollView>
      </View>
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
