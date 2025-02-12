import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function NotificationBell(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M22.167 19.836v-6.067c-.584.117-1.167.234-1.75.234h-.584v7H8.167v-8.167c0-3.267 2.566-5.833 5.833-5.833.117-1.517.817-2.8 1.75-3.85-.35-.467-1.05-.817-1.75-.817a2.34 2.34 0 00-2.333 2.333v.35c-3.5 1.05-5.834 4.2-5.834 7.817v7L3.5 22.169v1.167h21v-1.167l-2.333-2.333zm-10.5 4.667A2.34 2.34 0 0014 26.836a2.34 2.34 0 002.333-2.333h-4.666zM24.5 7.586c0 2.217-1.867 4.083-4.083 4.083-2.217 0-4.084-1.866-4.084-4.083s1.867-4.083 4.084-4.083c2.216 0 4.083 1.866 4.083 4.083z"
        fill="#fff"
      />
    </Svg>
  );
}

export default NotificationBell;
