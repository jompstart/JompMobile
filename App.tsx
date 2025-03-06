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
import FilterBottomsheet from './src/components/Savings/FilterBottomsheet';
import { Provider } from 'react-redux';
import { store } from './src/app/redux.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator />
            <WalletAccountDetails />
            <PayBills />
            <BillTypes />
            <SchoolPreference />
            <FilterBottomsheet />
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
