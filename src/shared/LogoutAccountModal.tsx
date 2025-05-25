import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import BottomsheetWrapper from './BottomsheetWrapper';
import { size } from '../config/size';
import CText from './CText';
import PrimaryButton from './PrimaryButton';
import { useAppSelector, useAppDispatch } from '../controller/redux.controller';
import { updateLogoutBottomsheetVisibility } from '../features/ui/ui.slice';
import { images } from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutBottomsheetSelector } from '../features/ui/ui.selector';
import { useNavigation } from '@react-navigation/native';
import LogOutIcon from '../../assets/svgs/Drawer/LogoutIcon';
const LogoutAccountModal = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isVisible = useAppSelector(logoutBottomsheetSelector);
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={() => {
        dispatch(updateLogoutBottomsheetVisibility(false));
      }}
    >
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: size.getHeightSize(24),
          }}
        >
          <LogOutIcon size={size.getWidthSize(40)} />
        </View>
        <CText
          fontFamily="bold"
          fontSize={18}
          lineHeight={24}
          style={{
            textAlign: 'center',
            marginTop: size.getHeightSize(16),
          }}
        >
          Are you sure you want to logout?
        </CText>

        <PrimaryButton
          onPress={() => {
            AsyncStorage.removeItem('token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
            dispatch(updateLogoutBottomsheetVisibility(false));
          }}
          style={{
            marginTop: size.getHeightSize(32),
            paddingVertical: size.getHeightSize(15.5),
          }}
          label={'Continue'}
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default LogoutAccountModal;

const styles = StyleSheet.create({});
