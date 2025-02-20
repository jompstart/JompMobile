import { StyleSheet, ScrollView, Image, View } from 'react-native';
import React from 'react';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CheckCircle from '../../../assets/svgs/Onboarding/CheckCircle';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { images } from '../../constants/images';
import AddBankIcon from '../../../assets/svgs/Dashboard/AddBankIcon';
const WithdrawFunds = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
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
        </View>
      </GradientHeader>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <CText
            color={colors.black('70') as any}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
          >
            Withdraw to Your Bank
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            Select bank to withdraw your funds into
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: size.getHeightSize(16),
              rowGap: size.getHeightSize(16),
              columnGap: size.getWidthSize(16),
            }}
          >
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.check1}>
                <View style={styles.check2}>
                  <View style={styles.check3}>
                    <View style={styles.check4} />
                  </View>
                </View>
              </View>
              <View style={styles.imageView}>
                <Image source={images.bankImage} style={styles.image} />
              </View>
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  StanbicIBTC Bank
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Timmy Ajanlekoko
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  101****010
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <AddBankIcon
                style={{
                  alignSelf: 'center',
                }}
                size={size.getHeightSize(80)}
              />
              <View style={styles.view2}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Do you want to add bank?
                </CText>
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="semibold"
                  style={styles.text}
                >
                  Click to Add
                </CText>
              </View>
            </View>
          </View>
          <View style={{ height: size.getHeightSize(24) }} />
          <PTextInput placeholder="₦ Enter Amount" />
        </View>
      </ScrollView>
      <PrimaryButton
        label="Proceed"
        style={{
          marginTop: size.getHeightSize(16),
          marginBottom: size.getHeightSize(32),
          marginHorizontal: size.getWidthSize(16),
        }}
      />
    </GradientSafeAreaView>
  );
};

export default WithdrawFunds;

const styles = StyleSheet.create({
  view1: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(15),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(8),
    width: size.getWidthSize(177),
  },
  check1: {
    position: 'absolute',
    top: size.getHeightSize(10),
    right: size.getWidthSize(10),
  },
  check2: {
    height: size.getHeightSize(20),
    width: size.getHeightSize(20),
    backgroundColor: colors.primary(),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check3: {
    height: size.getHeightSize(15),
    width: size.getHeightSize(15),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white(),
  },
  check4: {
    backgroundColor: colors.primary(),
    height: size.getHeightSize(10),
    width: size.getHeightSize(10),
    borderRadius: '100%',
  },
  imageView: {
    height: size.getHeightSize(75),
    width: size.getHeightSize(75),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  view2: {
    gap: size.getHeightSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
