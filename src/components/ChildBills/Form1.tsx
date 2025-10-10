import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomerServicesContext } from '../../context/ServicesContext';
const Form1 = () => {
  const { childSchoolFeeDetails, setChildSchoolFeeDetails } = useContext(
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
        value={childSchoolFeeDetails.guardianDetails.firstName}
        onChangeText={(text) =>
          setChildSchoolFeeDetails('guardianDetails', 'firstName', text)
        }
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianDetails.lastName}
        onChangeText={(text) =>
          setChildSchoolFeeDetails('guardianDetails', 'lastName', text)
        }
        placeholder="Last Name"
      />
      <PTextInput
        placeholder="Email Address"
        keyboardType="email-address"
        rightIcon={
          <AntDesign
            name="mail"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        }
        onChangeText={(text) =>
          setChildSchoolFeeDetails('guardianDetails', 'email', text)
        }
        value={childSchoolFeeDetails.guardianDetails.email}
      />
      <PhoneInput
        placeholder="e.g. 080121212121"
        onChangeText={(text) =>
          setChildSchoolFeeDetails('guardianDetails', 'phoneNumber', text)
        }
        keyboardType="phone-pad"
        value={childSchoolFeeDetails.guardianDetails.phoneNumber}
          maxLength={11} // Cap phone number to 11 digits

      />
      <PTextInput
        isAmount
        placeholder="₦ Loan Amount"
        onChangeText={(text) =>
          setChildSchoolFeeDetails('guardianDetails', 'loanAmount', text)
        }
        keyboardType="decimal-pad"
        value={childSchoolFeeDetails.guardianDetails.loanAmount}
      />
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({});
