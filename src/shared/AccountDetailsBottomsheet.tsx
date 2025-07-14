import { StyleSheet, Pressable, View } from 'react-native';
import React, { useEffect } from 'react';
import ScrollablebottomsheetWrapper from './ScrollablebottomsheetWrapper';
import { colors } from '../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import { useAppDispatch } from '../controller/redux.controller';
import {
  updateAccountDetailsBottomsheetVisibility,
  updatePayNowBottomsheet,
  updatePayStackModal,
  updateToast,
} from '../features/ui/ui.slice';
import CText from './CText';
import { size } from '../config/size';
import BankIcon from '../../assets/svgs/Home/BankIcon';
import PersonIcon from '../../assets/svgs/Dashboard/PersonIcon';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CancelIcon from '../../assets/svgs/Home/CancelIcon';
import ProviderIcon from '../../assets/svgs/Services/ProviderIcon';
import { useAppSelector } from '../controller/redux.controller';
import { userSelector } from '../features/user/user.selector';
import {
  accountDetailsBottomsheetSelector,
  payNowBottomsheetSelector,
} from '../features/ui/ui.selector';
import { UserService } from '../services/user';
import { changeUserState } from '../features/user/user.slice';
import * as Clipboard from 'expo-clipboard';
import SecondaryButton from './SecondaryButton';
import { useRefreschUserData } from '../hooks/api/user';
import { formatToAmount } from '../utils/stringManipulation';
import { ProviderService } from '../services/providers/provider';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../types';
import {
  MakePaymentDto,
  MakePaymnetApiResponse,
  PayWithWalletDto,
} from '../services/providers/provider.dto';
import { useNavigation } from '@react-navigation/native';
const AccountDetailsBottomsheet = () => {
  const dispatch = useAppDispatch();
  const accountDetailsBottomsheet = useAppSelector(
    accountDetailsBottomsheetSelector
  );
  const {
    refetch: refetchUserData,
    isPending,
    isFetching,
    isLoading,
  } = useRefreschUserData();
  const [isReady, setIsReady] = React.useState(false);
  const user = useAppSelector(userSelector);
  const userInstance = new UserService(user.customerId, user.userId);
  const { navigate } = useNavigation();
  const paymentSheet = useAppSelector(payNowBottomsheetSelector);
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
  const { mutate: payWithWallet, isPending: payWithWalletLoading } =
    useMutation<API_RESPONSE<any>, Error, PayWithWalletDto>({
      mutationFn: async (data) => providerInstance.makePaymentWithWallet(data),
      onSuccess: (response) => {
        if (response.success) {
          dispatch(
            updatePayNowBottomsheet({
              amount: 0,
              visible: false,
              serviceId: '',
            })
          );
          navigate('SuccessPage', {
            message: response.message,
          });
        }
      },
      onError: (error) => {
        console.error('Error making payment:', error);
      },
    });

  useEffect(() => {
    if (!user.bankDetails.length && accountDetailsBottomsheet.isVisible) {
      userInstance.getUserBankDetails().then((res) => {
        if (res.data) {
          if (Array.isArray(res.data)) {
            dispatch(
              changeUserState({
                key: 'bankDetails',
                value: res.data,
              })
            );
          } else {
            dispatch(
              changeUserState({
                key: 'bankDetails',
                value: [res.data],
              })
            );
          }
        }
      });
    }
  }, [accountDetailsBottomsheet]);

  return (
    <ScrollablebottomsheetWrapper
      isReady={isReady}
      topRadius={16}
      enableBackdrop
      visibility={accountDetailsBottomsheet.isVisible}
      onClose={() =>
        dispatch(
          updateAccountDetailsBottomsheetVisibility({
            isVisible: false,
            shouldConfirmTransfer: false,
          })
        )
      }
      backgroundColor={colors.appBackground()}
    >
      <Pressable
        onPress={() =>
          dispatch(
            updateAccountDetailsBottomsheetVisibility({
              isVisible: false,
              shouldConfirmTransfer: false,
            })
          )
        }
        style={{
          alignSelf: 'flex-end',
          marginRight: size.getWidthSize(24),
          marginTop: size.getHeightSize(24),
          padding: size.getHeightSize(6),
        }}
      >
        <CancelIcon size={size.getHeightSize(24)} />
      </Pressable>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          marginBottom: size.getHeightSize(16),
          justifyContent: 'space-between',
          gap: size.getHeightSize(4),
        }}
      >
        <CText
          color="secondaryBlack"
          fontSize={18}
          lineHeight={23}
          fontFamily="bold"
        >
          Wallet Account Details
        </CText>
        <CText
          color="secondaryBlack"
          fontSize={16}
          lineHeight={20}
          fontFamily="regular"
        >
          View your account number and details
        </CText>
      </View>
      <BottomSheetScrollView
        onLayout={() => {
          setIsReady(true);
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: size.getHeightSize(60),
        }}
        style={{
          marginBottom: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(16),
            marginTop: size.getHeightSize(8),
          }}
        >
          {user.bankDetails.map((item, index) => (
            <View key={index} style={styles.view1}>
              <View style={styles.view2}>
                <View style={styles.view3}>
                  <BankIcon size={size.getHeightSize(27)} />
                </View>
                <View style={styles.view4}>
                  <CText
                    color="secondaryBlack"
                    fontSize={13}
                    lineHeight={16}
                    fontFamily="semibold"
                  >
                    Bank Name
                  </CText>
                  <CText
                    color="black"
                    fontSize={14}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    {item.bankName}
                  </CText>
                </View>
              </View>
              <View style={styles.view2}>
                <View style={styles.view3}>
                  <PersonIcon size={size.getHeightSize(27)} />
                </View>
                <View style={styles.view4}>
                  <CText
                    color="secondaryBlack"
                    fontSize={13}
                    lineHeight={16}
                    fontFamily="semibold"
                  >
                    Account Name
                  </CText>
                  <CText
                    color="black"
                    fontSize={14}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    {item.accountName}
                  </CText>
                </View>
              </View>
              <View style={styles.view2}>
                {/* <View style={styles.view3}>
                   
                  </View> */}
                <ProviderIcon size={size.getHeightSize(49)} />
                <View style={styles.view4}>
                  <CText
                    color="secondaryBlack"
                    fontSize={13}
                    lineHeight={16}
                    fontFamily="semibold"
                  >
                    Bank Account Number
                  </CText>
                  <CText
                    color="black"
                    fontSize={14}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    {item.accountNumber}
                  </CText>
                </View>
                <Pressable
                  onPress={() => {
                    Clipboard.setStringAsync(item.accountNumber).then(() => {
                      dispatch(
                        updateToast({
                          displayToast: true,
                          toastMessage: 'Account number copied to clipboard',
                          toastType: 'success',
                        })
                      );
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    gap: size.getWidthSize(4),
                  }}
                >
                  <Feather
                    color={colors.primary()}
                    name="copy"
                    size={size.getHeightSize(16)}
                  />
                  <CText
                    color="primaryColor"
                    fontSize={13}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    Copy
                  </CText>
                </Pressable>
              </View>
              <View>
                <CText color="primaryColor" fontFamily="semibold" fontSize={14}>
                  Balance:₦{formatToAmount(user?.balance)}
                </CText>
              </View>
            </View>
          ))}
        </View>
      </BottomSheetScrollView>
      {accountDetailsBottomsheet.shouldConfirmTransfer && (
        <SecondaryButton
          isLoading={isFetching || payWithWalletLoading}
          disabled={isPending || isPaymentPending}
          onPress={async () => {
            const updatedData = await refetchUserData();
            if (updatedData.isSuccess) {
              if (paymentSheet.amount <= user.balance) {
                payWithWallet({
                  serviceId: paymentSheet.serviceId,
                  amount: paymentSheet.amount,
                  loanAgreement: true,
                });
              } else {
                dispatch(
                  updateToast({
                    displayToast: true,
                    toastMessage: 'Insufficient balance in wallet',
                    toastType: 'info',
                  })
                );
              }
            }
          }}
          label="I have funded my wallet"
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginBottom: size.getHeightSize(30),
          }}
        />
      )}
    </ScrollablebottomsheetWrapper>
  );
};

export default AccountDetailsBottomsheet;

const styles = StyleSheet.create({
  view1: {
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    gap: size.getHeightSize(24),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    borderBottomWidth: size.getHeightSize(1),
    borderColor: '#31005C1A',
    paddingBottom: size.getHeightSize(8),
  },
  view3: {
    borderRadius: size.getHeightSize(500),
    backgroundColor: '#F0EDFF',
    padding: size.getHeightSize(9),
  },
  view4: {
    flex: 1,
    gap: size.getHeightSize(6),
  },
});
