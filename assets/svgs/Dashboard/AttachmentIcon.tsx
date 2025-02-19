import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AAttachmentIcon(props: SvgProps) {
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
        d="M21.396 5H9.878a3.214 3.214 0 00-3.214 3.214v23.572A3.214 3.214 0 009.878 35h19.286a3.214 3.214 0 003.214-3.214V15.982h-9.643a1.34 1.34 0 01-1.339-1.34V5zm10.087 8.304l-7.408-7.408v7.408h7.408z"
        fill="#31005C"
        fillOpacity={0.5}
      />
      <Path
        d="M15 20h9m0 8h-9m0-4h9"
        stroke="#31005C"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AAttachmentIcon;
