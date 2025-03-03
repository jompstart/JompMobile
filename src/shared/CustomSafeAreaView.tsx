import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';
const CustomSafeArea: React.FC<{
  children: ReactNode;
  bottomSafeAreaInset?: boolean;
  statusBarColor?: string;
}> = ({ children, bottomSafeAreaInset, statusBarColor }) => {
  const { top, bottom } = useSafeAreaInsets();
  const backgroundColor = statusBarColor ? statusBarColor : colors.white();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: top,
        paddingBottom: bottomSafeAreaInset ? bottom : 0,
      }}
    >
      <StatusBar
        translucent={true}
        backgroundColor={backgroundColor}
        style="dark"
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
