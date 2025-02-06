import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function MailIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4 20c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 012 18V6c0-.55.196-1.02.588-1.412A1.93 1.93 0 014 4h16c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v12c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0120 20H4zm8-7L4 8v10h16V8l-8 5zm0-2l8-5H4l8 5zM4 8V6v12V8z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default MailIcon;
