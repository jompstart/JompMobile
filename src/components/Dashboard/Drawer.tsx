import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import LogOutIcon from '../../../assets/svgs/Drawer/LogoutIcon';
import SettingsIcon from '../../../assets/svgs/Drawer/SettingsIcon';
import LoanCalculatorIcon from '../../../assets/svgs/Drawer/LoanCalculatorIcon';
import TransactionIcon from '../../../assets/svgs/Drawer/TransactionIcon';
import SavingsIcon from '../../../assets/svgs/Drawer/SavingsIcon';
import SchoolFeeIcon from '../../../assets/svgs/Drawer/SchoolFee';
import HouseRentIcon from '../../../assets/svgs/Drawer/HouseRentIcon';
import TransportCreditIcon from '../../../assets/svgs/Drawer/TransportCreditIcon';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
interface Props {
  props: DrawerContentComponentProps;
}
const Drawer = (props: Props) => {
  const {
    props: { navigation },
  } = props;
  const { top } = useSafeAreaInsets();
  // const { navigate, dispatch: navigationDispatch } = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.appBackground(),
      }}
    >
      <LinearGradient
        colors={['#EFA005', '#C5520A']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          backgroundColor: colors.appBackground(),
          height: top,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <CancelIcon
          size={size.getHeightSize(28)}
          style={{
            marginVertical: size.getHeightSize(16),
            alignSelf: 'flex-end',
            marginRight: size.getWidthSize(16),
          }}
          onPress={() => {
            navigation.closeDrawer();
          }}
        />
        <View
          style={{
            gap: size.getHeightSize(8),
            paddingHorizontal: size.getWidthSize(4),
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('PayServices');
            }}
            style={styles.view1}
          >
            <SchoolFeeIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              School Fee
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('HouseRent');
            }}
            style={styles.view1}
          >
            <HouseRentIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              House Rent
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('TransportDetails');
            }}
            style={styles.view1}
          >
            <TransportCreditIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              Transport Credit
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'Savings',
              });
            }}
            style={styles.view1}
          >
            <SavingsIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              Savings
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'Transactions',
              });
            }}
            style={styles.view1}
          >
            <TransactionIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              Transactions
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('PayServices');
            }}
            style={styles.view1}
          >
            <LoanCalculatorIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              Loan Calculator{' '}
              <CText color={colors.black('70') as any} fontSize={12}>
                (Coming soon)
              </CText>
            </CText>
          </Pressable>
          {/* <Pressable
            onPress={() => {
              navigation.navigate('PayServices');
            }}
            style={styles.view1}
          >
            <SettingsIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={colors.black('70') as any}
              style={{
                flex: 1,
              }}
            >
              Settings
            </CText>
          </Pressable> */}
          <Pressable
            style={{
              ...styles.view1,
              paddingTop: size.getHeightSize(32),
            }}
          >
            <LogOutIcon size={size.getWidthSize(40)} />
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={'#DD2025' as any}
              style={{
                flex: 1,
              }}
            >
              Logout
            </CText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    borderBottomWidth: size.getHeightSize(1),
    paddingHorizontal: size.getWidthSize(16),
    alignItems: 'center',
    gap: size.getWidthSize(8),
    borderColor: '#31005C12',
    paddingVertical: size.getHeightSize(8),
  },
});
