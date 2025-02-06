import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CheckIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <Path
        d="M8.244 15.371a6.848 6.848 0 004.858-2.012 6.848 6.848 0 002.012-4.857 6.847 6.847 0 00-2.012-4.857 6.848 6.848 0 00-4.858-2.012 6.848 6.848 0 00-4.857 2.012 6.848 6.848 0 00-2.012 4.857 6.848 6.848 0 002.012 4.857 6.848 6.848 0 004.857 2.012z"
        stroke="#2ECC71"
        strokeWidth={1.37386}
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 8.498l2.06 2.061 4.122-4.121"
        stroke="#2ECC71"
        strokeWidth={1.37386}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CheckIcon;
