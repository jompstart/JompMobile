import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GradientHeader from './GradientHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from './CText';
import { size } from '../config/size';
import Feather from '@expo/vector-icons/Feather';
import GradientSafeAreaView from './GradientSafeAreaView';
import { colors } from '../constants/colors';
import PrimaryButton from './PrimaryButton';
const PreviewRequest = () => {
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
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
          style={{
            opacity: 0.75,
          }}
        >
          School Fees Request Review
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
            marginBottom: size.getHeightSize(24),
          }}
        >
          Showing Service Full Details.
        </CText>
        <View
          style={{
            backgroundColor: colors.white(),
            paddingVertical: size.getHeightSize(8),
            paddingHorizontal: size.getWidthSize(8),
            borderRadius: size.getHeightSize(8),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="bold"
            >
              Transport Credit Request
            </CText>
            <Feather
              name="edit"
              size={size.getHeightSize(16)}
              color={colors.primary()}
            />
          </View>
          <View
            style={{
              gap: size.getHeightSize(24),
              marginTop: size.getHeightSize(16),
            }}
          >
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Title
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  My New Savings
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Goal
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  ₦400,000.00
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Duration
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  3 Months
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  How will you like to save?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Daily
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Preferred Amount to Save on a Basis
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  ₦5,000.00
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Do You Want to Enable Auto Savings?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Yes
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Source of Funding
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  My Wallet
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Auto Withdrawal at The End of Your Savings Duration?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Yes
                </CText>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      />
      <PrimaryButton
        label="Submit"
        style={{
          marginHorizontal: size.getWidthSize(16),
          marginBottom: size.getHeightSize(40),
        }}
      />
    </GradientSafeAreaView>
  );
};

export default PreviewRequest;

const styles = StyleSheet.create({
  text: {
    letterSpacing: size.getWidthSize(0.2),
  },
  view: {
    gap: size.getWidthSize(8),
    flex: 1,
  },
  view1: {
    flexDirection: 'row',
    gap: size.getWidthSize(8),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white(),
    marginHorizontal: size.getWidthSize(16),

    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    gap: size.getWidthSize(16),
    borderRadius: size.getHeightSize(8),
  },
  view3: {
    height: size.getHeightSize(24),
    width: size.getHeightSize(24),
    borderWidth: size.getHeightSize(1.38),
    borderColor: colors.primary(),
    borderRadius: size.getHeightSize(4),
  },
});
