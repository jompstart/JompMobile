import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';

const Transaction = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(4),
        paddingVertical: size.getHeightSize(8),
        paddingHorizontal: size.getWidthSize(8),
        backgroundColor: colors.white(),
        borderRadius: size.getHeightSize(8),
      }}
    >
      <CText
        color={'black'}
        fontSize={14}
        lineHeight={22.4}
        fontFamily="regular"
      >
        January
      </CText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(16),
          backgroundColor: colors.appBackground(),
          paddingVertical: size.getHeightSize(8),
          paddingHorizontal: size.getWidthSize(8),
          borderRadius: size.getHeightSize(8),
        }}
      >
        <ProviderIcon size={size.getHeightSize(46)} />
        <View
          style={{
            gap: size.getHeightSize(8),
            flex: 1,
          }}
        >
          <CText
            color={'black'}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
          >
            Transactions
          </CText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: size.getWidthSize(8),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="regular"
            >
              12 Jan, 2025 10:22 AM
            </CText>
            <View
              style={{
                paddingHorizontal: size.getWidthSize(10),
                paddingVertical: size.getHeightSize(3),
                backgroundColor: '#F0756E15',
                borderRadius: size.getHeightSize(9),
              }}
            >
              <CText
                color={'#F0756E' as any}
                fontSize={8}
                lineHeight={11.2}
                fontFamily="semibold"
                style={{
                  opacity: 0.75,
                }}
              >
                Unpaid
              </CText>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(20.5),
            paddingVertical: size.getHeightSize(8),
            backgroundColor: colors.primary(),
            borderRadius: size.getHeightSize(24),
          }}
        >
          <CText
            color={'white'}
            fontSize={12}
            lineHeight={14.4}
            fontFamily="semibold"
          >
            Pay
          </CText>
        </View>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
