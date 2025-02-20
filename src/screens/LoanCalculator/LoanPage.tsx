import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { colors } from '../../constants/colors';
import SchoolIcon from '../../../assets/svgs/Home/SchoolIcon';
import CarIcon from '../../../assets/svgs/Home/CarIcon';
import HouseIcon from '../../../assets/svgs/Loan/HouseIcon';
const LoanPage = () => {
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
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <CText
          fontSize={16}
          lineHeight={22}
          fontFamily="semibold"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(16),
          }}
        >
          Loan Calculator
        </CText>
        <CText
          color="secondaryBlack"
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(4),
          }}
        >
          Calculate how much we are likely to give you as a loan.
        </CText>
        <View
          style={{
            backgroundColor: '#876DFF',
            paddingVertical: size.getHeightSize(16),
            borderRadius: size.getHeightSize(8),
            gap: size.getHeightSize(8),
            marginTop: size.getHeightSize(16),
          }}
        >
          <CText
            color="white"
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            Loan Calculator
          </CText>
          <CText
            color="white"
            fontSize={24}
            lineHeight={38.4}
            fontFamily="bold"
            style={{
              textAlign: 'center',
              marginTop: size.getHeightSize(16),
            }}
          >
            ₦ 500,000.00
          </CText>
        </View>
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.white(),
              marginTop: size.getHeightSize(16),
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#424E9B30',
              },
            ]}
          >
            <SchoolIcon size={size.getHeightSize(32)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(4),
            }}
          >
            <CText
              color={colors.black('70') as any}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="bold"
            >
              School Fees
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
            >
              Estimate loan for school fees
            </CText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: size.getHeightSize(16),
            columnGap: size.getWidthSize(16),
            marginTop: size.getHeightSize(16),
          }}
        >
          <View style={styles.view1}>
            <View
              style={[
                styles.view4,
                {
                  backgroundColor: '#F055424D',
                },
              ]}
            >
              <CarIcon size={size.getHeightSize(27)} />
            </View>
            <View style={styles.view3}>
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
                style={styles.text}
              >
                Transport Credit
              </CText>

              <CText
                color={colors.black('70') as any}
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
                style={styles.text}
              >
                Estimate loan for transportation
              </CText>
            </View>
          </View>
          <View style={styles.view1}>
            <View
              style={[
                styles.view4,
                {
                  backgroundColor: '#0066FF4D',
                },
              ]}
            >
              <HouseIcon size={size.getHeightSize(27)} />
            </View>
            <View style={styles.view3}>
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={22.4}
                fontFamily="bold"
                style={styles.text}
              >
                House Rent
              </CText>

              <CText
                color={colors.black('70') as any}
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
                style={styles.text}
              >
                Estimate loan for house rent
              </CText>
            </View>
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default LoanPage;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
  },
  text: {
    textAlign: 'center',
  },
  view1: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(15),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(8),
    width: size.getWidthSize(177),
  },
  view3: {
    gap: size.getHeightSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  view4: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
    alignSelf: 'center',
  },
});
