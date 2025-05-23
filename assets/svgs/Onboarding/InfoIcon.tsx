import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function InfoIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 17 17"
      fill="none"
      {...props}
    >
      <Path
        d="M8.497 15.67c-4.2 0-7.614-3.214-7.614-7.167 0-3.954 3.414-7.167 7.614-7.167 4.2 0 7.615 3.213 7.615 7.167 0 3.953-3.414 7.166-7.615 7.166zm0-13.334c-3.612 0-6.552 2.767-6.552 6.167s2.94 6.166 6.552 6.166c3.613 0 6.553-2.766 6.553-6.166 0-3.4-2.94-6.167-6.553-6.167z"
        fill="#876DFF"
      />
      <Path
        d="M8.5 9.67c-.29 0-.531-.227-.531-.5V5.835c0-.273.24-.5.531-.5.29 0 .531.227.531.5v3.333c0 .274-.24.5-.531.5zM8.497 11.83a.744.744 0 01-.269-.053.828.828 0 01-.234-.14.686.686 0 01-.148-.22.63.63 0 01-.057-.254.63.63 0 01.057-.253.766.766 0 01.148-.22.825.825 0 01.234-.14.75.75 0 01.539 0c.085.033.162.08.233.14.064.067.114.14.15.22a.63.63 0 01.056.253.63.63 0 01-.057.254.685.685 0 01-.149.22.828.828 0 01-.233.14.744.744 0 01-.27.053z"
        fill="#876DFF"
      />
    </Svg>
  );
}

export default InfoIcon;
