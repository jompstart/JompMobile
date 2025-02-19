import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ImageIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 84 84"
      fill="none"
      {...props}
    >
      <Path
        d="M66.5 7h-49A10.531 10.531 0 007 17.5v31.01l13.58-13.58a10.763 10.763 0 0114.84 0l10.048 10.105 3.108-3.108a10.528 10.528 0 0114.847 0L77 55.51V17.5A10.531 10.531 0 0066.5 7z"
        fill="#B6B5FC"
      />
      <Path
        d="M35.42 34.928a10.763 10.763 0 00-14.84 0L7 48.508v17.99a10.531 10.531 0 0010.5 10.5h49c2.853 0 5.582-1.166 7.56-3.22l-38.64-38.85z"
        fill="#31005C"
      />
      <Path
        d="M77 55.506L63.424 41.93a10.528 10.528 0 00-14.847 0l-3.108 3.108 28.577 28.731A10.379 10.379 0 0077 66.503V55.506z"
        fill="#D8D8FF"
      />
    </Svg>
  );
}

export default ImageIcon;
