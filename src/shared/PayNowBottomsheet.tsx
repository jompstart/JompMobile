import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import BottomsheetWrapper from './BottomsheetWrapper';
import { size } from '../config/size';
import CText from './CText';
import { useAppSelector, useAppDispatch } from '../controller/redux.controller';
import {
  updateAccountDetailsBottomsheetVisibility,
  updatePayNowBottomsheet,
  updatePayStackModal,
} from '../features/ui/ui.slice';
import { payNowBottomsheetSelector } from '../features/ui/ui.selector';
import AntDesign from '@expo/vector-icons/AntDesign';
import { userSelector } from '../features/user/user.selector';
import { formatToAmount } from '../utils/stringManipulation';
import { colors } from '../constants/colors';
import InfoIcon from '../../assets/svgs/support/InfoIcon';
import { API_RESPONSE } from '../types';
import {
  MakePaymentDto,
  MakePaymnetApiResponse,
} from '../services/providers/provider.dto';
import { ProviderService } from '../services/providers/provider';
import { useMutation } from '@tanstack/react-query';
const PayNowBottomsheet = () => {
  const paymentSheet = useAppSelector(payNowBottomsheetSelector);

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const { mutate: payNow, isPending: isPaymentPending } = useMutation<
    API_RESPONSE<MakePaymnetApiResponse>,
    Error,
    MakePaymentDto
  >({
    mutationFn: async (data) => providerInstance.makePayment(data),
    onSuccess: (response) => {
      if (response.success) {
        dispatch(
          updatePayStackModal({
            visible: true,
            url: response.data?.paymentUrl || '',
          })
        );
      }
    },
    onError: (error) => {
      console.error('Error making payment:', error);
    },
  });

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={paymentSheet.visible}
      onClose={() => {
        dispatch(
          updatePayNowBottomsheet({
            amount: 0,
            visible: false,
          })
        );
      }}
    >
      <View
        style={{
          paddingTop: size.getHeightSize(24),
          gap: size.getHeightSize(16),
        }}
      >
        <Pressable
          onPress={() => {
            if (paymentSheet.amount < user.balance) {
              dispatch(
                updateAccountDetailsBottomsheetVisibility({
                  isVisible: true,
                  shouldConfirmTransfer: true,
                })
              );
            }
          }}
          style={styles.row}
        >
          <View style={styles.view}>
            <CText fontFamily="bold" fontSize={16} lineHeight={24}>
              Pay with your JOMP wallet
            </CText>
            <CText
              color="secondaryBlack"
              fontFamily="semibold"
              fontSize={15}
              lineHeight={20}
            >
              Wallet Balance: ₦{formatToAmount(user?.balance)}
            </CText>
            {paymentSheet.amount > user.balance && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: size.getWidthSize(4),
                  flex: 1,
                }}
              >
                <InfoIcon size={size.getHeightSize(16)} />
                <CText
                  color="primaryColor"
                  fontFamily="semibold"
                  fontSize={15}
                  lineHeight={20}
                  style={{
                    flex: 1,
                  }}
                >
                  Please fund your wallet to complete this payment.
                </CText>
              </View>
            )}
          </View>
          <AntDesign
            name="right"
            color={colors.primary()}
            size={size.getHeightSize(20)}
          />
        </Pressable>
        <Pressable
          disabled={isPaymentPending}
          onPress={() => {
            payNow({
              amount: paymentSheet.amount,
              loanAgreement: true,
            });
          }}
          style={styles.row}
        >
          <View style={styles.view}>
            <CText fontFamily="bold" fontSize={16} lineHeight={24}>
              Pay with Card
            </CText>
            <CText
              color="secondaryBlack"
              fontFamily="semibold"
              fontSize={15}
              lineHeight={20}
            >
              Securely pay using your debit or credit card.
            </CText>
          </View>
          {isPaymentPending ? (
            <ActivityIndicator
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          ) : (
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          )}
        </Pressable>
      </View>
    </BottomsheetWrapper>
  );
};

export default PayNowBottomsheet;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: size.getHeightSize(1),
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(12),
    borderRadius: size.getHeightSize(8),
    borderColor: colors.idle('50'),
  },
  view: {
    gap: size.getHeightSize(4),
    flex: 1,
  },
});
