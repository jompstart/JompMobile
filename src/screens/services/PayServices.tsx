import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import StudentIcon from '../../../assets/svgs/Dashboard/StudentIcon';
import ChildIcon from '../../../assets/svgs/Dashboard/ChildIcon';
import { useNavigation } from '@react-navigation/native';
const PayServices = () => {
  const { navigate } = useNavigation();
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(20)}
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
          Pay School Fees for Your Child or Yourself
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
          Get access to school fees for you and your loved ones and pay at your
          convenience.
        </CText>
        <View
          style={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              navigate('GuardianDetails');
            }}
            style={[
              styles.view,
              {
                backgroundColor: '#56BAEB26',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#56BAEB4D',
                },
              ]}
            >
              <ChildIcon size={size.getHeightSize(27)} />
            </View>
            <View
              style={{
                flex: 1,
                gap: size.getHeightSize(6),
              }}
            >
              <CText
                color={'black'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                For My Child
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Apply for school fees loan for your child.
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('SelfDetails');
            }}
            style={[
              styles.view,
              {
                backgroundColor: '#EFA00526',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#EFA0054D',
                },
              ]}
            >
              <StudentIcon size={size.getHeightSize(27)} />
            </View>
            <View
              style={{
                flex: 1,
                gap: size.getHeightSize(6),
              }}
            >
              <CText
                color={'black'}
                fontSize={16}
                lineHeight={22.4}
                fontFamily="bold"
              >
                For Myself
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Apply for school fees loan for yourself.
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </Pressable>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default PayServices;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: '#424E9B10',
    borderRadius: size.getHeightSize(8),
  },
  text: {
    opacity: 0.75,
    marginTop: size.getHeightSize(4),
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
  },
});
