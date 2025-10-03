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
// import { useAppSelector } from '../../controller/redux.controller';
// import { userSelector } from '../../features/user/user.selector';
// import { useNavigation } from '@react-navigation/native';
// import { formatToAmount } from '../../utils/stringManipulation';
// const AddCard = () => {
//   const paystackKey = Constants.expoConfig?.extra?.PAYSTACK_KEY as string;

//   const [pay, setPay] = useState(false);
//   const [amount, setAmount] = useState('');
//   const user = useAppSelector(userSelector);
//   const { navigate } = useNavigation();
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
//           {/* <CText
//           color={'secondaryBlack'}
//           fontSize={16}
//           lineHeight={22.4}
//           fontFamily="regular"
//           style={{
//             opacity: 0.75,
//             marginTop: size.getHeightSize(4),
//           }}
//         >
//           Add new card to fund your wallet
//         </CText> */}
//         </View>
//         {/* <View
//         style={{
//           paddingHorizontal: size.getWidthSize(16),
//           marginTop: size.getHeightSize(24),
//         }}
//       >
//         <ScrollView
//           contentContainerStyle={{
//             gap: size.getWidthSize(16),
//           }}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         >
//           <View
//             style={{
//               width: size.getWidthSize(159),
//               alignItems: 'center',
//               gap: size.getHeightSize(4),
//               backgroundColor: colors.white(),
//               borderRadius: size.getWidthSize(8),
//               paddingHorizontal: size.getWidthSize(16),
//             }}
//           >
//             <AddBankIcon size={size.getHeightSize(80)} />
//             <CText
//               color={'secondaryBlack'}
//               fontSize={12}
//               lineHeight={19.2}
//               fontFamily="regular"
//               style={{
//                 opacity: 50,
//                 textAlign: 'center',
//               }}
//             >
//               Do you want to add new card.{' '}
//               <CText
//                 fontSize={12}
//                 lineHeight={19.2}
//                 fontFamily="semibold"
//                 color="primaryColor"
//               >
//                 Click to Add
//               </CText>
//             </CText>
//           </View>
//           <View
//             style={{
//               backgroundColor: '#1434CB',
//               height: size.getHeightSize(138),
//               width: size.getWidthSize(238),
//               borderRadius: size.getWidthSize(8),
//             }}
//           >
//             <StrikePath
//               width={size.getWidthSize(107)}
//               height={size.getHeightSize(138)}
//               style={{
//                 position: 'absolute',
//                 left: size.getWidthSize(85),
//                 bottom: size.getHeightSize(0),
//               }}
//             />
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 padding: size.getWidthSize(16),
//                 alignItems: 'flex-start',
//               }}
//             >
//               <VisaIcon size={size.getHeightSize(24)} />
//             </View>
//             <View
//               style={{
//                 bottom: size.getHeightSize(8),
//                 left: size.getWidthSize(8),
//                 flexDirection: 'row',
//                 gap: size.getWidthSize(17),
//                 alignItems: 'flex-end',
//               }}
//             >
//               <View
//                 style={{
//                   gap: size.getHeightSize(4),
//                 }}
//               >
//                 <CText
//                   color={'white'}
//                   fontSize={12}
//                   lineHeight={19.2}
//                   fontFamily="bold"
//                 >
//                   Titan Trust Bank
//                 </CText>
//                 <CText
//                   color={'white'}
//                   fontSize={12}
//                   lineHeight={19.2}
//                   fontFamily="bold"
//                 >
//                   1010-01**-****-**01
//                 </CText>
//                 <CText
//                   color={'white'}
//                   fontSize={12}
//                   lineHeight={19.2}
//                   fontFamily="bold"
//                 >
//                   Expiry Date: 06/26
//                 </CText>
//               </View>
//               <View
//                 style={{
//                   width: size.getWidthSize(92),
//                   backgroundColor: colors.white(),
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: size.getWidthSize(8),
//                 }}
//               >
//                 <CText
//                   color={'primaryColor'}
//                   fontSize={11}
//                   lineHeight={17.6}
//                   fontFamily="bold"
//                 >
//                   Set as Default
//                 </CText>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </View> */}
//         <View
//           style={{
//             paddingHorizontal: size.getWidthSize(16),
//             // paddingTop: size.getHeightSize(16),
//             // marginTop: size.getHeightSize(32),
//           }}
//         >
//           {/* <CText
//           color={'black'}
//           fontSize={18}
//           lineHeight={28.8}
//           fontFamily="bold"
//           style={{
//             opacity: 0.75,
//           }}
//         >
//           Default Card Selected
//         </CText> */}
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
//             disabled={!amount}
//             label="Fund Wallet"
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
//                 // handle response here
//               }}
//               onSuccess={(response) => {
//                 // handle response here
//                 console.log(response);
//                 if (response.data.event == 'successful') {
//                   setPay(false);
//                   navigate('SuccessPage', {
//                     title: 'Fund Wallet',
//                     message: `You have successfully funded your wallet with #${formatToAmount(
//                       amount
//                     )}`,
//                   });
//                 }
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
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GradientHeader from '../../shared/GradientHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { Paystack } from 'react-native-paystack-webview';
import { colors } from '../../constants/colors';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useNavigation } from '@react-navigation/native';
import { formatToAmount } from '../../utils/stringManipulation';
import { FundWalletRequestDto } from '../../services/fundWallet/fund-wallet.dto'; // Import DTO
import { FundWalletService } from '../../services/fundWallet/fund-wallet.service';

