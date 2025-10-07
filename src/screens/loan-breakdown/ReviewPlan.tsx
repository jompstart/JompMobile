import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { formatToAmount } from "../../utils/stringManipulation";

interface ProcessingFeeType {
  processingFee: number;
  adminFee: number;
  insuranceFee: number;
}

interface BreakdownItem {
  month: number;
  openingPrincipal: number;
  interest: number;
  principalRepayment: number;
  monthlyInstallment: number;
}

interface Props {
  selectedPaymentTerm: string;
  onChangePlan: () => void;
  amountAccepted: number;
  amountDisbursed: number;
  userContribution: number;
  processingFee: ProcessingFeeType;
  breakDown: BreakdownItem[];
  interestRate: any[];
}

const ReviewPlanSection: React.FC<Props> = ({
  selectedPaymentTerm,
  onChangePlan,
  amountAccepted,
  amountDisbursed,
  userContribution,
  processingFee,
  breakDown,
  interestRate,
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 24,
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
        }}
      >
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {selectedPaymentTerm} Plan
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Review your plan
          </Text>
          <Text style={{ color: "#575757", fontWeight: "600" }}>
            Payment plan
          </Text>
        </View>

        <TouchableOpacity
          onPress={onChangePlan}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#4F46E5",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ color: "#4F46E5", fontWeight: "600" }}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Month 0 Plan */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Month 0 (Today) Plan
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Approved Amount</Text>
          <Text style={styles.value}>{formatToAmount(amountAccepted)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Loan Amount</Text>
          <Text style={styles.value}>
            {formatToAmount(amountDisbursed) || "0"}
          </Text>
        </View>

        {userContribution !== 0 && (
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.label}>Customer’s Contribution</Text>
              <Text style={{ fontSize: 12, color: "#575757" }}>
                ({((userContribution / amountAccepted) * 100).toFixed(2)}% of
                Approved Amount)
              </Text>
            </View>
            <Text style={styles.value}>
              {formatToAmount(userContribution) || "0"}
            </Text>
          </View>
        )}

        <View style={styles.row}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.label}>
              Processing Fee ({processingFee?.processingFee}% of Loan Amount)
            </Text>
            <Text style={{ fontSize: 12, color: "#575757" }}>
              (Admin Fee {processingFee?.adminFee}% and Insurance Fee{" "}
              {processingFee?.insuranceFee}%)
            </Text>
          </View>
          <Text style={styles.value}>
            {formatToAmount(
              (processingFee?.processingFee / 100) * amountDisbursed
            ) || "0"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Due Today</Text>
          <Text style={styles.value}>
            {formatToAmount(
              userContribution +
                (processingFee?.processingFee / 100) * amountDisbursed
            )}
          </Text>
        </View>
      </View>

      {/* Other Months */}
      {breakDown.map((breakdown, index) => (
        <View key={index} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Month {breakdown.month} Plan
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Outstanding Loan Amount</Text>
            <Text style={styles.value}>
              {formatToAmount(breakdown?.openingPrincipal) || "0"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Principal Repayment</Text>
            <Text style={styles.value}>
              {formatToAmount(breakdown?.principalRepayment) || "0"}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.label}>Interest Due</Text>
              <Text style={{ fontSize: 12, color: "#575757" }}>
                ({interestRate?.[0]?.interestAmount ?? 0}% of Loan Amount)
              </Text>
            </View>
            <Text style={styles.value}>
              {formatToAmount(breakdown.interest)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Monthly Installment</Text>
            <Text style={styles.value}>
              {formatToAmount(breakdown.monthlyInstallment)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
  },
  label: {
    color: "#575757",
    fontWeight: "600",
  },
  value: {
    fontWeight: "600",
  },
});

export default ReviewPlanSection;
