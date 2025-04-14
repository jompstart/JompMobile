import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import InfoIcon from '../../../assets/svgs/Savings/InfoIcon';
import CautionIcon from '../../../assets/svgs/Savings/CautionIcon';
import { formatToAmount } from '../../utils/stringManipulation';
interface Props {
  onClose: () => void;
  visibility: boolean;
  amount: string;
  onContinue: () => void;
}
const GoalBottomsheet = ({
  onClose,
  visibility,
  amount,
  onContinue,
}: Props) => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor={colors.white()}
      visibility={visibility}
      onClose={() => {
        onClose();
      }}
    >
      <View
        style={{
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(4),
        }}
      >
        <CautionIcon
          style={{
            alignSelf: 'center',
          }}
          width={size.getWidthSize(274)}
          height={size.getHeightSize(206)}
        />
      </View>
      <CText
        color={'warning'}
        fontSize={24}
        lineHeight={30}
        fontFamily="bold"
        style={{
          textAlign: 'center',
        }}
      >
        {` Your savings goal has been changed to - ₦${formatToAmount(
          amount
        )} based on the following:`}
      </CText>
      <CText
        color={'black'}
        fontSize={18}
        lineHeight={26}
        fontFamily="regular"
        style={{
          textAlign: 'center',
          marginTop: size.getHeightSize(16),
        }}
      >
        The combination of your savings duration, your savings frequency and
        your preferred amount to save will not meet up with your initial savings
        goal.
      </CText>
      <CText
        color={'black'}
        fontSize={16}
        lineHeight={23}
        fontFamily="bold"
        style={{
          textAlign: 'center',
          marginTop: size.getHeightSize(16),
        }}
      >
        Would you like to change this or continue?
      </CText>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(40),
        }}
      >
        <PrimaryButton label="Yes, change it" onPress={onClose} />
        <SecondaryButton
          label="No, continue"
          onPress={() => {
            onContinue?.();
            onClose();
          }}
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default GoalBottomsheet;

const styles = StyleSheet.create({});
