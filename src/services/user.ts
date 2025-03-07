import { makeRequest } from '../config/api.config';

export class UserService {
  private userId = '';
  constructor(userId: string) {
    this.userId = userId;
  }

  async getCustomer() {
    console.log(`get-customer?${this.userId}`);
    return await makeRequest({
      method: 'GET',
      url: `/get-customer?${this.userId}`,
    });
  }
}
