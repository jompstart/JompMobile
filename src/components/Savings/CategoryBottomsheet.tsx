import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetSavingsCategories } from '../../hooks/api/savings';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelected: (item: { id: string; name: string }) => void;
}
const SavingsCategoryBottomsheet = ({
  isVisible,
  onClose,
  onSelected,
}: Props) => {
  const user = useAppSelector(userSelector);
  const { data: savingsCategory } = useGetSavingsCategories(
    user.userId,
    user.customerId
  );

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={isVisible}
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
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Select a category
        </CText>
        <CancelIcon
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
        {savingsCategory?.data?.map((item, index) => (
          <Pressable
            onPress={() => {
              onSelected(item);
              onClose();
            }}
            key={index}
            style={styles.view}
          >
            <CText
              color={colors.black('70') as any}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="semibold"
            >
              {item.name}
            </CText>
          </Pressable>
        ))}
      </View>
    </BottomsheetWrapper>
  );
};

export default SavingsCategoryBottomsheet;

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(14),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getHeightSize(8),
  },
});
