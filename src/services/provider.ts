import { makeRequest } from '../config/api.config';
import { SelfSchoolFeeDetails } from '../interface/provider';

export class ProviderService {
  constructor(private userId: string) {}

  async getBanks() {
    return await makeRequest<
      {
        name: string;
        code: string;
        currency: string;
        type: string;
      }[]
    >({
      method: 'GET',
      url: `/get-banks`,
    });
  }
  async validateAcct({
    accountNumber,
    bankCode,
    bankName,
  }: {
    accountNumber: string;
    bankCode: string;
    bankName: string;
  }) {
    return await makeRequest<{
      account_name: string;
      account_number: string;
    }>({
      method: 'POST',
      url: `/validate-account`,
      data: {
        accountNumber,
        bankCode,
        bankName,
      },
    });
  }
  async addBank({
    bankName,
    bankCode,
    accountNumber,
    accountName,
  }: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  }) {
    return await makeRequest({
      method: 'POST',
      url: `/add-bank`,
      data: {
        userId: this.userId,
        bankName,
        bankCode,
        accountNumber,
        accountName,
      },
    });
  }
  async getUserBanks() {
    return await makeRequest<
      {
        bankName: string;
        bankCode: string;
        accountNumber: string;
        accountName: string;
      }[]
    >({
      method: 'GET',
      url: `/get-bank/${this.userId}`,
    });
  }
  async registerSchoolFee(data: SelfSchoolFeeDetails) {
    const formatPhoneNumber = (phoneNumber: string): string => {
      if (phoneNumber.startsWith('234') && phoneNumber.length === 13) {
        return phoneNumber.replace(/^234/, '0');
      }
      return phoneNumber;
    };
    const formData = new FormData();

    formData.append('CustomerId', 'ebb0940a-6674-42fd-888c-ed3ef024c1b4');
    formData.append('UtilityBill', data.documentUploads.utilityBill as any);
    formData.append(
      'EducationDetailRequest.CourseOfStudy',
      data.educationnDetails.course!
    );
    formData.append(
      'EducationDetailRequest.EducationLevel',
      data.educationnDetails.level!
    );
    formData.append(
      'EducationDetailRequest.InstitutionName',
      data.educationnDetails.nameOfSchool!
    );
    formData.append(
      'EducationDetailRequest.InstitutionAddress',
      `${
        data.educationnDetails.location! ||
        data.educationnDetails.locationOfSchool2
      } ${data.educationnDetails.city!} ${data.educationnDetails.state!} ${data
        .educationnDetails.postalCode!} ${data.educationnDetails.country!}`
    );
    formData.append(
      'EducationDetailRequest.Zip',
      data.educationnDetails.postalCode!
    );
    formData.append(
      'EducationDetailRequest.TuitionFee',
      data.educationnDetails.tuitionFee!
    );
    formData.append(
      'EducationDetailRequest.LoanAmount',
      data.educationnDetails.loanAmount!
    );
    formData.append(
      'EducationDetailRequest.TuitionFeeInvoice',
      data.documentUploads.schoolFeeInvoice as any
    );
    formData.append(
      'EducationDetailRequest.OfficialSchoolId',
      data.documentUploads.schoolIdCard as any
    );
    formData.append(
      'EmploymentIncomeInformationRequest.Occupation',
      data.employmentDetails.occupation!
    );
    formData.append(
      'EmploymentIncomeInformationRequest.EmployerName',
      data.employmentDetails.employerName!
    );
    formData.append(
      'EmploymentIncomeInformationRequest.EmploymentDuration',
      `${data.employmentDetails.yearsInCompany!}years ${data.employmentDetails
        .month!}months`
    );
    formData.append(
      'EmploymentIncomeInformationRequest.OfficialWorkEmail',
      data.employmentDetails.companyEmail!
    );
    formData.append(
      'EmploymentIncomeInformationRequest.HRCompanyContactNumber',
      formatPhoneNumber(data.employmentDetails.hrContactNumber!)
    );
    formData.append(
      'EmploymentIncomeInformationRequest.EmployerContactAddress',
      `${data.employmentDetails.employerAddress!} ${data.employmentDetails
        .employerCity!} ${data.employmentDetails.employerState!} ${data
        .employmentDetails.employerPostalCode!} ${data.employmentDetails
        .employerCountry!}`
    );
    formData.append(
      'EmploymentIncomeInformationRequest.MonthsPayslip',
      data.employmentDetails.paymentSlip as any
    );
    formData.append(
      'EmploymentIncomeInformationRequest.MonthsBankStatement',
      data.documentUploads.bankStatement as any
    );
    formData.append('AgreedToTermsAndConditions', `${true}`);
    formData.append('AgreedToLoanAgreement', `${true}`);

    return await makeRequest<{
      message: string;
      status: number;
      success: boolean;
    }>({
      method: 'POST',
      url: `/register-customer-otherschoolfee-service`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
  }
}
