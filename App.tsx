import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import MainNavigator from './src/routes';
import { loadAppFonts } from './src/constants/fonts';
import WalletAccountDetails from './src/components/Dashboard/WalletAccountDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load the fonts
  const loadFonts = async () => {
    await loadAppFonts();
    setFontsLoaded(true);
  };

  // Load the fonts on app mount
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <NavigationContainer>
        <MainNavigator />
        <WalletAccountDetails />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
