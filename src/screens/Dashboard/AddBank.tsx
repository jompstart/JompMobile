import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
const AddBank = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
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
        </View>
      </GradientHeader>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <CText
            color={colors.black('70') as any}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
          >
            Adding Bank Account
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            Link your bank account to Jompstart
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <View style={styles.dropDown}>
            <CText
              color={colors.black('50') as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="regular"
              style={{
                letterSpacing: size.getWidthSize(0.2),
              }}
            >
              Select Bank
            </CText>
            <MaterialIcons
              name="arrow-drop-down"
              color={colors.primary()}
              size={size.getHeightSize(40)}
            />
          </View>

          <View
            style={{
              gap: size.getHeightSize(8),
            }}
          >
            <PTextInput title="" placeholder="Account Number" />
            <CText
              color={'#31005C' as any}
              fontSize={12}
              lineHeight={19.2}
              fontFamily="bold"
              style={{
                textAlign: 'right',
              }}
            >
              Timmy Ajanlekoko
            </CText>
          </View>
          <PTextInput title="" placeholder="BVN" />
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <View
            style={{
              paddingVertical: size.getHeightSize(8),
              paddingHorizontal: size.getWidthSize(8),
              backgroundColor: '#FFF9E6',
              borderRadius: size.getHeightSize(8),
              marginTop: size.getHeightSize(24),
            }}
          >
            <View
              style={{
                gap: size.getHeightSize(18),
              }}
            >
              <CText
                color="secondaryBlack"
                fontSize={12}
                lineHeight={16}
                fontFamily="semibold"
              >
                The goal of the Bank Verification Number (BVN) is to uniquely
                verify the identity of a customer for know your customer (KYC
                purposes).
              </CText>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: size.getWidthSize(13.6),
                  }}
                >
                  <CheckCircle size={size.getHeightSize(15)} />
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    We only have access to your
                  </CText>
                </View>
                <View
                  style={{
                    borderLeftWidth: size.getWidthSize(2),
                    borderColor: colors.primarySuccess(),
                    marginLeft: size.getWidthSize(6.84),
                    marginTop: size.getHeightSize(4),
                    paddingLeft: size.getWidthSize(20.44),
                    gap: size.getHeightSize(7),
                  }}
                >
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Name
                  </CText>
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Email Address
                  </CText>
                  <CText
                    color="black"
                    fontSize={12}
                    lineHeight={14}
                    fontFamily="regular"
                    style={{
                      letterSpacing: size.getWidthSize(0.2),
                    }}
                  >
                    Date of Birth
                  </CText>
                </View>
              </View>
              <CText
                color="secondaryBlack"
                fontSize={12}
                lineHeight={16}
                fontFamily="semibold"
              >
                Verifying your BVN does not allow us to access your bank account
                details, nor can we use your BVN to move money from your
                account. Your information is secure with us, and we will not
                share your BVN with anyone.
              </CText>
            </View>
          </View>
          <PrimaryButton
            style={{
              marginTop: size.getHeightSize(40),
            }}
            label="Submit"
          />
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  dropDown: {
    flexDirection: 'row',
    height: size.getHeightSize(52),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.black('30'),
    borderRadius: size.getHeightSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.white(),
  },
});
