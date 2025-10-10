import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import LoanInfoIcon from '../../../assets/svgs/Loan/LoanInfoIcon';
import { CalculateLoanResponse } from '../../services/providers/provider.dto';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  data?: CalculateLoanResponse;
  label: string;
  onContinue: () => void;
  loanType?: string; // Add loanType to props for maximum amount mapping
}

const LoanDescriptionSheet = ({
  isVisible,
  onClose,
  data,
  label,
  onContinue,
  loanType,
}: Props) => {
  const {
    approvedLoanAmount,
    durationInMonths,
    isApproved,
    message,
    monthlyRepayment,
  } = data ?? {};

  // Define maximum amounts per loan type
  const maxLoanAmounts: Record<string, number> = {
    'school fee': 500000,
    'transport': 300000, // Example value, adjust as needed
    'rent': 1000000, // Example value, adjust as needed
  };

  // Get the maximum amount for the loan type, fallback to a default if loanType is undefined
  const maxAmount = loanType ? maxLoanAmounts[loanType] ?? 500000 : 500000;

  // Format numbers with proper currency formatting
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return value.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={isVisible}
      onClose={onClose}
    >
      <CancelIcon
        onPress={onClose}
        style={{
          alignSelf: 'flex-end',
          marginTop: size.getHeightSize(12),
        }}
        size={size.getHeightSize(24)}
      />
      {data ? (
        <View
          style={{
            backgroundColor: '#F0EDFF',
            paddingHorizontal: size.getWidthSize(16),
            paddingVertical: size.getHeightSize(16),
            borderRadius: size.getHeightSize(8),
            marginTop: size.getHeightSize(32),
          }}
        >
          <CText
            color="secondaryBlack"
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{ textAlign: 'center' }}
          >
            Based on your monthly income and selected loan type, we can offer you an estimated loan of{' '}
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              {formatCurrency(approvedLoanAmount)}
            </CText>{' '}
            to be repaid in{' '}
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              {durationInMonths ?? 'N/A'} months
            </CText>{' '}
           
            .
          </CText>
        </View>
      ) : (
        <CText
          color="red"
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{ textAlign: 'center', marginTop: size.getHeightSize(32) }}
        >
          No loan data available.
        </CText>
      )}
     
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(54),
        }}
      >
        <PrimaryButton label={label} onPress={onContinue} />
      </View>
    </BottomsheetWrapper>
  );
};

export default LoanDescriptionSheet;

const styles = StyleSheet.create({});