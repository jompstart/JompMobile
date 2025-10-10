import { StyleSheet, Pressable, View } from 'react-native';
import GradientHeader from '../../shared/GradientHeader';
import CText from '../../shared/CText';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { size } from '../../config/size';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CreateSavingsScreenProps } from '../../types/navigations.types';
import { useMutation } from '@tanstack/react-query';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { SavingsService } from '../../services/savings/savings';
import { API_RESPONSE } from '../../types';
import { CreateSavingsRequestDto } from '../../services/savings/savings.dto';
import { updateToast } from '../../features/ui/ui.slice';
import { useNavigation } from '@react-navigation/native';
import { formatToAmount } from '../../utils/stringManipulation';

const CreateSavings = ({ route: { params } }: CreateSavingsScreenProps) => {
  const [agreement1, setAgreement1] = useState(false);
  const navigation = useNavigation();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const savingsService = new SavingsService(user.userId, user.customerId);

  const trySavingsTimeFormats = async (data: CreateSavingsRequestDto, formats: string[]) => {
    let lastError: any = null;

    for (const format of formats) {
      const payload = {
        ...data,
        savingsTime: format,
        preferredTime: format,
      };
      console.log(`Attempting payload with savingsTime: ${format}`, JSON.stringify(payload, null, 2));

      try {
        const response = await savingsService.createSavings(payload);
        console.log(`Success with savingsTime format: ${format}`);
        return response;
      } catch (error: any) {
        console.error(`Failed with savingsTime format: ${format}`, JSON.stringify(error, null, 2));
        lastError = error;
      }
    }

    throw lastError;
  };

  const { mutate: createService, isPending } = useMutation<
    API_RESPONSE<any>,
    Error,
    CreateSavingsRequestDto
  >({
    mutationFn: async (data) => {
      const preferredTime = params?.preferredTime;
      let formats: string[] = [];

      if (params?.autoSave && preferredTime) {
        let hhmm = preferredTime;
        let hhmmss = preferredTime;

        if (!/^\d{2}:\d{2}$/.test(preferredTime)) {
          const date = new Date(preferredTime);
          hhmm = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
          hhmmss = `${hhmm}:00`;
        } else {
          hhmm = preferredTime;
          hhmmss = `${preferredTime}:00`;
        }

        const ticks = (new Date(`1970-01-01T${hhmmss}Z`).getTime() * 10000);
        formats = [hhmmss, hhmm, ticks.toString(), '00:30:00'];
      } else {
        formats = [null];
      }

      return trySavingsTimeFormats(data, formats);
    },
    onError: (error: any) => {
      console.error('Axios Error:', JSON.stringify(error, null, 2));
      let errorMessage = 'An error occurred while creating the savings goal';
      if (error.response?.data?.errors?.['$.savingsTime']) {
        errorMessage = error.response.data.errors['$.savingsTime'][0];
      } else if (error.response?.data?.title) {
        errorMessage = error.response.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: errorMessage,
          toastType: 'info',
        })
      );
    },
    onSuccess: (data) => {
      navigation.navigate('SuccessPage', {
        message:
          'You have successfully created your savings goal 🎉. We will be cheering you on as you save towards your goal.',
      });
    },
  });

  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
          color="white"
        />
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Go Back
        </CText>
      </GradientHeader>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            paddingTop: size.getHeightSize(16),
          }}
        >
          <CText
            color={'black'}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
            style={{
              opacity: 0.75,
            }}
          >
            Summary of your new savings goal
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              opacity: 0.75,
              marginTop: size.getHeightSize(4),
            }}
          >
            You are about to create a new savings goal. You will earn your
            interest every day at a rate of {params?.interestRate}% per annum.
          </CText>
        </View>
        <View
          style={{
            backgroundColor: colors.white(),
            paddingVertical: size.getHeightSize(8),
            paddingHorizontal: size.getWidthSize(8),
            borderRadius: size.getHeightSize(8),
            marginTop: size.getHeightSize(16),
            marginHorizontal: size.getWidthSize(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={12}
              lineHeight={16.8}
              fontFamily="bold"
            >
              Create Savings Goal
            </CText>
            <Feather
              onPress={() => {
                navigation.goBack();
              }}
              name="edit"
              size={size.getHeightSize(16)}
              color={colors.primary()}
            />
          </View>
          <View
            style={{
              gap: size.getHeightSize(24),
              marginTop: size.getHeightSize(16),
            }}
          >
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Title
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  {params?.goalName}
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Goal
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  ₦{formatToAmount(params?.targetAmount)}
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Savings Duration
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  {params?.durationString}
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  How will you like to save?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  {params?.frequency.slice(0, 1).toUpperCase() +
                    params.frequency.slice(1).toLowerCase()}
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Preferred Amount to Save on a Basis
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  ₦{formatToAmount(params?.monthlyContribution)}
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Do You Want to Enable Auto Savings?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  {params?.autoSave ? 'Yes' : 'No'}
                </CText>
              </View>
            </View>
            <View style={styles.view1}>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Source of Funding
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  My{' '}
                  {params?.savingSource.slice(0, 1).toUpperCase() +
                    params?.savingSource.slice(1)}
                </CText>
              </View>
              <View style={styles.view}>
                <CText
                  color={colors.black('70') as any}
                  fontSize={11}
                  lineHeight={15.4}
                  fontFamily="bold"
                  style={styles.text}
                >
                  Auto Withdrawal at The End of Your Savings Duration?
                </CText>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={16.8}
                  fontFamily="bold"
                  style={styles.text}
                >
                  {params?.autoWithdrawal ? 'Yes' : 'No'}
                </CText>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setAgreement1(!agreement1);
          }}
          style={[
            styles.view2,
            {
              marginVertical: size.getHeightSize(16),
            },
          ]}
        >
          <MaterialCommunityIcons
            name={agreement1 ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={size.getHeightSize(30)}
            color={colors.primary()}
          />
          <CText
            color={colors.black('70') as any}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              flex: 1,
            }}
          >
            I hereby agree that I will be charged 20% of the interest I have
            earned so far:
            {'\n'}
            1. Whenever I withdraw any amount before my maturity date.
            {'\n'}
            2. If I do not meet my savings target at maturity date.
            {/* I hereby agree that I will forfeit the interest accrued on this
            savings if I fail to meet this target amount of (₦
            {params?.targetAmount}) by the end of the savings duration. */}
          </CText>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            setAgreement2(!agreement2);
          }}
          style={styles.view2}
        >
          <MaterialCommunityIcons
            name={agreement2 ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={size.getHeightSize(30)}
            color={colors.primary()}
          />
          <CText
            color={colors.black('70') as any}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              flex: 1,
            }}
          >
            I hereby agree to this: "If I break this target before the end of
            the savings duration, I will lose all the interest accrued."
          </CText>
        </Pressable> */}
        <View
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(40),
          }}
        >
          <PrimaryButton
            disabled={!agreement1}
            onPress={() => {
              if (agreement1) {
                const data: CreateSavingsRequestDto = {
                  goalName: params?.goalName,
                  targetAmount: params?.targetAmount,
                  savingsTime: params?.preferredTime,
                  frequency: params?.frequency,
                  monthlyContribution: params?.monthlyContribution,
                  autoSave: params?.autoSave,
                  savingSource: params?.savingSource,
                  autoWithdrawal: params?.autoWithdrawal,
                  cardDetails: {
                    cardNumber: '',
                    expiryMonth: '',
                    expiry_year: '',
                    cvv: '',
                  },
                  status: 'pending',
                  savingCategory: params?.savingCategory,
                  savingsType: 'jompVault',
                  startDate: params?.startDate,
                  endDate: params?.endDate,
                  preferredTime: params?.preferredTime,
                  targetBreakBeforeEndDate: true,
                  interestTagentSaving: true,
                  customerId: user.customerId,
                };
                createService(data);
                console.log("payload is", data);
              }
            }}
            isLoading={isPending}
            label="Create Savings"
          />
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default CreateSavings;

