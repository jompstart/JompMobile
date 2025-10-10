import { makeRequest } from '../config/api.config';
import { CustomerVerificationType } from '../types/verification.type';
import { UserService } from './user';

export class ComplianceService extends UserService {
  constructor(userId: string, customerId: string) {
    super(customerId, userId);
  }

  async validateCustomerCompliance(
    verificationType: CustomerVerificationType,
    verification: string,
    phoneNumber: string
  ) {
    const path =
      verificationType === 'nin'
        ? `/nin-verification?Nin=${verification}&UserId=${this.customerId}`
        : `/bvn-verification?bvn=${verification}&UserId=${this.customerId}`;
    const body =
      verificationType === 'nin'
        ? { Nin: verification, phoneNumber }
        : { bvn: verification, phoneNumber };
    return await makeRequest({
      method: 'POST',
      url: path,
      data: body,
    });
  }

  async verifyCustomer(
    verificationType: CustomerVerificationType,
    VerificationStatus: string,
    IdentificationNumber: string,
    IdentificationType: string,
    FullName: string,
    file: any,
    PhoneNumber: string
  ) {
    const formData = new FormData();
    formData.append('CustomerId', this.customerId);
    formData.append('VerificationStatus', VerificationStatus || 'pending');
    formData.append('IdentificationNumber', IdentificationNumber);
    formData.append('IdentificationType', IdentificationType);
    formData.append('FullName', FullName || 'N/A');
    formData.append('PhoneNumber', PhoneNumber);
    if (file) formData.append('file', file);

    return await makeRequest({
      method: 'POST',
      url: '/verify-customer',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
}