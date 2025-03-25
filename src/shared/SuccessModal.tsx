import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import BottomsheetWrapper from './BottomsheetWrapper';
import { size } from '../config/size';
import CText from './CText';
import PrimaryButton from './PrimaryButton';
import { useAppSelector, useAppDispatch } from '../controller/redux.controller';
import { RootStackParamList } from '../types/navigations.types';
import { updateSuccessModalVisibility } from '../features/ui/ui.slice';
import { images } from '../constants/images';
interface Props {
  onContinue?: () => void;
  title: string;
  description: string;
  buttonText: string;
  visibility: boolean;
  onClose: () => void;
}
const SuccessModal = ({
  onContinue,
  title,
  description,
  buttonText,
  visibility,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={visibility}
      onClose={() => {
        onClose();
      }}
    >
      <View>
        <View
          style={{
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              height: size.getHeightSize(200),
              width: size.getWidthSize(200),
            }}
          >
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
              source={images.succesGif}
            />
          </View>
        </View>
        <CText
          fontFamily="bold"
          fontSize={24}
          lineHeight={38}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          {title}
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
          {description}
        </CText>

        <PrimaryButton
          onPress={() => {
            onContinue?.();
            dispatch(
              updateSuccessModalVisibility({
                isVisble: false,
                title: '',
                description: '',
                buttonText: '',
              })
            );
          }}
          style={{
            marginTop: size.getHeightSize(32),
            paddingVertical: size.getHeightSize(15.5),
          }}
          label={buttonText}
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({});