const styles = StyleSheet.create({
  text: {
    letterSpacing: size.getWidthSize(0.2),
  },
  view: {
    gap: size.getWidthSize(8),
    flex: 1,
  },
  view1: {
    flexDirection: 'row',
    gap: size.getWidthSize(8),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white(),
    marginHorizontal: size.getWidthSize(16),

    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    gap: size.getWidthSize(16),
    borderRadius: size.getHeightSize(8),
  },
  view3: {
    height: size.getHeightSize(24),
    width: size.getHeightSize(24),
    borderWidth: size.getHeightSize(1.38),
    borderColor: colors.primary(),
    borderRadius: size.getHeightSize(4),
  },
});


// import { StyleSheet, Pressable, View } from 'react-native';
// import GradientHeader from '../../shared/GradientHeader';
// import CText from '../../shared/CText';
// import { useState } from 'react';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
// import { size } from '../../config/size';
// import { ScrollView } from 'react-native-gesture-handler';
// import Feather from '@expo/vector-icons/Feather';
// import { colors } from '../../constants/colors';
// import PrimaryButton from '../../shared/PrimaryButton';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { CreateSavingsScreenProps } from '../../types/navigations.types';
// import { useMutation } from '@tanstack/react-query';

// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../../controller/redux.controller';
// import { userSelector } from '../../features/user/user.selector';
// import { SavingsService } from '../../services/savings/savings';
// import { API_RESPONSE } from '../../types';
// import { CreateSavingsRequestDto } from '../../services/savings/savings.dto';
// import { updateToast } from '../../features/ui/ui.slice';
// import { useNavigation } from '@react-navigation/native';
// import { formatToAmount } from '../../utils/stringManipulation';

