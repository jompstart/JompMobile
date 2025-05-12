import { StyleSheet, Text, View } from 'react-native';
import DrawerComponent from '../components/Dashboard/Drawer';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { size } from '../config/size';
import ChildPayment from '../screens/services/ChildPayment';
import HouseRentService from '../screens/services/HouseRentService';
import TransportForm from '../components/Service/Transitions/TransportForm';
import Savings from '../screens/homeTabs/Savings';
import BottomtabNavigation from './BottomtabNavigation';
const NavigationDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: size.getWidthSize(300),
        },
        swipeEnabled: true,
      }}
      drawerContent={(props) => {
        return <DrawerComponent props={props} />;
        // if (
        //   memoizedCurrentTab === 'Main' ||
        //   memoizedCurrentTab === 'UserProfile'
        // ) {
        //   return <FeedDrawerContent {...props} />;
        // } else if (memoizedCurrentTab === 'Community') {
        //   return <CommunityDrawerContent {...props} />;
        // }
      }}
    >
      <Drawer.Screen name="HomePage" component={BottomtabNavigation} />
      {/* <Drawer.Screen name="HouseRent" component={HouseRentService} />
      <Drawer.Screen name="Transport" component={TransportForm} />
      <Drawer.Screen name="Savings" component={Savings} /> */}
      {/* <Drawer.Screen name="Transactions" component={Support} />
      <Drawer.Screen
        name="TowneSquarePurpleScreen"
        component={TowneSquarePurpleScreen}
      />
      <Drawer.Screen
        name="CommunityInfoScreen"
        component={CommunityInfoScreen}
      />
      <Drawer.Screen name="ChannelChat" component={ChannelChat} /> */}
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;

const styles = StyleSheet.create({});
