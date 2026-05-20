import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getNotificationState} from '@/store/notification';
import colors from '@/utils/colors';

const AppNotification: FC = () => {
  const { message, type } = useSelector(getNotificationState);
  const height = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  let backgroundColor = colors.ERROR;
  let textColor = colors.CONTRAST;

  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = colors.PRIMARY;
      break;
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const performAnimation = () => {
      height.value = withTiming(45, { duration: 150 });
      timeoutId = setTimeout(() => {
        height.value = withTiming(0, { duration: 150 });
        dispatch(updateNotification({ message: '', type }));
      }, 3000);
    };

    if (message) performAnimation();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <Animated.View style={[styles.container, { backgroundColor }, heightStyle]}>
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AppNotification;