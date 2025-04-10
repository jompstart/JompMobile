import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import PrimaryButton from '../../shared/PrimaryButton';
import { StackActions, useNavigation } from '@react-navigation/native';
import { size } from '../../config/size';
import { images } from '../../constants/images';
import { SuccessPageScreenProps } from '../../types/navigations.types';
const SuccessPage = ({ route: { params } }: SuccessPageScreenProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white(),
        paddingTop: top,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: size.getWidthSize(16),
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: size.getHeightSize(16),
          alignItems: 'center',
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
        <CText
          fontSize={24}
          lineHeight={30}
          style={{
            textAlign: 'center',
          }}
          fontFamily="semibold"
        >
          Congratulations!
        </CText>
        <CText
          style={{
            textAlign: 'center',
          }}
          fontSize={16}
          lineHeight={22}
          fontFamily="regular"
        >
          {params?.message ||
            'You have successfully submitted your service form, Jomp Admin will verify and approve'}
        </CText>
      </View>
      <PrimaryButton
        label="Go to Dashboard"
        onPress={() => {
          navigation.dispatch(StackActions.replace('BottomtabNavigation'));
        }}
        style={{
          marginBottom: size.getHeightSize(32),
          width: '100%',
        }}
      />
    </View>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({});
