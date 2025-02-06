import {StyleSheet, Platform, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {size} from '../config/size';
import {colors} from '../constants/colors';
import {TextStyle} from 'react-native';

interface CTextInputProps extends TextInputProps {
  style?: TextStyle;
  showWarning?: boolean;
}

const CTextInput: React.FC<CTextInputProps> = ({
  style,
  showWarning,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      cursorColor={'#F5F7FF'}
      placeholderTextColor={'#5A5A5A'}
      style={[
        styles.input,
        style,

        {
          paddingVertical:
            Platform.OS === 'ios'
              ? size.getHeightSize(17.5)
              : size.getHeightSize(17.5),
          color: style?.color ? style?.color : colors.white(),
        },
        showWarning && {borderColor: colors.warningColor(), borderWidth: 1},
      ]}
    />
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#2B2B2F',
    borderRadius: size.getHeightSize(26),
    // paddingVertical: size.getHeightSize(17.5),
    paddingHorizontal: size.getWidthSize(16),
    fontSize: size.fontSize(12),
    lineHeight: size.getHeightSize(15),
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
