import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import Octicons from '@expo/vector-icons/Octicons';
import PersonIcon from '../../../assets/svgs/Services/PersonIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import ArrowRightIcon from '../../../assets/svgs/Services/ArrowRightIcon';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';
import WithdrawBottomsheet from '../../components/Savings/WithdrawBottomsheet';
const Receipt = () => {
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
          Ongoing Savings
        </CText>
        <View style={styles.view1}>
          <CText
            color={'black'}
            fontSize={30}
            lineHeight={48}
            fontFamily="bold"
          >
            ₦150,000.00
          </CText>
          <View
            style={{
              backgroundColor: colors.primaryWarning('15'),
              paddingVertical: size.getHeightSize(4),
              paddingHorizontal: size.getWidthSize(21.5),
            }}
          >
            <CText
              color={'warning'}
              fontSize={10}
              lineHeight={14}
              fontFamily="semibold"
            >
              Ongoing
            </CText>
          </View>
        </View>
        <View style={styles.view3}>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Savings Title
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              My New Savings
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Savings Goal
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              ₦150,000.00
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Savings Duration
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              10 Weeks
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Savings Type
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              Weekly
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Preferred Savings Amount
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              ₦15,000.00
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Auto Savings
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              Yes
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Mature Date
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              29/02/2025
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Funding Method
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              My Wallet
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Auto Withdrawal
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              No
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Goal Level
            </CText>
            <CText
              color={'warning'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="bold"
            >
              25%
            </CText>
          </View>
          <View style={styles.view2}>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              Interest
            </CText>
            <CText
              color={'success'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="bold"
            >
              ₦1,047.23
            </CText>
          </View>
        </View>
      </View>
      <WithdrawBottomsheet />
    </GradientSafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: size.getHeightSize(8),
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(26),
    borderRadius: size.getHeightSize(8),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view3: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(16),
    paddingHorizontal: size.getHeightSize(16),
    gap: size.getHeightSize(16),
  },
});
