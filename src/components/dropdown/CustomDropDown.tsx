import { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";


import CText from "../../shared/CText";
import { colors } from "../../constants/colors";
import { size } from "../../config/size";

interface AccommodationType {
  label: string;
  value: string;
}

interface Props {
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const AccommodationTypeDropdown = ({
  selectedValue,
  onValueChange,
  placeholder = "Select accommodation type",
}: Props) => {
  const accommodationTypes: AccommodationType[] = [
    { label: "Hotel", value: "hotel" },
    { label: "Apartment", value: "apartment" },
    { label: "Guest House", value: "guest_house" },
    { label: "Hostel", value: "hostel" },
    { label: "Resort", value: "resort" },
    { label: "Villa", value: "villa" },
    { label: "Motel", value: "motel" },
    { label: "Bed & Breakfast", value: "bnb" },
    { label: "Lodge", value: "lodge" },
    { label: "Serviced Apartment", value: "serviced_apartment" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    const selectedOption = accommodationTypes.find(
      (option) => option.value === selectedValue
    );
    setSelectedLabel(selectedOption ? selectedOption.label : "");
  }, [selectedValue]);

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
          borderWidth: size.getHeightSize(1),
          borderColor: "#E5E5E5",
          borderRadius: size.getHeightSize(8),
          padding: size.getHeightSize(16),
          backgroundColor: colors.white(),
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
              backgroundColor: colors.white(),
              borderRadius: size.getHeightSize(12),
              padding: size.getHeightSize(20),
              width: "80%",
              maxHeight: "60%",
            }}
          >
            <CText
              color="black"
              fontSize={18}
              lineHeight={28.8}
              fontFamily="bold"
              style={{
                opacity: 0.75,
                marginBottom: size.getHeightSize(16),
                textAlign: "center",
              }}
            >
              Select Accommodation Type
            </CText>
            <FlatList
              data={accommodationTypes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value, item.label)}
                  style={{
                    padding: size.getHeightSize(16),
                    borderBottomWidth: size.getHeightSize(1),
                    borderBottomColor: "#F0F0F0",
                  }}
                >
                  <CText
                    color="black"
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
                marginTop: size.getHeightSize(16),
                padding: size.getHeightSize(12),
                backgroundColor: "#F0F0F0",
                borderRadius: size.getHeightSize(8),
                alignItems: "center",
              }}
            >
              <CText
                color="black"
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

export default AccommodationTypeDropdown;