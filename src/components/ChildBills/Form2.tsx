import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import CText from '../../shared/CText';
import PlusIcon from '../../../assets/svgs/Dashboard/PlusIcon';
import { CustomerServicesContext } from '../../context/ServicesContext';
import AttachmentView from '../../shared/AttachmentView';
const Form2 = () => {
  const {
    childSchoolFeeDetails,
    removeChildSchoolDetailsFromArray,
    setChildSchoolFeeDetails,
  } = useContext(CustomerServicesContext);
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <>
        <PTextInput
          placeholder="Name of School"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.nameOfSchool || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'nameOfSchool',
              text,
              0
            )
          }
        />
        <PTextInput
          placeholder="School Email"
          value={childSchoolFeeDetails.childSchoolDetails[0]?.schoolEmail || ''}
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'schoolEmail',
              text,
              0
            )
          }
          keyboardType="email-address"
        />
        <PTextInput
          placeholder="Location of School"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.schoolAddress || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'schoolAddress',
              text,
              0
            )
          }
        />
        <PTextInput
          keyboardType="phone-pad"
          placeholder="Postal Code"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.postalCode || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'postalCode',
              text,
              0
            )
          }
        />
        <PTextInput
     
          placeholder="Country of School"
          value={childSchoolFeeDetails.childSchoolDetails[0]?.country || ''}
          onChangeText={(text) =>
            setChildSchoolFeeDetails('childSchoolDetails', 'country', text, 0)
          }
        />
        <PTextInput
        
          placeholder="City of School"
          value={childSchoolFeeDetails.childSchoolDetails[0]?.city || ''}
          onChangeText={(text) =>
            setChildSchoolFeeDetails('childSchoolDetails', 'city', text, 0)
          }
        />
        <PTextInput
          placeholder="Child's First Name"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.childFirstName || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'childFirstName',
              text,
              0
            )
          }
        />
        <PTextInput
          placeholder="Child's Last Name"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.childLastName || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'childLastName',
              text,
              0
            )
          }
        />
        <PTextInput
          placeholder="Child's Grade (Class)"
          value={childSchoolFeeDetails.childSchoolDetails[0]?.childGrade || ''}
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'childGrade',
              text,
              0
            )
          }
        />
        <PTextInput
          placeholder="₦ Child's School Fees"
          keyboardType="decimal-pad"
          value={
            childSchoolFeeDetails.childSchoolDetails[0]?.childSchoolFees || ''
          }
          onChangeText={(text) =>
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'childSchoolFees',
              text,
              0
            )
          }
        />
        <AttachmentView
          fileUri={''}
          onPress={() => {}}
          description="School Fee Invoice"
          type=".pdf, .xsls (max. 1MB)"
          onFileSelected={(file) => {
            setChildSchoolFeeDetails(
              'childSchoolDetails',
              'schoolFeeInvoice',
              file,
              0
            );
          }}
        />
      </>
      {childSchoolFeeDetails.childSchoolDetails
        .filter((_, index) => index !== 0)
        .map((child, index) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: size.getHeightSize(16),
              }}
            >
              <CText
                color={'black'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                {' '}
                Child {index + 2}
              </CText>

              <CText
                onPress={() => {
                  removeChildSchoolDetailsFromArray(index + 1);
                }}
                color={'warning'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                {' '}
                Remove
              </CText>
            </View>
            <PTextInput
              key={index + 1}
              placeholder="Name of School"
              value={child?.nameOfSchool || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'nameOfSchool',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 2}
              placeholder="School Email"
              value={child?.schoolEmail || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'schoolEmail',
                  text,
                  index + 1
                )
              }
              keyboardType="email-address"
            />
            <PTextInput
              key={index + 3}
              placeholder="Location of School"
              value={child?.schoolAddress || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'schoolAddress',
                  text,
                  index + 1
                )
              }
            />

            <PTextInput
              key={index + 4}
              keyboardType="phone-pad"
              placeholder="Postal Code"
              value={child?.postalCode || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'postalCode',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 5}
            
              placeholder="Country of School"
              value={child?.country || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'country',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 6}
         
              placeholder="City of School"
              value={child?.city || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'city',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 7}
              placeholder="Child's First Name"
              value={child?.childFirstName || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'childFirstName',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 8}
              placeholder="Child's Last Name"
              value={child?.childLastName || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'childLastName',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 9}
              placeholder="Child's Grade (Class)"
              value={child.childGrade || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'childGrade',
                  text,
                  index + 1
                )
              }
            />
            <PTextInput
              key={index + 10}
              placeholder="₦ Child's School Fees"
              keyboardType="decimal-pad"
              value={child?.childSchoolFees || ''}
              onChangeText={(text) =>
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'childSchoolFees',
                  text,
                  index + 1
                )
              }
            />

            <AttachmentView
              key={index + 11}
              fileUri={''}
              onPress={() => {}}
              description="School Fee Invoice"
              type=".pdf, .xsls (max. 1MB)"
              onFileSelected={(file) => {
                setChildSchoolFeeDetails(
                  'childSchoolDetails',
                  'schoolFeeInvoice',
                  file,
                  index + 1
                );
              }}
            />
          </>
        ))}
      <Pressable
        onPress={() => {
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'nameOfSchool',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'schoolAddress',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'childFirstName',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'childLastName',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'childGrade',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'childSchoolFees',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'schoolEmail',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'city',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'postalCode',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'country',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
          setChildSchoolFeeDetails(
            'childSchoolDetails',
            'schoolFeeInvoice',
            '',
            childSchoolFeeDetails.childSchoolDetails.length
          );
        }}
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
      </Pressable>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});
