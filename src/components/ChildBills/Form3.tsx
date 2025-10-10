import { StyleSheet, View, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { CustomerServicesContext } from '../../context/ServicesContext';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import PDateInput from '../../shared/PDateInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentView from '../../shared/AttachmentView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MonthDropdown from "../../shared/MonthDropdown";

const Form3 = ({ onSelectState }: { onSelectState?: () => void }) => {
  const { childSchoolFeeDetails, setChildSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );

  useEffect(() => {
    setChildSchoolFeeDetails(
      "guardianEmploymentDetails",
      "companyCountry",
      "Nigeria"
    );
  }, []);

  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.nameOfCompany}
        onChangeText={(text) =>
          setChildSchoolFeeDetails("guardianEmploymentDetails", "nameOfCompany", text)
        }
        placeholder="Name of Company"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyEmail}
        onChangeText={(text) =>
          setChildSchoolFeeDetails("guardianEmploymentDetails", "companyEmail", text)
        }
        placeholder="Company’s Email Address"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyLocation}
        onChangeText={(text) =>
          setChildSchoolFeeDetails("guardianEmploymentDetails", "companyLocation", text)
        }
        placeholder="Address line 1"
      />
      <PTextInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyCity}
        onChangeText={(text) =>
          setChildSchoolFeeDetails("guardianEmploymentDetails", "companyCity", text)
        }
        placeholder="Address line 2"
      />
      <PTextInput
        keyboardType="phone-pad"
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyPostalCode}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            "guardianEmploymentDetails",
            "companyPostalCode",
            text
          )
        }
        placeholder="Postal Code"
      />
      <PTextInput
        editable={false}
        placeholder="Select Country"
        rightIcon={
          <View
            style={{
              height: size.getHeightSize(24),
              width: size.getWidthSize(32),
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                height: "100%",
                width: "100%",
              }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
              }}
            />
          </View>
        }
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyCountry}
      />
      <PTextInput
        editable={false}
        onPress={() => {
          onSelectState?.();
        }}
        placeholder="Select your State"
        rightIcon={
          <MaterialIcons
            name="arrow-drop-down"
            size={size.getHeightSize(25)}
          />
        }
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyState}
      />
      <PhoneInput
        value={childSchoolFeeDetails.guardianEmploymentDetails.companyPhoneNumber}
        onChangeText={(text) =>
          setChildSchoolFeeDetails(
            "guardianEmploymentDetails",
            "companyPhoneNumber",
            text
          )
        }
        keyboardType="number-pad"
        placeholder="Company’s Phone Number"
          maxLength={11} // Cap phone number to 11 digits

      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: size.getWidthSize(16),
        }}
      >
        <View
          style={{
            width: size.getWidthSize(236),
            flex: 1,
          }}
        >
          <PDateInput
            outerStyle={{
              flex: 1,
            }}
            placeholder="Years of Working with them"
            value={childSchoolFeeDetails.guardianEmploymentDetails.yearsInCompany}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                "guardianEmploymentDetails",
                "yearsInCompany",
                text
              )
            }
            maxValue={99}
            minValue={0}
            fieldName="Years of Working"
          />
        </View>
        <MonthDropdown
          outerStyle={{
            flex: 1,
          }}
          value={childSchoolFeeDetails.guardianEmploymentDetails.month}
          onChangeText={(text) =>
            setChildSchoolFeeDetails("guardianEmploymentDetails", "month", text)
          }
        />
      </View>
      {/* Assuming AttachmentView is part of this form; adjust if needed */}
      <AttachmentView
        description="Payment Slip"
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) =>
          setChildSchoolFeeDetails("guardianEmploymentDetails", "paymentSlip", file)
        }
      />
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({});