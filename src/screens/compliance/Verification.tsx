import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import CText from '../../shared/CText';
import Fontisto from '@expo/vector-icons/Fontisto';
import CTextInput from '../../shared/CTextInput';
import InfoIcon from '../../../assets/svgs/Onboarding/InfoIcon';
import { ScrollView } from 'react-native-gesture-handler';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import SecondaryButton from '../../shared/SecondaryButton';
import PrimaryButton from '../../shared/PrimaryButton';
import SuccessModal from '../../shared/SuccessModal';
import { useNavigation } from '@react-navigation/native';
const Verification = () => {
  const [verificationType, setVerificationType] = useState<
    'nin' | 'bvn' | null
  >(null);
  const navigation = useNavigation();
  return (
    <CustomSafeArea statusBarColor={colors.appBackground()}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
          backgroundColor: colors.appBackground(),
          paddingTop: size.getHeightSize(40),
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
          Compliance Details
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
          Select the method that helps us verify your identity and keeps your
          account from fraud
        </CText>
        <View
          style={{
            gap: size.getHeightSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              setVerificationType('nin');
            }}
            style={styles.view}
          >
            <Fontisto
              size={size.getHeightSize(18)}
              color={
                verificationType === 'nin'
                  ? colors.primary()
                  : colors.idle('90')
              }
              name={
                verificationType === 'nin'
                  ? 'radio-btn-active'
                  : 'radio-btn-passive'
              }
            />
            <CText
              color="black"
              fontSize={18}
              lineHeight={23.6}
              fontFamily="semibold"
            >
              NIN{' '}
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              setVerificationType('bvn');
            }}
            style={styles.view}
          >
            <Fontisto
              size={size.getHeightSize(18)}
              color={
                verificationType === 'bvn'
                  ? colors.primary()
                  : colors.idle('90')
              }
              name={
                verificationType === 'bvn'
                  ? 'radio-btn-active'
                  : 'radio-btn-passive'
              }
            />
            <CText
              color="black"
              fontSize={18}
              lineHeight={23.6}
              fontFamily="semibold"
            >
              BVN{' '}
            </CText>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <PrimaryButton
          disabled={!verificationType}
          style={{
            marginBottom: size.getHeightSize(40),
          }}
          label="Continue"
          onPress={() => {
            verificationType === 'nin'
              ? navigation.navigate('VerifyNin')
              : navigation.navigate('VerifyBvn');
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default Verification;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    paddingVertical: size.getHeightSize(16),
    backgroundColor: colors.black('05'),
    paddingHorizontal: size.getWidthSize(16),
    borderRadius: size.getHeightSize(8),
  },
});
