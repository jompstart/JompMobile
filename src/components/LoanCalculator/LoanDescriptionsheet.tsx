import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SchoolIcon from '../../../assets/svgs/Home/SchoolIcon';
import CarIcon from '../../../assets/svgs/Dashboard/CarIcon';
import HeartIcon from '../../../assets/svgs/Dashboard/HeartIcon';
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
}
const LoanDescriptionsheet = ({ isVisible, onClose, data, label }: Props) => {
  const {
    approvedLoanAmount,
    durationInMonths,
    isApproved,
    message,
    monthlyRepayment,
  } = data ? data : {};
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={isVisible}
      onClose={() => {
        onClose();
      }}
    >
      <CancelIcon
        onPress={onClose}
        style={{
          alignSelf: 'flex-end',
          marginTop: size.getHeightSize(12),
        }}
        size={size.getHeightSize(24)}
      />
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
          style={{
            textAlign: 'center',
          }}
        >
          Based on your monthly income and selected loan type, we can offer you
          a loan of{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            ₦{approvedLoanAmount?.toLocaleString()}
          </CText>{' '}
          to be repaid over{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            {durationInMonths} months
          </CText>{' '}
          with a monthly repayment of{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            ₦
            {monthlyRepayment?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CText>
          .
        </CText>
      </View>

      <View
        style={{
          backgroundColor: '#F0EDFF',
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(8),
          borderRadius: size.getHeightSize(8),
          marginTop: size.getHeightSize(16),
          gap: size.getWidthSize(8),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <LoanInfoIcon size={size.getHeightSize(24)} />
        <CText
          color="secondaryBlack"
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            flex: 1,
          }}
        >
          The maximum amount you can get for this loan type is{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            ₦{approvedLoanAmount?.toLocaleString()}
          </CText>
          .
        </CText>
      </View>
      {/* <CText
        color="secondaryBlack"
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
        style={{
          textAlign: 'center',
          marginTop: size.getHeightSize(24),
        }}
      >
        An email containing the details for this loan calculator has been sent
        to{' '}
        <CText
          color="black"
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
        >
          timmyagbaakin@gmail.com
        </CText>
      </CText> */}
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(54),
        }}
      >
        {/* <PrimaryButton label="Apply for Loan" /> */}
        <PrimaryButton label={label} onPress={onClose} />
      </View>
    </BottomsheetWrapper>
  );
};

export default LoanDescriptionsheet;

const styles = StyleSheet.create({});
