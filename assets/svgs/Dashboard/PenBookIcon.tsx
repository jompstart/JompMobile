import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function PenBookIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_348_4814)">
        <Path
          opacity={0.15}
          d="M3.89 4.672v20.222h15.556V8.561l-3.889-3.89H3.891z"
          fill="#000"
        />
        <Path
          opacity={0.94}
          d="M4.672 3.89v20.223h15.555V7.78l-3.889-3.89H4.672z"
          fill="#EFA005"
        />
        <G opacity={0.94}>
          <G opacity={0.15} fill="#000">
            <Path d="M11.28 7a3.89 3.89 0 00-2.982 1.92 3.897 3.897 0 00-.15 3.59L11.28 10.7V7z" />
            <Path
              d="M12.055 7v3.702l3.132 1.808a3.897 3.897 0 00-.152-3.59A3.893 3.893 0 0012.055 7z"
              fillOpacity={0.976}
            />
            <Path d="M11.67 11.375l-3.123 1.803a3.892 3.892 0 003.123 1.584 3.889 3.889 0 003.124-1.584l-3.124-1.803z" />
          </G>
          <Path
            d="M12.062 7a3.89 3.89 0 00-2.983 1.92 3.897 3.897 0 00-.15 3.59l3.133-1.809V7z"
            fill="#2ECC71"
          />
          <Path
            d="M12.836 7v3.702l3.132 1.808a3.897 3.897 0 00-.152-3.59A3.893 3.893 0 0012.836 7z"
            fill="#876DFF"
          />
          <Path
            d="M12.444 11.375L9.32 13.178a3.893 3.893 0 003.124 1.584 3.889 3.889 0 003.123-1.584l-3.123-1.803z"
            fill="#31005C"
          />
        </G>
        <Path
          opacity={0.15}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.555 3.89v3.89h3.889"
          fill="#000"
        />
        <Path
          d="M17.893 16.336H6.227v.778h11.666v-.778zM17.893 18.672H6.227v.778h11.666v-.778zM13.227 21h-7v.778h7V21z"
          fill="#fff"
        />
        <Path
          opacity={0.94}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.336 3.89v3.89h3.889"
          fill="#fff"
        />
        <G opacity={0.94}>
          <Path
            opacity={0.15}
            d="M22.167 7.781c-.647 0-1.167.52-1.167 1.167V21.78l1.556 3.111 1.555-3.11V8.947c0-.646-.52-1.167-1.167-1.167h-.778z"
            fill="#000"
          />
          <Path d="M21.781 10.89h3.111v10.89h-3.11V10.89z" fill="#8C70F0" />
          <Path
            d="M21.781 21.781h3.111l-1.555 3.111-1.556-3.11zm0-11.666V8.948c0-.646.52-1.167 1.167-1.167h.778c.646 0 1.166.52 1.166 1.167v1.167h-3.11z"
            fill="#31005C"
          />
          <Path
            d="M22.948 24.117l.389.778.389-.778h-.778zm-1.167-14h3.111v.778h-3.11v-.778z"
            fill="#34485C"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_348_4814">
          <Path fill="#fff" d="M0 0H28V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PenBookIcon;
