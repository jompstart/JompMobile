import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import CText from '../../shared/CText';
import PlusIcon from '../../../assets/svgs/Dashboard/PlusIcon';
const Form2 = () => {
  return (
    <View
      style={{
        gap: size.getHeightSize(16),
      }}
    >
      <PTextInput placeholder="Name of Institution" />
      <PTextInput placeholder="Course of Study" />
      <PTextInput placeholder="Level of Education" />
      <PTextInput placeholder="Location of Institution" />
      <PTextInput placeholder="Location of Institution 2 (Optional)" />
      <PTextInput placeholder="₦ Tuition Fee" />
      <PTextInput placeholder="₦ Loan Amount" />
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});
