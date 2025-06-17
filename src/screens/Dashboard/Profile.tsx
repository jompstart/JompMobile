import { StyleSheet, Image, View, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import Opticons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { images } from '../../constants/images';
import PencilIcon from '../../../assets/svgs/Dashboard/PencilIcon';
import PhoneIcon from '../../../assets/svgs/Dashboard/PhoneIcon';
import IdIcon from '../../../assets/svgs/Dashboard/IdIcon';
import AddBankIcon from '../../../assets/svgs/Dashboard/AddBankIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetUserBanks } from '../../hooks/api/auth';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { obfuscateString } from '../../utils/stringManipulation';
const Profile = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate, goBack } = useNavigation();
  const user = useAppSelector(userSelector);
  const { data: banks } = useGetUserBanks(user?.userId, user?.customerId);

  return (
    <GradientSafeAreaView>
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
        <Pressable
          onPress={() => goBack()}
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
        </Pressable>
        <View
          style={{
            height: size.getHeightSize(146),
            width: size.getHeightSize(146),
            alignSelf: 'center',
            marginTop: size.getHeightSize(14),
            backgroundColor: '#FFFFFF95',
            borderRadius: size.getHeightSize(200),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="person" size={100} color={colors.primary('')} />
          {/* <Image
            style={{
              height: '100%',
              width: '100%',
              borderRadius: size.getHeightSize(200),
            }}
            source={images.pfpImage}
          /> */}
          {/* <View
            style={{
              position: 'absolute',
              height: size.getHeightSize(45.31),
              width: size.getHeightSize(45.31),
              borderRadius: size.getHeightSize(200),
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
                borderRadius: size.getHeightSize(200),
                backgroundColor: colors.primary(),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PencilIcon size={size.getHeightSize(20.14)} />
            </View>
          </View> */}
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
          {user?.fullName}
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
            {/* <View
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
            </View> */}
          </View>
          <View
            style={{
              gap: size.getHeightSize(8),
            }}
          >
            <View style={styles.view3}>
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
                {user?.email}
              </CText>
            </View>
            <View style={styles.view3}>
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
                {user?.phoneNumber}
              </CText>
            </View>
            <View style={styles.view3}>
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
                {user?.bvn}
              </CText>
            </View>
            <View style={styles.view3}>
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
                {user?.niN}
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
            <View style={styles.view4}>
              {banks?.data?.map(
                (bank, index) =>
                  bank.accountNumber && (
                    <View key={index} style={styles.view1}>
                      <View style={styles.view2}>
                        <CText
                          color={colors.black('70') as any}
                          fontSize={13}
                          lineHeight={18.2}
                          fontFamily="bold"
                          style={styles.text}
                        >
                          {bank.bankName}
                        </CText>
                        <CText
                          color={colors.black('70') as any}
                          fontSize={12}
                          lineHeight={16.8}
                          fontFamily="semibold"
                          style={styles.text}
                        >
                          {bank.accountName}
                        </CText>
                        <CText
                          color={colors.black('70') as any}
                          fontSize={12}
                          lineHeight={16.8}
                          fontFamily="semibold"
                          style={styles.text}
                        >
                          {obfuscateString(bank.accountNumber)}
                        </CText>
                      </View>
                    </View>
                  )
              )}
              <Pressable
                onPress={() => navigate('AddBank')}
                style={styles.view5}
              >
                <MaterialIcons
                  color={colors.black('95') as any}
                  name="add"
                  size={size.getHeightSize(40)}
                />
                <CText
                  color={colors.black('70') as any}
                  fontSize={12}
                  lineHeight={16.8}
                >
                  Add more banks
                </CText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </GradientSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(19),
    borderBottomWidth: size.getHeightSize(1),
    borderColor: colors.primary('20'),
  },
  view1: {
    justifyContent: 'center',
    backgroundColor: colors.white(),
    paddingHorizontal: size.getWidthSize(15),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(8),
    width: size.getWidthSize(177),
  },
  check1: {
    position: 'absolute',
    top: size.getHeightSize(10),
    right: size.getWidthSize(10),
  },
  check2: {
    height: size.getHeightSize(20),
    width: size.getHeightSize(20),
    backgroundColor: colors.primary(),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check3: {
    height: size.getHeightSize(15),
    width: size.getHeightSize(15),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white(),
  },
  check4: {
    backgroundColor: colors.primary(),
    height: size.getHeightSize(10),
    width: size.getHeightSize(10),
    borderRadius: '100%',
  },
  imageView: {
    height: size.getHeightSize(75),
    width: size.getHeightSize(75),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  view2: {
    gap: size.getHeightSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: size.getHeightSize(16),
    rowGap: size.getHeightSize(16),
    columnGap: size.getWidthSize(16),
  },
  view5: {
    height: size.getHeightSize(80),
    backgroundColor: colors.white(),
    width: size.getWidthSize(177),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: size.getHeightSize(8),
    borderRadius: size.getHeightSize(8),
  },
});
