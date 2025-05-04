import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import CautionIcon from '../../../assets/svgs/Savings/CautionIcon';
import { size } from '../../config/size';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import PrimaryButton from '../../shared/PrimaryButton';

interface Props {
  onClose: () => void;
  visibility: boolean;
  onContinue: () => void;
  errorMessage: string;
  errorDescription: string;
}
const RequestErrorBottomsheet = ({
  onClose,
  visibility,
  onContinue,
  errorDescription,
  errorMessage,
}: Props) => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor={colors.white()}
      visibility={visibility}
      onClose={() => {
        onClose();
      }}
    >
      <View
        style={{
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(4),
        }}
      >
        <CautionIcon
          style={{
            alignSelf: 'center',
          }}
          width={size.getWidthSize(274)}
          height={size.getHeightSize(206)}
        />
      </View>
      <CText
        color={'warning'}
        fontSize={24}
        lineHeight={30}
        fontFamily="bold"
        style={{
          textAlign: 'center',
        }}
      >
        {errorMessage}
      </CText>

      <CText
        color={'black'}
        fontSize={16}
        lineHeight={23}
        fontFamily="semibold"
        style={{
          textAlign: 'center',
          marginTop: size.getHeightSize(16),
        }}
      >
        {errorDescription}
      </CText>
      <View
        style={{
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(40),
        }}
      >
        <PrimaryButton label="Okay" onPress={onClose} />
      </View>
    </BottomsheetWrapper>
  );
};

export default RequestErrorBottomsheet;

const styles = StyleSheet.create({});
