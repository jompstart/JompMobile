import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import GradientSafeAreaView from "../../shared/GradientSafeAreaView";
import { size } from "../../config/size";
import CText from "../../shared/CText";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import PersonIcon from "../../../assets/svgs/Services/PersonIcon";
import ProviderIcon from "../../../assets/svgs/Services/ProviderIcon";
import OrderBooks from "../../../assets/svgs/Services/OrderBooks";
import ArrowRightIcon from "../../../assets/svgs/Services/ArrowRightIcon";

import { colors } from "../../constants/colors";
import HeaderWithBackIcon from "../../components/headers/HeaderWithBackIcon";
const CreateServices = () => {
  const { navigate, dispatch } = useNavigation();

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
          Services
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
          View the services you clicked on the links
        </CText>
        <View
          style={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              navigate("UserCreated");
            }}
            style={styles.view}
          >
            <PersonIcon size={size.getHeightSize(46)} />
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
                User Created
              </CText>
              <CText
                color={"secondaryBlack"}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Select from our wide range of offerings.
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </Pressable>
          <View
            style={[
              styles.view,
              {
                backgroundColor: colors.white(),
              },
            ]}
          >
            <ProviderIcon size={size.getHeightSize(46)} />
            <View
              style={{
                flex: 1,
                gap: size.getHeightSize(6),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <CText
                  color={"black"}
                  fontSize={16}
                  lineHeight={22.4}
                  fontFamily="bold"
                >
                  Provider Created
                </CText>
                <Text style={{ fontSize: 12 }}> (Coming soon)</Text>
              </View>
              <CText
                color={"secondaryBlack"}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Pay later with Jomp for everyday services you already use
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </View>
          <View
            style={[
              styles.view,
              {
                backgroundColor: "#ED9F0510",
              },
            ]}
          >
            <OrderBooks size={size.getHeightSize(46)} />
            <View
              style={{
                flex: 1,
                gap: size.getHeightSize(6),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <CText
                  color={"black"}
                  fontSize={16}
                  lineHeight={22.4}
                  fontFamily="bold"
                >
                  Jomp Curated
                </CText>
                <Text style={{ fontSize: 12 }}> (Coming soon)</Text>
              </View>

              <CText
                color={"secondaryBlack"}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Access Jomp-specially curated services at great discounts.
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default CreateServices;

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
});
