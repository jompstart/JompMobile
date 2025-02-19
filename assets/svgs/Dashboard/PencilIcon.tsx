import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PencilIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 21 21"
      fill="none"
      {...props}
    >
      <Path
        d="M11.188 16.365h5.35"
        stroke="#fff"
        strokeWidth={1.5105}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M13.471 4.073v0a2.553 2.553 0 00-3.573.51L4.232 12.13c-1.46 1.945-.079 4.355-.079 4.355s2.723.626 4.16-1.291l5.667-7.548a2.552 2.552 0 00-.509-3.574z"
        stroke="#fff"
        strokeWidth={1.5105}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.813 6.047l4.081 3.064"
        stroke="#fff"
        strokeWidth={1.5105}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PencilIcon;
