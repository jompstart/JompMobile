export interface Banks {
  name: string;
  code: string;
  currency: string;
  type: string;
}
export enum TransportProofOfEmployment {
  letter = 'Employment Letter',
  id = 'Work ID/Student ID',
  document = 'Business Document',
}
export interface MediaFile {
  name: string;
  uri: string;
  type: string;
}
export interface SelfSchoolFeeDetails {
  basicInformation: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
  };
  educationnDetails: {
    nameOfSchool?: string;
    course?: string;
    level?: string;
    location?: string;
    locationOfSchool2?: string;
    tuitionFee?: string;
    loanAmount?: string;
    country?: string;
    state?: string;
    city?: string;
    postalCode?: string;
    tutionFeeInvoice?: MediaFile;
    schoolIdCard?: MediaFile;
  };
  employmentDetails: {
    nameOfCompany?: string;
    companyEmail?: string;
    companyLocation?: string;
    companyPhoneNumber?: string;
    yearsInCompany?: string;
    month?: string;
    paymentSlip?: MediaFile;

    // just added
    occupation?: string;
    employerName?: string;
    hrContactNumber?: string;
    employerAddress?: string;
    employerState?: string;
    employerCity?: string;
    employerCountry?: string;
    employerPostalCode?: string;
  };
  documentUploads: {
    bankStatement?: MediaFile;
    utilityBill?: MediaFile;
    schoolFeeInvoice?: MediaFile;
    schoolIdCard?: MediaFile;
  };
}

export interface TransportDetails {
  creditRequestDetails: {
    transportMode?: string;
    estimatedMonthlyCost?: string;
    requestedAmount?: string;
    paymentDuration?: string;
  };
  employmentDetails: {
    occupation?: string;
    name?: string;
    address?: string;
    incomeRange?: string;
    payday?: string;
    modeOfPayment?: string;
    employerName?: string;
    employerContact?: string;
    employmentStatus?: string;
  };
  documentUploads: {
    idFile?: MediaFile;
    typeOfProofOfEmployment?: string;
    proofOfEmployment?: MediaFile;
    proofOfMonthlyIncome?: MediaFile;
    utilityBill?: MediaFile;
    bankStatement?: MediaFile;
  };
}
