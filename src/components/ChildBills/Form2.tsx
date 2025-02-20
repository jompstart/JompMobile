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
      <PTextInput placeholder="Name of School" />
      <PTextInput placeholder="Location of School" />
      <PTextInput placeholder="Child's First Name" />
      <PTextInput placeholder="Child's Last Name" />
      <PTextInput placeholder="Child's Grade (Class)" />
      <PTextInput placeholder="₦ Child's School Fees" />
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
        }}
      >
        <PlusIcon size={size.getHeightSize(24)} />
        <CText
          color={'primaryColor'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="bold"
        >
          Add another child
        </CText>
      </View>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});
