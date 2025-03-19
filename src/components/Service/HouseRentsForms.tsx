import { StyleSheet, Pressable, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StudentIcon from '../../../assets/svgs/Dashboard/StudentIcon';
import ChildIcon from '../../../assets/svgs/Dashboard/ChildIcon';
import { useNavigation } from '@react-navigation/native';
import PTextInput from '../../shared/PTextInput';
import AttachmentView from '../../shared/AttachmentView';
import { CustomerServicesContext } from '../../context/ServicesContext';
import PrimaryButton from '../../shared/PrimaryButton';
const HouseRentsForms = () => {
  const { houseRentDetails, setHouseRentDetails } = useContext(
    CustomerServicesContext
  );
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
          value={houseRentDetails.rentAmount}
          onChangeText={(text) => {
            setHouseRentDetails('rentAmount', text);
          }}
          placeholder="Rent Amount"
        />
        <PTextInput
          value={houseRentDetails.requestedAmount}
          onChangeText={(text) => {
            setHouseRentDetails('requestedAmount', text);
          }}
          placeholder="Requested Amount"
        />
        <AttachmentView
          onFileSelected={() => {
            setHouseRentDetails('IdCard', 'file');
          }}
          description="ID Card."
          type=".pdf, .Jpeg (max. 1MB)"
        />
        <AttachmentView
          description="Utility Bill."
          type=".pdf, .Jpeg (max. 1MB)"
          onFileSelected={() => {
            setHouseRentDetails('utilityBill', 'file');
          }}
        />
        <AttachmentView
          onFileSelected={() => {
            setHouseRentDetails('banksStatement', 'file');
          }}
          description="6 Months Bank Statement."
          type=".pdf, .Jpeg (max. 1MB)"
        />
      </View>
      <View
        style={{
          marginTop: size.getHeightSize(32),
        }}
      >
        <PrimaryButton label="Proceed" />
      </View>
    </View>
  );
};

export default HouseRentsForms;

const styles = StyleSheet.create({});
