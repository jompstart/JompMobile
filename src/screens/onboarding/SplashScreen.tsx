import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../controller/redux.controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import {
  changeUserState,
  updateUserState,
} from '../../features/user/user.slice';
import { UserService } from '../../services/user';
import { ComplianceService } from '../../services/compliance';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
      if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        dispatch(
          updateUserState({
            accountPreference: decoded.clientId,
            token: token,
            customerId: decoded.customerId,
            userId: decoded.UserId,
          })
        );
        const userInstance = new UserService(
          decoded.customerId,
          decoded.UserId
        );
        try {
          const user = await userInstance.getCustomer();

          const wallet = await userInstance.getCustomerWallet();

          const userBanks = await userInstance.getUserBankDetails();

          if (!userBanks.data && user.data?.complianceFlag == true) {
            const complianceInstance = new ComplianceService(
              decoded.UserId,
              decoded.customerId
            );
            const createAccount = await complianceInstance.createAccount();
            if (createAccount.success == true) {
              const userBanksDetails = await userInstance.getUserBankDetails();
              if (userBanksDetails?.data) {
                if (Array.isArray(userBanksDetails.data)) {
                  dispatch(
                    changeUserState({
                      key: 'bankDetails',
                      value: userBanksDetails.data,
                    })
                  );
                } else {
                  dispatch(
                    changeUserState({
                      key: 'bankDetails',
                      value: [userBanksDetails.data],
                    })
                  );
                }
              }
            }
          }
          if (userBanks?.data) {
            if (Array.isArray(userBanks.data)) {
              dispatch(
                changeUserState({
                  key: 'bankDetails',
                  value: userBanks.data,
                })
              );
            } else {
              dispatch(
                changeUserState({
                  key: 'bankDetails',
                  value: [userBanks.data],
                })
              );
            }
          }
          if (wallet.data) {
            dispatch(
              changeUserState({ key: 'balance', value: wallet.data.balance })
            );
            dispatch(
              changeUserState({
                key: 'ledger',
                value: wallet.data.ledgerBalance,
              })
            );
          }
          if (user.data) {
            dispatch(
              changeUserState({
                key: 'ninStatus',
                value: user.data.ninStatus,
              })
            );
            dispatch(
              changeUserState({
                key: 'email',
                value: user.data.email,
              })
            );
            dispatch(
              changeUserState({
                key: 'fullName',
                value: user.data.fullName,
              })
            );
            dispatch(
              changeUserState({
                key: 'bvnStatus',
                value: user.data.bvnStatus,
              })
            );
            dispatch(
              changeUserState({
                key: 'complianceStatus',
                value: user.data.complianceFlag,
              })
            );
            dispatch(
              changeUserState({
                key: 'niN',
                value: user.data.niN,
              })
            );

            dispatch(
              changeUserState({
                key: 'bvn',
                value: user.data.bvn,
              })
            );
            dispatch(
              changeUserState({
                key: 'phoneNumber',
                value: user.data.phoneNumber,
              })
            );

            // Damilola4you@  ajayegidolas@gmail.com
            // navigation.dispatch(StackActions.replace('Login'));
            navigation.dispatch(StackActions.replace('NavigationDrawer'));
          } else {
            navigation.dispatch(StackActions.replace('Login'));
          }
        } catch (error) {
          console.log(error);
          navigation.dispatch(StackActions.replace('Login'));
        }
      } else {
        navigation.dispatch(StackActions.replace('Login'));
      }
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <JompLogo size={size.getHeightSize(58.5)} />
        <JompTextLogo
          width={size.getWidthSize(205)}
          height={size.getHeightSize(40)}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
