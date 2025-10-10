import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import SecondaryButton from '../../shared/SecondaryButton';
import InfoIcon from '../../../assets/svgs/Savings/InfoIcon';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { formatToAmount } from '../../utils/stringManipulation';

const BASE_API_URL = 'https://backend.jompstart.com';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  visibility: boolean;
  goalId: string;
  savedAmount: number;
  targetAmount: number;
}

interface WithdrawalRequest {
  customerId: string;
  savingsGoalId: string;
  amount: number;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

const WithdrawBottomsheet = ({ 
  goalId, 
  onClose, 
  onSuccess, 
  visibility, 
  savedAmount, 
  targetAmount 
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector(userSelector);

  // Debug props and user token
  console.log('WithdrawBottomsheet props:', { goalId, savedAmount, targetAmount });
  console.log('User token:', user?.token ? `${user.token.substring(0, 20)}...` : 'No token');

  const validateInputs = (): string | null => {
    if (!user?.userId) {
      return 'User ID not found. Please log in again.';
    }
    if (!user?.token || user.token.length < 10) {
      return 'Invalid authentication token. Please log in again.';
    }
    if (!goalId) {
      return 'Savings Goal ID is missing.';
    }
    if (typeof savedAmount !== 'number' || isNaN(savedAmount) || savedAmount <= 0) {
      return 'Invalid withdrawal amount.';
    }
    if (savedAmount > targetAmount) {
      return 'Withdrawal amount cannot exceed target amount.';
    }
    return null;
  };

  const checkNetworkConnection = async (): Promise<boolean> => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setError('No internet connection. Please check your network and try again.');
        return false;
      }
      return true;
    } catch (networkError) {
      setError('Unable to check network connection. Please try again.');
      return false;
    }
  };

  const parseServerError = (errorData: any): string => {
    if (typeof errorData === 'string') {
      if (errorData.includes('InvalidOperationException') && errorData.includes('Include')) {
        return 'System maintenance in progress. Please try again in a few minutes.';
      }
      if (errorData.includes('EntityFramework')) {
        return 'Database temporarily unavailable. Please try again shortly.';
      }
      return errorData;
    }
    if (errorData?.detail) {
      return errorData.detail;
    }
    if (errorData?.message) {
      return errorData.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const handleApiError = (error: any): ApiError => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          return { message: parseServerError(data), status, data };
        } else if (status === 401) {
          return { message: 'Your session has expired. Please log in again.', status };
        } else if (status === 400) {
          return { message: data?.detail || 'Invalid request. Please check your input.', status };
        } else if (status === 422) {
          return { message: data?.detail || 'Validation error. Please check your input.', status };
        } else if (status === 404) {
          return { message: 'Savings goal not found. Please refresh and try again.', status };
        } else if (status === 403) {
          return { message: 'You do not have permission to perform this action.', status };
        } else {
          return { message: `Server error (${status}). Please try again.`, status };
        }
      } else if (error.request) {
        return { message: 'Unable to connect to server. Please check your internet connection and try again.' };
      }
    }
    return { message: 'An unexpected error occurred. Please try again.' };
  };

  const showSuccessAlert = () => {
    Alert.alert(
      'Withdrawal Successful',
      `₦${formatToAmount(savedAmount.toString())} has been successfully withdrawn from your savings.`,
      [{ text: 'OK', onPress: () => { onClose(); onSuccess(); } }]
    );
  };

  const showErrorAlert = (errorMessage: string) => {
    Alert.alert('Withdrawal Failed', errorMessage, [{ text: 'OK' }]);
  };

  const handleWithdraw = async () => {
    setError(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const isConnected = await checkNetworkConnection();
    if (!isConnected) {
      return;
    }

    setLoading(true);

    const customerIdToUse = user.customerId || user.userId;
    console.log('Using customerId:', customerIdToUse);

    const requestBody: WithdrawalRequest = {
      customerId: customerIdToUse,
      savingsGoalId: goalId,
      amount: savedAmount,
    };

    console.log('Making API call to /with-draw-savings with JSON body:', JSON.stringify(requestBody, null, 2));

    try {
      const response = await axios.post(
        `${BASE_API_URL}/with-draw-savings`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
          validateStatus: (status) => status < 600, // Accept 500+ for full response
        }
      );

      console.log('API Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.status === 201 || response.status === 200) {
        showSuccessAlert();
      } else {
        setError('Unexpected response from server. Please try again.');
      }
    } catch (err: any) {
      console.error('=== WITHDRAWAL API ERROR DEBUG ===');
      console.error('Error message:', err.message);
      console.error('Full error object:', err);
      
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        console.error('Response data (server error details):', JSON.stringify(err.response.data, null, 2));
        console.error('Raw response body:', err.response.data);
      } else if (err.request) {
        console.error('No response received. Request details:', err.request);
      }
      console.error('Request config:', {
        url: `${BASE_API_URL}/with-draw-savings`,
        method: 'post',
        data: JSON.stringify(requestBody, null, 2),
        headers: {
          Authorization: `Bearer ${user.token ? '***REDACTED***' : 'MISSING'}`,
          'Content-Type': 'application/json',
        },
      });
      console.error('=== END DEBUG ===');

      const apiError = handleApiError(err);
      setError(apiError.message);
      
      if (apiError.status && apiError.status >= 500) {
        showErrorAlert(apiError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
      onClose={handleClose}
    >
      <View style={{ marginTop: size.getHeightSize(12), marginBottom: size.getHeightSize(4) }}>
        <CancelIcon
          onPress={handleClose}
          style={{ alignSelf: 'flex-end' }}
          size={size.getHeightSize(24)}
          disabled={loading}
        />
      </View>
      
      <CText
        color={colors.black('70') as any}
        fontSize={18}
        lineHeight={28.8}
        fontFamily="bold"
      >
        Withdraw Savings
      </CText>
      
      {error && (
        <View style={styles.errorContainer}>
          <CText
            color={colors.error}
            fontSize={14}
            lineHeight={22.4}
            fontFamily="regular"
            style={styles.errorText}
          >
            {error}
          </CText>
        </View>
      )}
      
      <CText
        color={'secondaryBlack'}
        fontSize={14}
        lineHeight={22.4}
        fontFamily="regular"
        style={styles.description}
      >
        You are attempting to make a withdrawal before the end of your savings duration.
      </CText>
      
      <View style={styles.amountsContainer}>
        <View style={styles.amountSection}>
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            Savings Accrued
          </CText>
          <CText
            color={'warning'}
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
          >
            ₦{formatToAmount(savedAmount ? savedAmount.toString() : '0')}
          </CText>
        </View>
        
        <View style={styles.divider} />
        
        <View style={[styles.amountSection, styles.rightSection]}>
          <CText
            color={colors.black('70') as any}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="semibold"
            style={styles.rightAlign}
          >
            Savings Goal
          </CText>
          <CText
            color={'black'}
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
            style={styles.rightAlign}
          >
            ₦{formatToAmount(targetAmount ? targetAmount.toString() : '0')}
          </CText>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <InfoIcon size={size.getHeightSize(24)} />
        <CText
          color={'black'}
          fontSize={12}
          lineHeight={16.8}
          fontFamily="regular"
          style={styles.infoText}
        >
          This action cannot be reversed. If you proceed, you will lose all the interest accrued.
        </CText>
      </View>
      
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          label={loading ? "Processing..." : "Yes, Proceed"}
          onPress={handleWithdraw}
          disabled={loading || !savedAmount || savedAmount <= 0 || !user?.token}
          loading={loading}
        />
        <SecondaryButton
          label="No, Cancel"
          onPress={handleClose}
          disabled={loading}
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default WithdrawBottomsheet;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.error + '20',
    padding: size.getHeightSize(12),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(16),
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorText: {
    textAlign: 'left',
  },
  description: {
    flex: 1,
    marginTop: size.getHeightSize(8),
  },
  amountsContainer: {
    paddingVertical: size.getHeightSize(16),
    backgroundColor: colors.appBackground(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
  },
  amountSection: {
    gap: size.getHeightSize(8),
    flex: 1,
  },
  rightSection: {
    alignSelf: 'flex-end',
  },
  rightAlign: {
    textAlign: 'right',
  },
  divider: {
    width: size.getWidthSize(1),
    height: '100%',
    backgroundColor: '#31005C4D',
    marginHorizontal: size.getWidthSize(16),
  },
  infoContainer: {
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(17),
    backgroundColor: colors.primary('10'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    marginTop: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
  },
  infoText: {
    textAlign: 'left',
    flex: 1,
  },
  buttonsContainer: {
    gap: size.getHeightSize(16),
    marginTop: size.getHeightSize(40),
  },
  view: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(14),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
});