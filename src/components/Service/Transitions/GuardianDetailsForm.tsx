import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { size } from '../../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CText from '../../../shared/CText';
import { colors } from '../../../constants/colors';
import { CustomerServicesContext } from '../../../context/ServicesContext';
import PrimaryButton from '../../../shared/PrimaryButton';
import Form1 from '../../ChildBills/Form1';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form2 from '../../ChildBills/Form2';
import Form3 from '../../ChildBills/Form3';
import Form4 from '../../ChildBills/Form4';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../controller/redux.controller';
import ShowLoader from '../../../shared/ShowLoader';
import { ProviderService } from '../../../services/provider';
import { userSelector } from '../../../features/user/user.selector';
import { ChildSchoolFeeRequest } from '../../../interface/provider';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../../types';
import { updateToast } from '../../../features/ui/ui.slice';
const GuardianDetailsForm = () => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const providerInstance = new ProviderService(user.userId);
  const { width, height } = Dimensions.get('window');
  const { childSchoolFeeDetails, setChildSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const { mutate: requestLoan, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    ChildSchoolFeeRequest
  >({
    mutationFn: (payload) =>
      providerInstance.registerSchoolFeeForOthers(payload),
    onError: (error) => {
      console.log('====== request child school fee error ======');
      console.log(error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage:
            error?.message || 'There was an error requesting school loan',
          toastType: 'info',
        })
      );
    },
    onSuccess: (data) => {
      console.log('====== request child school fee success ======');
      console.log(data);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: data?.message,
          toastType: 'success',
        })
      );
    },
  });
  const views = [
    {
      label: "Parent or Guardian's Details",
      title: 'Next: Child and School Details',
      component: <Form1 />,
    },
    {
      label: 'Child and School Details',
      title: 'Next: Parent Employment Details',
      component: <Form2 />,
    },
    {
      label: 'Parent Employment Details',
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
    } else {
      console.log(childSchoolFeeDetails);
      requestLoan({
        workDetails: {
          address:
            childSchoolFeeDetails.guardianEmploymentDetails.companyLocation!,
          companyName:
            childSchoolFeeDetails.guardianEmploymentDetails.nameOfCompany!,
          email: childSchoolFeeDetails.guardianEmploymentDetails.companyEmail!,
          phone:
            childSchoolFeeDetails.guardianEmploymentDetails.companyPhoneNumber!,
          yearsInCompany:
            childSchoolFeeDetails.guardianEmploymentDetails.yearsInCompany!,
          city: childSchoolFeeDetails.guardianEmploymentDetails.companyCity!,
          country:
            childSchoolFeeDetails.guardianEmploymentDetails.companyCountry!,
          postalCode:
            childSchoolFeeDetails.guardianEmploymentDetails.companyPostalCode!,
          state: childSchoolFeeDetails.guardianEmploymentDetails.companyState!,
          location:
            childSchoolFeeDetails.guardianEmploymentDetails.companyLocation!,
          monthsInCompany:
            childSchoolFeeDetails.guardianEmploymentDetails.month!,

          occupation:
            childSchoolFeeDetails.guardianEmploymentDetails.occupation!,
        },
        documentUploads: {
          bankStatement: childSchoolFeeDetails.documentUploads.bankStatement!,
          utilityBill: childSchoolFeeDetails.documentUploads.utilityBill!,
          paySlip: childSchoolFeeDetails.documentUploads.schoolFeeInvoice!,
          bankStatement2: childSchoolFeeDetails.documentUploads.bankStatement2!,
        },
        loanAmount: childSchoolFeeDetails.guardianDetails.loanAmount!,
        childDetails: childSchoolFeeDetails.childSchoolDetails.map((child) => {
          return {
            childFirstName: child.childFirstName!,
            childLastName: child.childLastName!,
            childGrade: child.childGrade!,
            schoolName: child.nameOfSchool!,
            schoolLocation: child.schoolAddress!,
            city: child.city!,
            country: child.country!,
            postalCode: child.postalCode!,
            invoice: child.schoolFeeInvoice!,
            schoolAddress: child.schoolAddress!,
            schoolEmail: child.schoolEmail!,
            schoolFee: child.childSchoolFees!,
          };
        }),
      });
    }
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
          paddingBottom: size.getHeightSize(30),
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

export default GuardianDetailsForm;

const styles = StyleSheet.create({});
