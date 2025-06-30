import {
  StyleSheet,
  View,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { size } from '../../config/size';
import WalletIcon from '../../../assets/svgs/Home/WalletIcon';
import HouseIcon from '../../../assets/svgs/Home/HouseIcon';
import SchoolIcon from '../../../assets/svgs/Home/SchoolIcon';
import PiggyIcon from '../../../assets/svgs/Home/PiggyIcon';
import WithdrawIcon from '../../../assets/svgs/Home/WithdrawIcon';
import CarIcon from '../../../assets/svgs/Home/CarIcon';
import BankIcon from '../../../assets/svgs/Home/BankIcon';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import PersonIcon from '../../../assets/svgs/Home/PersonIcon';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import BillImage from '../../../assets/svgs/Home/BillImage';
import SupportIcon from '../../../assets/svgs/Home/SupportIcon';
import GradientHeader from '../../shared/GradientHeader';
import {
  useAppSelector,
  useAppDispatch,
} from '../../controller/redux.controller';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { userSelector } from '../../features/user/user.selector';
import { updateAccountDetailsBottomsheetVisibility } from '../../features/ui/ui.slice';
import { formatToAmount } from '../../utils/stringManipulation';
import {
  useGetRecentTransactions,
  useRefreschUserData,
} from '../../hooks/api/user';
import RecentTransaction from '../../components/Transaction/RecentTransaction';
const Dashboard = () => {
  const { navigate, dispatch: navigationDispatch } = useNavigation();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { data: recenTransactions, refetch: reloadRecentTransaction } =
    useGetRecentTransactions(user.customerId, user.userId);
  const { isPending, refetch } = useRefreschUserData();

  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon
          onPress={() => {
            navigationDispatch(DrawerActions.openDrawer());
          }}
          size={size.getHeightSize(28)}
        />
        <View style={{ flex: 1 }} />
        {/* <SearchIcon size={size.getHeightSize(28)} /> */}
        {/* <NotificationBell size={size.getHeightSize(28)} /> */}
      </GradientHeader>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
              reloadRecentTransaction();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => {
            navigate('Profile');
          }}
          style={styles.view3}
        >
          <PersonIcon size={size.getHeightSize(40)} />
          <CText
            color={'black'}
            fontSize={16}
            lineHeight={25.6}
            fontFamily="bold"
          >
            Hello, {user?.fullName.split(' ')[0]}
          </CText>
        </Pressable>
        <View style={styles.walletView}>
          <View
            style={{
              gap: size.getHeightSize(14),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(8),
              }}
            >
              <CText
                color={'white'}
                fontSize={14}
                lineHeight={16.4}
                fontFamily="semibold"
              >
                Wallet Balance
              </CText>
            </View>
            <CText
              color={'white'}
              fontSize={24}
              lineHeight={28.4}
              fontFamily="bold"
            >
              <CText
                color={'white'}
                fontSize={24}
                lineHeight={28.4}
                fontFamily="regular"
              >
                ₦
              </CText>{' '}
              {user?.balance === 0 ? '0.00' : formatToAmount(user?.balance)}
            </CText>
          </View>
          <View>
            <Pressable
              onPress={() => {
                dispatch(updateAccountDetailsBottomsheetVisibility(true));
              }}
              style={{
                backgroundColor: colors.white(),
                paddingHorizontal: size.getWidthSize(17),
                paddingVertical: size.getHeightSize(8),
                borderRadius: size.getHeightSize(24),
              }}
            >
              <CText
                color={'primaryColor'}
                fontSize={12}
                lineHeight={14.4}
                fontFamily="bold"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                Account Details
              </CText>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: size.getHeightSize(24),
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: size.getWidthSize(24),
              gap: size.getWidthSize(24),
            }}
            horizontal
          >
            <Pressable
              onPress={() => {
                navigate('UserCreated');
              }}
              style={styles.cardView}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: size.getWidthSize(16),
                  alignItems: 'center',
                }}
              >
                <CText
                  color={'black'}
                  fontSize={13}
                  lineHeight={20.8}
                  fontFamily="bold"
                  style={{
                    flex: 1,
                  }}
                >
                  You have bills to pay?
                </CText>
                <CText
                  color={'black'}
                  fontSize={10}
                  lineHeight={16}
                  fontFamily="regular"
                  style={{
                    opacity: 0.7,
                  }}
                >
                  1/2
                </CText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    gap: size.getHeightSize(8),
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <CText
                    color={'black'}
                    fontSize={11}
                    lineHeight={17.6}
                    fontFamily="semibold"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    Yes, we all do! But managing them doesn't have to be
                    overwhelming. Do it with JOMP
                  </CText>
                  <View style={styles.cardButton}>
                    <CText
                      color={'white'}
                      fontSize={12}
                      lineHeight={14.4}
                      fontFamily="semibold"
                      style={{
                        letterSpacing: size.getWidthSize(0.2),
                      }}
                    >
                      Pay with Jomp
                    </CText>
                  </View>
                </View>
                <BillImage
                  width={size.getWidthSize(110)}
                  height={size.getHeightSize(97)}
                  style={{}}
                />
              </View>
            </Pressable>
            <View style={styles.cardView}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: size.getWidthSize(16),
                  alignItems: 'center',
                }}
              >
                <CText
                  color={'black'}
                  fontSize={13}
                  lineHeight={20.8}
                  fontFamily="bold"
                  style={{
                    flex: 1,
                  }}
                >
                  Save with JOMP
                </CText>
                <CText
                  color={'black'}
                  fontSize={10}
                  lineHeight={16}
                  fontFamily="regular"
                  style={{
                    opacity: 0.7,
                  }}
                >
                  2/2
                </CText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    gap: size.getHeightSize(8),
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <CText
                    color={'black'}
                    fontSize={11}
                    lineHeight={17.6}
                    fontFamily="semibold"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    You can now save towards all your bills on JOMP and pay when
                    you’re ready.
                  </CText>
                  <Pressable
                    onPress={() => {
                      navigate('Savings' as any);
                    }}
                    style={styles.cardButton}
                  >
                    <CText
                      color={'white'}
                      fontSize={12}
                      lineHeight={14.4}
                      fontFamily="semibold"
                      style={{
                        letterSpacing: size.getWidthSize(0.2),
                      }}
                    >
                      Start Saving
                    </CText>
                  </Pressable>
                </View>
                <BillImage
                  width={size.getWidthSize(110)}
                  height={size.getHeightSize(97)}
                  style={{}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.view2}>
          <Pressable
            onPress={() => {
              navigate('PayServices');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <SchoolIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
            >
              School Fees
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('HouseRentService');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <HouseIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
            >
              House Rent
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('TransportDetails');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <CarIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Transport Credit
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Savings' as any);
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <PiggyIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Savings
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('FundWallet');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <WalletIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Fund Wallet
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('WithdrawFunds');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <WithdrawIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Withdraw to your Bank
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Profile');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <BankIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Link Bank Account
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Support');
            }}
            style={styles.view1}
          >
            <View style={styles.view}>
              <SupportIcon size={size.getHeightSize(26)} />
            </View>
            <CText
              color={'black'}
              fontSize={10}
              lineHeight={16}
              fontFamily="regular"
              style={{
                textAlign: 'center',
              }}
            >
              Chat With Support
            </CText>
          </Pressable>
        </View>
        <View
          style={{
            marginHorizontal: size.getWidthSize(16),
          }}
        >
          <CText
            color={'black'}
            fontSize={14}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Recent Transactions
          </CText>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white(),
              paddingVertical: size.getHeightSize(16),
              paddingHorizontal: size.getWidthSize(4),
              borderRadius: size.getHeightSize(8),
            }}
          >
            {recenTransactions?.data?.map((item, index) => {
              return <RecentTransaction data={item} key={index} />;
            })}
          </View>
          {/* <View
            style={{
              flex: 1,
            }}
          >
            <CText
              color={'black'}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="semibold"
            >
              Number of Orders
            </CText>
            <View style={styles.view4}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: size.getHeightSize(8),
                }}
              >
                <OrderIcon size={size.getHeightSize(41)} />
                <CText
                  color={'black'}
                  fontSize={17}
                  lineHeight={27.2}
                  fontFamily="bold"
                >
                  {user.totalOrders}
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  <CText
                    color={'success'}
                    fontSize={12}
                    lineHeight={19.2}
                    fontFamily="semibold"
                  >
                    +8.42%
                  </CText>{' '}
                  From last month
                </CText>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  cardButton: {
    backgroundColor: colors.primary(),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(13.5),
    width: size.getWidthSize(113),
    borderRadius: size.getHeightSize(24),
  },
  cardView: {
    width: size.getWidthSize(310),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
    justifyContent: 'space-between',
  },
  view: {
    height: size.getHeightSize(46),
    width: size.getHeightSize(46),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EDFF',
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: size.getHeightSize(4),
    flexBasis: '20%',
  },
  view2: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    marginHorizontal: size.getWidthSize(16),
    marginVertical: size.getHeightSize(16),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    justifyContent: 'center',
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    paddingHorizontal: size.getWidthSize(20),
    marginTop: size.getHeightSize(20),
  },
  walletView: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    backgroundColor: colors.primary(),
    marginHorizontal: size.getWidthSize(16),
    borderRadius: size.getHeightSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size.getHeightSize(20),
    justifyContent: 'space-between',
  },
  view4: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    alignItems: 'center',
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
  },
});
