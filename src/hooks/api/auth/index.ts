import { useQuery } from '@tanstack/react-query';
import { ProviderService } from '../../../services/providers/provider';
import { useState, useEffect, useCallback } from 'react';

const generateIdempotencyKey = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useGetIdempotencyKey = () => {
  const [idempotencyKey, setIdempotencyKey] = useState<string >('');

  // Generate and set a new idempotency key
  const regenerateKey = useCallback(() => {
    const newKey = generateIdempotencyKey();
    setIdempotencyKey(newKey);
  }, []);

  useEffect(() => {
    // Generate the initial key
    regenerateKey();

    // Timer to regenerate the key every 30 seconds
    const interval = setInterval(() => {
      regenerateKey();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [regenerateKey]);

  return idempotencyKey;
};
export const useGetUserBanks = (userId: string, customerId: string) => {
  const providerInstance = new ProviderService(userId, customerId);
  return useQuery({
    queryKey: ['getUserBanks'],
    queryFn: () => providerInstance.getUserBanks(),
  });
};
