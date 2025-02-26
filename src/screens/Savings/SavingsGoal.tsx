import { StyleSheet, Text, View, Switch } from 'react-native';
import GradientHeader from '../../shared/GradientHeader';
import CText from '../../shared/CText';
import InfoIcon from '../../../assets/svgs/Loan/InfoIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { size } from '../../config/size';
import LoanInfoIcon from '../../../assets/svgs/Loan/LoanInfoIcon';
import PTextInput from '../../shared/PTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import FundSourceBottomsheet from '../../components/Savings/FundSourceBottomsheet';
import { useNavigation } from '@react-navigation/native';
const SavingsGoal = () => {
  const { navigate } = useNavigation();
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
            Set up a new savings goal and get paid every day (@ 12% interest
            P.A) to reach your goals faster.
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
              Set up a new savings target and get paid every day (@ 12% interest
              P.A) to reach your goals faster.
            </CText>
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(16),
              gap: size.getHeightSize(16),
            }}
          >
            <PTextInput placeholder="Savings Title" />
            <PTextInput placeholder="₦ Set savings goal" />
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
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    1 Month
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    3 Months
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    6 Months
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    9 Months
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    1 Year
                  </CText>
                </View>
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
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Daily
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Weekly
                  </CText>
                </View>
                <View style={styles.view}>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                  >
                    Monthly
                  </CText>
                </View>
              </View>
            </View>

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
                Based on your selection above, you can be saving ₦ 100,000.00
                per month.
              </CText>
            </View>
            <PTextInput placeholder="₦ Preferred amount to save on a basis" />
            <View style={styles.view3}>
              <View style={styles.view2}>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  ₦ 500
                </CText>
              </View>
              <View style={styles.view2}>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  ₦ 1,000
                </CText>
              </View>
              <View style={styles.view2}>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  ₦ 1,500
                </CText>
              </View>
              <View style={styles.view2}>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  ₦ 5000
                </CText>
              </View>
              <View style={styles.view2}>
                <CText
                  color={'black'}
                  fontSize={12}
                  lineHeight={19.2}
                  fontFamily="semibold"
                >
                  ₦ 10,000
                </CText>
              </View>
            </View>
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
              // trackColor={{ false: '#767577', true: '#81b0ff' }}
              // thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
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
                Select a source of funding
              </CText>
              <AntDesign
                name="caretdown"
                size={size.getHeightSize(16)}
                color={colors.primary()}
              />
            </View>
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
              // trackColor={{ false: '#767577', true: '#81b0ff' }}
              // thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
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
            onPress={() => navigate('CreateSavings')}
            label="Proceed"
          />
        </View>
      </ScrollView>
      <FundSourceBottomsheet />
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
});
