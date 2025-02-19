import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PhoneIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M15.883 2.188h-7.77a2.175 2.175 0 00-2.175 2.174v15.27a2.175 2.175 0 002.175 2.175h7.77a2.176 2.176 0 002.175-2.174V4.363a2.175 2.175 0 00-2.175-2.176zm.555 17.445a.555.555 0 01-.555.555h-7.77a.555.555 0 01-.555-.555V4.363a.555.555 0 01.555-.556h7.77a.555.555 0 01.555.555v15.27z"
        fill="#EFA005"
      />
      <Path
        d="M12.748 17.938h-1.5a.81.81 0 100 1.62h1.5a.81.81 0 100-1.62z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default PhoneIcon;
