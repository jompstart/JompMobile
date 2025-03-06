import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import VerifyMailIcon from '../../../assets/svgs/Onboarding/VerifyMailIcon';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';

interface Props {
  isVisible: boolean;
}
const VerifyEmailBottomsheet = ({ isVisible }: Props) => {
  const inputRefs = useRef<TextInput[]>([]);
  const handleTextChange = (text: string, index: number) => {
    if (text.length === 1) {
      // Move to the next input when a single character is entered
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (text.length > 1) {
      // Clear existing inputs before inserting new characters
      inputRefs.current.forEach((input) => input.setNativeProps({ text: '' }));

      // Distribute characters across inputs
      const characters = text.split('');
      characters.forEach((char, charIndex) => {
        if (inputRefs.current[index + charIndex]) {
          inputRefs.current[index + charIndex].setNativeProps({ text: char });
        }
      });

      // Move focus to the last filled input
      const nextIndex = index + characters.length;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    } else if (text.length === 0 && index > 0) {
      // Move to the previous input on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      index > 0 &&
      !inputRefs.current[index].props?.value
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (event: any) => {
    const pastedText = event.nativeEvent.text;
    if (pastedText.length === inputRefs.current.length) {
      inputRefs.current.forEach((input, index) => {
        input.setNativeProps({ text: pastedText[index] });
      });
    }
  };
  return (
    <BottomsheetWrapper
      enableBackdrop
      visibility={isVisible}
      onClose={() => {}}
    >
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
          Email Verification
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
          Please enter the code sent to tun******li@gmail.com
        </CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
            alignSelf: 'center',
            marginTop: size.getHeightSize(24),
          }}
        >
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <BottomSheetTextInput
                cursorColor={colors.black()}
                keyboardType="number-pad"
                ref={(ref) => (inputRefs.current[index] = ref!)}
                key={index}
                maxLength={1}
                placeholder="_"
                onKeyPress={(e) => handleKeyPress(e, index)}
                style={styles.otpInput}
                onChangeText={(text) => handleTextChange(text, index)}
              />
            ))}
        </View>
        <PrimaryButton
          style={{
            marginTop: size.getHeightSize(32),
          }}
          label="Verify"
        />
        <CText
          fontFamily="semibold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Didn't receive the email?{' '}
          <CText color="secondary" fontFamily="semibold">
            Click to Resend
          </CText>
        </CText>
      </View>
    </BottomsheetWrapper>
  );
};

export default VerifyEmailBottomsheet;

const styles = StyleSheet.create({
  otpInput: {
    height: size.getHeightSize(56),
    width: size.getWidthSize(48),
    borderWidth: size.getHeightSize(1.5),
    borderRadius: size.getHeightSize(4),
    borderColor: colors.black('50'),
    shadowColor: '#31005C26',
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: size.fontSize(32),
    textAlign: 'center',
  },
});
