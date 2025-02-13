import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function OrderIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 41 41"
      fill="none"
      {...props}
    >
      <Rect width={41} height={41} rx={9} fill="#6949FF" fillOpacity={0.08} />
      <Path
        d="M17.02 13.617h-1.04c-1.59 0-2.23.6-2.23 2.12v11.88h5.5v-11.88c-.01-1.52-.65-2.12-2.23-2.12z"
        fill="#876DFF"
      />
      <Path
        opacity={0.4}
        d="M25.52 18.617h-1.04c-1.59 0-2.23.61-2.23 2.12v6.88h5.5v-6.88c0-1.51-.65-2.12-2.23-2.12z"
        fill="#876DFF"
      />
      <Path
        d="M11.75 26.883h18.5c.41 0 .75.34.75.75s-.34.75-.75.75h-18.5c-.41 0-.75-.34-.75-.76s.34-.74.75-.74z"
        fill="#876DFF"
      />
    </Svg>
  );
}

export default OrderIcon;
