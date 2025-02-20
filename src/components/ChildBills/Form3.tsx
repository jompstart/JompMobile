import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
const Form3 = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput placeholder="Name of Company" />
      <PTextInput placeholder="Company’s Email Address" />
      <PTextInput placeholder="Company’s Location" />
      <PhoneInput placeholder="Company’s Phone Number" />
      <PTextInput placeholder="Years of Working with them" />
      <View
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
      </View>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({});
