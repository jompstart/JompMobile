import {
  StyleSheet,
  RefreshControl,
  FlatList,
  Image,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { size } from "../../../config/size";
import { colors } from "../../../constants/colors";
import CText from "../../../shared/CText";
import GradientSafeAreaView from "../../../shared/GradientSafeAreaView";
import { useGetUserServices } from "../../../hooks/api/providers";
import { useAppSelector } from "../../../controller/redux.controller";
import { userSelector } from "../../../features/user/user.selector";
import { formatToAmount } from "../../../utils/stringManipulation";
import { RootStackParamList } from "../../../types/navigations.types";
import PrimaryButton from "../../../shared/PrimaryButton";
import HeaderWithMenu from "../../../components/headers/HeaderWithMenu";
import Toast from "react-native-toast-message";

// Utility function to format service description to serviceType
const formatServiceType = (description: string): string => {
  return description
    .toLowerCase()
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_]/g, ""); // Remove special characters
};

// Define navigation prop
type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreatedServices"
>;

// Define service type
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  displayPicture: string;
  currencyCode?: string;
  category?: string;
  duration?: string;
  location?: string;
  createdAt?: string;
  provider?: {
    name: string;
    rating: number;
  };
}

const ServiceScreen = () => {
  const user = useAppSelector(userSelector);
  const {
    data: services,
    refetch,
    isPending,
    isError,
  } = useGetUserServices(user.userId, user.customerId);
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  // Log services data

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing services:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleServicePress = (service: Service) => {
    // Use service.description as serviceType
    const serviceType = service.description; // "Other School Request" -> "other_school_request"

    navigation.navigate("ServiceDetailScreen", {
      service,
      serviceType,
    } as never);
  };

  const mappedStatus = {
    Online: { label: "Online", color: "#1DAB52" },
    Completed: { label: "Completed", color: "#1DAB52" },
    Pending: { label: "Pending", color: "#FFA500" },
    Accept: { label: "Accepted", color: "#5A00E0" },
    "Payment Made": { label: "Paid", color: "#4B0082" },
    Processing: { label: "Processing", color: "#17A2B8" },
  } as const;
  const handleAddService = () => {
    navigation.navigate("CreateServices");
  };
  return (
    <GradientSafeAreaView>
      <HeaderWithMenu />
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
          flex: 1,
        }}
      >
        <CText
          color={"black"}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{ opacity: 0.75 }}
        >
          Service History
        </CText>
        <CText
          color={"secondaryBlack"}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{ opacity: 0.75, marginTop: size.getHeightSize(4) }}
        >
          View the services you have requested
        </CText>
        <View style={styles.view5}>
          {/* ✅ Error state */}
          {isError && (
            <CText
              color="red"
              fontSize={14}
              lineHeight={20}
              fontFamily="regular"
              style={{ marginTop: size.getHeightSize(12) }}
            >
              Error fetching services. Please try again later.
            </CText>
          )}

          {/* ✅ Loading state */}
          {isPending && !refreshing ? (
            <ActivityIndicator
              size="large"
              color={colors.black("10") || "#007AFF"}
              style={{ marginTop: size.getHeightSize(24) }}
            />
          ) : (
            /* ✅ Data loaded OR refreshing */
            <FlatList
              data={services?.data || []}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <CText
                  color={"black"}
                  fontSize={16}
                  lineHeight={22.4}
                  style={{
                    textAlign: "center",
                    marginTop: size.getHeightSize(32),
                  }}
                >
                  You haven’t created any service yet.
                </CText>
              )}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: size.getHeightSize(16),
                marginTop: size.getHeightSize(24),
                paddingBottom: size.getHeightSize(100),
              }}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.view4}
                  onPress={() => handleServicePress(item)}
                >
                  <View style={styles.view3}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: item.displayPicture }}
                    />
                  </View>
                  <CText
                    color={"primaryColor"}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                    style={{ marginTop: size.getHeightSize(12) }}
                  >
                    {item.name}
                  </CText>
                  <CText
                    color={"secondaryBlack"}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="regular"
                    style={{ marginTop: size.getHeightSize(4) }}
                  >
                    {item.description}
                  </CText>
                  <CText
                    color={"black"}
                    fontSize={12}
                    lineHeight={22.4}
                    fontFamily="bold"
                    style={{ marginTop: size.getHeightSize(4) }}
                  >
                    {item.currencyCode || "NGN"} {formatToAmount(item.price)}
                  </CText>
                  <View
                    style={{
                      marginTop: size.getHeightSize(4),
                      backgroundColor:
                        item.status in mappedStatus
                          ? `${mappedStatus[item.status].color}20`
                          : "#00000020",
                      paddingVertical: size.getHeightSize(4),
                      paddingHorizontal: size.getWidthSize(8),
                      borderRadius: size.getHeightSize(8),
                      alignSelf: "flex-start",
                    }}
                  >
                    <CText
                      color={
                        item.status in mappedStatus
                          ? mappedStatus[item.status].color
                          : "black"
                      }
                      fontSize={12}
                      lineHeight={16.4}
                      fontFamily="regular"
                    >
                      {item.status in mappedStatus
                        ? mappedStatus[item.status].label
                        : item.status}
                    </CText>
                  </View>
                </Pressable>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>

        <View style={{ marginBottom: 10 }}>
          <PrimaryButton label="Add Service" onPress={handleAddService} />
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  view3: {
    height: size.getHeightSize(100),
    width: size.getHeightSize(150),
    alignSelf: "center",
  },
  view4: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    borderRadius: size.getHeightSize(16),
    width: size.getWidthSize(175),
    height: size.getHeightSize(300),
    justifyContent: "space-between",
  },
  view5: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: size.getHeightSize(16),
  },
});
