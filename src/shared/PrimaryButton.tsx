import {
  StyleSheet,
  Pressable,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { size } from '../config/size';
import CText from './CText';

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  label: string;
  style?: ViewStyle;
  opacity?: string;
  width?: string;
}
const PrimaryButton = ({
  onPress,
  disabled,
  label,
  style,
  opacity,
  width,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress?.()}
      style={[
        styles.pressable,
        style,
        {
          backgroundColor: disabled
            ? colors.disabled('20')
            : colors.primary(opacity),
        },
      ]}
    >
      <CText
        lineHeight={19.2}
        style={{ textAlign: 'center' }}
        fontSize={16}
        fontFamily="bold"
        color={opacity ? 'primaryColor' : 'white'}
      >
        {label}
      </CText>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: size.getHeightSize(13),
    borderRadius: size.getHeightSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
