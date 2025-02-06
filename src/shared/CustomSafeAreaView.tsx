import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
const CustomSafeArea: React.FC<{
  children: ReactNode;
  bottomSafeAreaInset?: boolean;
  statusBarColor?: string;
}> = ({ children, bottomSafeAreaInset, statusBarColor }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: statusBarColor ? statusBarColor : colors.white(),
        paddingTop: top,
        paddingBottom: bottomSafeAreaInset ? bottom : 0,
      }}
    >
      <StatusBar
        backgroundColor={statusBarColor ? statusBarColor : colors.white()}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white(),
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({});
