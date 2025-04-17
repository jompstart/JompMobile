import { StyleSheet, View, Linking, Pressable } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import PhoneIcon from '../../../assets/svgs/Dashboard/PhoneIcon';
const CustomerSupport = () => {
  const phoneNumber = '+2347037915152';
  const email = 'support@jompstart.com';
  const handleCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((e) => {
      console.log('Error', 'Unable to open the phone dialer.', e);
    });
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    Linking.openURL(url).catch((e) => {
      console.log('Error', 'Unable to open WhatsApp.', e);
    });
  };

  const handleEmail = () => {
    const url = `mailto:${email}`;
    Linking.openURL(url).catch((e) => {
      console.log('Error', 'Unable to open the email client.', e);
    });
  };
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
          color="white"
        />
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Go Back
        </CText>
      </GradientHeader>
      <View>
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            paddingHorizontal: size.getWidthSize(16),
            paddingTop: size.getHeightSize(16),
          }}
        >
          Contact Support Via Chat, Email, or Phone
        </CText>
        <View style={styles.view1}>
          <Pressable onPress={handleCall} style={styles.view2}>
            <PhoneIcon size={size.getHeightSize(24)} color={colors.primary()} />
            <View
              style={{
                flex: 1,
              }}
            >
              <CText fontSize={14} fontFamily="semibold">
                {phoneNumber}
              </CText>
              <CText fontSize={14} color="secondaryBlack" fontFamily="regular">
                Call
              </CText>
            </View>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </Pressable>
          <Pressable onPress={handleWhatsApp} style={styles.view2}>
            <FontAwesome
              name="whatsapp"
              color={colors.primary()}
              size={size.getHeightSize(24)}
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <CText fontSize={14} fontFamily="semibold">
                {phoneNumber}
              </CText>
              <CText fontSize={14} color="secondaryBlack" fontFamily="regular">
                Whatsapp
              </CText>
            </View>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </Pressable>
          <Pressable onPress={handleEmail} style={styles.view2}>
            <MaterialCommunityIcons
              name="email-outline"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <CText fontSize={14} fontFamily="semibold">
                support@jompstart.com
              </CText>
              <CText fontSize={14} color="secondaryBlack" fontFamily="regular">
                Email
              </CText>
            </View>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </Pressable>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  view1: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),

    gap: size.getHeightSize(16),

    marginTop: size.getHeightSize(16),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(12),
    borderRadius: size.getHeightSize(8),
  },
});
