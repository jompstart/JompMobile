import { StyleSheet, Pressable, Platform, View } from 'react-native';
import React, { useContext, useState } from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import OptionBox from '../../shared/OptionBox';
import SelectBox from '../../../assets/svgs/Transport/SelectBox';
import SelectedBox from '../../../assets/svgs/Transport/SelectedBox';
import Asterisks from '../../../assets/svgs/Onboarding/Asterisks';
import { CustomerServicesContext } from '../../context/ServicesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
const Form2 = () => {
  const { transportDetails, setTransportDetails } = useContext(
    CustomerServicesContext
  );
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    // Close the picker after selection
    if (selectedDate) {
      setDate(selectedDate); // Update the selected date
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };
  return (
    <View>
      <View style={styles.row}>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Employment Status
        </CText>
        <Asterisks size={size.getHeightSize(9.5)} />
      </View>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginBottom: size.getHeightSize(24),
        }}
      >
        <OptionBox
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Employed"
          onSelect={() => {
            setTransportDetails(
              'employmentDetails',
              'employmentStatus',
              'Employed'
            );
          }}
          selected={
            transportDetails?.employmentDetails?.employmentStatus === 'Employed'
          }
        />
        <OptionBox
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Self-Employed"
          onSelect={() => {
            setTransportDetails(
              'employmentDetails',
              'employmentStatus',
              'Self-Employed'
            );
          }}
          selected={
            transportDetails?.employmentDetails?.employmentStatus ===
            'Self-Employed'
          }
        />
        <OptionBox
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Student"
          onSelect={() => {
            setTransportDetails(
              'employmentDetails',
              'employmentStatus',
              'Student'
            );
          }}
          selected={
            transportDetails?.employmentDetails?.employmentStatus === 'Student'
          }
        />

        <PTextInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'employmentStatus', text);
          }}
          value={transportDetails.employmentDetails?.employerName}
          placeholder="Other? Please specify."
        />
        <PTextInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'name', text);
          }}
          value={transportDetails.employmentDetails?.name}
          placeholder="Company/Business/School Name"
        />
        <PTextInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'address', text);
          }}
          value={transportDetails.employmentDetails?.address}
          placeholder="Work/School Address"
        />

        <View
          style={{
            height: size.getHeightSize(1),
            backgroundColor: colors.primary('30'),
          }}
        />
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Monthly Income Range
          </CText>
          <Asterisks size={size.getHeightSize(9.5)} />
        </View>
        <OptionBox
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Below ₦5,000.00"
          selected={
            transportDetails.employmentDetails?.incomeRange ===
            'Below ₦5,000.00'
          }
          onSelect={() => {
            transportDetails.employmentDetails?.incomeRange ===
            'Below ₦5,000.00'
              ? setTransportDetails('employmentDetails', 'incomeRange', '')
              : setTransportDetails(
                  'employmentDetails',
                  'incomeRange',
                  'Below ₦5,000.00'
                );
          }}
        />
        <OptionBox
          selected={
            transportDetails.employmentDetails?.incomeRange ===
            '₦50,000.00 - ₦100,000.00'
          }
          onSelect={() => {
            transportDetails.employmentDetails?.incomeRange ===
            '₦50,000.00 - ₦100,000.00'
              ? setTransportDetails('employmentDetails', 'incomeRange', '')
              : setTransportDetails(
                  'employmentDetails',
                  'incomeRange',
                  '₦50,000.00 - ₦100,000.00'
                );
          }}
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="₦50,000.00 - ₦100,000.00"
        />
        <OptionBox
          selected={
            transportDetails.employmentDetails?.incomeRange ===
            '₦100,000.00 - ₦200,000.00'
          }
          onSelect={() => {
            transportDetails.employmentDetails?.incomeRange ===
            '₦100,000.00 - ₦200,000.00'
              ? setTransportDetails('employmentDetails', 'incomeRange', '')
              : setTransportDetails(
                  'employmentDetails',
                  'incomeRange',
                  '₦100,000.00 - ₦200,000.00'
                );
          }}
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="₦100,000.00 - ₦200,000.00"
        />
        <OptionBox
          selected={
            transportDetails.employmentDetails?.incomeRange ===
            '₦200,000.00 & Above'
          }
          onSelect={() => {
            transportDetails.employmentDetails?.incomeRange ===
            '₦200,000.00 & Above'
              ? setTransportDetails('employmentDetails', 'incomeRange', '')
              : setTransportDetails(
                  'employmentDetails',
                  'incomeRange',
                  '₦200,000.00 & Above'
                );
          }}
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="₦200,000.00 & Above"
        />
        <PTextInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'payday', text);
          }}
          value={transportDetails.employmentDetails?.payday}
          placeholder="Payday (Salary Payment Date)"
          rightIcon={
            <Feather
              name="calendar"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
        />
        {/* {show && (
          <DateTimePicker
            value={date}
            mode="date" // Can be "date", "time", or "datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            style={{
              alignSelf: 'center',
            }}
          />
        )} */}

        <View
          style={{
            height: size.getHeightSize(1),
            backgroundColor: colors.primary('30'),
          }}
        />
        <View style={styles.row}>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Mode of Salary Payment
          </CText>
          <Asterisks size={size.getHeightSize(9.5)} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(16),
            // justifyContent: 'space-between',
          }}
        >
          <OptionBox
            selected={
              transportDetails.employmentDetails?.modeOfPayment ===
              'Bank Transfer'
            }
            onSelect={() => {
              transportDetails.employmentDetails?.modeOfPayment ===
              'Bank Transfer'
                ? setTransportDetails('employmentDetails', 'modeOfPayment', '')
                : setTransportDetails(
                    'employmentDetails',
                    'modeOfPayment',
                    'Bank Transfer'
                  );
            }}
            deselectIcon={
              <Fontisto
                name="radio-btn-passive"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            selectIcon={
              <Fontisto
                name="radio-btn-active"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            description="Bank Transfer"
          />
          <OptionBox
            selected={
              transportDetails.employmentDetails?.modeOfPayment === 'Cash'
            }
            onSelect={() => {
              transportDetails.employmentDetails?.modeOfPayment === 'Cash'
                ? setTransportDetails('employmentDetails', 'modeOfPayment', '')
                : setTransportDetails(
                    'employmentDetails',
                    'modeOfPayment',
                    'Cash'
                  );
            }}
            deselectIcon={
              <Fontisto
                name="radio-btn-passive"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            selectIcon={
              <Fontisto
                name="radio-btn-active"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            description="Cash"
          />
        </View>
        <OptionBox
          selected={
            transportDetails.employmentDetails?.modeOfPayment === 'Cheque'
          }
          onSelect={() => {
            transportDetails.employmentDetails?.modeOfPayment === 'Cheque'
              ? setTransportDetails('employmentDetails', 'modeOfPayment', '')
              : setTransportDetails(
                  'employmentDetails',
                  'modeOfPayment',
                  'Cheque'
                );
          }}
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Cheque"
        />
        <View
          style={{
            height: size.getHeightSize(1),
            backgroundColor: colors.primary('30'),
          }}
        />
        <PTextInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'employerName', text);
          }}
          value={transportDetails.employmentDetails?.employerName}
          placeholder="Employer’s Name (If Applicable)"
        />
        <PhoneInput
          onChangeText={(text) => {
            setTransportDetails('employmentDetails', 'employerContact', text);
          }}
          placeholder="Employer’s Contact (If Applicable)"
          value={transportDetails.employmentDetails?.employerContact}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(10),
  },
});
