import { View, Text } from "react-native";
import React from "react";
import GradientHeader from "../../shared/GradientHeader";
import MenuIcon from "../../../assets/svgs/Home/MenuIcon";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { size } from "../../config/size";
const HeaderWithMenu = () => {
  const { navigate, dispatch } = useNavigation();

  return (
    <GradientHeader>
      <MenuIcon
        onPress={() => {
          dispatch(DrawerActions.openDrawer());
        }}
        size={size.getHeightSize(28)}
      />
      <View style={{ flex: 1 }} />
      {/* <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} /> */}
    </GradientHeader>
  );
};

export default HeaderWithMenu;
