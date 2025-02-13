import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowRightIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 12 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.157 12.712L4.5 18.369l-1.414-1.414 4.95-4.95-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 010 1.414z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default ArrowRightIcon;
