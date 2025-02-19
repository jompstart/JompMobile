import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CardIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_36_28696)">
        <Path
          d="M23.112 4.883H2.883c-.876 0-1.586.71-1.586 1.586v13.06c0 .876.71 1.586 1.586 1.586h20.229c.876 0 1.586-.71 1.586-1.586V6.47c0-.876-.71-1.586-1.586-1.586z"
          fill="#EFA005"
        />
        <Path
          d="M6.72 10.984H4.184c-.602 0-1.091.49-1.091 1.092v1.772c0 .603.489 1.092 1.091 1.092H6.72c.603 0 1.092-.489 1.092-1.092v-1.772c0-.603-.489-1.092-1.092-1.092z"
          fill="#FC0"
        />
        <Path
          d="M20.983 10.63a1.944 1.944 0 100-3.888 1.944 1.944 0 000 3.888z"
          fill="#876DFF"
        />
        <Path
          d="M3.37 16.223a.26.26 0 110-.52h3.955a.26.26 0 110 .52H3.37zm4.676 0a.26.26 0 110-.52h4.285a.26.26 0 110 .52H8.046zm5.222 0a.26.26 0 110-.52h3.729a.26.26 0 110 .52h-3.729zm4.676 0a.26.26 0 010-.52h4.326a.26.26 0 110 .52h-4.326zM3.37 17.377a.26.26 0 110-.52h5.979a.26.26 0 010 .52h-5.98zm0 1.339a.26.26 0 110-.52h2.92a.26.26 0 010 .52H3.37zm6.795-1.34a.26.26 0 110-.52h2.477a.26.26 0 010 .52h-2.477z"
          fill="#CCC"
        />
        <Path
          d="M18.39 10.63a1.944 1.944 0 100-3.888 1.944 1.944 0 000 3.888z"
          fill="red"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_36_28696">
          <Path fill="#fff" d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CardIcon;
