import { makeRequest } from '../../config/api.config';
import { HouseRentLoanFormState } from '../../reducers/services.reducer';
import {
  ChildSchoolFeeRequest,
  MediaFile,
  SelfSchoolFeeDetails,
  TransportDetails,
  TransportRequest,
} from '../../interface/provider';
import {
  CalculateLoanDto,
  CalculateLoanResponse,
  CustomerServiceDetails,
  OtherBillsDto,
  PaymentOptionResponse,
  ServicesCategories,
} from './provider.dto';

export class ProviderService {
  constructor(private userId: string, private customerId: string) {}

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

  async registerSchoolFeeForOthers(data: ChildSchoolFeeRequest) {
    let formData = new FormData();

    formData.append(`CustomerId`, this.customerId);
    formData.append(`LoanAmount`, data.loanAmount);

    data.childDetails.forEach((child, index) => {
      formData.append(
        `ChildDetails[${index}].ChildFirstName`,
        child.childFirstName
      );
      formData.append(
        `ChildDetails[${index}].ChildLastName`,
        child.childLastName
      );
      formData.append(`ChildDetails[${index}].SchoolEmail`, child.schoolEmail);
      formData.append(
        `ChildDetails[${index}].SchoolFee`,
        child.schoolFee.toString()
      );
      formData.append(`ChildDetails[${index}].SchoolName`, child.schoolName);

      formData.append(
        `ChildDetails[${index}].SchoolLocation`,
        `${child.schoolAddress} ${child.schoolAddress2} ${
          child.schoolLocation
        } ${child.postalCode || ''} ${child.country}`
      );
      formData.append(`ChildDetails[${index}].ChildGrade`, child.childGrade);

      formData.append(`ChildDetails[${index}].invoice`, child.invoice as any);
    });
    formData.append('ParentRecords.Occupaction', data.workDetails.occupation);
    formData.append('ParentRecords.CompanyName', data.workDetails.companyName);
    formData.append(
      'ParentRecords.CompanyLocation',
      `${data.workDetails.location}  ${data.workDetails.city} ${data.workDetails.state} ${data.workDetails.country}`
    );
    formData.append(
      'ParentRecords.YearsOfWorkinWithThem',
      `${data.workDetails.yearsInCompany}years ${data.workDetails.monthsInCompany}months`
    );
    formData.append('ParentRecords.CompanyEmail', data.workDetails.email);
    formData.append(
      'ParentRecords.CompanyPhoneNumber',
      this.formatPhoneNumber(data.workDetails.phone)
    );

    formData.append(
      'ParentRecords.UtilityBill',
      data.documentUploads.utilityBill as any
    );

    formData.append(
      'ParentRecords.PaySlip',
      data.documentUploads.paySlip as any
    );

    formData.append(
      'ParentRecords.BankStatement',
      data.documentUploads.bankStatement as any
    );
    if (data.documentUploads.bankStatement2) {
      formData.append(
        'ParentRecords.BankStatement2',
        data.documentUploads.bankStatement2 as any
      );
    }

    return await makeRequest<{
      message: string;
      status: number;
      success: boolean;
    }>({
      method: 'POST',
      url: `/register-customer-schoolfee-service`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }

  async registerSchoolFee(data: SelfSchoolFeeDetails) {
    const formData = new FormData();

    formData.append('CustomerId', this.customerId);
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
      `${data.employmentDetails.employerAddress!}  ${data.employmentDetails
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
    const formData = new FormData();
    formData.append('CustomerId', this.customerId);
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

  async transportloan(data: TransportRequest) {
    const formData = new FormData();
    formData.append('CustomerId', this.customerId);
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

  async getUserServices() {
    return await makeRequest<CustomerServiceDetails[]>({
      method: 'GET',
      url: `/get-customerServices/${this.customerId}?1&pageSize=10`,
    });
  }

  async calculateLoan(data: CalculateLoanDto) {
    return await makeRequest<CalculateLoanResponse>({
      method: 'POST',
      url: `/loan-calculator`,
      data,
    });
  }
  async getServiceCategories() {
    return await makeRequest<ServicesCategories[]>({
      method: 'GET',
      url: `/service-categories`,
    });
  }
  async getPaymentMethods() {
    return await makeRequest<PaymentOptionResponse[]>({
      method: 'GET',
      url: `/payment-options`,
    });
  }

  async requestOtherService(data: Omit<OtherBillsDto, 'CustomerId'>) {
    let formData = new FormData();

    formData.append('CustomerId', this.customerId);
    formData.append('ServiceName', data.ServiceName);
    formData.append('ServiceCompletionStatus', data.ServiceCompletionStatus);
    formData.append('ServiceDate', data.ServiceDate);
    formData.append('LoanAmountRequested', data.LoanAmountRequested);
    formData.append('ServiceProvider', data.ServiceProvider);
    formData.append('GuarantorAddress', data.GuarantorAddress);
    formData.append(
      'GuarantorPhoneNumber',
      this.formatPhoneNumber(data.GuarantorPhoneNumber)
    );
    formData.append('CostOfService', data.CostOfService);
    formData.append('ServiceCategory', data.ServiceCategory);
    formData.append('ReasonForLoan', data.ReasonForLoan);
    formData.append('GuarantorName', data.GuarantorName);
    formData.append('RecurringPaymentOptionId', data.RecurringPaymentOptionId);
    formData.append('ServiceProviderContact', data.ServiceProviderContact);
    formData.append('PaymentTypeId', data.PaymentTypeId);
    formData.append('RepaymentPlan', data.RepaymentPlan);
    formData.append('ProofOfService', data.ProofOfService as any);
    formData.append('ValidateId', data.ValidateId as any);
    formData.append('BankStatement', data.BankStatement as any);
    formData.append('UtilityBill', data.UtilityBill as any);
    console.log('Form Data for Other Bills Request:');
    console.log(formData);
    return await makeRequest({
      method: 'POST',
      url: `/bills-payment-request`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }
}
