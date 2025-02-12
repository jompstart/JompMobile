import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { LinearGradient } from 'expo-linear-gradient';
import { size } from '../../config/size';
import WalletIcon from '../../../assets/svgs/Home/WalletIcon';
import HouseIcon from '../../../assets/svgs/Home/HouseIcon';
import SchoolIcon from '../../../assets/svgs/Home/SchoolIcon';
import PiggyIcon from '../../../assets/svgs/Home/PiggyIcon';
import WithdrawIcon from '../../../assets/svgs/Home/WithdrawIcon';
import CustomerIcon from '../../../assets/svgs/Home/CustomerIcon';
import CarIcon from '../../../assets/svgs/Home/CarIcon';
import BankIcon from '../../../assets/svgs/Home/BankIcon';
import CopyIcon from '../../../assets/svgs/Home/CopyIcon';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import PersonIcon from '../../../assets/svgs/Home/PersonIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '../../shared/PrimaryButton';
import BillImage from '../../../assets/svgs/Home/BillImage';
import SavingsIcon from '../../../assets/svgs/Home/SavingsIcon';
const Dashboard = () => {
  return (
    <GradientSafeAreaView>
      <LinearGradient
        colors={['#EFA005', '#C5520A']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: size.getHeightSize(60),
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: size.getWidthSize(16),
          gap: size.getWidthSize(8),
          paddingBottom: size.getHeightSize(8),
        }}
      >
        <MenuIcon size={size.getHeightSize(28)} />
        <View style={{ flex: 1 }} />
        <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} />
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
          paddingHorizontal: size.getWidthSize(20),
          marginTop: size.getHeightSize(20),
        }}
      >
        <PersonIcon size={size.getHeightSize(40)} />
        <CText
          color={'black'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Hello, Timmy
        </CText>
      </View>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(16),
          backgroundColor: colors.primary(),
          marginHorizontal: size.getWidthSize(16),
          borderRadius: size.getHeightSize(16),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: size.getHeightSize(20),
          justifyContent: 'space-between',
        }}
      >
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
              lineHeight={22.4}
              fontFamily="semibold"
            >
              Wallet Balance
            </CText>
          </View>
          <CText
            color={'white'}
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
          >
            <CText
              color={'white'}
              fontSize={16}
              lineHeight={25.6}
              fontFamily="regular"
            >
              ₦
            </CText>{' '}
            0.00
          </CText>
        </View>
        <View
          style={{
            gap: size.getHeightSize(14),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.white(),
              paddingHorizontal: size.getWidthSize(8),
              paddingVertical: size.getHeightSize(8),
              alignSelf: 'flex-end',
              gap: size.getWidthSize(4),
              borderRadius: size.getHeightSize(16),
            }}
          >
            <CText
              color={'#31005C' as any}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
            >
              1234567890
            </CText>
            <CopyIcon size={size.getHeightSize(16)} />
          </View>
          <View
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
          </View>
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
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <CText
                color={'black'}
                fontSize={13}
                lineHeight={20.8}
                fontFamily="bold"
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
          </View>
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <CText
                color={'black'}
                fontSize={13}
                lineHeight={20.8}
                fontFamily="bold"
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
                    Start Saving
                  </CText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
          marginHorizontal: size.getWidthSize(16),
          marginVertical: size.getHeightSize(16),
          backgroundColor: colors.white(),
          borderRadius: size.getHeightSize(8),
        }}
      >
        <View style={styles.view1}>
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
        </View>
        <View style={styles.view1}>
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
        </View>
        <View style={styles.view1}>
          <View style={styles.view}>
            <CarIcon size={size.getHeightSize(26)} />
          </View>
          <CText
            color={'black'}
            fontSize={10}
            lineHeight={16}
            fontFamily="regular"
          >
            Transport Credit
          </CText>
        </View>
        <View style={styles.view1}>
          <View style={styles.view}>
            <SavingsIcon size={size.getHeightSize(26)} />
          </View>
          <CText
            color={'black'}
            fontSize={10}
            lineHeight={16}
            fontFamily="regular"
          >
            School Fees
          </CText>
        </View>
        <View style={styles.view1}>
          <View style={styles.view}>
            <WalletIcon size={size.getHeightSize(26)} />
          </View>
          <CText
            color={'black'}
            fontSize={10}
            lineHeight={16}
            fontFamily="regular"
          >
            Fund Wallet
          </CText>
        </View>
        <View style={styles.view1}>
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
        </View>
        <View style={styles.view1}>
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
        </View>
        <View style={styles.view1}>
          <View style={styles.view}>
            <PersonIcon size={size.getHeightSize(26)} />
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
        </View>
      </View>
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
});
