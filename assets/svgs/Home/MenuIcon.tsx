import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function MenuIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M23.392 12.836H4.608c-.612 0-1.108.496-1.108 1.108v.117c0 .612.496 1.108 1.108 1.108h18.784c.612 0 1.108-.496 1.108-1.108v-.117c0-.612-.496-1.108-1.108-1.108zM23.392 18.664H4.608c-.612 0-1.108.496-1.108 1.108v.117c0 .612.496 1.108 1.108 1.108h18.784c.612 0 1.108-.496 1.108-1.108v-.117c0-.612-.496-1.108-1.108-1.108zM23.392 7H4.608C3.996 7 3.5 7.496 3.5 8.108v.117c0 .612.496 1.108 1.108 1.108h18.784c.612 0 1.108-.496 1.108-1.108v-.117C24.5 7.496 24.004 7 23.392 7z"
        fill="#fff"
      />
    </Svg>
  );
}

export default MenuIcon;
