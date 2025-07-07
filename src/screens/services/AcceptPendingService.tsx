import { StyleSheet, ActivityIndicator, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { userSelector } from '../../features/user/user.selector';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import {
  useGetPaymentBreakdown,
  useGetPaymentTerms,
} from '../../hooks/api/providers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AcceptPendingServiceProps } from '../../types/navigations.types';
import StatesBottomsheet from '../../shared/StateBottomsheet';
import PTextInput from '../../shared/PTextInput';
import { useGetServiceDetails } from '../../hooks/api/providers';
import { getOrdinal, getServiceMonths } from '../../helpers/services';
import PaymentBreakdown from '../../components/Service/PaymentBreakdown';
import PrimaryButton from '../../shared/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import { ProviderService } from '../../services/providers/provider';
import { API_RESPONSE } from '../../types';
import { AcceptLoandDto } from '../../services/providers/provider.dto';
import { useNavigation } from '@react-navigation/native';
import { updateToast } from '../../features/ui/ui.slice';
const AcceptPendingService = ({
  route: { params },
}: AcceptPendingServiceProps) => {
  const [showState, setShowState] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const [serviceMonth, selectedServiceMonth] = useState<number | undefined>();
  const [showBreakDown, setShowBreakDown] = useState(false);
  const user = useAppSelector(userSelector);
  const { data: serviceDetails } = useGetServiceDetails(
    user.userId,
    user.customerId,
    params?.serviceId,
    // 'bbca1013-c790-44ed-a640-3ae051bc8834',
    params?.serviceType
  );
  const providerInstance = new ProviderService(user.userId, user.customerId);

  const { data: serviceData, isLoading: serviceDataLoading } =
    useGetPaymentTerms(user.userId, user.customerId);

  const { mutate: acceptLoan, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    AcceptLoandDto
  >({
    mutationFn: async (data) => providerInstance.acceptLoanRequest(data),
    onSuccess: (response) => {
      console.log('Response from accept loan request:', response);
      navigate('SuccessPage', {
        title: 'Loan Request Accepted',
        message: 'Your loan request has been successfully accepted.',
      });
    },
    onError: (error) => {
      console.error('Error accepting loan request:', error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: error.message,
          toastType: 'info',
        })
      );
    },
  });

  const {
    data: paymentBreakDown,
    isRefetching,
    refetch,
    isLoading,
    isSuccess,
  } = useGetPaymentBreakdown(
    user.userId,
    user.customerId,
    selectedMonth?.toString(),
    serviceDetails?.data?.requestAmount.toString() || undefined
  );
  useEffect(() => {
    if (
      selectedMonth &&
      isSuccess &&
      paymentBreakDown?.data &&
      paymentBreakDown?.data?.length > 0
    ) {
      setShowBreakDown(true);
    }
  }, [selectedMonth, isSuccess, isLoading, isRefetching, paymentBreakDown]);

  const [form, setFormState] = useState({
    address: '',
    state: '',
    country: 'Nigeria',
  });

  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(20)}
          color="white"
        />
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Go Back
        </CText>
      </GradientHeader>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
          flex: 1,
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          Payment Completion
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
          }}
        >
          Complete your payment
        </CText>
        <KeyboardAwareScrollView>
          <View
            style={{
              gap: size.getHeightSize(16),
              marginTop: size.getHeightSize(20),
            }}
          >
            <PTextInput
              placeholder="Contact addrress"
              value={form.address}
              onChangeText={(text) => {
                setFormState((prev) => ({ ...prev, address: text }));
              }}
            />
            <PTextInput
              editable={false}
              onPress={() => {
                setShowState(true);
              }}
              placeholder="State"
              value={form.state}
            />
            <PTextInput
              placeholder="Country"
              value={form.country}
              editable={false}
            />
          </View>
          <CText
            color={'black'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="bold"
            style={{
              opacity: 0.75,
              marginTop: size.getHeightSize(16),
            }}
          >
            Select your preferred loan duration
          </CText>
          {serviceDataLoading ? (
            <ActivityIndicator
              color={colors.primary()}
              size={size.getHeightSize(24)}
              style={{
                marginTop: size.getHeightSize(16),
                alignSelf: 'flex-start',
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: size.getWidthSize(12),
                marginTop: size.getHeightSize(13),
              }}
            >
              {serviceData?.paymentTerms?.map((term, index) => {
                if (
                  serviceData &&
                  serviceData?.serviceCategory &&
                  getServiceMonths(
                    params?.serviceType,
                    serviceData?.serviceCategory
                  )?.length > 0 &&
                  getServiceMonths(
                    params?.serviceType,
                    serviceData?.serviceCategory
                  )[index]
                ) {
                  return (
                    <Pressable
                      onPress={() => {
                        setSelectedMonth(index + 1);
                        refetch();
                      }}
                      style={
                        serviceMonth === index + 1
                          ? styles.selected
                          : styles.idle
                      }
                      key={index}
                    >
                      <CText
                        color={'black'}
                        fontSize={14}
                        lineHeight={18.4}
                        fontFamily="semibold"
                      >
                        {getOrdinal(index + 1)} Month
                      </CText>
                    </Pressable>
                  );
                }
              })}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
      <PrimaryButton
        isLoading={isPending}
        label="Submit Plan"
        disabled={!form.address || !form.state || !serviceMonth || isPending}
        style={{
          marginHorizontal: size.getWidthSize(16),
          marginBottom: size.getHeightSize(16),
        }}
        onPress={() => {
          if (
            form.address &&
            form.state &&
            serviceMonth &&
            serviceDetails?.data
          ) {
            const amountDiferrence =
              +(serviceDetails.data.requestAmount ?? 0) -
              +(serviceDetails?.data?.disturbmentAmount ?? 0);
            acceptLoan({
              amountDisbursed: +(serviceDetails?.data?.disturbmentAmount ?? 0),
              contactaddress: form.address,
              customerContribution: +(
                serviceDetails?.data?.userContribution ?? 0
              ),
              interestRate: +(
                serviceData?.interestRate?.[0]?.interestAmount ?? 0
              ),
              loanDuration: serviceMonth?.toString(),
              marginAmount: amountDiferrence,
              monthlyInstallment: +(
                paymentBreakDown?.data?.[0]?.monthlyInstallment ?? 0
              ),
              serviceId: params?.serviceId || '',
              status: 'Accept',
            });
          }
        }}
      />
      <StatesBottomsheet
        isVisible={showState}
        onClose={() => {
          setShowState(false);
        }}
        onStateSelected={(st) => {
          setFormState((prev) => ({ ...prev, state: st.name }));
          setShowState(false);
        }}
      />
      <PaymentBreakdown
        approvedAmount={serviceDetails?.data?.requestAmount || 0}
        disbursedAmount={serviceDetails?.data?.disturbmentAmount || 0}
        customerContribution={serviceDetails?.data?.userContribution || 0}
        processingFee={serviceData?.processingFee?.processingFee || 0}
        insuranceFee={serviceData?.processingFee?.insuranceFee || 0}
        adminFee={serviceData?.processingFee?.adminFee || 0}
        interestAmount={serviceData?.interestRate?.[0]?.interestAmount || 0}
        isVisible={showBreakDown}
        onClose={() => {
          setShowBreakDown(false);
        }}
        breakdown={paymentBreakDown?.data || []}
        month={selectedMonth?.toString() || ''}
        isLoading={isRefetching || isLoading}
        onContinue={() => {
          setShowBreakDown(false);
          selectedServiceMonth(selectedMonth);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default AcceptPendingService;

const styles = StyleSheet.create({
  idle: {
    padding: size.getWidthSize(12),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.primary(),
    borderRadius: size.getHeightSize(8),
  },
  selected: {
    padding: size.getWidthSize(12),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.primary(),
    borderRadius: size.getHeightSize(8),
    backgroundColor: colors.primary('10'),
  },
});
