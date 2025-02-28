import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function StrikePath(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 107 138"
      fill="none"
      {...props}
    >
      <Path
        d="M3.613-22s-9.231 59.1 7.008 85.372c20.744 33.56 63.2-16.837 84.594 16.047 17.412 26.763 8.509 88.581 8.509 88.581"
        stroke="#fff"
      />
      <Path
        d="M3.613-34s-9.231 59.1 7.008 85.372c20.744 33.56 63.2-16.837 84.594 16.047C112.627 94.182 103.724 156 103.724 156"
        stroke="#fff"
      />
      <Path
        d="M3.613-46s-9.231 59.1 7.008 85.372c20.744 33.56 63.2-16.837 84.594 16.047C112.627 82.182 103.724 144 103.724 144"
        stroke="#fff"
      />
    </Svg>
  );
}

export default StrikePath;
