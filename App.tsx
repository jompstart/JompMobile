import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import MainNavigator from './src/routes';
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  </View>
);

const DetailsScreen = () => (
  <View>
    <Text>Details Screen</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
