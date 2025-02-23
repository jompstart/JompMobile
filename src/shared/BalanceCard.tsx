import { StyleSheet, ViewStyle, View } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import CText from './CText';
interface BalanceCardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}
const BalanceCard = ({ children, style }: BalanceCardProps) => {
  return (
    <View
      style={{
        backgroundColor: '#876DFF',
        paddingVertical: size.getHeightSize(16),
        borderRadius: size.getHeightSize(8),
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({});
