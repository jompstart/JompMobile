import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import CText from '../../shared/CText';
import CTextInput from '../../shared/CTextInput';
import InfoIcon from '../../../assets/svgs/Onboarding/InfoIcon';
import { ScrollView } from 'react-native-gesture-handler';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import SecondaryButton from '../../shared/SecondaryButton';
import PrimaryButton from '../../shared/PrimaryButton';
import SuccessModal from '../../shared/SuccessModal';
import { useNavigation } from '@react-navigation/native';
import { ComplianceService } from '../../services/compliance';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
const VerifyBvn = () => {
  const [isVerified, setVerificationStatus] = useState(false);
  const [bvn, setBvn] = useState('');
  const [isVerificationLoading, setVerificationLoadingState] = useState(false);
  const navigation = useNavigation();
  const user = useAppSelector(userSelector);
  console.log(user);
  const complianceInstance = new ComplianceService(user.userId);

  const handleVerifyBvn = async () => {
    setVerificationLoadingState(true);
    try {
      const response = await complianceInstance.verifyCustomer('bvn', bvn);
      console.log('====== verify bvn response ======');
      console.log(response);
      if (response.statusCode == 200 && response.success) {
        setVerificationStatus(true);
      }
    } catch (error) {
      console.log('====== verify bvn error ======');
      console.log(error);
    } finally {
      setVerificationLoadingState(false);
    }
  };
  return (
    <CustomSafeArea statusBarColor={colors.appBackground()}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
          backgroundColor: colors.appBackground(),
          paddingTop: size.getHeightSize(40),
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: size.getHeightSize(24),
          }}
        >
          <JompLogo size={size.getHeightSize(44)} />
          <JompTextLogo
            width={size.getWidthSize(155.27)}
            height={size.getHeightSize(30.19)}
          />
        </View>
        <CText
          fontSize={16}
          lineHeight={22}
          fontFamily="semibold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Compliance Details
        </CText>
        <CText
          color="secondaryBlack"
          fontSize={14}
          lineHeight={19.6}
          fontFamily="semibold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
            letterSpacing: size.getWidthSize(0.2),
          }}
        >
          Select the method that helps us verify your identity and keeps your
          account from fraud
        </CText>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: size.getHeightSize(24),
          }}
        >
          <CText
            color="secondaryBlack"
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
          >
            Step 1 (BVN)
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              opacity: 0.3,
            }}
          >
            Step 2 (NIN)
          </CText>
        </View>
        <View
          style={{
            backgroundColor: '#31005C30',
            height: size.getHeightSize(13),
            borderRadius: size.getHeightSize(8),
            marginTop: size.getHeightSize(8),
          }}
        >
          <View
            style={{
              width: '50%',
              height: size.getHeightSize(13),
              borderRadius: size.getHeightSize(8),
              backgroundColor: '#31005C',
            }}
          />
        </View> */}
        <View
          style={{
            paddingHorizontal: size.getWidthSize(8),
            paddingVertical: size.getHeightSize(8),
            borderRadius: size.getHeightSize(8),
            backgroundColor: '#FFF9E6',
            marginTop: size.getHeightSize(24),
          }}
        >
          <CText
            color="secondaryBlack"
            fontSize={12}
            lineHeight={16}
            fontFamily="semibold"
          >
            Confirming your BVN helps us verify your identity and keeps your
            account from fraud.
          </CText>
        </View>
        <View
          style={{
            marginTop: size.getHeightSize(24),
          }}
        >
          <CTextInput
            onChangeText={setBvn}
            required
            placeholder="Enter here"
            title="BVN"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: size.getWidthSize(9),
              marginTop: size.getHeightSize(8),
            }}
          >
            <CText
              color="secondaryBlack"
              fontSize={12}
              lineHeight={16}
              fontFamily="semibold"
            >
              Why we need your BVN?
            </CText>
            <InfoIcon size={size.getHeightSize(17)} />
          </View>
          <View
            style={{
              paddingVertical: size.getHeightSize(8),
              paddingHorizontal: size.getWidthSize(8),
              height: size.getHeightSize(176),
              backgroundColor: '#FFF9E6',
              borderRadius: size.getHeightSize(8),
              marginTop: size.getHeightSize(24),
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator
              indicatorStyle="white"
              //   scrollIndicatorInsets={{ right: 40 }}
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
                  The goal of the Bank Verification Number (BVN) is to uniquely
                  verify the identity of a customer for know your customer (KYC
                  purposes).
                </CText>
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            marginTop: size.getHeightSize(8),
            gap: size.getHeightSize(24),
            marginBottom: size.getHeightSize(40),
          }}
        >
          <SecondaryButton
            isLoading={isVerificationLoading}
            disabled={!bvn}
            label="Verify"
            onPress={handleVerifyBvn}
          />
          <PrimaryButton
            disabled={!isVerified}
            label="Next"
            onPress={() => {
              navigation.navigate('VerifyNin');
            }}
          />
        </View>
        <SuccessModal
          visibility={false}
          onClose={() => {}}
          buttonText="Submit"
          onContinue={() => {}}
          title="BVN Verified!"
          description="Your bank verification number has been successfully verified."
        />
      </View>
    </CustomSafeArea>
  );
};

export default VerifyBvn;

const styles = StyleSheet.create({});
