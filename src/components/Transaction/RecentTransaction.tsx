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
  const isSuccessStatus = 
    txn.data.transactionStatus.toLowerCase() === 'completed' ||
    txn.data.transactionStatus.toLowerCase() === 'success';

  return (
    <View style={styles.container}>
      <ProviderIcon size={size.getHeightSize(32)} />
      
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <CText
            color={'black'}
            fontSize={13}
            lineHeight={22.4}
            fontFamily="regular"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {txn.data.serviceName}
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={12}
            lineHeight={22.4}
            fontFamily="regular"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {txn.data.description}
          </CText>
        </View>

        <View style={styles.rightContent}>
          <View style={styles.amountDateContainer}>
            <CText
              color={'black'}
              fontSize={12}
              lineHeight={22.4}
              fontFamily="semibold"
              style={styles.amountText}
            >
              ₦{formatToAmount(txn.data.amount)}
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={10}
              lineHeight={22.4}
              fontFamily="regular"
              style={styles.dateText}
            >
              {txn.data.createdAt}
            </CText>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isSuccessStatus 
                  ? colors.primarySuccess('10')
                  : colors.primaryWarning('10'),
                minWidth: size.getWidthSize(70), // Fixed width for alignment
              }
            ]}
          >
            <CText
              color={isSuccessStatus ? 'success' : ('#F0756E' as any)}
              fontSize={8}
              lineHeight={11.2}
              fontFamily="semibold"
              style={styles.statusText}
              numberOfLines={1}
            >
              {txn.data.transactionStatus.toUpperCase()}
            </CText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({
  container: {
    gap: size.getHeightSize(16),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: size.getHeightSize(1),
    borderBottomColor: colors.black('10'),
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
    marginRight: size.getWidthSize(8),
  },
  rightContent: {
    alignItems: 'flex-end',
    minWidth: size.getWidthSize(80), // Ensure consistent width for right side
  },
  amountDateContainer: {
    alignItems: 'flex-end',
    marginBottom: size.getHeightSize(4),
  },
  amountText: {
    textAlign: 'right',
  },
  dateText: {
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: size.getWidthSize(10),
    paddingVertical: size.getHeightSize(3),
    borderRadius: size.getHeightSize(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    opacity: 0.75,
    textAlign: 'center',
  },
});