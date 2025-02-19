import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CancelIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M5.758 18.248l6.245-6.245-6.245 6.245zm12.49-12.49l-6.246 6.245 6.246-6.245zm-6.246 6.245L5.758 5.758l6.244 6.245zm0 0l6.246 6.245-6.245-6.245z"
        fill="#D9D9D9"
      />
      <Path
        d="M5.758 18.248l6.245-6.245m6.245-6.245l-6.246 6.245m0 0L5.758 5.758m6.245 6.245l6.245 6.245"
        stroke="#FF3B30"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CancelIcon;
