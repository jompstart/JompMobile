import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import CText from '../../shared/CText';
import PlusIcon from '../../../assets/svgs/Dashboard/PlusIcon';
import { CustomerServicesContext } from '../../context/ServicesContext';
const Form2 = () => {
  const { childSchoolFeeDetails, setChildSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      {childSchoolFeeDetails.childSchoolDetails.map((child, index) => (
        <>
          <PTextInput
            placeholder="Name of School"
            value={child.nameOfSchool}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'nameOfSchool',
                text,
                index
              )
            }
          />
          <PTextInput
            placeholder="Location of School"
            value={child.schoolAddress}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'schoolAddress',
                text,
                index
              )
            }
          />
          <PTextInput
            placeholder="Child's First Name"
            value={child.childFirstName}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'childFirstName',
                text,
                index
              )
            }
          />
          <PTextInput
            placeholder="Child's Last Name"
            value={child.childLastName}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'childLastName',
                text,
                index
              )
            }
          />
          <PTextInput
            placeholder="Child's Grade (Class)"
            value={child.nameOfSchool}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'nameOfSchool',
                text,
                index
              )
            }
          />
          <PTextInput
            placeholder="₦ Child's School Fees"
            keyboardType="decimal-pad"
            value={child.childSchoolFees}
            onChangeText={(text) =>
              setChildSchoolFeeDetails(
                'childSchoolDetails',
                'childSchoolFees',
                text,
                index
              )
            }
          />
        </>
      ))}
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
        }}
      >
        <PlusIcon size={size.getHeightSize(24)} />
        <CText
          color={'primaryColor'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="bold"
        >
          Add another child
        </CText>
      </View>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});
