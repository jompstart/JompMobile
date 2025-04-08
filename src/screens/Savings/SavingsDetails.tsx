import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import WithdrawBottomsheet from '../../components/Savings/WithdrawBottomsheet';
import { SavingsDetailsScreenProps } from '../../types/navigations.types';
import { useGetUserSavingsById } from '../../hooks/api/savings';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  formatToAmount,
  getTimeDifference,
} from '../../utils/stringManipulation';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import TopUpBottomsheet from '../../components/Savings/TopUpBottomsheet';

const SavingsDetails = ({ route: { params } }: SavingsDetailsScreenProps) => {
  const user = useAppSelector(userSelector);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const { data: savings } = useGetUserSavingsById(
    user.userId,
    user.customerId,
    params?.goalId
  );
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
            marginBottom: size.getHeightSize(16),
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
            ₦{formatToAmount(savings?.data?.targetAmount || '')}
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
              {savings?.data?.goalName}
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
              ₦{formatToAmount(savings?.data?.targetAmount || '')}
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
              {savings?.data?.endDate &&
                getTimeDifference(savings?.data?.endDate.toString())}
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
              {savings?.data?.savingType &&
                savings?.data?.savingType.slice(0, 1).toUpperCase() +
                  savings?.data?.savingType.slice(1)}
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
              ₦{formatToAmount(savings?.data?.preferedSavingAmount || '')}
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
              Maturity Date
            </CText>
            <CText
              color={'black'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="semibold"
            >
              {savings?.data?.endDate &&
                new Date(savings?.data?.endDate)?.toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
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
              {savings?.data?.savingMethod &&
                savings?.data?.savingMethod.slice(0, 1).toUpperCase() +
                  savings?.data?.savingMethod.slice(1)}
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
              {savings?.data?.autoWithDraw ? 'Yes' : 'No'}
            </CText>
          </View>
          {/* <View style={styles.view2}>
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
              {Math.ceil(
                (savings?.data?.savedAmount / savings.targetAmount) * 100
              )}
              %
            </CText>
          </View> */}
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
              ₦{formatToAmount(savings?.data?.interest || '')}
            </CText>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          marginHorizontal: size.getWidthSize(16),
          gap: size.getHeightSize(16),
          marginBottom: size.getHeightSize(40),
        }}
      >
        <PrimaryButton
          onPress={() => {
            setShowTopUp(true);
          }}
          label="Top Up"
        />
        <SecondaryButton
          label="Withdraw"
          onPress={() => {
            setShowWithdrawal(true);
          }}
        />
      </View>
      <WithdrawBottomsheet
        goalId={params?.goalId}
        onClose={() => {
          setShowWithdrawal(false);
        }}
        visibility={showWithdrawal}
      />
      <TopUpBottomsheet
        visibility={showTopUp}
        goalId={params?.goalId}
        onClose={() => {
          setShowTopUp(false);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default SavingsDetails;

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
