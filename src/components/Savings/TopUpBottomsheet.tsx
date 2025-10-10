import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { SavingsService } from '../../services/savings/savings';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { updateToast } from '../../features/ui/ui.slice';

// Utility function to add commas to a number
const formatNumberWithCommas = (value: string | number): string => {
  const num = value.toString().replace(/,/g, ''); // Remove existing commas
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Utility function to remove commas for processing
const parseNumber = (value: string): string => {
  return value.replace(/,/g, '');
};

interface Props {
  onClose: () => void;
  visibility: boolean;
  goalId: string;
  onSuccess?: () => void;
}

const TopUpBottomsheet = ({
  goalId,
  onClose,
  visibility,
  onSuccess,
}: Props) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const savingsService = new SavingsService(user.userId, user.customerId);

  const { mutate: topUp, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    { goalId: string; selectedAmount: string }
  >({
    mutationFn: (data) =>
      savingsService.topUpContribution(data.goalId, data.selectedAmount),
    onError: (error) =>
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: error.message,
          toastType: 'info',
        })
      ),
    onSuccess: (data) => {
      console.log(data);
      onSuccess?.();
    },
  });

  // Handle input change to format with commas
  const handleAmountChange = (text: string) => {
    const rawValue = parseNumber(text); // Remove commas
    if (rawValue === '' || !isNaN(Number(rawValue))) {
      setSelectedAmount(rawValue); // Store raw value
    }
  };

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
      onClose={() => {
        onClose();
      }}
    >
      <KeyboardAvoidingView>
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
          color={colors.black('70') as any}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Top Up Savings
        </CText>
        <CText
          color={'secondary'}
          fontSize={14}
          lineHeight={22.4}
          fontFamily="semibold"
          style={{
            backgroundColor: '#F0EDFF',
            paddingVertical: size.getHeightSize(6),
            paddingHorizontal: size.getWidthSize(8),
          }}
        >
          Top up from your Jomp wallet
        </CText>
        <BottomSheetTextInput
          placeholder="Enter Top Up Amount"
          style={styles.input}
          value={selectedAmount ? formatNumberWithCommas(selectedAmount) : ''} // Display formatted value
          onChangeText={handleAmountChange} // Handle input with parsing
          keyboardType="decimal-pad"
        />
        <View
          style={{
            flexDirection: 'row',
            gap: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          {['500', '1000', '1500', '5000', '10000'].map((amount) => (
            <Pressable
              key={amount}
              onPress={() => {
                setSelectedAmount(amount); // Set raw value
              }}
              style={
                selectedAmount === amount ? styles.amountSelected : styles.view2
              }
            >
              <CText
                color={'black'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
              >
                ₦ {formatNumberWithCommas(amount)}
              </CText>
            </Pressable>
          ))}
        </View>
        <View
          style={{
            gap: size.getHeightSize(16),
            marginTop: size.getHeightSize(40),
          }}
        >
          <PrimaryButton
            isLoading={isPending}
            onPress={() => {
              topUp({
                goalId,
                selectedAmount, // Send raw value to API
              });
            }}
            disabled={!selectedAmount}
            label="Add Savings"
          />
          <SecondaryButton
            onPress={() => {
              onClose();
            }}
            label="Cancel"
          />
        </View>
      </KeyboardAvoidingView>
    </BottomsheetWrapper>
  );
};

export default TopUpBottomsheet;

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(14),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
  input: {
    fontSize: size.fontSize(16),
    fontFamily: 'AvenirLTStd-Medium',
    paddingHorizontal: size.getWidthSize(16),
    borderColor: '#21212130',
    borderWidth: size.getHeightSize(1),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(24),
    paddingVertical:
      Platform.OS === 'ios'
        ? size.getHeightSize(14.5)
        : size.getHeightSize(10.5),
  },
  view2: {
    backgroundColor: colors.black('07'),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(11.5),
    borderRadius: size.getHeightSize(8),
  },
  amountSelected: {
    backgroundColor: colors.black('50'),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(11.5),
    borderRadius: size.getHeightSize(8),
  },
});