const AddCard = () => {
  const paystackKey = Constants.expoConfig?.extra?.PAYSTACK_KEY as string;
  const [pay, setPay] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const user = useAppSelector(userSelector);
  const { navigate } = useNavigation();

  // Initialize FundWalletService with userId and customerId
  const fundWalletService = new FundWalletService(user.id, user.customerId);

  const handleFundWallet = async (paystackResponse: any) => {
    if (paystackResponse?.data?.event !== 'successful') {
      setPay(false);
      Alert.alert('Funding Failed', 'The payment was not successful. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const fundWalletData: FundWalletRequestDto = {
        customerID: user.customerId,
        amount: parseFloat(amount),
        message: 'Wallet funding via card',
        reference: paystackResponse.data.reference, // Use Paystack reference
        status: 'success',
        transaction: paystackResponse.data.transaction || paystackResponse.data.reference,
        txtRef: paystackResponse.data.reference,
      };

      // Call the fundWallet API
      await fundWalletService.fundWallet(fundWalletData);

      setPay(false);
      navigate('SuccessPage', {
        title: 'Fund Wallet',
        message: `You have successfully funded your wallet with ₦${formatToAmount(amount)}`,
      });
    } catch (error) {
      console.error('Error funding wallet:', error);
      setPay(false);
      Alert.alert('Funding Failed', 'An error occurred while funding your wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      <KeyboardAwareScrollView>
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
            Fund wallet via card
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
          <PTextInput
            isAmount
            value={amount}
            keyboardType="numeric"
            placeholder="₦ Amount"
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <View
          style={{
            height: size.getHeightSize(500),
          }}
        />
        <View
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginBottom: size.getHeightSize(30),
          }}
        >
          <PrimaryButton
            disabled={!amount || loading}
            label={loading ? 'Processing...' : 'Fund Wallet'}
            style={{
              marginTop: size.getHeightSize(32),
            }}
            onPress={() => {
              setPay(true);
            }}
          />
        </View>
        {pay && (
          <View style={{ flex: 1 }}>
            <Paystack
              paystackKey={paystackKey}
              amount={amount}
              billingEmail={user.email}
              activityIndicatorColor={colors.primary()}
              phone={user?.phoneNumber}
              onCancel={(e) => {
                setPay(false);
                Alert.alert('Funding Cancelled', 'You cancelled the wallet funding process.');
              }}
              onSuccess={(response) => {
                handleFundWallet(response);
              }}
              autoStart={pay}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </GradientSafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({});