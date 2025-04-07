import {
  StyleSheet,
  Pressable,
  View,
  ViewProps,
  ViewStyle,
  ActivityIndicator,
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
  isLoading?: boolean;
}
const SecondaryButton = ({
  onPress,
  disabled,
  label,
  style,
  opacity,
  width,
  isLoading,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress?.()}
      style={[
        styles.pressable,
        style,
        {
          backgroundColor: colors.white(opacity),
          borderColor: colors.primary(),
          borderWidth: size.getHeightSize(1),
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size={size.getHeightSize(24)}
          color={colors.primary()}
        />
      ) : (
        <CText
          lineHeight={19.2}
          style={{ textAlign: 'center' }}
          fontSize={16}
          fontFamily="bold"
          color={'primaryColor'}
        >
          {label}
        </CText>
      )}
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: size.getWidthSize(12),
  },
});
