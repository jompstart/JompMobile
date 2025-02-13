import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function TxnIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 41 41"
      fill="none"
      {...props}
    >
      <Rect width={41} height={41} rx={9} fill="#FF9800" fillOpacity={0.08} />
      <Path
        opacity={0.4}
        d="M25.098 11h-4.2c-3.45 0-4.85 1.37-4.89 4.75h3.09c4.2 0 6.15 1.95 6.15 6.15v3.09c3.38-.04 4.75-1.44 4.75-4.89v-4.2c0-3.5-1.4-4.9-4.9-4.9z"
        fill="#EFA005"
      />
      <Path
        d="M19.1 17h-4.2c-3.5 0-4.9 1.4-4.9 4.9v4.2c0 3.5 1.4 4.9 4.9 4.9h4.2c3.5 0 4.9-1.4 4.9-4.9v-4.2c0-3.5-1.4-4.9-4.9-4.9zm1.19 5.65l-3.71 3.71a.71.71 0 01-.51.21.71.71 0 01-.51-.21L13.7 24.5a.712.712 0 010-1.01c.28-.28.73-.28 1.01 0l1.35 1.35 3.21-3.21c.28-.28.73-.28 1.01 0s.29.74.01 1.02z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default TxnIcon;
