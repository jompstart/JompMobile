import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
const Form1 = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput placeholder="First Name" />
      <PTextInput placeholder="Last Name" />
      <PTextInput
        placeholder="Email Address"
        rightIcon={
          <AntDesign
            name="mail"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        }
      />
      <PhoneInput placeholder="e.g. 80121212121" />
      <PTextInput placeholder="₦ Loan Amount" />
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({});
