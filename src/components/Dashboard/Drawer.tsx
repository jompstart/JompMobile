import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import LogOutIcon from '../../../assets/svgs/Drawer/LogoutIcon';
import LoanCalculatorIcon from '../../../assets/svgs/Drawer/LoanCalculatorIcon';
import TransactionIcon from '../../../assets/svgs/Drawer/TransactionIcon';
import SavingsIcon from '../../../assets/svgs/Drawer/SavingsIcon';
import SchoolFeeIcon from '../../../assets/svgs/Drawer/SchoolFee';
import HouseRentIcon from '../../../assets/svgs/Drawer/HouseRentIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import TransportCreditIcon from '../../../assets/svgs/Drawer/TransportCreditIcon';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAppDispatch } from '../../controller/redux.controller';
import {
  updateLogoutBottomsheetVisibility,
  updateTermsAndConditionVisibility,
} from '../../features/ui/ui.slice';
interface Props {
  props: DrawerContentComponentProps;
}
const Drawer = (props: Props) => {
  const {
    props: { navigation },
  } = props;
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

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
              navigation.navigate('HouseRentService');
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
              navigation.navigate('HomePage', {
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
              navigation.navigate('HomePage', {
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
              navigation.navigate('LoanPage');
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
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('CreatedServices');
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
              Service History
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
            onPress={() => {
              dispatch(updateLogoutBottomsheetVisibility(true));
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
          <Pressable
            style={{
              ...styles.view1,
              paddingTop: size.getHeightSize(20),
            }}
            onPress={() => {
              navigation.navigate('Request');
            }}
          >
            <View
              style={{
                width: size.getHeightSize(40),
                height: size.getHeightSize(40),
                borderRadius: size.getHeightSize(8),
                backgroundColor: colors.primaryWarning('40'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AntDesign
                size={size.getHeightSize(20)}
                name="delete"
                color={colors.primaryWarning()}
              />
            </View>
            <CText
              fontFamily="semibold"
              fontSize={16}
              color={'#DD2025' as any}
              style={{
                flex: 1,
              }}
            >
              Delete Account
            </CText>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(16),
            marginHorizontal: size.getWidthSize(16),
            marginBottom: size.getHeightSize(40),
          }}
        >
          <CText
            fontFamily="semibold"
            onPress={() =>
              dispatch(
                updateTermsAndConditionVisibility({
                  url: 'https://dev.jompstart.com/terms',
                  visible: true,
                })
              )
            }
            fontSize={15}
            color={colors.primary() as any}
            lineHeight={19}
          >
            Terms & Conditions
          </CText>
          <CText
            fontFamily="semibold"
            onPress={() =>
              dispatch(
                updateTermsAndConditionVisibility({
                  url: 'https://7p74mn4v-3000.uks1.devtunnels.ms/privacy',
                  visible: true,
                })
              )
            }
            fontSize={15}
            color={colors.primary() as any}
            lineHeight={19}
          >
            Privacy
          </CText>
        </View>
        <CText
          fontFamily="medium"
          fontSize={13}
          color={colors.primary() as any}
          lineHeight={18}
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginBottom: size.getHeightSize(10),
          }}
        >
          Lending by Jompstart, Savings managed by Partners, notably Kudy
          Financials Ltd, a licensed fund & portfolio manager regulated by SEC
          Nigeria
        </CText>
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
