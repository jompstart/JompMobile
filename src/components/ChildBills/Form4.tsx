import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import { CustomerServicesContext } from '../../context/ServicesContext';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentView from '../../shared/AttachmentView';
const Form4 = () => {
  const { setChildSchoolFeeDetails } = useContext(CustomerServicesContext);
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description="6 Months Bank Statement"
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setChildSchoolFeeDetails('documentUploads', 'bankStatement', file);
        }}
      />

      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description="Utility Bill."
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setChildSchoolFeeDetails('documentUploads', 'utilityBill', file);
        }}
      />

      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description="School Fee Invoice"
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setChildSchoolFeeDetails('documentUploads', 'schoolFeeInvoice', file);
        }}
      />

      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description="School Id Card"
        type=".png, .jpeg (max. 1MB)"
        onFileSelected={(file) => {
          setChildSchoolFeeDetails('documentUploads', 'schoolIdCard', file);
        }}
      />

      <AttachmentView
        fileUri={''}
        onPress={() => {}}
        description=" "
        type="3 Months Payment Slip."
        onFileSelected={(file) => {
          setChildSchoolFeeDetails(
            'documentUploads',
            'paymentSlip',
            file
          );
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
  },
});
