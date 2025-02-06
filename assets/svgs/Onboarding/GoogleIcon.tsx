import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function GoogleIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_279_1101)">
        <Path
          d="M23.768 12.274c0-.815-.066-1.636-.207-2.438H12.242v4.62h6.482a5.554 5.554 0 01-2.399 3.647v2.999h3.867c2.271-2.09 3.576-5.177 3.576-8.828z"
          fill="#4285F4"
        />
        <Path
          d="M12.24 23.997c3.236 0 5.965-1.062 7.954-2.896l-3.867-2.999c-1.076.732-2.465 1.147-4.084 1.147-3.13 0-5.785-2.112-6.737-4.952h-3.99v3.09a12.002 12.002 0 0010.723 6.61z"
          fill="#34A853"
        />
        <Path
          d="M5.505 14.303a7.188 7.188 0 010-4.595v-3.09H1.519a12.01 12.01 0 000 10.776l3.986-3.091z"
          fill="#FBBC04"
        />
        <Path
          d="M12.24 4.75a6.521 6.521 0 014.603 1.799l3.425-3.426A11.533 11.533 0 0012.24 0 11.998 11.998 0 001.516 6.615l3.986 3.09C6.45 6.863 9.108 4.75 12.239 4.75z"
          fill="#EA4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_279_1101">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default GoogleIcon;
