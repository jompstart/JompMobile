import { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import CText from "../../shared/CText";

const CustomDropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}: {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedLabel(selectedOption ? selectedOption.label : "");
  }, [selectedValue, options]);

  const handleSelect = (value: string, label: string) => {
    onValueChange(value);
    setSelectedLabel(label);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          borderWidth: 1,
          borderColor: "#E5E5E5",
          borderRadius: 8,
          padding: 16,
          backgroundColor: "white",
        }}
      >
        <CText
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: selectedValue ? 0.75 : 0.6,
          }}
        >
          {selectedLabel || placeholder}
        </CText>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              width: "80%",
              maxHeight: "60%",
            }}
          >
            <CText
              color={"black"}
              fontSize={18}
              lineHeight={28.8}
              fontFamily="bold"
              style={{
                opacity: 0.75,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Select Accommodation Type
            </CText>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value, item.label)}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#F0F0F0",
                  }}
                >
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="regular"
                    style={{
                      opacity: 0.75,
                    }}
                  >
                    {item.label}
                  </CText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: "#F0F0F0",
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <CText
                color={"black"}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="medium"
                style={{
                  opacity: 0.75,
                }}
              >
                Cancel
              </CText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CustomDropdown;
