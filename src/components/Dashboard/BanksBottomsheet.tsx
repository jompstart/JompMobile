import { StyleSheet, TextInput, Pressable, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Banks } from '../../interface/provider';
import { colors } from '../../constants/colors';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import ScrollablebottomsheetWrapper from '../../shared/ScrollablebottomsheetWrapper';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
interface Props {
  isVisible: boolean;
  onClose?: () => void;
  banks: Banks[];
  onSelectedBank?: (bank: Banks) => void;
  onSearch?: (text: string) => void;
}
const BanksBottomsheet = ({
  banks,
  onSelectedBank,
  isVisible,
  onClose,
  onSearch,
}: Props) => {
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
          fontSize={18}
          lineHeight={23}
          fontFamily="bold"
          style={{
            letterSpacing: size.getWidthSize(0.2),
            flex: 1,
          }}
        >
          BANK
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
            onSearch?.(text);
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
          data={banks}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ index, item }) => (
            <Pressable
              onPress={() => {
                onSelectedBank?.(item);
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
                fontSize={16}
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

export default BanksBottomsheet;

const styles = StyleSheet.create({
  input: {
    // paddingVertical: size.getHeightSize(17.5),

    fontSize: size.fontSize(16),
    // lineHeight: size.getHeightSize(22.4),
    fontFamily: 'AvenirLTStd-Medium',
    flex: 1,
  },
});
