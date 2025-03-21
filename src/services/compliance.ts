import { makeRequest } from '../config/api.config';
import { CustomerVerificationType } from '../types/verification.type';
import { testData } from '../utils/test';

export class ComplianceService {
  private userId: string;
  private customerId: string;
  constructor(userId: string, customerId: string) {
    this.userId = userId;
    this.customerId = customerId;
  }
  async validateCustomerCompliance(
    verificationType: CustomerVerificationType,
    verification: string
  ) {
    const path =
      verificationType === 'nin'
        ? `/nin-verification?Nin=${'11111111111'}&UserId=${this.customerId}`
        : `/bvn-verification?bvn=${'11111111111'}&UserId=${this.customerId}`;
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
    console.log(file)
    const formData = new FormData();
    formData.append('CustomerId', this.customerId);
    formData.append('VerificationStatus', VerificationStatus);
    formData.append('IdentificationNumber', '11111111111');
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
}
