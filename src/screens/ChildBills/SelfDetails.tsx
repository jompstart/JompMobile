import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import PhoneInput from '../../shared/PhoneInput';
import Form1 from '../../components/SelfBills/Form1';
import Form2 from '../../components/SelfBills/Form2';
import Form3 from '../../components/SelfBills/Form3';
import Form4 from '../../components/SelfBills/Form4';
import ServicesContext from '../../context/ServicesContext';
import SelfSchoolFeeForm from '../../components/Service/Transitions/SelfSchoolFeeForm';

const SelfDetails = () => {
  const { width, height } = Dimensions.get('window');
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const views = [
    {
      label: 'Basic Information (Personal Details)',
      title: 'Next: Education Details ',
      component: <Form1 />,
    },
    {
      label: 'Education Details (Your Education Details)',
      title: 'Next: Employment/Business Details',
      component: <Form2 />,
    },
    {
      label: 'Employment/Business Details',
      title: 'Next: Document Uploads',
      component: <Form3 />,
    },
    {
      label: 'Document Uploads',
      title: '',
      component: <Form4 />,
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [progress, setProgress] = useState(25);

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
        <SelfSchoolFeeForm />
      </ServicesContext>
    </GradientSafeAreaView>
  );
};

export default SelfDetails;

const styles = StyleSheet.create({});
