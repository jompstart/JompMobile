import { StyleSheet, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useContext, useEffect, useReducer, useState } from 'react';
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
} from '../../reducers/services.reducer';
import { ProviderService } from '../../services/providers/provider';
import { userSelector } from '../../features/user/user.selector';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { updateToast } from '../../features/ui/ui.slice';
import { useGetIdempotencyKey } from '../../hooks/api/auth';

// Custom Dropdown Component
const CustomDropdown = ({ 
  options, 
  selectedValue, 
  onValueChange, 
  placeholder 
}: {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    const selectedOption = options.find(option => option.value === selectedValue);
    setSelectedLabel(selectedOption ? selectedOption.label : '');
  }, [selectedValue, options]);

  const handleSelect = (value: string, label: string) => {
    onValueChange(value);
    setSelectedLabel(label);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          borderWidth: 1,
          borderColor: '#E5E5E5',
          borderRadius: 8,
          padding: 16,
          backgroundColor: 'white',
        }}
      >
        <CText
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: selectedValue ? 0.75 : 0.6,
          }}
        >
          {selectedLabel || placeholder}
        </CText>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >


          
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
              width: '80%',
              maxHeight: '60%',
            }}
          >
            <CText
              color={'black'}
              fontSize={18}
              lineHeight={28.8}
              fontFamily="bold"
              style={{
                opacity: 0.75,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Select Accommodation Type
            </CText>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value, item.label)}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F0F0F0',
                  }}
                >
                  <CText
                    color={'black'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="regular"
                    style={{
                      opacity: 0.75,
                    }}
                  >
                    {item.label}
                  </CText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: '#F0F0F0',
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <CText
                color={'black'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="medium"
                style={{
                  opacity: 0.75,
                }}
              >
                Cancel
              </CText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  const [shouldDisableButton, setShouldDisableButton] = React.useState(false);
  const idempotencyKey = useGetIdempotencyKey();
  const [state, dispatch] = useReducer(
    rentLoanFormReducer,
    rentLoanInitailState
  );
  
  // Accommodation type options
  const accommodationOptions = [
    { label: 'Self Contain (Selfcon)', value: 'selfcon' },
  { label: 'Single Room (Shared Facilities)', value: 'single_room' },
  { label: 'Mini Flat (1 Bedroom + Living Room)', value: 'mini_flat' },
  { label: '2 Bedroom Flat', value: '2_bedroom' },
  { label: '3 Bedroom Flat', value: '3_bedroom' },
  { label: 'Bungalow', value: 'bungalow' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Terrace', value: 'terrace' },
  { label: 'Penthouse', value: 'penthouse' },
  { label: 'Studio Apartment', value: 'studio' },
  { label: 'Mansion', value: 'mansion' },
  { label: 'Others', value: 'others' },
  ];

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
      navigation.navigate('SuccessPage');
    },
  });
  
  useEffect(() => {
    shouldLoad(isPending);
  }, [isPending]);
  
  useEffect(() => {
    const isFormValid =
      state.rentAmount &&
      state.requestedAmount &&
      state.landlordName &&
      state.landlordAccountName &&
      state.landlordAccountNumber &&
      state.landlordBankName &&
      state.landlordContactNumber &&
      state.occupation &&
      state.companyName &&
      state.companyPhone &&
      state.yearsInCompany &&
      state.companyEmail &&
      state.companyAddress &&
      state.id?.uri &&
      state.utilityBill?.uri &&
      state.bankStatement?.uri &&
      state.tenancyAgreement?.uri &&
      state.payMentSlip?.uri;
    setShouldDisableButton(!isFormValid);
  }, [state]);

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
        {/* Accommodation Type Dropdown */}
        <View>
  <CustomDropdown
    options={accommodationOptions}
    selectedValue={state.accommodationType}
    onValueChange={(value) => {
      dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: value });
    }}
    placeholder="Select Type of Accommodation"
  />
</View>

        {/* Rest of your form fields remain the same */}
        <PTextInput
          isAmount
          value={state.rentAmount}
          onChangeText={(text) => {
            dispatch({ type: 'SET_RENT_AMOUNT', payload: text });
          }}
          placeholder="Rent Amount"
        />
        <PTextInput
          isAmount
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
        
        {/* Landlord Email (Optional) */}
        <PTextInput
          keyboardType="email-address"
          value={state.landlordEmail}
          onChangeText={(text) => {
            dispatch({ type: 'SET_LANDLORD_EMAIL', payload: text });
          }}
          placeholder="Landlord Email (Optional)"
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
        
        {/* Updated Company/Organization Name Field */}
        <PTextInput
          value={state.companyName}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_NAME', payload: text });
          }}
          placeholder="Your Company/Organization Name"
        />
        
        <PTextInput
          value={state.companyPhone}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_PHONE', payload: text });
          }}
          placeholder="Company/Organization Phone Number"
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
          placeholder="Company/Organization Email Address"
        />

        <PTextInput
          value={state.companyAddress}
          onChangeText={(text) => {
            dispatch({ type: 'SET_COMPANY_ADDRESS', payload: text });
          }}
          placeholder="Company/Organization Address"
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
          type=".pdf (max. 1MB)"
          onFileSelected={(file) => {
            dispatch({ type: 'SET_UTILITY_BILL', payload: file });
          }}
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT', payload: file });
          }}
          description="6 Months Bank Statement."
          type=".pdf, (max. 1MB)"
          typeOfFileToPick={'pdf'}
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_TENANCY_AGREEMENT', payload: file });
          }}
          description="Tenancy Agreement."
          type=".pdf, (max. 1MB)"
        />

        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_PAYMENT_SLIP', payload: file });
          }}
          description="Payment Slip."
          type=".pdf, (max. 1MB)"
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT2', payload: file });
          }}
          description="Bank Statement 2."
          type=".pdf, (max. 1MB)"
          typeOfFileToPick={'pdf'}
        />
        <AttachmentView
          onFileSelected={(file) => {
            dispatch({ type: 'SET_BANK_STATEMENT3', payload: file });
          }}
          description="Bank Statement 3."
          type=".pdf, (max. 1MB)"
          typeOfFileToPick={'pdf'}
        />
      </View>
      <View
        style={{
          marginTop: size.getHeightSize(32),
        }}
      >
        <PrimaryButton
          disabled={shouldDisableButton || isPending}
          label="Proceed"
          onPress={async () => {
            mutate({
              ...state,
              IdempotencyKey: idempotencyKey,
            });
          }}
        />
      </View>
    </View>
  );
};

export default HouseRentsForms;

const styles = StyleSheet.create({});