import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import SecondaryButton from '../../shared/SecondaryButton';
const UploadIamgeModal = () => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={true}
      onClose={() => {}}
    >
      <View
        style={{
          marginTop: size.getHeightSize(16),
          gap: size.getHeightSize(40),
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(16),
          }}
        >
          <View style={styles.button}>
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="bold"
            >
              Take Photo with Camera
            </CText>
          </View>
          <View style={styles.button}>
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="bold"
            >
              Select from Device Photos
            </CText>
          </View>
        </View>
        <SecondaryButton label="Cancel" />
      </View>
    </BottomsheetWrapper>
  );
};

export default UploadIamgeModal;

const styles = StyleSheet.create({
  button: {
    borderRadius: size.getHeightSize(24),
    borderWidth: size.getHeightSize(1),
    borderColor: '#31005C4D',
    paddingVertical: size.getHeightSize(15.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
