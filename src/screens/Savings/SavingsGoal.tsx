import { StyleSheet, Pressable, View, Switch, Platform } from 'react-native';
import GradientHeader from '../../shared/GradientHeader';
import CText from '../../shared/CText';
import InfoIcon from '../../../assets/svgs/Loan/InfoIcon';
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  savingsFormReducer,
  createSavingsInitialState,
} from '../../features/Savings/savings.reducer';
import { useGetSavingsTypes } from '../../hooks/api/savings';
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
const SavingsGoal = () => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const [state, savingsInitialState] = useReducer(
    savingsFormReducer,
    createSavingsInitialState
  );
  const [endDate, setEndDate] = useState<
    '1month' | '3months' | '6months' | '9months' | '1year' | 'customize' | null
  >(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [pay, setPay] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showGoalSheet, setShowGoalSheet] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [newGoal, setNewGoal] = useState(0);
  const { data: savingsTypes } = useGetSavingsTypes(
    user.userId,
    user.customerId
  );

  const savingsType = savingsTypes?.data?.find(
    (item) => item.name == 'jompVault'
  );
  useEffect(() => {
    if (savingsType) {
      savingsInitialState({
        type: 'SET_INTEREST_RATE',
        payload: savingsType.interestRate.toString(),
      });
    }
  }, []);
  const onChange = (event: any, selectedDate?: Date) => {
    setShowDate(false);
    if (selectedDate) {
      setDate(selectedDate);
      savingsInitialState({
        type: 'SET_START_DATE',
        payload: selectedDate,
      });
    }
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setSelectedTime(selectedDate);
      const time = selectedDate.toLocaleTimeString();
      // Update the selected time
      savingsInitialState({
        type: 'SET_PREFERRED_TIME',
        payload: time,
      });
      setShowTime(false); // Close the picker
    } else if (event.type === 'dismissed') {
      setShowTime(false); // Close the picker if dismissed
    }
  };

  const showDatePicker = () => {
    setShowDate(true);
  };
  useEffect(() => {
    // set end date based on the start date and selected duration
    if (state.startDate && state.duration) {
      const startDate = new Date(state.startDate);
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
  }, [state.startDate, state.duration]);

  useEffect(() => {
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
        state.frequency as any
      );

      setEstimatedAmount(+savingsPerPeriod);
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
        state.frequency as any
      ).toFixed(2);

      setNewGoal(+savingsPerPeriod);
    }
  }, [
    state.targetAmount,
    state.endDate,
    state.frequency,
    state.startDate,
    state.monthlyContribution,
  ]);
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
            Set up a new savings goal and get paid every day (@{' '}
            {savingsType?.interestRate}% interest P.A) to reach your goals
            faster.
          </CText>
          <View
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
              {savingsType?.interestRate}% interest P.A) to reach your goals
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
                    // set date of 1 month from now
                    const date = new Date();
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
                    // set date of 3 month from now
                    const date = new Date();
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
                  style={
                    endDate === '3months' ? styles.isSelected : styles.view
                  }
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
                    // set date of 6 month from now
                    const date = new Date();
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
                  style={
                    endDate === '6months' ? styles.isSelected : styles.view
                  }
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
                    // set date of 9 month from now
                    const date = new Date();
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
                  style={
                    endDate === '9months' ? styles.isSelected : styles.view
                  }
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
                    // set date of 1 year from now
                    const date = new Date();
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
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Customize
                  </CText>
                </View>
              </View>
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
              <View style={styles.wrap}>
                <Pressable
                  onPress={() => {
                    savingsInitialState({
                      type: 'SET_FREQUENCY',
                      payload: 'daily',
                    });
                  }}
                  style={
                    state.frequency === 'daily'
                      ? styles.isSelected
                      : styles.view
                  }
                >
                  <CText
                    color={
                      state.frequency === 'daily' ? 'white' : 'primaryColor'
                    }
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Daily
                  </CText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    savingsInitialState({
                      type: 'SET_FREQUENCY',
                      payload: 'weekly',
                    });
                  }}
                  style={
                    state.frequency === 'weekly'
                      ? styles.isSelected
                      : styles.view
                  }
                >
                  <CText
                    color={
                      state.frequency === 'weekly' ? 'white' : 'primaryColor'
                    }
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Weekly
                  </CText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    savingsInitialState({
                      type: 'SET_FREQUENCY',
                      payload: 'monthly',
                    });
                  }}
                  style={
                    state.frequency === 'monthly'
                      ? styles.isSelected
                      : styles.view
                  }
                >
                  <CText
                    color={
                      state.frequency === 'monthly' ? 'white' : 'primaryColor'
                    }
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
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
                  {new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(state.startDate))}
                </CText>
              </Pressable>
              {showDate && (
                <DateTimePicker
                  value={date || new Date()}
                  minimumDate={new Date()}
                  mode="date" // Can be "date", "time", or "datetime"
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
                setShowCategory(true);
              }}
              style={styles.view4}
            >
              <CText
                color={
                  state.savingCategory ? 'black' : (colors.black('70') as any)
                }
                fontSize={14}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                {state.savingCategory || 'Select category'}
              </CText>
              <AntDesign
                name="caretdown"
                size={size.getHeightSize(16)}
                color={colors.primary()}
              />
            </Pressable>
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
                    color="secondary"
                    fontSize={12}
                    lineHeight={16.8}
                    fontFamily="regular"
                    style={{
                      textAlign: 'left',
                      flex: 1,
                    }}
                  >
                    Based on your selection above, you can be saving ₦{''}
                    {calculateSavingsPerPeriod(
                      +state.targetAmount,
                      state.startDate.toISOString(),
                      state.endDate.toISOString(),
                      state.frequency as any
                    )?.toFixed(2)}{' '}
                    {state.frequency.slice(0, 1).toLowerCase() +
                      state.frequency.slice(1).toLowerCase()}
                    .
                  </CText>
                </View>
              )}
            <PTextInput
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
                      state.frequency as any
                    )
                  ).map((suggestedAmount) => (
                    <Pressable
                      key={suggestedAmount}
                      onPress={() => {
                        savingsInitialState({
                          type: 'SET_MONTHLY_CONTRIBUTION',
                          payload: suggestedAmount.toFixed(2).toString(),
                        });
                      }}
                      style={
                        state.monthlyContribution ===
                        suggestedAmount.toFixed(2).toString()
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
                        ₦ {suggestedAmount.toFixed(2).toString()}{' '}
                      </CText>
                    </Pressable>
                  ))}
                </View>
              )}

            <View style={styles.view4}>
              <CText
                color={colors.black('70') as any}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
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
                <Pressable
                  onPress={() => setShowTime(true)}
                  style={styles.view5}
                >
                  <CText
                    fontSize={14}
                    lineHeight={22.4}
                    color={'secondaryBlack'}
                    fontFamily="regular"
                  >
                    {state.preferredTime
                      ? state.preferredTime
                      : 'Select preferred time'}
                  </CText>
                </Pressable>
                {showTime && (
                  <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time" // Can be "date", "time", or "datetime"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChangeTime}
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                )}
              </View>
            )}
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
                color={
                  state.savingSource ? 'black' : (colors.black('70') as any)
                }
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
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
                style={{
                  textAlign: 'right',
                }}
              >
                Waallet Bal: ₦{formatToAmount(user.balance)}
              </CText>
            )}
            <View style={styles.view4}>
              <CText
                color={colors.black('70') as any}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                Do you want to enable auto withdrawal at the end of your savings
                duration?
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
            onPress={() => {
              if (
                state.startDate.toDateString() === new Date().toDateString() &&
                +state.monthlyContribution > user.balance
              ) {
                dispatch(
                  updateToast({
                    displayToast: true,
                    toastMessage:
                      'You do not have enough balance to fund your savings',
                    toastType: 'info',
                  })
                );
                return;
              }
              if (+(+state.monthlyContribution).toFixed(2) != estimatedAmount) {
                setShowGoalSheet(true);
                savingsInitialState({
                  type: 'SET_TARGET_AMOUNT',
                  payload: newGoal.toString(),
                });
                return;
              } else {
                navigate('CreateSavings', {
                  ...state,
                  targetAmount: state.targetAmount,
                });
              }
            }}
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
            paystackKey="pk_test_dcf001888005335ea262e8ec9491f490d11731b6"
            amount={state.targetAmount}
            billingEmail={user.email}
            phone={user?.phoneNumber}
            activityIndicatorColor={colors.primary()}
            onCancel={(e) => {
              console.log(e);
              setPay(false);
            }}
            onSuccess={(response) => {
              if (response.data.event == 'successful') {
                setPay(false);
                dispatch(
                  updateToast({
                    displayToast: true,
                    toastMessage:
                      'You have successfully funded your wallet with ₦' +
                      formatToAmount(state.targetAmount),
                    toastType: 'success',
                  })
                );
              }
            }}
            autoStart={pay}
          />
        </View>
      )}
      <GoalBottomsheet
        visibility={showGoalSheet}
        amount={newGoal?.toString()}
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
          });
        }}
      />
    </GradientSafeAreaView>
  );
};

export default SavingsGoal;

const styles = StyleSheet.create({
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
});
