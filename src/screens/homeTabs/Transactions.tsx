import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import FilterTransactionBottomsheet from '../../components/Transaction/FilterTransactionBottomsheet';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  useGetUnifiedTransactions,
  useGetUserTransactions,
} from '../../hooks/api/user';

const Transactions = () => {
  const user = useAppSelector(userSelector);
  const { dispatch } = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedfilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetUnifiedTransactions(
      '2025-01-08T11:50:25.729Z',
      new Date().toISOString(),
      user.customerId,
      user.userId,
      searchQuery == 'All' ? undefined : searchQuery
    );

  const transactions = data?.pages.flatMap((page) => page.data) || [];

  const categories = [
    {
      name: 'All',
      serachQuery: 'All',
    },
    {
      name: 'Fund Wallet',
      serachQuery: 'Fund wallet',
    },
    {
      name: 'Savings',
      serachQuery: 'Savings',
    },
    {
      name: 'Accrued Interest',
      serachQuery: 'AccruedInterest',
    },
  ];

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
        {/* <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} /> */}
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
      <Pressable onPress={() => setShowFilter(true)} style={styles.view}>
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

      <FilterTransactionBottomsheet
        visibility={showFilter}
        onClose={() => setShowFilter(false)}
        categories={categories.map((category) => category.name)}
        selectedCategory={selectedfilter}
        onSelect={(f) => {
          const selectedCategory = categories.find(
            (category) => category.name === f
          );
          setSearchQuery(selectedCategory?.serachQuery!);
          setSelectedFilter(f);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  view: {
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
  },
});
