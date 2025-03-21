import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import { CustomerServicesContext } from '../../context/ServicesContext';
import AttachmentView from '../../shared/AttachmentView';
const Form4 = () => {
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <AttachmentView
        description="6 Months Bank Statement."
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails('documentUploads', 'bankStatement', file);
        }}
      />
      <AttachmentView
        description="Utility Bill."
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails('documentUploads', 'utilityBill', file);
        }}
      />
      <AttachmentView
        description="School fee Invoice."
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails('documentUploads', 'schoolFeeInvoice', file);
        }}
      />

      <AttachmentView
        description="School Id Card."
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails('documentUploads', 'schoolIdCard', file);
        }}
      />
    </View>
  );
};

export default Form4;

const styles = StyleSheet.create({
  view: {
    paddingTop: size.getHeightSize(14),
    backgroundColor: colors.white(),
    alignItems: 'center',
    gap: size.getHeightSize(8),
    borderRadius: size.getHeightSize(8),
  },
});
