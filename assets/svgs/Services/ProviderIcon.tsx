import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

function ProviderIcon(props: SvgProps) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 46 47"
      fill="none"
      {...props}
    >
      <Circle cx={23} cy={24} r={23} fill="#F0EDFF" />
      <Path
        d="M31.428 13.79a2.532 2.532 0 00-2.464-.11l-.177.093a.843.843 0 01-.76 0l-1.864-.936a2.531 2.531 0 00-2.261 0l-1.865.936a.843.843 0 01-.76 0l-.177-.092a2.53 2.53 0 00-3.662 2.27v13.297a1.13 1.13 0 010 .168 3.374 3.374 0 01-2.227 3.004c.15.13.342.2.54.203h13.5a3.375 3.375 0 003.375-3.375V15.95a2.53 2.53 0 00-1.198-2.16zM19.126 29.248a.408.408 0 010 .101 2.115 2.115 0 000-.236v.135zm7.594-2.329h-5.063a.844.844 0 110-1.688h5.063a.843.843 0 110 1.688zm1.687-5.063h-6.75a.844.844 0 110-1.687h6.75a.843.843 0 110 1.688z"
        fill="#876DFF"
      />
      <Path
        d="M14.906 20.813h.844v8.437a1.687 1.687 0 11-3.375 0v-5.906a2.531 2.531 0 012.531-2.532z"
        fill="#EFA005"
      />
    </Svg>
  );
}

export default ProviderIcon;
