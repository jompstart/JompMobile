import { makeRequest } from '../config/api.config';
import {
  GetCustomerDto,
  GetWalletResponseDto,
  OrderResponseDto,
  TransactionDto,
} from './dto/user.dto';

export class UserService {
  private userId = '';
  private customerId = '';
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
    console.log(this.userId);
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
      url: `/transactions?customerId=${this.customerId}&page=${page}&size=${size}`,
    });
  }
}
