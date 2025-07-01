import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import Octicons from '@expo/vector-icons/Octicons';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';

const SavingsTransactions = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
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
      </GradientHeader>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          Transactions
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
            marginBottom: size.getHeightSize(24),
          }}
        >
          View all your transactions here
        </CText>
      </View>
      <View style={styles.view}>
        <View style={styles.view2}>
          <CText
            color={colors.black('70') as any}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
          >
            Category
          </CText>
          <Octicons
            name="chevron-down"
            color={colors.primary()}
            size={size.getHeightSize(24)}
          />
        </View>
        <View style={styles.view2}>
          <CText
            color={colors.black('70') as any}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
          >
            Status
          </CText>
          <Octicons
            name="chevron-down"
            color={colors.primary()}
            size={size.getHeightSize(24)}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            gap: size.getHeightSize(16),
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          {/* <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction /> */}
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default SavingsTransactions;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(13),
    marginHorizontal: size.getWidthSize(16),
    marginBottom: size.getHeightSize(16),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black('10'),
    paddingVertical: size.getHeightSize(10),
    paddingHorizontal: size.getWidthSize(10),
    borderRadius: size.getHeightSize(6),
    gap: size.getWidthSize(10),
  },
});
