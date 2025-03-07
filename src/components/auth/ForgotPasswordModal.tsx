import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import VerifyMailIcon from '../../../assets/svgs/Onboarding/VerifyMailIcon';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import ForgotPasswordLockIcon from '../../../assets/svgs/Onboarding/ForgotPasswordLockIcon';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
interface Props {
  isVisible: boolean;
  onClose: () => void;
}
const ForgotPasswordModal = ({ isVisible, onClose }: Props) => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={() => {
        onClose();
      }}
    >
      <View>
        <ForgotPasswordLockIcon
          style={{
            alignSelf: 'center',
            marginTop: size.getHeightSize(40),
          }}
          size={size.getHeightSize(160)}
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
          Forgot Password?
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
          Please enter your registered email to reset your password.
        </CText>
        <CText
          style={{
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(8),
          }}
          color="secondaryBlack"
          fontSize={14}
          lineHeight={19.6}
        >
          Email Address
        </CText>
        <View
          style={{
            borderWidth: size.getHeightSize(1),
            borderRadius: size.getHeightSize(8),
            borderColor: colors.black('50'),
            backgroundColor: colors.black('30'),
            paddingHorizontal: size.getWidthSize(16),
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <BottomSheetTextInput
            cursorColor={colors.black()}
            maxLength={1}
            placeholder="@mail.com"
            style={styles.input}
          />
          <MailIcon size={size.getHeightSize(24)} />
        </View>
        <PrimaryButton
          style={{
            marginTop: size.getHeightSize(32),
            paddingVertical: size.getHeightSize(15.5),
          }}
          label="Submit"
        />
        <CText
          fontFamily="semibold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Remember your login password?{' '}
          <CText color="secondary" fontFamily="semibold">
            Login
          </CText>
        </CText>
      </View>
    </BottomsheetWrapper>
  );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
  input: {
    height: size.getHeightSize(50),
    flex: 1,
    shadowColor: '#31005C26',
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: size.fontSize(16),
    color: colors.black(),
  },
});
