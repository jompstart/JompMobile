import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import CText from '../../shared/CText';
import CTextInput from '../../shared/CTextInput';
import InfoIcon from '../../../assets/svgs/Onboarding/InfoIcon';
import { ScrollView } from 'react-native-gesture-handler';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import SecondaryButton from '../../shared/SecondaryButton';
import PrimaryButton from '../../shared/PrimaryButton';
import SuccessModal from '../../shared/SuccessModal';
import { useNavigation } from '@react-navigation/native';

const Verification = () => {
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
          BVN Verification
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
          Please provide your BVN to verify your identity
        </CText>
        <View
          style={{
            flex: 1,
          }}
        />
        <PrimaryButton
          style={{
            marginBottom: size.getHeightSize(40),
          }}
          label="Continue"
          onPress={() => {
            navigation.navigate('VerifyBvn');
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default Verification;

const styles = StyleSheet.create({});