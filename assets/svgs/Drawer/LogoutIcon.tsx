import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function LogOutIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <Rect width={40} height={40} rx={4} fill="#DD2025" fillOpacity={0.15} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 21h12v-2H11v2z"
        fill="#DD2025"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.793 15.79l-3.5 3.5a1 1 0 000 1.413l3.5 3.5 1.414-1.414-2.793-2.793 2.793-2.793-1.414-1.414zM16 12a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H17a1 1 0 01-1-1v-3h2v2h10V13H18v2h-2v-3z"
        fill="#DD2025"
      />
    </Svg>
  );
}

export default LogOutIcon;
