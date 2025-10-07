import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { makeRequest } from "../../config/api.config";
import { API_RESPONSE } from "../../services/dto/user.dto";
import PTextInput from "../../shared/PTextInput";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";
import { NotificationItemData } from "../Notifications/Notification";
import CustomDropdown from "../../components/dropdown/CustomDropDown";
import ReviewPlanSection from "./ReviewPlan";
import { colors } from "../../constants/colors";
import { formatToAmount } from "../../utils/stringManipulation";
import MonthZero from "./PaymentBreakdown";
import PaymentBreakdown from "./PaymentBreakdown";
import { updateToast } from "../../features/ui/ui.slice";

// ---------------------------------------------
// ✅ Type Definitions
// ---------------------------------------------
export type PaymentBreakDownProps = {
  month: number;
  openingPrincipal: number;
  interest: number;
  principalRepayment: number;
  monthlyInstallment: number;
};

type ProcessingFeeType = {
  adminFee: number;
  insuranceFee: number;
  processingFee: number;
};

export type PaymentTerms = {
  id: string;
  name: string;
  description: string;
};

export type FormFieldValues = {
  Country?: string;
  ContactAddress?: string;
  duration?: string;
  State?: string;
};

export type PaymentDurationTerm = {
  id: string;
  name: string;
  description: string;
  duration: string;
  createAt: string;
  updateAt: string;
};

export type CustomerRequestType = {
  customerRequest: number;
  description: string;
  disbursedAmount: number;
  id: string;
  processingFee: number;
  serviceCategory: string;
};

