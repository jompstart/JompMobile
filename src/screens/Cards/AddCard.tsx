import { StyleSheet, View, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import GradientHeader from '../../shared/GradientHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useNavigation } from '@react-navigation/native';
import { formatToAmount } from '../../utils/stringManipulation';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { WebView } from 'react-native-webview';

const BASE_API_URL = 'https://backend.jompstart.com';

const FundWallet = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [backendReference, setBackendReference] = useState<string | null>(null);
  const user = useAppSelector(userSelector);
  const { navigate } = useNavigation();
  const webViewRef = useRef(null);

  console.log('userid is', user?.userId);
  console.log('user data is', JSON.stringify(user, null, 2));

  // Validate amount before proceeding
  const validateAmount = (amt: string): boolean => {
    const numAmount = parseFloat(amt);
    if (!amt || isNaN(numAmount) || numAmount < 100) {
      Alert.alert('Invalid Amount', 'Amount must be at least ₦100.');
      return false;
    }
    return true;
  };

  // Initialize payment by calling /credit-wallet-from-card
  const initializePayment = async () => {
    if (!validateAmount(amount)) return;

    // Validate user ID
    if (!user?.userId) {
      setError('User ID is missing. Please log in again or contact support.');
      return;
    }

    // Check network status
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setError('Network error: Please check your internet connection and try again.');
      return;
    }

    setLoading(true);
    try {
      const creditWalletPayload = {
        amount: parseFloat(amount),
        userId: user.userId,
        paymentSuccess: false, // Payment not yet completed
        reference: null, // No Paystack reference yet
      };
      console.log('Calling /credit-wallet-from-card:', `${BASE_API_URL}/credit-wallet-from-card`, 'Payload:', JSON.stringify(creditWalletPayload, null, 2));

      const creditWalletResponse = await axios.post(
        `${BASE_API_URL}/credit-wallet-from-card`,
        creditWalletPayload,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      console.log('Credit wallet raw response:', JSON.stringify(creditWalletResponse.data, null, 2));

      if ([200, 201].includes(creditWalletResponse.status)) {
        const responseData = creditWalletResponse.data.data || creditWalletResponse.data;
        const url = responseData.paymentUrl || responseData.url;
        const backendRef = responseData.reference;
        
        if (!backendRef || !url) {
          throw new Error('No backend reference or payment URL returned from /credit-wallet-from-card');
        }
        console.log('Parsed credit wallet response:', { url, backendReference: backendRef });
        setPaymentUrl(url);
        setBackendReference(backendRef);
      } else {
        throw new Error(`Credit wallet failed with status: ${creditWalletResponse.status}, response: ${JSON.stringify(creditWalletResponse.data, null, 2)}`);
      }
    } catch (error: any) {
      console.error('Initialize payment error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      let errorMessage = 'An error occurred while initializing payment. Please contact support at support@jompstart.com.';
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          errorMessage = `Credit wallet endpoint not found at ${error.config.url}. Please contact support to verify the server configuration.`;
        } else if (status === 400 || status === 422) {
          errorMessage = data.detail || data.message || `Invalid request to ${error.config.url}. Please contact support.`;
        } else if (status === 500) {
          errorMessage = `Server error in credit-wallet-from-card. This may be due to an invalid user ID. Please contact support.`;
        } else {
          errorMessage = `Backend error (status ${status}): ${data.message || 'Unknown error'}. Please contact support.`;
        }
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error: Unable to connect to the server. Please check your internet and retry.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request to server timed out. Please try again or contact support.';
      }
      setError(errorMessage);
      Alert.alert('Initialization Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment completion and call /callback-wallet-from-card
  const handlePaymentCompletion = async () => {
    if (!backendReference) {
      setError('No backend reference available. Please try again or contact support.');
      Alert.alert('Funding Failed', 'No backend reference available. Please try again or contact support.');
      return;
    }

    setLoading(true);
    try {
      const callbackUrl = `${BASE_API_URL}/callback-wallet-from-card?reference=${backendReference}`;
      console.log('Calling /callback-wallet-from-card:', callbackUrl);

      const callbackResponse = await axios.post(
        callbackUrl,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      console.log('Callback wallet raw response:', JSON.stringify(callbackResponse.data, null, 2));

      if ([200, 201].includes(callbackResponse.status)) {
        setPaymentUrl(null);
        setBackendReference(null);
        setError(null);
        navigate('SuccessPage', {
          title: 'Fund Wallet',
          message: `You have successfully funded your wallet with ₦${formatToAmount(amount)}.`,
        });
      } else {
        throw new Error(`Callback failed with status: ${callbackResponse.status}, response: ${JSON.stringify(callbackResponse.data, null, 2)}`);
      }
    } catch (error: any) {
      console.error('Callback wallet error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      let errorMessage = `An error occurred while funding your wallet. Backend reference: ${backendReference}. Please contact support at support@jompstart.com.`;
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          errorMessage = `Payment not found for backend reference: ${backendReference}. Please contact support to verify the payment.`;
        } else if (status === 400 || status === 422) {
          errorMessage = data.detail || data.message || `Invalid request to ${error.config.url}. Backend reference: ${backendReference}. Please contact support.`;
        } else if (status === 500) {
          errorMessage = `Server error in callback-wallet-from-card. Backend reference: ${backendReference}. Please contact support to resolve the server issue.`;
        } else {
          errorMessage = `Backend error (status ${status}): ${data.message || 'Unknown error'}. Backend reference: ${backendReference}. Please contact support.`;
        }
      } else if (error.message.includes('Network Error')) {
        errorMessage = `Network error: Unable to connect to the server. Backend reference: ${backendReference}. Please check your internet and retry.`;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = `Request to server timed out. Backend reference: ${backendReference}. Please try again or contact support.`;
      }
      setError(errorMessage);
      Alert.alert('Funding Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle WebView navigation state changes to detect payment completion
  const onWebViewNavigationStateChange = (navState: any) => {
    console.log('WebView navigation state:', JSON.stringify(navState, null, 2));
    
    const currentUrl = navState.url.toLowerCase();
    
    // Check if URL indicates payment completion/cancellation
    // Paystack typically redirects or shows a success/failure page
    const isSuccessUrl = currentUrl.includes('success') || 
                         currentUrl.includes('callback') || 
                         currentUrl.includes('complete');
    const isFailureUrl = currentUrl.includes('cancel') || 
                         currentUrl.includes('failed') || 
                         currentUrl.includes('error');
    
    // If redirected away from checkout page to a result page
    if (!navState.loading && (isSuccessUrl || isFailureUrl)) {
      console.log('Payment result detected, calling callback...');
      handlePaymentCompletion();
    }
    
    // Fallback: If user somehow closes/goes back from the checkout
    // This prevents calling callback on initial load
    const isCheckoutPage = currentUrl.includes('checkout.paystack.com');
    if (!navState.loading && navState.canGoBack && !isCheckoutPage && currentUrl.includes('paystack.com')) {
      console.log('Payment process completed (navigated away from checkout), calling callback...');
      handlePaymentCompletion();
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
            Fund Wallet
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
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              opacity: 0.75,
              marginTop: size.getHeightSize(8),
            }}
          >
            Select your payment method during checkout
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
        {error && (
          <View
            style={{
              paddingHorizontal: size.getWidthSize(16),
              marginTop: size.getHeightSize(16),
            }}
          >
            <CText
              color={'red'}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="regular"
            >
              {error}
            </CText>
            {backendReference && (
              <PrimaryButton
                label="Retry Funding"
                style={{
                  marginTop: size.getHeightSize(8),
                  backgroundColor: colors.black('10'),
                }}
                onPress={handlePaymentCompletion}
                disabled={loading}
              />
            )}
          </View>
        )}
        <View
          style={{
            height: size.getHeightSize(400),
          }}
        />
        <View
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginBottom: size.getHeightSize(30),
          }}
        >
          <PrimaryButton
            disabled={!amount || loading || !!paymentUrl}
            label={loading ? 'Processing...' : 'Proceed to Pay'}
            style={{
              marginTop: size.getHeightSize(32),
            }}
            onPress={initializePayment}
          />
        </View>
      </KeyboardAwareScrollView>
      {paymentUrl && (
        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
         
          <WebView
            ref={webViewRef}
            source={{ uri: paymentUrl }}
            style={{ flex: 1 }}
            onNavigationStateChange={onWebViewNavigationStateChange}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView error:', nativeEvent);
              setError('Payment failed due to a WebView error. Please try again or contact support.');
              Alert.alert('Payment Failed', 'Payment failed due to a WebView error. Please try again or contact support.');
              setPaymentUrl(null);
              setLoading(false);
            }}
          />
        </View>
      )}
    </GradientSafeAreaView>
  );
};

export default FundWallet;

const styles = StyleSheet.create({});