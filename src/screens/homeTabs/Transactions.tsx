import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import PersonIcon from '../../../assets/svgs/Services/PersonIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import ArrowRightIcon from '../../../assets/svgs/Services/ArrowRightIcon';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  useGetUnifiedTransactions,
  useGetUserTransactions,
} from '../../hooks/api/user';
import {
  TransactionResponseDto,
  UnifiedTransactionDto,
  UnifiedTransactionResponseDto,
} from '../../services/dto/user.dto';
import { UserService } from '../../services/user';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../types';
import { updateToast } from '../../features/ui/ui.slice';
const Transactions = () => {
  const user = useAppSelector(userSelector);
  const { dispatch } = useNavigation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetUnifiedTransactions(
      '2025-01-08T11:50:25.729Z',
      new Date().toISOString(),
      user.customerId,
      user.userId
    );

  const transactions = data?.pages.flatMap((page) => page.data) || [];
  console.log('txn22', transactions);
  const stateDispatch = useAppDispatch();

  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon
          onPress={() => {
            dispatch(DrawerActions.openDrawer());
          }}
          size={size.getHeightSize(28)}
        />
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
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(4),
          marginHorizontal: size.getWidthSize(16),
          marginBottom: size.getHeightSize(16),
          backgroundColor: colors.idle('10'),
          width: size.getWidthSize(90),
          paddingHorizontal: size.getWidthSize(8),
          paddingVertical: size.getHeightSize(8),
          borderRadius: size.getHeightSize(8),
        }}
      >
        <CText fontFamily="semibold" fontSize={14} color="secondaryBlack">
          Filter By
        </CText>
        <MaterialIcons
          color={colors.primary()}
          name="arrow-drop-down"
          size={size.getHeightSize(20)}
        />
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        onEndReachedThreshold={0.5} // Trigger when 50% away from the bottom
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator color={colors.primary()} size="small" />
          ) : null
        }
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListEmptyComponent={() => {
          return <></>;
        }}
        renderItem={({ item, index }) => (
          <Transaction
            totalAmount={item?.amount!}
            dateInitiated={item?.createdAt!}
            id={item?.id!}
            serviceName={item?.description!}
            currentPaymentStatus={item?.status! as any}
            dateCompleted={item?.createdAt!}
            key={index}
            customerId={user.customerId}
            isCompleted={true}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
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
