import { Dimensions } from 'react-native';
import { sizes } from '../utils/size';
const { width, height } = Dimensions.get('window');
export const size = new sizes(height, width);
