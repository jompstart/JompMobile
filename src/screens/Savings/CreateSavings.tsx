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
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import PencilIcon from '../../../assets/svgs/Dashboard/PencilIcon';
import AddIcon from '../../../assets/svgs/Dashboard/AddIcon';
const CreateSavings = () => {
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
                  My New Savings
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
                  ₦400,000.00
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
                  3 Months
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
                  Daily
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
                  ₦5,000.00
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
                  Yes
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
                  My Wallet
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
                  Yes
                </CText>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.view2,
            {
              marginVertical: size.getHeightSize(16),
            },
          ]}
        >
          <View style={styles.view3} />
          <CText
            color={colors.black('70') as any}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              flex: 1,
            }}
          >
            I hereby agree that I will forfeit the interest accrued on this
            savings if I fail to meet this target amount of (₦200,000.00) by the
            end of the savings duration.
          </CText>
        </View>
        <View style={styles.view2}>
          <View style={styles.view3} />
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
        </View>
        <View
          style={{
            marginHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(38),
          }}
        >
          <PrimaryButton label="Create Savings" />
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
