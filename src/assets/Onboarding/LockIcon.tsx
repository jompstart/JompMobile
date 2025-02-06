import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LockIcon(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 17a2 2 0 01-2-2c0-1.11.89-2 2-2a2 2 0 010 4zm6 3V10H6v10h12zm0-12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 1110 0v2h1zm-6-5a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default LockIcon;
