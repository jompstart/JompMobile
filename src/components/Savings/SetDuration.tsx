import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import AntDesign from '@expo/vector-icons/AntDesign';
interface Props {
  isVisible: boolean;
  onSelected: (value: Date, duration: string) => void;
  onClose: () => void;
  duration: 'day' | 'week' | 'month' | 'year' | null;
}
const SetDuration = ({ isVisible, onSelected, onClose, duration }: Props) => {
  const [durationValue, setDurationValue] = useState<number>(0);

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
          Set Number of{' '}
          {duration &&
            duration?.slice(0, 1).toUpperCase() + duration?.slice(1) + 's'}
        </CText>
        <CancelIcon
          onPress={onClose}
          style={{
            alignSelf: 'flex-end',
          }}
          size={size.getHeightSize(24)}
        />
      </View>

      <View style={styles.view2}>
        <AntDesign
          name="minus"
          size={size.getHeightSize(24)}
          color={colors.primary()}
          onPress={() => {
            if (durationValue && durationValue > 0) {
              setDurationValue(durationValue - 1);
            }
          }}
        />
        <BottomSheetTextInput
          placeholderTextColor={'#21212180'}
          cursorColor={colors.primary()}
          value={durationValue.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const value = text.replace(/[^0-9]/g, '');
            setDurationValue(value ? parseInt(value) : 0);
          }}
          placeholder={
            duration
              ? duration?.slice(0, 1).toUpperCase() + duration?.slice(1) + 's'
              : ''
          }
          style={{
            flex: 1,
            height: size.getHeightSize(52),
            textAlign: 'center',
            color: colors.black(),
          }}
        />
        <AntDesign
          onPress={() => {
            setDurationValue(durationValue + 1);
          }}
          name="plus"
          size={size.getHeightSize(24)}
          color={colors.primary()}
        />
      </View>
      <PrimaryButton
        label="Set"
        onPress={() => {
          if (duration == 'day') {
            onSelected(
              new Date(Date.now() + durationValue * 24 * 60 * 60 * 1000),
              `${durationValue} ${durationValue > 1 ? 'days' : 'day'}`
            );
          }
          if (duration == 'week') {
            onSelected(
              new Date(Date.now() + durationValue * 7 * 24 * 60 * 60 * 1000),
              `${durationValue} ${durationValue > 1 ? 'weeks' : 'week'}`
            );
          }
          if (duration === 'month') {
            const currentDate = new Date();
            const newDate = new Date(
              currentDate.setMonth(currentDate.getMonth() + durationValue)
            );
            onSelected(
              newDate,
              `${durationValue} ${durationValue > 1 ? 'months' : 'month'}`
            );
          }

          if (duration === 'year') {
            const currentDate = new Date();
            const newDate = new Date(
              currentDate.setFullYear(currentDate.getFullYear() + durationValue)
            );
            onSelected(
              newDate,
              `${durationValue} ${durationValue > 1 ? 'years' : 'year'}`
            );
          }
        }}
      />
    </BottomsheetWrapper>
  );
};

export default SetDuration;

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
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: size.getWidthSize(8),
    borderWidth: size.getHeightSize(1),
    borderColor: colors.black('30'),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: '#F6F6F6',
    marginBottom: size.getHeightSize(40),
    height: size.getHeightSize(52),
  },
});
