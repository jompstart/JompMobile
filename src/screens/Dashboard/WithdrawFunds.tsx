import { StyleSheet, ScrollView, Pressable, View } from 'react-native';
import React from 'react';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetUserBanks } from '../../hooks/api/auth';
import { obfuscateString } from '../../utils/stringManipulation';
import WithdrawToBankBottomsheet from '../../components/Withdrawal/WithdrawToBankBottomsheet';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import {
  CreateRecipientDto,
  CreateRecipientResponseDto,
} from '../../services/dto/user.dto';
import { UserService } from '../../services/user';
import { updateToast } from '../../features/ui/ui.slice';
import WithdrawalOtp from '../../components/Withdrawal/WithdrawalOtp';
const WithdrawFunds = () => {
  const user = useAppSelector(userSelector);
  const { navigate } = useNavigation();
  const { data: banks } = useGetUserBanks(user?.userId, user?.customerId);
  const [selectedBank, setSelectedBank] = React.useState<string | null>(null);
  const [inputAmount, setInputAmoutt] = React.useState<string>('');
  const [reason, setTransferReason] = React.useState('');
  const [showBottomsheet, setShowBottomsheet] = React.useState(false);
  const [shouldShowOtpBottomsheet, showOtpBottomsheet] = React.useState(false);
  const dispatch = useAppDispatch();
  const userInstance = new UserService(user.customerId, user.userId);

  const {
    data,
    isPending,
    mutate: createWithdrawal,
  } = useMutation<API_RESPONSE<string>, Error, CreateRecipientDto>({
    mutationFn: (data) => userInstance.createRecipient(data),
    onSuccess: (res) => {
      if (res.success) {
        setShowBottomsheet(true);
      }
    },
    onError: (err) => {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: err.message,
          toastType: 'info',
        })
      );
    },
  });

  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
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
        </View>
      </GradientHeader>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <CText
            color={colors.black('70') as any}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
          >
            Withdraw to Your Bank
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            Select bank to withdraw your funds into
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: size.getHeightSize(16),
              rowGap: size.getHeightSize(16),
              columnGap: size.getWidthSize(16),
            }}
          >
            {banks?.data?.map((bank, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectedBank(bank.bankCode);
                  }}
                  key={index}
                  style={
                    selectedBank == bank.bankCode
                      ? styles.selectedView
                      : styles.view1
                  }
                >
                  <View style={styles.view2}>
                    <CText
                      color={colors.black('70') as any}
                      fontSize={13}
                      lineHeight={18.2}
                      fontFamily="bold"
                      style={styles.text}
                    >
                      {bank.bankName}
                    </CText>
                    <CText
                      color={colors.black('70') as any}
                      fontSize={12}
                      lineHeight={16.8}
                      fontFamily="semibold"
                      style={styles.text}
                    >
                      {bank.accountName}
                    </CText>
                    <CText
                      color={colors.black('70') as any}
                      fontSize={12}
                      lineHeight={16.8}
                      fontFamily="semibold"
                      style={styles.text}
                    >
                      {obfuscateString(bank.accountNumber)}
                    </CText>
                  </View>
                </Pressable>
              );
            })}
            {/* <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View> */}
            <Pressable style={styles.view1} onPress={() => navigate('AddBank')}>
              <MaterialIcons
                color={colors.black('95') as any}
                name="add"
                size={size.getHeightSize(40)}
                style={{ alignSelf: 'center' }}
              />
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Do you want to add bank?
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Click to Add
                </CText>
              </View>
            </Pressable>
          </View>
          <View style={{ height: size.getHeightSize(24) }} />
          <PTextInput
            isAmount
            value={inputAmount}
            placeholder="₦ Enter Amount"
            onChangeText={setInputAmoutt}
          />
        </View>
      </ScrollView>
      <PrimaryButton
        disabled={!selectedBank || !inputAmount || isPending}
        isLoading={isPending}
        onPress={() => {
          const userSelectedbank = banks?.data?.find(
            (bank) => bank.bankCode == selectedBank
          );
          if (userSelectedbank) {
            createWithdrawal({
              accountNumber: userSelectedbank?.accountNumber,
              bankCode: userSelectedbank?.bankCode,
              bankName: userSelectedbank?.bankName,
            });
          }
        }}
        label="Proceed"
        style={{
          marginTop: size.getHeightSize(16),
          marginBottom: size.getHeightSize(32),
          marginHorizontal: size.getWidthSize(16),
        }}
      />
      <WithdrawToBankBottomsheet
        isVisible={showBottomsheet}
        recipientId={data?.data}
        onClose={() => setShowBottomsheet(false)}
        onChangeText={(transferPurpose) => {
          setTransferReason(transferPurpose);
        }}
        onSuccess={() => {
          showOtpBottomsheet(true);
          setShowBottomsheet(false);
        }}
      />
      <WithdrawalOtp
        recipientCode={data?.data!}
        reason={reason.toString()}
        amount={inputAmount}
        isVisible={shouldShowOtpBottomsheet}
        onClose={() => {
          showOtpBottomsheet(false);
        }}
        onSuccess={() => {
          navigate('SuccessPage', {
            title: 'Withdrawal Successful',
            message:
              'Your withdrawal request has been successfully submitted. You will receive a notification once it is processed.',
          });
        }}
      />
    </GradientSafeAreaView>
  );
};

export default WithdrawFunds;

const styles = StyleSheet.create({
  view1: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(15),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(8),
    width: size.getWidthSize(177),
  },
  selectedView: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(15),
    paddingVertical: size.getHeightSize(9),
    borderRadius: size.getHeightSize(8),
    width: size.getWidthSize(176),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.primary(),
  },
  check1: {
    position: 'absolute',
    top: size.getHeightSize(10),
    right: size.getWidthSize(10),
  },
  check2: {
    height: size.getHeightSize(20),
    width: size.getHeightSize(20),
    backgroundColor: colors.primary(),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check3: {
    height: size.getHeightSize(15),
    width: size.getHeightSize(15),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white(),
  },
  check4: {
    backgroundColor: colors.primary(),
    height: size.getHeightSize(10),
    width: size.getHeightSize(10),
    borderRadius: '100%',
  },
  imageView: {
    height: size.getHeightSize(75),
    width: size.getHeightSize(75),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  view2: {
    gap: size.getHeightSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
