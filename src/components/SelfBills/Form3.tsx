import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Form3 = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput placeholder="Name of Company/Business" />
      <PTextInput placeholder="Company/Business Email Address" />
      <PTextInput placeholder="Company/Business Location" />
      <PhoneInput placeholder="Company/Business Line" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: size.getWidthSize(16),
        }}
      >
        <View
          style={{
            width: size.getWidthSize(236),
          }}
        >
          <PTextInput
            placeholder="Years of working/operation"
            rightIcon={
              <MaterialIcons
                name="arrow-drop-down"
                size={size.getHeightSize(25)}
              />
            }
          />
        </View>

        <PTextInput
          placeholder="Month"
          rightIcon={
            <MaterialIcons
              name="arrow-drop-down"
              size={size.getHeightSize(25)}
            />
          }
        />
      </View>
      <View style={styles.view}>
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
          6 Months Bank Statement.
          <CText
            color={'primaryColor'}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="bold"
          >
            {' '}
            Click to upload
          </CText>
          <CText
            fontSize={14}
            lineHeight={19.6}
            fontFamily="regular"
            color={'#475467' as any}
          >
            {'\n'}.pdf, .xsls (max. 1MB)
          </CText>
        </CText>
      </View>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  view: {
    paddingTop: size.getHeightSize(14),
    backgroundColor: colors.white(),
    alignItems: 'center',
    gap: size.getHeightSize(8),
    paddingBottom: size.getHeightSize(14),
  },
});
