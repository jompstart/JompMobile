import {StyleSheet, Pressable, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {size} from '../config/size';
import CText from './CText';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
interface Props {
  onPress?: () => void;
  disabled?: boolean;
  label: string;
  style?: ViewStyle;
}
const PrimaryButton = ({onPress, disabled, label, style}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress?.()}
      style={[styles.pressable, style]}>
      <CText
        lineHeight={22.4}
        style={{textAlign: 'center'}}
        fontSize={13}
        fontFamily="bold"
        color="primaryButtonTextColor">
        {label}
      </CText>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: size.getHeightSize(12),
    borderRadius: size.getHeightSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white(),
    width: '100%',
  },
});
