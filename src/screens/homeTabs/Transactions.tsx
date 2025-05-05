import { StyleSheet, Text, FlatList, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import PersonIcon from '../../../assets/svgs/Services/PersonIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import ArrowRightIcon from '../../../assets/svgs/Services/ArrowRightIcon';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetUserTransactions } from '../../hooks/api/user';
import { TransactionResponseDto } from '../../services/dto/user.dto';
const Transactions = () => {
  const user = useAppSelector(userSelector);

  const { data: transactions } = useGetUserTransactions(
    user.customerId,
    user.userId
  );

  console.log('transactions', transactions?.data?.data);
  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon size={size.getHeightSize(28)} />
        <View style={{ flex: 1 }} />
        <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} />
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
          Transactions
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
          View all your transactions here
        </CText>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions?.data?.data}
        renderItem={({ item, index }) => (
          <Transaction
            totalAmount={item.totalAmount}
            dateInitiated={item.dateInitiated}
            id={item.id}
            serviceName={item.serviceName}
            currentPaymentStatus={item.currentPaymentStatus}
            dateCompleted={item.dateCompleted}
            key={index}
            customerId={item.customerId}
            isCompleted={item.isCompleted}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
          paddingBottom: size.getHeightSize(16),
        }}
      />
      {/* <ScrollView>
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
            Transactions
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
            View all your transactions here
          </CText>
        </View>
        <View
          style={{
            gap: size.getHeightSize(16),
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </View>
      </ScrollView> */}
    </GradientSafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
