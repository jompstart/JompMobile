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
  });
};
