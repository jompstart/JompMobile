// import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
// import React, { useRef, useState, useContext, use, useEffect } from 'react';
// import { size } from '../../../config/size';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import CText from '../../../shared/CText';
// import { colors } from '../../../constants/colors';
// import PrimaryButton from '../../../shared/PrimaryButton';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Form1 from '../../../components/Transport/Form1';
// import Form2 from '../../../components/Transport/Form2';
// import Form3 from '../../../components/Transport/Form3';
// import { CustomerServicesContext } from '../../../context/ServicesContext';
// import {
//   useAppSelector,
//   useAppDispatch,
// } from '../../../controller/redux.controller';
// import { userSelector } from '../../../features/user/user.selector';
// import { ProviderService } from '../../../services/providers/provider';
// import { useMutation } from '@tanstack/react-query';
// import { useNavigation } from '@react-navigation/native';
// import { API_RESPONSE } from '../../../types';
// import { TransportRequest } from '../../../interface/provider';
// import { updateToast } from '../../../features/ui/ui.slice';
// import ShowLoader from '../../../shared/ShowLoader';
// import { useGetIdempotencyKey } from '../../../hooks/api/auth';
// const TransportForm = () => {
//   const user = useAppSelector(userSelector);
//   const providerInstance = new ProviderService(user.userId, user.customerId);
//   const { transportDetails, setTransportDetails } = useContext(
//     CustomerServicesContext
//   );
//   const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
//   const [shouldDisableButton, setShouldDisableButton] = useState(false);
//   const idempotencyKey = useGetIdempotencyKey();
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();
//   const { width, height } = Dimensions.get('window');
//   let PADDING = size.getWidthSize(26);
//   let newWidth = width - 2 * PADDING;
//   const views = [
//     {
//       label: 'Transport Credit Request Details',
//       title: 'Next: Employment/Occupation Details',
//       component: <Form1 />,
//     },
//     {
//       label: 'Employment/Occupation Details',
//       title: 'Next: Required Uploads',
//       component: <Form2 />,
//     },
//     {
//       label: 'Required Uploads',
//       title: 'Next: Review',
//       component: <Form3 />,
//     },
//   ];
//   const {
//     mutate: requestLoan,
//     data,
//     isPending,
//   } = useMutation<API_RESPONSE<any>, Error, TransportRequest>({
//     mutationFn: (data) => providerInstance.transportloan(data),
//     onError: (error) => {
//       dispatch(
//         updateToast({
//           displayToast: true,
//           toastMessage:
//             error?.message ||
//             'An error requesting occured while requesting transport loan',
//           toastType: 'info',
//         })
//       );
//     },
//     onSuccess: (data) => {
//       navigation.navigate('SuccessPage');
//     },
//   });

//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef<FlatList<any>>(null);
//   const [viewIndex, setViewIndex] = useState(0);
//   const [progress, setProgress] = useState(25);
//   const handleNextView = async () => {
//     if (viewIndex < views.length - 1) {
//       scrollViewRef.current?.scrollToPosition(0, 0, true);
//       flatListRef.current?.scrollToIndex({
//         index: viewIndex + 1,
//         animated: true,
//       });
//       setViewIndex(viewIndex + 1);
//       setProgress(progress + 111.3333 / views.length);
//       return;
//     }

//     requestLoan({
//       employerContactNumber:
//         transportDetails.employmentDetails.employerContact!,
//       creditAmount: transportDetails.creditRequestDetails.requestedAmount!,
//       employerName: transportDetails.employmentDetails.employerName!,
//       occupation: transportDetails.employmentDetails.occupation!,
//       payday: transportDetails.employmentDetails.payday!,
//       modeOfPayment: transportDetails.employmentDetails.modeOfPayment!,
//       transportMode: transportDetails.creditRequestDetails.transportMode!,
//       validId: transportDetails.documentUploads.idFile!,
//       utility: transportDetails.documentUploads.utilityBill!,
//       paySlip: transportDetails.documentUploads.proofOfMonthlyIncome!,
//       bankStatement: transportDetails.documentUploads.bankStatement!,
//       employmentStatus: transportDetails.employmentDetails.employmentStatus!,
//       income: '50000',
//       // income: transportDetails.employmentDetails.incomeRange!,
//       occupationAddress: transportDetails.employmentDetails.address!,
//       paymentDuration: transportDetails.creditRequestDetails.paymentDuration!,
//       proofEmployment: transportDetails.documentUploads.proofOfEmployment!,
//       transportCost: '400000',
//       IdempotencyKey: idempotencyKey,
//       // transportDetails.creditRequestDetails.estimatedMonthlyCost!,
//     });

