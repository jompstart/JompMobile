import React, { ReactNode } from 'react';
import { size } from '../config/size';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const GradientHeader = ({
  children,
  disable = false,
}: {
  children: ReactNode;
  disable?: boolean;
}) => {
  const { goBack } = useNavigation();

  return (
    <Pressable onPress={goBack} disabled={disable ? true : false}>
      <LinearGradient
        colors={['#EFA005', '#C5520A']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: size.getHeightSize(60),
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: size.getWidthSize(16),
          gap: size.getWidthSize(16),
          paddingBottom: size.getHeightSize(8),
          paddingTop:size.getHeightSize(24)
        }}
      >
        {children}
      </LinearGradient>
    </Pressable>
  );
};

export default GradientHeader;
