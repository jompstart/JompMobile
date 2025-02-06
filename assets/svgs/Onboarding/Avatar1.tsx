import * as React from 'react';
import Svg, {
  Circle,
  G,
  Path,
  Mask,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function Avatar1(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 46 47"
      fill="none"
      {...props}
    >
      <Circle cx={23} cy={24} r={23} fill="#424E9B" fillOpacity={0.3} />
      <G clipPath="url(#clip0_279_251)">
        <Path
          d="M15.068 25.234s-2.782.298-2.996 3.749c-.124 1.996-.05 2.126-.05 2.126l1.595 1.416 1.451-7.29z"
          fill="url(#paint0_linear_279_251)"
        />
        <Path
          d="M32.917 30.407c-1.45-1.602-4.206-4.192-5.879-5.902-.492-.503-2.744-.335-2.988-.638-.74-.92 1.248-1.742 1.248-1.742l-1.635-.082c.045-1.487.06-2.465.06-2.465l-4.167.396s.55 2.114-.032 2.972c-.842 1.242-1.261 1.798-4.324 2.265-2.053.313-2.68 4.817-2.453 6.47.207 1.517 4.577 4.755 8.628 5.293 4.28.821 11.84.67 12.085-.835.288-1.769-.197-5.35-.543-5.733z"
          fill="url(#paint1_linear_279_251)"
        />
        <Mask
          id="a"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={12}
          y={23}
          width={24}
          height={16}
        >
          <Path
            d="M35.586 23.656H12.172v14.99h23.414v-14.99z"
            fill="url(#paint2_linear_279_251)"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            opacity={0.54}
            d="M29.562 32.232c1.773 1.867 3.487-1.59 3.376-1.713-1.45-1.602-4.222-4.304-5.895-6.014-.493-.503-2.744-.335-2.988-.638-.74-.92 1.247-1.742 1.247-1.742l-1.634-.082c.044-1.487.06-2.465.06-2.465l-4.167.396s.55 2.114-.032 2.972c-.842 1.242-1.547 2.885.879 4.558 1.162.803 5.285.652 9.154 4.728z"
            fill="url(#paint3_linear_279_251)"
          />
        </G>
        <Path
          d="M32.987 30.477s-5.285.822-6.292 7.01c0 0 4.38 1.818 6.896-1.384 0 0 .705-2.813-.604-5.626z"
          fill="url(#paint4_linear_279_251)"
        />
        <Path
          opacity={0.49}
          d="M25.804 24.6c-.3-2.057.835-6.305-7.624.424 0 0-1.251 6.993 1.252 7.474 2.502.482 7.54-5.463 7.146-7.36-.017-.08-.762-.448-.774-.538z"
          fill="url(#paint5_linear_279_251)"
        />
        <Path
          d="M26.151 24.203s.975.446.494 1.125c-.208.293-4.643 3.262-7.78.043-3.015-3.095 2.61-3.363 2.61-3.363l4.676 2.195z"
          fill="url(#paint6_linear_279_251)"
        />
        <Path
          d="M26.235 20.54s.097 3.915 0 4.213c-.097.298-4.155 3.108-7.344.043l2.464-3.32 4.88-.937z"
          fill="url(#paint7_linear_279_251)"
        />
        <Path
          d="M25.852 24.407c-.096.293-3.87 2.688-7.04-.191l.075.58c3.189 3.065 7.247.254 7.344-.043.044-.445.058-.892.042-1.339-.001.55-.392.9-.421.993z"
          fill="url(#paint8_linear_279_251)"
        />
        <Path
          opacity={0.29}
          d="M27.804 18.301c0 .84-1.221.827-1.68 1.635-.26.46.37 1.771.002 2.192-1.616 1.851-4.12 3.222-6.225 3.222-3.424 0-4.495-3.625-4.495-7.049a6.199 6.199 0 1112.398 0z"
          fill="url(#paint9_linear_279_251)"
        />
        <Path
          d="M27.334 18.133c0 3.423-4.495 6.774-7.903 7.049-2.371.191-4.273-2.74-4.57-6.624-.26-3.418.914-6.073 6.274-6.625 3.4-.35 6.199 2.775 6.199 6.2z"
          fill="url(#paint10_linear_279_251)"
        />
        <Path
          opacity={0.96}
          d="M22.263 14.69s-5.362 3.45-7.154 1.636c0 0 3.743-7.012 9.543-5.096.305.1 1.242.867 1.39 1.17 0 0 4.715 1.715.05 8.914l-2.334.787s1.247-1.828-.403-4.62c-.695-1.174-1.732-1.742-1.092-2.792z"
          fill="url(#paint11_linear_279_251)"
        />
        <Path
          d="M22.63 14.184s-6.081 3.482-8.112 1.571c0 0-.378-5.862 7.657-5.754 1.58.022 3.136.468 3.482 1.253 0 0 6.446 2.23.618 9.894l-2.223.573s1.852-1.931-.456-4.862c-.925-1.174-1.644-1.74-.919-2.845"
          fill="url(#paint12_linear_279_251)"
        />
        <Mask
          id="b"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={23}
          y={11}
          width={7}
          height={12}
        >
          <Path
            d="M26.856 11.484L23.25 21.91l1.457.17 3.063-.085 1.728-7.877-2.642-2.633z"
            fill="url(#paint13_linear_279_251)"
          />
        </Mask>
        <G mask="url(#b)">
          <Path
            d="M27.377 12.352c-.218 1-1.218 5.347-2.718 8.127a2.887 2.887 0 01-.612 1.237l2.222-.573c3.65-4.8 2.487-7.467 1.108-8.791z"
            fill="url(#paint14_linear_279_251)"
          />
        </G>
        <Path
          d="M24.694 20.396c.278-.848.322-2.196-1-3.873-.693-.88-1.27-1.419-1.211-2.097-.357.877.295 1.441 1.112 2.479 1.138 1.444 1.263 2.645 1.1 3.491zm-1.788-6.677c-.59.33-6.5 3.146-8.422 1.337 0 0 .101-.15.261-.868a5.092 5.092 0 00-.227 1.613c1.874 1.763 7.188-1.063 7.996-1.509.026-.13.317-.429.392-.573zm3.467 7.092l-2.02.52c-.083.154-.184.3-.302.436l2.223-.573c1.328-1.748 2.014-3.209 2.289-4.43-.325 1.141-.997 2.479-2.19 4.047z"
          fill="url(#paint15_linear_279_251)"
        />
        <Path
          d="M15.734 13.44s2.69-2.92 7.576-2.576c0 0-2.883.371-3.546.918 0 0 .421-.176 1.329-.108 0 0-2.165.502-2.962 1.15 0 0 2.21-.85 3.8-.561 0 0-5.329.992-5.826 2.291 0 0-.218-.447 1.108-1.54l1.177-.777s-1.623.142-2.656 1.203z"
          fill="url(#paint16_linear_279_251)"
        />
        <Path
          opacity={0.54}
          d="M25.522 11.378c.373.204.752.645.953.976-.222-.03-.406-.241-.653-.297a1.898 1.898 0 00-.517-.097c.13.296.447.496.546.82.057.264.07.533.04.8-.214-.382-.658-1.077-1.214-1.148-.037.28.23.741.296 1.034-.173-.148-.465-.416-.733-.385.02.283.357.566.2.852-.13-.013-.296-.203-.423-.265-.154-.077-.346-.117-.442-.241-.04.342.146.682.163 1.027.02.223-.001.448-.065.666-.249-.142-.2-.586-.472-.791a.879.879 0 00-.285-.15.974.974 0 00-.33-.045c.258-.343.713-.502 1.006-.804.257-.266-.115-.365-.32-.61.127-.047.476.026.59-.07.172-.143-.04-.37-.011-.527.33-.046.639.272.832-.087.13-.242-.014-.409-.09-.615.173.03.492.335.663.258.14-.064.087-.333.1-.445a.87.87 0 01.29.186"
          fill="#402205"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_279_251"
          x1={12}
          y1={28.8796}
          x2={15.0684}
          y2={28.8796}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#66AFE3" />
          <Stop offset={0.10269} stopColor="#58A2D6" />
          <Stop offset={0.44897} stopColor="#2E79AE" />
          <Stop offset={0.72052} stopColor="#145F95" />
          <Stop offset={0.88202} stopColor="#0A568C" />
          <Stop offset={0.90443} stopColor="#0A5D86" />
          <Stop offset={0.93806} stopColor="#0B7276" />
          <Stop offset={0.97855} stopColor="#0D935C" />
          <Stop offset={1} stopColor="#0EA84C" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_279_251"
          x1={12.7031}
          y1={28.5232}
          x2={33.5476}
          y2={28.5232}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ABEBFF" />
          <Stop offset={0.03629} stopColor="#9AE0FB" />
          <Stop offset={0.17025} stopColor="#5FBBED" />
          <Stop offset={0.2847} stopColor="#35A0E3" />
          <Stop offset={0.37392} stopColor="#1B8FDD" />
          <Stop offset={0.42697} stopColor="#1189DB" />
          <Stop offset={0.67416} stopColor="#0C68AB" />
          <Stop offset={0.73983} stopColor="#0C6CAF" />
          <Stop offset={0.81135} stopColor="#0E7ABA" />
          <Stop offset={0.88564} stopColor="#108FCC" />
          <Stop offset={0.96133} stopColor="#13AEE5" />
          <Stop offset={1} stopColor="#15C0F5" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_279_251"
          x1={29.2194}
          y1={26.6868}
          x2={23.8862}
          y2={32.719}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.32584} stopColor="#fff" />
          <Stop offset={0.88764} />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_279_251"
          x1={28.5696}
          y1={24.5631}
          x2={21.0479}
          y2={30.1878}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6DE2F2" />
          <Stop offset={0.49652} stopColor="#80D6F7" />
          <Stop offset={0.88202} stopColor="#8AD0FA" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_279_251"
          x1={26.6953}
          y1={34.2387}
          x2={33.7805}
          y2={34.2387}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.16292} stopColor="#2DA8F0" />
          <Stop offset={0.35922} stopColor="#1990D5" />
          <Stop offset={0.57752} stopColor="#077BBE" />
          <Stop offset={0.71348} stopColor="#0073B5" />
          <Stop offset={0.78346} stopColor="#037ABC" />
          <Stop offset={0.88846} stopColor="#0A8FD0" />
          <Stop offset={1} stopColor="#14ACED" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_279_251"
          x1={17.8672}
          y1={26.9503}
          x2={26.5995}
          y2={26.9503}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.00562} stopColor="#4FD6FF" />
          <Stop offset={0.1676} stopColor="#49CBF7" />
          <Stop offset={0.44899} stopColor="#37AFE0" />
          <Stop offset={0.81374} stopColor="#1C81BC" />
          <Stop offset={1} stopColor="#0C67A8" />
        </LinearGradient>
        <LinearGradient
          id="paint6_linear_279_251"
          x1={17.9766}
          y1={24.4323}
          x2={26.7784}
          y2={24.4323}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#EBFBFF" />
          <Stop offset={0.10869} stopColor="#DBF2FA" />
          <Stop offset={0.3196} stopColor="#B3DBEF" />
          <Stop offset={0.61172} stopColor="#71B6DB" />
          <Stop offset={0.97064} stopColor="#1883C1" />
          <Stop offset={1} stopColor="#107FBF" />
        </LinearGradient>
        <LinearGradient
          id="paint7_linear_279_251"
          x1={18.8906}
          y1={23.377}
          x2={26.2778}
          y2={23.377}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#C28469" />
          <Stop offset={0.05024} stopColor="#C4886C" />
          <Stop offset={0.43238} stopColor="#D5A383" />
          <Stop offset={0.6573} stopColor="#DBAD8C" />
          <Stop offset={0.72801} stopColor="#DEB394" />
          <Stop offset={0.83525} stopColor="#E7C4A9" />
          <Stop offset={0.96506} stopColor="#F6DFCB" />
          <Stop offset={1} stopColor="#FAE7D5" />
        </LinearGradient>
        <LinearGradient
          id="paint8_linear_279_251"
          x1={18.8125}
          y1={24.8142}
          x2={26.2736}
          y2={24.8142}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9E5444" />
          <Stop offset={0.07184} stopColor="#A45C4B" />
          <Stop offset={0.48707} stopColor="#C2886E" />
          <Stop offset={0.8103} stopColor="#D4A384" />
          <Stop offset={1} stopColor="#DBAD8C" />
        </LinearGradient>
        <LinearGradient
          id="paint9_linear_279_251"
          x1={18.6989}
          y1={16.2892}
          x2={23.9167}
          y2={23.1266}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#592F26" />
          <Stop offset={0.25128} stopColor="#6A3C31" />
          <Stop offset={0.7225} stopColor="#855142" />
          <Stop offset={1} stopColor="#8F5949" />
        </LinearGradient>
        <LinearGradient
          id="paint10_linear_279_251"
          x1={18.159}
          y1={15.8954}
          x2={23.449}
          y2={22.8274}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.00562} stopColor="#FAE7D5" />
          <Stop offset={0.71348} stopColor="#E8B794" />
          <Stop offset={0.80005} stopColor="#EBBC9A" />
          <Stop offset={0.91858} stopColor="#F3CCAC" />
          <Stop offset={1} stopColor="#FADABC" />
        </LinearGradient>
        <LinearGradient
          id="paint11_linear_279_251"
          x1={15.1094}
          y1={16.4996}
          x2={28.1526}
          y2={16.4996}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#302419" />
          <Stop offset={0.54253} stopColor="#422615" />
          <Stop offset={1} stopColor="#4C2712" />
        </LinearGradient>
        <LinearGradient
          id="paint12_linear_279_251"
          x1={14.5156}
          y1={15.8608}
          x2={28.7144}
          y2={15.8608}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#C79465" />
          <Stop offset={0.01969} stopColor="#C49163" />
          <Stop offset={0.30494} stopColor="#986A47" />
          <Stop offset={0.52696} stopColor="#7D5236" />
          <Stop offset={0.6573} stopColor="#734930" />
          <Stop offset={0.75682} stopColor="#774C33" />
          <Stop offset={0.84962} stopColor="#82553B" />
          <Stop offset={0.93946} stopColor="#956448" />
          <Stop offset={1} stopColor="#A67254" />
        </LinearGradient>
        <LinearGradient
          id="paint13_linear_279_251"
          x1={28.5825}
          y1={18.4308}
          x2={25.5601}
          y2={16.4217}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="paint14_linear_279_251"
          x1={25.1184}
          y1={16.7747}
          x2={27.9744}
          y2={18.4626}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.16292} stopColor="#593925" />
          <Stop offset={0.31348} stopColor="#5D3C27" />
          <Stop offset={0.45389} stopColor="#68442D" />
          <Stop offset={0.59034} stopColor="#7B5138" />
          <Stop offset={0.72431} stopColor="#956447" />
          <Stop offset={0.85652} stopColor="#B87D5A" />
          <Stop offset={0.9857} stopColor="#E19A71" />
          <Stop offset={1} stopColor="#E69E74" />
        </LinearGradient>
        <LinearGradient
          id="paint15_linear_279_251"
          x1={14.4844}
          y1={17.7429}
          x2={28.5629}
          y2={17.7429}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DBA674" />
          <Stop offset={0.21877} stopColor="#DBAC67" />
          <Stop offset={0.46629} stopColor="#DBB15D" />
          <Stop offset={0.5941} stopColor="#C59759" />
          <Stop offset={0.73123} stopColor="#B48256" />
          <Stop offset={0.86729} stopColor="#A97655" />
          <Stop offset={1} stopColor="#A67254" />
        </LinearGradient>
        <LinearGradient
          id="paint16_linear_279_251"
          x1={15.6778}
          y1={13.0729}
          x2={23.4651}
          y2={11.8741}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E8C8A0" />
          <Stop offset={0.02392} stopColor="#E5C497" />
          <Stop offset={0.18912} stopColor="#D4A85C" />
          <Stop offset={0.33023} stopColor="#C89432" />
          <Stop offset={0.44023} stopColor="#C08818" />
          <Stop offset={0.50562} stopColor="#BD830E" />
          <Stop offset={1} stopColor="#87380B" />
        </LinearGradient>
        <ClipPath id="clip0_279_251">
          <Path
            fill="#fff"
            transform="translate(12 10)"
            d="M0 0H21.7778V28H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Avatar1;
