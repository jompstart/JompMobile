import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import React, { useReducer } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import DateTimePicker from '@react-native-community/datetimepicker';
import PTextInput from '../../shared/PTextInput';
import PhoneInput from '../../shared/PhoneInput';
import AttachmentView from '../../shared/AttachmentView';
import PrimaryButton from '../../shared/PrimaryButton';
import ServiceCategory from '../../components/Service/ServiceCategory';
import {
  otherBillsFormReducer,
  otherBillsInitialState,
} from '../../reducers/services.reducer';
import RepaymentPlan from '../../components/Service/RepaymentPlan';
import OtherServiceStatus from '../../components/Service/OtherServiceStatus';
const OtherServices = () => {
  const [state, dispatch] = useReducer(
    otherBillsFormReducer,
    otherBillsInitialState
  );

  const [showCategory, setShowCategory] = React.useState(false);
  const [showRepaymentPlan, setShowRepaymentPlan] = React.useState(false);
  const [paymentMethod, setPaymentMethhod] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [showStatus, setShowStatus] = React.useState(false);

  return (
    <GradientSafeAreaView>
      <GradientHeader>
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
      </GradientHeader>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: size.getHeightSize(30),
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
            Other Services
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
            Access health, auto care, etc
          </CText>
          <View
            style={{
              gap: size.getHeightSize(16),
              marginTop: size.getHeightSize(16),
            }}
          >
            <PTextInput
              placeholder="Name of Service (e.g. Car Servicing)"
              required
              value={state.ServiceName}
              onChangeText={(text) => {
                dispatch({ type: 'SET_SERVICE_NAME', payload: text });
              }}
            />
            <PTextInput
              placeholder="Name of Service Provider (e.g. Hyundai Motors)"
              required
              value={state.ServiceProvider}
              onChangeText={(text) => {
                dispatch({ type: 'SET_SERVICE_PROVIDER', payload: text });
              }}
            />

            <PhoneInput
              placeholder="Provider’s Phone Number"
              value={state.ServiceProviderContact}
              onChangeText={(text) => {
                dispatch({
                  type: 'SET_SERVICE_PROVIDER_CONTACT',
                  payload: text,
                });
              }}
            />

            <PTextInput
              editable={false}
              placeholder="Select Service Category"
              required
              value={category}
              onPress={() => {
                setShowCategory(true);
              }}
            />
            <PTextInput
              placeholder="Cost of Service"
              isAmount
              value={state.CostOfService}
              required
              onChangeText={(text) => {
                dispatch({ type: 'SET_COST_OF_SERVICE', payload: text });
              }}
            />
            <PTextInput
              editable={false}
              value={state.RepaymentPlan}
              onPress={() => {
                setShowRepaymentPlan(true);
              }}
              placeholder="Select Repayment Plan"
              required
            />
            <PTextInput
              isAmount
              value={state.LoanAmountRequested}
              onChangeText={(text) => {
                dispatch({
                  type: 'SET_LOAN_AMOUNT_REQUESTED',
                  payload: text,
                });
              }}
              placeholder="Loan Amount"
              required
            />
            <PTextInput
              value={state.ServiceCompletionStatus}
              onPress={() => {
                setShowStatus(true);
              }}
              editable={false}
              placeholder="Service Status"
              required
            />
            <PTextInput placeholder="Reason for Loan" required />
            <PTextInput
              placeholder="Select Service Date"
              required
              rightIcon={
                <Feather
                  name="calendar"
                  size={size.getHeightSize(24)}
                  color={colors.primary()}
                />
              }
            />

            <PTextInput
              value={state.GuarantorName}
              placeholder="Name of Guarantor"
              required
              onChangeText={(text) => {
                dispatch({ type: 'SET_GUARANTOR_NAME', payload: text });
              }}
            />
            <PhoneInput
              value={state.GuarantorPhoneNumber}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                dispatch({
                  type: 'SET_GUARANTOR_PHONE_NUMBER',
                  payload: text,
                });
              }}
              placeholder="Guarantor’s Phone Number"
            />
            <PTextInput
              value={state.GuarantorAddress}
              onChangeText={(text) => {
                dispatch({ type: 'SET_GUARANTOR_ADDRESS', payload: text });
              }}
              placeholder="Guarantor’s Address"
              required
            />

            <AttachmentView
              description="Proof of Service. "
              type=".pdf, .jpeg (max. 1MB)"
              required
              fileUri={state.ProofOfService.uri}
              onFileSelected={(file) => {
                dispatch({ type: 'SET_PROOF_OF_SERVICE', payload: file });
              }}
            />
            <AttachmentView
              description="Valid ID (International Passport, Driver’s License ). "
              type=".pdf, .jpeg (max. 1MB)"
              required
              fileUri={state.ValidateId.uri}
              onFileSelected={(file) => {
                dispatch({ type: 'SET_VALIDATE_ID', payload: file });
              }}
            />
            <AttachmentView
              description="Bank Statement. "
              type=".pdf, .xsl (max. 1MB)"
              required
              fileUri={state.BankStatement.uri}
              onFileSelected={(file) => {
                dispatch({ type: 'SET_BANK_STATEMENT', payload: file });
              }}
              typeOfFileToPick={'pdf'}
            />
            <AttachmentView
              description="Utility Bill. "
              type=".pdf, .jpeg (max. 1MB)"
              required
              fileUri={state.UtilityBill.uri}
              onFileSelected={(file) => {
                dispatch({ type: 'SET_UTILITY_BILL', payload: file });
              }}
            />
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        label="Proceed"
        style={{
          marginBottom: size.getHeightSize(32),
          marginHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(16),
        }}
      />
      <ServiceCategory
        visibility={showCategory}
        onClose={() => {
          setShowCategory(false);
        }}
        selectedCategory={state.ServiceCategory}
        onSelect={(category) => {
          dispatch({ type: 'SET_SERVICE_CATEGORY', payload: category.id });
          setCategory(category.name);
        }}
      />
      <RepaymentPlan
        onClose={() => {
          setShowRepaymentPlan(false);
        }}
        visibility={showRepaymentPlan}
        selectedPaymentMethod={paymentMethod}
        onSelect={(method) => {
          setPaymentMethhod(method.id);
          dispatch({ type: 'SET_REPAYMENT_PLAN', payload: method.name });
          dispatch({ type: 'SET_PAYMENT_TYPE_ID', payload: method.id });
        }}
      />
      <OtherServiceStatus
        visibility={showStatus}
        onClose={() => {
          setShowStatus(false);
        }}
        onSelect={(status) => {
          dispatch({ type: 'SET_SERVICE_COMPLETION_STATUS', payload: status });
          setShowStatus(false);
        }}
        selectedStatus={state.ServiceCompletionStatus}
      />
    </GradientSafeAreaView>
  );
};

export default OtherServices;

const styles = StyleSheet.create({});
