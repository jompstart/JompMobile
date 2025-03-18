import {
  StyleSheet,
  Platform,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import { TextStyle } from 'react-native';
import CText from './CText';
import Asterisks from '../../assets/svgs/Onboarding/Asterisks';

interface CTextInputProps extends TextInputProps {
  style?: TextStyle;
  showWarning?: boolean;
  rightIcon?: ReactNode;
  title?: string;
  required?: boolean;
  outerStyle?: ViewStyle;
}
const PTextInput: React.FC<CTextInputProps> = ({
  style,
  showWarning,
  rightIcon,
  title,
  required,
  outerStyle,
  ...props
}) => {
  return (
    <View
      style={{
        gap: size.getHeightSize(8),
        ...outerStyle,
      }}
    >
      <View
        style={{
          borderColor: '#21212130',
          borderWidth: size.getHeightSize(1),
          backgroundColor: colors.white(),
          borderRadius: size.getHeightSize(8),
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(8),
          minHeight: size.getHeightSize(52),
          justifyContent: 'center',
        }}
      >
        {props.value && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: size.getWidthSize(10),
            }}
          >
            <CText
              fontSize={11}
              lineHeight={15.4}
              style={{
                letterSpacing: size.getWidthSize(0.2),
              }}
              fontFamily="semibold"
              color={colors.black('50') as any}
            >
              {props.placeholder}
            </CText>
            {required && <Asterisks size={size.getHeightSize(12)} />}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <TextInput
            numberOfLines={1}
            {...props}
            cursorColor={'#F5F7FF'}
            placeholderTextColor={'#21212180'}
            style={[
              styles.input,
              style,

              {
                color: style?.color ? style?.color : colors.black(),
              },
              // showWarning && {borderColor: colors.warningColor(), borderWidth: 1},
            ]}
          />
          {rightIcon}
        </View>
      </View>
    </View>
  );
};

export default PTextInput;

const styles = StyleSheet.create({
  input: {
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(14),
    // lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});
