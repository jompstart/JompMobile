import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import CText from '../../shared/CText';
import PlusIcon from '../../../assets/svgs/Dashboard/PlusIcon';
import { CustomerServicesContext } from '../../context/ServicesContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AttachmentView from '../../shared/AttachmentView';
const Form2 = () => {
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
        placeholder="Name of Institution"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'nameOfSchool', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.nameOfSchool}
      />
      <PTextInput
        placeholder="Course of Study"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'course', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.course}
      />
      <PTextInput
        placeholder="Level of Education"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'level', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.level}
      />
      <PTextInput
        placeholder="Location of Institution"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'location', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.location}
      />
      <PTextInput
        placeholder="Location of Institution 2 (Optional)"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails(
            'educationnDetails',
            'locationOfSchool2',
            text
          )
        }
        value={selfSchoolFeeDetails?.educationnDetails?.locationOfSchool2}
      />
      <PTextInput
        placeholder="₦ Tuition Fee"
         keyboardType="number-pad"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'tuitionFee', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.tuitionFee}
      />
      <PTextInput
        placeholder="₦ Loan Amount"
         keyboardType="number-pad"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'loanAmount', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.loanAmount}
      />
      <PTextInput
        // editable={false}
        placeholder="Select Country"
        rightIcon={
          <MaterialIcons name="arrow-drop-down" size={size.getHeightSize(25)} />
        }
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'country', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.country}
      />
      <PTextInput
        placeholder="Select State"
        rightIcon={
          <MaterialIcons name="arrow-drop-down" size={size.getHeightSize(25)} />
        }
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'state', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.state}
      />
      <PTextInput
        placeholder="City"
        onChangeText={(text) =>
          setSelfSchoolFeeDetails('educationnDetails', 'city', text)
        }
        value={selfSchoolFeeDetails?.educationnDetails?.city}
      />
      <AttachmentView
        description="School Fee Invoice"
        type=".pdf, .xsls (max. 1MB)"
        onFileSelected={(file) => {
          setSelfSchoolFeeDetails(
            'educationnDetails',
            'tutionFeeInvoice',
            file
          );
        }}
      />
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});
