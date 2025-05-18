import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { UserService } from '../../../services/user';

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
