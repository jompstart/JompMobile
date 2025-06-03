import { useQuery } from '@tanstack/react-query';
import { ProviderService } from '../../../services/providers/provider';

export const useGetUserServices = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getUserServices = async () => {
    const response = await providerInstance.getUserServices();
    return response;
  };
  return useQuery({
    queryKey: ['getUserServices'],
    queryFn: () => getUserServices(),
    refetchOnWindowFocus: false,
  });
};

export const useGetServiceCategories = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getServiceCategories = async () => {
    const response = await providerInstance.getServiceCategories();
    return response;
  };
  return useQuery({
    queryKey: ['getServiceCategories'],
    queryFn: () => getServiceCategories(),
    refetchOnWindowFocus: false,
  });
};

export const useGetPaymentMethods = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getPaymentMethods = async () => {
    const response = await providerInstance.getPaymentMethods();
    return response;
  };
  return useQuery({
    queryKey: ['getPaymentMethods'],
    queryFn: () => getPaymentMethods(),
    refetchOnWindowFocus: false,
  });
};
