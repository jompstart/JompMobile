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
import { useGetIdempotencyKey } from '../../../hooks/api/auth';

const SelfSchoolFeeForm = () => {
  const { width } = Dimensions.get('window');
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const idempotencyKey = useGetIdempotencyKey();
  const [showStatesBottomsheet, setShowStatesBottomSheet] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const { selfSchoolFeeDetails, setSelfSchoolFeeDetails } = useContext(
    CustomerServicesContext
  );
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [shouldDisableButton, setShouldDisableButton] = useState(false);
  const navigation = useNavigation();
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const {
    mutate: requestSchoolLoan,
    isPending,
    data,
  } = useMutation<API_RESPONSE<any>, Error, SelfSchoolFeeDetails>({
    mutationFn: (data) => providerInstance.registerSchoolFee(data),
    onError: (error) => {
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
  useEffect(() => {
    if (viewIndex === 0) {
      if (
        !selfSchoolFeeDetails.basicInformation.firstName ||
        !selfSchoolFeeDetails.basicInformation.lastName ||
        !selfSchoolFeeDetails.basicInformation.email ||
        !selfSchoolFeeDetails.basicInformation.phoneNumber ||
        !selfSchoolFeeDetails.basicInformation.address
      ) {
        setShouldDisableButton(true);
      } else {
        setShouldDisableButton(false);
      }
    } else if (viewIndex == 1) {
      const isEmpty =
        !selfSchoolFeeDetails.educationnDetails.nameOfSchool ||
        !selfSchoolFeeDetails.educationnDetails.course ||
        !selfSchoolFeeDetails.educationnDetails.state ||
        !selfSchoolFeeDetails.educationnDetails.city ||
        !selfSchoolFeeDetails.educationnDetails.level ||
        !selfSchoolFeeDetails.educationnDetails.location ||
        !selfSchoolFeeDetails.educationnDetails.tuitionFee ||
        !selfSchoolFeeDetails.educationnDetails.loanAmount ||
        !selfSchoolFeeDetails.educationnDetails.state ||
        !selfSchoolFeeDetails.educationnDetails.city;
      setShouldDisableButton(isEmpty);
    } else if (viewIndex == 2) {
      const isEmpty =
        !selfSchoolFeeDetails.employmentDetails.nameOfCompany ||
        !selfSchoolFeeDetails.employmentDetails.companyEmail ||
        !selfSchoolFeeDetails.employmentDetails.companyLocation ||
        !selfSchoolFeeDetails.employmentDetails.occupation ||
        !selfSchoolFeeDetails.employmentDetails.employerName ||
        !selfSchoolFeeDetails.employmentDetails.hrContactNumber ||
        !selfSchoolFeeDetails.employmentDetails.employerAddress ||
        !selfSchoolFeeDetails.employmentDetails.employerCity ||
        !selfSchoolFeeDetails.employmentDetails.employerPostalCode ||
        !selfSchoolFeeDetails.employmentDetails.employerState ||
        !selfSchoolFeeDetails.employmentDetails.employerCountry ||
        !selfSchoolFeeDetails.employmentDetails.companyPhoneNumber ||
        !selfSchoolFeeDetails.employmentDetails.yearsInCompany ||
        !selfSchoolFeeDetails.employmentDetails.month ||
        !selfSchoolFeeDetails.employmentDetails.paymentSlip;
      setShouldDisableButton(isEmpty);
    } else if (viewIndex == 3) {
      const isEmpty =
        !selfSchoolFeeDetails.documentUploads.bankStatement?.uri ||
        !selfSchoolFeeDetails.documentUploads.schoolFeeInvoice?.uri ||
        !selfSchoolFeeDetails.documentUploads.schoolIdCard?.uri ||
        !selfSchoolFeeDetails.documentUploads.utilityBill?.uri;
      setShouldDisableButton(isEmpty);
    } else {
      setShouldDisableButton(false);
    }
  }, [selfSchoolFeeDetails, viewIndex]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);

  const [progress, setProgress] = useState(25);

  const handleNextView = async () => {
    if (viewIndex < views.length - 1) {
      scrollViewRef.current?.scrollToPosition(0, 0, true);
      flatListRef.current?.scrollToIndex({
        index: viewIndex + 1,
        animated: true,
      });
      setViewIndex(viewIndex + 1);
      setProgress(progress + 100 / views.length);
      return;
    }

    requestSchoolLoan({
      ...selfSchoolFeeDetails,
      IdempotencyKey: idempotencyKey,
    });
  };

  const handlePreviousView = () => {
    if (viewIndex > 0) {
      scrollViewRef.current?.scrollToPosition(0, 0, true);
      flatListRef.current?.scrollToIndex({
        index: viewIndex - 1,
        animated: true,
      });
      setViewIndex(viewIndex - 1);
      setProgress(progress - 100 / views.length);
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
            {(fill: any) => (
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
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              );
              if (newIndex !== viewIndex) {
                setViewIndex(newIndex);
                setProgress(((newIndex + 1) / views.length) * 100);
              }
            }}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: size.getHeightSize(32),
        }}
      >
        {viewIndex > 0 && (
          <PrimaryButton
            label="Back"
            onPress={handlePreviousView}
            style={{
              width: size.getWidthSize(150),
              backgroundColor: colors.secondaryBlack, // Optional: Different style for Back button
            }}
          />
        )}
        <PrimaryButton
          disabled={shouldDisableButton}
          style={{
            width: viewIndex > 0 ? size.getWidthSize(150) : '100%',
          }}
          label="Proceed"
          onPress={handleNextView}
        />
      </View>
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