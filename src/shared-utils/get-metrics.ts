import { Dimensions, PixelRatio, Platform } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const BASE_WIDTH = Platform.OS === 'android' ? 390 : 409;
const scale = (size: number) => (WIDTH / BASE_WIDTH) * size;

const getMetrics = (size: number) => Math.round(PixelRatio.roundToNearestPixel(scale(size)));

export { getMetrics };
