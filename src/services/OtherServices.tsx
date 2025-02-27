import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from '../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import GradientHeader from '../shared/GradientHeader';
import GradientSafeAreaView from '../shared/GradientSafeAreaView';
import StudentIcon from '../../assets/svgs/Dashboard/StudentIcon';
import ChildIcon from '../../assets/svgs/Dashboard/ChildIcon';
import { useNavigation } from '@react-navigation/native';
import PTextInput from '../shared/PTextInput';
import PhoneInput from '../shared/PhoneInput';
import AttachmentView from '../shared/AttachmentView';
import PrimaryButton from '../shared/PrimaryButton';
import ServiceCategory from '../components/Service/ServiceCategory';
const OtherServices = () => {
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
            />
            <PTextInput
              placeholder="Name of Service Provider (e.g. Hyundai Motors)"
              required
            />

            <PhoneInput placeholder="Provider’s Phone Number" />

            <AttachmentView
              description="Proof of Service. "
              type=".pdf, .jpeg (max. 1MB)"
              required
            />
            <PTextInput placeholder="Select Service Category" required />
            <PTextInput placeholder="Cost of Service" required />
            <PTextInput placeholder="Select Repayment Plan" required />
            <PTextInput placeholder="Loan Amount" required />
            <PTextInput placeholder="Service Status" required />
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
            <AttachmentView
              description="Valid ID (International Passport, Driver’s License ). "
              type=".pdf, .jpeg (max. 1MB)"
              required
            />
            <AttachmentView
              description="Bank Statement. "
              type=".pdf, .xsl (max. 1MB)"
              required
            />
            <AttachmentView
              description="Utility Bill. "
              type=".pdf, .jpeg (max. 1MB)"
              required
            />
            <PTextInput placeholder="Name of Guarantor" required />
            <PhoneInput placeholder="Guarantor’s Phone Number" />
            <PTextInput placeholder=" Guarantor’s Address" required />
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
      <ServiceCategory />
    </GradientSafeAreaView>
  );
};

export default OtherServices;

const styles = StyleSheet.create({});
