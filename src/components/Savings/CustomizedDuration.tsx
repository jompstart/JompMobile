import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
interface Props {
  isVisible: boolean;
  onSelected: (value: 'day' | 'week' | 'month' | 'year') => void;
  onClose: () => void;
}
const CustomizedDuration = ({ isVisible, onSelected, onClose }: Props) => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={isVisible}
      onClose={onClose}
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
          Set Customized Savings Duration
        </CText>
        <CancelIcon
          onPress={onClose}
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
        <Pressable
          onPress={() => {
            onSelected('day');
            onClose();
          }}
          style={styles.view}
        >
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Day
          </CText>
        </Pressable>
        <Pressable
          onPress={() => {
            onSelected('week');
            onClose();
          }}
          style={styles.view}
        >
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Week
          </CText>
        </Pressable>
        <Pressable
          onPress={() => {
            onSelected('month');
            onClose();
          }}
          style={styles.view}
        >
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Month
          </CText>
        </Pressable>
        <Pressable
          onPress={() => {
            onSelected('year');
            onClose();
          }}
          style={styles.view}
        >
          <CText
            color={'primaryColor'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="bold"
          >
            Year
          </CText>
        </Pressable>
      </View>
    </BottomsheetWrapper>
  );
};

export default CustomizedDuration;

const styles = StyleSheet.create({
  view: {
    borderWidth: size.getHeightSize(1),
    width: size.getWidthSize(108),
    paddingVertical: size.getHeightSize(10),
    borderRadius: size.getHeightSize(24),
    borderColor: colors.primary(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
