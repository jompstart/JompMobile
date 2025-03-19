import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StudentIcon from '../../../assets/svgs/Dashboard/StudentIcon';
import ChildIcon from '../../../assets/svgs/Dashboard/ChildIcon';
import { useNavigation } from '@react-navigation/native';
import PTextInput from '../../shared/PTextInput';
import AttachmentView from '../../shared/AttachmentView';
import ServicesContext from '../../context/ServicesContext';
import HouseRentsForms from '../../components/Service/HouseRentsForms';
import PrimaryButton from '../../shared/PrimaryButton';
const HouseRentService = () => {
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
        >
          <HouseRentsForms />
        </KeyboardAwareScrollView>
      </ServicesContext>
    </GradientSafeAreaView>
  );
};

export default HouseRentService;

const styles = StyleSheet.create({});
