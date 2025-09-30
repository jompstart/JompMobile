import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import ForgotPasswordLockIcon from '../../../assets/svgs/Onboarding/ForgotPasswordLockIcon';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import { AuthService } from '../../services/auth';
import { useAppDispatch } from '../../controller/redux.controller';
import { updateToast } from '../../features/ui/ui.slice';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onChangeText?: (text: string) => void;
}

const ForgotPasswordModal = ({
  isVisible,
  onSuccess,
  onClose,
  onChangeText,
}: Props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authInstance = new AuthService();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await authInstance.forgotPassword(email);

      if (response.statusCode === 200 && response.success) {
        onSuccess?.();
      } else {
        // Show toast if API returns failure
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: response.message || 'Email not found',
            toastType: 'info',
          })
        );
      }
    } catch (error: any) {
      console.log('Forgot password error:', error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage:
            error?.response?.data?.message ||
            'Email not found, please try again.',
          toastType: 'info',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={onClose}
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
            numberOfLines={1}
            placeholder="@mail.com"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              onChangeText?.(text);
            }}
          />
          <MailIcon size={size.getHeightSize(24)} />
        </View>

        {/* Show error if email not found */}
      

        <PrimaryButton
          onPress={handleForgotPassword}
          disabled={!email}
          isLoading={isLoading}
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
          <CText
            onPress={onClose}
            color="secondary"
            fontFamily="semibold"
          >
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
