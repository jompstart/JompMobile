import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import ScrollablebottomsheetWrapper from '../../shared/ScrollablebottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { formatToAmount } from '../../utils/stringManipulation';
import { getOrdinal } from '../../helpers/services';
import { toDp } from '../../utils/formatter';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SecondaryButton from '../../shared/SecondaryButton';
import { colors } from '../../constants/colors';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  month: string;
  approvedAmount: number;
  disbursedAmount: number;
  customerContribution: number;
  processingFee: number;
  insuranceFee: number;
  adminFee: number;

  interestAmount: number;
  breakdown: {
    month: number;
    openingPrincipal: number;
    interest: number;
    principalRepayment: number;
    monthlyInstallment: number;
  }[];
  isLoading: boolean;
  onContinue: () => void;
}
const PaymentBreakdown = ({
  isVisible,
  onClose,
  month,
  approvedAmount,
  disbursedAmount,
  customerContribution,
  processingFee,
  insuranceFee,
  adminFee,
  breakdown,
  interestAmount,
  onContinue,
  isLoading,
}: Props) => {
  return (
    <ScrollablebottomsheetWrapper
      visibility={isVisible}
      snapPoints={['70%']}
      onClose={onClose}
      enableBackdrop
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingBottom: size.getHeightSize(24),
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            color={colors.primary()}
            size={size.getHeightSize(24)}
          />
        ) : (
          <View
            style={{
              paddingHorizontal: size.getWidthSize(12),
              paddingTop: size.getHeightSize(24),
              gap: size.getHeightSize(12),
            }}
          >
            <CText
              color={'black'}
              fontSize={14}
              lineHeight={18.4}
              fontFamily="bold"
            >
              Reepayment Breakdown for Term: Month {month}{' '}
            </CText>

            <CText
              color={'black'}
              fontSize={14}
              lineHeight={18.4}
              fontFamily="bold"
            >
              Month 0{' '}
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
                ₦{formatToAmount(approvedAmount || 0)}
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
                ₦{formatToAmount(disbursedAmount || 0)}
              </CText>
            </View>

            <View style={styles.row}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                  style={{ flex: 1 }}
                >
                  {' '}
                  Customer's Contribution{' '}
                  {toDp(
                    (customerContribution /
                      (customerContribution + (approvedAmount || 0))) *
                      100
                  )}
                  %
                </CText>
              </View>
              <CText
                color={'secondaryBlack'}
                fontSize={14}
                lineHeight={18.4}
                fontFamily="semibold"
              >
                ₦{formatToAmount(customerContribution || 0)}
              </CText>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={18.4}
                  fontFamily="semibold"
                >
                  {' '}
                  Processing Fee {processingFee}% of loan amount
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={13}
                  lineHeight={15.4}
                  fontFamily="regular"
                >
                  {' '}
                  Admin Fee: {adminFee}% and Insurance Fee:{insuranceFee}%
                </CText>
              </View>
              <CText
                color={'secondaryBlack'}
                fontSize={14}
                lineHeight={18.4}
                fontFamily="semibold"
              >
                ₦{formatToAmount((processingFee / 100) * disbursedAmount)}
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
                ₦
                {formatToAmount(
                  customerContribution + (processingFee / 100) * disbursedAmount
                )}
              </CText>
            </View>
            <View style={{}}>
              {breakdown.map((item, index) => (
                <View
                  key={index}
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
                    {getOrdinal(item.month)} Month
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
                      ₦{formatToAmount(item?.openingPrincipal) || 0}
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
                      ₦{formatToAmount(item?.principalRepayment) || 0}
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
                      Interest Due(
                      {interestAmount}
                      %):
                    </CText>
                    <CText
                      color={'secondaryBlack'}
                      fontSize={14}
                      lineHeight={18.4}
                      fontFamily="semibold"
                    >
                      ₦{formatToAmount(item.interest)}
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
                      Payment For {getOrdinal(item.month)} Month
                    </CText>
                    <CText
                      color={'secondaryBlack'}
                      fontSize={14}
                      lineHeight={18.4}
                      fontFamily="semibold"
                    >
                      ₦
                      {formatToAmount(
                        item?.principalRepayment + item.interest
                      ) || 0}
                    </CText>
                  </View>
                </View>
              ))}
            </View>

            {/* <View style={{ height: '20%' }} /> */}
          </View>
        )}
      </BottomSheetScrollView>
      <SecondaryButton
        label="Continue"
        style={{
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(24),
          marginHorizontal: size.getWidthSize(16),
        }}
        onPress={() => {
          onContinue();
          onClose();
        }}
      />
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
