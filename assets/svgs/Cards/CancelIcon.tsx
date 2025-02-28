import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CancelIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M3.836 12.163l4.163-4.164-4.163 4.164zm8.327-8.327L7.998 7.999l4.165-4.163zM7.998 7.999L3.836 3.836l4.162 4.163zM8 8l4.164 4.164-4.164-4.164z"
        fill="#D9D9D9"
      />
      <Path
        d="M3.836 12.163l4.163-4.164m4.164-4.163L7.998 7.999m0 0L3.836 3.836m4.163 4.163l4.164 4.164"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CancelIcon;
