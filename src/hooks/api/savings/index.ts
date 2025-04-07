import { useQuery } from '@tanstack/react-query';
import { SavingsService } from '../../../services/savings/savings';

export const useGetSavingsCategories = (userId: string, customerId: string) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getSavingsCategories = async () => {
    const response = await savingsInstance.getSavingsCategories();
    return response;
  };
  return useQuery({
    queryKey: ['getSavingsCategories'],
    queryFn: () => getSavingsCategories(),
  });
};

export const useGetSavingsFundsSource = (
  userId: string,
  customerId: string
) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getSourceFunds = async () => {
    const response = await savingsInstance.getSavingsSource();
    return response;
  };
  return useQuery({
    queryKey: ['getSourceFunds'],
    queryFn: () => getSourceFunds(),
  });
};

export const useGetSavingsTypes = (userId: string, customerId: string) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getSavingsTypes = async () => {
    const response = await savingsInstance.getSavingsTypes();
    return response;
  };
  return useQuery({
    queryKey: ['getSavingsTypes'],
    queryFn: () => getSavingsTypes(),
  });
};

export const useGetTotalSavings = (userId: string, customerId: string) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getTotalSavings = async () => {
    const response = await savingsInstance.getTotalSavings();
    return response;
  };
  return useQuery({
    queryKey: ['getTotalSavings'],
    queryFn: () => getTotalSavings(),
  });
};

export const useGetAccruedInterest = (userId: string, customerId: string) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getAccruedInterest = async () => {
    const response = await savingsInstance.getAccruedInterest();
    return response;
  };
  return useQuery({
    queryKey: ['getAccruedInterest'],
    queryFn: () => getAccruedInterest(),
  });
};

export const useGetUserSavings = (userId: string, customerId: string) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getUserSavings = async () => {
    const response = await savingsInstance.getCustomerSavings();
    return response;
  };
  return useQuery({
    queryKey: ['getUserSavings'],
    queryFn: () => getUserSavings(),
  });
};

export const useGetUserSavingsById = (
  userId: string,
  customerId: string,
  goalId: string
) => {
  const savingsInstance = new SavingsService(userId, customerId);
  const getUserSavingsById = async () => {
    const response = await savingsInstance.getCustomerSavingsById(goalId);
    return response;
  };
  return useQuery({
    queryKey: ['getUserSavingsById', goalId],
    queryFn: () => getUserSavingsById(),
  });
};
