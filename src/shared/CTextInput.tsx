import {
  StyleSheet,
  Platform,
  View,
  TextInput,
  TextInputProps,
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
}

const CTextInput: React.FC<CTextInputProps> = ({
  style,
  showWarning,
  rightIcon,
  title,
  required,
  ...props
}) => {
  return (
    <View
      style={{
        gap: size.getHeightSize(8),
      }}
    >
      {title && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(10),
          }}
        >
          <CText
            fontSize={14}
            lineHeight={19.6}
            style={{
              letterSpacing: size.getWidthSize(0.2),
            }}
            fontFamily="semibold"
            color="secondaryBlack"
          >
            {title}
          </CText>
          {required && <Asterisks size={size.getHeightSize(12)} />}
        </View>
      )}
      <View
        style={{
          borderColor: style?.borderColor ? style.borderColor : '#21212130',
          borderWidth: size.getHeightSize(1),
          backgroundColor: style?.backgroundColor
            ? style.backgroundColor
            : colors.white(),
          borderRadius: size.getHeightSize(8),
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <TextInput
          numberOfLines={1}
          {...props}
          cursorColor={'#F5F7FF'}
          placeholderTextColor={'#61616150'}
          style={[
            styles.input,

            {
              ...style,
              backgroundColor: undefined,
              paddingVertical:
                Platform.OS === 'ios'
                  ? size.getHeightSize(14.5)
                  : size.getHeightSize(10.5),
              color: style?.color ? style?.color : colors.black(),
            },
            // showWarning && {borderColor: colors.warningColor(), borderWidth: 1},
          ]}
        />
        {rightIcon}
      </View>
    </View>
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(16),
    // lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});
