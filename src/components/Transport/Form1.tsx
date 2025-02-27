import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import Fontisto from '@expo/vector-icons/Fontisto';

import OptionBox from '../../shared/OptionBox';
import SelectBox from '../../../assets/svgs/Transport/SelectBox';
import SelectedBox from '../../../assets/svgs/Transport/SelectedBox';
const Form1 = () => {
  return (
    <View>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="semibold"
      >
        Preferred Transport Mode
      </CText>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginBottom: size.getHeightSize(24),
        }}
      >
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Bus (BRT, Danfo etc)"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Taxi (Bolt, Uber, etc)"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Keke (Tricycle)"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Okada (Motorbike)"
        />
        <OptionBox
          deselectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectBox size={size.getHeightSize(24)} />}
          description="Ferry"
        />
        <View
          style={{
            height: size.getHeightSize(1),
            backgroundColor: colors.primary('30'),
          }}
        />
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Estimated Monthly Transport Cost
        </CText>
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
          description="₦5,000.00 - ₦10,000.00"
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
          description="₦10,000.00 - ₦20,000.00"
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
          description="₦20,000.00 - ₦50,000.00"
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
          description="₦50,000.00 & Above"
        />

        <PTextInput placeholder="Requested Credit Amount" />
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
            description="2 Weeks"
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
            description="3 Weeks"
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
          description="1 Month"
        />
      </View>
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({});
