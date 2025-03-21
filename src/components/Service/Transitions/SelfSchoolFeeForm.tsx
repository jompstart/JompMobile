import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
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
import { ProviderService } from '../../../services/provider';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../controller/redux.controller';
import { userSelector } from '../../../features/user/user.selector';
import SelfDetails from '../../../screens/ChildBills/SelfDetails';
import { updateToast } from '../../../features/ui/ui.slice';
import { API_RESPONSE } from '../../../types';
import { SelfSchoolFeeDetails } from '../../../interface/provider';
const SelfSchoolFeeForm = () => {
  const { width } = Dimensions.get('window');
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );

  const providerInstance = new ProviderService(user.userId);
  const {
    mutate: requestSchoolLoan,
    isPending,
    data,
  } = useMutation<API_RESPONSE<any>, Error, SelfSchoolFeeDetails>({
    mutationFn: (data) => providerInstance.registerSchoolFee(data), // Ensure data is passed
    onError: (error) => {
      console.log('======= service error =======');
      console.log(error);
    },
    onSuccess: (d) => {
      console.log('======= service success =======');
      dispatch(
        updateToast({
          toastMessage: d?.message,
          displayToast: true,
          toastType: d?.success === true ? 'success' : 'info',
        })
      );
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
      component: <Form2 />,
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
        tutionFeeInvoice: {
          name: 'ELG3336Microprocessor.pdf',
          type: 'application/pdf',
          uri: 'file:///var/mobile/Containers/Data/Application/604BDE58-8ED7-4C52-BA51-5B053DB54E8C/Library/Caches/ExponentExperienceData/@prime_dev/JompStart/DocumentPicker/AC0A8236-7D05-449B-9C45-E3AC1A015572.pdf',
        },
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

    requestSchoolLoan(loanData);
    // const d = await providerInstance.registerSchoolFee(loanData);
    // console.log(d);
  };
  console.log(data);
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
        // disabled={
        //   viewIndex == 0 &&
        //   isAnyFieldEmpty(childSchoolFeeDetails.guardianDetails)
        // }
        style={{
          marginBottom: size.getHeightSize(32),
        }}
        label="Procced"
        onPress={handleNextView}
      />
      <ShowLoader isLoading={isPending} />
    </View>
  );
};

export default SelfSchoolFeeForm;

const styles = StyleSheet.create({});
