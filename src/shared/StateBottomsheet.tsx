import { StyleSheet, TextInput, Pressable, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import BottomsheetWrapper from '../shared/BottomsheetWrapper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Banks } from '../interface/provider';
import { colors } from '../constants/colors';
import { size } from '../config/size';
import CText from './CText';
import ScrollablebottomsheetWrapper from './ScrollablebottomsheetWrapper';
import CancelIcon from '../../assets/svgs/Onboarding/CancelIcon';
import { searchArray } from '../utils/stringManipulation';
interface Props {
  isVisible: boolean;
  onClose?: () => void;

  onStateSelected?: (bank: { name: string; state_code: string }) => void;
}
const StatesBottomsheet = ({ onStateSelected, isVisible, onClose }: Props) => {
  const statelists = [
    {
      name: 'Abia State',
      state_code: 'AB',
    },
    {
      name: 'Adamawa State',
      state_code: 'AD',
    },
    {
      name: 'Akwa Ibom State',
      state_code: 'AK',
    },
    {
      name: 'Anambra State',
      state_code: 'AN',
    },
    {
      name: 'Bauchi State',
      state_code: 'BA',
    },
    {
      name: 'Bayelsa State',
      state_code: 'BY',
    },
    {
      name: 'Benue State',
      state_code: 'BE',
    },
    {
      name: 'Borno State',
      state_code: 'BO',
    },
    {
      name: 'Cross River State',
      state_code: 'CR',
    },
    {
      name: 'Delta State',
      state_code: 'DE',
    },
    {
      name: 'Ebonyi State',
      state_code: 'EB',
    },
    {
      name: 'Edo State',
      state_code: 'ED',
    },
    {
      name: 'Ekiti State',
      state_code: 'EK',
    },
    {
      name: 'Enugu State',
      state_code: 'EN',
    },
    {
      name: 'Federal Capital Territory',
      state_code: 'FC',
    },
    {
      name: 'Gombe State',
      state_code: 'GO',
    },
    {
      name: 'Imo State',
      state_code: 'IM',
    },
    {
      name: 'Jigawa State',
      state_code: 'JI',
    },
    {
      name: 'Kaduna State',
      state_code: 'KD',
    },
    {
      name: 'Kano State',
      state_code: 'KN',
    },
    {
      name: 'Katsina State',
      state_code: 'KT',
    },
    {
      name: 'Kebbi State',
      state_code: 'KE',
    },
    {
      name: 'Kogi State',
      state_code: 'KO',
    },
    {
      name: 'Kwara State',
      state_code: 'KW',
    },
    {
      name: 'Lagos',
      state_code: 'LA',
    },
    {
      name: 'Nasarawa State',
      state_code: 'NA',
    },
    {
      name: 'Niger State',
      state_code: 'NI',
    },
    {
      name: 'Ogun State',
      state_code: 'OG',
    },
    {
      name: 'Ondo State',
      state_code: 'ON',
    },
    {
      name: 'Osun State',
      state_code: 'OS',
    },
    {
      name: 'Oyo State',
      state_code: 'OY',
    },
    {
      name: 'Plateau State',
      state_code: 'PL',
    },
    {
      name: 'Sokoto State',
      state_code: 'SO',
    },
    {
      name: 'Taraba State',
      state_code: 'TA',
    },
    {
      name: 'Yobe State',
      state_code: 'YO',
    },
    {
      name: 'Zamfara State',
      state_code: 'ZA',
    },
  ];

  const [filteredStates, setFilteredStates] = useState(statelists);
  return (
    <ScrollablebottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={() => onClose?.()}
      backgroundColor={colors.appBackground()}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: size.getHeightSize(16),
          justifyContent: 'space-between',
          marginHorizontal: size.getWidthSize(16),
        }}
      >
        <CText
          color="black"
          fontSize={16}
          lineHeight={18}
          fontFamily="semibold"
          style={{
            letterSpacing: size.getWidthSize(0.2),
            flex: 1,
          }}
        >
          Select your state
        </CText>
        <CancelIcon
          onPress={() => onClose?.()}
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>
      <View
        style={{
          borderColor: '#21212130',
          borderWidth: size.getHeightSize(1),
          backgroundColor: colors.white(),
          borderRadius: size.getHeightSize(8),
          flexDirection: 'row',
          alignItems: 'center',
          gap: size.getWidthSize(8),
          paddingHorizontal: size.getWidthSize(16),
          marginBottom: size.getHeightSize(16),
          marginHorizontal: size.getWidthSize(16),
        }}
      >
        <BottomSheetTextInput
          onChangeText={(text) => {
            setFilteredStates(searchArray(statelists, 'name', text));
          }}
          cursorColor={'#F5F7FF'}
          placeholderTextColor={'#61616150'}
          placeholder="Search..."
          style={[
            styles.input,

            {
              paddingVertical:
                Platform.OS === 'ios'
                  ? size.getHeightSize(14.5)
                  : size.getHeightSize(10.5),
              color: colors.black(),
            },
            // showWarning && {borderColor: colors.warningColor(), borderWidth: 1},
          ]}
        />
        <AntDesign
          name="search1"
          color={colors.primary()}
          size={size.getHeightSize(18)}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <BottomSheetFlatList
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(16),
            gap: size.getHeightSize(8),
            paddingHorizontal: size.getWidthSize(16),
          }}
          data={filteredStates}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ index, item }) => (
            <Pressable
              onPress={() => {
                onStateSelected?.(item);
                onClose?.();
              }}
              key={index}
              style={{
                backgroundColor: colors.white(),
                paddingHorizontal: size.getWidthSize(8),
                paddingVertical: size.getHeightSize(14),
                borderRadius: size.getHeightSize(8),
              }}
            >
              <CText
                color={colors.black('70') as any}
                fontSize={14}
                lineHeight={18}
                fontFamily="semibold"
                style={{
                  letterSpacing: size.getWidthSize(0.2),
                }}
              >
                {item.name}
              </CText>
            </Pressable>
          )}
        />
      </View>
    </ScrollablebottomsheetWrapper>
  );
};

export default StatesBottomsheet;

const styles = StyleSheet.create({
  input: {
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(16),
    // lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});
