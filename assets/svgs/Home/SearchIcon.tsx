import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SearchIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M21.039 19.39l4.997 4.995-1.651 1.65-4.996-4.996a10.453 10.453 0 01-6.553 2.297c-5.796 0-10.5-4.704-10.5-10.5s4.704-10.5 10.5-10.5 10.5 4.704 10.5 10.5a10.453 10.453 0 01-2.297 6.553zm-2.34-.867a8.143 8.143 0 002.304-5.687 8.165 8.165 0 00-8.167-8.167 8.165 8.165 0 00-8.167 8.167 8.165 8.165 0 008.167 8.167 8.143 8.143 0 005.687-2.305l.175-.175z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SearchIcon;
