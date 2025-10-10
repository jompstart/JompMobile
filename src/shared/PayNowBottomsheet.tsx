import { StyleSheet, View, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect } from 'react';
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
import { API_RESPONSE, MakePaymentDto, MakePaymentApiResponse, PayWithWalletDto, VerifyPaymentResponse } from '../services/providers/provider.dto';
import { ProviderService } from '../services/providers/provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import ShowLoader from './ShowLoader';

const PayNowBottomsheet = () => {
  const paymentSheet = useAppSelector(payNowBottomsheetSelector);
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const queryClient = useQueryClient();
  const providerInstance = new ProviderService(user.userId, user.customerId);

  // Debug paymentSheet
  useEffect(() => {
    console.log("PayNowBottomsheet paymentSheet:", paymentSheet);
  }, [paymentSheet]);

  const { mutate: payNow, isPending: isPaymentPending } = useMutation<
    API_RESPONSE<MakePaymentApiResponse>,
    Error,
    MakePaymentDto
  >({
    mutationFn: async (data) => {
      console.log('Sending payment request:', { customerId: user.customerId, ...data });
      const maxRetries = 3;
      let attempt = 0;
      while (attempt < maxRetries) {
        try {
          return await providerInstance.makePayment(data);
        } catch (error) {
          attempt++;
          console.warn(`Payment attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    },
    onSuccess: (response) => {
      console.log('Payment response:', response);
      queryClient.invalidateQueries({ queryKey: ['refreschUserData', 'transactions', user.customerId, 'pendingAdminReview'] });
      if (response.success && response.data?.paymentUrl) {
        dispatch(
          updatePayStackModal({
            visible: true,
            url: response.data.paymentUrl,
          })
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to initiate payment');
      }
    },
    onError: (error: any) => {
      console.error('Error making payment:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Error', error.response?.data?.message || 'Failed to initiate payment. Please try again.');
    },
  });

  const { mutate: verifyPayment, isPending: isVerificationPending } = useMutation<
    API_RESPONSE<VerifyPaymentResponse>,
    Error,
    string
  >({
    mutationFn: async (reference) => providerInstance.verifyPayment(reference),
    onSuccess: (response) => {
      console.log('Payment verification response:', response);
      queryClient.invalidateQueries({ queryKey: ['transactions', user.customerId, 'pendingAdminReview'] });
      if (response.success) {
        dispatch(
          updatePayNowBottomsheet({
            amount: 0,
            visible: false,
            serviceId: '',
          })
        );
        navigate('SuccessPage', {
          message: response.data?.message || 'Payment completed successfully',
        });
      } else {
        Alert.alert('Error', response.message || 'Payment verification failed');
      }
    },
    onError: (error: any) => {
      console.error('Error verifying payment:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Error', 'Failed to verify payment. Please try again.');
    },
  });

  const { mutate: payWithWallet, isPending: payWithWalletLoading } = useMutation<
    API_RESPONSE<MakePaymentApiResponse>,
    Error,
    PayWithWalletDto
  >({
    mutationFn: async (data) => {
      console.log('Sending wallet payment request:', { customerId: user.customerId, ...data });
      return providerInstance.makePaymentWithWallet(data);
    },
    onSuccess: (response) => {
      console.log('Wallet payment response:', response);
      queryClient.invalidateQueries({ queryKey: ['refreschUserData', 'transactions', user.customerId, 'pendingAdminReview'] });
      if (response.success) {
        dispatch(
          updatePayNowBottomsheet({
            amount: 0,
            visible: false,
            serviceId: '',
          })
        );
        navigate('SuccessPage', {
          message: response.data?.message || 'Wallet payment successful',
        });
      } else {
        Alert.alert('Error', response.message || 'Wallet payment failed');
      }
    },
    onError: (error: any) => {
      console.error('Error making wallet payment:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Error', 'Failed to process wallet payment. Please try again.');
    },
  });

  const handlePaymentCallback = (reference: string) => {
    if (reference) {
      console.log('Verifying payment with reference:', reference);
      verifyPayment(reference);
    } else {
      Alert.alert('Error', 'No payment reference provided');
    }
  };

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
            serviceId: '',
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
            if (!paymentSheet.amount || paymentSheet.amount <= 0) {
              Alert.alert('Error', 'Invalid payment amount');
              return;
            }
            if (paymentSheet.amount > user.balance) {
              Alert.alert('Insufficient Balance', 'Please fund your wallet to complete this payment.');
              return;
            }
            dispatch(
              updateAccountDetailsBottomsheetVisibility({
                isVisible: true,
                shouldConfirmTransfer: true,
              })
            );
          }}
          style={styles.row}
        >
          <Pressable
            disabled={payWithWalletLoading}
            onPress={() => {
              if (!paymentSheet.serviceId) {
                Alert.alert('Error', 'Service ID is required for wallet payment');
                return;
              }
              payWithWallet({
                serviceId: paymentSheet.serviceId,
                amount: paymentSheet.amount,
                loanAgreement: true,
              });
            }}
            style={styles.view}
          >
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
                  style={{ flex: 1 }}
                >
                  Please fund your wallet to complete this payment.
                </CText>
              </View>
            )}
          </Pressable>
          {payWithWalletLoading ? (
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
        <Pressable
          disabled={isPaymentPending || isVerificationPending}
          onPress={() => {
            if (!paymentSheet.amount || paymentSheet.amount <= 0) {
              Alert.alert('Error', 'Invalid payment amount');
              return;
            }
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
          {isPaymentPending || isVerificationPending ? (
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
      <ShowLoader isLoading={isPaymentPending || payWithWalletLoading || isVerificationPending} />
    </BottomsheetWrapper>
  );
};

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

export default PayNowBottomsheet;