import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PersonIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 27 27"
      fill="none"
      {...props}
    >
      <Path
        d="M17.794 15.594a7.842 7.842 0 01-8.595 0 10.124 10.124 0 00-5.8 8.561.562.562 0 00.563.596H23.06a.563.563 0 00.53-.37.564.564 0 00.033-.226 10.127 10.127 0 00-5.828-8.561z"
        fill="#876DFF"
      />
      <Path
        d="M13.5 15.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default PersonIcon;
