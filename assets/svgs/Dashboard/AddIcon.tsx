import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AddIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 27 27"
      fill="none"
      {...props}
    >
      <Path
        d="M13.5 24.75A11.25 11.25 0 1124.75 13.5 11.262 11.262 0 0113.5 24.75z"
        fill="#FFCD39"
      />
      <Path
        d="M18 14.625H9a1.125 1.125 0 110-2.25h9a1.125 1.125 0 110 2.25z"
        fill="#EFA005"
      />
      <Path
        d="M13.5 19.125A1.125 1.125 0 0112.375 18V9a1.125 1.125 0 112.25 0v9a1.125 1.125 0 01-1.125 1.125z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default AddIcon;
