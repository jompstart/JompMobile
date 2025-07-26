import { makeRequest } from '../config/api.config';
import { CustomerVerificationType } from '../types/verification.type';
import { testData } from '../utils/formatter';
import { UserService } from './user';

export class ComplianceService extends UserService {
  constructor(userId: string, customerId: string) {
    super(customerId, userId);
  }
  async validateCustomerCompliance(
    verificationType: CustomerVerificationType,
    verification: string
  ) {
    const path =
      verificationType === 'nin'
        ? `/nin-verification?Nin=${verification}&UserId=${this.customerId}`
        : `/bvn-verification?bvn=${verification}&UserId=${this.customerId}`;
    const body =
      verificationType === 'nin'
        ? { Nin: verification }
        : { bvn: verification };
    // return await makeRequest<{
    //   status: string;
    //   image: string;
    //   firstName: string;
    //   lastName: string;
    // }>({
    //   method: 'POST',
    //   url: `${path}`,
    //   data: {},
    // });
    return {
      statusCode: 200,
      success: true,
      data: testData,
    };
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
    console.log(file);
    const formData = new FormData();
    formData.append('CustomerId', this.customerId);
    formData.append('VerificationStatus', VerificationStatus);
    formData.append('IdentificationNumber', IdentificationNumber);
    formData.append('IdentificationType', IdentificationType);
    formData.append('FullName', FullName);
    formData.append('PhoneNumber', PhoneNumber);

    formData.append('file', file);

    return await makeRequest({
      method: 'POST',
      url: '/verify-customer',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
  async createAccount() {
    return await makeRequest({
      method: 'GET',
      url: `/create-account?UserId=${this.userId}`,
    });

    // if (complianceStatus && complianceStatus === true) {
    //   return;
    // } else {
    //   return await makeRequest({
    //     method: 'GET',
    //     url: `/create-account?UserId=${this.userId}`,
    //   });
    // }
  }
}
