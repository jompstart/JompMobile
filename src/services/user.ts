import { makeRequest } from '../config/api.config';
import { GetCustomerDto, GetWalletResponseDto } from './dto/user.dto';

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
}
