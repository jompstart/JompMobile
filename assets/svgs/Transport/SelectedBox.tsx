import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SelectedBox(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M18.75 2.25H5.25a3.003 3.003 0 00-3 3v13.5a3.003 3.003 0 003 3h13.5a3.004 3.004 0 003-3V5.25a3.003 3.003 0 00-3-3zm-1.676 6.482l-6.3 7.5a.748.748 0 01-.562.268h-.013a.75.75 0 01-.557-.248l-2.7-3a.751.751 0 01.88-1.186c.09.045.17.107.234.182l2.123 2.36 5.747-6.84a.75.75 0 011.148.964z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default SelectedBox;
