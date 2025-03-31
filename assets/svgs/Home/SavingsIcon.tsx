import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  isFocused?: boolean;
}
function SavingsIcon({ isFocused, ...props }: Props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M16.717 16.097a.683.683 0 100 1.366h2.733a.684.684 0 000-1.366h-2.733zM1 7.555a3.758 3.758 0 013.758-3.758h14.35a3.759 3.759 0 013.759 3.758v8.884a3.758 3.758 0 01-3.759 3.758H4.758A3.758 3.758 0 011 16.439V7.555zm3.758-2.391a2.392 2.392 0 00-2.391 2.391v1.709H21.5V7.555a2.392 2.392 0 00-2.392-2.391H4.758zM21.5 10.63H2.367v5.809a2.393 2.393 0 002.391 2.391h14.35A2.392 2.392 0 0021.5 16.44V10.63z"
        fill={isFocused ? '#EFA005' : '#64748B'}
      />
    </Svg>
  );
}

export default SavingsIcon;
