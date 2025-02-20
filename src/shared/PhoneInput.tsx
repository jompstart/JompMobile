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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
interface CTextInputProps extends TextInputProps {
  style?: TextStyle;
  showWarning?: boolean;
  rightIcon?: ReactNode;
  title?: string;
  required?: boolean;
}
const PhoneInput: React.FC<CTextInputProps> = ({
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
        borderColor: '#21212130',
        borderWidth: size.getHeightSize(1),
        backgroundColor: colors.white(),
        borderRadius: size.getHeightSize(8),
        paddingRight: size.getWidthSize(16),
        minHeight: size.getHeightSize(52),
        flexDirection: 'row',
        alignItems: 'center',
        gap: size.getWidthSize(8),
        // maxHeight: size.getHeightSize(52),
      }}
    >
      <View
        style={{
          backgroundColor: '#FFFAF1',
          paddingLeft: size.getWidthSize(15),
          paddingRight: size.getWidthSize(6),
          minHeight: size.getHeightSize(52),
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: size.getHeightSize(8),
          borderBottomLeftRadius: size.getHeightSize(8),
          marginRight: size.getWidthSize(22),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(6),
          }}
        >
          <CText>234</CText>
          <MaterialIcons
            name="arrow-drop-down"
            size={size.getHeightSize(24)}
            color={colors.primary()}
          />
        </View>
      </View>
      <View
        style={{
          paddingVertical: size.getHeightSize(8),
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
              fontSize={11}
              lineHeight={15.4}
              style={{
                letterSpacing: size.getWidthSize(0.2),
              }}
              fontFamily="semibold"
              color={colors.black('50') as any}
            >
              {title}
            </CText>
            {required && <Asterisks size={size.getHeightSize(12)} />}
          </View>
        )}
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
      </View>

      {rightIcon}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  input: {
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(14),
    // lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});
