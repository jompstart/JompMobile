import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import { ScrollView } from 'react-native-gesture-handler';
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
import { useNavigation } from '@react-navigation/native';
import TargetIcon from '../../../assets/svgs/Savings/TargetIcon';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  useGetAccruedInterest,
  useGetSavingsTypes,
  useGetTotalSavings,
} from '../../hooks/api/savings';
const Savings = () => {
  const { navigate } = useNavigation();
  const user = useAppSelector(userSelector);
  const { data: totalSavings } = useGetTotalSavings(
    user.userId,
    user.customerId
  );
  const { data: accruedInterest } = useGetAccruedInterest(
    user.userId,
    user.customerId
  );

  const { data: savingsTypes } = useGetSavingsTypes(
    user.userId,
    user.customerId
  );

  const savingsType = savingsTypes?.data?.find(
    (item) => item.name == 'jompVault'
  );
  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon size={size.getHeightSize(28)} />
        <View style={{ flex: 1 }} />
        <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} />
      </GradientHeader>
      <ScrollView
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
                color={'white'}
                fontSize={24}
                lineHeight={38}
                fontFamily="bold"
              >
                ₦ {totalSavings?.data == 0 ? '0.00' : totalSavings?.data}
              </CText>
              <AntDesign
                name="eyeo"
                size={size.getHeightSize(24)}
                color={colors.white()}
              />
            </View>
          </BalanceCard>
          <Pressable
            onPress={() => navigate('SavingsGoal')}
            style={styles.view}
          >
            <AddIcon
              style={{
                position: 'absolute',
                right: size.getWidthSize(8),
                top: size.getHeightSize(8),
              }}
              size={size.getHeightSize(28)}
            />
            <FluentIcon size={size.getHeightSize(56)} />
            <View
              style={{
                width: size.getWidthSize(236),
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
                Reach your unique individual saving goals for 45 days to 90 days
                with {savingsType?.interestRate}% interest P.A
              </CText>
            </View>
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
                : accruedInterest?.data || '0.00'}
            </CText>
          </LinearGradient>
          <Pressable
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
          </View>
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
            <CText
              color={colors.black('70') as any}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="bold"
              style={{
                borderBottomWidth: size.getHeightSize(3),
                borderColor: '#31005CB2',
              }}
            >
              Ongoing
            </CText>
            <CText
              color={colors.black('40') as any}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="bold"
            >
              Rollover
            </CText>
            <CText
              color={colors.black('40') as any}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="bold"
            >
              Completed
            </CText>
          </View>
          <View
            style={{
              minHeight: size.getHeightSize(228),
              backgroundColor: colors.white(),
              borderRadius: size.getHeightSize(8),
              marginTop: size.getHeightSize(28),
              justifyContent: 'center',
              paddingHorizontal: size.getWidthSize(8),
              paddingVertical: size.getHeightSize(8),
              // alignItems: 'center',
            }}
          >
            {/* <SaveMoneyIcon
              style={{
                alignSelf: 'center',
              }}
              size={size.getHeightSize(103)}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(8),
                backgroundColor: colors.appBackground(),
                paddingVertical: size.getHeightSize(8),
                paddingHorizontal: size.getWidthSize(8),
                borderRadius: size.getHeightSize(8),
              }}
            >
              <View
                style={{
                  height: size.getHeightSize(57),
                  width: size.getHeightSize(57),
                  borderRadius: '100%',
                  backgroundColor: '#53AF9226',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                  My Savings
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={22}
                  fontFamily="bold"
                >
                  ₦150,000.00
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
                      4 Weeks
                    </CText>
                  </CText>
                </View>
              </View>
              <AnimatedCircularProgress
                fill={25}
                size={size.getHeightSize(61)}
                width={size.getHeightSize(6)}
                tintColor="#F75555"
                backgroundColor={'#F7555526'}
                backgroundWidth={size.getHeightSize(6)}
                rotation={0}
                lineCap="round"
                style={
                  {
                    // flex: 1,
                  }
                }
              >
                {(fill) => (
                  <CText
                    color={'#F75555' as any}
                    fontSize={12}
                    lineHeight={16.8}
                    fontFamily="bold"
                  >
                    25%
                  </CText>
                )}
              </AnimatedCircularProgress>
            </View>
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
});
