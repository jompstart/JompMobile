export interface Banks {
  name: string;
  code: string;
  currency: string;
  type: string;
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
    transportMode?: Array<{
      value: string;
      index: number;
    }>;
    estimatedMonthlyCost?: string;
    requestedAmount?: string;
    paymentDuration?: string;
  };
  employmentDetails: {
    employmentStatus?: Array<{
      value: string;
      index: number;
    }>;
    others?: string;
    name?: string;
    address?: string;
    incomeRange?: string;
    payday?: string;
    modeOfPayment?: string;
    employerName?: string;
    employerContact?: string;
  };
  documentUploads: {
    identificationType?: string;
    idFile?: string;
    typeOfProofOfEmployment?: string;
    proofOfEmployment?: string;
    proofOfMonthlyIncome?: string;
    utilityBill?: string;
  };
}
