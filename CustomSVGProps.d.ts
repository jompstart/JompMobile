import { SvgProps } from 'react-native-svg';

declare module 'react-native-svg' {
  export interface SvgProps {
    size?: number;
  }
}
