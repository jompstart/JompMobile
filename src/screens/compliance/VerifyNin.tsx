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
import { useNavigation } from '@react-navigation/native';
import AttachmentView from '../../shared/AttachmentView';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { ComplianceService } from '../../services/compliance';
const VerifyNin = () => {
  const navigation = useNavigation();
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [isVerified, setVerificationStatus] = useState(false);
  const [isVerificationLoading, setVerificationLoadingState] = useState(false);
  const [nin, setNin] = useState('');
  const user = useAppSelector(userSelector);
  const complianceInstance = new ComplianceService(user.userId);
  const handleVerifyNin = async () => {
    setVerificationLoadingState(true);
    try {
      const response = await complianceInstance.verifyCustomer('nin', nin);
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
            flex: 1,
          }}
        >
          <CTextInput
            required
            placeholder="1234567890"
            title="National Identity Number (NIN) "
          />
          <View
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
          </View>
          <AttachmentView
            fileUri={fileUri}
            onPress={() => {
              setShowUploadFileModal(true);
            }}
            description=" "
            type=".png .Jpeg (max. 1MB)"
          />
        </View>
        <View
          style={{
            marginTop: size.getHeightSize(8),
            gap: size.getHeightSize(24),
            marginBottom: size.getHeightSize(32),
          }}
        >
          <SecondaryButton
            isLoading={isVerificationLoading}
            disabled={!fileUri || !nin}
            label="Verify"
            onPress={handleVerifyNin}
          />
          <PrimaryButton
            disabled={isVerified}
            label="Submit"
            onPress={() => {
              // navigation.navigate('BottomtabNavigation');
            }}
          />
        </View>
        <UploadIamgeModal
          isVisible={showUploadFileModal}
          onClose={() => {
            setShowUploadFileModal(false);
          }}
          onSelectedImage={(uri) => {
            setFileUri(uri);
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default VerifyNin;

const styles = StyleSheet.create({});
