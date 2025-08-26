import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AttachmentView from '../../shared/AttachmentView';
import PDateInput from '../../shared/PDateInput';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CustomerServicesContext } from '../../context/ServicesContext';
import MonthDropdown from '../../shared/MonthDropdown';



const Form3 = () => {
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );

  const yearOptions: number[] = Array.from({ length: 100 }, (_, i) => i);
  const monthOptions: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'nameOfCompany', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.nameOfCompany}
        placeholder="Name of Company/Business"
      />
      <PTextInput
        placeholder="Company/Business Email Address"
        keyboardType="email-address"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'companyEmail', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.companyEmail}
      />
      <PTextInput
        placeholder="Company/Business Location"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'companyLocation', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.companyLocation}
      />
      <PTextInput
        placeholder="Occupation"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'occupation', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.occupation}
      />
      <PTextInput
        placeholder="Employer Name"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'employerName', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerName}
      />
      <PTextInput
        keyboardType="phone-pad"
        placeholder="HR Contact Number"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'hrContactNumber', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.hrContactNumber}
      />
      <PTextInput
        placeholder="Employer Address"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'employerAddress', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerAddress}
      />
      <PTextInput
        placeholder="Employer city"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'employerCity', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerCity}
      />
      <PTextInput
        placeholder="Postal code"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails(
            'employmentDetails',
            'employerPostalCode',
            text
          )
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerPostalCode}
      />
      <PTextInput
        placeholder="Employer State of Residence"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'employerState', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerState}
      />
      <PTextInput
        placeholder="Employer country"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('employmentDetails', 'employerCountry', text)
        }
        value={selfSchoolFeeDetails?.employmentDetails?.employerCountry}
      />
      <PhoneInput
        placeholder="Company/Business Line"
        keyboardType="phone-pad"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails(
            'employmentDetails',
            'companyPhoneNumber',
            text
          )
        }
        value={selfSchoolFeeDetails?.employmentDetails?.companyPhoneNumber}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: size.getWidthSize(16),
        }}
      >
        <View
          style={{
            width: size.getWidthSize(236),
          }}
        >
          <PDateInput
            outerStyle={{
              flex: 1,
            }}
            placeholder="Years of working/operation"
            value={selfSchoolFeeDetails?.employmentDetails?.yearsInCompany}
            onChangeText={(text) =>
              setSelfSchoolFeeDetails(
                'employmentDetails',
                'yearsInCompany',
                text
              )
            }
            maxValue={99}
            minValue={0}
            fieldName="Years of working"
          />
        </View>
        <MonthDropdown
          outerStyle={{
            flex: 1,
          }}
          value={selfSchoolFeeDetails?.employmentDetails?.month}
          onChangeText={(text) =>
            setSelfSchoolFeeDetails('employmentDetails', 'month', text)
          }
        />
      </View>
      <AttachmentView
        description="Payment Slip"
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails('employmentDetails', 'paymentSlip', file);
        }}
      />
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  view: {
    paddingTop: size.getHeightSize(14),
    backgroundColor: colors.white(),
    alignItems: 'center',
    gap: size.getHeightSize(8),
    paddingBottom: size.getHeightSize(14),
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    marginTop: size.getHeightSize(2),
  },
  dropdown: {
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    borderWidth: 1,
    borderColor: colors.primaryDisabled(),
    maxHeight: size.getHeightSize(200),
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    maxHeight: size.getHeightSize(200),
  },
  scrollViewContent: {
    paddingBottom: size.getHeightSize(100), // Add padding inside scroll view
  },
  dropdownItem: {
    paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDisabled(),
  },
  selectedItem: {
    backgroundColor: colors.appBackground(),
  },
  dropdownText: {
    color: colors.black(),
  },
  selectedText: {
    color: colors.primary(),
    fontWeight: '600',
  },
});