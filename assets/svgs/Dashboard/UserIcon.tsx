import * as React from 'react';
import Svg, {
  G,
  Path,
  Mask,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function UserIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 28"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_348_4768)">
        <Path
          d="M3.068 15.234s-2.782.298-2.996 3.749c-.124 1.996-.05 2.126-.05 2.126l1.595 1.416 1.451-7.29z"
          fill="url(#paint0_linear_348_4768)"
        />
        <Path
          d="M20.917 20.407c-1.45-1.602-4.206-4.192-5.879-5.902-.492-.503-2.744-.336-2.988-.638-.74-.92 1.248-1.742 1.248-1.742l-1.635-.082c.045-1.487.06-2.465.06-2.465l-4.167.396s.55 2.114-.031 2.972c-.843 1.242-1.262 1.798-4.325 2.265-2.053.313-2.68 4.817-2.453 6.47.207 1.517 4.577 4.755 8.628 5.293 4.28.821 11.84.67 12.085-.835.288-1.769-.197-5.35-.543-5.732z"
          fill="url(#paint1_linear_348_4768)"
        />
        <Mask
          id="a"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={13}
          width={24}
          height={16}
        >
          <Path
            d="M23.585 13.656H.172v14.99h23.413v-14.99z"
            fill="url(#paint2_linear_348_4768)"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            opacity={0.54}
            d="M17.562 22.232c1.773 1.867 3.487-1.59 3.376-1.713-1.45-1.602-4.222-4.304-5.895-6.014-.493-.503-2.744-.336-2.988-.638-.74-.92 1.247-1.742 1.247-1.742l-1.634-.082c.045-1.487.06-2.465.06-2.465l-4.167.396s.549 2.114-.032 2.972c-.842 1.242-1.547 2.885.879 4.558 1.162.803 5.285.652 9.154 4.728z"
            fill="url(#paint3_linear_348_4768)"
          />
        </G>
        <Path
          d="M20.987 20.477s-5.285.822-6.292 7.01c0 0 4.38 1.818 6.896-1.384 0 0 .705-2.813-.604-5.626z"
          fill="url(#paint4_linear_348_4768)"
        />
        <Path
          opacity={0.49}
          d="M13.804 14.6c-.3-2.057.835-6.305-7.624.424 0 0-1.251 6.993 1.251 7.474 2.503.482 7.542-5.463 7.147-7.36-.017-.08-.762-.448-.774-.538z"
          fill="url(#paint5_linear_348_4768)"
        />
        <Path
          d="M14.151 14.203s.975.446.494 1.125c-.208.293-4.643 3.262-7.78.043-3.015-3.095 2.61-3.363 2.61-3.363l4.676 2.195z"
          fill="url(#paint6_linear_348_4768)"
        />
        <Path
          d="M14.235 10.54s.097 3.915 0 4.214c-.097.297-4.155 3.107-7.344.042l2.464-3.32 4.88-.937z"
          fill="url(#paint7_linear_348_4768)"
        />
        <Path
          d="M13.851 14.407c-.095.293-3.869 2.688-7.039-.191l.075.58c3.189 3.065 7.247.254 7.344-.043.044-.445.058-.892.043-1.339-.002.55-.393.9-.422.993z"
          fill="url(#paint8_linear_348_4768)"
        />
        <Path
          opacity={0.29}
          d="M15.804 8.301c0 .84-1.221.827-1.68 1.635-.26.46.37 1.771.002 2.192-1.616 1.851-4.12 3.222-6.225 3.222-3.424 0-4.495-3.625-4.495-7.049a6.199 6.199 0 1112.398 0z"
          fill="url(#paint9_linear_348_4768)"
        />
        <Path
          d="M15.334 8.133c0 3.423-4.495 6.774-7.903 7.049-2.371.191-4.273-2.74-4.57-6.624-.26-3.417.915-6.073 6.274-6.625 3.4-.35 6.199 2.775 6.199 6.2z"
          fill="url(#paint10_linear_348_4768)"
        />
        <Path
          opacity={0.96}
          d="M10.263 4.69S4.901 8.14 3.11 6.325c0 0 3.743-7.012 9.543-5.096.305.1 1.242.867 1.39 1.17 0 0 4.715 1.715.05 8.914l-2.334.787s1.247-1.828-.403-4.62C10.66 6.308 9.623 5.74 10.262 4.69z"
          fill="url(#paint11_linear_348_4768)"
        />
        <Path
          d="M10.63 4.184S4.548 7.666 2.517 5.755c0 0-.377-5.862 7.657-5.754 1.58.022 3.136.468 3.482 1.253 0 0 6.447 2.23.618 9.894l-2.223.574s1.852-1.932-.457-4.863c-.925-1.174-1.643-1.74-.918-2.845"
          fill="url(#paint12_linear_348_4768)"
        />
        <Mask
          id="b"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={11}
          y={1}
          width={7}
          height={12}
        >
          <Path
            d="M14.856 1.484L11.25 11.91l1.457.17 3.063-.085 1.728-7.877-2.642-2.633z"
            fill="url(#paint13_linear_348_4768)"
          />
        </Mask>
        <G mask="url(#b)">
          <Path
            d="M15.377 2.352c-.218 1-1.218 5.347-2.718 8.127a2.887 2.887 0 01-.612 1.237l2.222-.573c3.65-4.8 2.487-7.467 1.108-8.791z"
            fill="url(#paint14_linear_348_4768)"
          />
        </G>
        <Path
          d="M12.694 10.396c.278-.848.322-2.196-1-3.873-.693-.88-1.27-1.419-1.211-2.097-.357.877.295 1.441 1.112 2.479 1.138 1.444 1.263 2.645 1.1 3.491zM10.906 3.72c-.59.33-6.5 3.146-8.422 1.337 0 0 .101-.15.261-.868a5.093 5.093 0 00-.227 1.613c1.874 1.763 7.189-1.063 7.996-1.509.026-.13.317-.429.392-.573zm3.467 7.093l-2.02.52c-.083.153-.184.299-.302.435l2.223-.573c1.328-1.748 2.014-3.209 2.289-4.43-.325 1.141-.997 2.479-2.19 4.048z"
          fill="url(#paint15_linear_348_4768)"
        />
        <Path
          d="M3.734 3.44S6.424.52 11.31.864c0 0-2.883.372-3.546.918 0 0 .421-.176 1.329-.108 0 0-2.165.502-2.962 1.15 0 0 2.21-.85 3.8-.561 0 0-5.328.992-5.826 2.291 0 0-.218-.447 1.108-1.54l1.177-.777S4.767 2.38 3.734 3.44z"
          fill="url(#paint16_linear_348_4768)"
        />
        <Path
          opacity={0.54}
          d="M13.522 1.378c.373.204.752.645.953.976-.222-.03-.406-.241-.653-.297a1.894 1.894 0 00-.517-.097c.13.296.447.496.546.82.057.264.07.533.04.8-.214-.382-.658-1.077-1.214-1.147-.037.28.23.74.296 1.033-.173-.148-.465-.416-.733-.385.02.283.357.566.2.852-.13-.013-.295-.203-.423-.265-.154-.077-.346-.117-.442-.241-.04.342.146.682.163 1.027.02.223-.001.448-.065.666-.249-.142-.2-.586-.472-.791a.88.88 0 00-.285-.15.973.973 0 00-.33-.045c.258-.343.713-.502 1.006-.804.257-.266-.115-.365-.32-.61.127-.047.476.026.59-.07.172-.143-.04-.37-.011-.527.33-.046.638.272.832-.087.13-.242-.014-.409-.09-.615.173.03.492.335.663.258.14-.064.087-.333.1-.445a.87.87 0 01.29.186"
          fill="#402205"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_348_4768"
          x1={-5.43013e-7}
          y1={18.8796}
          x2={3.06842}
          y2={18.8796}
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
          id="paint1_linear_348_4768"
          x1={0.703123}
          y1={18.5232}
          x2={21.5476}
          y2={18.5232}
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
          id="paint2_linear_348_4768"
          x1={17.2194}
          y1={16.6868}
          x2={11.8862}
          y2={22.719}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.32584} stopColor="#fff" />
          <Stop offset={0.88764} />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_348_4768"
          x1={16.5696}
          y1={14.5631}
          x2={9.0479}
          y2={20.1878}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6DE2F2" />
          <Stop offset={0.49652} stopColor="#80D6F7" />
          <Stop offset={0.88202} stopColor="#8AD0FA" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_348_4768"
          x1={14.6953}
          y1={24.2387}
          x2={21.7805}
          y2={24.2387}
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
          id="paint5_linear_348_4768"
          x1={5.86719}
          y1={16.9503}
          x2={14.5995}
          y2={16.9503}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.00562} stopColor="#4FD6FF" />
          <Stop offset={0.1676} stopColor="#49CBF7" />
          <Stop offset={0.44899} stopColor="#37AFE0" />
          <Stop offset={0.81374} stopColor="#1C81BC" />
          <Stop offset={1} stopColor="#0C67A8" />
        </LinearGradient>
        <LinearGradient
          id="paint6_linear_348_4768"
          x1={5.97656}
          y1={14.4323}
          x2={14.7784}
          y2={14.4323}
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
          id="paint7_linear_348_4768"
          x1={6.89063}
          y1={13.377}
          x2={14.2778}
          y2={13.377}
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
          id="paint8_linear_348_4768"
          x1={6.8125}
          y1={14.8142}
          x2={14.2736}
          y2={14.8142}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9E5444" />
          <Stop offset={0.07184} stopColor="#A45C4B" />
          <Stop offset={0.48707} stopColor="#C2886E" />
          <Stop offset={0.8103} stopColor="#D4A384" />
          <Stop offset={1} stopColor="#DBAD8C" />
        </LinearGradient>
        <LinearGradient
          id="paint9_linear_348_4768"
          x1={6.69885}
          y1={6.28922}
          x2={11.9167}
          y2={13.1266}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#592F26" />
          <Stop offset={0.25128} stopColor="#6A3C31" />
          <Stop offset={0.7225} stopColor="#855142" />
          <Stop offset={1} stopColor="#8F5949" />
        </LinearGradient>
        <LinearGradient
          id="paint10_linear_348_4768"
          x1={6.159}
          y1={5.89543}
          x2={11.449}
          y2={12.8274}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.00562} stopColor="#FAE7D5" />
          <Stop offset={0.71348} stopColor="#E8B794" />
          <Stop offset={0.80005} stopColor="#EBBC9A" />
          <Stop offset={0.91858} stopColor="#F3CCAC" />
          <Stop offset={1} stopColor="#FADABC" />
        </LinearGradient>
        <LinearGradient
          id="paint11_linear_348_4768"
          x1={3.10938}
          y1={6.49963}
          x2={16.1526}
          y2={6.49963}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#302419" />
          <Stop offset={0.54253} stopColor="#422615" />
          <Stop offset={1} stopColor="#4C2712" />
        </LinearGradient>
        <LinearGradient
          id="paint12_linear_348_4768"
          x1={2.51563}
          y1={5.86077}
          x2={16.7144}
          y2={5.86077}
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
          id="paint13_linear_348_4768"
          x1={16.5825}
          y1={8.43076}
          x2={13.5601}
          y2={6.42168}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="paint14_linear_348_4768"
          x1={13.1184}
          y1={6.77468}
          x2={15.9744}
          y2={8.46262}
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
          id="paint15_linear_348_4768"
          x1={2.48438}
          y1={7.74288}
          x2={16.5629}
          y2={7.74288}
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
          id="paint16_linear_348_4768"
          x1={3.67778}
          y1={3.07293}
          x2={11.4651}
          y2={1.87413}
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
        <ClipPath id="clip0_348_4768">
          <Path fill="#fff" d="M0 0H21.7778V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default UserIcon;
