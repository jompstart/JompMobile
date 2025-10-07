import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { formatToAmount } from "../../utils/stringManipulation";
import { PaymentBreakDownProps } from "./LoanBreakdown";
import { makeRequest } from "../../config/api.config";

interface ProcessingFee {
  processingFee: number;
  adminFee: number;
  insuranceFee: number;
}

interface Props {
  amountAccepted: number;
  amountDisbursed: number;
  userContribution: number;
  processingFee: ProcessingFee;
  breakDown: PaymentBreakDownProps[];
  interestRate: any;
  selectedPaymentTerm: string;
  disbursed: number;
  setBreakDown: Dispatch<SetStateAction<PaymentBreakDownProps[]>>;
}

const PaymentBreakdown: React.FC<Props> = ({
  amountAccepted,
  selectedPaymentTerm,
  disbursed,
  amountDisbursed,
  userContribution,
  processingFee,
  breakDown,
  interestRate,
  setBreakDown,
}) => {
  const [paymentBreakdownLoading, setPaymentBreakdownLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------
  // ✅ Fetch Payment Breakdown for selected term
  // ---------------------------------------------
  useEffect(() => {
    const handlePaymentBreakdown = async () => {
      if (!selectedPaymentTerm || !disbursed) return;

      setPaymentBreakdownLoading(true);
      setError(null);

      try {
        const response = await makeRequest({
          method: "GET",
          url: `/payment-breakdown?months=${selectedPaymentTerm}&loanAmount=${disbursed}`,
        });

        if (response.success) {
          setBreakDown(response.data as PaymentBreakDownProps[]);
        } else {
          setError("Failed to load payment breakdown.");
        }
      } catch (err: any) {
        console.error("Error fetching payment breakdown:", err);
        setError("Something went wrong while fetching payment breakdown.");
      } finally {
        setPaymentBreakdownLoading(false);
      }
    };

    handlePaymentBreakdown();
  }, [selectedPaymentTerm, disbursed]);

  const paymentDueToday =
    userContribution +
    ((processingFee?.processingFee || 0) / 100) * amountDisbursed;

  // ---------------------------------------------
  // ✅ Loading State
  // ---------------------------------------------
  if (paymentBreakdownLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#424E9B" />
        <Text style={styles.infoText}>Fetching payment breakdown...</Text>
      </View>
    );
  }

  // ---------------------------------------------
  // ✅ Error State
  // ---------------------------------------------
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.infoText, { color: "red" }]}>{error}</Text>
      </View>
    );
  }

  // ---------------------------------------------
  // ✅ Empty State
  // ---------------------------------------------
  if (!breakDown?.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>No payment breakdown available.</Text>
      </View>
    );
  }

  // ---------------------------------------------
  // ✅ Main UI
  // ---------------------------------------------
  return (
    <ScrollView style={{ marginVertical: 20, marginHorizontal: 10 }}>
      {/* ====== MONTH 0 (Today) ====== */}
      <View style={styles.container}>
        <Text style={styles.title}>Month 0 (Today)</Text>

        {/* Approved Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Approved Amount</Text>
          <Text style={styles.value}>{formatToAmount(amountAccepted)}</Text>
        </View>

        {/* Loan Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Loan Amount</Text>
          <Text style={styles.value}>{formatToAmount(amountDisbursed)}</Text>
        </View>

        {/* Customer's Contribution */}
        {userContribution !== 0 && (
          <View style={styles.row}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Customer's Contribution</Text>
              <Text style={styles.subLabel}>
                (
                {(
                  (userContribution / (userContribution + amountAccepted)) *
                  100
                ).toFixed(2)}
                % of Approved Amount)
              </Text>
            </View>
            <Text style={styles.value}>{formatToAmount(userContribution)}</Text>
          </View>
        )}

        {/* Processing Fee */}
        <View style={styles.row}>
          <View style={styles.labelColumn}>
            <Text style={styles.label}>
              Processing Fee ({processingFee?.processingFee || 0}% of Loan
              Amount)
            </Text>
            <Text style={styles.subLabel}>
              (Admin Fee {processingFee?.adminFee || 0}% and Insurance Fee{" "}
              {processingFee?.insuranceFee || 0}%)
            </Text>
          </View>
          <Text style={styles.value}>
            {formatToAmount(
              ((processingFee?.processingFee || 0) / 100) * amountDisbursed
            )}
          </Text>
        </View>

        {/* Payment Due Today */}
        <View style={styles.row}>
          <Text style={styles.label}>Payment Due Today</Text>
          <Text style={styles.value}>{formatToAmount(paymentDueToday)}</Text>
        </View>
      </View>

      {/* ====== MONTHLY BREAKDOWN ====== */}
      <FlatList
        data={breakDown}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.month}>Month {item.month}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Outstanding Loan Amount</Text>
              <Text style={styles.value}>
                {formatToAmount(item.openingPrincipal) || "0"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Principal Repayment</Text>
              <Text style={styles.value}>
                {formatToAmount(item.principalRepayment) || "0"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Interest Due (
                {interestRate && interestRate[0]
                  ? interestRate[0].interestAmount
                  : 0}
                %)
              </Text>
              <Text style={styles.value}>{formatToAmount(item.interest)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                {index < breakDown.length - 1
                  ? `Payment For Month ${item.month}:`
                  : "Final Payment:"}
              </Text>
              <Text style={styles.value}>
                {formatToAmount(item.principalRepayment + item.interest)}
              </Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default PaymentBreakdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#575757",
  },
  subLabel: {
    fontSize: 12,
    color: "#575757",
    fontWeight: "400",
  },
  labelColumn: {
    flexDirection: "column",
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  infoText: {
    fontSize: 14,
    color: "#575757",
    marginTop: 10,
  },
});
