import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from './BottomsheetWrapper';
import CText from './CText';
import { size } from '../config/size';
import { formatToAmount } from '../utils/stringManipulation';
import PrimaryButton from './PrimaryButton';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  onPress?: () => void;
  amountToPay: number;
  balanceToPay: number;
  userContribution: number;
}
const PaymentBalanceInfo = ({
  isVisible,
  onClose,
  onPress,
  amountToPay,
  balanceToPay,
  userContribution,
}: Props) => {
  return (
    <BottomsheetWrapper enableBackdrop visibility={isVisible} onClose={onClose}>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(8),
          paddingTop: size.getHeightSize(20),
        }}
      >
        <CText fontFamily="bold" fontSize={17} color="black" lineHeight={19}>
          Balance Information
        </CText>

        <View
          style={{
            gap: size.getHeightSize(16),
            marginTop: size.getHeightSize(32),
          }}
        >
          <View>
            <CText
              fontFamily="semibold"
              fontSize={15}
              color="secondaryBlack"
              lineHeight={19}
            >
              Your Contribution
            </CText>
            <View style={styles.view}>
              <CText
                fontFamily="semibold"
                fontSize={15}
                color="secondaryBlack"
                lineHeight={19}
              >
                {formatToAmount(userContribution)}
              </CText>
            </View>
          </View>
          <View>
            <CText
              fontFamily="semibold"
              fontSize={15}
              color="secondaryBlack"
              lineHeight={19}
            >
              Balance to be paid
            </CText>
            <View style={styles.view}>
              <CText
                fontFamily="semibold"
                fontSize={15}
                color="secondaryBlack"
                lineHeight={19}
              >
                {formatToAmount(balanceToPay)}
              </CText>
            </View>
          </View>
          <View>
            <CText
              fontFamily="semibold"
              fontSize={15}
              color="secondaryBlack"
              lineHeight={19}
            >
              Total amount to be paid
            </CText>
            <View style={styles.view}>
              <CText
                fontFamily="semibold"
                fontSize={15}
                color="secondaryBlack"
                lineHeight={19}
              >
                {formatToAmount(amountToPay)}
              </CText>
            </View>
          </View>
        </View>
        <PrimaryButton
          label="Pay Now"
          onPress={() => onPress?.()}
          style={{
            marginTop: size.getHeightSize(32),
          }}
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default PaymentBalanceInfo;

const styles = StyleSheet.create({
  view: {
    paddingVertical: size.getHeightSize(12),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: size.getHeightSize(8),
    backgroundColor: '#F9F9F9',
    paddingHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(8),
  },
});
