import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
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
const Form2 = () => {
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
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Employed"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Self-Employed"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Student"
        />

        <PTextInput placeholder="Other? Please specify." />
        <PTextInput placeholder="Company/Business/School Name" />
        <PTextInput placeholder="Work/School Address" />

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
          description="₦50,000.00 - ₦100,000.00"
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
          description="₦100,000.00 - ₦200,000.00"
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
          description="₦200,000.00 & Above"
        />
        <PTextInput
          placeholder="Payday (Salary Payment Date)"
          rightIcon={
            <Feather
              name="calendar"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
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
        <PTextInput placeholder="Employer’s Name (If Applicable)" />
        <PhoneInput placeholder="Employer’s Contact Number" />
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
