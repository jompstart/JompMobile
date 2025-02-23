import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from '../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../shared/GradientHeader';
import GradientSafeAreaView from '../shared/GradientSafeAreaView';
import HeartIcon from '../../assets/svgs/Dashboard/HeartIcon';
import CarIcon from '../../assets/svgs/Home/CarIcon';
import SchoolIcon from '../../assets/svgs/Home/SchoolIcon';
import PenBookIcon from '../../assets/svgs/Dashboard/PenBookIcon';
import HouseIcon from '../../assets/svgs/Loan/HouseIcon';
import { useNavigation } from '@react-navigation/native';
const UserCreated = () => {
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
          User Created
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
          Pay for services you have already received or not listed.
        </CText>
        <View
          style={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#424E9B1A',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#424E9B4D',
                },
              ]}
            >
              <SchoolIcon size={size.getHeightSize(27)} />
            </View>
            <Pressable
              onPress={() => {
                navigate('PayServices');
              }}
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
                School Fees
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Get access to school fees for you and your loved ones and pay at
                your convenience.
              </CText>
            </Pressable>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </View>
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#0066FF26',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#0066FF4D',
                },
              ]}
            >
              <HouseIcon size={size.getHeightSize(27)} />
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
                House Rent
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Sort our your rent with Pay Later with Jomp
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </View>
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#1B741E26',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#1B741E4D',
                },
              ]}
            >
              <CarIcon size={size.getHeightSize(27)} />
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
                Transport Credit
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Access transport services curated just for you with Pay Later
                with Jomp
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </View>
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#F8E7EC',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#F1B7B8',
                },
              ]}
            >
              <HeartIcon size={size.getHeightSize(27)} />
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
                Health
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Coming soon.
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </View>
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#ED9F0526',
              },
            ]}
          >
            <View
              style={[
                styles.view2,
                {
                  backgroundColor: '#ED9F064D',
                },
              ]}
            >
              <PenBookIcon size={size.getHeightSize(27)} />
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
                Other Service Types
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Access health, auto care, etc
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default UserCreated;

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
