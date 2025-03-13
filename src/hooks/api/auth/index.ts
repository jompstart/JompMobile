import { useQuery } from '@tanstack/react-query';
import { ProviderService } from '../../../services/provider';
export const useGetBanks = () => {
  const providerInstance = new ProviderService();
  const getBanks = async () => {
    const response = await providerInstance.getBanks();
    return response;
  };
  return useQuery({
    queryKey: ['getBanks'],
    queryFn: () => getBanks(),
  });
};
