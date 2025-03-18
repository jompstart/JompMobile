import {
  StyleSheet,
  ScrollView,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { ProviderService } from '../../services/provider';
import BanksBottomsheet from '../../components/Dashboard/BanksBottomsheet';
import { useMutation } from '@tanstack/react-query';
import { useGetBanks } from '../../hooks/api/auth';
import { Banks } from '../../interface/provider';
import { useNavigation } from '@react-navigation/native';
import {
  useAppSelector,
  useAppDispatch,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { updateToast } from '../../features/ui/ui.slice';
import { searchArray } from '../../utils/stringManipulation';
const AddBank = () => {
  const user = useAppSelector(userSelector);
  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const serProviderInstance = new ProviderService(user.userId);
  const [bankData, setBankData] = useState<Array<Banks>>([]);
  const [filteredBankData, setFilteredBankData] = useState<Array<Banks>>([]);
  const { data, isLoading } = useGetBanks(user.userId);
  const [showBankList, setShowBankList] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Banks | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [acctName, setAccountName] = useState('');

  const {
    mutate: validateBank,
    isPending,
    isError,
    isSuccess: validationSuccess,
    error,
    data: validationData,
  } = useMutation({
    mutationFn: serProviderInstance.validateAcct,
    onError: (error) => {
      console.log('======= acct validation error =======');
      console.log(error);
    },
  });
  const { mutate: addBank, isPending: isAddingBank } = useMutation({
    mutationFn: serProviderInstance.addBank,
    onError: (error) => {
      console.log('======= add bank error =======');
      console.log(error);
    },
    onSuccess: (data) => {
      console.log('======= add bank success =======');
      console.log(data);
      dispatch(
        updateToast({
          toastMessage: 'Bank added successfully',
          displayToast: true,
          toastType: 'success',
        })
      );
      goBack();
    },
  });
  useEffect(() => {
    if (data?.data) {
      setBankData(data.data);
      setFilteredBankData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      validateBank({
        accountNumber,
        bankCode: selectedBank?.code,
        bankName: selectedBank?.name,
      });
    }
  }, [accountNumber, selectedBank]);

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
            Adding Bank Account
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            Link your bank account to Jompstart
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              setShowBankList(true);
            }}
            style={styles.dropDown}
          >
            <CText
              color={colors.black(selectedBank ? '' : '50') as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="regular"
              style={{
                letterSpacing: size.getWidthSize(0.2),
              }}
            >
              {selectedBank?.name ? selectedBank.name : 'Select Bank'}
            </CText>
            <MaterialIcons
              name="arrow-drop-down"
              color={colors.primary()}
              size={size.getHeightSize(40)}
            />
          </Pressable>

          <View
            style={{
              gap: size.getHeightSize(8),
            }}
          >
            <PTextInput
              title={accountNumber ? 'Account Number' : ''}
              onChangeText={setAccountNumber}
              placeholder="Account Number"
              keyboardType="number-pad"
              maxLength={10}
            />
            {isPending ? (
              <ActivityIndicator
                color={colors.idle()}
                style={{
                  marginTop: size.getHeightSize(8),
                  alignSelf: 'flex-end',
                }}
                size={size.getHeightSize(28)}
              />
            ) : (
              <CText
                color={isError ? colors.primaryWarning() : ('#31005C' as any)}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="bold"
                style={{
                  textAlign: 'right',
                }}
              >
                {isError
                  ? error?.message
                  : validationSuccess
                  ? validationData?.data?.account_name
                  : ''}
              </CText>
            )}
          </View>
          <PTextInput title="" placeholder="BVN" />
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <View
            style={{
              paddingVertical: size.getHeightSize(8),
              paddingHorizontal: size.getWidthSize(8),
              backgroundColor: '#FFF9E6',
              borderRadius: size.getHeightSize(8),
              marginTop: size.getHeightSize(24),
            }}
          >
            <View
              style={{
                gap: size.getHeightSize(18),
              }}
            >
              <CText
                color="secondaryBlack"
                fontSize={12}
                lineHeight={16}
                fontFamily="semibold"
              >
                The goal of the Bank Verification Number (BVN) is to uniquely
                verify the identity of a customer for know your customer (KYC
                purposes).
              </CText>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: size.getWidthSize(13.6),
                  }}
                >
                  <CheckCircle size={size.getHeightSize(15)} />
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    We only have access to your
                  </CText>
                </View>
                <View
                  style={{
                    borderLeftWidth: size.getWidthSize(2),
                    borderColor: colors.primarySuccess(),
                    marginLeft: size.getWidthSize(6.84),
                    marginTop: size.getHeightSize(4),
                    paddingLeft: size.getWidthSize(20.44),
                    gap: size.getHeightSize(7),
                  }}
                >
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Name
                  </CText>
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Email Address
                  </CText>
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Date of Birth
                  </CText>
                </View>
              </View>
              <CText
                color="secondaryBlack"
                fontSize={12}
                lineHeight={16}
                fontFamily="semibold"
              >
                Verifying your BVN does not allow us to access your bank account
                details, nor can we use your BVN to move money from your
                account. Your information is secure with us, and we will not
                share your BVN with anyone.
              </CText>
            </View>
          </View>
          <PrimaryButton
            onPress={() => {
              addBank({
                accountName: validationData?.data?.account_name!,
                accountNumber,
                bankCode: selectedBank?.code!,
                bankName: selectedBank?.name!,
              });
            }}
            isLoading={isAddingBank}
            disabled={!validationSuccess}
            style={{
              marginTop: size.getHeightSize(40),
            }}
            label="Submit"
          />
        </View>
      </ScrollView>
      <BanksBottomsheet
        banks={filteredBankData}
        isVisible={showBankList}
        onClose={() => {
          setShowBankList(false);
          setFilteredBankData(bankData);
        }}
        onSelectedBank={(bank) => {
          setSelectedBank(bank);
        }}
        onSearch={(text) => {
          const filtered = searchArray(bankData, 'name', text);
          setFilteredBankData(filtered);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  dropDown: {
    flexDirection: 'row',
    height: size.getHeightSize(52),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.black('30'),
    borderRadius: size.getHeightSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.white(),
  },
});
