import React, { useState } from 'react';
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../constants/colors';
import { size } from '../config/size';
import CText from './CText';
import ScrollablebottomsheetWrapper from './ScrollablebottomsheetWrapper';
import CancelIcon from '../../assets/svgs/Onboarding/CancelIcon';
import { searchArray } from '../utils/stringManipulation';
import { StyleSheet, Pressable, View, Platform } from 'react-native';

interface Props {
  isVisible: boolean;
  onClose?: () => void;
  onAccommodationSelected?: (accommodation: { name: string; value: string }) => void;
}

const AccommodationTypeBottomsheet = ({ onAccommodationSelected, isVisible, onClose }: Props) => {
  const accommodationTypes = [
    { name: 'Self Contain (Selfcon)', value: 'selfcon' },
    { name: 'Single Room (Shared Facilities)', value: 'single_room' },
    { name: 'Mini Flat (1 Bedroom + Living Room)', value: 'mini_flat' },
    { name: '2 Bedroom Flat', value: '2_bedroom' },
    { name: '3 Bedroom Flat', value: '3_bedroom' },
    { name: 'Bungalow', value: 'bungalow' },
    { name: 'Duplex', value: 'duplex' },
    { name: 'Terrace', value: 'terrace' },
    { name: 'Penthouse', value: 'penthouse' },
    { name: 'Studio Apartment', value: 'studio' },
    { name: 'Mansion', value: 'mansion' },
    { name: 'Hotel', value: 'hotel' },
    { name: 'Apartment', value: 'apartment' },
    { name: 'Guest House', value: 'guest_house' },
    { name: 'Hostel', value: 'hostel' },
    { name: 'Resort', value: 'resort' },
    { name: 'Villa', value: 'villa' },
    { name: 'Motel', value: 'motel' },
    { name: 'Bed & Breakfast', value: 'bnb' },
    { name: 'Lodge', value: 'lodge' },
    { name: 'Serviced Apartment', value: 'serviced_apartment' },
    { name: 'Others', value: 'others' },
  ];

  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodationTypes);

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
          Select accommodation type
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
            setFilteredAccommodations(searchArray(accommodationTypes, 'name', text));
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
          ]}
        />
        <AntDesign
          name="search1"
          color={colors.primary()}
          size={size.getHeightSize(18)}
        />
      </View>
      <BottomSheetFlatList
        contentContainerStyle={{
          paddingBottom: size.getHeightSize(32),
          gap: size.getHeightSize(8),
          paddingHorizontal: size.getWidthSize(16),
        }}
        data={filteredAccommodations}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => item.value}
        renderItem={({ index, item }) => (
          <Pressable
            onPress={() => {
              onAccommodationSelected?.(item);
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
    </ScrollablebottomsheetWrapper>
  );
};

export default AccommodationTypeBottomsheet;

const styles = StyleSheet.create({
  input: {
    fontSize: size.fontSize(16),
    lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});