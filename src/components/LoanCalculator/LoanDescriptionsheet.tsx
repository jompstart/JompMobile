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

const LoanDescriptionsheet = () => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={false}
      onClose={() => {}}
    >
      <CancelIcon
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
          a loan range of{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            ₦100,000.00
          </CText>{' '}
          to{' '}
          <CText
            color={'#31005C' as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            ₦120,000.00
          </CText>{' '}
          to be repaid in 3 months.
        </CText>
      </View>
      <CText
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
      </CText>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(54),
        }}
      >
        <PrimaryButton label="Apply for Loan" />
        <SecondaryButton label="Close" />
      </View>
    </BottomsheetWrapper>
  );
};

export default LoanDescriptionsheet;

const styles = StyleSheet.create({});
