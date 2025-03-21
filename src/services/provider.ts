import { makeRequest } from '../config/api.config';
import { HouseRentLoanFormState } from '../features/user/user.reducer';
import {
  MediaFile,
  SelfSchoolFeeDetails,
  TransportDetails,
} from '../interface/provider';

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
  formatPhoneNumber(phoneNumber: string) {
    if (phoneNumber.startsWith('234') && phoneNumber.length === 13) {
      return phoneNumber.replace(/^234/, '0');
    }
    return phoneNumber;
  }
  async registerSchoolFee(data: SelfSchoolFeeDetails) {
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
      this.formatPhoneNumber(data.employmentDetails.hrContactNumber!)
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
    });
  }
  async requestHouseRentLoan(data: HouseRentLoanFormState) {
    console.log('====== got here ====');
    const formData = new FormData();
    formData.append('CustomerId', 'ebb0940a-6674-42fd-888c-ed3ef024c1b4');
    formData.append('RentPrice', data.rentAmount);
    formData.append('RequestedAmount', data.requestedAmount);
    formData.append('BankStatement', data.bankStatement as any);
    formData.append('UtilityBill', data.utilityBill as any);
    formData.append('IDCard', data.id as any);
    formData.append('TenancyAgreement', data.tenancyAgreement as any);
    formData.append('PaySlip', data.payMentSlip as any);
    // data.bankStatement2 &&
    //   formData.append('BankStatement2', data.bankStatement2 as any);
    // data.bankStatement2 &&
    //   formData.append('BankStatement2', data.bankStatement3 as any);
    formData.append('LandLordRequest.LandLordName', data.landlordName);
    formData.append('LandLordRequest.AccountName', data.landlordAccountName);
    formData.append(
      'LandLordRequest.AccountNumber',
      data.landlordAccountNumber
    );
    formData.append('LandLordRequest.BankName', data.landlordBankName);
    formData.append(
      'LandLordRequest.ContactNumber',
      data.landlordContactNumber
    );
    formData.append('RentEmployeerRequest.Occupaction', data.occupation);
    formData.append('RentEmployeerRequest.CompanyName', data.companyName);
    formData.append('RentEmployeerRequest.CompanyPhone', data.companyPhone);
    formData.append(
      'RentEmployeerRequest.YearsOfWorkinWithThem',
      data.yearsInCompany
    );
    formData.append('RentEmployeerRequest.CompanyEmail', data.companyEmail);
    formData.append(
      'RentEmployeerRequest.CompanyPhoneNumber',
      data.companyPhone
    );
    formData.append(
      'RentEmployeerRequest.CompanyLocation',
      data.companyAddress
    );
    console.log(formData);

    return await makeRequest({
      method: 'POST',
      url: `/house-rent`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }

  async transportloan(data: {
    employmentStatus: string;
    occupation: string;
    occupationAddress: string;
    income: string;
    payday: string;
    modeOfPayment: string;
    employerName: string;
    employerContactNumber: string;
    transportMode: string;
    transportCost: string;
    creditAmount: string;
    paymentDuration: string;
    proofEmployment: MediaFile;
    validId: MediaFile;
    paySlip: MediaFile;
    bankStatement: MediaFile;
    utility: MediaFile;
  }) {
    const formData = new FormData();
    formData.append('CustomerId', 'ebb0940a-6674-42fd-888c-ed3ef024c1b4');
    formData.append(
      'TransporterOccupationRequest.EmploymentStatus',
      data.employmentStatus
    );
    formData.append('TransporterOccupationRequest.Occupation', data.occupation);
    formData.append(
      'TransporterOccupationRequest.OccupationAddress',
      data.occupationAddress
    );
    formData.append(
      'TransporterOccupationRequest.OccupationAddress',
      data.occupationAddress
    );
    formData.append('TransporterOccupationRequest.Income', data.income);
    formData.append('TransporterOccupationRequest.Payday', data.payday);
    formData.append(
      'TransporterOccupationRequest.ModeOfPayment',
      data.modeOfPayment
    );
    formData.append(
      'TransporterOccupationRequest.EmployerName',
      data.employerName
    );
    formData.append(
      'TransporterOccupationRequest.EmployerContactNumber',
      data.employerContactNumber
    );
    formData.append('TransportCreditRequest.TransportMode', data.transportMode);
    formData.append('TransportCreditRequest.TransportCost', data.transportCost);
    formData.append('TransportCreditRequest.CreditAmount', data.creditAmount);
    formData.append(
      'TransportCreditRequest.PaymentDuration',
      data.paymentDuration
    );
    formData.append(
      'TransportCreditRequest.ProofEmployment',
      data.proofEmployment as any
    );
    formData.append('TransportCreditRequest.ValidId', data.validId as any);
    formData.append('TransportCreditRequest.PaySlip', data.paySlip as any);
    formData.append(
      'TransportCreditRequest.BankStatement',
      data.bankStatement as any
    );
    formData.append('TransportCreditRequest.Utility', data.utility as any);
    formData.append('TransportCreditRequest.InformationAgreement', `${true}`);
    formData.append('TransportCreditRequest.AuthorizeDebit', `${true}`);
    formData.append('TransportCreditRequest.TermsAndConditions', `${true}`);

    return await makeRequest({
      method: 'POST',
      url: `/transportation-for-registered-user`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
}
