import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
const FundSourceBottomsheet = () => {
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
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Source of Funding
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
          gap: size.getHeightSize(8),
        }}
      >
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.primary('12'),
            },
          ]}
        >
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            My Wallet
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Visa 1010 20** **** *20
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Mastercard 1910 19** **** **22
          </CText>
        </View>
      </View>
    </BottomsheetWrapper>
  );
};

export default FundSourceBottomsheet;

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(14),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
});
