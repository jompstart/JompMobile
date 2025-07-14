import { StyleSheet, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import BankIcon from '../../../assets/svgs/Home/BankIcon';
import CardIcon from '../../../assets/svgs/Cards/CardIcon';
import {
  useAppDispatch,
  useAppSelector,
} from '../../controller/redux.controller';
import { updateAccountDetailsBottomsheetVisibility } from '../../features/ui/ui.slice';
import { userSelector } from '../../features/user/user.selector';

const FundWallet = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

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
          Fund Wallet
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
          Easily top up your account with this options
        </CText>
        <View
          style={{
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(
                updateAccountDetailsBottomsheetVisibility({
                  isVisible: true,
                  shouldConfirmTransfer: false,
                })
              );
            }}
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
              <BankIcon size={size.getHeightSize(28)} />
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
                Bank Transfer
              </CText>
              <CText
                color={'secondaryBlack'}
                fontSize={13}
                lineHeight={18.2}
                fontFamily="regular"
              >
                Top up with bank transfer
              </CText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={size.getHeightSize(20)}
              color={colors.primary()}
            />
          </Pressable>
          <View
            style={{
              backgroundColor: '#ED9F0526',
              gap: size.getWidthSize(8),

              borderRadius: size.getHeightSize(8),
            }}
          >
            <Pressable
              onPress={() => {
                navigate('AddCard');
              }}
              style={[
                styles.view,
                {
                  backgroundColor: 'transparent',
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
                <CardIcon size={size.getHeightSize(26)} />
              </View>
              <Pressable
                onPress={() => {
                  navigate('AddCard');
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
                  Card
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={13}
                  lineHeight={18.2}
                  fontFamily="regular"
                >
                  Top up with saved card or add a new card
                </CText>
              </Pressable>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={size.getHeightSize(20)}
                color={colors.primary()}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default FundWallet;

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
