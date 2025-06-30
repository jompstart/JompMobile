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
interface Props {
  onClose: () => void;
  visibility: boolean;
  goalId: string;
}
const WithdrawBottomsheet = ({ goalId, onClose, visibility }: Props) => {
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
        Withdraw Savings
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={14}
        lineHeight={22.4}
        fontFamily="regular"
        style={{
          flex: 1,
        }}
      >
        You are attempting to make a withdrawal before the end of your savings
        duration.
      </CText>
      <View
        style={{
          paddingVertical: size.getHeightSize(16),
          backgroundColor: colors.appBackground(),
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(16),
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(8),
          }}
        >
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Savings Accrued
          </CText>
          <CText
            color={'warning'}
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
          >
            ₦130,000.00
          </CText>
        </View>
        <View
          style={{
            width: size.getWidthSize(1),
            height: '100%',
            backgroundColor: '#31005C4D',
          }}
        />
        <View
          style={{
            gap: size.getHeightSize(8),
            alignSelf: 'flex-end',
          }}
        >
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
            style={{
              textAlign: 'right',
            }}
          >
            Savings Goal
          </CText>
          <CText
            color={'black'}
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
            style={{
              textAlign: 'right',
            }}
          >
            ₦150,000.00
          </CText>
        </View>
      </View>
      <View
        style={{
          paddingVertical: size.getHeightSize(8),
          paddingHorizontal: size.getWidthSize(17),
          backgroundColor: colors.primary('10'),
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
        }}
      >
        <InfoIcon size={size.getHeightSize(24)} />
        <CText
          color={'black'}
          fontSize={12}
          lineHeight={16.8}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            flex: 1,
          }}
        >
          This action cannot be reversed. if you proceed, you will lose all the
          interest accrued.
        </CText>
      </View>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(40),
        }}
      >
        <PrimaryButton label="Yes, Proceed" />
        <SecondaryButton label="No, Cancel" />
      </View>
    </BottomsheetWrapper>
  );
};

export default WithdrawBottomsheet;

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(14),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
});
