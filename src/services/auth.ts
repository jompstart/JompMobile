import { makeRequest } from '../config/api.config';
import { CustomerUserRequest, ProviderUserRequest } from '../models/auth';
import { UserAccountPreference } from '../models/user';

export class Auth {
  constructor() {}
  async signup(
    accountType: UserAccountPreference,
    data: ProviderUserRequest | CustomerUserRequest
  ) {
    const path =
      accountType === 'provider' ? '/create-vendor' : '/create-customer';
    return await makeRequest({
      method: 'POST',
      url: path,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async getOtp(email: string) {
    return await makeRequest({
      method: 'POST',
      url: '/validate-email',
      data: { emailAddress: email },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
