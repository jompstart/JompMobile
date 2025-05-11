import * as React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function TransactionIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <Rect width={40} height={40} rx={4} fill="#EFA005" fillOpacity={0.15} />
      <Path
        d="M22.551 26.158c-.516.35-1.166.642-1.958.9l-1.317.434c-3.308 1.066-5.05.175-6.125-3.134l-1.066-3.291c-1.067-3.309-.184-5.059 3.125-6.125l1.316-.434c.342-.108.667-.2.975-.258-.25.508-.45 1.125-.616 1.833l-.817 3.492c-.817 3.483.258 5.2 3.733 6.025l1.4.333c.484.117.934.192 1.35.225z"
        stroke="#EFA005"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M28.047 18.701l-.816 3.484c-.7 3.008-2.084 4.225-4.684 3.975a8.756 8.756 0 01-1.35-.225l-1.4-.334c-3.474-.825-4.55-2.541-3.733-6.025l.817-3.491c.166-.709.366-1.325.616-1.834.976-2.016 2.634-2.558 5.417-1.9l1.392.325c3.491.817 4.558 2.542 3.741 6.025zM20.531 17.11l4.042 1.024M19.719 20.336l2.416.617"
        stroke="#EFA005"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TransactionIcon;
