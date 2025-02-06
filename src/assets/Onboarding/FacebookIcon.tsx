import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function FacebookIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_279_1193)">
        <Path
          d="M24.5 12c0-6.627-5.373-12-12-12S.5 5.373.5 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.578V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H16.33c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C20.112 22.954 24.5 17.99 24.5 12z"
          fill="#1877F2"
        />
        <Path
          d="M17.171 15.469L17.703 12h-3.328V9.75c0-.949.465-1.875 1.956-1.875h1.513V4.922s-1.373-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.578v3.469h3.047v8.385a12.13 12.13 0 003.75 0V15.47h2.796z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_279_1193">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default FacebookIcon;
