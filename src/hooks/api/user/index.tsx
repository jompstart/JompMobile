import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/user';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../controller/redux.controller';
import { userSelector } from '../../../features/user/user.selector';
import { changeUserState } from '../../../features/user/user.slice';

export const useGetUserTransactions = (customerId: string, userId: string) => {
  const userInstance = new UserService(customerId, userId);
  const getUserTransactions = async () => {
    const response = await userInstance.getCustomerTransactions(1, 10);
    return response;
  };
  return useQuery({
    queryKey: ['getUserTransactions'],
    queryFn: () => getUserTransactions(),
  });
};

export const useGetRecentTransactions = (
  customerId: string,
  userId: string
) => {
  const userInstance = new UserService(customerId, userId);
  const getRecentTransactions = async () => {
    const response = await userInstance.getRecentTransactions();
    return response;
  };
  return useQuery({
    queryKey: ['getRecentTransactions'],
    queryFn: () => getRecentTransactions(),
  });
};

export const useGetUnifiedTransactions = (
  startDate: string,
  endDate: string,
  customerId: string,
  userId: string,
  filter?: string
) => {
  const userInstance = new UserService(customerId, userId);
  const getRecentTransactions = async ({
    pageParam = 1,
  }: {
    pageParam: number;
  }) => {
    const response = await userInstance.getUnifiedTransactions({
      page: pageParam,
      size: 10,
      startDate,
      endDate,
      serviceName: filter,
    });
    return {
      data: response.data,
      currentPage: pageParam,
    };
  };
  return useInfiniteQuery({
    queryKey: ['transactions', filter],
    queryFn: ({ pageParam = 1 }) => getRecentTransactions({ pageParam }),
    getNextPageParam: (lastPage) => {
      const pageSize = 10;
      const hasMore = lastPage.data?.length === pageSize;
      return hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    // enabled: Boolean(customerId && userId && startDate && endDate),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRefreschUserData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const userInstance = new UserService(user.customerId, user.userId);

  const updateData = async () => {
    try {
      const user = await userInstance.getCustomer();

      const wallet = await userInstance.getCustomerWallet();

      const userBanks = await userInstance.getUserBankDetails();

      if (userBanks?.data) {
        if (Array.isArray(userBanks.data)) {
          dispatch(
            changeUserState({
              key: 'bankDetails',
              value: userBanks.data,
            })
          );
        } else {
          dispatch(
            changeUserState({
              key: 'bankDetails',
              value: [userBanks.data],
            })
          );
        }
      }
      if (wallet.data) {
        dispatch(
          changeUserState({ key: 'balance', value: wallet.data.balance })
        );
        dispatch(
          changeUserState({
            key: 'ledger',
            value: wallet.data.ledgerBalance,
          })
        );
      }
      if (user.data) {
        dispatch(
          changeUserState({
            key: 'ninStatus',
            value: user.data.ninStatus,
          })
        );
        dispatch(
          changeUserState({
            key: 'email',
            value: user.data.email,
          })
        );
        dispatch(
          changeUserState({
            key: 'fullName',
            value: user.data.fullName,
          })
        );
        dispatch(
          changeUserState({
            key: 'bvnStatus',
            value: user.data.bvnStatus,
          })
        );
        dispatch(
          changeUserState({
            key: 'complianceStatus',
            value: user.data.complianceFlag,
          })
        );
        dispatch(
          changeUserState({
            key: 'niN',
            value: user.data.niN,
          })
        );

        dispatch(
          changeUserState({
            key: 'bvn',
            value: user.data.bvn,
          })
        );
        dispatch(
          changeUserState({
            key: 'phoneNumber',
            value: user.data.phoneNumber,
          })
        );
      }
      return user.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to refresh user data');
    }
  };
  return useQuery({
    queryKey: ['refreschUserData'],
    queryFn: () => updateData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
