import { makeRequest } from '../config/api.config';

export class ProviderService {
  constructor(private userId: string) {}
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
  async validateAcct({
    accountNumber,
    bankCode,
    bankName,
  }: {
    accountNumber: string;
    bankCode: string;
    bankName: string;
  }) {
    return await makeRequest<{
      account_name: string;
      account_number: string;
    }>({
      method: 'POST',
      url: `/validate-account`,
      data: {
        accountNumber,
        bankCode,
        bankName,
      },
    });
  }
  async addBank({
    bankName,
    bankCode,
    accountNumber,
    accountName,
  }: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  }) {
    return await makeRequest({
      method: 'POST',
      url: `/add-bank`,
      data: {
        userId: this.userId,
        bankName,
        bankCode,
        accountNumber,
        accountName,
      },
    });
  }
  async getUserBanks() {
    return await makeRequest<
      {
        bankName: string;
        bankCode: string;
        accountNumber: string;
        accountName: string;
      }[]
    >({
      method: 'GET',
      url: `/get-bank/${this.userId}`,
    });
  }
}
