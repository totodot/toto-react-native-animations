import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import COLORS from '@/constants/colors.constants';
import { FontFamilies } from '@/types/common.types';

const fadeIn = (value) => {
  'worklet';

  return {
    opacity: value,
  };
};

const slideDown = (value) => {
  'worklet';

  return {
    opacity: value,
    transform: [
      {
        translateY: interpolate(value, [0, 1], [50, 0]),
      },
    ],
  };
};
const animations = {
  slideDown,
  fadeIn,
};

const Anim = ({
  style,
  children,
  active = false,
  duration = 500,
  delay = 0,
  onMount = false,
  name = 'slideDown',
}) => {
  const [localIsActive, setLocalIsActive] = useState(active);
  const animatedValue = useSharedValue(0);
  const open = () => setLocalIsActive(true);
  const close = () => setLocalIsActive(false);
  useEffect(() => {
    if (active || onMount) {
      open();
      animatedValue.value = withDelay(delay, withTiming(1, { duration }));
    } else {
      animatedValue.value = withTiming(0, { duration });
      setTimeout(() => {
        close();
      }, duration);
    }
  }, [active, onMount]);

  const styles = useAnimatedStyle(() => {
    return animations[name](animatedValue.value);
  });
  console.log({ active });
  if (!localIsActive) {
    return null;
  }

  return <Animated.View style={[style, styles]}>{children}</Animated.View>;
};

export default Anim;
