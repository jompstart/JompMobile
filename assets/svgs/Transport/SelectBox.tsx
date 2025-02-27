import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SelectBox(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M18.75 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3z"
        stroke="#EFA005"
        strokeWidth={1.375}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SelectBox;
