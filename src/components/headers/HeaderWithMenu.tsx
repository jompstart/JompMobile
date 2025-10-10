import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GradientHeader from "../../shared/GradientHeader";
import MenuIcon from "../../../assets/svgs/Home/MenuIcon";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";
import { size } from "../../config/size";
import NotificationBell from "../../../assets/svgs/Home/NotificationBell";
import { UserService } from "../../services/user";
import { useAppDispatch, useAppSelector } from "../../controller/redux.controller";
import { userSelector } from "../../features/user/user.selector";
import CText from "../../shared/CText";
import { updateCompliancePromptVisibility } from "../../features/ui/ui.slice";

interface HeaderWithMenuProps {
  showNotification?: boolean;
  disable?: boolean;
}

const HeaderWithMenu = ({ showNotification, disable }: HeaderWithMenuProps) => {
  const { navigate, dispatch } = useNavigation();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const user = useAppSelector(userSelector);
  const reduxDispatch = useAppDispatch();
  const userService = new UserService(user.customerId, user.userId);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const unreadResponse = await userService.getUnreadCount();
      const unreadCountData =
        unreadResponse.data !== undefined
          ? unreadResponse.data
          : unreadResponse;
      if (typeof unreadCountData.count === "number") {
        setUnreadCount(unreadCountData.count);
      } else {
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Error fetching unread count:", err);
      setUnreadCount(0);
    }
  }, [user.userId, user.customerId]);

  useEffect(() => {
    if (user.userId && user.customerId) {
      fetchUnreadCount();
    }
  }, [user.userId, user.customerId, fetchUnreadCount]);

  useFocusEffect(
    useCallback(() => {
      if (user.userId && user.customerId) {
        fetchUnreadCount();
      }
    }, [user.userId, user.customerId, fetchUnreadCount])
  );

  const handleNotificationPress = () => {
    if (user.complianceStatus === false) {
      // Prevent navigation and show compliance prompt
      reduxDispatch(updateCompliancePromptVisibility(true));
    } else {
      // Allow navigation only if complianceStatus is true
      navigate("Notification");
    }
  };

  return (
    <GradientHeader disable={disable}>
      <MenuIcon
        onPress={() => {
          dispatch(DrawerActions.openDrawer());
        }}
        size={size.getHeightSize(28)}
      />
      <View style={{ flex: 1 }} />
      {showNotification && (
        <Pressable
          onPress={handleNotificationPress}
          style={{ position: "relative" }}
        >
          <NotificationBell size={size.getHeightSize(28)} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <CText style={styles.badgeText}>{unreadCount}</CText>
            </View>
          )}
        </Pressable>
      )}
    </GradientHeader>
  );
};

export default HeaderWithMenu;

export const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -size.getHeightSize(4),
    right: -size.getWidthSize(4),
    backgroundColor: "#F44336",
    borderRadius: size.getWidthSize(10),
    minWidth: size.getWidthSize(20),
    height: size.getWidthSize(20),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: size.getWidthSize(4),
  },
  badgeText: {
    color: "white",
    fontSize: size.getHeightSize(12),
    fontFamily: "bold",
  },
});