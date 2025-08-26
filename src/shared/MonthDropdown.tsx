import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { size } from "../config/size";
import { colors } from "../constants/colors";
import PTextInput from "./PTextInput";
import CText from "./CText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface MonthDropdownProps {
  value?: string;
  onChangeText: (value: string) => void;
  outerStyle?: object;
}

const MonthDropdown: React.FC<MonthDropdownProps> = ({
  value,
  onChangeText,
  outerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const months = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const selectedMonth = months.find((month) => month.value === value);
  const displayValue = selectedMonth ? selectedMonth.label : "";

  const handleSelect = (monthValue: string) => {
    setHasInteracted(true);
    onChangeText(monthValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setHasInteracted(true);
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <View style={outerStyle}>
      <PTextInput
        placeholder="Month"
        value={displayValue}
        editable={false}
        onPress={toggleDropdown}
        rightIcon={
          <MaterialIcons
            name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={size.getHeightSize(25)}
          />
        }
        style={{
          backgroundColor: colors.white(),
        }}
      />
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {months.map((month) => (
                <TouchableOpacity
                  key={month.value}
                  style={[
                    styles.dropdownItem,
                    value === month.value && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(month.value)}
                >
                  <CText
                    fontSize={size.getHeightSize(14)}
                    style={[
                      styles.dropdownText,
                      value === month.value && styles.selectedText,
                    ]}
                  >
                    {month.label}
                  </CText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default MonthDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1000,
    marginTop: size.getHeightSize(2),
  },
  dropdown: {
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    borderWidth: 1,
    borderColor: colors.primaryDisabled(),
    maxHeight: size.getHeightSize(200),
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    maxHeight: size.getHeightSize(200),
  },
  scrollViewContent: {
    paddingBottom: size.getHeightSize(100), 
  },
  dropdownItem: {
    paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryDisabled(),
  },
  selectedItem: {
    backgroundColor: colors.appBackground(),
  },
  dropdownText: {
    color: colors.black(),
  },
  selectedText: {
    color: colors.primary(),
    fontWeight: "600",
  },
});