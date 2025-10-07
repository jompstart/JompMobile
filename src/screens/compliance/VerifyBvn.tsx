import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
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
import PrimaryButton from '../../shared/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from '../../shared/SuccessModal';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ComplianceService } from '../../services/compliance';
import {
  useAppSelector,
  useAppDispatch,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { updateToast } from '../../features/ui/ui.slice';
import { changeUserState } from '../../features/user/user.slice';

const VerifyBvn = () => {
  const [isVerified, setVerificationStatus] = useState(false);
  const [bvn, setBvn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bvnError, setBvnError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isVerificationLoading, setVerificationLoadingState] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useNavigation();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const complianceInstance = new ComplianceService(user.userId, user.customerId);

  // Validation function for BVN and Phone Number
  const validateInputs = () => {
    let isValid = true;

    // Validate BVN (exactly 11 digits)
    if (!/^\d{11}$/.test(bvn)) {
      setBvnError('BVN must be exactly 11 digits.');
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'BVN must be exactly 11 digits.',
          toastType: 'info',
        })
      );
      isValid = false;
    } else {
      setBvnError('');
    }

    // Validate Phone Number (10 to 12 digits)
    if (!/^\d{10,12}$/.test(phoneNumber)) {
      setPhoneError('Phone number must be 10 to 12 digits.');
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Phone number must be 10 to 12 digits.',
          toastType: 'info',
        })
      );
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  // Progress loader effect
  useEffect(() => {
    let interval = null;
    if (isVerificationLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 100;
          }
          return prevProgress + 5;
        });
      }, 1000);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVerificationLoading]);

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Helper function to extract MIME type and base64 data
  const extractBase64Data = (base64String) => {
    try {
      if (!base64String) {
        throw new Error('No base64 string provided');
      }

      // Check if it already has data URI prefix
      if (base64String.includes('data:')) {
        const [prefix, base64] = base64String.split(',');
        const mimeType = prefix.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)/)?.[1] || 'image/jpeg';
        return { mimeType, base64: base64 || base64String };
      }

      // If no prefix, assume it's raw base64 for JPEG
      return { mimeType: 'image/jpeg', base64: base64String };
    } catch (error) {
      console.error('Error extracting base64 data:', error);
      return { mimeType: 'image/jpeg', base64: base64String };
    }
  };

  // Convert base64 to file object (React Native compatible)
  const base64ToFile = async (base64Data, fileName, mimeType) => {
    try {
      // Clean the base64 string
      const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
      
      // Create a temporary file path
      const fileUri = `${fileName}.${mimeType.split('/')[1]}`;
      
      return {
        uri: `data:${mimeType};base64,${cleanBase64}`,
        name: fileUri,
        type: mimeType,
      };
    } catch (error) {
      console.error('Error converting base64 to file:', error);
      throw new Error('Failed to process image data');
    }
  };

  const handleVerifyBvn = async () => {
    if (!validateInputs()) {
      return;
    }

    setVerificationLoadingState(true);
    
    try {
      // Step 1: Validate BVN
      console.log('Starting BVN validation...');
      const response = await complianceInstance.validateCustomerCompliance('bvn', bvn);
      
      console.log('BVN validation response:', JSON.stringify(response, null, 2));

      if (!response?.success || response?.statusCode !== 200) {
        throw new Error(response?.message || 'BVN validation failed');
      }

      if (!response.data?.status || response.data.status !== 'found') {
        throw new Error('BVN not found or invalid');
      }

      if (!response.data?.image) {
        throw new Error('No image data returned for BVN verification');
      }

      // Step 2: Process the image
      console.log('Processing BVN image...');
      const { mimeType, base64 } = extractBase64Data(response.data.image);
      const fileData = await base64ToFile(base64, 'bvn_image', mimeType);

      console.log('File data prepared:', { 
        name: fileData.name, 
        type: fileData.type,
        uriLength: fileData.uri.length 
      });

      // Step 3: Verify customer
      console.log('Verifying customer...');
      const fullName = `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim();
      
      const verifyCustomer = await complianceInstance.verifyCustomer(
        user.customerId,
        response.data.status,
        bvn,
        'BVN',
        fullName,
        fileData,
        phoneNumber
      );

      console.log('Customer verification response:', verifyCustomer);

      if (!verifyCustomer?.success || verifyCustomer?.statusCode !== 201) {
        throw new Error(verifyCustomer?.message || 'Customer verification failed');
      }

      // Step 4: Create bank account
      try {
        console.log('Creating bank account...');
        await complianceInstance.createAccount();
        console.log('Bank account created successfully');
      } catch (accountError) {
        console.error('Create account error:', accountError);
        // Don't fail the entire process if account creation fails
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: 'BVN verified, but account creation pending.',
            toastType: 'info',
          })
        );
      }

      // Success - update state and show feedback
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'BVN Verified Successfully!',
          toastType: 'success',
        })
      );
      
      setShowConfetti(true);
      setVerificationStatus(true);
      dispatch(changeUserState({ key: 'bvnStatus', value: true }));
      dispatch(changeUserState({ key: 'complianceStatus', value: true }));

    } catch (error) {
      console.error('BVN verification error:', error);
      
      const errorMessage = error?.message || 
        error?.response?.data?.message || 
        'An error occurred during BVN verification. Please try again.';
      
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'error',
        })
      );
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
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(20),
          }}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={size.getHeightSize(16)}
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
            BVN Verification
          </CText>
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
              Confirming your BVN helps us verify your identity and gives you full access to our services
            </CText>
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(24),
            }}
          >
            <CTextInput
              onChangeText={(text) => {
                setBvn(text.replace(/\D/g, '')); // Only allow digits
                setBvnError('');
              }}
              value={bvn}
              required
              placeholder="Enter BVN (11 digits)"
              title="BVN"
              keyboardType="phone-pad"
              maxLength={11}
              error={bvnError}
            />
            <View style={{ height: size.getHeightSize(24) }} />
            <CTextInput
              onChangeText={(text) => {
                setPhoneNumber(text.replace(/\D/g, '')); // Only allow digits
                setPhoneError('');
              }}
              value={phoneNumber}
              required
              placeholder="Enter Phone Number"
              title="Phone Number"
              keyboardType="phone-pad"
              maxLength={12}
              error={phoneError}
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
                backgroundColor: '#FFF9E6',
                borderRadius: size.getHeightSize(8),
                marginTop: size.getHeightSize(24),
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: size.getHeightSize(18) }}>
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
                      >
                        Name
                      </CText>
                      <CText
                        color="black"
                        fontSize={12}
                        lineHeight={14}
                        fontFamily="regular"
                      >
                        Email
                      </CText>
                      <CText
                        color="black"
                        fontSize={12}
                        lineHeight={14}
                        fontFamily="regular"
                      >
                        Address
                      </CText>
                    </View>
                  </View>
                  <CText
                    color="secondaryBlack"
                    fontSize={12}
                    lineHeight={16}
                    fontFamily="semibold"
                  >
                    The goal of the Bank Verification Number (BVN) is to uniquely verify the identity of a customer for KYC purposes. Confirming your BVN does not give us access to your bank accounts, and we cannot use your BVN to transfer money. Your data is safe with us.
                  </CText>
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={{ height: size.getHeightSize(16) }} />
          <View
            style={{
              marginTop: size.getHeightSize(16),
              gap: size.getHeightSize(24),
              marginBottom: size.getHeightSize(40),
            }}
          >
            <PrimaryButton
              isLoading={isVerificationLoading}
              disabled={!bvn || !phoneNumber || !!bvnError || !!phoneError || isVerificationLoading}
              label="Verify"
              onPress={handleVerifyBvn}
            />
          </View>
        </KeyboardAwareScrollView>
        <SuccessModal
          visibility={isVerified}
          onClose={() => setVerificationStatus(false)}
          buttonText="Proceed"
          onContinue={() => {
            setVerificationStatus(false);
            navigation.dispatch(StackActions.replace('BottomtabNavigation'));
          }}
          title="BVN Verified!"
          description="You have successfully onboarded. You can now enjoy Jompstart."
        />
      </View>
    </CustomSafeArea>
  );
};

export default VerifyBvn;

const styles = StyleSheet.create({});