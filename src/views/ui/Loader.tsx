import colors from '@/utils/colors';
import { FC, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AntDesing from 'react-native-vector-icons/AntDesign';

interface Props {
  color?: string;
}

const Loader: FC<Props> = ({ color = colors.CONTRAST }) => {
  const rotation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });


  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, true);

  }, []);


  return (
    <Animated.View style={transform}>
      <AntDesing name="loading1" size={24} color={color} />
    </Animated.View>
  );
};

export default Loader;
