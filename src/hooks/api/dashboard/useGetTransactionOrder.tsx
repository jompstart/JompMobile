import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../controller/redux.controller';
import { userSelector } from '../../../features/user/user.selector';
import { UserService } from '../../../services/user';
import { changeUserState } from '../../../features/user/user.slice';

const useGetTransactionOrder = () => {
  const user = useAppSelector(userSelector);
  const [isLoading, setIsOrderLoading] = useState(false);
  const userInstance = new UserService(user.customerId, user.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      setIsOrderLoading(true);
      try {
        const [userOrders, userTransaction] = await Promise.all([
          userInstance.getCustomerOrders(1, 10),
          userInstance.getCustomerTransactions(1, 10),
        ]);
        if (userOrders.data && userTransaction.data) {
          dispatch(
            changeUserState({
              key: 'totalOrders',
              value: userOrders.data.totalItems,
            })
          );
          dispatch(
            changeUserState({
              key: 'totalTransactions',
              value: userTransaction.data.totalItems,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching order and transaction data:', error);
      } finally {
        setIsOrderLoading(false);
      }
    })();
  }, []);
  return { isLoading };
};

export default useGetTransactionOrder;

const styles = StyleSheet.create({});
