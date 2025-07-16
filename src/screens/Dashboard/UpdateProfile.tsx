import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PTextInput from '../../shared/PTextInput';
import StatesBottomsheet from '../../shared/StateBottomsheet';
import PrimaryButton from '../../shared/PrimaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { UpdateProfileDto } from '../../services/dto/user.dto';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { UserService } from '../../services/user';
import { updateToast } from '../../features/ui/ui.slice';
const UpdateProfile = () => {
  const [showState, setShowState] = useState(false);
  const [form, setFormState] = useState({
    address: '',
    state: '',
    country: 'Nigeria',
    phoneNumber: '',
  });
  const queryClient = useQueryClient();
  const user = useAppSelector(userSelector);
  const userInstance = new UserService(user.customerId, user.userId);
  const dispatch = useAppDispatch();
  const { mutate: updateProfile, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    UpdateProfileDto
  >({
    mutationFn: async (data) => userInstance.updateProfile(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['refreschUserData'],
      });
      if (!response.success) {
        dispatch(
          updateToast({
            displayToast: true,
            toastMessage: response.message || 'Failed to update profile',
            toastType: 'info',
          })
        );
        return;
      }
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Profile updated successfully',
          toastType: 'success',
        })
      );
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: error.message || 'Failed to update profile',
          toastType: 'info',
        })
      );
    },
  });
  return (
    <GradientSafeAreaView>
      <GradientHeader>
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
          Update Profile
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
          Update your profile information to keep your account secure and up to
          date.
        </CText>
        <KeyboardAwareScrollView>
          <View
            style={{
              gap: size.getHeightSize(16),
              marginTop: size.getHeightSize(20),
            }}
          >
            <PTextInput
              placeholder="Contact addrress"
              value={form.address}
              onChangeText={(text) => {
                setFormState((prev) => ({ ...prev, address: text }));
              }}
            />
            <PTextInput
              editable={false}
              onPress={() => {
                setShowState(true);
              }}
              placeholder="State"
              value={form.state}
            />
            <PTextInput
              placeholder="Country"
              value={form.country}
              editable={false}
            />
            <PTextInput
              keyboardType="phone-pad"
              placeholder="Phone number"
              value={form.phoneNumber}
              onChangeText={(text) => {
                setFormState((prev) => ({ ...prev, phoneNumber: text }));
              }}
              maxLength={11}
            />
          </View>
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView>
          <PrimaryButton
            onPress={() => {
              updateProfile({
                contactAddress: `${form.address}, ${form.state}, ${form.country}`,
                phoneNumber: form.phoneNumber,
              });
            }}
            isLoading={isPending}
            disabled={!form.address || !form.state}
            label="Submit"
            style={{
              marginBottom: size.getHeightSize(32),
            }}
          />
        </KeyboardAvoidingView>
      </View>

      <StatesBottomsheet
        isVisible={showState}
        onClose={() => {
          setShowState(false);
        }}
        onStateSelected={(st) => {
          setFormState((prev) => ({ ...prev, state: st.name }));
          setShowState(false);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
