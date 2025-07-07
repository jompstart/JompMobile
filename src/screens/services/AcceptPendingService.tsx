import { StyleSheet, RefreshControl, FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { userSelector } from '../../features/user/user.selector';
import { useAppSelector } from '../../controller/redux.controller';
import {
  useGetPaymentBreakdown,
  useGetPaymentTerms,
  useGetPendingServices,
} from '../../hooks/api/providers';
import SecondaryButton from '../../shared/SecondaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AcceptPendingServiceProps } from '../../types/navigations.types';
import StatesBottomsheet from '../../shared/StateBottomsheet';
import PTextInput from '../../shared/PTextInput';
import { useGetServiceDetails } from '../../hooks/api/providers';
import { getOrdinal, getServiceMonths } from '../../helpers/services';
import PaymentBreakdown from '../../components/Service/PaymentBreakdown';
const AcceptPendingService = ({
  route: { params },
}: AcceptPendingServiceProps) => {
  const [showState, setShowState] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const user = useAppSelector(userSelector);
  const { data: serviceDetails } = useGetServiceDetails(
    user.userId,
    user.customerId,
    // params?.serviceId,
    'bbca1013-c790-44ed-a640-3ae051bc8834',
    params?.serviceType
  );

  const { data: serviceData } = useGetPaymentTerms(
    user.userId,
    user.customerId
  );

  const { data: paymentBreakDown } = useGetPaymentBreakdown(
    user.userId,
    user.customerId,
    selectedMonth?.toString() || undefined,
    serviceDetails?.data?.requestAmount.toString() || undefined
  );

  console.log('Payment Breakdown:', paymentBreakDown);
  console.log('Service Details:', serviceDetails);

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
              editable
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
                  <View style={styles.idle} key={index}>
                    <CText
                      color={'black'}
                      fontSize={14}
                      lineHeight={18.4}
                      fontFamily="semibold"
                    >
                      {getOrdinal(index + 1)} Month
                    </CText>
                  </View>
                );
              }
            })}
          </View>
        </KeyboardAwareScrollView>
      </View>
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
      <PaymentBreakdown isVisible onClose={() => {}} month="1" />
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
