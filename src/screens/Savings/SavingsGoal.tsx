 import { StyleSheet, Pressable, View, Switch, Platform } from 'react-native';
import GradientHeader from '../../shared/GradientHeader';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { size } from '../../config/size';
import { Paystack } from 'react-native-paystack-webview';
import LoanInfoIcon from '../../../assets/svgs/Loan/LoanInfoIcon';
import PTextInput from '../../shared/PTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import FundSourceBottomsheet from '../../components/Savings/FundSourceBottomsheet';
import { useNavigation } from '@react-navigation/native';
import { useReducer, useState, useEffect } from 'react';
import SavingsCategoryBottomsheet from '../../components/Savings/CategoryBottomsheet';
import Constants from 'expo-constants';import { useGetSavingsTypes } from '../../hooks/api/savings';
import {
  useAppSelector,
  useAppDispatch,
} from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import {
  calculateGoalAmount,
  calculateSavingsPerPeriod,
  generateSuggestions,
} from '../../helpers/savings';
import { updateToast } from '../../features/ui/ui.slice';
import { formatToAmount } from '../../utils/stringManipulation';
import GoalBottomsheet from '../../components/Savings/GoalBottomsheet';
import CustomizedDuration from '../../components/Savings/CustomizedDuration';
import SetDuration from '../../components/Savings/SetDuration';// Reducer (assumed from your provided code)
const savingsFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PREFERRED_TIME':
      return { ...state, preferredTime: action.payload };
    case 'SET_GOAL_NAME':
      return { ...state, goalName: action.payload };
    case 'SET_TARGET_AMOUNT':
      return { ...state, targetAmount: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_DURATION_STRING':
      return { ...state, durationString: action.payload };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_SAVING_SOURCE':
      return { ...state, savingSource: action.payload };
    case 'SET_SAVING_CATEGORY':
      return { ...state, savingCategory: action.payload };
    case 'SET_AUTO_SAVE':
      return { ...state, autoSave: action.payload };
    case 'SET_AUTO_WITHDRAWAL':
      return { ...state, autoWithdrawal: action.payload };
    case 'SET_MONTHLY_CONTRIBUTION':
      return { ...state, monthlyContribution: action.payload };
    case 'SET_INTEREST_RATE':
      return { ...state, interestRate: action.payload };
    default:
      return state;
  }
};// Initial state with startDate set to midnight UTC
const createSavingsInitialState = {
  goalName: '',
  targetAmount: '',
  duration: null,
  durationString: '',
  frequency: null,
  startDate: (() => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    return date;
  })(),
  endDate: null,
  savingSource: null,
  savingCategory: null,
  autoSave: false,
  autoWithdrawal: false,
  monthlyContribution: '',
  interestRate: '',
  preferredTime: null,
};const SavingsGoal = () => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const [state, savingsInitialState] = useReducer(
    savingsFormReducer,
    createSavingsInitialState
  );
  const [endDate, setEndDate] = useState<
    '1month' | '3months' | '6months' | '9months' | '1year' | 'customize' | null  >(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [pay, setPay] = useState(false);
  const [authorizationCode, setAuthorizationCode] = useState<string | null>(null);
  const [showTime, setShowTime] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [isProceedButtonDisabled, setProceedButtonDisabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showGoalSheet, setShowGoalSheet] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [newGoal, setNewGoal] = useState(0);
  const { data: savingsTypes } = useGetSavingsTypes(
    user.userId,
    user.customerId
  );
  const [showPreferredSavingsWarning, setShowPreferredSavingsWarning] =
    useState(false);
  const [showCustomizeDuration, setShowCustomizeDuration] = useState(false);
  const [hideCustomizedDuration, setHideCustomizedDuration] = useState(true);
  const [showDuration, setShowDuration] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<
    'day' | 'week' | 'month' | 'year' | null
  >(null);
  const [customizedDuration, setCustomizedDuration] = useState('');

  const savingsType = savingsTypes?.data?.find(
    (item) => item.name === 'jompVault'
  );  const paystackKey = Constants.expoConfig?.extra?.PAYSTACK_KEY as string;  useEffect(() => {
    if (savingsType) {
      savingsInitialState({
        type: 'SET_INTEREST_RATE',
        payload: savingsType.interestRate.toString(),
      });
    }
  }, [savingsType]);  const onChange = (event: any, selectedDate?: Date) => {
    setShowDate(false);
    if (event.type === 'set' && selectedDate) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      const selected = new Date(selectedDate);
      selected.setUTCHours(0, 0, 0, 0); // Set to midnight UTC  // Prevent selecting a date in the past
  if (selected < currentDate) {
    dispatch(
      updateToast({
        displayToast: true,
        toastMessage: 'Start date cannot be in the past.',
        toastType: 'error',
      })
    );
    return;
  }

  setDate(selected);
  savingsInitialState({
    type: 'SET_START_DATE',
    payload: selected,
  });

  // If autosave is enabled and start date is today, validate preferred time
  if (state.autoSave && state.preferredTime && selected.toDateString() === currentDate.toDateString()) {
    const [hours, minutes] = state.preferredTime.split(':').map(Number);
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // Local time (WAT)
    const preferredTimeInMinutes = hours * 60 + minutes;

    if (currentTimeInMinutes >= preferredTimeInMinutes) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Selected time has passed for today. Please choose a future time or adjust the start date.',
          toastType: 'warning',
        })
      );
      savingsInitialState({
        type: 'SET_PREFERRED_TIME',
        payload: null,
      });
      setShowTime(true); // Prompt user to select a new time
    }
  }
}  };  const onChangeTime = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const time = selectedDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });  const now = new Date();
  const isStartDateToday =
    state.startDate &&
    new Date(state.startDate).toDateString() === now.toDateString();

  if (isStartDateToday && state.autoSave) {
    const [hours, minutes] = time.split(':').map(Number);
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // Local time (WAT)
    const selectedTimeInMinutes = hours * 60 + minutes;

    if (currentTimeInMinutes >= selectedTimeInMinutes) {
      dispatch(
        updateToast({
          displayToast: true,
          toastMessage: 'Selected time has passed for today. Please choose a future time.',
          toastType: 'warning',
        })
      );
      setShowTime(true); // Keep time picker open
      return;
    }
  }

  setSelectedTime(selectedDate);
  savingsInitialState({
    type: 'SET_PREFERRED_TIME',
    payload: time,
  });
  setShowTime(false);
} else if (event.type === 'dismissed') {
  setShowTime(false);
  dispatch(
    updateToast({
      displayToast: true,
      toastMessage: 'Time selection cancelled. Please select a preferred time.',
      toastType: 'info',
    })
  );
}  };  const showDatePicker = () => {
    setShowDate(true);
  };  useEffect(() => {
    if (state.startDate && state.duration) {
      const startDate = new Date(state.startDate);
      startDate.setUTCHours(0, 0, 0, 0); // Ensure midnight UTC
      const duration = new Date(state.duration);
      const endDate = new Date(startDate);
      endDate.setFullYear(duration.getFullYear());
      endDate.setMonth(duration.getMonth());
      endDate.setDate(duration.getDate());
      savingsInitialState({
        type: 'SET_END_DATE',
        payload: endDate,
      });
    }
  }, [state.startDate, state.duration]);  useEffect(() => {
    if (
      state.targetAmount &&
      state.endDate &&
      state.frequency &&
      state.startDate
    ) {
      const savingsPerPeriod = calculateSavingsPerPeriod(
        +state.targetAmount,
        state.startDate.toISOString(),
        state.endDate.toISOString(),
        state.frequency
      );
      setEstimatedAmount(savingsPerPeriod ? +savingsPerPeriod : 0);
    }
    if (
      state.targetAmount &&
      state.endDate &&
      state.frequency &&
      state.startDate &&
      state.monthlyContribution
    ) {
      const savingsPerPeriod = calculateGoalAmount(
        +state.monthlyContribution,
        state.startDate.toISOString(),
        state.endDate.toISOString(),
        state.frequency
      );
      setNewGoal(savingsPerPeriod ? +savingsPerPeriod.toFixed(2) : 0);
    }
  }, [
    state.targetAmount,
    state.endDate,
    state.frequency,
    state.startDate,
    state.monthlyContribution,
  ]);  useEffect(() => {
    if (+state.monthlyContribution > +state.targetAmount && state.targetAmount) {
      setShowPreferredSavingsWarning(true);
    } else {
      setShowPreferredSavingsWarning(false);
    }
  }, [state.targetAmount, state.monthlyContribution]);  useEffect(() => {
    const isValidTime = (time: string) =>
      time && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);const now = new Date();
const isStartDateToday =
  state.startDate &&
  new Date(state.startDate).toDateString() === now.toDateString();
let isTimeValid = true;

if (state.autoSave && state.preferredTime && isStartDateToday) {
  const [hours, minutes] = state.preferredTime.split(':').map(Number);
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // Local time (WAT)
  const selectedTimeInMinutes = hours * 60 + minutes;
  isTimeValid = selectedTimeInMinutes > currentTimeInMinutes;
}

if (
  !state.targetAmount ||
  !state.goalName ||
  !state.frequency ||
  !state.startDate ||
  !state.duration ||
  !state.savingCategory ||
  !state.savingSource ||
  !state.monthlyContribution ||
  (state.savingSource === 'Card' && !authorizationCode) ||
  (state.autoSave && (!state.preferredTime || !isValidTime(state.preferredTime) || !isTimeValid))
) {
  setProceedButtonDisabled(true);
} else {
  setProceedButtonDisabled(false);
}  }, [state, authorizationCode]);  const handleProceed = () => {
    const now = new Date();
    const isStartDateToday =
      state.startDate &&
      new Date(state.startDate).toDateString() === now.toDateString();if (
  isStartDateToday &&
  +state.monthlyContribution > (user.balance ?? 0) &&
  state.savingSource !== 'Card'
) {
  dispatch(
    updateToast({
      displayToast: true,
      toastMessage: 'You do not have enough balance to fund your savings',
      toastType: 'info',
    })
  );
  return;
}

if (+(+state.monthlyContribution).toFixed(2) !== estimatedAmount) {
  setShowGoalSheet(true);
  savingsInitialState({
    type: 'SET_TARGET_AMOUNT',
    payload: newGoal.toString(),
  });
  return;
}

if (state.savingSource === 'Card' && !authorizationCode) {
  dispatch(
    updateToast({
      displayToast: true,
      toastMessage: 'Please verify your card first',
      toastType: 'info',
    })
  );
  return;
}

// If autosave is enabled and start date is today, check if preferred time has passed
if (state.autoSave && isStartDateToday && state.preferredTime) {
  const [hours, minutes] = state.preferredTime.split(':').map(Number);
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes(); // Local time (WAT)
  const selectedTimeInMinutes = hours * 60 + minutes;

  if (currentTimeInMinutes >= selectedTimeInMinutes) {
    // Adjust autosave to next valid occurrence based on frequency
    let nextAutosaveDate = new Date(state.startDate);
    nextAutosaveDate.setUTCHours(0, 0, 0, 0); // Ensure UTC midnight
    if (state.frequency === 'daily') {
      nextAutosaveDate.setDate(nextAutosaveDate.getDate() + 1);
    } else if (state.frequency === 'weekly') {
      nextAutosaveDate.setDate(nextAutosaveDate.getDate() + 7);
    } else if (state.frequency === 'monthly') {
      nextAutosaveDate.setMonth(nextAutosaveDate.getMonth() + 1);
    }

    dispatch(
      updateToast({
        displayToast: true,
        toastMessage: `Preferred time has passed for today. Autosave scheduled for ${nextAutosaveDate.toDateString()} at ${state.preferredTime}.`,
        toastType: 'info',
      })
    );

    savingsInitialState({
      type: 'SET_START_DATE',
      payload: nextAutosaveDate,
    });
  }
}

// Ensure startDate is set to midnight UTC
const startDateMidnight = new Date(state.startDate);
startDateMidnight.setUTCHours(0, 0, 0, 0);

navigate('CreateSavings', {
  ...state,
  startDate: startDateMidnight,
  targetAmount: state.targetAmount,
  authorizationCode: state.savingSource === 'Card' ? authorizationCode : null,
});  };  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
          color="white"
          onPress={() => navigate('PreviousScreen')}
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Create a Savings Goal
          </CText>      <View
        style={{
          backgroundColor: '#DBD4FC',
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(8),
          borderRadius: size.getHeightSize(8),
          marginTop: size.getHeightSize(16),
          gap: size.getWidthSize(8),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <LoanInfoIcon size={size.getHeightSize(24)} />
        <CText
          color="secondaryBlack"
          fontSize={12}
          lineHeight={16.8}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            flex: 1,
          }}
        >
          Set up a new savings target and get paid every day (@{' '}
          {savingsType?.interestRate ?? 0}% interest P.A) to reach your goals
          faster.
        </CText>
      </View>
      <View
        style={{
          marginTop: size.getHeightSize(16),
          gap: size.getHeightSize(16),
        }}
      >
        <PTextInput
          placeholder="Savings Title"
          onChangeText={(text) => {
            savingsInitialState({
              type: 'SET_GOAL_NAME',
              payload: text,
            });
          }}
          value={state.goalName}
        />
        <PTextInput
          placeholder="₦ Set savings goal"
          isAmount
          onChangeText={(text) => {
            savingsInitialState({
              type: 'SET_TARGET_AMOUNT',
              payload: text,
            });
          }}
          value={state.targetAmount}
          keyboardType="number-pad"
        />
        <View
          style={{
            gap: size.getHeightSize(8),
          }}
        >
          <CText
            color="secondaryBlack"
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              textAlign: 'left',
            }}
          >
            Set Savings Duration
          </CText>
          <View style={styles.wrap}>
            <Pressable
              onPress={() => {
                setHideCustomizedDuration(true);
                const date = new Date();
                date.setUTCHours(0, 0, 0, 31);
                date.setMonth(date.getMonth() + 1);
                savingsInitialState({
                  type: 'SET_DURATION',
                  payload: date,
                });
                savingsInitialState({
                  type: 'SET_DURATION_STRING',
                  payload: '1 month',
                });
                setEndDate('1month');
              }}
              style={endDate === '1month' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === '1month' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                1 Month
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                setHideCustomizedDuration(true);
                const date = new Date();
                date.setUTCHours(0, 0, 0, 0);
                date.setMonth(date.getMonth() + 3);
                savingsInitialState({
                  type: 'SET_DURATION',
                  payload: date,
                });
                savingsInitialState({
                  type: 'SET_DURATION_STRING',
                  payload: '3 months',
                });
                setEndDate('3months');
              }}
              style={endDate === '3months' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === '3months' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                3 Months
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                setHideCustomizedDuration(true);
                const date = new Date();
                date.setUTCHours(0, 0, 0, 0);
                date.setMonth(date.getMonth() + 6);
                savingsInitialState({
                  type: 'SET_DURATION',
                  payload: date,
                });
                savingsInitialState({
                  type: 'SET_DURATION_STRING',
                  payload: '6 months',
                });
                setEndDate('6months');
              }}
              style={endDate === '6months' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === '6months' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                6 Months
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                setHideCustomizedDuration(true);
                const date = new Date();
                date.setUTCHours(0, 0, 0, 0);
                date.setMonth(date.getMonth() + 9);
                savingsInitialState({
                  type: 'SET_DURATION',
                  payload: date,
                });
                savingsInitialState({
                  type: 'SET_DURATION_STRING',
                  payload: '9 months',
                });
                setEndDate('9months');
              }}
              style={endDate === '9months' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === '9months' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                9 Months
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                setHideCustomizedDuration(true);
                const date = new Date();
                date.setUTCHours(0, 0, 0, 0);
                date.setFullYear(date.getFullYear() + 1);
                savingsInitialState({
                  type: 'SET_DURATION',
                  payload: date,
                });
                savingsInitialState({
                  type: 'SET_DURATION_STRING',
                  payload: '1 year',
                });
                setEndDate('1year');
              }}
              style={endDate === '1year' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === '1year' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                1 Year
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowCustomizeDuration(true);
              }}
              style={endDate === 'customize' ? styles.isSelected : styles.view}
            >
              <CText
                color={endDate === 'customize' ? 'white' : 'primaryColor'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                Customize
              </CText>
            </Pressable>
          </View>
          {!hideCustomizedDuration && (
            <>
              <CText
                color="secondaryBlack"
                fontSize={16}
                lineHeight={22.4}
                fontFamily="regular"
              >
                Customized duration
              </CText>
              <Pressable
                onPress={() => {
                  setShowDuration(true);
                }}
                style={{
                  backgroundColor: colors.black('07'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: size.getHeightSize(12),
                  borderRadius: size.getHeightSize(8),
                  borderWidth: size.getHeightSize(1),
                  borderColor: colors.black('17'),
                }}
              >
                <CText
                  fontSize={16}
                  lineHeight={22.4}
                  fontFamily="semibold"
                >
                  {customizedDuration || 'Select duration'}
                </CText>
              </Pressable>
            </>
          )}
        </View>
        <View
          style={{
            gap: size.getHeightSize(8),
          }}
        >
          <CText
            color="secondaryBlack"
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              textAlign: 'left',
            }}
          >
            How will you like to save?
          </CText>
          {!endDate && (
            <CText
              color="secondaryBlack"
              fontSize={14}
              lineHeight={20}
              fontFamily="regular"
              style={{ marginBottom: size.getHeightSize(8) }}
            >
              Please select a savings duration first.
            </CText>
          )}
          <View style={styles.wrap}>
            <Pressable
              onPress={() => {
                if (endDate) {
                  savingsInitialState({
                    type: 'SET_FREQUENCY',
                    payload: 'daily',
                  });
                } else {
                  dispatch(
                    updateToast({
                      displayToast: true,
                      toastMessage: 'Please select a savings duration first',
                      toastType: 'info',
                    })
                  );
                }
              }}
              disabled={!endDate}
              style={
                state.frequency === 'daily' && endDate
                  ? styles.isSelected
                  : styles.view
              }
            >
              <CText
                color={
                  state.frequency === 'daily' && endDate
                    ? 'white'
                    : 'primaryColor'
                }
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
                style={!endDate ? { opacity: 0.5 } : {}}
              >
                Daily
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                if (endDate) {
                  savingsInitialState({
                    type: 'SET_FREQUENCY',
                    payload: 'weekly',
                  });
                } else {
                  dispatch(
                    updateToast({
                      displayToast: true,
                      toastMessage: 'Please select a savings duration first',
                      toastType: 'info',
                    })
                  );
                }
              }}
              disabled={!endDate}
              style={
                state.frequency === 'weekly' && endDate
                  ? styles.isSelected
                  : styles.view
              }
            >
              <CText
                color={
                  state.frequency === 'weekly' && endDate
                    ? 'white'
                    : 'primaryColor'
                }
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
                style={!endDate ? { opacity: 0.5 } : {}}
              >
                Weekly
              </CText>
            </Pressable>
            <Pressable
              onPress={() => {
                if (endDate) {
                  savingsInitialState({
                    type: 'SET_FREQUENCY',
                    payload: 'monthly',
                  });
                } else {
                  dispatch(
                    updateToast({
                      displayToast: true,
                      toastMessage: 'Please select a savings duration first',
                      toastType: 'info',
                    })
                  );
                }
              }}
              disabled={!endDate}
              style={
                state.frequency === 'monthly' && endDate
                  ? styles.isSelected
                  : styles.view
              }
            >
              <CText
                color={
                  state.frequency === 'monthly' && endDate
                    ? 'white'
                    : 'primaryColor'
                }
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
                style={!endDate ? { opacity: 0.5 } : {}}
              >
                Monthly
              </CText>
            </Pressable>
          </View>
        </View>
        <View>
          <CText fontSize={16} lineHeight={22.4} fontFamily="regular">
            Choose start date
          </CText>
          <Pressable onPress={showDatePicker} style={styles.view5}>
            <CText
              fontSize={14}
              lineHeight={22.4}
              color={'secondaryBlack'}
              fontFamily="regular"
            >
              {state.startDate
                ? new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(state.startDate))
                : 'Select start date'}
            </CText>
          </Pressable>
          {showDate && (
            <DateTimePicker
              value={date || new Date()}
              minimumDate={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
              style={{
                alignSelf: 'center',
              }}
            />
          )}
        </View>
        <Pressable
          onPress={() => {
            if (!state.targetAmount) {
              dispatch(
                updateToast({
                  displayToast: true,
                  toastMessage: 'Please set your target amount',
                  toastType: 'info',
                })
              );
              return;
            }
            setShowSource(true);
          }}
          style={styles.view4}
        >
          <CText
            color={state.savingSource ? 'black' : colors.black('70')}
            fontSize={14}
            lineHeight={19.2}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {state.savingSource || 'Select source of funding'}
          </CText>
          <AntDesign
            name="caretdown"
            size={size.getHeightSize(16)}
            color={colors.primary()}
          />
        </Pressable>
        {state.savingSource === 'Wallet' && (
          <CText
            color="secondaryBlack"
            fontSize={12}
            lineHeight={14}
            fontFamily="bold"
            style={{ textAlign: 'right' }}
          >
            Wallet Bal: ₦{formatToAmount(user.balance ?? 0)}
          </CText>
        )}
        {state.targetAmount &&
          state.endDate &&
          state.frequency &&
          state.startDate && (
            <View
              style={{
                backgroundColor: '#DBD4FC',
                paddingHorizontal: size.getWidthSize(16),
                paddingVertical: size.getHeightSize(8),
                borderRadius: size.getHeightSize(8),
                gap: size.getWidthSize(8),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <CText
                color="secondaryBlack"
                fontSize={12}
                lineHeight={16.8}
                fontFamily="regular"
                style={{ textAlign: 'left', flex: 1 }}
              >
                Based on your selection above, you should be saving ₦{' '}
                {calculateSavingsPerPeriod(
                  +state.targetAmount,
                  state.startDate.toISOString(),
                  state.endDate.toISOString(),
                  state.frequency
                )?.toFixed(2) ?? '0.00'}{' '}
                {state.frequency.slice(0, 1).toLowerCase() +
                  state.frequency.slice(1).toLowerCase()}
                .
              </CText>
            </View>
          )}
        <PTextInput
          isAmount
          onChangeText={(text) => {
            savingsInitialState({
              type: 'SET_MONTHLY_CONTRIBUTION',
              payload: text,
            });
          }}
          value={state.monthlyContribution}
          placeholder="₦ Preferred amount to save on a basis"
          keyboardType="number-pad"
        />
        {showPreferredSavingsWarning && (
          <View style={styles.view6}>
            <AntDesign
              name="infocirlce"
              color={colors.primaryWarning()}
              size={size.getHeightSize(16)}
            />
            <CText
              fontSize={14}
              lineHeight={16}
              style={{ flex: 1 }}
              color="warning"
            >
              Your preferred amount to save cannot be more than your savings goal
            </CText>
          </View>
        )}
        {state.targetAmount &&
          state.endDate &&
          state.frequency &&
          state.startDate && (
            <View style={styles.view3}>
              {generateSuggestions(
                calculateSavingsPerPeriod(
                  +state.targetAmount,
                  state.startDate.toISOString(),
                  state.endDate.toISOString(),
                  state.frequency
                ) ?? 0
              ).map((suggestedAmount, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    savingsInitialState({
                      type: 'SET_MONTHLY_CONTRIBUTION',
                      payload: suggestedAmount.toFixed(2).toString(),
                    });
                  }}
                  style={
                    state.monthlyContribution === suggestedAmount.toFixed(2).toString()
                      ? styles.amountSelected
                      : styles.view2
                  }
                >
                  <CText
                    color={'black'}
                    fontSize={12}
                    lineHeight={19.2}
                    fontFamily="semibold"
                  >
                    ₦ {suggestedAmount.toFixed(2)}
                  </CText>
                </Pressable>
              ))}
            </View>
          )}
        <Pressable
          onPress={() => {
            setShowCategory(true);
          }}
          style={styles.view4}
        >
          <CText
            color={state.savingCategory ? 'black' : colors.black('70')}
            fontSize={14}
            lineHeight={19.2}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            {state.savingCategory || 'Select category'}
          </CText>
          <AntDesign
            name="caretdown"
            size={size.getHeightSize(16)}
            color={colors.primary()}
          />
        </Pressable>
        <View style={styles.view4}>
          <CText
            fontSize={12}
            lineHeight={19.2}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            Do you want to enable auto savings?
          </CText>
          <Switch
            value={state.autoSave}
            onValueChange={(value) => {
              savingsInitialState({
                type: 'SET_AUTO_SAVE',
                payload: value,
              });
            }}
            trackColor={{ false: '#767577', true: colors.primary() }}
          />
        </View>
        {state.autoSave && (
          <View>
            <CText fontSize={16} lineHeight={22.4} fontFamily="regular">
              Set preferred time
            </CText>
            <Pressable onPress={() => setShowTime(true)} style={styles.view5}>
              <CText
                fontSize={14}
                lineHeight={22.4}
                color={state.preferredTime ? 'black' : 'secondaryBlack'}
                fontFamily="regular"
              >
                {state.preferredTime || 'Select preferred time'}
              </CText>
            </Pressable>
            {showTime && (
              <DateTimePicker
                value={selectedTime || new Date()}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeTime}
                style={{
                  alignSelf: 'center',
                }}
              />
            )}
          </View>
        )}
        <View style={styles.view4}>
          <CText
            fontSize={12}
            lineHeight={19.2}
            fontFamily="semibold"
            style={{ flex: 1 }}
          >
            Do you want to enable auto withdrawal at the end of your savings duration?
          </CText>
          <Switch
            value={state.autoWithdrawal}
            onValueChange={(value) => {
              savingsInitialState({
                type: 'SET_AUTO_WITHDRAWAL',
                payload: value,
              });
            }}
            trackColor={{ false: '#767577', true: colors.primary() }}
          />
        </View>
      </View>
    </View>
    <View
      style={{
        paddingHorizontal: size.getWidthSize(16),
        marginTop: size.getHeightSize(16),
        marginBottom: size.getHeightSize(32),
      }}
    >
      <PrimaryButton
        disabled={isProceedButtonDisabled}
        onPress={handleProceed}
        label="Proceed"
      />
    </View>
  </ScrollView>
  <FundSourceBottomsheet
    onSelected={(source) => {
      savingsInitialState({
        type: 'SET_SAVING_SOURCE',
        payload: source.name,
      });
      if (source.name === 'Card') {
        setPay(true);
      }
    }}
    isVisible={showSource}
    onClose={() => {
      setShowSource(false);
    }}
  />
  <SavingsCategoryBottomsheet
    isVisible={showCategory}
    onClose={() => {
      setShowCategory(false);
    }}
    onSelected={(category) => {
      savingsInitialState({
        type: 'SET_SAVING_CATEGORY',
        payload: category.name,
      });
    }}
  />
  {pay && (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={paystackKey}
        amount={10} // Small amount for card verification
        billingEmail={user.email}
        phone={user?.phoneNumber}
        activityIndicatorColor={colors.primary()}
        channels={['card']}
        onCancel={() => {
          setPay(false);
          dispatch(
            updateToast({
              displayToast: true,
              toastMessage: 'Card verification cancelled. If debited, please contact support.',
              toastType: 'info',
            })
          );
        }}
        onSuccess={(response) => {
          if (response.data.status === 'success' || response.data.event === 'successful') {
            const authCode =
              response.data.transactionRef?.authorization_code ||
              response.data.authorization?.authorization_code ||
              response.data.data?.authorization?.authorization_code ||
              response.data.data?.authorization_code;
            if (authCode) {
              setAuthorizationCode(authCode);
              setPay(false);
              dispatch(
                updateToast({
                  displayToast: true,
                  toastMessage: 'Card verified successfully with ₦10 charge',
                  toastType: 'success',
                })
              );
            } else {
              setPay(false);
              dispatch(
                updateToast({
                  displayToast: true,
                  toastMessage:
                    'Card verification completed but no authorization code received. Please check Paystack Dashboard or contact support.',
                  toastType: 'warning',
                })
              );
            }
          } else {
            setPay(false);
            dispatch(
              updateToast({
                displayToast: true,
                toastMessage: `Card verification failed: ${response.data.message || 'Unknown error'}. Please contact support.`,
                toastType: 'error',
              })
            );
          }
        }}
        autoStart={pay}
        refNumber={`VERIFY_${user.userId}_${Date.now()}`}
      />
    </View>
  )}
  <GoalBottomsheet
    visibility={showGoalSheet}
    amount={newGoal.toString()}
    onClose={() => {
      setShowGoalSheet(false);
    }}
    onContinue={() => {
      savingsInitialState({
        type: 'SET_TARGET_AMOUNT',
        payload: newGoal.toString(),
      });
      navigate('CreateSavings', {
        ...state,
        targetAmount: newGoal.toString(),
        authorizationCode: state.savingSource === 'Card' ? authorizationCode : null,
      });
    }}
  />
  <CustomizedDuration
    isVisible={showCustomizeDuration}
    onSelected={(value) => {
      setSelectedDuration(value);
      setShowDuration(true);
    }}
    onClose={() => {
      setShowCustomizeDuration(false);
    }}
  />
  <SetDuration
    duration={selectedDuration}
    onClose={() => {
      setShowDuration(false);
    }}
    isVisible={showDuration}
    onSelected={(value, duration) => {
      const adjustedDate = new Date(value);
      adjustedDate.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
      setCustomizedDuration(duration);
      savingsInitialState({
        type: 'SET_DURATION',
        payload: adjustedDate,
      });
      savingsInitialState({
        type: 'SET_DURATION_STRING',
        payload: duration,
      });
      setShowDuration(false);
      setShowCustomizeDuration(false);
      setEndDate('customize');
      setHideCustomizedDuration(false);
    }}
  />
</GradientSafeAreaView>  );
};export default SavingsGoal;const styles = StyleSheet.create({
  view: {
    borderWidth: size.getHeightSize(1),
    width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    borderColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: size.getHeightSize(16),
    columnGap: size.getWidthSize(16),
    flexWrap: 'wrap',
  },
  view2: {
    backgroundColor: colors.black('07'),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(11.5),
    borderRadius: size.getHeightSize(8),
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    gap: size.getWidthSize(16),
  },
  isSelected: {
    backgroundColor: colors.primary(),
    borderWidth: size.getHeightSize(1),
    width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    borderColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountSelected: {
    backgroundColor: colors.black('50'),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(11.5),
    borderRadius: size.getHeightSize(8),
  },
  view5: {
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    marginTop: size.getHeightSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.black('30'),
    borderWidth: size.getHeightSize(1),
  },
  view6: {
    borderWidth: size.getHeightSize(1),
    borderColor: colors.primaryWarning('62'),
    paddingVertical: size.getHeightSize(8),
    flexDirection: 'row',
    gap: size.getWidthSize(16),
    alignItems: 'center',
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.primaryWarning('40'),
    borderRadius: size.getHeightSize(8),
  },
});

