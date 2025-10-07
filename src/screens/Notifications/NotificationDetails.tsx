import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CText from "../../shared/CText";
import { notificationStyles as styles } from "./notif.style";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserService } from "../../services/user";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../controller/redux.controller";
import { userSelector } from "../../features/user/user.selector";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";
import { colors } from "../../constants/colors";

interface Notification {
  id: string;
  title: string;
  body?: string;
  time: number;
  serviceType?: string;
  serviceId?: string;
  read?: boolean;
}

type RouteParams = {
  notification: Notification;
};

const NotificationDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { notification } = route.params as RouteParams;

  const user = useAppSelector(userSelector);
  const userService = new UserService(user.customerId ?? "", user.userId ?? "");

  const [deletingNotificationId, setDeletingNotificationId] = useState<
    string | null
  >(null);
  const [markingReadId, setMarkingReadId] = useState<string | null>(null);

  const handleDeleteNotification = async (notificationId: string) => {
    setDeletingNotificationId(notificationId);

    try {
      const response = await userService.deleteNotification(notificationId);
      const message = (response as any)?.data?.message ?? response.message;

      if (message === "Notification deleted." || response.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Deleted",
          text2: "Notification deleted successfully",
        });
        navigation.goBack();
      } else {
        throw new Error(`Unexpected response: ${message}`);
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "Failed to delete notification",
      });
    } finally {
      setDeletingNotificationId(null);
    }
  };

  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon title="Notification Details" />

      <View style={[styles.content, { padding: 10 }]}>
        {/* Title + Badge */}
        <View
          style={[
            styles.detailHeader,
            { justifyContent: "space-between", marginBottom: 12 },
          ]}
        >
          <CText fontSize={18} fontFamily="bold" color="black">
            {notification.title}
          </CText>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              marginRight: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleDeleteNotification(notification.id)}
            disabled={deletingNotificationId === notification.id}
          >
            <MaterialIcons name="delete" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View
          style={{
            backgroundColor: "#f9f9f9",
            padding: 12,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <CText fontSize={15} color="secondaryBlack" lineHeight={22}>
            {notification.body || "No message body provided"}
          </CText>
        </View>

        {/* Service Info */}
        {notification.serviceType && (
          <View style={[styles.cardRow, { marginBottom: 16 }]}>
            <CText fontSize={14} color="secondaryBlack">
              Service Type:
            </CText>
            <CText fontSize={14} fontFamily="semibold" color="black">
              {notification.serviceType}
            </CText>
          </View>
        )}

        {notification.title.toLowerCase() == "loan breakdown available" && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primarySuccess(),
              height: 50,
              borderRadius: 8,

              marginRight: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("LoanBreakdown", {
                id: notification.serviceId,
                notification: notification,
              } as never)
            }
            disabled={deletingNotificationId === notification.id}
          >
            <CText
              fontSize={14}
              fontFamily="semibold"
              color="white"
              style={{ marginLeft: 6 }}
            >
              See Loan Breakdown
            </CText>
          </TouchableOpacity>
        )}
      </View>
    </GradientSafeAreaView>
  );
};

export default NotificationDetails;
