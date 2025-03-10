import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function Asterisks(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8 14a.643.643 0 01-.475-.192.648.648 0 01-.192-.475V9.6L4.7 12.25a.649.649 0 01-.475.2.65.65 0 01-.475-.2.645.645 0 01-.2-.475c0-.183.067-.341.2-.475L6.4 8.667H2.667a.643.643 0 01-.475-.192A.648.648 0 012 8c0-.188.064-.347.192-.475a.646.646 0 01.475-.192H6.4L3.75 4.7a.649.649 0 01-.2-.475.65.65 0 01.2-.475.646.646 0 01.475-.2.65.65 0 01.475.2L7.333 6.4V2.667c0-.19.064-.347.192-.475A.648.648 0 018 2c.188 0 .347.064.475.192a.64.64 0 01.192.475V6.4L11.3 3.75a.65.65 0 01.475-.2c.184 0 .342.067.475.2.133.133.2.292.2.475a.644.644 0 01-.2.475L9.6 7.333h3.733c.19 0 .348.064.476.192A.643.643 0 0114 8a.65.65 0 01-.192.475.638.638 0 01-.475.192H9.6l2.65 2.633a.65.65 0 01.2.475.647.647 0 01-.2.475.652.652 0 01-.475.2.647.647 0 01-.475-.2L8.667 9.6v3.733a.646.646 0 01-.192.476A.643.643 0 018 14z"
        fill="#F75555"
      />
    </Svg>
  );
}

export default Asterisks;
