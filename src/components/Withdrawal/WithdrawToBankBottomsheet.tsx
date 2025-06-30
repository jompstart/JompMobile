import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { AuthService } from '../../services/auth';
import { formatToAmount } from '../../utils/stringManipulation';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { RequestPayoutDto } from '../../services/dto/user.dto';
import { UserService } from '../../services/user';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { updateToast } from '../../features/ui/ui.slice';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  recipientId?: string;
  amount?: string;
  onChangeText: (transferPurpose: string) => void;
}
const WithdrawToBankBottomsheet = ({
  isVisible,
  onSuccess,
  onClose,
  recipientId,
  amount,
  onChangeText,
}: Props) => {
  const authInstance = new AuthService();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [transferReason, setTransferReason] = React.useState('');
  const user = useAppSelector(userSelector);
  const userInstance = new UserService(user.customerId, user.userId);
  const {
    data,
    isPending,
    mutate: requestPayout,
  } = useMutation<API_RESPONSE<string>, Error, RequestPayoutDto>({
    mutationFn: (data) => userInstance.requestPayout(data),
    onSuccess: (res) => {
      if (res.success) {
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: 'Check OTP sent to your mail',
            toastType: 'success',
          })
        );
        onSuccess?.();
      }
    },
    onError: (err) => {
      //   dispatch(
      //     updateToast({
      //       displayToast: true,
      //       toastMessage: err.message,
      //       toastType: 'info',
      //     })
      //   );
    },
  });
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
        <View
          style={{
            marginTop: size.getHeightSize(12),
            marginBottom: size.getHeightSize(4),
          }}
        >
          <CancelIcon
            onPress={() => {
              onClose();
            }}
            style={{
              alignSelf: 'flex-end',
            }}
            size={size.getHeightSize(24)}
          />
        </View>
        <CText
          fontFamily="bold"
          fontSize={24}
          lineHeight={38}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Complete Transfer Details
        </CText>
        <View
          style={{
            alignSelf: 'center',
            paddingHorizontal: size.getWidthSize(8),
            marginTop: size.getHeightSize(16),
            backgroundColor: colors.primary('10'),
            borderRadius: size.getHeightSize(5),
          }}
        >
          <CText
            fontFamily="bold"
            fontSize={24}
            lineHeight={38}
            color="primaryColor"
            style={{}}
          >
            ₦{formatToAmount(amount || '0')}
          </CText>
        </View>
        <CText
          color="secondaryBlack"
          fontFamily="regular"
          fontSize={14}
          lineHeight={19.6}
          style={{
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(4),
          }}
        >
          Recipient ID
        </CText>
        <View
          style={{
            borderWidth: size.getHeightSize(1),
            borderRadius: size.getHeightSize(5),
            paddingVertical: size.getHeightSize(12),
            paddingHorizontal: size.getWidthSize(16),
            borderColor: colors.black('50'),
            backgroundColor: colors.black('10'),
          }}
        >
          <CText
            color="secondaryBlack"
            fontFamily="regular"
            fontSize={16}
            lineHeight={20}
          >
            {recipientId}
          </CText>
        </View>
        <CText
          style={{
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(8),
          }}
          color="secondaryBlack"
          fontSize={14}
          lineHeight={19.6}
        >
          Purpose of transfer
        </CText>
        <View
          style={{
            borderWidth: size.getHeightSize(1),
            borderRadius: size.getHeightSize(8),
            borderColor: colors.black('50'),
            backgroundColor: colors.black('10'),
            paddingHorizontal: size.getWidthSize(16),
            height: size.getHeightSize(150),
          }}
        >
          <BottomSheetTextInput
            textAlignVertical="top"
            multiline
            cursorColor={colors.primary()}
            placeholder="Enter purpose of transfer"
            style={styles.input}
            onChangeText={(text) => {
              setTransferReason(text);
              onChangeText(text);
            }}
          />
        </View>
        <PrimaryButton
          onPress={() => {
            requestPayout({
              amountInKobo: amount!,
              reason: transferReason,
              recipientCode: recipientId!,
            });
          }}
          disabled={!transferReason}
          isLoading={isPending}
          style={{
            marginTop: size.getHeightSize(32),
            paddingVertical: size.getHeightSize(15.5),
          }}
          label="Submit Transfer"
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default WithdrawToBankBottomsheet;
const styles = StyleSheet.create({
  input: {
    height: size.getHeightSize(150),

    fontFamily: 'AvenirLTStd-Medium',
    fontSize: size.fontSize(16),
    color: colors.black(),
    paddingVertical: size.getHeightSize(16),
  },
});
