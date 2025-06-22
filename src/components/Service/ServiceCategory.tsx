import { StyleSheet, View } from 'react-native';
import React from 'react';
import { size } from '../../config/size';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import OptionBox from '../../shared/OptionBox';
import Fontisto from '@expo/vector-icons/Fontisto';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { useGetServiceCategories } from '../../hooks/api/providers';
import { ServicesCategories } from '../../services/providers/provider.dto';

interface Props {
  onClose: () => void;
  visibility: boolean;
  onSelect: (category: ServicesCategories) => void;
  selectedCategory?: string;
}
const ServiceCategory = ({
  onClose,
  onSelect,
  visibility,
  selectedCategory,
}: Props) => {
  const user = useAppSelector(userSelector);
  const { data: servicesCategories } = useGetServiceCategories(
    user.userId,
    user.customerId
  );

  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={visibility}
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
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          Service Category
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
          gap: size.getHeightSize(16),
        }}
      >
        {servicesCategories?.data?.map((service) => (
          <OptionBox
            selected={service.id === selectedCategory}
            key={service.id}
            onSelect={() => {
              onSelect(service);
              onClose();
            }}
            flex={false}
            deselectIcon={
              <Fontisto
                name="radio-btn-passive"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            selectIcon={
              <Fontisto
                name="radio-btn-active"
                size={size.getHeightSize(24)}
                color={colors.primary()}
              />
            }
            description={service.name}
          />
        ))}
        {/* <BottomSheetTextInput
        onChangeText={(text)=>{
          onSelect({  });
          onClose();
        }}
        placeholder="Others?, Please specify" /> */}
      </View>
      {/* <PrimaryButton
        style={{
          marginTop: size.getHeightSize(24),
        }}
        label="Okay"
      /> */}
    </BottomsheetWrapper>
  );
};

export default ServiceCategory;

const styles = StyleSheet.create({});
