import React, { createContext, useState, useCallback, ReactNode } from 'react';
import {
  SelfSchoolFeeDetails,
  MediaFile,
  TransportDetails,
} from '../interface/provider';

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
      schoolEmail?: string;
      city?: string;
      postalCode?: string;
      country?: string;
      schoolFeeInvoice?: MediaFile;
    }[];
    guardianEmploymentDetails: {
      nameOfCompany?: string;
      companyEmail?: string;
      companyLocation?: string;
      companyPhoneNumber?: string;
      yearsInCompany?: string;
      paymentSlip?: MediaFile;
      month?: string;
      companyCity?: string;
      companyCountry?: string;
      companyPostalCode?: string;
      companyState?: string;
      occupation?: string;
    };
    documentUploads: {
      bankStatement?: MediaFile;
      utilityBill?: MediaFile;
      schoolFeeInvoice?: MediaFile;
      schoolIdCard?: MediaFile;
      paymentSlip?: MediaFile;
      bankStatement2?: MediaFile;
    };
  };
  selfSchoolFeeDetails: SelfSchoolFeeDetails;
  houseRentDetails: {
    rentAmount?: string;
    requestedAmount?: string;
    IdCard?: MediaFile;
    utilityBill?: MediaFile;
    banksStatement?: MediaFile[];
    paySlip?: MediaFile;
    tenancyAgreement?: MediaFile;
  };
  transportDetails: TransportDetails;


  removeChildSchoolDetailsFromArray: (index: number) => void;
  setHouseRentDetails: (
    field: keyof CustomerServices['houseRentDetails'],
    value: string
  ) => void;
  setSelfSchoolFeeDetails: <
    Section extends keyof CustomerServices['selfSchoolFeeDetails']
  >(
    section: Section,
    field: keyof CustomerServices['selfSchoolFeeDetails'][Section],
    value: string | MediaFile
  ) => void;
  setService: (service: CustomerServices['service']) => void;
  setChildSchoolFeeDetails: <
    Section extends keyof CustomerServices['childSchoolFeeDetails']
  >(
    section: Section,
    field:
      | keyof CustomerServices['childSchoolFeeDetails'][Section]
      | keyof CustomerServices['childSchoolFeeDetails']['childSchoolDetails'][number],
    value: string | MediaFile,
    index?: number
  ) => void;
  setTransportDetails: <
    Section extends keyof CustomerServices['transportDetails']
  >(
    section: Section,
    field: keyof CustomerServices['transportDetails'][Section],
    value: string | Array<string> | MediaFile,
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
  creditRequestDetails: {},
  employmentDetails: {},
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
  removeChildSchoolDetailsFromArray: () => {},
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
      value: string | MediaFile,
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
      value: string | Array<string> | MediaFile,
      action?: 'add' | 'remove' | 'set' | 'replace',
      index?: number
    ) => {
      setTransportDetails((prevDetails) => {
        // console.log(value)
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
  const removeChildSchoolDetailsFromArray = useCallback((index: number) => {
    setChildSchoolFeeDetailsState((prevDetails) => {
      const childSchoolDetails = [...prevDetails.childSchoolDetails];
      childSchoolDetails.splice(index, 1);
      return {
        ...prevDetails,
        childSchoolDetails,
      };
    });
  }, []);

  // Function to update specific fields in selfSchoolFeeDetails
  const handleSetSelfSchoolFeeDetails = useCallback(
    <Section extends keyof CustomerServices['selfSchoolFeeDetails']>(
      section: Section,
      field: keyof CustomerServices['selfSchoolFeeDetails'][Section],
      value: string | MediaFile
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
    removeChildSchoolDetailsFromArray,
  };

  return (
    <CustomerServicesContext.Provider value={contextValue}>
      {children}
    </CustomerServicesContext.Provider>
  );
};

export default ServicesContextProvider;
