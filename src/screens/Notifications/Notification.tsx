import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NotificationScreenProps } from '../../types/navigations.types';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import { formatToAmount } from '../../utils/stringManipulation';
const Notification = ({ route: { params } }: NotificationScreenProps) => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Notification
        </CText>
      </GradientHeader>
      <View
        style={{
          marginTop: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <CText fontSize={20} lineHeight={22.4} fontFamily="bold">
          Service Request
        </CText>
        <CText
          fontSize={18}
          style={{ marginTop: size.getHeightSize(8) }}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          View details of your service request below
        </CText>
      </View>

      <View
        style={{
          marginTop: size.getHeightSize(32),
          backgroundColor: colors.white('70'),
          paddingVertical: size.getHeightSize(16),
          marginHorizontal: size.getWidthSize(16),
          borderRadius: size.getWidthSize(8),
          gap: size.getHeightSize(16),
        }}
      >
        <View style={styles.view}>
          <CText
            fontSize={18}
            color="secondaryBlack"
            lineHeight={22.4}
            fontFamily="bold"
          >
            Service Category:
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            {params?.ServiceCategory || 'N/A'}
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Customer request:
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            {params?.CustomerRequest
              ? `₦${formatToAmount(params?.CustomerRequest)}`
              : 'N/A'}
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Approved amount:
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            {params?.ApprovedAmount
              ? `₦${formatToAmount(params?.ApprovedAmount)}`
              : 'N/A'}
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Disbursed amount:
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            {params?.DisbursedAmount
              ? `₦${formatToAmount(params?.DisbursedAmount)}`
              : 'N/A'}
          </CText>
        </View>
        <View style={styles.view}>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="bold"
          >
            User contribution:
          </CText>
          <CText
            color="secondaryBlack"
            fontSize={18}
            lineHeight={22.4}
            fontFamily="semibold"
          >
            {params?.UserContribution
              ? `₦${formatToAmount(params?.UserContribution)}`
              : 'N/A'}
          </CText>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size.getWidthSize(16),
    gap: size.getWidthSize(16),
    justifyContent: 'space-between',
  },
});
