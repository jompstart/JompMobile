import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import VerifyMailIcon from '../../../assets/svgs/Onboarding/VerifyMailIcon';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';

const EmailVerificationSuccessModal = () => {
  return (
    <BottomsheetWrapper enableBackdrop visibility={false} onClose={() => {}}>
      <View>
        <VerifyMailIcon
          style={{
            alignSelf: 'center',
            marginTop: size.getHeightSize(40),
          }}
          size={size.getHeightSize(128)}
        />
        <CText
          fontFamily="bold"
          fontSize={24}
          lineHeight={38}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Email Verification Successfully!
        </CText>
        <CText
          color="secondaryBlack"
          fontFamily="regular"
          fontSize={16}
          lineHeight={22}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Your email address has been successfully verified, proceed to complete
          your onboarding details.
        </CText>

        <PrimaryButton
          style={{
            marginTop: size.getHeightSize(32),
          }}
          label="Okay"
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default EmailVerificationSuccessModal;

const styles = StyleSheet.create({});
