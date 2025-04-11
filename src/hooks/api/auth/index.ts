import { useQuery } from '@tanstack/react-query';
import { ProviderService } from '../../../services/providers/provider';
export const useGetBanks = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  const getBanks = async () => {
    const response = await providerInstance.getBanks();
    return response;
  };
  return useQuery({
    queryKey: ['getBanks'],
    queryFn: () => getBanks(),
  });
};

export const useGetUserBanks = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  return useQuery({
    queryKey: ['getUserBanks'],
    queryFn: () => providerInstance.getUserBanks(),
  });
};