// const CreateSavings = ({ route: { params } }: CreateSavingsScreenProps) => {
//   const [agreement1, setAgreement1] = useState(false);

//   const navigation = useNavigation();
//   const user = useAppSelector(userSelector);
//   const dispatch = useAppDispatch();
//   const savingsService = new SavingsService(user.userId, user.customerId);
//   const { mutate: createService, isPending } = useMutation<
//     API_RESPONSE<any>,
//     Error,
//     CreateSavingsRequestDto
//   >({
//     mutationFn: (data) => savingsService.createSavings(data),
//     onError: (error) => {
//       dispatch(
//         updateToast({
//           displayToast: true,
//           toastMessage: error.message,
//           toastType: 'info',
//         })
//       );
//     },
//     onSuccess: (data) => {
//       navigation.navigate('SuccessPage', {
//         message:
//           'You have successfully created your savings goal 🎉. We will be cheering you on as you save towards your goal.',
//       });
//     },
//   });

//   // Helper function to format time for display
//   const formatTimeForDisplay = (timeString: string | null) => {
//     if (!timeString) return 'Not set';
    
//     // If it's already in HH:mm format, return as is
//     if (timeString.match(/^\d{2}:\d{2}$/)) {
//       return timeString;
//     }
    
//     // If it's a timestamp, convert to HH:mm
//     try {
//       const date = new Date(timeString);
//       return date.toLocaleTimeString('en-GB', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false,
//       });
//     } catch (error) {
//       return timeString;
//     }
//   };

