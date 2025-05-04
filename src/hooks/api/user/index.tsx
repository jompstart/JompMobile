import { useQuery } from '@tanstack/react-query';
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
