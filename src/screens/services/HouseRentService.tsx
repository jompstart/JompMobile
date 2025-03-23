import { StyleSheet } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ServicesContext from '../../context/ServicesContext';
import HouseRentsForms from '../../components/Service/HouseRentsForms';

import ShowLoader from '../../shared/ShowLoader';
const HouseRentService = () => {
  const [isLoading, setIsLoading] = React.useState(false);
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
      <ServicesContext>
        <KeyboardAwareScrollView
          extraScrollHeight={size.getHeightSize(16)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(30),
          }}
        >
          <HouseRentsForms
            shouldLoad={(state) => {
              setIsLoading(state);
            }}
          />
        </KeyboardAwareScrollView>
        <ShowLoader isLoading={isLoading} />
      </ServicesContext>
    </GradientSafeAreaView>
  );
};

export default HouseRentService;

const styles = StyleSheet.create({});
