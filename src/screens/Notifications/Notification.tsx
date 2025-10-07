import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { NotificationScreenProps } from "../../types/navigations.types";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CText from "../../shared/CText";
import { UserService } from "../../services/user";
import { NotificationDto, API_RESPONSE } from "../../services/dto/user.dto";
import { useAppSelector } from "../../controller/redux.controller";
import { userSelector } from "../../features/user/user.selector";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";
import { notificationStyles as styles } from "./notif.style";
import { colors } from "../../constants/colors";

// Interfaces
export interface NotificationItemData {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  time: string;
  type: "default" | "success" | "warning" | "error" | "info";
  hasRedDot: boolean;
  body?: string;
  serviceType?: string;
}

interface NotificationItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  time: string;
  type: "default" | "success" | "warning" | "error" | "info";
  hasRedDot: boolean;
  onPress: () => void;
}

// NotificationItem component
const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  title,
  time,
  type = "default",
  hasRedDot = false,
  onPress,
}) => {
  const getIconColor = (): string => {
    switch (type) {
      case "success":
      case "warning":
      case "error":
      case "info":
      case "default":
        return "#FF9800";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: hasRedDot ? "white" : colors.appBackground(),
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.notificationContent}>
        <View
          style={[styles.iconContainer, { backgroundColor: getIconColor() }]}
        >
          <MaterialIcons name={icon} size={18} color="white" />
        </View>
        <View style={styles.textContainer}>
          <CText
            fontSize={16}
            fontFamily="semibold"
            color="black"
            style={styles.notificationTitle}
            numberOfLines={1}
          >
            {title}
          </CText>
          <CText fontSize={12} color="#8E8E93" style={styles.notificationTime}>
            {time}
          </CText>
        </View>
        <View style={styles.rightSection}>
          {hasRedDot && <View style={styles.redDot} />}
          <TouchableOpacity style={styles.viewButton} onPress={onPress}>
            <CText
              fontSize={14}
              fontFamily="semibold"
              color="#FF9800"
              style={styles.viewText}
            >
              View
            </CText>
            <MaterialIcons name="chevron-right" size={16} color="#FF9800" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Notification: React.FC<NotificationScreenProps> = ({
  route: { params },
  navigation,
}) => {
  const user = useAppSelector(userSelector);
  const [notificationList, setNotificationList] = useState<
    NotificationItemData[]
  >([]);
  const [deletingNotificationId, setDeletingNotificationId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const userService = new UserService(user.customerId ?? "", user.userId ?? "");

  // 🔹 Maps notification serviceType to a MaterialIcons icon
  const mapNotificationTypeToIcon = (
    serviceType: string
  ): keyof typeof MaterialIcons.glyphMap => {
    switch (serviceType.toLowerCase()) {
      case "payment":
        return "payment";
      case "order":
        return "shopping-cart";
      case "message":
        return "message";
      case "warning":
        return "warning";
      case "success":
        return "check-circle";
      case "error":
        return "error";
      default:
        return "notifications"; // fallback icon
    }
  };

  // 🔹 Maps serviceType to a type (affects styling/colour)
  const mapServiceTypeToType = (
    serviceType: string
  ): "default" | "success" | "warning" | "error" | "info" => {
    switch (serviceType.toLowerCase()) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  // 🔹 Reusable error handler for marking notifications
  const handleMarkNotificationError = (
    err: any,
    notification: NotificationItemData
  ) => {
    if (err.message?.includes("Notification not found")) {
      setNotificationList((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } else {
      setError("Failed to mark notification as read");
    }
  };

  // Fetch notifications and unread count
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user.userId || !user.customerId) {
        setError("User information not available");
        return;
      }

      try {
        setLoading(true);

        const response = await userService.getUserNotifications();
        const notificationsData =
          (response as API_RESPONSE<NotificationDto[]>).data ?? response;

        console.log(notificationsData);
        if (Array.isArray(notificationsData)) {
          const mappedNotifications: NotificationItemData[] =
            notificationsData.map((notification: NotificationDto) => ({
              id: notification.id,
              serviceId: notification.serviceId,
              icon: mapNotificationTypeToIcon(
                notification.serviceType ?? "default"
              ),
              title: notification.title,
              time: new Date(notification.createAt).toLocaleString(),
              type: mapServiceTypeToType(notification.serviceType ?? "default"),
              hasRedDot: !notification.isRead,
              body: notification.body,
              serviceType: notification.serviceType,
            }));
          setNotificationList(mappedNotifications);
        } else {
          setError("No notifications found");
        }

        const unreadResponse = await userService.getUnreadCount();
        const unreadCountData =
          (unreadResponse as API_RESPONSE<{ count: number }>).data ??
          unreadResponse;

        if (typeof unreadCountData.count === "number") {
          setUnreadCount(unreadCountData.count);
        } else {
          setUnreadCount(0);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user.userId, user.customerId]);

  // Handle notification press
  const handleNotificationPress = async (
    notification: NotificationItemData
  ) => {
    navigation.navigate("NotificationDetails", { notification });

    if (!notification.hasRedDot || deletingNotificationId === notification.id)
      return;

    try {
      const response = await userService.markNotificationRead(notification.id);
      const message =
        (response as API_RESPONSE<{ message: string }>).data?.message ??
        response.message;

      if (message === "Notification marked as read.") {
        setNotificationList((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, hasRedDot: false } : n
          )
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      } else {
        setError("Failed to mark notification as read");
      }
    } catch (err: any) {
      handleMarkNotificationError(err, notification);
    }
  };

  // Handle clear all notifications
  const handleClearAllNotifications = async () => {
    const currentNotifications = notificationList;
    const currentUnreadCount = unreadCount;

    setNotificationList([]);
    setUnreadCount(0);
    setDeletingNotificationId("all");

    try {
      const response = await userService.deleteAllNotifications();
      const message =
        (response as API_RESPONSE<{ message: string }>).data?.message ??
        response.message;

      if (
        message === "All user notifications deleted." ||
        response.success ||
        response.statusCode === 200
      ) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "All notifications cleared successfully",
        });
      } else {
        throw new Error(`Unexpected response: ${message}`);
      }
    } catch (err: any) {
      setNotificationList(currentNotifications);
      setUnreadCount(currentUnreadCount);
      setDeletingNotificationId(null);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "Failed to clear notifications",
      });
    } finally {
      setDeletingNotificationId(null);
    }
  };

  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon
        title={`Notification${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
      />

      {error && (
        <View style={styles.errorContainer}>
          <CText fontSize={14} color="#F44336">
            {error}
          </CText>
        </View>
      )}

      {/* if params exist show details */}
      {params ? (
        <></>
      ) : (
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <CText fontSize={20} fontFamily="bold">
              Notifications
            </CText>
            {loading && <CText fontSize={14}>Loading...</CText>}
          </View>

          {notificationList.length === 0 && !loading ? (
            <View style={styles.noNotificationsContainer}>
              <MaterialIcons
                name="notifications-none"
                size={64}
                color="#8E8E93"
              />
              <CText fontSize={16} fontFamily="semibold" color="#8E8E93">
                You have no recent notifications
              </CText>
            </View>
          ) : (
            <>
              <ScrollView style={styles.notificationsList}>
                {notificationList.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    icon={notification.icon}
                    title={notification.title}
                    time={notification.time}
                    type={notification.type}
                    hasRedDot={notification.hasRedDot}
                    onPress={() => handleNotificationPress(notification)}
                  />
                ))}
              </ScrollView>

              {notificationList.length > 0 && (
                <TouchableOpacity
                  style={styles.clearAllButton}
                  onPress={handleClearAllNotifications}
                  disabled={deletingNotificationId === "all"}
                >
                  <CText
                    fontSize={16}
                    fontFamily="semibold"
                    color={
                      deletingNotificationId === "all" ? "#ccc" : "#F44336"
                    }
                  >
                    {deletingNotificationId === "all"
                      ? "Clearing..."
                      : "Clear All Notifications"}
                  </CText>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
    </GradientSafeAreaView>
  );
};

export default Notification;
