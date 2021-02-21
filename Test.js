import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
  withDecay,
  runOnJS,
  withDelay,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

export default function AnimatedStyleUpdateExample(props) {
  const [active, setActive] = useState(false);
  const activeOpacity = useSharedValue(active ? 1 : 0);
  const boundX = 100;
  const boundY = 100;
  const randomWidth = useSharedValue(10);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const config = {
    duration: 2000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  // const style = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(randomWidth.value, config),
  //   };
  // });
  const onActive = (a) => {
    console.log(a);
  };
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
      if (translateX.value > 50) {
        runOnJS(onActive)(translateX.value);
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   translateX: withDelay(1000, withTiming(randomWidth.value, config)),
        // },
        // {
        // scale: interpolate(translateX.value, [0, boundX], [1, 2]),
        // },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  useEffect(() => {
    activeOpacity.value = withSpring(active ? 1 : 0, 1000);
  }, [active]);
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <View style={[{ width: 50, height: 50, backgroundColor: 'black', margin: 1 }]} />
        </Animated.View>
      </PanGestureHandler>
      <Button title="toggle" onPress={() => setActive((a) => !a)} />
    </View>
  );
}
