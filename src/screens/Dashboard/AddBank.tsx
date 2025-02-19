import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
const AddBank = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
            color="white"
          />
          <CText
            color={'white'}
            fontSize={16}
            lineHeight={25.6}
            fontFamily="bold"
          >
            Go Back
          </CText>
        </View>
      </GradientHeader>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(16),
        }}
      >
        <CText
          color={colors.black('70') as any}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Adding Bank Account
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
        >
          Link your bank account to Jompstart
        </CText>
      </View>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(24),
        }}
      >
        <View style={styles.dropDown}>
          <CText
            color={colors.black('50') as any}
            fontSize={16}
            lineHeight={19.6}
            fontFamily="regular"
            style={{
              letterSpacing: size.getWidthSize(0.2),
            }}
          >
            Select Bank
          </CText>
          <MaterialIcons
            name="arrow-drop-down"
            color={colors.primary()}
            size={size.getHeightSize(40)}
          />
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  dropDown: {
    flexDirection: 'row',
    height: size.getHeightSize(52),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.black('30'),
    borderRadius: size.getHeightSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size.getWidthSize(16),
  },
});
