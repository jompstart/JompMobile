import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import CText from '../../shared/CText';
import Avatar2 from '../../../assets/svgs/Onboarding/Avatar2';
import Avatar1 from '../../../assets/svgs/Onboarding/Avatar1';
import PrimaryButton from '../../shared/PrimaryButton';
import VerifyEmailBottomsheet from '../../components/auth/VerifyEmailBottomsheet';
import EmailVerificationSuccessModal from '../../components/auth/EmailVerificationSuccessModal';
import { useNavigation } from '@react-navigation/native';

const AccountPreference = () => {
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
            marginBottom: size.getHeightSize(32),
          }}
        >
          Please select account preference
        </CText>
        <View style={styles.view1}>
          <View
            style={[
              styles.view2,
              {
                backgroundColor: colors.appBackground(),
              },
            ]}
          >
            <View style={styles.view3} />
            <View
              style={{
                flex: 1,
              }}
            >
              <CText
                fontFamily="semibold"
                color="secondaryBlack"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                Customer
              </CText>
              <CText
                fontSize={12}
                lineHeight={17}
                fontFamily="semibold"
                color="secondaryBlack"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                Select this to register as a customer
              </CText>
            </View>
            <Avatar1 size={size.getHeightSize(46)} />
          </View>
        </View>
        <View style={styles.view1}>
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#00944407',
              },
            ]}
          >
            <View style={styles.view3} />
            <View
              style={{
                flex: 1,
              }}
            >
              <CText
                fontFamily="semibold"
                color="secondaryBlack"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                Customer
              </CText>
              <CText
                fontSize={12}
                lineHeight={17}
                fontFamily="semibold"
                color="secondaryBlack"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                Select this to register as a customer
              </CText>
            </View>
            <Avatar2 size={size.getHeightSize(46)} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <PrimaryButton
          label="Get Started"
          style={{ marginBottom: size.getHeightSize(40) }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <VerifyEmailBottomsheet />
        <EmailVerificationSuccessModal />
      </View>
    </CustomSafeArea>
  );
};

export default AccountPreference;

const styles = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    backgroundColor: colors.appBackground(),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
  },
  view3: {
    height: size.getHeightSize(18),
    width: size.getHeightSize(18),
    borderRadius: size.getHeightSize(200),
    borderColor: '#333333',
    borderWidth: size.getHeightSize(2),
  },
});
