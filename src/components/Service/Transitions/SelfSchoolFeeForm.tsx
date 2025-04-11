import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { size } from '../../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CText from '../../../shared/CText';
import { colors } from '../../../constants/colors';
import { CustomerServicesContext } from '../../../context/ServicesContext';
import PrimaryButton from '../../../shared/PrimaryButton';
import Form1 from '../../SelfBills/Form1';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form2 from '../../SelfBills/Form2';
import Form3 from '../../SelfBills/Form3';
import Form4 from '../../SelfBills/Form4';
import ShowLoader from '../../../shared/ShowLoader';
import { isAnyFieldEmpty } from '../../../utils/forms';
import { useMutation } from '@tanstack/react-query';
import StatesBottomsheet from '../../../shared/StateBottomsheet';
import { ProviderService } from '../../../services/providers/provider';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../controller/redux.controller';
import { userSelector } from '../../../features/user/user.selector';
import { useNavigation } from '@react-navigation/native';
import {
  resetSuccessModal,
  updateSuccessModalVisibility,
  updateToast,
} from '../../../features/ui/ui.slice';
import { API_RESPONSE } from '../../../types';
import { SelfSchoolFeeDetails } from '../../../interface/provider';
const SelfSchoolFeeForm = () => {
  const { width } = Dimensions.get('window');
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [showStatesBottomsheet, setShowStatesBottomSheet] = useState(false);
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  const navigation = useNavigation();
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const {
    mutate: requestSchoolLoan,
    isPending,
    data,
  } = useMutation<API_RESPONSE<any>, Error, SelfSchoolFeeDetails>({
    mutationFn: (data) => providerInstance.registerSchoolFee(data), // Ensure data is passed
    onError: (error) => {
      console.log('======= service error =======');
      console.log(error);
      dispatch(
        updateToast({
          toastMessage: error?.message,
          displayToast: true,
          toastType: 'info',
        })
      );
    },
    onSuccess: (d) => {
      console.log('======= service success =======');
      navigation.navigate('SuccessPage');
    },
  });
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const views = [
    {
      label: 'Basic Information (Personal Details)',
      title: 'Next: Education Details ',
      component: <Form1 />,
    },
    {
      label: 'Education Details (Your Education Details)',
      title: 'Next: Employment/Business Details',
      component: (
        <Form2
          onSelectState={() => {
            setShowStatesBottomSheet(true);
          }}
        />
      ),
    },
    {
      label: 'Employment/Business Details',
      title: 'Next: Document Uploads',
      component: <Form3 />,
    },
    {
      label: 'Document Uploads',
      title: '',
      component: <Form4 />,
    },
  ];
  const shouldButtonDisable = () => {
    if (viewIndex == 0) {
      return (
        !selfSchoolFeeDetails.basicInformation.address ||
        !selfSchoolFeeDetails.basicInformation.email ||
        !selfSchoolFeeDetails.basicInformation.firstName ||
        !selfSchoolFeeDetails.basicInformation.lastName ||
        !selfSchoolFeeDetails.basicInformation.phoneNumber
      );
    }
    if (viewIndex == 1) {
      // return isAnyFieldEmpty(selfSchoolFeeDetails.educationnDetails);
      return (
        !selfSchoolFeeDetails.educationnDetails.city ||
        !selfSchoolFeeDetails.educationnDetails.country ||
        !selfSchoolFeeDetails.educationnDetails.course ||
        !selfSchoolFeeDetails.educationnDetails.level ||
        !selfSchoolFeeDetails.educationnDetails.location ||
        !selfSchoolFeeDetails.educationnDetails.nameOfSchool ||
        !selfSchoolFeeDetails.educationnDetails.state ||
        !selfSchoolFeeDetails.educationnDetails.tuitionFee
      );
    }
    if (viewIndex == 2) {
      // return isAnyFieldEmpty(selfSchoolFeeDetails.employmentDetails);
      return (
        !selfSchoolFeeDetails.employmentDetails.companyEmail ||
        !selfSchoolFeeDetails.employmentDetails.companyLocation ||
        !selfSchoolFeeDetails.employmentDetails.companyPhoneNumber ||
        !selfSchoolFeeDetails.employmentDetails.employerAddress ||
        !selfSchoolFeeDetails.employmentDetails.employerCity ||
        !selfSchoolFeeDetails.employmentDetails.employerCountry ||
        !selfSchoolFeeDetails.employmentDetails.employerName ||
        !selfSchoolFeeDetails.employmentDetails.employerPostalCode ||
        !selfSchoolFeeDetails.employmentDetails.employerState ||
        !selfSchoolFeeDetails.employmentDetails.hrContactNumber ||
        !selfSchoolFeeDetails.employmentDetails.month ||
        !selfSchoolFeeDetails.employmentDetails.nameOfCompany ||
        !selfSchoolFeeDetails.employmentDetails.occupation ||
        !selfSchoolFeeDetails.employmentDetails.paymentSlip ||
        !selfSchoolFeeDetails.employmentDetails.yearsInCompany ||
        !selfSchoolFeeDetails.employmentDetails.employerPostalCode ||
        !selfSchoolFeeDetails.employmentDetails.paymentSlip
      );
    }
    if (viewIndex == 3) {
      // return isAnyFieldEmpty(selfSchoolFeeDetails.documentUploads);
      return (
        !selfSchoolFeeDetails.documentUploads.bankStatement ||
        !selfSchoolFeeDetails.documentUploads.schoolFeeInvoice ||
        !selfSchoolFeeDetails.documentUploads.schoolIdCard ||
        !selfSchoolFeeDetails.documentUploads.utilityBill
      );
    }
    return false;
  };
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const handleNextView = async () => {
    if (viewIndex < views.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: viewIndex + 1,
        animated: true,
      });
      setViewIndex(viewIndex + 1);
      setProgress(progress + 100 / views.length);
      return;
    }

    const loanData = {
      basicInformation: {
        address: 'Lagos',
        email: 'ayomide@gmail.com',
        firstName: 'Ayomide',
        lastName: 'Obiwale',
        phoneNumber: '09070903614',
      },
      documentUploads: {
        bankStatement: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/05A953EA-98B3-424E-ADBD-4418D3502276.pdf',
        },
        schoolFeeInvoice: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/24793D61-26BC-4E90-AC00-2953A8B49801.pdf',
        },
        schoolIdCard: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/E4CFCD88-F1BE-4659-85C0-840D21E12A03.pdf',
        },
        utilityBill: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/22959764-5B39-41BD-807F-9579B3A6C7E6.pdf',
        },
      },
      educationnDetails: {
        postalCode: '123344',
        city: 'Ikeja',
        country: 'Nigeria',
        course: 'Medicine',
        level: '100',
        loanAmount: '2000',
        location: 'Lagos',
        nameOfSchool: 'Unilag',
        state: 'Lagos',
        tuitionFee: '1005',
      },
      employmentDetails: {
        companyEmail: 'Jomp@gmail.com',
        companyLocation: 'Lagos',
        companyPhoneNumber: '09070903614',
        employerAddress: 'Lagos',
        employerCity: 'Ikeja',
        employerCountry: 'Nigeria',
        employerName: 'Salami',
        employerPostalCode: '123344',
        employerState: 'Lagos',
        hrContactNumber: '09070903614',
        month: '2',
        nameOfCompany: 'JOMP',
        occupation: 'Developer',
        paymentSlip: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/09736887-4B01-4386-8786-BF1D7861D70E.pdf',
        },
        yearsInCompany: '6',
      },
    };

    requestSchoolLoan(selfSchoolFeeDetails);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: size.getWidthSize(16),
      }}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={size.getHeightSize(16)}
        contentContainerStyle={{
          paddingTop: size.getHeightSize(16),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AnimatedCircularProgress
            fill={progress}
            size={size.getHeightSize(123)}
            width={size.getHeightSize(8)}
            tintColor="#4CAF50"
            backgroundColor={colors.primaryDisabled()}
            backgroundWidth={size.getHeightSize(8)}
            rotation={0}
            lineCap="round"
            style={{
              flex: 1,
            }}
          >
            {(fill) => (
              <CText
                color={'#31005C' as any}
                fontSize={23}
                lineHeight={36.8}
                fontFamily="bold"
              >
                {viewIndex + 1} of {views.length}
              </CText>
            )}
          </AnimatedCircularProgress>
          <View
            style={{
              flex: 1,
            }}
          >
            <CText
              color={colors.black('70') as any}
              fontSize={16}
              lineHeight={25.6}
              fontFamily="bold"
              style={{
                textAlign: 'right',
              }}
            >
              {views[viewIndex].label}
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="regular"
              style={{
                textAlign: 'right',
              }}
            >
              {views[viewIndex].title}
            </CText>
          </View>
        </View>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(16),
          }}
        >
          Complete the fields below (
          <CText
            color={'warning'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            all are necessary to complete the process
          </CText>
          ).
        </CText>

        <View
          style={{
            width: width,
            alignItems: 'center',
            flex: 1,
          }}
        >
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={views}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onMomentumScrollEnd={(e) => {
              // Calculate the new view index based on the scroll position
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              );

              // Update the view index and progress
              if (newIndex !== viewIndex) {
                setViewIndex(newIndex);
                setProgress(((newIndex + 1) / views.length) * 100);
              }
            }}
            // onViewableItemsChanged={onViewChangeRef.current}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }: any) => {
              return (
                <View
                  style={{
                    width: width,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: size.getWidthSize(370),
                    }}
                  >
                    {item.component}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <PrimaryButton
        // disabled={shouldButtonDisable()}
        style={{
          marginBottom: size.getHeightSize(32),
        }}
        label="Procced"
        onPress={handleNextView}
      />
      <ShowLoader isLoading={isPending} />
      <StatesBottomsheet
        onStateSelected={(state) => {
          if (viewIndex == 1) {
            setSelfSchoolFeeDetails('educationnDetails', 'state', state.name);
          }
        }}
        isVisible={showStatesBottomsheet}
        onClose={() => setShowStatesBottomSheet(false)}
      />
    </View>
  );
};

export default SelfSchoolFeeForm;

const styles = StyleSheet.create({});
