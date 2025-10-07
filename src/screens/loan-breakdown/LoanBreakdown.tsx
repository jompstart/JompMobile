import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { makeRequest } from "../../config/api.config";
import { API_RESPONSE } from "../../services/dto/user.dto";
import PTextInput from "../../shared/PTextInput";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";
import { NotificationItemData } from "../Notifications/Notification";
import CustomDropdown from "../../components/dropdown/CustomDropDown";
import ReviewPlanSection from "./ReviewPlan";
import { colors } from "../../constants/colors";

type PaymentBreakDownProps = {
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
export type FormFieldTypes = {
  label: string;
  placeholder: string;
  key: string;
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

const inputFields: FormFieldTypes[] = [
  {
    label: "Contact Address",
    placeholder: "12 Lekki Phase 1",
    key: "ContactAddress",
  },
  {
    label: "State",
    placeholder: "Lagos",
    key: "State",
  },
  {
    label: "Country",
    placeholder: "Nigeria",
    key: "Country",
  },
];

const LoanBreakdown = () => {
  const route = useRoute();
  const { id, notification } = route.params as {
    id: string;
    notification: NotificationItemData;
  };
  const [acceptedCustomerId, setAcceptedCustomerId] = useState("");
  const [acceptedServiceId, setAcceptedServiceId] = useState("");
  const [amountAccepted, setAmountAccepted] = useState<number>(0);
  const [amountDisbursed, setAmountDisbursed] = useState<number>(0);
  const [userContribution, setUserContribution] = useState<number>(0);
  const [amountRequested, setAmountRequested] = useState<number>(0);
  const [paymentTermsLoading, setPaymentTermsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms[] | undefined>(
    undefined
  );
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState("");
  const [breakDown, setBreakDown] = useState<PaymentBreakDownProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReviewPlan, setIsReviewPlan] = useState(false);
  const [processingFee, setProcessingFee] = useState<any>(null);
  const [serviceCat, setServiceCat] = useState<any>(null);
  const [serviceDuration, setServiceDuration] = useState<any>(null);
  const [interestRate, setInterestRate] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formFields, setFormFields] = useState<FormFieldValues>(
    {} as FormFieldValues
  );
  const [disbursed, setDisbursed] = useState<number | null>(null);

  const handleSelect = (value: string) => {
    setFormFields({ ...formFields, duration: value });
    setModalVisible(false);
    setSelectedPaymentTerm(value);
  };
  useEffect(() => {
    if (!notification) return;
    setServiceCat(notification.serviceType);
  }, []);
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

          const extractKeywords = (str: string) =>
            str.split(/\s+/).filter((word) => word.length > 2);

          const queryWords = extractKeywords(normalizedServiceCat);

          const matchedCategory = data.find((cat: any) => {
            const catName = cat.name.trim().toLowerCase();
            const categoryWords = extractKeywords(catName);
            const commonWords = queryWords.filter((word) =>
              categoryWords.includes(word)
            );
            return commonWords.length > 0;
          });

          if (matchedCategory) {
            const durationString = matchedCategory?.duration;
            if (typeof durationString === "string") {
              const durationInMonths =
                parseInt(durationString.replace(/\D/g, ""), 10) || 0;

              const monthsArray = Array.from(
                { length: durationInMonths },
                (_, i) => `Month ${i + 1}`
              );

              setServiceDuration(monthsArray);
            }
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
  // ✅ Fetch loan processing service
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await makeRequest({
          method: "GET",
          url: `/get-processing-service?serviceId=${id}`,
        });
        if (resp?.success) {
          const data = resp.data as CustomerRequestType;
          console.log(data);
          // console.log("Processing service response:", resp.data);
          setDisbursed(data.disbursedAmount || 0);
          setAmountRequested(data.customerRequest || 0);
          setAmountDisbursed(data.disbursedAmount || 0);
        }
      } catch (error) {
        // console.log("Error fetching processing service:", error);
      }
    };
    fetchData();
  }, [id]);
  // ✅ Fetch payment terms, processing fee, and interest rate
  useEffect(() => {
    const getPaymentTerms = async () => {
      try {
        setPaymentTermsLoading(true);
        const response = await makeRequest({
          method: "GET",
          url: "/payment-terms",
        });
        // console.log("Payment terms response:", paymentTerms);
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
          // console.log("processing fee", processingFee);
        }

        const res = await makeRequest({
          method: "GET",
          url: `/get-interestRate`,
        });
        // console.log("interestRate", res);
        // setProcessingFee(res?.data?.data);
        // setInterestRate(res?.data?.data);
      } catch (error) {
        // console.log("Error fetching fee or interest rate:", error);
      } finally {
        setPaymentTermsLoading(false);
      }
    };

    getPaymentTerms();
    getProcessingFee();
  }, []);

  // ✅ Fetch payment breakdown based on term and amount
  useEffect(() => {
    const handlePaymentBreakdown = async () => {
      if (!selectedPaymentTerm || !disbursed) return;

      try {
        const response = await makeRequest({
          method: "GET",
          url: `/payment-breakdown?months=${selectedPaymentTerm}&loanAmount=${disbursed}`,
        });
        // console.log("Payment breakdown:", response);
      } catch (error) {
        console.log("Error fetching payment breakdown:", error);
      }
    };

    handlePaymentBreakdown();
  }, [selectedPaymentTerm, disbursed]);

  const acceptService = async () => {
    const paymentTermNumber = selectedPaymentTerm.replace(/\D/g, "");

    const payload = {
      loanDuration: paymentTermNumber,
      amountDisbursed: amountDisbursed,
      interestRate: 0,
      monthlyInstallment: 0,
      customerContribution: 0,
      marginAmount: 0,
      serviceId: id || "",
      status: "string",
    };
    try {
      const resp = await makeRequest({
        method: "POST",
        url: "/customer-accept-service",
        data: payload,
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleReviewPlan = () => {
    !isReviewPlan ? setIsReviewPlan(true) : acceptService();
  };
  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon title="Loan Breakdown" />
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
        <View>
          {paymentTermsLoading && <Text>Loading payment terms...</Text>}
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginVertical: 16, gap: 10 }}>
              {inputFields.map((field: FormFieldTypes, index) => (
                <View key={field.key}>
                  <Text style={{ marginBottom: 8, fontWeight: "600" }}>
                    {field.label}
                  </Text>
                  <PTextInput
                    value={formFields[field.key]}
                    onChangeText={(text) =>
                      setFormFields({ ...formFields, [field.key]: text })
                    }
                    placeholder={field.placeholder}
                  />
                </View>
              ))}
            </View>
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
                        keyExtractor={(item, index) => String(index)}
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
        </View>
      )}
      <TouchableOpacity
        onPress={handleToggleReviewPlan}
        style={styles.submitButtonStyles}
      >
        <Text style={styles.submitButtonStylesText}>
          {isReviewPlan ? "Submit Plan" : "Review Plan"}
        </Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

export default LoanBreakdown;
const styles = StyleSheet.create({
  submitButtonStyles: {
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
  optionSub: {
    fontSize: 14,
    color: "#777",
  },
  cancelButton: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  cancelText: {
    color: "#007BFF",
    fontWeight: "600",
  },
});
