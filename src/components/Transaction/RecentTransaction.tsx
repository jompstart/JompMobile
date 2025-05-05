import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import { RecentTransactionDto } from '../../services/dto/user.dto';
import { formatToAmount } from '../../utils/stringManipulation';

interface Props {
  data: RecentTransactionDto;
}
const RecentTransaction = (txn: Props) => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
        paddingVertical: size.getHeightSize(8),
        paddingHorizontal: size.getWidthSize(8),
        backgroundColor: colors.white(),
        borderRadius: size.getHeightSize(8),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: size.getHeightSize(1),
        borderBottomColor: colors.black('10'),
      }}
    >
      <ProviderIcon size={size.getHeightSize(32)} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          flex: 1,
          gap: size.getWidthSize(8),
        }}
      >
        <View>
          <CText
            color={'black'}
            fontSize={13}
            lineHeight={22.4}
            fontFamily="regular"
          >
            {txn.data.serviceName}
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={12}
            lineHeight={22.4}
            fontFamily="regular"
          >
            {txn.data.description}
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(10),
            paddingVertical: size.getHeightSize(3),
            backgroundColor:
              txn.data.transactionStatus == 'Completed'
                ? colors.primarySuccess('10')
                : colors.primaryWarning('10'),
            borderRadius: size.getHeightSize(9),
          }}
        >
          <CText
            color={
              txn.data.transactionStatus == 'Completed'
                ? 'success'
                : ('#F0756E' as any)
            }
            fontSize={8}
            lineHeight={11.2}
            fontFamily="semibold"
            style={{
              opacity: 0.75,
            }}
          >
            {txn.data.transactionStatus}
          </CText>
        </View>
      </View>

      <View style={{}}>
        <CText
          color={'black'}
          fontSize={12}
          lineHeight={22.4}
          fontFamily="semibold"
          style={{
            textAlign: 'right',
          }}
        >
          ₦{formatToAmount(txn.data.amount)}
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={10}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'right',
          }}
        >
          {txn.data.createdAt}
        </CText>
      </View>
    </View>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({});
