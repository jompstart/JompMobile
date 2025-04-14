import { Text, TextProps } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';

// Define the props interface
interface CTextProps extends TextProps {
  fontFamily?: keyof typeof fontFamilyMap;
  color?: keyof typeof fontColorMap;
  fontSize?: number;
  lineHeight?: number;
  obscureText?: boolean;
}

// Map font family names to actual font files
const fontFamilyMap = {
  regular: 'AvenirLTStd-Roman',
  medium: 'AvenirLTStd-Medium',
  bold: 'AvenirLTStd-Heavy',
  semibold: 'AvenirLTStd-Medium',
};

// Map color names to actual color codes
export const fontColorMap = {
  black: '#212121',
  secondaryBlack: '#616161',
  warning: '#F75555',
  success: '#2ECC71',
  white: '#FFFFFF',
  secondary: '#00008B',
  black2: '#303030',
  primaryColor: '#EFA005',
  aappBackground: '#F9F8FF',
  blue: '#175CD3',
  black3: '#475467',
};

const CText: React.FC<CTextProps> = ({
  fontFamily,
  color,
  style,
  children,
  lineHeight,
  fontSize,
  obscureText,
  ...props
}) => {
  const fontFamilyStyle = fontFamily
    ? { fontFamily: fontFamilyMap[fontFamily] }
    : { fontFamily: fontFamilyMap.regular };

  const fontSizeStyle = fontSize
    ? { fontSize: size.fontSize(fontSize) }
    : { fontSize: size.fontSize(16) };
  const lineHeightStyle = lineHeight
    ? { lineHeight: size.getHeightSize(lineHeight) }
    : { lineHeight: size.getHeightSize(24) };
  const colorStyle = color
    ? {
        color:
          color in fontColorMap
            ? fontColorMap[color as keyof typeof fontColorMap]
            : color,
      }
    : { color: fontColorMap.black };

  return (
    <Text
      {...props}
      style={[
        fontFamilyStyle,
        colorStyle,
        style,
        fontSizeStyle,
        lineHeightStyle,
      ]}
    >
      {obscureText ? '******' : children}
    </Text>
  );
};

export default CText;
