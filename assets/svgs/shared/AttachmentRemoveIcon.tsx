import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function AttachmentRemoveIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 50 116"
      fill="none"
      {...props}
    >
      <Rect
        x={0.5}
        y={0.5}
        width={49}
        height={115}
        rx={23.5}
        stroke="#DD2025"
      />
      <Path
        d="M14.594 68.41l10.408-10.408M35.41 47.594L25 58.002m0 0L14.594 47.594m10.408 10.408L35.41 68.41"
        stroke="#DD2025"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AttachmentRemoveIcon;
