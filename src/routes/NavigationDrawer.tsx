import { StyleSheet, Text, View } from "react-native";
import DrawerComponent from "../components/Dashboard/Drawer";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { size } from "../config/size";
import BottomtabNavigation from "./BottomtabNavigation";
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
      }}
    >
      <Drawer.Screen name="HomePage" component={BottomtabNavigation} />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;

const styles = StyleSheet.create({});
