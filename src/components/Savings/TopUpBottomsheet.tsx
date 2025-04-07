import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
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
import InfoIcon from '../../../assets/svgs/Savings/InfoIcon';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { formatToAmount } from '../../utils/stringManipulation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { SavingsService } from '../../services/savings/savings';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { updateToast } from '../../features/ui/ui.slice';
interface Props {
  onClose: () => void;
  visibility: boolean;
  goalId: string;
}
const TopUpBottomsheet = ({ goalId, onClose, visibility }: Props) => {
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
  });
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
          Top up from your jomp wallet
        </CText>
        <BottomSheetTextInput
          placeholder="Enter Top Up Amount"
          style={styles.input}
          value={`${selectedAmount.toString()}`}
          onChangeText={(text) => {
            setSelectedAmount(text);
          }}
          keyboardType="decimal-pad"
        />
        <View
          style={{
            flexDirection: 'row',
            gap: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedAmount('500');
            }}
            style={
              selectedAmount == '500' ? styles.amountSelected : styles.view2
            }
          >
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="semibold"
            >
              ₦ 500
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedAmount('1000');
            }}
            style={
              selectedAmount == '1000' ? styles.amountSelected : styles.view2
            }
          >
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="semibold"
            >
              ₦ 1,000
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedAmount('1500');
            }}
            style={
              selectedAmount == '1500' ? styles.amountSelected : styles.view2
            }
          >
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="semibold"
            >
              ₦ 1,500
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedAmount('5000');
            }}
            style={
              selectedAmount == '5000' ? styles.amountSelected : styles.view2
            }
          >
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="semibold"
            >
              ₦ 5,000
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedAmount('10000');
            }}
            style={
              selectedAmount == '10000' ? styles.amountSelected : styles.view2
            }
          >
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="semibold"
            >
              ₦ 10,000
            </CText>
          </Pressable>
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
                selectedAmount,
              });
            }}
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
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(16),
    // lineHeight: size.getHeightSize(22.4),
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
