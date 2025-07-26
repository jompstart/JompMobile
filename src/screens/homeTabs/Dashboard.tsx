import {
  StyleSheet,
  View,
  Pressable,
  RefreshControl,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { size } from '../../config/size';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import SupportIcon from '../../../assets/svgs/Home/SupportIcon';
import GradientHeader from '../../shared/GradientHeader';
import {
  useAppSelector,
  useAppDispatch,
} from '../../controller/redux.controller';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { userSelector } from '../../features/user/user.selector';
import {
  updateAccountDetailsBottomsheetVisibility,
  updatePayNowBottomsheet,
  updatePayStackModal,
} from '../../features/ui/ui.slice';
import { formatToAmount } from '../../utils/stringManipulation';
import {
  useGetRecentTransactions,
  useRefreschUserData,
} from '../../hooks/api/user';
import RecentTransaction from '../../components/Transaction/RecentTransaction';
import Banner from '../../components/Dashboard/Banner';
import {
  useGetPendingAdminReview,
  useGetPendingServices,
} from '../../hooks/api/providers';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import LoanAgreement from '../../shared/LoanAgreement';
import PaystackView from '../../shared/PaystackView';
import PaymentBalanceInfo from '../../shared/PaymentBalanceInfo';
const Dashboard = () => {
  const [showPendingServiceModal, setShowPendingServiceModal] = useState(false);
  const [payMode, setPayMode] = useState<'yes' | 'no' | null>(null);
  const { navigate, dispatch: navigationDispatch } = useNavigation();
  const user = useAppSelector(userSelector);

  const [showBalanceInfo, setShowBalanceInfo] = useState(false);
  const [showLoanAgreement, setShowLoanAgreement] = useState(false);
  const [agreedToLoanAgreement, setAgreedToLoanAgreement] = useState(false);
  const dispatch = useAppDispatch();
  const { data: recenTransactions, refetch: reloadRecentTransaction } =
    useGetRecentTransactions(user.customerId, user.userId);
  const { isPending, refetch } = useRefreschUserData();
  const { data: pendingServices, refetch: refetchPendingService } =
    useGetPendingServices(user.userId, user.customerId);
  const { data: pendingPayment, refetch: refetchPendingPayment } =
    useGetPendingAdminReview(user.userId, user.customerId);

  useEffect(() => {
    if (pendingServices?.data && pendingServices?.data?.length > 0) {
      setShowPendingServiceModal(true);
    } else {
      setShowPendingServiceModal(false);
    }
  }, [pendingServices]);

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
              refetchPendingService();
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
                dispatch(
                  updateAccountDetailsBottomsheetVisibility({
                    isVisible: true,
                    shouldConfirmTransfer: false,
                  })
                );
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
            {pendingServices?.data && pendingServices?.data?.length > 0 && (
              <Banner
                onPress={() => {
                  navigate('PendingService');
                }}
                description=" You currently have pending services that requires your
                    attention and review"
                step="1/3"
                title="Pending Service Request"
                buttonText="Review Service"
              />
            )}
            <Banner
              onPress={() => {
                navigate('UserCreated');
              }}
              description="Yes, we all do! But managing them doesn't have to be
                    overwhelming. Do it with JOMP"
              step={
                pendingServices?.data && pendingServices?.data?.length > 0
                  ? '2/3'
                  : '1/2'
              }
              title="You have bills to pay?"
              buttonText="Pay with Jomp"
            />
            <Banner
              onPress={() => {
                navigate('Savings' as any);
              }}
              description="You can now save towards all your bills on JOMP and pay when
                    you’re ready."
              step={
                pendingServices?.data && pendingServices?.data?.length > 0
                  ? '3/3'
                  : '2/2'
              }
              title="Save with JOMP"
              buttonText="Start Saving"
            />
          </ScrollView>
        </View>

        {pendingPayment?.data?.serviceId && (
          <View style={styles.view8}>
            <View>
              <CText
                color={'secondary'}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
                style={{
                  letterSpacing: 0.04,
                }}
              >
                {pendingPayment?.message}
              </CText>

              <Pressable
                onPress={() => {
                  // setHasAcceptedLoanAgreement(!hasAcceptedLoanAgreement);
                  setShowLoanAgreement(true);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: size.getWidthSize(8),
                  marginTop: size.getHeightSize(8),
                }}
              >
                <Fontisto
                  name={
                    agreedToLoanAgreement
                      ? 'checkbox-active'
                      : 'checkbox-passive'
                  }
                  size={size.getHeightSize(18)}
                  color={colors.primary()}
                />
                <CText
                  color={'black'}
                  fontSize={13}
                  lineHeight={22.4}
                  fontFamily="regular"
                >
                  I agree to the Loan Agreement
                </CText>
              </Pressable>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: size.getWidthSize(32),
                  marginVertical: size.getHeightSize(8),
                  marginTop: size.getHeightSize(16),
                }}
              >
                <Pressable
                  disabled={!agreedToLoanAgreement}
                  onPress={() => {
                    setPayMode('yes');
                    setShowBalanceInfo(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: size.getWidthSize(8),
                  }}
                >
                  <MaterialIcons
                    name={
                      payMode === 'yes'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    color={colors.primary()}
                    size={size.getHeightSize(18)}
                  />
                  <CText>Yes</CText>
                </Pressable>
                <Pressable
                  disabled={!agreedToLoanAgreement}
                  onPress={() => {
                    setPayMode('no');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: size.getWidthSize(8),
                  }}
                >
                  <MaterialIcons
                    name={
                      payMode === 'no'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    color={colors.primary()}
                    size={size.getHeightSize(18)}
                  />
                  <CText>No</CText>
                </Pressable>
              </View>
              <SecondaryButton
                disabled={!agreedToLoanAgreement}
                // isLoading={isPaymentPending}
                onPress={() => {
                  if (payMode === 'yes') {
                    setShowBalanceInfo(true);
                  } else {
                    // payNow({
                    //   amount: pendingPayment?.data?.userContribution || 0,
                    //   loanAgreement: hasAcceptedLoanAgreement,
                    // });
                    dispatch(
                      updatePayNowBottomsheet({
                        amount: pendingPayment?.data?.userContribution || 0,
                        visible: true,
                        serviceId: pendingPayment?.data?.serviceId || '',
                      })
                    );
                  }
                }}
                label="Pay Now"
                style={{
                  marginTop: size.getHeightSize(16),
                }}
              />
            </View>
          </View>
        )}

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
        </View>
      </ScrollView>
      <Modal
        transparent
        // visible={false}
        visible={showPendingServiceModal}
        onRequestClose={() => {
          setShowPendingServiceModal(false);
        }}
        onDismiss={() => {
          setShowPendingServiceModal(false);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={24}
              fontFamily="bold"
              style={{ textAlign: 'center' }}
            >
              Pending Service Request
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="regular"
              style={{ textAlign: 'center', marginTop: size.getHeightSize(8) }}
            >
              You currently have pending services that requires your attention
              and review.
            </CText>
            <PrimaryButton
              label="Review now"
              style={{
                marginTop: size.getHeightSize(16),
              }}
              onPress={() => {
                setShowPendingServiceModal(false);
                navigate('PendingService');
              }}
            />
            <SecondaryButton
              label="Review later"
              style={{
                marginTop: size.getHeightSize(12),
              }}
              onPress={() => {
                setShowPendingServiceModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <PaystackView
        onClose={() => {
          dispatch(
            updatePayStackModal({
              url: '',
              visible: false,
            })
          );
          refetchPendingPayment();
        }}
      />
      <PaymentBalanceInfo
        amountToPay={
          (pendingPayment?.data?.balanceToBePaid ?? 0) +
            (pendingPayment?.data?.mobileUserContribution ?? 0) || 0
        }
        balanceToPay={pendingPayment?.data?.balanceToBePaid || 0}
        userContribution={pendingPayment?.data?.mobileUserContribution || 0}
        isVisible={showBalanceInfo}
        onClose={() => {
          setShowBalanceInfo(false);
        }}
        onPress={() => {
          setShowBalanceInfo(false);
          dispatch(
            updatePayNowBottomsheet({
              amount: pendingPayment?.data?.userContribution || 0,
              visible: true,
              serviceId: pendingPayment?.data?.serviceId || '',
            })
          );
          // payNow({
          //   amount: pendingPayment?.data?.userContribution || 0,
          //   loanAgreement: hasAcceptedLoanAgreement,
          // });
        }}
      />
      <LoanAgreement
        visible={showLoanAgreement}
        url="https://dev.jompstart.com/loan-agreement"
        onClose={() => {
          setShowLoanAgreement(false);
        }}
        agree={agreedToLoanAgreement}
        onAccept={() => {
          setAgreedToLoanAgreement((prev) => !prev);
        }}
      />
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: size.getWidthSize(300),
    backgroundColor: colors.appBackground(),
    borderRadius: size.getHeightSize(16),
    padding: size.getHeightSize(16),
  },
  view8: {
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(16),
    marginBottom: size.getHeightSize(16),
    marginHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
  },
});
