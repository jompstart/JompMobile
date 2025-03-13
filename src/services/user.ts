import { makeRequest } from '../config/api.config';

export class UserService {
  private userId = '';
  constructor(userId: string) {
    this.userId = userId;
  }

  async getCustomer() {
    console.log(`get-customer?${this.userId}`);
    return await makeRequest<{
      bvnStatus: string;
      complianceFlag: boolean;
      email: string;
      fullName: string;
      ninStatus: string;
      niN?: string;
      bvn?: string;
      phoneNumber?: string;
    }>({
      method: 'GET',
      url: `/get-customer?customerId=${this.userId}`,
    });
  }
}
