import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { colors } from '../../constants/colors';
import InfoIcon from '../../../assets/svgs/Loan/InfoIcon';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@tanstack/react-query';
import LoanDescriptionsheet from '../../components/LoanCalculator/LoanDescriptionsheet';
import { LoanCalculatorFormProps } from '../../types/navigations.types';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { ProviderService } from '../../services/providers/provider';
import { API_RESPONSE } from '../../types';
import {
  CalculateLoanDto,
  CalculateLoanResponse,
} from '../../services/providers/provider.dto';
import { updateToast } from '../../features/ui/ui.slice';
import ShowLoader from '../../shared/ShowLoader';
import { useNavigation } from '@react-navigation/native';

interface Forms {
  salary: number;
  loanAmount: number;
  durationInMonths: number;
}
const formInitialState: Forms = {
  salary: 0,
  loanAmount: 0,
  durationInMonths: 0, // Default to 3 months as per the description
};
type FormAction =
  | { type: 'SET_SALARY'; payload: number }
  | { type: 'SET_LOAN_AMOUNT'; payload: number }
  | { type: 'SET_DURATION'; payload: number };
const loanCalculatorReducer = (state: Forms, action: FormAction): Forms => {
  switch (action.type) {
    case 'SET_SALARY':
      return { ...state, salary: action.payload };
    case 'SET_LOAN_AMOUNT':
      return { ...state, loanAmount: action.payload };
    case 'SET_DURATION':
      return { ...state, durationInMonths: action.payload };
    default:
      return state;
  }
};

const LoanCalculatorForm = ({ route: { params } }: LoanCalculatorFormProps) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [showBottomsheet, setShowBottomsheet] = useState(false);
  const [details, stateDispatch] = useReducer(
    loanCalculatorReducer,
    formInitialState
  );
  const { navigate } = useNavigation();
  const loanType = params?.loanType || 'House Rent';
  const pageTitle =
    loanType === 'rent'
      ? 'House Rent'
      : loanType === 'school fee'
      ? 'School Fees'
      : 'Transport Credit';
  const pageSubtitle =
    loanType === 'rent'
      ? 'House Rent'
      : loanType === 'school fee'
      ? 'School Fees'
      : 'Transportation';

  const loanDuration =
    params?.loanType === 'school fee' ? 3 : params?.loanType === 'rent' ? 6 : 1;
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const {
    mutateAsync: calculateLoanOffer,
    isPending,
    data,
  } = useMutation<API_RESPONSE<CalculateLoanResponse>, Error, CalculateLoanDto>(
    {
      mutationFn: (data) => providerInstance.calculateLoan(data),
      onSuccess: (response) => {
        setShowBottomsheet(true);
      },
      onError: (error) => {
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: error.message,
            toastType: 'info',
          })
        );
        console.error('Error calculating loan offer:', error);
      },
    }
  );

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
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <KeyboardAwareScrollView>
          <CText
            fontSize={16}
            lineHeight={22}
            fontFamily="semibold"
            style={{
              textAlign: 'left',
              marginTop: size.getHeightSize(16),
            }}
          >
            {pageTitle}
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              textAlign: 'left',
              marginTop: size.getHeightSize(4),
            }}
          >
            Estimate loan for {pageSubtitle}
          </CText>
          <View
            style={{
              backgroundColor: colors.primary('10'),
              paddingHorizontal: size.getWidthSize(8),
              paddingVertical: size.getHeightSize(8),
              borderRadius: size.getHeightSize(8),
              gap: size.getWidthSize(8),
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            <InfoIcon size={size.getHeightSize(20)} />
            <CText
              color="black"
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
              style={{
                flex: 1,
              }}
            >
              This loan type offers a repayment of {loanDuration}{' '}
              {loanDuration == 1 ? 'month' : 'months'}
            </CText>
          </View>

          <View
            style={{
              gap: size.getHeightSize(16),
              marginTop: size.getHeightSize(16),
            }}
          >
            <PTextInput
              isAmount
              value={details.salary.toString()}
              onChangeText={(text) => {
                stateDispatch({ type: 'SET_SALARY', payload: +text });
              }}
              placeholder="₦ Enter your predictable monthly income"
            />
            <PTextInput
              isAmount
              maxAmount={500000}
              onChangeText={(text) => {
                stateDispatch({ type: 'SET_LOAN_AMOUNT', payload: +text });
              }}
              value={details.loanAmount.toString()}
              placeholder="₦ Enter your desired loan amount"
            />

            <View
              style={{
                height: size.getHeightSize(52),
                borderColor: '#21212130',
                borderWidth: size.getHeightSize(1),
                backgroundColor: colors.white(),
                borderRadius: size.getHeightSize(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: size.getWidthSize(16),
              }}
            >
              <AntDesign
                name="minus"
                color={colors.primary()}
                size={size.getHeightSize(24)}
                onPress={() => {
                  if (details.durationInMonths > 1) {
                    stateDispatch({
                      type: 'SET_DURATION',
                      payload: details.durationInMonths - 1,
                    });
                  }
                }}
              />
              <CText
                color="secondaryBlack"
                fontSize={16}
                lineHeight={22.4}
                fontFamily="semibold"
              >
                {details.durationInMonths.toString()}
              </CText>
              <AntDesign
                onPress={() => {
                  if (Number(details.durationInMonths) < Number(loanDuration)) {
                    stateDispatch({
                      type: 'SET_DURATION',
                      payload: details.durationInMonths + 1,
                    });
                  }
                }}
                name="plus"
                color={colors.primary()}
                size={size.getHeightSize(24)}
              />
            </View>
          </View>
          <PrimaryButton
            // isLoading={isPending}
            style={{
              marginTop: size.getHeightSize(40),
            }}
            label="Calculate Loan Offer"
            onPress={() => {
              if (details.salary <= 0 || details.loanAmount <= 0) {
                dispatch(
                  updateToast({
                    displayToast: true,
                    toastMessage: 'Please enter valid salary and loan amount',
                    toastType: 'info',
                  })
                );
                return;
              }
              else if(details.durationInMonths <= 0) {
                dispatch(
                  updateToast({
                    displayToast: true,
                    toastMessage: 'Please select a valid duration',
                    toastType: 'info',
                  })
                );
                return;
              }

              calculateLoanOffer({
                salary: details.salary,
                loanAmount: details.loanAmount,
                durationInMonths: details.durationInMonths,
              });
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <LoanDescriptionsheet
        onContinue={() => {
          if (loanType === 'rent') {
            navigate('HouseRentService');
          } else if (loanType == 'school fee') {
            navigate('PayServices');
          } else if (loanType == 'transport') {
            navigate('TransportDetails');
          }
        }}
        isVisible={showBottomsheet}
        onClose={() => {
          setShowBottomsheet(false);
        }}
        label={
          loanType === 'rent'
            ? 'Apply For House Rent'
            : loanType === 'school fee'
            ? 'Apply for School Fees'
            : 'Apply For Transport Credit'
        }
        data={data?.data}
      />
      <ShowLoader isLoading={isPending} />
    </GradientSafeAreaView>
  );
};

export default LoanCalculatorForm;

const styles = StyleSheet.create({});
