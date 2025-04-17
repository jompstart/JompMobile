import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import Fontisto from '@expo/vector-icons/Fontisto';
import OptionBox from '../../shared/OptionBox';
import SelectBox from '../../../assets/svgs/Transport/SelectBox';
import SelectedBox from '../../../assets/svgs/Transport/SelectedBox';
import { CustomerServicesContext } from '../../context/ServicesContext';
const Form1 = () => {
  const { transportDetails, setTransportDetails } = useContext(
    CustomerServicesContext
  );

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
          description="Bus (BRT, Danfo etc)"
          onSelect={() => {
            setTransportDetails('creditRequestDetails', 'transportMode', 'Bus');
          }}
          selected={
            transportDetails?.creditRequestDetails?.transportMode === 'Bus'
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
          description="Taxi (Bolt, Uber, etc)"
          onSelect={() => {
            setTransportDetails(
              'creditRequestDetails',
              'transportMode',
              'Taxi'
            );
          }}
          selected={
            transportDetails?.creditRequestDetails?.transportMode === 'Taxi'
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
          description="Keke (Tricycle)"
          onSelect={() => {
            setTransportDetails(
              'creditRequestDetails',
              'transportMode',
              'Keke'
            );
          }}
          selected={
            transportDetails?.creditRequestDetails?.transportMode === 'Keke'
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
          description="Okada (Motorbike)"
          onSelect={() => {
            setTransportDetails(
              'creditRequestDetails',
              'transportMode',
              'Okada'
            );
          }}
          selected={
            transportDetails?.creditRequestDetails?.transportMode === 'Okada'
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
          description="Ferry"
          onSelect={() => {
            transportDetails?.creditRequestDetails?.transportMode === 'Ferry'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'transportMode',
                  'Ferry',
                  'remove',
                  4
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'transportMode',
                  'Ferry',
                  'add',
                  4
                );
          }}
          selected={
            transportDetails?.creditRequestDetails?.transportMode === 'Ferry'
          }
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
          selected={
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            'Below ₦5,000.00'
          }
          onSelect={() => {
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            'Below ₦5,000.00'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  'Below ₦5,000.00'
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
          description="Below ₦5,000.00"
        />
        <OptionBox
          selected={
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦5,000.00 - ₦10,000.00'
          }
          onSelect={() => {
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦5,000.00 - ₦10,000.00'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  '₦5,000.00 - ₦10,000.00'
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
          description="₦5,000.00 - ₦10,000.00"
        />
        <OptionBox
          selected={
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦10,000.00 - ₦20,000.00'
          }
          onSelect={() => {
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦10,000.00 - ₦20,000.00'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  '₦10,000.00 - ₦20,000.00'
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
          description="₦10,000.00 - ₦20,000.00"
        />
        <OptionBox
          selected={
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦20,000.00 - ₦50,000.00'
          }
          onSelect={() => {
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦20,000.00 - ₦50,000.00'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  '₦20,000.00 - ₦50,000.00'
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
          description="₦20,000.00 - ₦50,000.00"
        />
        <OptionBox
          selected={
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦50,000.00 & Above'
          }
          onSelect={() => {
            transportDetails.creditRequestDetails.estimatedMonthlyCost ===
            '₦50,000.00 & Above'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'estimatedMonthlyCost',
                  '₦50,000.00 & Above'
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
          description="₦50,000.00 & Above"
        />

        <PTextInput
          isAmount
          keyboardType="phone-pad"
          placeholder="Requested Credit Amount"
          onChangeText={(text) => {
            setTransportDetails(
              'creditRequestDetails',
              'requestedAmount',
              text
            );
          }}
          value={transportDetails.creditRequestDetails.requestedAmount}
        />

        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Payment Duration
        </CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(16),
            // justifyContent: 'space-between',
          }}
        >
          <OptionBox
            onSelect={() => {
              transportDetails.creditRequestDetails.paymentDuration === '2 Week'
                ? setTransportDetails(
                    'creditRequestDetails',
                    'paymentDuration',
                    ''
                  )
                : setTransportDetails(
                    'creditRequestDetails',
                    'paymentDuration',
                    '2 Week'
                  );
            }}
            selected={
              transportDetails.creditRequestDetails.paymentDuration === '2 Week'
            }
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
            onSelect={() => {
              transportDetails.creditRequestDetails.paymentDuration ===
              '3 Weeks'
                ? setTransportDetails(
                    'creditRequestDetails',
                    'paymentDuration',
                    ''
                  )
                : setTransportDetails(
                    'creditRequestDetails',
                    'paymentDuration',
                    '3 Week'
                  );
            }}
            selected={
              transportDetails.creditRequestDetails.paymentDuration === '3 Week'
            }
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
          onSelect={() => {
            transportDetails.creditRequestDetails.paymentDuration === '1 Month'
              ? setTransportDetails(
                  'creditRequestDetails',
                  'paymentDuration',
                  ''
                )
              : setTransportDetails(
                  'creditRequestDetails',
                  'paymentDuration',
                  '1 Month'
                );
          }}
          selected={
            transportDetails.creditRequestDetails.paymentDuration === '1 Month'
          }
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
