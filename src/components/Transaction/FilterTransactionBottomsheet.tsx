import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';

interface Props {
  onClose: () => void;
  visibility: boolean;
  categories: string[];
  onSelect: (category: string) => void;
  selectedCategory: string;
}
const FilterTransactionBottomsheet = ({
  categories,
  onClose,
  onSelect,
  selectedCategory,
  visibility,
}: Props) => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
      onClose={() => {
        onClose();
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: size.getHeightSize(12),
          marginBottom: size.getHeightSize(16),
        }}
      >
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Filter Savings History By
        </CText>
        <CancelIcon
          onPress={() => onClose()}
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          rowGap: size.getHeightSize(16),
          columnGap: size.getWidthSize(16),
          flexWrap: 'wrap',
        }}
      >
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => {
              onSelect(category);
              onClose();
            }}
            style={
              selectedCategory === category ? styles.selected : styles.view
            }
          >
            <CText
              color={selectedCategory === category ? 'white' : 'primaryColor'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              {category}
            </CText>
          </Pressable>
        ))}
      </View>
    </BottomsheetWrapper>
  );
};

export default FilterTransactionBottomsheet;

const styles = StyleSheet.create({
  view: {
    borderWidth: size.getHeightSize(1),
    // width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    borderColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: size.getWidthSize(16),
  },
  selected: {
    // width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    backgroundColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: size.getWidthSize(16),
  },
});
