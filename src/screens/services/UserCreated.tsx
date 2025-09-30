import { StyleSheet, Pressable, View, FlatList } from "react-native";
import React from "react";
import { size } from "../../config/size";
import { colors } from "../../constants/colors";
import CText from "../../shared/CText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import HeartIcon from "../../../assets/svgs/Dashboard/HeartIcon";
import CarIcon from "../../../assets/svgs/Home/CarIcon";
import SchoolIcon from "../../../assets/svgs/Home/SchoolIcon";
import PenBookIcon from "../../../assets/svgs/Dashboard/PenBookIcon";
import HouseIcon from "../../../assets/svgs/Loan/HouseIcon";
import { useNavigation } from "@react-navigation/native";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";

// ------------Data ------------

const services = [
  {
    id: "1",
    bg: "#424E9B1A",
    iconBg: "#424E9B4D",
    icon: SchoolIcon,
    title: "School Fees",
    desc: "Get access to school fees for you and your loved ones and pay at your convenience.",
    route: "PayServices",
    isPressable: true,
  },
  {
    id: "2",
    bg: "#0066FF26",
    iconBg: "#0066FF4D",
    icon: HouseIcon,
    title: "House Rent",
    desc: "Sort our your rent with Pay Later with Jomp",
    route: "HouseRentService",
    isPressable: true,
  },
  {
    id: "3",
    bg: "#1B741E26",
    iconBg: "#1B741E4D",
    icon: CarIcon,
    title: "Transport Credit",
    desc: "Access transport services curated just for you with Pay Later with Jomp",
    route: "TransportDetails",
    isPressable: true,
  },
  {
    id: "4",
    bg: "#F8E7EC",
    iconBg: "#F1B7B8",
    icon: HeartIcon,
    title: "Health",
    desc: "Coming soon.",
    route: null,
    isPressable: false,
  },
  {
    id: "5",
    bg: "#ED9F0526",
    iconBg: "#ED9F064D",
    icon: PenBookIcon,
    title: "Other Service Types",
    desc: "Access health, auto care, etc",
    route: "OtherServices",
    isPressable: true,
  },
];

const UserCreated = () => {
  const { navigate } = useNavigation();
  return (
    <GradientSafeAreaView>
      <HeaderWithBackIcon title="Go Back" />

      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
        }}
      >
        <CText
          color={"black"}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          User Created
        </CText>
        <CText
          color={"secondaryBlack"}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
          }}
        >
          Pay for services you have already received or not listed.
        </CText>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
          renderItem={({ item }) => {
            const IconComp = item.icon;
            const Wrapper = item.isPressable ? Pressable : View;

            return (
              <Wrapper
                onPress={
                  item.route ? () => navigate(item.route as never) : undefined
                }
                style={[
                  styles.view,
                  {
                    backgroundColor: item.bg,
                  },
                ]}
              >
                <View
                  style={[
                    styles.view2,
                    {
                      backgroundColor: item.iconBg,
                    },
                  ]}
                >
                  <IconComp size={size.getHeightSize(27)} />
                </View>

                <View
                  style={{
                    flex: 1,
                    gap: size.getHeightSize(6),
                  }}
                >
                  <CText
                    color={"black"}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    {item.title}
                  </CText>
                  <CText
                    color={"secondaryBlack"}
                    fontSize={13}
                    lineHeight={18.2}
                    fontFamily="regular"
                  >
                    {item.desc}
                  </CText>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={size.getHeightSize(20)}
                  color={colors.primary()}
                />
              </Wrapper>
            );
          }}
        />
      </View>
    </GradientSafeAreaView>
  );
};

export default UserCreated;

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.getWidthSize(8),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: "#424E9B10",
    borderRadius: size.getHeightSize(8),
  },
  text: {
    opacity: 0.75,
    marginTop: size.getHeightSize(4),
  },
  view2: {
    backgroundColor: "#F0EDFF",
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: "100%",
  },
});
