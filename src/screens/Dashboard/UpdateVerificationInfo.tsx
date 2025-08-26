import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { updateToast } from '../../features/ui/ui.slice';
import { ComplianceService } from '../../services/compliance';
import { CustomerVerificationType } from '../../types/verification.type'; 
import { useNavigation as useReactNavigation } from '@react-navigation/native';

const UpdateVerificationInfo = () => {
  const [form, setFormState] = useState({
    bvn: '',
    nin: '',
  });
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const complianceService = new ComplianceService(user.userId, user.customerId);

  const isBvnVerified = !!user.bvn;
  const isNinVerified = !!user.niN;

  const validateInput = (value: string, type: CustomerVerificationType): boolean => {
    const isValid = /^\d{11}$/.test(value);
    if (!isValid) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: `Invalid ${type.toUpperCase()}. Must be 11 digits.`,
          toastType: 'info',
        })
      );
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!user.userId || !user.customerId) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'User information is missing',
          toastType: 'info',
        })
      );
      return;
    }

    // Validate inputs
    if (form.bvn && !validateInput(form.bvn, 'bvn')) return;
    if (form.nin && !validateInput(form.nin, 'nin')) return;
    if (!form.bvn && !form.nin) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Please enter at least one verification number (BVN or NIN)',
          toastType: 'info',
        })
      );
      return;
    }

    if (form.bvn && isBvnVerified) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'BVN is already verified and cannot be updated here.',
          toastType: 'info',
        })
      );
      return;
    }
    if (form.nin && isNinVerified) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'NIN is already verified and cannot be updated here.',
          toastType: 'info',
        })
      );
      return;
    }

    setLoading(true);
    try {
      let bvnResponse = null;
      let ninResponse = null;

      if (form.bvn && !isBvnVerified) {
        bvnResponse = await complianceService.validateCustomerCompliance('bvn', form.bvn);
      }
      if (form.nin && !isNinVerified) {
        ninResponse = await complianceService.validateCustomerCompliance('nin', form.nin);
      }

      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Verification info updated successfully',
          toastType: 'success',
        })
      );

      // Reset form
      setFormState({ bvn: '', nin: '' });
    } catch (error) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Failed to update verification info. Please try again.',
          toastType: 'info',
        })
      );
      console.error('Error updating verification info:', error);
    } finally {
      setLoading(false);
    }
  };

  function useNavigation() {
    return useReactNavigation();
  }
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(20)}
          color="white"
          onPress={() => useNavigation().goBack()} // Add navigation
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
          flex: 1,
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
          Update Verification Info
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
          Update your verification information to keep your account secure and compliant.
        </CText>
        <KeyboardAwareScrollView>
          <View
            style={{
              gap: size.getHeightSize(16),
              marginTop: size.getHeightSize(20),
            }}
          >
            {!isBvnVerified ? (
              <PTextInput
                placeholder="BVN"
                value={form.bvn}
                onChangeText={(text) => {
                  setFormState((prev) => ({ ...prev, bvn: text }));
                }}
                keyboardType="numeric"
                maxLength={11}
              />
            ) : (
              <CText
                color={'secondaryBlack'}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="regular"
                style={{
                  opacity: 0.75,
                  marginVertical: size.getHeightSize(8),
                }}
              >
                BVN already verified
              </CText>
            )}
            {!isNinVerified ? (
              <PTextInput
                placeholder="NIN"
                value={form.nin}
                onChangeText={(text) => {
                  setFormState((prev) => ({ ...prev, nin: text }));
                }}
                keyboardType="numeric"
                maxLength={11}
              />
            ) : (
              <CText
                color={'secondaryBlack'}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="regular"
                style={{
                  opacity: 0.75,
                  marginVertical: size.getHeightSize(8),
                }}
              >
                NIN already verified
              </CText>
            )}
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView>
          <PrimaryButton
            onPress={handleSubmit}
            disabled={(!form.bvn && !form.nin) || loading || (isBvnVerified && isNinVerified)}
            label={loading ? 'Submitting...' : 'Submit'}
            style={{
              marginBottom: size.getHeightSize(32),
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </GradientSafeAreaView>
  );
};

export default UpdateVerificationInfo;

const styles = StyleSheet.create({});