import { makeRequest } from '../config/api.config';
import { CustomerUserRequest, ProviderUserRequest } from '../models/auth';
import { UserAccountPreference } from '../models/user';

export class AuthService {
  constructor() {}
  async signup(
    accountType: UserAccountPreference,
    data: ProviderUserRequest | CustomerUserRequest
  ) {
    const path =
      accountType === 'provider' ? '/create-vendor' : '/create-customer';
    return await makeRequest<{ otp: string }>({
      method: 'POST',
      url: path,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async validateEmail(email: string) {
    return await makeRequest({
      method: 'POST',
      url: '/validate-email',
      data: { emailAddress: email },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async resendOTP(email: string) {
    return await makeRequest<{ otp: string }>({
      method: 'POST',
      url: '/resend-otp',
      data: { email: email },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async verifyOTP(email: string, otp: string) {
    return await makeRequest({
      method: 'POST',
      url: '/otp-verification',
      data: { email, otp },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(email: string, password: string) {
    return await makeRequest({
      method: 'POST',
      url: '/user-login',
      data: { email, password },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
