import * as React from 'react';
import Svg, {
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  SvgProps,
} from 'react-native-svg';

function FluentIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 56 56"
      fill="none"
      {...props}
    >
      <Path
        d="M27.523 11.411c10.995 0 22.725 6.216 22.879 17.45.075 5.474-3.4 11.424-5.194 13.02-.133.118-.268.233-.406.344v3.976a4.2 4.2 0 01-4.2 4.2h-3.876a3.136 3.136 0 01-3.124-3.13.326.326 0 00-.325-.328h-4.95a.325.325 0 00-.325.328c0 1.727-1.4 3.127-3.125 3.127h-3.875a4.2 4.2 0 01-4.2-4.2v-1.506c-3.136-1.82-5.715-4.813-7.16-8.12-.21-.482-.588-.764-.938-.823a3.724 3.724 0 01-3.102-3.674v-4.217a3.61 3.61 0 013.012-3.561c.33-.056.698-.35.86-.849 1.196-3.634 4.004-6.364 7.328-8.117V8.852c0-.988.644-1.688 1.344-1.971.7-.283 1.626-.23 2.315.434 1.949 1.876 4.273 3.802 7.062 4.096z"
        fill="url(#paint0_radial_134_34914)"
      />
      <Path
        d="M21.005 24.498a2.1 2.1 0 11-4.201 0 2.1 2.1 0 014.2 0z"
        fill="url(#paint1_radial_134_34914)"
      />
      <Path
        d="M24.721 17.735a2.68 2.68 0 013.5-1.454l17.845 7.37a2.68 2.68 0 01-2.044 4.953l-17.848-7.37a2.679 2.679 0 01-1.456-3.5"
        fill="#9F1459"
      />
      <Path
        d="M41.149 27.41a9.803 9.803 0 00-3.346-19.012 9.8 9.8 0 00-8.87 13.972l12.216 5.04z"
        fill="url(#paint2_linear_134_34914)"
      />
      <Path
        d="M41.149 27.41a9.803 9.803 0 00-3.346-19.012 9.8 9.8 0 00-8.87 13.972l12.216 5.04z"
        fill="url(#paint3_linear_134_34914)"
        fillOpacity={0.8}
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_134_34914"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(11.62032 41.08177 -42.18931 11.9336 19.322 11.01)"
        >
          <Stop stopColor="#F08AF4" />
          <Stop offset={0.581} stopColor="#E869CE" />
          <Stop offset={1} stopColor="#D7257D" />
        </RadialGradient>
        <RadialGradient
          id="paint1_radial_134_34914"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(59.532 -11.544 27.555) scale(3.5586)"
        >
          <Stop stopColor="#B91D6B" />
          <Stop offset={1} stopColor="#670938" />
        </RadialGradient>
        <LinearGradient
          id="paint2_linear_134_34914"
          x1={44.2008}
          y1={25.7976}
          x2={28.7616}
          y2={13.1668}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF8A69" />
          <Stop offset={1} stopColor="#FFCD0F" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_134_34914"
          x1={40.3816}
          y1={9.51564}
          x2={33.4964}
          y2={25.4224}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.67} stopColor="#FB5937" stopOpacity={0} />
          <Stop offset={1} stopColor="#CD3E1D" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default FluentIcon;
