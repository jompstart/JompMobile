import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ServicesContext from '../../context/ServicesContext';
import CText from '../../shared/CText';

import GuardianDetailsForm from '../../components/Service/Transitions/GuardianDetailsForm';
const GuardianDetails = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
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
      </GradientHeader>
      <ServicesContext>
        <GuardianDetailsForm />
      </ServicesContext>
    </GradientSafeAreaView>
  );
};

export default GuardianDetails;

const styles = StyleSheet.create({});
