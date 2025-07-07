import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScrollablebottomsheetWrapper from '../../shared/ScrollablebottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  month: string;
}
const PaymentBreakdown = ({ isVisible, onClose, month }: Props) => {
  return (
    <ScrollablebottomsheetWrapper
      visibility={isVisible}
      snapPoints={['70%']}
      onClose={onClose}
    >
      <View
        style={{
          paddingHorizontal: size.getWidthSize(12),
          paddingTop: size.getHeightSize(16),
          gap: size.getHeightSize(12),
        }}
      >
        <CText
          color={'black'}
          fontSize={14}
          lineHeight={18.4}
          fontFamily="bold"
        >
          Payment Breakdown for Term: Month {month}{' '}
        </CText>

        <CText
          color={'black'}
          fontSize={14}
          lineHeight={18.4}
          fontFamily="bold"
        >
          Month 0 (Today){' '}
        </CText>
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            Approved Amount{' '}
          </CText>

          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {' '}
            Loan Amount
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>

        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {' '}
            Customer's Contribution
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {' '}
            Processing Fee
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {' '}
            Admin Fee
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            {' '}
            Payment Due Today
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={18.4}
            fontFamily="semibold"
          >
            #1,000,000.00
          </CText>
        </View>
        <View style={{}}>
          {[1, 2, 3].map((item, index) => (
            <View
              style={{
                gap: size.getHeightSize(12),
                marginTop: size.getHeightSize(12),
              }}
            >
              <CText
                color={'black'}
                fontSize={14}
                lineHeight={18.4}
                fontFamily="bold"
              >
                Month
              </CText>
              <View style={styles.row}>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                  style={{ flex: 1 }}
                >
                  Outstanding Loan Amount
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                >
                  #1,000,000.00
                </CText>
              </View>
              <View style={styles.row}>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                  style={{ flex: 1 }}
                >
                  {' '}
                  Principal Repayment
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                >
                  #1,000,000.00
                </CText>
              </View>
              <View style={styles.row}>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                  style={{ flex: 1 }}
                >
                  Interest Due
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                >
                  #1,000,000.00
                </CText>
              </View>
              <View style={styles.row}>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                  style={{ flex: 1 }}
                >
                  Payment For Month
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                >
                  #1,000,000.00
                </CText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollablebottomsheetWrapper>
  );
};

export default PaymentBreakdown;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: size.getWidthSize(16),
  },
});
