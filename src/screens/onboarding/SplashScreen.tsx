import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import JompLogo from '../../assets/Onboarding/JompLogo';
import JompTextLogo from '../../assets/Onboarding/JomtTextLogo';

const SplashScreen = () => {
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
