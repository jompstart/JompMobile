import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { size } from '../../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CText from '../../../shared/CText';
import { colors } from '../../../constants/colors';
import PrimaryButton from '../../../shared/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form1 from '../../../components/Transport/Form1';
import Form2 from '../../../components/Transport/Form2';
import Form3 from '../../../components/Transport/Form3';
import { CustomerServicesContext } from '../../../context/ServicesContext';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../controller/redux.controller';
import { userSelector } from '../../../features/user/user.selector';
import { ProviderService } from '../../../services/provider';
import { useMutation } from '@tanstack/react-query';
import { API_RESPONSE } from '../../../types';
import { TransportRequest } from '../../../interface/provider';
import { updateToast } from '../../../features/ui/ui.slice';
import ShowLoader from '../../../shared/ShowLoader';
const TransportForm = () => {
  const user = useAppSelector(userSelector);
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const { transportDetails, setTransportDetails } = useContext(
    CustomerServicesContext
  );
  const dispatch = useAppDispatch();
  const { width, height } = Dimensions.get('window');
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const views = [
    {
      label: 'Transport Credit Request Details',
      title: 'Next: Employment/Occupation Details',
      component: <Form1 />,
    },
    {
      label: 'Employment/Occupation Details',
      title: 'Next: Required Uploads',
      component: <Form2 />,
    },
    {
      label: 'Required Uploads',
      title: 'Next: Review',
      component: <Form3 />,
    },
  ];
  const {
    mutate: requestLoan,
    data,
    isPending,
  } = useMutation<API_RESPONSE<any>, Error, TransportRequest>({
    mutationFn: (data) => providerInstance.transportloan(data),
    onError: (error) => {
      console.log('====== transport error =====');
      console.log(error);
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage:
            error?.message ||
            'An error requesting occured while requesting transport loan',
          toastType: 'success',
        })
      );
    },
    onSuccess: (data) => {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: data?.message,
          toastType: 'success',
        })
      );
    },
  });

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
      setProgress(progress + 111.3333 / views.length);
      return;
    }

    requestLoan({
      employerContactNumber:
        transportDetails.employmentDetails.employerContact!,
      creditAmount: transportDetails.creditRequestDetails.requestedAmount!,
      employerName: transportDetails.employmentDetails.employerName!,
      occupation: transportDetails.employmentDetails.occupation!,
      payday: transportDetails.employmentDetails.payday!,
      modeOfPayment: transportDetails.employmentDetails.modeOfPayment!,
      transportMode: transportDetails.creditRequestDetails.transportMode!,
      validId: transportDetails.documentUploads.idFile!,
      utility: transportDetails.documentUploads.utilityBill!,
      paySlip: transportDetails.documentUploads.proofOfMonthlyIncome!,
      bankStatement: transportDetails.documentUploads.bankStatement!,
      employmentStatus: transportDetails.employmentDetails.employmentStatus!,
      income: '50000',
      // income: transportDetails.employmentDetails.incomeRange!,
      occupationAddress: transportDetails.employmentDetails.address!,
      paymentDuration: transportDetails.creditRequestDetails.paymentDuration!,
      proofEmployment: transportDetails.documentUploads.proofOfEmployment!,
      transportCost: '400000',
      // transportDetails.creditRequestDetails.estimatedMonthlyCost!,
    });

    // console.log(transportResponce);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: size.getWidthSize(16),
      }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={size.getHeightSize(16)}
        contentContainerStyle={{
          paddingTop: size.getHeightSize(16),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: size.getWidthSize(16),
          }}
        >
          <AnimatedCircularProgress
            fill={progress}
            size={size.getHeightSize(119)}
            width={size.getHeightSize(8)}
            tintColor="#4CAF50"
            backgroundColor={colors.primaryDisabled()}
            backgroundWidth={size.getHeightSize(8)}
            rotation={0}
            lineCap="round"
            style={
              {
                // flex: 1,
              }
            }
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
        {viewIndex == 2 ? (
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
            Ensure all documents are clear and legible.
          </CText>
        ) : (
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
        )}

        <View
          style={{
            width: width,
            alignItems: 'center',
            flex: 1,
          }}
        >
          <FlatList
            scrollEnabled={true}
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

export default TransportForm;

const styles = StyleSheet.create({});
