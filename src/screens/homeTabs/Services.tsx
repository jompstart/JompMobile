import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import PersonIcon from '../../../assets/svgs/Services/PersonIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import ArrowRightIcon from '../../../assets/svgs/Services/ArrowRightIcon';

import { colors } from '../../constants/colors';
const Services = () => {
  const { navigate, dispatch } = useNavigation();

  return (
    <GradientSafeAreaView>
      <GradientHeader disable>
        <MenuIcon
          onPress={() => {
            dispatch(DrawerActions.openDrawer());
          }}
          size={size.getHeightSize(28)}
        />
        <View style={{ flex: 1 }} />
        <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} />
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
          Services
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
          View the services you clicked on the links
        </CText>
        <View
          style={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              navigate('UserCreated');
            }}
            style={styles.view}
          >
            <PersonIcon size={size.getHeightSize(46)} />
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
                Services
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Select from our wide range of offerings.
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('CreatedServices');
            }}
            style={[
              styles.view,
              {
                backgroundColor: colors.white(),
              },
            ]}
          >
            <ProviderIcon size={size.getHeightSize(46)} />
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
                User Curated
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Pay later with Jomp for everyday services you already use
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </Pressable>
          <View
            style={[
              styles.view,
              {
                backgroundColor: '#ED9F0510',
              },
            ]}
          >
            <OrderBooks size={size.getHeightSize(46)} />
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
                Jomp Curated (Coming Soon)
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Access Jomp-specially curated services at great discounts.
              </CText>
            </View>
            <ArrowRightIcon
              width={size.getWidthSize(12)}
              height={size.getHeightSize(24)}
            />
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default Services;

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
});
