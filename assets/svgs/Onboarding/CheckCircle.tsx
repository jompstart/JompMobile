import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CheckCircle(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 15"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_351_4872)">
        <Path
          d="M14.086 6.929v.575A6.25 6.25 0 1110.38 1.79m3.706.713L7.836 8.76 5.96 6.885"
          stroke="#12D18E"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_351_4872">
          <Path fill="#fff" transform="translate(.336)" d="M0 0H15V15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CheckCircle;
