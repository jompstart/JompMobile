import { makeRequest } from '../config/api.config';
import { AddBankDto } from '../interface/provider';
import { BankDetails } from '../models/user';
import {
  DeleteAccountDto,
  GetCustomerDto,
  GetWalletResponseDto,
  OrderResponseDto,
  RecentTransactionDto,
  TransactionDto,
  TransactionResponseDto,
} from './dto/user.dto';

export class UserService {
  protected userId = '';
  protected customerId = '';
  constructor(customerId: string, userId: string) {
    this.customerId = customerId;
    this.userId = userId;
  }

  async getCustomer() {
    return await makeRequest<GetCustomerDto>({
      method: 'GET',
      url: `/get-customer?customerId=${this.customerId}`,
    });
  }

  async getCustomerWallet() {
    return await makeRequest<GetWalletResponseDto>({
      method: 'GET',
      url: `/wallet-balance/${this.userId}`,
    });
  }
  async getCustomerOrders(page: number, size: number) {
    return await makeRequest<OrderResponseDto>({
      method: 'GET',
      url: `/essential-services?page=${page}&size=${size}`,
    });
  }
  async getCustomerTransactions(page: number, size: number) {
    return await makeRequest<TransactionDto>({
      method: 'GET',
      url: `/transactions?customerId=${this.userId}&page=${page}&pageSize=${size}`,
    });
  }
  async addBankAccount(data: AddBankDto) {
    return await makeRequest({
      method: 'POST',
      url: `/add-bank`,
      data: {
        ...data,
        userId: this.userId,
      },
    });
  }
  async getUserBanks() {
    return await makeRequest({
      method: 'GET',
      url: `/get-banks?userId=${this.userId}`,
    });
  }

  async getUserBankDetails() {
    return await makeRequest<BankDetails>({
      method: 'GET',
      url: `/get-bank-details?userId=${this.userId}`,
    });
  }

  async deleteAccount(data: DeleteAccountDto) {
    let formData = new FormData();
    formData.append('CustomerId', this.customerId);
    formData.append('Reason', data.reason);
    formData.append('Description', data.description);

    return await makeRequest({
      method: 'POST',
      url: `/delete-account`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }

  async getTransactions() {
    return await makeRequest({
      method: 'GET',
      url: `/transactions?customerId=${this.customerId}`,
    });
  }
  async getRecentTransactions() {
    return await makeRequest<RecentTransactionDto[]>({
      method: 'POST',
      url: `/customer-transaction-recent/${this.customerId}?page=1&pageSize=5`,
    });
  }
}