// ---------------------------------------------
// ✅ Loan Breakdown Component
// ---------------------------------------------
const LoanBreakdown = () => {
  const route = useRoute();
  const { id, notification } = route.params as {
    id: string;
    notification: NotificationItemData;
  };

  // ---------------------------------------------
  // ✅ Component States
  // ---------------------------------------------
  const [amountAccepted, setAmountAccepted] = useState<number>(0);
  const [amountDisbursed, setAmountDisbursed] = useState<number>(0);
  const [userContribution, setUserContribution] = useState<number>(0);
  const [amountRequested, setAmountRequested] = useState<number>(0);
  const [paymentTermsLoading, setPaymentTermsLoading] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms[]>();
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState("");
  const [breakDown, setBreakDown] = useState<PaymentBreakDownProps[]>([]);
  const [isReviewPlan, setIsReviewPlan] = useState(false);
  const [processingFee, setProcessingFee] = useState<any>(null);
  const [serviceCat, setServiceCat] = useState<any>(null);
  const [serviceDuration, setServiceDuration] = useState<any>(null);
  const [interestRate, setInterestRate] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formFields, setFormFields] = useState<FormFieldValues>(
    {} as FormFieldValues
  );
  const [disbursed, setDisbursed] = useState<number>(0);
  const navigation = useNavigation();
  // ---------------------------------------------
  // ✅ Select duration from modal dropdown
  // ---------------------------------------------
  const handleSelect = (value: string) => {
    setFormFields({ ...formFields, duration: value });
    setModalVisible(false);
    setSelectedPaymentTerm(value);
  };

  // ---------------------------------------------
  // ✅ Extract service category from notification
  // ---------------------------------------------
  useEffect(() => {
    if (notification) setServiceCat(notification.serviceType);
  }, [notification]);

  // ---------------------------------------------
  // ✅ Fetch service durations from API
  // ---------------------------------------------
  useEffect(() => {
    if (!serviceCat) return;

    const getCategoryDuration = async () => {
      try {
        const response = await makeRequest({
          method: "GET",
          url: "/service-categories",
        });

        if (response?.success) {
          const normalizedServiceCat = serviceCat.trim().toLowerCase();
          const data = response.data as PaymentDurationTerm[];

          // Extract keywords for fuzzy matching
          const extractKeywords = (str: string) =>
            str.split(/\s+/).filter((word) => word.length > 2);

          const queryWords = extractKeywords(normalizedServiceCat);

          // Try to find category that matches user service type
          const matchedCategory = data.find((cat: any) => {
            const catName = cat.name.trim().toLowerCase();
            const categoryWords = extractKeywords(catName);
            const commonWords = queryWords.filter((word) =>
              categoryWords.includes(word)
            );
            return commonWords.length > 0;
          });

          // Convert duration string (e.g. "12 months") into an array of months
          if (matchedCategory) {
            const durationInMonths =
              parseInt(matchedCategory.duration.replace(/\D/g, ""), 10) || 0;

            const monthsArray = Array.from(
              { length: durationInMonths },
              (_, i) => `Month ${i + 1}`
            );

            setServiceDuration(monthsArray);
          } else {
            setServiceDuration([]);
          }
        }
      } catch (error) {
        console.error("Error fetching service categories:", error);
      }
    };

    getCategoryDuration();
  }, [serviceCat]);

  // ---------------------------------------------
  // ✅ Fetch Loan Processing Service
  // ---------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await makeRequest({
          method: "GET",
          url: `/get-processing-service?serviceId=${id}`,
        });
        if (resp?.success) {
          const data = resp.data as CustomerRequestType;
          setDisbursed(data.disbursedAmount || 0);
          setAmountRequested(data.customerRequest || 0);
          setAmountDisbursed(data.disbursedAmount || 0);
        }
      } catch (error) {
        console.log("Error fetching processing service:", error);
      }
    };
    fetchData();
  }, [id]);

  // ---------------------------------------------
  // ✅ Fetch Payment Terms, Processing Fee, and Interest Rate
  // ---------------------------------------------
  useEffect(() => {
    const getPaymentTerms = async () => {
      try {
        setPaymentTermsLoading(true);
        const response = await makeRequest({
          method: "GET",
          url: "/payment-terms",
        });
        if (response.success) {
          setPaymentTerms(response.data as PaymentTerms[]);
        }
      } catch (error) {
        console.log("Error fetching payment terms:", error);
      } finally {
        setPaymentTermsLoading(false);
      }
    };

    const getProcessingFee = async () => {
      try {
        const response = await makeRequest({
          method: "GET",
          url: "/get-processing-fee",
        });
        if (response.success) {
          setProcessingFee(response.data as ProcessingFeeType);
        }

        // Fetch interest rate
        const res = await makeRequest({
          method: "GET",
          url: "/get-interateRate",
        });
        setInterestRate(res?.data as any[]);
      } catch (error) {
        console.log("Error fetching fee or interest rate:", error);
      } finally {
        setPaymentTermsLoading(false);
      }
    };

    getPaymentTerms();
    getProcessingFee();
  }, []);

  // ---------------------------------------------
  // ✅ Accept Service Handler
  // ---------------------------------------------
  const acceptService = async () => {
    const paymentTermNumber = selectedPaymentTerm.replace(/\D/g, "");

    const payload = {
      loanDuration: paymentTermNumber,
      amountDisbursed,
      interestRate: interestRate[0]?.rate ?? 1,
      monthlyInstallment: 0,
      customerContribution: 0,
      marginAmount: 0,
      serviceId: id || "",
      status: "accept",
    };
    try {
      setSubmitLoading(true);
      const resp = await makeRequest({
        method: "POST",
        url: "/customer-accept-service",
        data: payload,
      });
      console.log(resp);
      if (resp.success) {
        setSubmitLoading(false);
        navigation.navigate("SuccessPage", {
          title: "Loan Accepted",
          message: "Your loan breakdown has been processed",
        });
        updateToast({
          displayToast: true,
          toastMessage: resp.message,
          toastType: "success",
        });
      }
    } catch (error: any) {
      setSubmitLoading(false);

      updateToast({
        displayToast: true,
        toastMessage: error.message,
        toastType: "info",
      });
    }
  };

  // ---------------------------------------------
  // ✅ Toggle Review Plan Section
  // ---------------------------------------------
  const handleToggleReviewPlan = () => {
    !isReviewPlan ? setIsReviewPlan(true) : acceptService();
  };

  // ---------------------------------------------
  // ✅ Component Render
  // ---------------------------------------------
  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon title="Loan Breakdown" />

      {/* Review Plan Section */}
      {isReviewPlan ? (
        <ReviewPlanSection
          onChangePlan={() => setIsReviewPlan(false)}
          selectedPaymentTerm={selectedPaymentTerm}
          amountAccepted={amountAccepted}
          amountDisbursed={amountDisbursed}
          userContribution={userContribution}
          processingFee={processingFee}
          breakDown={breakDown}
          interestRate={interestRate}
        />
      ) : (
        <View style={{ flex: 1, marginTop: 20 }}>
          {paymentTermsLoading && <Text>Loading payment terms...</Text>}

          {/* Duration Dropdown */}
          <View style={{ marginHorizontal: 10 }}>
            {serviceDuration && (
              <>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={styles.selectBox}
                >
                  <Text style={styles.selectedText}>
                    {formFields.duration || "Service Duration (months)"}
                  </Text>
                </Pressable>

                {/* Modal for selecting duration */}
                <Modal
                  visible={modalVisible}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>Select Duration</Text>

                      <FlatList
                        data={serviceDuration}
                        keyExtractor={(_, index) => String(index)}
                        ListEmptyComponent={<Text>No durations available</Text>}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                          >
                            <Text style={styles.optionText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />

                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.cancelButton}
                      >
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </View>

          {selectedPaymentTerm && (
            <PaymentBreakdown
              amountAccepted={amountAccepted}
              amountDisbursed={amountDisbursed}
              userContribution={userContribution}
              processingFee={processingFee}
              breakDown={breakDown}
              interestRate={interestRate}
              selectedPaymentTerm={selectedPaymentTerm}
              disbursed={disbursed}
              setBreakDown={setBreakDown}
            />
          )}
        </View>
      )}

      {/* Review / Submit Button */}
      <TouchableOpacity
        onPress={handleToggleReviewPlan}
        style={styles.submitButtonStyles}
      >
        <Text style={styles.submitButtonStylesText}>
          {submitLoading ? (
            <ActivityIndicator color="white" />
          ) : isReviewPlan ? (
            "Submit Plan"
          ) : (
            "Review Plan"
          )}
        </Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

export default LoanBreakdown;

// ---------------------------------------------
// ✅ Styles
// ---------------------------------------------
const styles = StyleSheet.create({
  submitButtonStyles: {
    marginVertical: 20,
    backgroundColor: colors.primary(),
    height: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonStylesText: {
    color: "white",
  },
  selectBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  cancelButton: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  cancelText: {
    color: "#007BFF",
    fontWeight: "600",
  },
  container: {
    paddingVertical: 16,
  },
  item: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 12,
  },
  month: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
});