//   return (
//     <GradientSafeAreaView>
//       <GradientHeader>
//         <MaterialIcons
//           name="arrow-back-ios"
//           size={size.getHeightSize(18)}
//           color="white"
//         />
//         <CText
//           color={'white'}
//           fontSize={16}
//           lineHeight={25.6}
//           fontFamily="bold"
//         >
//           Go Back
//         </CText>
//       </GradientHeader>
//       <ScrollView>
//         <View
//           style={{
//             paddingHorizontal: size.getWidthSize(16),
//             paddingTop: size.getHeightSize(16),
//           }}
//         >
//           <CText
//             color={'black'}
//             fontSize={18}
//             lineHeight={28.8}
//             fontFamily="bold"
//             style={{
//               opacity: 0.75,
//             }}
//           >
//             Summary of your new savings goal
//           </CText>
//           <CText
//             color={'secondaryBlack'}
//             fontSize={16}
//             lineHeight={22.4}
//             fontFamily="regular"
//             style={{
//               opacity: 0.75,
//               marginTop: size.getHeightSize(4),
//             }}
//           >
//             You are about to create a new savings goal. You will earn your
//             interest every day at a rate of {params?.interestRate}% per annum.
//           </CText>
//         </View>
//         <View
//           style={{
//             backgroundColor: colors.white(),
//             paddingVertical: size.getHeightSize(8),
//             paddingHorizontal: size.getWidthSize(8),
//             borderRadius: size.getHeightSize(8),
//             marginTop: size.getHeightSize(16),
//             marginHorizontal: size.getWidthSize(16),
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <CText
//               color={'secondaryBlack'}
//               fontSize={12}
//               lineHeight={16.8}
//               fontFamily="bold"
//             >
//               Create Savings Goal
//             </CText>
//             <Feather
//               onPress={() => {
//                 navigation.goBack();
//               }}
//               name="edit"
//               size={size.getHeightSize(16)}
//               color={colors.primary()}
//             />
//           </View>
//           <View
//             style={{
//               gap: size.getHeightSize(24),
//               marginTop: size.getHeightSize(16),
//             }}
//           >
//             <View style={styles.view1}>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Savings Title
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   {params?.goalName}
//                 </CText>
//               </View>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Savings Goal
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   ₦{formatToAmount(params?.targetAmount)}
//                 </CText>
//               </View>
//             </View>
//             <View style={styles.view1}>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Savings Duration
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   {params?.durationString}
//                 </CText>
//               </View>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   How will you like to save?
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   {params?.frequency.slice(0, 1).toUpperCase() +
//                     params.frequency.slice(1).toLowerCase()}
//                 </CText>
//               </View>
//             </View>
//             <View style={styles.view1}>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Preferred Amount to Save on a Basis
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   ₦{formatToAmount(params?.monthlyContribution)}
//                 </CText>
//               </View>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Do You Want to Enable Auto Savings?
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   {params?.autoSave ? 'Yes' : 'No'}
//                 </CText>
//               </View>
//             </View>
//             <View style={styles.view1}>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Source of Funding
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   My{' '}
//                   {params?.savingSource.slice(0, 1).toUpperCase() +
//                     params?.savingSource.slice(1)}
//                 </CText>
//               </View>
//               <View style={styles.view}>
//                 <CText
//                   color={colors.black('70') as any}
//                   fontSize={11}
//                   lineHeight={15.4}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   Auto Withdrawal at The End of Your Savings Duration?
//                 </CText>
//                 <CText
//                   color={'black'}
//                   fontSize={12}
//                   lineHeight={16.8}
//                   fontFamily="bold"
//                   style={styles.text}
//                 >
//                   {params?.autoWithdrawal ? 'Yes' : 'No'}
//                 </CText>
//               </View>
//             </View>
//             {params?.autoSave && (
//               <View style={styles.view1}>
//                 <View style={styles.view}>
//                   <CText
//                     color={colors.black('70') as any}
//                     fontSize={11}
//                     lineHeight={15.4}
//                     fontFamily="bold"
//                     style={styles.text}
//                   >
//                     Preferred Time for Auto Savings
//                   </CText>
//                   <CText
//                     color={'black'}
//                     fontSize={12}
//                     lineHeight={16.8}
//                     fontFamily="bold"
//                     style={styles.text}
//                   >
//                     {formatTimeForDisplay(params?.preferredTime)}
//                   </CText>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//         <Pressable
//           onPress={() => {
//             setAgreement1(!agreement1);
//           }}
//           style={[
//             styles.view2,
//             {
//               marginVertical: size.getHeightSize(16),
//             },
//           ]}
//         >
//           <MaterialCommunityIcons
//             name={agreement1 ? 'checkbox-marked' : 'checkbox-blank-outline'}
//             size={size.getHeightSize(30)}
//             color={colors.primary()}
//           />
//           <CText
//             color={colors.black('70') as any}
//             fontSize={14}
//             lineHeight={19.6}
//             fontFamily="semibold"
//             style={{
//               flex: 1,
//             }}
//           >
//             I hereby agree that I will be charged 20% of the interest I have
//             earned so far:
//             {'\n'}
//             1. Whenever I withdraw any amount before my maturity date.
//             {'\n'}
//             2. If I do not meet my savings target at maturity date.
//           </CText>
//         </Pressable>
//         <View
//           style={{
//             marginHorizontal: size.getWidthSize(16),
//             marginTop: size.getHeightSize(40),
//           }}
//         >
//           <PrimaryButton
//             disabled={!agreement1}
//             onPress={() => {
//               if (agreement1) {
//                 const data: CreateSavingsRequestDto = {
//                   goalName: params?.goalName,
//                   targetAmount: params?.targetAmount,
//                   savingsTime: params?.preferredTime, // This should be in HH:mm format
//                   frequency: params?.frequency,
//                   monthlyContribution: params?.monthlyContribution,
//                   autoSave: params?.autoSave,
//                   savingSource: params?.savingSource,
//                   autoWithdrawal: params?.autoWithdrawal,
//                   cardDetails: {
//                     cardNumber: '',
//                     expiryMonth: '',
//                     expiry_year: '',
//                     cvv: '',
//                   },
//                   status: 'pending',
//                   savingCategory: params?.savingCategory,
//                   savingsType: 'jompVault',
//                   startDate: params?.startDate,
//                   endDate: params?.endDate,
//                   preferredTime: params?.preferredTime, // This should be in HH:mm format
//                   targetBreakBeforeEndDate: true,
//                   interestTagentSaving: true,
//                   customerId: user.customerId,
//                 };
//                 createService(data);
//               }
//             }}
//             isLoading={isPending}
//             label="Create Savings"
//           />
//         </View>
//       </ScrollView>
//     </GradientSafeAreaView>
//   );
// };

// export default CreateSavings;

// const styles = StyleSheet.create({
//   text: {
//     letterSpacing: size.getWidthSize(0.2),
//   },
//   view: {
//     gap: size.getWidthSize(8),
//     flex: 1,
//   },
//   view1: {
//     flexDirection: 'row',
//     gap: size.getWidthSize(8),
//   },
//   view2: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     backgroundColor: colors.white(),
//     marginHorizontal: size.getWidthSize(16),
//     paddingHorizontal: size.getWidthSize(16),
//     paddingVertical: size.getHeightSize(16),
//     gap: size.getWidthSize(16),
//     borderRadius: size.getHeightSize(8),
//   },
//   view3: {
//     height: size.getHeightSize(24),
//     width: size.getHeightSize(24),
//     borderWidth: size.getHeightSize(1.38),
//     borderColor: colors.primary(),
//     borderRadius: size.getHeightSize(4),
//   },
// });