import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  isFocused?: boolean;
}
function ServicesIcon({ isFocused, ...props }: Props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M10.11 11.148H7.46c-.63 0-1.14.51-1.14 1.14v5.12h3.79v-6.26 0z"
        stroke={isFocused ? '#EFA005' : '#64748B'}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.762 6.602h-1.52c-.63 0-1.14.51-1.14 1.14v9.66h3.79v-9.66c0-.63-.5-1.14-1.13-1.14zM16.548 12.852h-2.65v4.55h3.79v-3.41c-.01-.63-.52-1.14-1.14-1.14z"
        stroke={isFocused ? '#EFA005' : '#64748B'}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
        stroke={isFocused ? '#EFA005' : '#64748B'}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ServicesIcon;
