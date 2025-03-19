import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomerServicesContext } from '../../context/ServicesContext';
const Form1 = () => {
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput
        placeholder="First Name"
        onChangeText={(text) => {
          setSelfSchoolFeeDetails('basicInformation', 'firstName', text);
        }}
        value={selfSchoolFeeDetails?.basicInformation?.firstName}
      />
      <PTextInput
        onChangeText={(text) => {
          setSelfSchoolFeeDetails('basicInformation', 'lastName', text);
        }}
        value={selfSchoolFeeDetails?.basicInformation?.lastName}
        placeholder="Last Name"
      />
      <PTextInput
        placeholder="Email Address"
        keyboardType="email-address"
        onChangeText={(text) => {
          setSelfSchoolFeeDetails('basicInformation', 'email', text);
        }}
        value={selfSchoolFeeDetails?.basicInformation?.email}
        rightIcon={
          <AntDesign
            name="mail"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        }
      />
      <PhoneInput
        keyboardType="phone-pad"
        placeholder="e.g. 80121212121"
        onChangeText={(text) => {
          setSelfSchoolFeeDetails('basicInformation', 'phoneNumber', text);
        }}
        value={selfSchoolFeeDetails?.basicInformation?.phoneNumber}
      />
      <PTextInput
        placeholder="Contact Address"
        onChangeText={(text) => {
          setSelfSchoolFeeDetails('basicInformation', 'address', text);
        }}
        value={selfSchoolFeeDetails?.basicInformation?.address}
      />
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({});
