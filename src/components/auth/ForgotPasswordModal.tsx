import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import ForgotPasswordLockIcon from '../../../assets/svgs/Onboarding/ForgotPasswordLockIcon';
import MailIcon from '../../../assets/svgs/Onboarding/MailIcon';
import { AuthService } from '../../services/auth';
import { useAppDispatch } from '../../controller/redux.controller';
import { updateToast } from '../../features/ui/ui.slice';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onChangeText?: (text: string) => void;
}

const ForgotPasswordModal = ({
  isVisible,
  onSuccess,
  onClose,
  onChangeText,
}: Props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authInstance = new AuthService();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await authInstance.forgotPassword(email);

      if (response.statusCode === 200 && response.success) {
        onSuccess?.();
      } else {
        // Show toast if API returns failure
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: response.message || 'Email not found',
            toastType: 'info',
          })
        );
      }
    } catch (error: any) {
      console.log('Forgot password error:', error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage:
            error?.response?.data?.message ||
            'Email not found, please try again.',
          toastType: 'info',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={onClose}
    >
      <View>
        <ForgotPasswordLockIcon
          style={{
            alignSelf: 'center',
            marginTop: size.getHeightSize(40),
          }}
          size={size.getHeightSize(160)}
        />

        <CText
          fontFamily="bold"
          fontSize={24}
          lineHeight={38}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Forgot Password?
        </CText>

        <CText
          color="secondaryBlack"
          fontFamily="regular"
          fontSize={16}
          lineHeight={22}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Please enter your registered email to reset your password.
        </CText>

        <CText
          style={{
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(8),
          }}
          color="secondaryBlack"
          fontSize={14}
          lineHeight={19.6}
        >
          Email Address
        </CText>

        <View
          style={{
            borderWidth: size.getHeightSize(1),
            borderRadius: size.getHeightSize(8),
            borderColor: colors.black('50'),
            backgroundColor: colors.black('30'),
            paddingHorizontal: size.getWidthSize(16),
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <BottomSheetTextInput
            cursorColor={colors.black()}
            numberOfLines={1}
            placeholder="@mail.com"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              onChangeText?.(text);
            }}
          />
          <MailIcon size={size.getHeightSize(24)} />
        </View>

        {/* Show error if email not found */}
      

        <PrimaryButton
          onPress={handleForgotPassword}
          disabled={!email}
          isLoading={isLoading}
          style={{
            marginTop: size.getHeightSize(32),
            paddingVertical: size.getHeightSize(15.5),
          }}
          label="Submit"
        />

        <CText
          fontFamily="semibold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Remember your login password?{' '}
          <CText
            onPress={onClose}
            color="secondary"
            fontFamily="semibold"
          >
            Login
          </CText>
        </CText>
      </View>
    </BottomsheetWrapper>
  );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
  input: {
    height: size.getHeightSize(50),
    flex: 1,
    shadowColor: '#31005C26',
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: size.fontSize(16),
    color: colors.black(),
  },
});




// import { StyleSheet, View } from 'react-native';
// import React, { useState } from 'react';
// import GradientHeader from '../../shared/GradientHeader';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { size } from '../../config/size';
// import CText from '../../shared/CText';
// import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
// import PTextInput from '../../shared/PTextInput';
// import PrimaryButton from '../../shared/PrimaryButton';
// import { Paystack } from 'react-native-paystack-webview';
// import { colors } from '../../constants/colors';
// import Constants from 'expo-constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useAppSelector, useAppDispatch } from '../../controller/redux.controller'; // Import useAppDispatch
// import { userSelector } from '../../features/user/user.selector';
// import { updateToast } from '../../features/ui/ui.slice'; // Import updateToast
// import { useNavigation } from '@react-navigation/native';
// import { formatToAmount } from '../../utils/stringManipulation';
// import { FundWalletService } from '../../services/fundWallet/fund-wallet.service';
// import { FundWalletRequestDto } from '../../services/fundWallet/fund-wallet.dto';

// const AddCard = () => {
//   const paystackKey = Constants.expoConfig?.extra?.PAYSTACK_KEY as string;
//   const [pay, setPay] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const user = useAppSelector(userSelector);
//   const dispatch = useAppDispatch(); // Initialize dispatch
//   const { navigate } = useNavigation();

//   // Initialize FundWalletService with userId and customerId
//   const fundWalletService = new FundWalletService(user.id, user.customerId);

