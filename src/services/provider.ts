import { makeRequest } from '../config/api.config';

export class ProviderService {
  constructor() {}
  async getBanks() {
    return await makeRequest<
      {
        name: string;
        code: string;
        currency: string;
        type: string;
      }[]
    >({
      method: 'GET',
      url: `/get-banks`,
    });
  }
}
