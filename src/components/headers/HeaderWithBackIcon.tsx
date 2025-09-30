import { View, Text, Pressable } from "react-native";
import React from "react";
import GradientHeader from "../../shared/GradientHeader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { size } from "../../config/size";
import CText from "../../shared/CText";
import { useNavigation } from "@react-navigation/native";

interface HeaderWithBackIconProps {
  title: string;
}
const HeaderWithBackIcon = ({ title }: HeaderWithBackIconProps) => {
  const navigation = useNavigation();
  return (
    <GradientHeader>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(20)}
          color="white"
        />
        <CText
          color={"white"}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          {title}
        </CText>
      </Pressable>
    </GradientHeader>
  );
};

export default HeaderWithBackIcon;
