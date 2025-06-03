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
  onSelect: (plan: string) => void;
  selectedStatus?: string;
}
const OtherServiceStatus = ({
  onClose,
  visibility,
  onSelect,
  selectedStatus,
}: Props) => {
  const status = ['Pending', 'Ongoing', 'Completed'];
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
      onClose={() => {}}
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
          color={'black'}
          fontSize={18}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Service Status
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
          gap: size.getHeightSize(8),
        }}
      >
        {status.map((status) => (
          <Pressable
            key={status}
            onPress={() => {
              onSelect(status);
              onClose();
            }}
            style={[selectedStatus === status ? styles.selected : styles.view]}
          >
            <CText
              color={
                selectedStatus === status ? 'primaryColor' : 'secondaryBlack'
              }
              fontSize={16}
              lineHeight={22.4}
              fontFamily="semibold"
            >
              {status}
            </CText>
          </Pressable>
        ))}
      </View>
    </BottomsheetWrapper>
  );
};

export default OtherServiceStatus;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(8),
    justifyContent: 'center',
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
  },
  selected: {
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(8),
    justifyContent: 'center',
    backgroundColor: colors.primary('20'),
    borderRadius: size.getHeightSize(8),
  },
});
