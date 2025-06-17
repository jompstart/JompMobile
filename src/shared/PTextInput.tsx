import {
  StyleSheet,
  Pressable,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import { TextStyle } from 'react-native';
import CText from './CText';
import Asterisks from '../../assets/svgs/Onboarding/Asterisks';
import { useAppDispatch } from '../controller/redux.controller';
import { updateToast } from '../features/ui/ui.slice';

interface CTextInputProps extends TextInputProps {
  style?: TextStyle;
  showWarning?: boolean;
  rightIcon?: ReactNode;
  title?: string;
  required?: boolean;
  outerStyle?: ViewStyle;
  isAmount?: boolean;
  fixedHeight?: boolean;
  height?: number;
  onPress?: () => void;
  maxAmount?: number; // Optional prop to limit the maximum amount
}
const PTextInput: React.FC<CTextInputProps> = ({
  style,
  showWarning,
  rightIcon,
  title,
  required,
  outerStyle,
  isAmount,
  fixedHeight = false,
  height,
  onPress,
  ...props
}) => {
  const [formattedValue, setFormattedValue] = useState<string>(
    isAmount && props.value
      ? formatAmount(String(props.value))
      : String(props.value ?? '')
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAmount && props.value !== undefined) {
      setFormattedValue(formatAmount(String(props.value)));
    }
  }, [props.value]);

  const handleAmountChange = (text: string) => {
    if (
      props.maxAmount &&
      parseFloat(text.replace(/[^0-9.]/g, '')) > props.maxAmount
    ) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: `Loan amount cannot be more than ₦${props.maxAmount.toLocaleString()}`,
          toastType: 'info',
        })
      );
      return;
    }
    const numericValue = text.replace(/[^0-9.]/g, ''); // Preserve the decimal point
    setFormattedValue(formatAmount(numericValue));
    props.onChangeText?.(numericValue); // Return raw numeric value to the parent
  };

  function formatAmount(value: string) {
    // Return an empty string if the input is empty
    if (!value) return '';

    // Remove all non-numeric characters except the decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    const [integerPart, decimalPart] = numericValue.split('.');

    // Format the integer part with commas
    const formattedInteger = parseInt(integerPart || '0', 10).toLocaleString();

    // Return the formatted value with the decimal part (if it exists)
    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  }
  return (
    <Pressable
      onPress={onPress}
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
          height: fixedHeight ? size.getHeightSize(height!) : undefined,
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
            height: fixedHeight ? size.getHeightSize(height!) : undefined,
          }}
        >
          <TextInput
            // numberOfLines={1}
            {...props}
            cursorColor={colors.primary()}
            placeholderTextColor={'#21212180'}
            value={
              isAmount
                ? formattedValue == '0'
                  ? ''
                  : formattedValue
                : props.value
            }
            onChangeText={isAmount ? handleAmountChange : props.onChangeText}
            keyboardType={isAmount ? 'numeric' : props.keyboardType}
            style={[
              styles.input,
              style,
              {
                color: style?.color ? style?.color : colors.black(),
                height: fixedHeight ? size.getHeightSize(height!) : undefined,
              },
            ]}
          />
          {rightIcon}
        </View>
      </View>
    </Pressable>
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
