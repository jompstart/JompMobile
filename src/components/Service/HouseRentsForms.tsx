import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useReducer } from 'react';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import PTextInput from '../../shared/PTextInput';
import AttachmentView from '../../shared/AttachmentView';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { CustomerServicesContext } from '../../context/ServicesContext';
import PrimaryButton from '../../shared/PrimaryButton';
import {
  HouseRentLoanFormState,
  rentLoanFormReducer,
  rentLoanInitailState,
} from '../../features/user/user.reducer';
import { ProviderService } from '../../services/providers/provider';
import { userSelector } from '../../features/user/user.selector';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { updateToast } from '../../features/ui/ui.slice';
const HouseRentsForms = ({
  shouldLoad,
}: {
  shouldLoad: (state: boolean) => void;
}) => {
  const user = useAppSelector(userSelector);
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const { houseRentDetails, setHouseRentDetails } = useContext(
    CustomerServicesContext
  );
  const [state, dispatch] = useReducer(
    rentLoanFormReducer,
    rentLoanInitailState
  );
  const { mutate, data, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    HouseRentLoanFormState
  >({
    mutationFn: (data) => providerInstance.requestHouseRentLoan(data),
    onError: (error) => {
      console.log('======= service error =======');
      console.log(error);
      appDispatch(
        updateToast({
          toastMessage: error?.message || 'An error occurred',
          displayToast: true,
          toastType: 'info',
        })
      );
    },
    onSuccess: (data) => {
      console.log('======= service success =======');
      console.log(data);
      navigation.navigate('SuccessPage');
      // appDispatch(
      //   updateToast({
      //     toastMessage: data?.message,
      //     displayToast: true,
      //     toastType: data?.success === true ? 'success' : 'info',
      //   })
      // );
    },
  });
  useEffect(() => {
    shouldLoad(isPending);
  }, [isPending]);
  const d = {
    bankStatement: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/C19CC0A6-B6AC-4056-B150-FDFF4CE69AF7.pdf',
    },
    bankStatement2: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/299A8FB6-57B7-429F-8748-1BDCBC56A7CF.pdf',
    },
    bankStatement3: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/F8592568-15BA-4CC9-9340-82EC71381E99.pdf',
    },
    companyAddress: 'Lagos',
    companyEmail: 'Jomp@gmail.com',
    companyName: 'Jomp',
    companyPhone: '09070903614',
    id: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/FE4C232A-4AB6-4BE5-AE3C-6ACDE192F2C7.pdf',
    },
    landlordAccountName: 'Ayomide',
    landlordAccountNumber: '123344',
    landlordBankName: 'Wema ',
    landlordContactNumber: '09070903614',
    landlordName: 'Ayomide',
    occupation: 'Developer',
    payMentSlip: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/FE4C232A-4AB6-4BE5-AE3C-6ACDE192F2C7.pdf',
    },
    rentAmount: '1000',
    requestedAmount: '1000',
    tenancyAgreement: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/CCF1E138-C41D-4057-A849-600AC601580E.pdf',
    },
    utilityBill: {
      name: 'ELG3336Microprocessor.pdf',
      type: 'application/pdf',
      uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/12C7E01F-6095-44E1-8BA9-711C3D178913.pdf',
    },
    yearsInCompany: '2',
  } as HouseRentLoanFormState;

  return (
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
        Pay House Rent
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
        style={{
          opacity: 0.75,
          marginTop: size.getHeightSize(4),
        }}
      >
        Complete the form below to process your house rent payment.
      </CText>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(25),
        }}
      >
        <PTextInput
          value={state.rentAmount}
          onChangeText={(text) => {
            dispatch({ type: 'SET_RENT_AMOUNT', payload: text });
          }}
          placeholder="Rent Amount"
        />
        <PTextInput
          value={state.requestedAmount}
          onChangeText={(text) => {
            dispatch({ type: 'SET_REQUESTED_AMOUNT', payload: text });
          }}
          placeholder="Requested Amount"
        />

        <PTextInput
          value={state.landlordName}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_NAME', payload: text });
          }}
          placeholder="Name of Landlord"
        />
        <PTextInput
          value={state.landlordAccountName}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_ACCOUNT_NAME', payload: text });
          }}
          placeholder="Landlord Account Name"
        />
        <PTextInput
          value={state.landlordAccountNumber}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_ACCOUNT_NUMBER', payload: text });
          }}
          placeholder="Landlord Account Number"
          keyboardType="phone-pad"
        />
        <PTextInput
          value={state.landlordBankName}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_BANK_NAME', payload: text });
          }}
          placeholder="Landlord Bank Name"
        />
        <PTextInput
          value={state.landlordContactNumber}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_CONTACT_NUMBER', payload: text });
          }}
          placeholder="Landlord Contact Number"
          keyboardType="phone-pad"
        />
        <PTextInput
          value={state.occupation}
          onChangeText={(text) => {
            dispatch({ type: 'SET_OCCUPATION', payload: text });
          }}
          placeholder="Your Occupation"
        />
        <PTextInput
          value={state.companyName}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_NAME', payload: text });
          }}
          placeholder="Your Company Name"
        />
        <PTextInput
          value={state.companyPhone}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_PHONE', payload: text });
          }}
          placeholder="Company Phone Number"
          keyboardType="phone-pad"
        />
        <PTextInput
          value={state.yearsInCompany}
          onChangeText={(text) => {
            dispatch({ type: 'SET_YEARS_IN_COMPANY', payload: text });
          }}
          placeholder="Years of Service"
        />
        <PTextInput
          keyboardType="email-address"
          value={state.companyEmail}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_EMAIL', payload: text });
          }}
          placeholder="Company Email Address"
        />

        <PTextInput
          value={state.companyAddress}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_ADDRESS', payload: text });
          }}
          placeholder="Company Address"
        />

        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_ID', payload: file });
          }}
          description="ID Card."
          type=".pdf, .Jpeg (max. 1MB)"
        />
        <AttachmentView
          description="Utility Bill."
          type=".pdf, .Jpeg (max. 1MB)"
          onFileSelected={(file) => {
            dispatch({ type: 'SET_UTILITY_BILL', payload: file });
          }}
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT', payload: file });
          }}
          description="6 Months Bank Statement."
          type=".pdf, .Jpeg (max. 1MB)"
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_TENANCY_AGREEMENT', payload: file });
          }}
          description="Tenancy Agreement."
          type=".pdf, .Jpeg (max. 1MB)"
        />

        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_PAYMENT_SLIP', payload: file });
          }}
          description="Payment Slip."
          type=".pdf, .Jpeg (max. 1MB)"
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT2', payload: file });
          }}
          description="Bank Statement 2."
          type=".pdf, .Jpeg (max. 1MB)"
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT3', payload: file });
          }}
          description="Bank Statement 3."
          type=".pdf, .Jpeg (max. 1MB)"
        />
      </View>
      <View
        style={{
          marginTop: size.getHeightSize(32),
        }}
      >
        <PrimaryButton
          label="Proceed"
          onPress={async () => {
            mutate(state);
          }}
        />
      </View>
    </View>
  );
};

export default HouseRentsForms;

const styles = StyleSheet.create({});
