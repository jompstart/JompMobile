import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function VerifyMailIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.height}
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <Path d="M124.061 50.805H3.937v76.209h120.124v-76.21z" fill="#FDC77C" />
      <Path
        d="M63.999.984L3.937 50.806 64 100.43l60.062-49.625L63.999.984z"
        fill="#E39A61"
      />
      <Path
        d="M14.18 59.277L64 100.434l49.822-41.157V11.031H14.18v48.246z"
        fill="#EFF3F5"
      />
      <Path
        d="M77.193 88.219H50.805L3.938 127.013H124.06L77.193 88.219z"
        fill="#F0B972"
      />
      <Path
        d="M99.447 31.117H28.555v7.877h70.892v-7.877zM99.447 51.203H28.555v7.877h70.892v-7.877zM99.249 71.29H28.75l9.452 7.68h51.594l9.453-7.68z"
        fill="#DBDFE0"
      />
    </Svg>
  );
}

export default VerifyMailIcon;
