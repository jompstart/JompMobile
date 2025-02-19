import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AddBankIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 80 80"
      fill="none"
      {...props}
    >
      <Path d="M25 10v15H10v45h45V55h15V10H25z" fill="#2795F1" />
      <Path d="M10 70h45V55h15V10L10 70z" fill="#2189E2" />
      <Path d="M25 10h45v45H25V10z" fill="#90C9F8" />
      <Path d="M70 55H25l45-45v45z" fill="#64B4F6" />
      <Path
        d="M57.5 30H50v-7.5a2.5 2.5 0 00-5 0V30h-7.5a2.5 2.5 0 000 5H45v7.5a2.5 2.5 0 005 0V35h7.5a2.5 2.5 0 000-5z"
        fill="#E1EFFA"
      />
    </Svg>
  );
}

export default AddBankIcon;
