import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function IdIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_103_33728)">
        <Path
          d="M22.5 4.5h-21A1.5 1.5 0 000 6v13.5A1.5 1.5 0 001.5 21h21a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5zM1.5 6h21v13.5h-21V6zm18.875 6H11.25a.75.75 0 100 1.5h9.125a.75.75 0 100-1.5zm0 3H11.25a.75.75 0 100 1.5h9.125a.75.75 0 100-1.5zm0-6H11.25a.75.75 0 100 1.5h9.125a.75.75 0 100-1.5zm-16.19.312a1.812 1.812 0 103.624 0 1.812 1.812 0 00-3.624 0zm1.851 2.537c-1.638 0-2.964 1.778-2.964 3.974 0 2.197 5.928 2.195 5.928 0 0-2.194-1.327-3.975-2.964-3.975z"
          fill="#EFA005"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_103_33728">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default IdIcon;
