import React, { ReactNode } from 'react';
import { size } from '../config/size';
import { LinearGradient } from 'expo-linear-gradient';
const GradientHeader = ({ children }: { children: ReactNode }) => {
  return (
    <LinearGradient
      colors={['#EFA005', '#C5520A']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: size.getHeightSize(60),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: size.getWidthSize(16),
        gap: size.getWidthSize(16),
        paddingBottom: size.getHeightSize(8),
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientHeader;
