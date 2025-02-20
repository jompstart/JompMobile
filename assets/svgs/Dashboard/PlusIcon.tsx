import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 8.328v7.327M15.67 11.991H8.335"
        stroke="#EFA005"
        strokeWidth={1.1134}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M16.686 2H7.314C4.048 2 2 4.312 2 7.585v8.83C2 19.688 4.038 22 7.314 22h9.372C19.962 22 22 19.688 22 16.415v-8.83C22 4.312 19.962 2 16.686 2z"
        stroke="#EFA005"
        strokeWidth={1.1134}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PlusIcon;
