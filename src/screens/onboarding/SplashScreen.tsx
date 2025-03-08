import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import JompLogo from '../../../assets/svgs/Onboarding/JompLogo';
import JompTextLogo from '../../../assets/svgs/Onboarding/JomtTextLogo';
import { StackActions, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 2000);
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
//visajej863@calmpros.com
export default SplashScreen;

const styles = StyleSheet.create({});
