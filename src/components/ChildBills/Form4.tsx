import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
const Form4 = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
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
          Utility Bill.
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
          School Fee Invoice.{' '}
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
          School Id Card.{' '}
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

export default Form4;

const styles = StyleSheet.create({
  view: {
    paddingTop: size.getHeightSize(14),
    backgroundColor: colors.white(),
    alignItems: 'center',
    gap: size.getHeightSize(8),
  },
});
