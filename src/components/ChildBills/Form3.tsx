import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { CustomerServicesContext } from '../../context/ServicesContext';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentView from '../../shared/AttachmentView';
const Form3 = () => {
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
        value={childSchoolFeeDetails.guardianEmploymentDetails.nameOfCompany}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'nameOfCompany',
            text
          )
        }
        placeholder="Name of Company"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyEmail}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'companyEmail',
            text
          )
        }
        placeholder="Company’s Email Address"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyLocation}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'companyLocation',
            text
          )
        }
        placeholder="Company’s Location"
      />
      <PhoneInput
        value={
          childSchoolFeeDetails.guardianEmploymentDetails.companyPhoneNumber
        }
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'companyPhoneNumber',
            text
          )
        }
        keyboardType="number-pad"
        placeholder="Company’s Phone Number"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.yearsInCompany}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'yearsInCompany',
            text
          )
        }
        keyboardType="number-pad"
        placeholder="Years of Working with them"
      />
      {/* <View
        style={{
          paddingTop: size.getHeightSize(14),
          backgroundColor: colors.white(),
          alignItems: 'center',
          gap: size.getHeightSize(8),
        }}
      >
        <AAttachmentIcon size={size.getHeightSize(40)} />
        <CText
          color={'secondaryBlack'}
          fontSize={14}
          lineHeight={19.6}
          fontFamily="semibold"
          style={{
            textAlign: 'center',
          }}
        >
          3 Months Payment Slip.
          <CText
            color={'primaryColor'}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="bold"
          >
            Click to upload
          </CText>
        </CText>
      </View> */}
      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description=" "
        type="3 Months Payment Slip."
        onFileSelected={(file) => {
          setChildSchoolFeeDetails(
            'guardianEmploymentDetails',
            'paymentSlip',
            file
          );
        }}
      />
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({});
