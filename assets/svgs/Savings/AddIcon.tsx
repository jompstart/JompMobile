import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AddIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M8.75 3.5v5.25H3.5V24.5h15.75v-5.25h5.25V3.5H8.75z"
        fill="#EFA005"
      />
      <Path d="M3.5 24.5h15.75v-5.25h5.25V3.5l-21 21z" fill="#D58E01" />
      <Path d="M8.75 3.5H24.5v15.75H8.75V3.5z" fill="#EFAF33" />
      <Path d="M24.5 19.25H8.75L24.5 3.5v15.75z" fill="#EB9D03" />
      <Path
        d="M20.125 10.5H17.5V7.875a.875.875 0 00-1.75 0V10.5h-2.625a.875.875 0 100 1.75h2.625v2.625a.875.875 0 101.75 0V12.25h2.625a.875.875 0 100-1.75z"
        fill="#E1EFFA"
      />
    </Svg>
  );
}

export default AddIcon;
