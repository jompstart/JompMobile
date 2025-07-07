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

export const useGetServiceDetails = (
  userId: string,
  customerId: string,
  serviceId: string,
  servceType: string
) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getServiceDetails = async () => {
    const response = await providerInstance.getSingleServiceDetails(
      serviceId,
      servceType
    );
    return response;
  };
  return useQuery({
    queryKey: ['getServiceDetails', serviceId],
    queryFn: () => getServiceDetails(),
    refetchOnWindowFocus: false,
    enabled: !!serviceId && !!servceType,
  });
};

export const useGetPendingServices = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getPendingServices = async () => {
    const response = await providerInstance.getPendingTransactions();
    return response;
  };
  return useQuery({
    queryKey: ['getPendingServices', userId, customerId],
    queryFn: () => getPendingServices(),
    refetchOnWindowFocus: false,
  });
};

export const useGetPaymentTerms = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getPaymentTerms = async () => {
    const [
      paymentTerms,
      paymentMethod,
      serviceCategory,
      interestRate,
      processingFee,
    ] = await Promise.all([
      providerInstance.getPaymentTerms(),
      providerInstance.getPaymentMethods(),
      providerInstance.getServiceCategories(),
      providerInstance.getInterestRate(),
      providerInstance.getProcessingFee(),
    ]);
    return {
      paymentTerms: paymentTerms.data,
      paymentMethod: paymentMethod.data,
      serviceCategory: serviceCategory.data,
      interestRate: interestRate.data,
      processingFee: processingFee.data,
    };
  };
  return useQuery({
    queryKey: ['getPaymentTerms'],
    queryFn: () => getPaymentTerms(),
    refetchOnWindowFocus: false,
  });
};

export const useGetPaymentBreakdown = (
  userId: string,
  customerId: string,
  months: string | undefined,
  amount: string | undefined
) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getPaymentBreakdown = async () => {
    const response = await providerInstance.getPaymentBreakdown(
      months!,
      amount!
    );
    return response;
  };
  return useQuery({
    queryKey: ['getPaymentBreakdown', amount, months],
    queryFn: () => getPaymentBreakdown(),
    refetchOnWindowFocus: false,
    enabled: !!amount && !!months,
  });
};
