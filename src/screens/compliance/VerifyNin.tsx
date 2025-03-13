import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomSafeArea from '../../shared/CustomSafeAreaView';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import CText from '../../shared/CText';
import CTextInput from '../../shared/CTextInput';
import SecondaryButton from '../../shared/SecondaryButton';
import PrimaryButton from '../../shared/PrimaryButton';
import SuccessModal from '../../shared/SuccessModal';
import Asterisks from '../../../assets/svgs/Onboarding/Asterisks';
import UploadIamgeModal from '../../components/compliance/UploadIamgeModal';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useAppDispatch } from '../../controller/redux.controller';
import AttachmentView from '../../shared/AttachmentView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { ComplianceService } from '../../services/compliance';
import { base64ToFile, convertImageToBinary } from '../../utils/fileReader';
import { changeUserState } from '../../features/user/user.slice';
import { updateToast } from '../../features/ui/ui.slice';
const VerifyNin = () => {
  const navigation = useNavigation();
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [isVerified, setVerificationStatus] = useState(false);
  const [isVerificationLoading, setVerificationLoadingState] = useState(false);
  const [nin, setNin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const user = useAppSelector(userSelector);
  const complianceInstance = new ComplianceService(
    user.userId,
    user.customerId
  );
  const dispatch = useAppDispatch();

  const handleVerifyNin = async () => {
    console.log('==== here ====');
    setVerificationLoadingState(true);
    try {
      console.log('==== here 2====');
      const response = await complianceInstance.validateCustomerCompliance(
        'nin',
        nin
      );

      if (
        response.statusCode == 200 &&
        response.success &&
        response.data?.status
      ) {
        const file = await base64ToFile(response.data.image);

        const fileData = {
          uri: file.startsWith('file://') ? file : `file://${fileUri}`, // Ensure proper format
          name: 'image.jpg', // Adjust based on file type
          type: 'image/jpeg', // Change if necessary
        };

        const verifyCustomer = await complianceInstance.verifyCustomer(
          'nin',
          response.data?.status,
          nin.toString(),
          'Nin',
          `${response.data?.firstName} ${response.data?.lastName}`,
          fileData,
          phoneNumber
        );

        if (verifyCustomer.statusCode == 201 && verifyCustomer.success) {
          dispatch(
            updateToast({
              displayToast: true,
              toastMessage: 'NIN Verified!',
              toastType: 'success',
            })
          );
          setVerificationStatus(true);
          navigation.dispatch(StackActions.replace('BottomtabNavigation'));
          dispatch(
            changeUserState({
              key: 'ninStatus',
              value: true,
            })
          );
        }
      }
    } catch (error) {
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
            Confirming your BVN helps us verify your identity and keeps your
            account from fraud.
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
            style={{
              opacity: 0.3,
            }}
          >
            Step 1 (BVN)
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
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
              width: '100%',
              height: size.getHeightSize(13),
              borderRadius: size.getHeightSize(8),
              backgroundColor: '#31005C',
            }}
          />
        </View> */}

          <View
            style={{
              marginTop: size.getHeightSize(32),
              gap: size.getHeightSize(24),
            }}
          >
            <CTextInput
              keyboardType="phone-pad"
              required
              placeholder="1234567890"
              title="National Identity Number (NIN) "
              onChangeText={setNin}
            />
            <CTextInput
              onChangeText={setPhoneNumber}
              required
              placeholder="1234567890"
              title="Phone Number"
              keyboardType="phone-pad"
            />
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(8),
              }}
            >
              <CText
                color="secondaryBlack"
                fontSize={14}
                lineHeight={19.6}
                fontFamily="semibold"
              >
                Upload NIN Slip
              </CText>
              <Asterisks size={size.getHeightSize(16)} />
            </View> */}
            {/* <AttachmentView
              fileUri={fileUri}
              onPress={() => {
                setShowUploadFileModal(true);
              }}
              description=" "
              type=".png .Jpeg (max. 1MB)"
            /> */}
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(120),
              gap: size.getHeightSize(24),
              marginBottom: size.getHeightSize(32),
            }}
          >
            <PrimaryButton
              isLoading={isVerificationLoading}
              disabled={!nin || !phoneNumber}
              label="Verify"
              onPress={handleVerifyNin}
            />
            {/* <PrimaryButton
              disabled={isVerified}
              label="Submit"
              onPress={() => {
                // navigation.navigate('BottomtabNavigation');
              }}
            /> */}
          </View>
        </KeyboardAwareScrollView>
        <SuccessModal
          visibility={false}
          onClose={() => {}}
          buttonText="Submit"
          onContinue={() => {}}
          title="NIN Verified!"
          description="Your NIN has been successfully verified."
        />
        <UploadIamgeModal
          isVisible={showUploadFileModal}
          onClose={() => {
            setShowUploadFileModal(false);
          }}
          onSelectedImage={(uri) => {
            setFileUri(uri);
            setShowUploadFileModal(false);
            // console.log('======= converting to binary ======');
            // convertImageToBinary(uri);
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default VerifyNin;

const styles = StyleSheet.create({});
