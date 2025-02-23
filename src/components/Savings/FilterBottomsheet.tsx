import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
const FilterBottomsheet = () => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={false}
      onClose={() => {}}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(16),
        }}
      >
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Filter Savings History By
        </CText>
        <CancelIcon
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          rowGap: size.getHeightSize(16),
          columnGap: size.getWidthSize(16),
          flexWrap: 'wrap',
        }}
      >
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Last Week
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            This Week
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Last Month
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            This Month
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Last Year
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            This Year
          </CText>
        </View>
      </View>
    </BottomsheetWrapper>
  );
};

export default FilterBottomsheet;

const styles = StyleSheet.create({
  view: {
    borderWidth: size.getHeightSize(1),
    width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    borderColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
