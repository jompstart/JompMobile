import { StyleSheet, Image, View, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import Opticons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { images } from '../../constants/images';
import PencilIcon from '../../../assets/svgs/Dashboard/PencilIcon';
import PhoneIcon from '../../../assets/svgs/Dashboard/PhoneIcon';
import IdIcon from '../../../assets/svgs/Dashboard/IdIcon';
import AddBankIcon from '../../../assets/svgs/Dashboard/AddBankIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent={false} />

      <LinearGradient
        colors={['#EFA005', '#C5520A']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: size.getHeightSize(311),

          paddingTop: top,
          borderBottomLeftRadius: size.getHeightSize(8),
          borderBottomRightRadius: size.getHeightSize(8),
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
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
        </View>
        <View
          style={{
            height: size.getHeightSize(146),
            width: size.getHeightSize(146),
            borderRadius: '100%',
            alignSelf: 'center',
            marginTop: size.getHeightSize(14),
          }}
        >
          <Image
            style={{
              height: '100%',
              width: '100%',
              borderRadius: '100%',
            }}
            source={images.pfpImage}
          />
          <View
            style={{
              position: 'absolute',
              height: size.getHeightSize(45.31),
              width: size.getHeightSize(45.31),
              borderRadius: '100%',
              backgroundColor: colors.white(),
              paddingVertical: size.getHeightSize(3.02),
              paddingHorizontal: size.getWidthSize(3.02),
              bottom: 0,
              right: 0,
            }}
          >
            <View
              style={{
                height: '100%',
                width: '100%',
                borderRadius: '100%',
                backgroundColor: colors.primary(),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PencilIcon size={size.getHeightSize(20.14)} />
            </View>
          </View>
        </View>
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Timmy Ajanlekoko
        </CText>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackground(),
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: size.getHeightSize(27),
            }}
          >
            <CText
              color={'black'}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="semibold"
            >
              Details
            </CText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: size.getWidthSize(8),
              }}
            >
              <Feather
                name="edit"
                size={size.getHeightSize(16)}
                color={colors.primary()}
              />
              <CText
                color={'primaryColor'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
              >
                Edit Profile
              </CText>
            </View>
          </View>
          <View
            style={{
              gap: size.getHeightSize(8),
            }}
          >
            <View style={styles.view1}>
              <Opticons
                name="mail"
                color={colors.primary()}
                size={size.getHeightSize(24)}
              />
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                Email Address
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  textAlign: 'right',
                }}
              >
                timmyajanlekoko@gmail.com
              </CText>
            </View>
            <View style={styles.view1}>
              <PhoneIcon size={size.getHeightSize(24)} />
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                Phone Number
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  textAlign: 'right',
                }}
              >
                2348012345678
              </CText>
            </View>
            <View style={styles.view1}>
              <IdIcon size={size.getHeightSize(24)} />
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                BVN
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  textAlign: 'right',
                }}
              >
                1234567890
              </CText>
            </View>
            <View style={styles.view1}>
              <IdIcon size={size.getHeightSize(24)} />
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  flex: 1,
                }}
              >
                NIN
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={12}
                lineHeight={19.2}
                fontFamily="semibold"
                style={{
                  textAlign: 'right',
                }}
              >
                123-456-7890
              </CText>
            </View>
          </View>
          <View>
            <CText
              color={'black'}
              fontSize={14}
              lineHeight={22.4}
              fontFamily="semibold"
              style={{
                marginTop: size.getHeightSize(24),
              }}
            >
              Linked Bank Accounts
            </CText>
            <Pressable
              onPress={() => navigate('AddBank')}
              style={{
                height: size.getHeightSize(80),
                backgroundColor: colors.white(),
                width: size.getWidthSize(177),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: size.getHeightSize(8),
              }}
            >
              <AddBankIcon size={size.getHeightSize(80)} />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(19),
    borderBottomWidth: size.getHeightSize(1),
    borderColor: colors.primary('20'),
  },
});
