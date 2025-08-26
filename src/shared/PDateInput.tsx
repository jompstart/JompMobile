import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PTextInput from './PTextInput';
import CText from './CText';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import { useAppDispatch } from '../controller/redux.controller';
import { updateToast } from '../features/ui/ui.slice';

interface PDateInputProps {
  placeholder: string;
  value?: string;
  onChangeText: (value: string) => void;
  outerStyle?: object;
  disabled?: boolean;
  maxValue?: number;
  minValue?: number;
  fieldName: string;
  error?: string;
  required?: boolean;
}

const PDateInput: React.FC<PDateInputProps> = ({
  placeholder,
  value,
  onChangeText,
  outerStyle,
  disabled = false,
  maxValue,
  minValue = 0,
  fieldName,
  error,
  required = false,
}) => {
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Validate current value
  const isValidValue = useMemo(() => {
    if (!value || !hasInteracted) return true;
    
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return false;
    
    if (maxValue && (numericValue < minValue || numericValue > maxValue)) {
      return false;
    }
    
    return true;
  }, [value, maxValue, minValue, hasInteracted]);

  const showError = useMemo(() => {
    if (error) return error;
    if (!isValidValue && hasInteracted) {
      if (maxValue) {
        return `${fieldName} must be between ${minValue} and ${maxValue}`;
      }
      return `${fieldName} must be a valid number`;
    }
    if (required && !value && hasInteracted) {
      return `${fieldName} is required`;
    }
    return null;
  }, [error, isValidValue, hasInteracted, fieldName, maxValue, minValue, required, value]);

  const handleTextChange = useCallback((text: string) => {
    setHasInteracted(true);
    
    // Allow empty input
    if (text === '') {
      onChangeText('');
      return;
    }

    // Remove non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, '');

    if (cleanedText === '') {
      onChangeText('');
      return;
    }

    const numericValue = parseInt(cleanedText, 10);

    // Check if value is within min/max bounds before updating
    if (maxValue !== undefined && numericValue > maxValue) {
      onChangeText(maxValue.toString());
      return;
    }
    if (numericValue < minValue) {
      onChangeText(minValue.toString());
      return;
    }

    onChangeText(numericValue.toString());
  }, [onChangeText, maxValue, minValue]);

  // Show toast for validation errors
  useEffect(() => {
    if (showError && hasInteracted) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: showError,
          toastType: 'info',
        })
      );
    }
  }, [showError, hasInteracted, dispatch]);

  return (
    <View style={outerStyle}>
      <PTextInput
        placeholder={`${placeholder}${required ? ' *' : ''}`}
        value={value}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        editable={!disabled}
      />
      {showError && hasInteracted && (
        <CText
          fontSize={size.getHeightSize(12)}
          style={styles.errorText}
        >
          {showError}
        </CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: size.getHeightSize(4),
    marginLeft: size.getWidthSize(8),
  },
});

export default PDateInput;