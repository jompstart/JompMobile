import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { size } from "../../config/size";
import { colors } from "../../constants/colors";
import CText from "../../shared/CText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import GradientHeader from "../../shared/GradientHeader";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import { formatToAmount } from "../../utils/stringManipulation";
import { RootStackParamList } from "../../types/navigations.types";
import { makeRequest } from "../../config/api.config";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";

// Define navigation and route props
type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "ServiceDetailScreen"
>;
type RoutePropType = RouteProp<RootStackParamList, "ServiceDetailScreen">;

// Generic interfaces for dynamic data
interface PaymentTerm {
  id: string;
  name: string;
  description: string;
}

interface ProcessingFee {
  processingFee: number;
  insuranceFee: number;
  adminFee: number;
}

interface ServiceDetailScreenProps {
  navigation: NavigationProp;
  route: RoutePropType;
}

// Helper function to format field names for display
const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

// Helper function to check if value is a URL
const isUrl = (value: any): boolean => {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// Helper function to check if value is an object
const isObject = (value: any): boolean => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

// Helper function to check if value is a date string
const isDateString = (value: any): boolean => {
  if (typeof value !== "string") return false;
  return !isNaN(Date.parse(value)) && /^\d{4}-\d{2}-\d{2}/.test(value);
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Helper function to check if value is numeric
const isNumeric = (value: any): boolean => {
  if (typeof value === "number") return true;
  if (typeof value !== "string") return false;
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { service, serviceType } = route.params;
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([]);
  const [processingFee, setProcessingFee] = useState<ProcessingFee | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mappedStatus = {
    Online: { label: "Online", color: "#1DAB52" },
    Completed: { label: "Completed", color: "#1DAB52" },
    Pending: { label: "Pending", color: "#FFA500" },
    Accept: { label: "Accepted", color: "#5A00E0" },
    "Payment Made": { label: "Paid", color: "#4B0082" },
    Processing: { label: "Processing", color: "#17A2B8" },
  } as const;

  // Deduplicate payment terms by name
  const deduplicatedPaymentTerms = paymentTerms.reduce<PaymentTerm[]>(
    (acc, term) => {
      if (!acc.some((t) => t.name === term.name)) {
        acc.push(term);
      }
      return acc;
    },
    []
  );

  // Function to handle opening documents
  const openDocument = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.log("Cannot open URL:", url);
      }
    } catch (error) {
      console.error("Error opening document:", error);
    }
  };

  // Recursive function to render dynamic data
  const renderDynamicData = (
    data: any,
    depth: number = 0,
    parentKey: string = ""
  ): JSX.Element[] => {
    if (!data || typeof data !== "object") {
      return [];
    }

    const elements: JSX.Element[] = [];

    Object.entries(data).forEach(([key, value]) => {
      const formattedKey = formatFieldName(key);
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Skip common metadata fields or empty values
      if (
        [
          "id",
          "success",
          "message",
          "statusCode",
          "createdAt",
          "updatedAt",
        ].includes(key) ||
        value === null ||
        value === undefined ||
        value === "undefined"
      ) {
        return;
      }

      if (isObject(value) && !Array.isArray(value)) {
        // Render nested objects as sections
        elements.push(
          <View
            key={fullKey}
            style={[styles.section, { marginLeft: depth * 10 }]}
          >
            <CText
              color={"primaryColor"}
              fontSize={18 - depth}
              lineHeight={24 - depth}
              fontFamily="bold"
              style={styles.sectionTitle}
            >
              {formattedKey}
            </CText>
            {renderDynamicData(value, depth + 1, fullKey)}
          </View>
        );
      } else if (Array.isArray(value)) {
        // Render arrays
        elements.push(
          <View key={fullKey} style={styles.detailItem}>
            <CText
              color={"black"}
              fontSize={14}
              lineHeight={22}
              fontFamily="bold"
            >
              {formattedKey}:
            </CText>
            <View style={styles.arrayContainer}>
              {value.map((item, index) => (
                <CText
                  key={index}
                  color={"secondaryBlack"}
                  fontSize={14}
                  lineHeight={18}
                  fontFamily="regular"
                >
                  •{" "}
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : String(item)}
                </CText>
              ))}
            </View>
          </View>
        );
      } else {
        // Render primitive values
        let displayValue: string;
        let isLink = false;
        let isAmount = false;

        if (isUrl(value)) {
          displayValue = "View Document";
          isLink = true;
        } else if (isDateString(value)) {
          displayValue = formatDate(value as string);
        } else if (
          isNumeric(value) &&
          (key.toLowerCase().includes("amount") ||
            key.toLowerCase().includes("fee") ||
            key.toLowerCase().includes("price"))
        ) {
          displayValue = `NGN ${formatToAmount(Number(value))}`;
          isAmount = true;
        } else {
          displayValue = String(value);
        }

        elements.push(
          <View key={fullKey} style={styles.detailItem}>
            <CText
              color={"black"}
              fontSize={16}
              lineHeight={22}
              fontFamily="bold"
            >
              {formattedKey}:
            </CText>
            {isLink ? (
              <Pressable onPress={() => openDocument(value as string)}>
                <CText
                  color={"primaryColor"}
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="regular"
                  style={styles.link}
                >
                  📄 {displayValue}
                </CText>
              </Pressable>
            ) : (
              <CText
                color={isAmount ? "primaryColor" : "secondaryBlack"}
                fontSize={16}
                lineHeight={22}
                fontFamily={isAmount ? "bold" : "regular"}
              >
                {displayValue}
              </CText>
            )}
          </View>
        );
      }
    });

    return elements;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(
          `Fetching details for serviceId: ${service.id}, serviceType: ${serviceType}`
        );

        const [detailsResponse, termsResponse, feeResponse] = await Promise.all(
          [
            makeRequest<any>({
              method: "GET",
              url: `/get-services?serviceId=${service.id}&serviceType=${serviceType}`,
            }).catch((err) => {
              console.error("Error fetching service details:", err);
              throw err;
            }),
            makeRequest<{ success: boolean; data: PaymentTerm[] }>({
              method: "GET",
              url: `/payment-terms`,
            }).catch((err) => {
              console.error("Error fetching payment terms:", err);
              return { success: false, data: [] };
            }),
            makeRequest<{ success: boolean; data: ProcessingFee }>({
              method: "GET",
              url: `/get-processing-fee`,
            }).catch((err) => {
              console.error("Error fetching processing fee:", err);
              return { success: false, data: null };
            }),
          ]
        );

        console.log(
          "Service details:",
          JSON.stringify(detailsResponse, null, 2)
        );
        console.log("Payment terms:", JSON.stringify(termsResponse, null, 2));
        console.log("Processing fee:", JSON.stringify(feeResponse, null, 2));

        // Handle the service details response - extract data if it exists
        if (detailsResponse.success) {
          setServiceDetails(detailsResponse.data || detailsResponse);
        } else {
          setServiceDetails(detailsResponse);
        }

        setPaymentTerms(termsResponse.success ? termsResponse.data : []);
        setProcessingFee(feeResponse.success ? feeResponse.data : null);
      } catch (error: any) {
        console.error("Error fetching details:", error);
        const errorMessage = error.response?.data?.message
          ? `Failed to load service details: ${error.response.data.message}`
          : "Failed to load service details.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [service.id, serviceType]);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    const fetchDetails = async () => {
      try {
        console.log(
          `Retrying fetch for serviceId: ${service.id}, serviceType: ${serviceType}`
        );
        const [detailsResponse, termsResponse, feeResponse] = await Promise.all(
          [
            makeRequest<any>({
              method: "GET",
              url: `/get-services?serviceId=${service.id}&serviceType=${serviceType}`,
            }).catch((err) => {
              console.error("Error fetching service details:", err);
              throw err;
            }),
            makeRequest<{ success: boolean; data: PaymentTerm[] }>({
              method: "GET",
              url: `/payment-terms`,
            }).catch((err) => {
              console.error("Error fetching payment terms:", err);
              return { success: false, data: [] };
            }),
            makeRequest<{ success: boolean; data: ProcessingFee }>({
              method: "GET",
              url: `/get-processing-fee`,
            }).catch((err) => {
              console.error("Error fetching processing fee:", err);
              return { success: false, data: null };
            }),
          ]
        );

        console.log(
          "Service details (retry):",
          JSON.stringify(detailsResponse, null, 2)
        );

        if (detailsResponse.success) {
          setServiceDetails(detailsResponse.data || detailsResponse);
        } else {
          setServiceDetails(detailsResponse);
        }

        setPaymentTerms(termsResponse.success ? termsResponse.data : []);
        setProcessingFee(feeResponse.success ? feeResponse.data : null);
      } catch (error: any) {
        console.error("Error retrying fetch:", error);
        const errorMessage = error.response?.data?.message
          ? `Failed to load service details: ${error.response.data.message}`
          : "Failed to load service details.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  };

  // Calculate total fees if processing fee exists
  const calculateTotalFees = () => {
    if (!processingFee) return 0;
    return (
      processingFee.processingFee +
      processingFee.insuranceFee +
      processingFee.adminFee
    );
  };

  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon title="Back to services" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: size.getWidthSize(16) }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primaryColor || "#007AFF"}
            style={{ marginVertical: size.getHeightSize(20) }}
          />
        ) : (
          <>
            {error && (
              <View style={styles.errorContainer}>
                <CText
                  color={"red"}
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="regular"
                  style={{ textAlign: "center" }}
                >
                  {error}
                </CText>
                <Pressable
                  style={[
                    styles.primaryButton,
                    { marginTop: size.getHeightSize(10) },
                  ]}
                  onPress={retryFetch}
                >
                  <CText
                    color={"white"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Retry
                  </CText>
                </Pressable>
              </View>
            )}

            {/* Service Image if available */}
            {service.displayPicture && (
              <View style={styles.detailImageContainer}>
                <Image
                  style={styles.detailImage}
                  resizeMode="cover"
                  source={{ uri: service.displayPicture }}
                />
              </View>
            )}

            {/* Basic Service Info */}
            <View style={styles.section}>
              <CText
                color={"primaryColor"}
                fontSize={18}
                lineHeight={24}
                fontFamily="bold"
                style={styles.sectionTitle}
              >
                Service Information
              </CText>
              <View style={styles.detailItem}>
                <CText
                  color={"black"}
                  fontSize={14}
                  lineHeight={22}
                  fontFamily="bold"
                >
                  Service Name:
                </CText>
                <CText
                  color={"secondaryBlack"}
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="regular"
                >
                  {service.name}
                </CText>
              </View>
              <View style={styles.detailItem}>
                <CText
                  color={"black"}
                  fontSize={14}
                  lineHeight={22}
                  fontFamily="bold"
                >
                  Description:
                </CText>
                <CText
                  color={"secondaryBlack"}
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="regular"
                >
                  {service.description}
                </CText>
              </View>
              <View style={styles.detailItem}>
                <CText
                  color={"black"}
                  fontSize={14}
                  lineHeight={22}
                  fontFamily="bold"
                >
                  Price:
                </CText>
                <CText
                  color={"primaryColor"}
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="bold"
                >
                  {service.currencyCode || "NGN"}{" "}
                  {formatToAmount(service.price)}
                </CText>
              </View>
              {service.status && (
                <View style={styles.detailItem}>
                  <CText
                    color={"black"}
                    fontSize={14}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Status:
                  </CText>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          service.status in mappedStatus
                            ? `${mappedStatus[service.status].color}20`
                            : "#00000020",
                      },
                    ]}
                  >
                    <CText
                      color={
                        service.status in mappedStatus
                          ? mappedStatus[service.status].color
                          : "black"
                      }
                      fontSize={14}
                      lineHeight={18}
                      fontFamily="regular"
                    >
                      {service.status in mappedStatus
                        ? mappedStatus[service.status].label
                        : service.status}
                    </CText>
                  </View>
                </View>
              )}
            </View>

            {/* Dynamic Service Details */}
            {serviceDetails && (
              <View style={styles.section}>
                <CText
                  color={"primaryColor"}
                  fontSize={18}
                  lineHeight={24}
                  fontFamily="bold"
                  style={styles.sectionTitle}
                >
                  Service Details
                </CText>
                {renderDynamicData(serviceDetails)}
              </View>
            )}

            {/* Payment Terms Section */}
            {deduplicatedPaymentTerms.length > 0 && (
              <View style={styles.section}>
                <CText
                  color={"primaryColor"}
                  fontSize={18}
                  lineHeight={24}
                  fontFamily="bold"
                  style={styles.sectionTitle}
                >
                  Payment Terms
                </CText>
                <View style={styles.paymentTermsContainer}>
                  {deduplicatedPaymentTerms
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((term) => (
                      <View key={term.id} style={styles.paymentTermItem}>
                        <CText
                          color={"secondaryBlack"}
                          fontSize={14}
                          lineHeight={18}
                          fontFamily="regular"
                        >
                          {term.name}
                        </CText>
                      </View>
                    ))}
                </View>
              </View>
            )}

            {/* Processing Fees Section */}
            {processingFee && (
              <View style={styles.section}>
                <CText
                  color={"primaryColor"}
                  fontSize={18}
                  lineHeight={24}
                  fontFamily="bold"
                  style={styles.sectionTitle}
                >
                  Fee Breakdown
                </CText>
                <View style={styles.detailItem}>
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Processing Fee:
                  </CText>
                  <CText
                    color={"secondaryBlack"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="regular"
                  >
                    NGN {formatToAmount(processingFee.processingFee)}
                  </CText>
                </View>
                <View style={styles.detailItem}>
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Insurance Fee:
                  </CText>
                  <CText
                    color={"secondaryBlack"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="regular"
                  >
                    NGN {formatToAmount(processingFee.insuranceFee)}
                  </CText>
                </View>
                <View style={styles.detailItem}>
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Admin Fee:
                  </CText>
                  <CText
                    color={"secondaryBlack"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="regular"
                  >
                    NGN {formatToAmount(processingFee.adminFee)}
                  </CText>
                </View>
                <View style={[styles.detailItem, styles.totalFeeItem]}>
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    Total Additional Fees:
                  </CText>
                  <CText
                    color={"primaryColor"}
                    fontSize={16}
                    lineHeight={22}
                    fontFamily="bold"
                  >
                    NGN {formatToAmount(calculateTotalFees())}
                  </CText>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  detailImageContainer: {
    height: size.getHeightSize(200),
    width: "100%",
    marginBottom: size.getHeightSize(16),
    borderRadius: size.getHeightSize(12),
    overflow: "hidden",
  },
  detailImage: {
    height: "100%",
    width: "100%",
  },
  section: {
    backgroundColor: "white",
    borderRadius: size.getHeightSize(12),
    padding: size.getHeightSize(16),
    marginBottom: size.getHeightSize(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    marginBottom: size.getHeightSize(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: size.getHeightSize(8),
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: size.getHeightSize(8),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  totalFeeItem: {
    borderBottomWidth: 0,
    marginTop: size.getHeightSize(8),
  },
  arrayContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  paymentTermsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size.getWidthSize(8),
  },
  paymentTermItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(6),
    borderRadius: size.getHeightSize(8),
  },
  link: {
    textDecorationLine: "underline",
  },
  statusBadge: {
    paddingVertical: size.getHeightSize(4),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(6),
  },
  actionButtons: {
    flexDirection: "row",
    padding: size.getHeightSize(20),
    gap: size.getWidthSize(12),
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: size.getHeightSize(14),
    borderRadius: size.getHeightSize(12),
    alignItems: "center",
    backgroundColor: colors.primaryColor || "#007AFF",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: size.getHeightSize(14),
    borderRadius: size.getHeightSize(12),
    alignItems: "center",
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: size.getHeightSize(20),
  },
});
