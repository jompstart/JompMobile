import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import InfoIcon from '../../../assets/svgs/support/InfoIcon';
import QAIcon from '../../../assets/svgs/support/QaIcon';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
const Support = () => {
  const { navigate } = useNavigation();
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
          Customer Support
        </CText>
        <View style={styles.view1}>
          <Pressable
            onPress={() => {
              navigate('CustomerSupport');
            }}
            style={styles.view2}
          >
            <SimpleLineIcons
              name="earphones-alt"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
            <CText
              fontSize={14}
              fontFamily="semibold"
              style={{
                flex: 1,
              }}
            >
              Contact Support Via Chat, Email, or Phone
            </CText>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Faqs');
            }}
            style={styles.view2}
          >
            <QAIcon size={size.getHeightSize(24)} />
            <CText
              fontSize={14}
              fontFamily="semibold"
              style={{
                flex: 1,
              }}
            >
              FAQS
            </CText>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </Pressable>
          <View style={styles.view2}>
            <InfoIcon size={size.getHeightSize(24)} />
            <CText
              fontSize={14}
              fontFamily="semibold"
              style={{
                flex: 1,
              }}
            >
              Report a Problem
            </CText>
            <AntDesign
              name="right"
              color={colors.primary()}
              size={size.getHeightSize(20)}
            />
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  view1: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    backgroundColor: colors.white(),
    gap: size.getHeightSize(24),
    marginHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(16),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
  },
});
