import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import HouseIcon from '../../../assets/svgs/Home/HouseIcon';
import BankIcon from '../../../assets/svgs/Home/BankIcon';
import Feather from '@expo/vector-icons/Feather';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import TransactionsIcon from '../../../assets/svgs/Home/TransactionsIcon';
import OrderIcon from '../../../assets/svgs/Home/OrderIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import PersonIcon from '../../../assets/svgs/Dashboard/PersonIcon';
const WalletAccountDetails = () => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={false}
      onClose={() => {}}
    >
      <CancelIcon
        style={{
          alignSelf: 'flex-end',
          marginTop: size.getHeightSize(12),
        }}
        size={size.getHeightSize(24)}
      />
      <CText
        color={'secondaryBlack'}
        fontSize={18}
        lineHeight={28.8}
        fontFamily="bold"
      >
        Wallet Account Details
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
      >
        View your account number and details
      </CText>
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(16),
          backgroundColor: colors.white(),
          borderRadius: size.getHeightSize(8),
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(16),
          marginBottom: size.getHeightSize(32),
        }}
      >
        <View style={styles.view}>
          <View style={styles.view2}>
            <BankIcon size={size.getHeightSize(27)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Bank Name
            </CText>
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              First City Monument Bank
            </CText>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.view2}>
            <PersonIcon size={size.getHeightSize(27)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Account Name
            </CText>
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              Timmy Ajanlekoko
            </CText>
          </View>
        </View>
        <View style={styles.view}>
          <ProviderIcon size={size.getHeightSize(46)} />
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Bank Account Number
            </CText>
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              1234567890
            </CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: size.getWidthSize(4),
            }}
          >
            <Feather
              color={colors.primary()}
              name="copy"
              size={size.getHeightSize(16)}
            />
            <CText
              color={'primaryColor'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="bold"
            >
              Copy
            </CText>
          </View>
        </View>
      </View>
    </BottomsheetWrapper>
  );
};

export default WalletAccountDetails;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    borderBottomWidth: size.getHeightSize(1),
    paddingBottom: size.getHeightSize(8),
    borderColor: '#31005C1A',
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
  },
});
