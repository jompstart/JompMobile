import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CopyIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_2_5900)">
        <Path
          d="M3.336 10.003h-.667a1.333 1.333 0 01-1.333-1.334v-6a1.333 1.333 0 011.333-1.333h6a1.333 1.333 0 011.334 1.333v.667M7.336 6.003h6c.736 0 1.333.597 1.333 1.333v6c0 .736-.597 1.333-1.333 1.333h-6a1.333 1.333 0 01-1.333-1.333v-6c0-.736.597-1.333 1.333-1.333z"
          stroke="#31005C"
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_5900">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CopyIcon;