//     // console.log(transportResponce);
//   };
//   useEffect(() => {
//     if (viewIndex === 0) {
//       const isEmpty =
//         !transportDetails.creditRequestDetails.transportMode ||
//         !transportDetails.creditRequestDetails.estimatedMonthlyCost ||
//         !transportDetails.creditRequestDetails.requestedAmount ||
//         !transportDetails.creditRequestDetails.paymentDuration;

//       setShouldDisableButton(isEmpty);
//     } else if (viewIndex === 1) {
//       const isEmpty =
//         !transportDetails.employmentDetails.employmentStatus ||
//         !transportDetails.employmentDetails.name ||
//         !transportDetails.employmentDetails.address ||
//         !transportDetails.employmentDetails.payday ||
//         !transportDetails.employmentDetails.incomeRange ||
//         !transportDetails.employmentDetails.payday ||
//         !transportDetails.employmentDetails.modeOfPayment ||
//         !transportDetails.employmentDetails.employerName ||
//         !transportDetails.employmentDetails.employerContact;

//       setShouldDisableButton(isEmpty);
//     } else if (viewIndex === 2) {
//       const isEmpty =
//         !transportDetails.documentUploads.idFile?.uri ||
//         !transportDetails.documentUploads.utilityBill?.uri ||
//         // !transportDetails.documentUploads.proofOfMonthlyIncome?.uri ||
//         !transportDetails.documentUploads.bankStatement?.uri ||
//         !transportDetails.documentUploads.proofOfEmployment?.uri;
//       setShouldDisableButton(isEmpty);
//     } else {
//       setShouldDisableButton(false);
//     }
//   }, [transportDetails, viewIndex]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         paddingHorizontal: size.getWidthSize(16),
//       }}
//     >
//       <KeyboardAwareScrollView
//         showsVerticalScrollIndicator={false}
//         extraScrollHeight={size.getHeightSize(16)}
//         contentContainerStyle={{
//           paddingTop: size.getHeightSize(16),
//         }}
//       >
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: size.getWidthSize(16),
//           }}
//         >
//           <AnimatedCircularProgress
//             fill={progress}
//             size={size.getHeightSize(119)}
//             width={size.getHeightSize(8)}
//             tintColor="#4CAF50"
//             backgroundColor={colors.primaryDisabled()}
//             backgroundWidth={size.getHeightSize(8)}
//             rotation={0}
//             lineCap="round"
//             style={
//               {
//                 // flex: 1,
//               }
//             }
//           >
//             {(fill: any) => (
//               <CText
//                 color={'#31005C' as any}
//                 fontSize={23}
//                 lineHeight={36.8}
//                 fontFamily="bold"
//               >
//                 {viewIndex + 1} of {views.length}
//               </CText>
//             )}
//           </AnimatedCircularProgress>
//           <View
//             style={{
//               flex: 1,
//             }}
//           >
//             <CText
//               color={colors.black('70') as any}
//               fontSize={16}
//               lineHeight={25.6}
//               fontFamily="bold"
//               style={{
//                 textAlign: 'right',
//               }}
//             >
//               {views[viewIndex].label}
//             </CText>
//             <CText
//               color={'secondaryBlack'}
//               fontSize={16}
//               lineHeight={22.4}
//               fontFamily="regular"
//               style={{
//                 textAlign: 'right',
//               }}
//             >
//               {views[viewIndex].title}
//             </CText>
//           </View>
//         </View>
//         {viewIndex == 2 ? (
//           <CText
//             color={'secondaryBlack'}
//             fontSize={16}
//             lineHeight={22.4}
//             fontFamily="regular"
//             style={{
//               textAlign: 'left',
//               marginTop: size.getHeightSize(24),
//               marginBottom: size.getHeightSize(16),
//             }}
//           >
//             Ensure all documents are clear and legible.
//           </CText>
//         ) : (
//           <CText
//             color={'secondaryBlack'}
//             fontSize={16}
//             lineHeight={22.4}
//             fontFamily="regular"
//             style={{
//               textAlign: 'left',
//               marginTop: size.getHeightSize(24),
//               marginBottom: size.getHeightSize(16),
//             }}
//           >
//             Complete the fields below (
//             <CText
//               color={'warning'}
//               fontSize={16}
//               lineHeight={22.4}
//               fontFamily="regular"
//             >
//               all are necessary to complete the process
//             </CText>
//             ).
//           </CText>
//         )}

