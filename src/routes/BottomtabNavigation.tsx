import { StyleSheet, Platform, View } from 'react-native';
import React, { ReactNode } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from '../shared/CText';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Dashboard from '../screens/homeTabs/Dashboard';
import Services from '../screens/homeTabs/Services';
import Transactions from '../screens/homeTabs/Transactions';
import Savings from '../screens/homeTabs/Savings';
import More from '../screens/homeTabs/More';
import HomeIcon from '../../assets/svgs/Home/HomeIcon';
import ServicesIcon from '../../assets/svgs/Home/ServicesIcon';
import TransactionsIcon from '../../assets/svgs/Home/TransactionsIcon';
import SavingsIcon from '../../assets/svgs/Home/SavingsIcon';
import MoreIcon from '../../assets/svgs/Home/MoreIcon';
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Main: undefined;
  Community: undefined;
  Space: undefined;
  Chats: undefined;
  UserProfile: undefined;
};

type BottomTabNavigationRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

const home = 'Home';
const services = 'Services';
const transactions = 'Transactions';
const savings = 'Savings';
const more = 'More';

const BottomtabNavigation = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={home}
      screenOptions={({ route }: any) => ({
        tabBarStyle: {
          borderWidth: 0,
          height:
            Platform.OS === 'ios'
              ? size.getHeightSize(72)
              : size.getHeightSize(64),
          backgroundColor: colors.white(),
          borderTopWidth: 0,
          paddingTop: size.getHeightSize(6),
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === home) {
            return (
              <CText
                style={{
                  marginTop: size.getHeightSize(6),
                }}
                fontFamily="semibold"
                fontSize={10}
                color="secondaryBlack"
                lineHeight={12.6}
              >
                {'Home'}
              </CText>
            );
          }
          if (route.name === services) {
            return (
              <CText
                style={{
                  marginTop: size.getHeightSize(6),
                }}
                fontFamily="semibold"
                fontSize={10}
                color="secondaryBlack"
                lineHeight={12.6}
              >
                {services}
              </CText>
            );
          }
          if (route.name === transactions) {
            return (
              <CText
                style={{
                  marginTop: size.getHeightSize(6),
                }}
                fontFamily="semibold"
                fontSize={10}
                color="secondaryBlack"
                lineHeight={12.6}
              >
                {transactions}
              </CText>
            );
          }
          if (route.name === savings) {
            return (
              <CText
                style={{
                  marginTop: size.getHeightSize(6),
                }}
                fontFamily="semibold"
                fontSize={10}
                color="secondaryBlack"
                lineHeight={12.6}
              >
                {savings}
              </CText>
            );
          }
          if (route.name === more) {
            return (
              <CText
                style={{
                  marginTop: size.getHeightSize(6),
                }}
                fontFamily="semibold"
                fontSize={10}
                color="secondaryBlack"
                lineHeight={12.6}
              >
                {more}
              </CText>
            );
          }
        },
        tabBarIcon: ({ focused }: any) => {
          let image: ReactNode;
          let routeName = route.name;
          if (routeName === home) {
            image =
              focused === true ? (
                <HomeIcon size={size.getHeightSize(24)} />
              ) : (
                <HomeIcon size={size.getHeightSize(24)} />
              );
          }
          if (routeName === services) {
            image =
              focused === true ? (
                <ServicesIcon size={size.getHeightSize(24)} />
              ) : (
                <ServicesIcon size={size.getHeightSize(24)} />
              );
          }
          if (routeName === transactions) {
            image =
              focused === true ? (
                <TransactionsIcon size={size.getHeightSize(24)} />
              ) : (
                <TransactionsIcon size={size.getHeightSize(24)} />
              );
          }
          if (routeName === savings) {
            image =
              focused === true ? (
                <SavingsIcon size={size.getHeightSize(24)} />
              ) : (
                <SavingsIcon size={size.getHeightSize(24)} />
              );
          }
          if (routeName === more) {
            image =
              focused === true ? (
                <MoreIcon size={size.getHeightSize(24)} />
              ) : (
                <MoreIcon size={size.getHeightSize(24)} />
              );
          }
          return image;
        },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={home}
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={services}
        component={Services}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={transactions}
        component={Transactions}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={savings}
        component={Savings}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={more}
        component={More}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomtabNavigation;

const styles = StyleSheet.create({});
