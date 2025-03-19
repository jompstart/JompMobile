import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CustomerServicesContext } from '../../context/ServicesContext';
import AttachmentView from '../../shared/AttachmentView';
const Form3 = () => {
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
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
          <PTextInput
            outerStyle={{
              flex: 1,
            }}
            placeholder="Years of working/operation"
            rightIcon={
              <MaterialIcons
                name="arrow-drop-down"
                size={size.getHeightSize(25)}
              />
            }
            onChangeText={(text) =>
              setSelfSchoolFeeDetails(
                'employmentDetails',
                'yearsInCompany',
                text
              )
            }
            value={selfSchoolFeeDetails?.employmentDetails?.yearsInCompany}
          />
        </View>

        <PTextInput
          outerStyle={{
            flex: 1,
          }}
          placeholder="Month"
          rightIcon={
            <MaterialIcons
              name="arrow-drop-down"
              size={size.getHeightSize(25)}
            />
          }
          onChangeText={(text) =>
            setSelfSchoolFeeDetails('employmentDetails', 'month', text)
          }
          value={selfSchoolFeeDetails?.employmentDetails?.month}
        />
      </View>
      <AttachmentView
        description="6 Months Bank Statement."
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
});
