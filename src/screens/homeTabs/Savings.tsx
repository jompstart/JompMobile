import {
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import React, { useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import Feather from '@expo/vector-icons/build/Feather';
import CText from '../../shared/CText';

import BalanceCard from '../../shared/BalanceCard';
import WalletIcon from '../../../assets/svgs/Savings/WalletIcon';
import { colors } from '../../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import FluentIcon from '../../../assets/svgs/Savings/FluentIcon';
import AddIcon from '../../../assets/svgs/Savings/AddIcon';
import VectorIcon from '../../../assets/svgs/Savings/VectorIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SaveMoneyIcon from '../../../assets/svgs/Savings/SaveMoneyIcon';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TargetIcon from '../../../assets/svgs/Savings/TargetIcon';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  useGetAccruedInterest,
  useGetSavingsTypes,
  useGetTotalSavings,
  useGetUserSavings,
} from '../../hooks/api/savings';
import {
  formatToAmount,
  getTimeDifference,
  getTimeDifferenceBetweenDates,
} from '../../utils/stringManipulation';
const Savings = () => {
  const { navigate, dispatch } = useNavigation();
  const user = useAppSelector(userSelector);
  const { data: totalSavings, refetch: refetchTotalSavings } =
    useGetTotalSavings(user.userId, user.customerId);

  const { data: accruedInterest, refetch: refetchInterest } =
    useGetAccruedInterest(user.userId, user.customerId);
  const [tab, setTab] = useState<'ongoing' | 'rollover' | 'completed'>(
    'ongoing'
  );

  const { data: savingsTypes } = useGetSavingsTypes(
    user.userId,
    user.customerId
  );

  const { data: userSavings, refetch: refetchSavings } = useGetUserSavings(
    user.userId,
    user.customerId
  );

  const savingsType = savingsTypes?.data?.find(
    (item) => item.name == 'jompVault'
  );
  const [refreshing, setRefreshing] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing indicator
    try {
      await Promise.all([
        refetchTotalSavings(),
        refetchInterest(),
        refetchSavings(),
      ]);
    } catch (error) {
      console.error('Error refreshing services:', error);
    } finally {
      setRefreshing(false); // Stop the refreshing indicator
    }
  };
  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon
          onPress={() => {
            dispatch(DrawerActions.openDrawer());
          }}
          size={size.getHeightSize(28)}
        />
        <View style={{ flex: 1 }} />
        {/* <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} /> */}
      </GradientHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        contentContainerStyle={{
          paddingBottom: size.getHeightSize(27),
        }}
      >
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
            Savings
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
            Save with JOMP.
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <BalanceCard
            style={{
              paddingHorizontal: size.getWidthSize(16),
              gap: size.getHeightSize(25),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(10),
              }}
            >
              <View
                style={{
                  backgroundColor: colors.white(),
                  paddingHorizontal: size.getWidthSize(9),
                  paddingVertical: size.getHeightSize(8),
                  borderRadius: size.getHeightSize(9),
                }}
              >
                <WalletIcon size={size.getHeightSize(24)} />
              </View>
              <CText
                color={'white'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="semibold"
              >
                Total Savings Balance
              </CText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(23),
              }}
            >
              <CText
                obscureText={showAmount}
                color={'white'}
                fontSize={24}
                lineHeight={38}
                fontFamily="bold"
              >
                ₦{' '}
                {totalSavings?.data == 0
                  ? '0.00'
                  : formatToAmount(totalSavings?.data!) || '0.00'}
              </CText>
              <Feather
                onPress={() => {
                  setShowAmount(!showAmount);
                }}
                name={showAmount ? 'eye-off' : 'eye'}
                size={size.getHeightSize(24)}
                color={colors.white()}
              />
            </View>
          </BalanceCard>
          <Pressable
            onPress={() => navigate('SavingsGoal')}
            style={styles.view}
          >
            <FluentIcon size={size.getHeightSize(56)} />
            <View
              style={{
                width: size.getWidthSize(236),
                flex: 1,
              }}
            >
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={22}
                fontFamily="bold"
              >
                Create Savings
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
              >
                Reach your unique individual saving goals with{' '}
                {savingsType?.interestRate}% interest per annum (interest paid
                daily).
              </CText>
            </View>
            <MaterialIcons
              name="add"
              color={colors.primary()}
              size={size.getHeightSize(70)}
            />
          </Pressable>
          <LinearGradient
            colors={['#EFA005', '#C5520A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flexDirection: 'row',
              paddingHorizontal: size.getWidthSize(14),
              gap: size.getWidthSize(16),
              paddingVertical: size.getHeightSize(14),
              borderRadius: size.getHeightSize(8),
              alignItems: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            <CText
              color={'white'}
              fontSize={14}
              lineHeight={19.6}
              fontFamily="semibold"
              style={{
                flex: 1,
              }}
            >
              This is all you have earned based on all your savings. To earn
              more, keep saving!
            </CText>
            <CText
              color={'white'}
              fontSize={24}
              lineHeight={38.4}
              fontFamily="bold"
            >
              ₦
              {accruedInterest?.data == 0
                ? '0.00'
                : formatToAmount(accruedInterest?.data!) || '0.00'}
            </CText>
          </LinearGradient>
          {/* <Pressable
            onPress={() => {
              navigate('SavingsTransactions');
            }}
            style={styles.view}
          >
            <View style={styles.view2}>
              <VectorIcon size={size.getHeightSize(20)} />
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={22}
                fontFamily="bold"
              >
                Transactions
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
              >
                View all transactions
              </CText>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={colors.primary()}
              size={size.getHeightSize(15)}
            />
          </Pressable>
          <View style={styles.view}>
            <View
              style={{
                flex: 1,
              }}
            >
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
              >
                Savings History
              </CText>
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
              >
                ₦ 0.00
              </CText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(3),
                paddingVertical: size.getHeightSize(10),
                paddingHorizontal: size.getWidthSize(10),
                backgroundColor: colors.black('07'),
                borderRadius: size.getHeightSize(6),
              }}
            >
              <CText
                color={'black'}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="semibold"
              >
                This Month
              </CText>
              <MaterialIcons
                name="keyboard-arrow-down"
                color={colors.primary()}
                size={size.getHeightSize(25)}
              />
            </View>
          </View> */}
          <View
            style={{
              borderBottomWidth: size.getHeightSize(1),
              borderBottomColor: '#31005C26',
              flexDirection: 'row',
              alignItems: 'center',
              gap: size.getWidthSize(24),
              marginTop: size.getHeightSize(24),
            }}
          >
            <Pressable
              style={{
                borderBottomWidth: tab == 'ongoing' ? size.getHeightSize(3) : 0,
                borderColor: '#31005CB2',
                paddingHorizontal: size.getWidthSize(4),
              }}
              onPress={() => {
                setTab('ongoing');
              }}
            >
              <CText
                color={colors.black(tab == 'ongoing' ? '' : '40') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
              >
                Ongoing
              </CText>
            </Pressable>

            <Pressable
              onPress={() => {
                setTab('rollover');
              }}
              style={{
                borderBottomWidth:
                  tab == 'rollover' ? size.getHeightSize(3) : 0,
                borderColor: '#31005CB2',
                paddingHorizontal: size.getWidthSize(4),
              }}
            >
              <CText
                color={colors.black(tab == 'rollover' ? '' : '40') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
              >
                Rollover
              </CText>
            </Pressable>
            <Pressable
              style={{
                borderBottomWidth:
                  tab == 'completed' ? size.getHeightSize(3) : 0,
                borderColor: '#31005CB2',
                paddingHorizontal: size.getWidthSize(4),
              }}
              onPress={() => {
                setTab('completed');
              }}
            >
              <CText
                color={colors.black(tab == 'completed' ? '' : '40') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
              >
                Completed
              </CText>
            </Pressable>
          </View>
          <View
            style={{
              minHeight: size.getHeightSize(228),
              backgroundColor: colors.white(),
              borderRadius: size.getHeightSize(8),
              marginTop: size.getHeightSize(28),
              justifyContent: 'flex-start',
              paddingHorizontal: size.getWidthSize(8),
              paddingVertical: size.getHeightSize(8),
              gap: size.getHeightSize(8),
              // alignItems: 'center',
            }}
          >
            {/* <SaveMoneyIcon
              style={{
                alignSelf: 'center',
              }}
              size={size.getHeightSize(103)}
            /> */}
            {userSavings?.data &&
              userSavings?.data?.length > 0 &&
              userSavings?.data
                ?.filter((savings) => {
                  if (tab == 'ongoing') {
                    return savings.status == 'Active';
                  } else if (tab == 'rollover') {
                    return savings.status == 'RolledOver';
                  } else {
                    return savings.status == 'Completed';
                  }
                })
                .map((savings, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      navigate('SavingsDetails', {
                        goalId: savings.id,
                        savedAmount: savings.savedAmount,
                      });
                    }}
                    style={styles.view3}
                  >
                    <View style={styles.view4}>
                      <TargetIcon size={size.getHeightSize(40)} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <CText
                        color={'secondaryBlack'}
                        fontSize={14}
                        lineHeight={22}
                        fontFamily="bold"
                      >
                        {savings.goalName}
                      </CText>
                      <CText
                        color={'secondaryBlack'}
                        fontSize={14}
                        lineHeight={22}
                        fontFamily="bold"
                      >
                        ₦{formatToAmount(savings.targetAmount)}
                      </CText>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: size.getWidthSize(3.18),
                        }}
                      >
                        <Fontisto
                          name="locked"
                          color={'#876DFF'}
                          size={size.getHeightSize(9)}
                        />
                        <CText
                          color={colors.black('70') as any}
                          fontSize={14}
                          lineHeight={22}
                          fontFamily="regular"
                        >
                          Maturity Time:{' '}
                          <CText
                            color={'secondaryBlack'}
                            fontSize={14}
                            lineHeight={22}
                            fontFamily="regular"
                          >
                            {getTimeDifferenceBetweenDates(
                              savings.startDate.toString(),
                              savings.endDate.toString()
                            )}
                          </CText>
                        </CText>
                      </View>
                    </View>
                    <AnimatedCircularProgress
                      fill={Math.ceil(
                        (savings.savedAmount / savings.targetAmount) * 100
                      )}
                      size={size.getHeightSize(61)}
                      width={size.getHeightSize(6)}
                      tintColor={
                        Math.ceil(
                          (savings.savedAmount / savings.targetAmount) * 100
                        ) > 40
                          ? '#31005C'
                          : '#F75555'
                      }
                      backgroundColor={
                        Math.ceil(
                          (savings.savedAmount / savings.targetAmount) * 100
                        ) > 40
                          ? '#31005C26'
                          : '#F7555526'
                      }
                      backgroundWidth={size.getHeightSize(6)}
                      rotation={0}
                      lineCap="round"
                      style={
                        {
                          // flex: 1,
                        }
                      }
                    >
                      {(fill: any) => (
                        <CText
                          color={'#F75555' as any}
                          fontSize={12}
                          lineHeight={16.8}
                          fontFamily="bold"
                        >
                          {Math.ceil(
                            (savings.savedAmount / savings.targetAmount) * 100
                          )}
                          %
                        </CText>
                      )}
                    </AnimatedCircularProgress>
                  </Pressable>
                ))}
          </View>
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default Savings;

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white(),
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(11),
    paddingHorizontal: size.getHeightSize(11),
    borderRadius: '100%',
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    backgroundColor: colors.appBackground(),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
  view4: {
    height: size.getHeightSize(57),
    width: size.getHeightSize(57),
    borderRadius: '100%',
    backgroundColor: '#53AF9226',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
