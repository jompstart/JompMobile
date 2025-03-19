import React, { createContext, useState, useCallback, ReactNode } from 'react';

type CustomerServiceProviderProps = {
  children: ReactNode;
};

type CustomerServices = {
  service: 'rent' | 'schoolfee' | 'electricity' | null;
  childSchoolFeeDetails: {
    guardianDetails: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      loanAmount?: string;
    };
    childSchoolDetails: {
      nameOfSchool?: string;
      schoolAddress?: string;
      childLastName?: string;
      childFirstName?: string;
      childGrade?: string;
      childSchoolFees?: string;
    }[];
    guardianEmploymentDetails: {
      nameOfCompany?: string;
      companyEmail?: string;
      companyLocation?: string;
      companyPhoneNumber?: string;
      yearsInCompany?: string;
      paymentSlip?: string;
    };
    documentUploads: {
      bankStatement?: string;
      utilityBill?: string;
      schoolFeeInvoice?: string;
      schoolIdCard?: string;
    };
  };
  selfSchoolFeeDetails: {
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
      tutionFeeInvoice?: string;
      schoolIdCard?: string;
    };
    employmentDetails: {
      nameOfCompany?: string;
      companyEmail?: string;
      companyLocation?: string;
      companyPhoneNumber?: string;
      yearsInCompany?: string;
      month?: string;
      paymentSlip?: string;
    };
    documentUploads: {
      bankStatement?: string;
      utilityBill?: string;
      schoolFeeInvoice?: string;
      schoolIdCard?: string;
    };
  };
  houseRentDetails: {
    rentAmount?: string;
    requestedAmount?: string;
    IdCard?: string;
    utilityBill?: string;
    banksStatement?: string[];
    paySlip?: string;
    tenancyAgreement?: string;
  };
  transportDetails: {
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
  };

  setHouseRentDetails: (
    field: keyof CustomerServices['houseRentDetails'],
    value: string
  ) => void;
  setSelfSchoolFeeDetails: <
    Section extends keyof CustomerServices['selfSchoolFeeDetails']
  >(
    section: Section,
    field: keyof CustomerServices['selfSchoolFeeDetails'][Section],
    value: string
  ) => void;
  setService: (service: CustomerServices['service']) => void;
  setChildSchoolFeeDetails: <
    Section extends keyof CustomerServices['childSchoolFeeDetails']
  >(
    section: Section,
    field:
      | keyof CustomerServices['childSchoolFeeDetails'][Section]
      | keyof CustomerServices['childSchoolFeeDetails']['childSchoolDetails'][number],
    value: string,
    index?: number
  ) => void;
  setTransportDetails: <
    Section extends keyof CustomerServices['transportDetails']
  >(
    section: Section,
    field: keyof CustomerServices['transportDetails'][Section],
    value: string | Array<string>,
    action?: 'add' | 'remove' | 'set' | 'replace',
    index?: number
  ) => void;
};

// Default values for context
const defaultChildSchoolFeeDetails: CustomerServices['childSchoolFeeDetails'] =
  {
    guardianDetails: {},
    childSchoolDetails: [],
    guardianEmploymentDetails: {},
    documentUploads: {},
  };
const defaultSelfSchoolFeeDetails: CustomerServices['selfSchoolFeeDetails'] = {
  basicInformation: {},
  educationnDetails: {},
  employmentDetails: {},
  documentUploads: {},
};
const defaultTransportDetails: CustomerServices['transportDetails'] = {
  creditRequestDetails: {
    transportMode: [],
  },
  employmentDetails: {
    employmentStatus: [],
  },
  documentUploads: {},
};

export const CustomerServicesContext = createContext<CustomerServices>({
  service: null,
  childSchoolFeeDetails: defaultChildSchoolFeeDetails,
  selfSchoolFeeDetails: defaultSelfSchoolFeeDetails,
  transportDetails: defaultTransportDetails,
  houseRentDetails: {},
  setHouseRentDetails: () => {},
  setService: () => {},
  setChildSchoolFeeDetails: () => {},
  setSelfSchoolFeeDetails: () => {},
  setTransportDetails: () => {},
});

