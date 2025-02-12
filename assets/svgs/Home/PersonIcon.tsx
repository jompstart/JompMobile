import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PersonIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0a20 20 0 0120 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm2 22h-4c-4.951 0-9.202 2.999-11.036 7.28C9.865 33.346 14.623 36 20 36s10.135-2.653 13.036-6.72C31.202 24.998 26.95 22 22 22zM20 6a6 6 0 100 12 6 6 0 000-12z"
        fill="#31005C"
      />
    </Svg>
  );
}

export default PersonIcon;
