import { StyleSheet, Text, View } from 'react-native';
import React, { useReducer, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { colors } from '../../constants/colors';
import InfoIcon from '../../../assets/svgs/Loan/InfoIcon';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
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

interface Forms {
  salary: number;
  loanAmount: number;
  durationInMonths: number;
}
const formInitialState: Forms = {
  salary: 0,
  loanAmount: 0,
  durationInMonths: 3, // Default to 3 months as per the description
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
            This loan type offers a repayment of 3 months
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
            onChangeText={(text) => {
              stateDispatch({ type: 'SET_LOAN_AMOUNT', payload: +text });
            }}
            value={details.loanAmount.toString()}
            placeholder="₦ Enter your desired loan amount"
          />
          <PTextInput
            isAmount
            value={details.durationInMonths.toString()}
            onChangeText={(text) => {
              stateDispatch({
                type: 'SET_DURATION',
                payload: +text,
              });
            }}
            placeholder="Enter duration in months"
            rightIcon={
              <MaterialIcons
                name="mail-outline"
                size={size.getHeightSize(20)}
                color={colors.primary()}
              />
            }
          />
        </View>
        <PrimaryButton
          isLoading={isPending}
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

            calculateLoanOffer({
              salary: details.salary,
              loanAmount: details.loanAmount,
              durationInMonths: details.durationInMonths,
            });
          }}
        />
      </View>
      <LoanDescriptionsheet
        isVisible={showBottomsheet}
        onClose={() => setShowBottomsheet(false)}
        data={data?.data}
      />
      <ShowLoader isLoading={isPending} />
    </GradientSafeAreaView>
  );
};

export default LoanCalculatorForm;

const styles = StyleSheet.create({});
