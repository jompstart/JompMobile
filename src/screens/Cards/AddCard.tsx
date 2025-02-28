import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GradientHeader from '../../shared/GradientHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import AddBankIcon from '../../../assets/svgs/Dashboard/AddBankIcon';
import { colors } from '../../constants/colors';
import VisaIcon from '../../../assets/svgs/Cards/VisaIcon';
import MastercardIcon from '../../../assets/svgs/Cards/MastercardIcon';
import StrikePath from '../../../assets/svgs/Cards/Strike';
import CancelIcon from '../../../assets/svgs/Onboarding/CancelIcon';
const AddCard = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
          color="white"
        />
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Go Back
        </CText>
      </GradientHeader>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          Card
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
          }}
        >
          Add new card to fund your wallet
        </CText>
      </View>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(24),
        }}
      >
        <ScrollView
          contentContainerStyle={{
            gap: size.getWidthSize(16),
          }}
          horizontal
        >
          <View
            style={{
              width: size.getWidthSize(159),
              alignItems: 'center',
              gap: size.getHeightSize(4),
              backgroundColor: colors.white(),
              borderRadius: size.getWidthSize(8),
            }}
          >
            <AddBankIcon size={size.getHeightSize(80)} />
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="regular"
              style={{
                opacity: 50,
                textAlign: 'center',
              }}
            >
              Do you want to add new card.{' '}
              <CText
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                color="primaryColor"
              >
                Click to Add
              </CText>
            </CText>
          </View>
          <View
            style={{
              backgroundColor: '#1434CB',
              height: size.getHeightSize(138),
              width: size.getWidthSize(238),
              borderRadius: size.getWidthSize(8),
            }}
          >
            <StrikePath
              width={size.getWidthSize(107)}
              height={size.getHeightSize(138)}
              style={{
                position: 'absolute',
                left: size.getWidthSize(85),
                bottom: size.getHeightSize(0),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: size.getWidthSize(16),
                alignItems: 'flex-start',
              }}
            >
              <VisaIcon size={size.getHeightSize(24)} />
            </View>
            <View
              style={{
                bottom: size.getHeightSize(8),
                left: size.getWidthSize(8),
                flexDirection: 'row',
                gap: size.getWidthSize(17),
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{
                  gap: size.getHeightSize(4),
                }}
              >
                <CText
                  color={'white'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="bold"
                >
                  Titan Trust Bank
                </CText>
                <CText
                  color={'white'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="bold"
                >
                  1010-01**-****-**01
                </CText>
                <CText
                  color={'white'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="bold"
                >
                  Expiry Date: 06/26
                </CText>
              </View>
              <View
                style={{
                  width: size.getWidthSize(92),
                  backgroundColor: colors.white(),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: size.getWidthSize(8),
                }}
              >
                <CText
                  color={'primaryColor'}
                  fontSize={11}
                  lineHeight={17.6}
                  fontFamily="bold"
                >
                  Set as Default
                </CText>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
          marginTop: size.getHeightSize(32),
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          Default Card Selected
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
          }}
        >
          Enter the amount you want to add to your account
        </CText>
      </View>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          marginTop: size.getHeightSize(24),
        }}
      >
        <PTextInput placeholder="₦ Amount" />
        <PrimaryButton
          label="Fund Wallet"
          style={{
            marginTop: size.getHeightSize(32),
          }}
        />
      </View>
    </GradientSafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({});
