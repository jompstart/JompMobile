import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { ReactNode, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "../config/size";
import { colors } from "../constants/colors";
import CText from "../shared/CText";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import Dashboard from "../screens/homeTabs/Dashboard";
import Transactions from "../screens/homeTabs/Transactions";
import Savings from "../screens/homeTabs/Savings";
import HomeIcon from "../../assets/svgs/Home/HomeIcon";
import ServicesIcon from "../../assets/svgs/Home/ServicesIcon";
import TransactionsIcon from "../../assets/svgs/Home/TransactionsIcon";
import SavingsIcon from "../../assets/svgs/Home/SavingsIcon";
import MoreIcon from "../../assets/svgs/Home/MoreIcon";
import { useAppDispatch, useAppSelector } from "../controller/redux.controller";
import {
  updateAccountDetailsBottomsheetVisibility,
  updateCompliancePromptVisibility,
} from "../features/ui/ui.slice";
import { accountDetailsBottomsheetSelector } from "../features/ui/ui.selector";
import ServiceScreen from "../screens/services/servicehistory/ServiceScreen";
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

// interface CustomTabBarButtonProps {
//   children?: React.ReactNode;
//   onPress?: () => void;
//   style?: ViewStyle;
// }

const CustomTabBarButton: React.FC<any> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const home = "Home";
const services = "Services";
const transactions = "Transactions";
const savings = "Savings";
const more = "More";

const BottomtabNavigation = () => {
  const user = useAppSelector((state) => state.user);
  const accountDetailsBottomsheet = useAppSelector(
    accountDetailsBottomsheetSelector
  );
  const navState = useNavigationState((state) => state);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Show compliance prompt if complianceStatus is false
  useEffect(() => {
    if (user.userId && user.complianceStatus === false) {
      dispatch(updateCompliancePromptVisibility(true));
    }
  }, [user, dispatch]);

  // Handle back press to prevent bypassing compliance check
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (user.complianceStatus === false) {
          // Prevent back navigation and show compliance prompt
          dispatch(updateCompliancePromptVisibility(true));
          return true;
        }
        if (accountDetailsBottomsheet.isVisible) {
          dispatch(updateAccountDetailsBottomsheetVisibility(false));
          return true;
        }
        if (navState?.routes?.[navState.index].state?.index !== 0) {
          navigation.navigate("NavigationDrawer", {
            screen: "HomePage",
            params: {
              screen: "Home",
            },
          } as any);
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => backHandler.remove();
    }, [accountDetailsBottomsheet, navigation, dispatch, user.complianceStatus])
  );

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderWidth: 0,
          height:
            Platform.OS === "ios"
              ? size.getHeightSize(72)
              : size.getHeightSize(64),
          backgroundColor: colors.white(),
          borderTopWidth: 0,
          paddingTop: size.getHeightSize(6),
        },
        tabBarButton: (props) => (
          <CustomTabBarButton
            {...props}
            onPress={
              user.complianceStatus === false
                ? () => {
                    // Prevent navigation and show compliance prompt
                    dispatch(updateCompliancePromptVisibility(true));
                  }
                : props.onPress // Allow navigation only if complianceStatus is true
            }
          />
        ),
        tabBarLabel: ({ focused }) => {
          if (route.name === home) {
            return (
              <CText
                style={{ marginTop: size.getHeightSize(6) }}
                fontFamily="semibold"
                fontSize={10}
                color={focused ? "primaryColor" : "secondaryBlack"}
                lineHeight={12.6}
              >
                {"Home"}
              </CText>
            );
          }
          if (route.name === services) {
            return (
              <CText
                style={{ marginTop: size.getHeightSize(6) }}
                fontFamily="semibold"
                fontSize={10}
                color={focused ? "primaryColor" : "secondaryBlack"}
                lineHeight={12.6}
              >
                {services}
              </CText>
            );
          }
          if (route.name === transactions) {
            return (
              <CText
                style={{ marginTop: size.getHeightSize(6) }}
                fontFamily="semibold"
                fontSize={10}
                color={focused ? "primaryColor" : "secondaryBlack"}
                lineHeight={12.6}
              >
                {transactions}
              </CText>
            );
          }
          if (route.name === savings) {
            return (
              <CText
                style={{ marginTop: size.getHeightSize(6) }}
                fontFamily="semibold"
                fontSize={10}
                color={focused ? "primaryColor" : "secondaryBlack"}
                lineHeight={12.6}
              >
                {savings}
              </CText>
            );
          }
          if (route.name === more) {
            return (
              <CText
                style={{ marginTop: size.getHeightSize(6) }}
                fontFamily="semibold"
                fontSize={10}
                color={focused ? "primaryColor" : "secondaryBlack"}
                lineHeight={12.6}
              >
                {more}
              </CText>
            );
          }
        },
        tabBarIcon: ({ focused }) => {
          let image: ReactNode;
          const routeName = route.name;
          if (routeName === home) {
            image = focused ? (
              <HomeIcon isFocused size={size.getHeightSize(24)} />
            ) : (
              <HomeIcon size={size.getHeightSize(24)} />
            );
          }
          if (routeName === services) {
            image = focused ? (
              <ServicesIcon isFocused size={size.getHeightSize(24)} />
            ) : (
              <ServicesIcon size={size.getHeightSize(24)} />
            );
          }
          if (routeName === transactions) {
            image = focused ? (
              <TransactionsIcon isFocused size={size.getHeightSize(24)} />
            ) : (
              <TransactionsIcon size={size.getHeightSize(24)} />
            );
          }
          if (routeName === savings) {
            image = focused ? (
              <SavingsIcon isFocused size={size.getHeightSize(24)} />
            ) : (
              <SavingsIcon size={size.getHeightSize(24)} />
            );
          }
          if (routeName === more) {
            image = focused ? (
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
        component={ServiceScreen}
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
