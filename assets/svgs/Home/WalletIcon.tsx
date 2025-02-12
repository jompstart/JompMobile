import * as React from 'react';
import Svg, { G, Path, SvgProps, Defs, ClipPath } from 'react-native-svg';

function WalletIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_2_6077)">
        <Path d="M19.749 3.04H2.836v2.288h16.913V3.04z" fill="#D6FBE9" />
        <Path
          d="M21.104 4.724L21.107 0H4.73a2.967 2.967 0 00-2.975 2.808l-.002 11.541v1.412H1.75v3.136a3.152 3.152 0 003.151 3.151h1.282a5.231 5.231 0 1110.145 0h4.776a3.152 3.152 0 003.152-3.151V7.875a3.149 3.149 0 00-3.152-3.15zM4.966 1.35h14.789v3.375H4.966a1.687 1.687 0 110-3.375zm15.395 12.782a.823.823 0 11-.003-1.645.823.823 0 01.003 1.645z"
          fill="#7A4DE8"
        />
        <Path
          d="M16.486 20.77c0 .432-.053.861-.159 1.28H6.182a5.232 5.232 0 1110.304-1.28z"
          fill="#DCB262"
        />
        <Path
          d="M16.325 22.047a5.232 5.232 0 01-10.145 0h10.145z"
          fill="#FFD317"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_6077">
          <Path fill="#fff" d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default WalletIcon;