//   const handleFundWallet = async (paystackResponse: any) => {
//     if (paystackResponse?.data?.event !== 'successful') {
//       setPay(false);
//       dispatch(
//         updateToast({
//           displayToast: true,
//           toastMessage: 'The payment was not successful. Please try again.',
//           toastType: 'info',
//         })
//       );
//       return;
//     }

//     setLoading(true);
//     try {
//       const fundWalletData: FundWalletRequestDto = {
//         customerID: user.customerId,
//         amount: parseFloat(amount),
//         message: 'Wallet funding via card',
//         reference: paystackResponse.data.reference,
//         status: 'success',
//         transaction: paystackResponse.data.transaction || paystackResponse.data.reference,
//         txtRef: paystackResponse.data.reference,
//       };

//       // Call the fundWallet API
//       await fundWalletService.fundWallet(fundWalletData);

//       setPay(false);
//       navigate('SuccessPage', {
//         title: 'Fund Wallet',
//         message: `You have successfully funded your wallet with ₦${formatToAmount(amount)}`,
//       });
//     } catch (error: any) {
//       console.error('Error funding wallet:', error);
//       setPay(false);
//       dispatch(
//         updateToast({
//           displayToast: true,
//           toastMessage:
//             error?.response?.data?.message ||
//             'An error occurred while funding your wallet. Please try again.',
//           toastType: 'info',
//         })
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <GradientSafeAreaView>
//       <GradientHeader>
//         <MaterialIcons
//           name="arrow-back-ios"
//           size={size.getHeightSize(18)}
//           color="white"
//         />
//         <CText
//           color={'white'}
//           fontSize={16}
//           lineHeight={25.6}
//           fontFamily="bold"
//         >
//           Go Back
//         </CText>
//       </GradientHeader>
//       <KeyboardAwareScrollView>
//         <View
//           style={{
//             paddingHorizontal: size.getWidthSize(16),
//             paddingTop: size.getHeightSize(16),
//           }}
//         >
//           <CText
//             color={'black'}
//             fontSize={18}
//             lineHeight={28.8}
//             fontFamily="bold"
//             style={{
//               opacity: 0.75,
//             }}
//           >
//             Fund wallet via card
//           </CText>
//           <CText
//             color={'secondaryBlack'}
//             fontSize={16}
//             lineHeight={22.4}
//             fontFamily="regular"
//             style={{
//               opacity: 0.75,
//               marginTop: size.getHeightSize(4),
//             }}
//           >
//             Enter the amount you want to add to your account
//           </CText>
//         </View>
//         <View
//           style={{
//             paddingHorizontal: size.getWidthSize(16),
//             marginTop: size.getHeightSize(24),
//           }}
//         >
//           <PTextInput
//             isAmount
//             value={amount}
//             keyboardType="numeric"
//             placeholder="₦ Amount"
//             onChangeText={(text) => setAmount(text)}
//           />
//         </View>
//         <View
//           style={{
//             height: size.getHeightSize(500),
//           }}
//         />
//         <View
//           style={{
//             marginHorizontal: size.getWidthSize(16),
//             marginBottom: size.getHeightSize(30),
//           }}
//         >
//           <PrimaryButton
//             disabled={!amount || loading}
//             label={loading ? 'Processing...' : 'Fund Wallet'}
//             style={{
//               marginTop: size.getHeightSize(32),
//             }}
//             onPress={() => {
//               setPay(true);
//             }}
//           />
//         </View>
//         {pay && (
//           <View style={{ flex: 1 }}>
//             <Paystack
//               paystackKey={paystackKey}
//               amount={amount}
//               billingEmail={user.email}
//               activityIndicatorColor={colors.primary()}
//               phone={user?.phoneNumber}
//               onCancel={(e) => {
//                 setPay(false);
//                 dispatch(
//                   updateToast({
//                     displayToast: true,
//                     toastMessage: 'You cancelled the wallet funding process.',
//                     toastType: 'info',
//                   })
//                 );
//               }}
//               onSuccess={(response) => {
//                 handleFundWallet(response);
//               }}
//               autoStart={pay}
//             />
//           </View>
//         )}
//       </KeyboardAwareScrollView>
//     </GradientSafeAreaView>
//   );
// };

// export default AddCard;

// const styles = StyleSheet.create({});