//         <View
//           style={{
//             width: width,
//             alignItems: 'center',
//             flex: 1,
//           }}
//         >
//           <FlatList
//             scrollEnabled={false}
//             ref={flatListRef}
//             data={views}
//             horizontal
//             pagingEnabled
//             scrollEventThrottle={16}
//             snapToAlignment="center"
//             showsHorizontalScrollIndicator={false}
//             bounces={false}
//             onMomentumScrollEnd={(e) => {
//               // Calculate the new view index based on the scroll position
//               const newIndex = Math.round(
//                 e.nativeEvent.contentOffset.x / Dimensions.get('window').width
//               );

//               // Update the view index and progress
//               if (newIndex !== viewIndex) {
//                 setViewIndex(newIndex);
//                 setProgress(((newIndex + 1) / views.length) * 100);
//               }
//             }}
//             // onViewableItemsChanged={onViewChangeRef.current}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//               { useNativeDriver: false }
//             )}
//             renderItem={({ item }: any) => {
//               return (
//                 <View
//                   style={{
//                     width: width,
//                     flex: 1,
//                   }}
//                 >
//                   <View
//                     style={{
//                       width: size.getWidthSize(370),
//                     }}
//                   >
//                     {item.component}
//                   </View>
//                 </View>
//               );
//             }}
//           />
//         </View>
//       </KeyboardAwareScrollView>
//       <PrimaryButton
//         disabled={shouldDisableButton}
//         style={{
//           marginBottom: size.getHeightSize(32),
//         }}
//         label="Proceed"
//         onPress={handleNextView}
//       />
//       <ShowLoader isLoading={isPending} />
//     </View>
//   );
// };

// export default TransportForm;

// const styles = StyleSheet.create({});
import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
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
import { ProviderService } from '../../../services/providers/provider';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { API_RESPONSE } from '../../../types';
import { TransportRequest } from '../../../interface/provider';
import { updateToast } from '../../../features/ui/ui.slice';
import ShowLoader from '../../../shared/ShowLoader';
import { useGetIdempotencyKey } from '../../../hooks/api/auth';

const TransportForm = () => {
  const user = useAppSelector(userSelector);
  const providerInstance = new ProviderService(user.userId, user.customerId);
  const { transportDetails, setTransportDetails } = useContext(
    CustomerServicesContext
  );
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [shouldDisableButton, setShouldDisableButton] = useState(false);
  const idempotencyKey = useGetIdempotencyKey();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
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
      title: '',
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
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage:
            error?.message ||
            'An error occurred while requesting transport loan',
          toastType: 'info',
        })
      );
    },
    onSuccess: (data) => {
      navigation.navigate('SuccessPage');
    },
  });

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [progress, setProgress] = useState(33.33); // Adjusted to 33.33% for 3 steps

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
      income: '50000', // Consider making this dynamic if possible
      occupationAddress: transportDetails.employmentDetails.address!,
      paymentDuration: transportDetails.creditRequestDetails.paymentDuration!,
      proofEmployment: transportDetails.documentUploads.proofOfEmployment!,
      transportCost: '400000', // Consider making this dynamic if possible
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

  useEffect(() => {
    if (viewIndex === 0) {
      const isEmpty =
        !transportDetails.creditRequestDetails.transportMode ||
        !transportDetails.creditRequestDetails.estimatedMonthlyCost ||
        !transportDetails.creditRequestDetails.requestedAmount ||
        !transportDetails.creditRequestDetails.paymentDuration;
      setShouldDisableButton(isEmpty);
    } else if (viewIndex === 1) {
      const isEmpty =
        !transportDetails.employmentDetails.employmentStatus ||
        !transportDetails.employmentDetails.name ||
        !transportDetails.employmentDetails.address ||
        !transportDetails.employmentDetails.payday ||
        !transportDetails.employmentDetails.incomeRange ||
        !transportDetails.employmentDetails.modeOfPayment ||
        !transportDetails.employmentDetails.employerName ||
        !transportDetails.employmentDetails.employerContact;
      setShouldDisableButton(isEmpty);
    } else if (viewIndex === 2) {
      const isEmpty =
        !transportDetails.documentUploads.idFile?.uri ||
        !transportDetails.documentUploads.utilityBill?.uri ||
        !transportDetails.documentUploads.bankStatement?.uri ||
        !transportDetails.documentUploads.proofOfEmployment?.uri;
      setShouldDisableButton(isEmpty);
    } else {
      setShouldDisableButton(false);
    }
  }, [transportDetails, viewIndex]);

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
          paddingBottom: size.getHeightSize(30),
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
            style={{}}
          >
            {(fill: any) => (
              <CText
                color={'#31005C'}
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
              color={colors.black('70')}
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
        {viewIndex === 2 ? (
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
            renderItem={({ item }: any) => (
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
            )}
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
              backgroundColor: colors.secondaryBlack,
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
    </View>
  );
};

export default TransportForm;

const styles = StyleSheet.create({});