const ServicesContextProvider: React.FC<CustomerServiceProviderProps> = ({
  children,
}) => {
  const [service, setService] = useState<CustomerServices['service']>(null);
  const [childSchoolFeeDetails, setChildSchoolFeeDetailsState] = useState<
    CustomerServices['childSchoolFeeDetails']
  >(defaultChildSchoolFeeDetails);
  const [selfSchoolFeeDetails, setSelfSchoolFeeDetailsState] = useState<
    CustomerServices['selfSchoolFeeDetails']
  >(defaultSelfSchoolFeeDetails);
  const [houseRentDetails, setHouseRentDetails] = useState<
    CustomerServices['houseRentDetails']
  >({});
  const [transportDetails, setTransportDetails] = useState<
    CustomerServices['transportDetails']
  >(defaultTransportDetails);
  // Function to update the service
  const handleSetService = useCallback(
    (newService: CustomerServices['service']) => {
      setService(newService);
    },
    []
  );

  // Function to update specific fields in childSchoolFeeDetails
  const handleSetChildSchoolFeeDetails = useCallback(
    <Section extends keyof CustomerServices['childSchoolFeeDetails']>(
      section: Section,
      field:
        | keyof CustomerServices['childSchoolFeeDetails'][Section]
        | keyof CustomerServices['childSchoolFeeDetails']['childSchoolDetails'][number],
      value: string,
      index?: number
    ) => {
      setChildSchoolFeeDetailsState((prevDetails) => {
        if (section === 'childSchoolDetails') {
          const childSchoolDetails = [...prevDetails.childSchoolDetails];

          if (typeof index === 'number') {
            // Update an existing item in the array
            childSchoolDetails[index] = {
              ...childSchoolDetails[index],
              [field]: value,
            };
          } else {
            // Push a new item to the array
            childSchoolDetails.push({
              [field]: value,
            } as CustomerServices['childSchoolFeeDetails']['childSchoolDetails'][number]);
          }

          return {
            ...prevDetails,
            childSchoolDetails,
          };
        }

        // Handle non-array sections
        return {
          ...prevDetails,
          [section]: {
            ...prevDetails[section],
            [field]: value,
          },
        };
      });
    },
    []
  );

  // Function to update specific fields in transportDetails
  const handleSetTransportDetails = useCallback(
    <Section extends keyof CustomerServices['transportDetails']>(
      section: Section,
      field: keyof CustomerServices['transportDetails'][Section],
      value: string | Array<string>,
      action?: 'add' | 'remove' | 'set' | 'replace',
      index?: number
    ) => {
      setTransportDetails((prevDetails) => {
        const sectionData = prevDetails[section];

        if (Array.isArray(sectionData[field])) {
          let updatedArray = [
            ...(sectionData[field] as Array<{
              value: string;
              index: number;
            }>),
          ];
          if (action === 'add') {
            // Add a new value to the array
            updatedArray.push({
              value: value as string,
              index: index as number,
            });
          } else if (action === 'remove') {
            // remove the object by finding the index
            updatedArray = updatedArray.filter((item) => item.index != index);
          } else if (action === 'set') {
            // Replace the entire array
            updatedArray[index as number] = {
              value: value as string,
              index: index as number,
            };
          } else if (action === 'replace') {
            const fieldObject = updatedArray.find(
              (item) => item.index === index
            );
            if (!fieldObject) {
              updatedArray.push({
                value: value as string,
                index: index as number,
              });
            } else {
              updatedArray = updatedArray.map((item) => {
                if (item.index === index) {
                  return {
                    value: value as string,
                    index: index as number,
                  };
                }
                return item;
              });
            }
          }
          return {
            ...prevDetails,
            [section]: {
              ...sectionData,
              [field]: updatedArray,
            },
          };
        }
        return {
          ...prevDetails,
          [section]: {
            ...sectionData,
            [field]: value,
          },
        };
      });
    },
    []
  );

  // Function to update specific fields in selfSchoolFeeDetails
  const handleSetSelfSchoolFeeDetails = useCallback(
    <Section extends keyof CustomerServices['selfSchoolFeeDetails']>(
      section: Section,
      field: keyof CustomerServices['selfSchoolFeeDetails'][Section],
      value: string
    ) => {
      setSelfSchoolFeeDetailsState((prevDetails) => ({
        ...prevDetails,
        [section]: {
          ...prevDetails[section],
          [field]: value,
        },
      }));
    },
    []
  );

  const contextValue: CustomerServices = {
    service,
    childSchoolFeeDetails,
    selfSchoolFeeDetails,
    houseRentDetails,
    transportDetails,
    setTransportDetails: handleSetTransportDetails,
    setService: handleSetService,
    setChildSchoolFeeDetails: handleSetChildSchoolFeeDetails,
    setSelfSchoolFeeDetails: handleSetSelfSchoolFeeDetails,
    setHouseRentDetails: (field, value) => {
      setHouseRentDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    },
  };

  return (
    <CustomerServicesContext.Provider value={contextValue}>
      {children}
    </CustomerServicesContext.Provider>
  );
};

export default ServicesContextProvider;
