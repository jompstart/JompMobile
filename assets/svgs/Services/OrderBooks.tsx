import * as React from 'react';
import Svg, {
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function OrderBooks(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 46 47"
      fill="none"
      {...props}
    >
      <Circle cx={23} cy={24} r={23} fill="#ED9F06" fillOpacity={0.3} />
      <G clipPath="url(#clip0_2_6226)">
        <Path
          opacity={0.15}
          d="M12.89 14.672v20.222h15.556V18.561l-3.889-3.89H12.891z"
          fill="#000"
        />
        <Path
          opacity={0.94}
          d="M13.672 13.89v20.223h15.555V17.779l-3.889-3.888H13.672z"
          fill="#EFA005"
        />
        <G opacity={0.94}>
          <G opacity={0.15} fill="#000">
            <Path d="M20.28 17a3.89 3.89 0 00-2.982 1.92 3.895 3.895 0 00-.15 3.59L20.28 20.7V17z" />
            <Path
              d="M21.055 17v3.702l3.132 1.808a3.897 3.897 0 00-.152-3.59 3.893 3.893 0 00-2.98-1.92z"
              fillOpacity={0.976}
            />
            <Path d="M20.67 21.375l-3.123 1.803a3.893 3.893 0 003.123 1.584 3.889 3.889 0 003.124-1.584l-3.124-1.803z" />
          </G>
          <Path
            d="M21.061 17a3.89 3.89 0 00-2.982 1.92 3.896 3.896 0 00-.15 3.59l3.133-1.809V17z"
            fill="#2ECC71"
          />
          <Path
            d="M21.836 17v3.702l3.132 1.808a3.897 3.897 0 00-.152-3.59 3.893 3.893 0 00-2.98-1.92z"
            fill="#876DFF"
          />
          <Path
            d="M21.444 21.375l-3.124 1.803a3.893 3.893 0 003.124 1.584 3.889 3.889 0 003.123-1.584l-3.123-1.803z"
            fill="#31005C"
          />
        </G>
        <Path
          opacity={0.15}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.555 13.89v3.89h3.889"
          fill="#000"
        />
        <Path
          d="M26.893 26.336H15.227v.778h11.666v-.778zM26.893 28.672H15.227v.778h11.666v-.778zM22.227 31h-7v.778h7V31z"
          fill="#fff"
        />
        <Path
          opacity={0.94}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.336 13.89v3.89h3.889"
          fill="#fff"
        />
        <G opacity={0.94}>
          <Path
            opacity={0.15}
            d="M31.167 17.781c-.647 0-1.167.52-1.167 1.167V31.78l1.556 3.111 1.555-3.11V18.947c0-.646-.52-1.167-1.167-1.167h-.778z"
            fill="#000"
          />
          <Path d="M30.781 20.89h3.111v10.89h-3.11V20.89z" fill="#8C70F0" />
          <Path
            d="M30.781 31.781h3.111l-1.555 3.111-1.556-3.11zm0-11.666v-1.167c0-.646.52-1.167 1.167-1.167h.778c.646 0 1.166.52 1.166 1.167v1.167h-3.11z"
            fill="#31005C"
          />
          <Path
            d="M31.948 34.117l.389.778.389-.778h-.778zm-1.167-14h3.111v.778h-3.11v-.778z"
            fill="#34485C"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_2_6226">
          <Path fill="#fff" transform="translate(9 10)" d="M0 0H28V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default OrderBooks;
