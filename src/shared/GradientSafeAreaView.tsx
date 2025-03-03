import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { size } from '../config/size';
const GradientSafeAreaView: React.FC<{
  children: ReactNode;
  bottomSafeAreaInset?: boolean;
  statusBarColor?: string;
}> = ({ children, bottomSafeAreaInset, statusBarColor }) => {
  const { top, bottom } = useSafeAreaInsets();
  const backgroundColor = statusBarColor ? statusBarColor : colors.white();
  return (
    <LinearGradient
      colors={['#EFA005', '#C5520A']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        backgroundColor: colors.appBackground(),
        paddingTop: top - size.getHeightSize(20),
        paddingBottom: bottomSafeAreaInset ? bottom : 0,
      }}
    >
      <StatusBar translucent={true} style="dark" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackground(),
        }}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

export default GradientSafeAreaView;

const styles = StyleSheet.create({});
