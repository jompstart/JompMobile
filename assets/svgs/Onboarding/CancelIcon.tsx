import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CancelIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 17 17"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_2_5091)"
        stroke="#F75555"
        strokeWidth={1.39062}
        strokeLinejoin="round"
      >
        <Path d="M8.344 15.453a6.953 6.953 0 100-13.906 6.953 6.953 0 000 13.906z" />
        <Path
          d="M10.308 6.531l-3.933 3.934m0-3.934l3.933 3.934"
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_5091">
          <Path
            fill="#fff"
            transform="translate(0 .156)"
            d="M0 0H16.6875V16.6875H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CancelIcon;
