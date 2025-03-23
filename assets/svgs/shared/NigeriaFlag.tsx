import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function NigeriaFlag(props: SvgProps) {
  return (
    <Svg width={props.width} height={props.height} {...props}>
      <Path d="M0 0h2880v1440H0V0z" fill="#FFF" />
      <Path d="M1920 0h960v1440h-960V0zM0 0h960v1440H0V0z" fill="#008751" />
    </Svg>
  );
}

export default NigeriaFlag;
