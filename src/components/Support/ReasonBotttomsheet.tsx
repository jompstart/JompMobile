import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import PTextInput from '../../shared/PTextInput';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedTextId: number | null;
  onChangeText: ({ text, index }: { text: string; index: number }) => void;
}
const ReasonBotttomsheet = ({
  isVisible,
  selectedTextId,
  onClose,
  onChangeText,
}: Props) => {
  const reasons = [
    {
      index: 1,
      text: 'No Longer Using the Service',
    },
    {
      index: 2,
      text: 'Unfavorable Terms or High Fees',
    },
    {
      index: 3,
      text: 'Privacy and Data Concerns',
    },
    {
      index: 4,
      text: 'Poor User Experience or Technical Issues',
    },
  ];
  return (
    <BottomsheetWrapper visibility={isVisible} onClose={onClose}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: size.getHeightSize(16),
          marginBottom: size.getHeightSize(16),
        }}
      >
        <CText
          color={'black'}
          fontSize={16}
          lineHeight={23.8}
          fontFamily="bold"
        >
          Select a Reason
        </CText>
        <CancelIcon
          onPress={onClose}
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>
      <View>
        {reasons.map((item, index) => (
          <Pressable
            onPress={() => {
              onChangeText({ text: item.text, index: item.index });
              onClose();
            }}
            key={index}
            style={{
              paddingVertical: size.getHeightSize(16),
              backgroundColor:
                selectedTextId === item.index
                  ? colors.primary('10')
                  : colors.white(),
              paddingHorizontal: size.getWidthSize(8),
              borderRadius: size.getHeightSize(8),
            }}
          >
            <CText
              color={'secondaryBlack'}
              fontSize={16}
              lineHeight={23.8}
              fontFamily="regular"
            >
              {item.text}
            </CText>
          </Pressable>
        ))}
      </View>
      <BottomSheetTextInput
        onChangeText={(text) => {
          onChangeText({ text, index: 5 });
        }}
        cursorColor={colors.primary()}
        style={{
          borderWidth: size.getHeightSize(1),
          borderRadius: size.getHeightSize(8),
          borderColor: colors.black('30'),
          paddingVertical: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
          color: colors.black(),
          fontSize: size.fontSize(16),
        }}
        placeholder="Others, Please specify"
      />
    </BottomsheetWrapper>
  );
};

export default ReasonBotttomsheet;

const styles = StyleSheet.create({});
