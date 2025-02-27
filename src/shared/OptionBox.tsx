import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';

interface Props {
  description: string;
  selectIcon: React.ReactNode;
  deselectIcon: React.ReactNode;
  selected?: boolean;
  flex?: boolean;
}

const OptionBox = ({
  description,
  selectIcon,
  deselectIcon,
  selected,
  flex = true,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: size.getWidthSize(16),
        paddingVertical: size.getHeightSize(14),
        paddingHorizontal: size.getWidthSize(16),
        borderWidth: size.getHeightSize(1),
        borderColor: colors.black('30'),
        borderRadius: size.getHeightSize(8),
        backgroundColor: colors.white(),
        flex: flex ? 1 : 0,
      }}
    >
      {selected ? selectIcon : deselectIcon}
      <CText
        color={'secondaryBlack'}
        fontSize={14}
        lineHeight={19.6}
        fontFamily="semibold"
      >
        {description}
      </CText>
    </View>
  );
};

export default OptionBox;

const styles = StyleSheet.create({});
