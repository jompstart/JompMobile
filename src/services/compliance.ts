import { makeRequest } from '../config/api.config';
import { CustomerVerificationType } from '../types/verification.type';

export class ComplianceService {
  private userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  async verifyCustomer(
    verificationType: CustomerVerificationType,
    verification: string
  ) {
    const path =
      verificationType === 'nin'
        ? `/nin-verification?Nin=${verification}&UserId=${this.userId}`
        : `/bvn-verification?bvn=${verification}&UserId=${this.userId}`;
    const body =
      verificationType === 'nin'
        ? { Nin: verification }
        : { bvn: verification };
    return await makeRequest({
      method: 'POST',
      url: `${path}`,
      data: {},
    });
  }
}
