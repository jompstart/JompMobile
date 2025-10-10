import { StyleSheet, View, Pressable, Alert } from 'react-native';
import React from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import SecondaryButton from '../../shared/SecondaryButton';
import PrimaryButton from '../../shared/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { updateCompliancePromptVisibility } from '../../features/ui/ui.slice';
import { complianceModalSelector } from '../../features/ui/ui.selector';
const CompliancePromptModal = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(complianceModalSelector);
  const navigation = useNavigation();
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      disableBackdropPress
      enablePanDownToClose={false}
      visibility={isVisible}
      onClose={() => {
        dispatch(updateCompliancePromptVisibility(false));
      }}
    >
      <View
        style={{
          marginTop: size.getHeightSize(16),
          gap: size.getHeightSize(40),
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(8),
          }}
        >
          <CText
            color="black"
            fontSize={16}
            lineHeight={19.6}
            fontFamily="bold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            You need to complete your compliance to continue using the app
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={16}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              textAlign: 'center',
            }}
          >
            This helps us verify your identity
          </CText>
        </View>
        <PrimaryButton
          onPress={() => {
            navigation.navigate('VerifyBvn');
            dispatch(updateCompliancePromptVisibility(false));
          }}
          label="Continue"
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default CompliancePromptModal;

const styles = StyleSheet.create({});
