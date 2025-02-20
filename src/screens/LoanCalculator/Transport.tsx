import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { colors } from '../../constants/colors';
import InfoIcon from '../../../assets/svgs/Loan/InfoIcon';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import LoanDescriptionsheet from '../../components/LoanCalculator/LoanDescriptionsheet';

const Transport = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
            color="white"
          />
          <CText
            color={'white'}
            fontSize={16}
            lineHeight={25.6}
            fontFamily="bold"
          >
            Go Back
          </CText>
        </View>
      </GradientHeader>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <CText
          fontSize={16}
          lineHeight={22}
          fontFamily="semibold"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(16),
          }}
        >
          Transport Credit
        </CText>
        <CText
          color="secondaryBlack"
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(4),
          }}
        >
          Estimate loan for transportation
        </CText>
        <View
          style={{
            backgroundColor: colors.primary('10'),
            paddingHorizontal: size.getWidthSize(8),
            paddingVertical: size.getHeightSize(8),
            borderRadius: size.getHeightSize(8),
            gap: size.getWidthSize(8),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          <InfoIcon size={size.getHeightSize(20)} />
          <CText
            color="black"
            fontSize={12}
            lineHeight={16.8}
            fontFamily="regular"
            style={{
              flex: 1,
            }}
          >
            This loan type offers a repayment of 3 months
          </CText>
        </View>

        <View
          style={{
            gap: size.getHeightSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <PTextInput placeholder="₦ Enter your predictable monthly income" />
          <PTextInput placeholder="₦ Enter your desired loan amount" />
          <PTextInput
            placeholder="Email Address"
            rightIcon={
              <MaterialIcons
                name="mail-outline"
                size={size.getHeightSize(20)}
                color={colors.primary()}
              />
            }
          />
        </View>
        <PrimaryButton
          style={{
            marginTop: size.getHeightSize(40),
          }}
          label="Calculate Loan Offer"
        />
      </View>
      <LoanDescriptionsheet />
    </GradientSafeAreaView>
  );
};

export default Transport;

const styles = StyleSheet.create({});
