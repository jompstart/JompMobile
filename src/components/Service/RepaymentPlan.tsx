import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import OptionBox from '../../shared/OptionBox';
import Fontisto from '@expo/vector-icons/Fontisto';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetPaymentMethods } from '../../hooks/api/providers';
import { PaymentOptionResponse } from '../../services/providers/provider.dto';

interface Props {
  onClose: () => void;
  visibility: boolean;
  onSelect: (category: PaymentOptionResponse) => void;
  selectedPaymentMethod?: string;
}
const RepaymentPlan = ({
  onClose,
  onSelect,
  visibility,
  selectedPaymentMethod,
}: Props) => {
  const user = useAppSelector(userSelector);
  const { data: paymentMethods } = useGetPaymentMethods(
    user.userId,
    user.customerId
  );

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
      onClose={onClose}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(16),
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Repayment plan
        </CText>
        <CancelIcon
          onPress={onClose}
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>
      <View
        style={{
          gap: size.getHeightSize(16),
        }}
      >
        {paymentMethods?.data?.map((method) => (
          <OptionBox
            selected={method.id === selectedPaymentMethod}
            key={method.id}
            onSelect={() => {
              onSelect(method);
              onClose();
            }}
            flex={false}
            deselectIcon={
              <Fontisto
                name="radio-btn-passive"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            selectIcon={
              <Fontisto
                name="radio-btn-active"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            description={method.name}
          />
        ))}
      </View>
      <PrimaryButton
        style={{
          marginTop: size.getHeightSize(24),
        }}
        label="Okay"
      />
    </BottomsheetWrapper>
  );
};

export default RepaymentPlan;

const styles = StyleSheet.create({});
