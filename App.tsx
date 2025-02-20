import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainNavigator from './src/routes';
import { loadAppFonts } from './src/constants/fonts';
import WalletAccountDetails from './src/components/Dashboard/WalletAccountDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PayBills from './src/components/Dashboard/PayBills';
import BillTypes from './src/components/Dashboard/BillTypes';
import SchoolPreference from './src/components/Dashboard/SchoolPreference';
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
        <PayBills />
        <BillTypes />
        <SchoolPreference />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
