import { useQuery } from '@tanstack/react-query';
import { ProviderService } from '../../../services/provider';
export const useGetBanks = (userId: string) => {
  const providerInstance = new ProviderService(userId);
  const getBanks = async () => {
    const response = await providerInstance.getBanks();
    return response;
  };
  return useQuery({
    queryKey: ['getBanks'],
    queryFn: () => getBanks(),
  });
};

export const useGetUserBanks = (userId: string) => {
  const providerInstance = new ProviderService(userId);
  return useQuery({
    queryKey: ['getUserBanks'],
    queryFn: () => providerInstance.getUserBanks(),
  });
};
