import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PrimaryButton from '../../shared/PrimaryButton';
import { colors } from '../../constants/colors';
import RequestErrorBottomsheet from '../../components/Support/RequestErrorBottomsheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PTextInput from '../../shared/PTextInput';
import ReasonBotttomsheet from '../../components/Support/ReasonBotttomsheet';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { UserService } from '../../services/user';
import { API_RESPONSE } from '../../types';
import { useNavigation } from '@react-navigation/native';
import {
  DeleteAccountDto,
  DeleteAccountErrorResponseDto,
} from '../../services/dto/user.dto';
const Request = () => {
  const [reasonBottomSheetVisible, setShowReasonBottomSheet] =
    React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState<{
    text: string;
    id: number | null;
  }>({
    text: '',
    id: null,
  });
  const user = useAppSelector(userSelector);
  const [details, setDetails] = React.useState('');

  const navigation = useNavigation();
  const userInstance = new UserService(user.customerId, user.userId);
  const {
    mutate: deleteAccount,
    isPending,
    error,
    isError,
    reset,
  } = useMutation<API_RESPONSE<any>, Error, DeleteAccountDto>({
    mutationFn: (data) => userInstance.deleteAccount(data),
    onSuccess: (res) => {
      if (res.success) {
        navigation.navigate('SuccessPage', {
          message: 'Your request to delete your account has been sent',
          title: 'Your request to delete your account has been sent',
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const reasons = [
    {
      index: 1,
      text: 'No Longer Using the Service',
    },
    {
      index: 2,
      text: 'Unfavorable Terms or High Fees',
    },
    {
      index: 3,
      text: 'Privacy and Data Concerns',
    },
    {
      index: 4,
      text: 'Poor User Experience or Technical Issues',
    },
  ];
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
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
          flex: 1,
        }}
      >
        <KeyboardAwareScrollView>
          <CText
            color={'black'}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
          >
            Request to Remove Account
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
            Please specify reason
          </CText>
          <Pressable
            onPress={() => {
              setShowReasonBottomSheet(true);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: size.getWidthSize(16),
              borderWidth: size.getHeightSize(1),
              paddingVertical: size.getHeightSize(16),
              borderRadius: size.getHeightSize(8),
              borderColor: colors.black('30'),
              paddingHorizontal: size.getWidthSize(16),
              marginTop: size.getHeightSize(24),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={14}
              lineHeight={18.6}
              fontFamily="semibold"
              style={{
                flex: 1,
              }}
            >
              {selectedReason.text ? selectedReason.text : 'Select'}
            </CText>
            <AntDesign
              name="caretdown"
              color={colors.black('30')}
              size={size.getHeightSize(16)}
            />
          </Pressable>
          <PTextInput
            onChangeText={(text) => {
              setDetails(text);
            }}
            fixedHeight
            height={120}
            multiline
            textAlignVertical="top"
            style={{
              height: size.getHeightSize(120),
              paddingVertical: size.getHeightSize(16),
            }}
            placeholder="Type here..."
            outerStyle={{
              marginTop: size.getHeightSize(16),
              paddingVertical: size.getHeightSize(16),
              height: size.getHeightSize(120),
            }}
          />
          <View
            style={{
              marginTop: size.getHeightSize(100),
            }}
          />
          <PrimaryButton
            isLoading={isPending}
            disabled={!details || !selectedReason.id}
            label="Send Request"
            onPress={() => {
              deleteAccount({
                description: details,
                reason: selectedReason.text,
              });
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <ReasonBotttomsheet
        reasons={reasons}
        onChangeText={(r) => {
          setSelectedReason({
            text: r.text,
            id: r.index,
          });
        }}
        selectedTextId={selectedReason.id}
        onClose={() => {
          setShowReasonBottomSheet(false);
        }}
        isVisible={reasonBottomSheetVisible}
      />
      <RequestErrorBottomsheet
        onClose={() => {
          reset();
        }}
        visibility={isError}
        onContinue={() => {}}
        errorDescription={error?.message || ''}
        errorMessage="You Cannot Delete Your Account"
      />
    </GradientSafeAreaView>
  );
};

export default Request;
const styles = StyleSheet.create({
  view1: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    backgroundColor: colors.white(),
    gap: size.getHeightSize(24),
    marginHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(16),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
  },
});
