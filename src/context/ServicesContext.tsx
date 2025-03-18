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
    };
  };
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
};

// Default values for context
const defaultChildSchoolFeeDetails: CustomerServices['childSchoolFeeDetails'] =
  {
    guardianDetails: {},
    childSchoolDetails: [],
    guardianEmploymentDetails: {},
    documentUploads: {},
  };

export const CustomerServicesContext = createContext<CustomerServices>({
  service: null,
  childSchoolFeeDetails: defaultChildSchoolFeeDetails,
  setService: () => {},
  setChildSchoolFeeDetails: () => {},
});

const ServicesContextProvider: React.FC<CustomerServiceProviderProps> = ({
  children,
}) => {
  const [service, setService] = useState<CustomerServices['service']>(null);
  const [childSchoolFeeDetails, setChildSchoolFeeDetailsState] = useState<
    CustomerServices['childSchoolFeeDetails']
  >(defaultChildSchoolFeeDetails);

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

  const contextValue: CustomerServices = {
    service,
    childSchoolFeeDetails,
    setService: handleSetService,
    setChildSchoolFeeDetails: handleSetChildSchoolFeeDetails,
  };

  return (
    <CustomerServicesContext.Provider value={contextValue}>
      {children}
    </CustomerServicesContext.Provider>
  );
};

export default ServicesContextProvider;
