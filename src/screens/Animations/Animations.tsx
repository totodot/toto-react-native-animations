/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
  useDerivedValue,
  withDelay,
  withSequence,
  withDecay,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Space from '@/components/Space';
import { SPACE_S } from '@/constants/sizes.constants';

const BOX_SIZE = 50;
const { width: WIDTH } = Dimensions.get('window');
const MAX_TRANSLATE = WIDTH - BOX_SIZE - 2 * SPACE_S;
const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: '#fb0',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Animations = () => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const sharedValue = useSharedValue(0);
  const translateX1 = useDerivedValue(() => {
    return withTiming(active1 ? MAX_TRANSLATE : 0, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    // return withTiming(interpolate(active1 ? 1: 0, [0, 1], [0, MAX_TRANSLATE]), {
    //   duration: 500,
    //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    // });
  }, [active1]);
  const translateX2 = useDerivedValue(() => {
    return withSpring(active2 ? MAX_TRANSLATE : 0);
  }, [active2]);
  const translateX3 = useDerivedValue(() => {
    return withDelay(1000, withTiming(active3 ? MAX_TRANSLATE : 0));
  }, [active3]);

  const translateX4 = useSharedValue(0);
  const translateX5 = useSharedValue(0);

  const style1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // translateX: withTiming(interpolate(translateX1.value, [0, 1], [0, MAX_TRANSLATE]), {
          //   duration: 500,
          //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          // }),
          translateX: translateX1.value,
        },
      ],
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX2.value,
        },
      ],
    };
  });

  const style3 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX3.value,
        },
      ],
    };
  });

  const style4 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX4.value,
        },
      ],
    };
  });

  const style5 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX5.value,
        },
      ],
    };
  });

  const style6 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: sharedValue.value,
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <Space mh="s">
        <Space mv="s">
          <Animated.View style={[styles.box, style1]} />
          <Button onPress={() => setActive1((v) => !v)} title="Timing" />
        </Space>
        <Space mv="s">
          <Animated.View style={[styles.box, style6]} />
          <Button
            onPress={() =>
              (sharedValue.value = withDecay({
                velocity: MAX_TRANSLATE,
                clamp: [0, MAX_TRANSLATE],
              }))
            }
            title="Decay"
          />
        </Space>
        <Space mv="s">
          <Animated.View style={[styles.box, style2]} />
          <Button onPress={() => setActive2((v) => !v)} title="Spiring" />
        </Space>
        <Space mv="s">
          <Animated.View style={[styles.box, style3]} />
          <Button onPress={() => setActive3((v) => !v)} title="Delay" />
        </Space>
        <Space mv="s">
          <Animated.View style={[styles.box, style4]} />
          <Button
            onPress={() =>
              (translateX4.value = withSequence(
                withTiming(100),
                withDelay(1000, withTiming(MAX_TRANSLATE)),
              ))
            }
            title="Sequence"
          />
        </Space>
        <Space mv="s">
          <Animated.View style={[styles.box, style5]} />
          <View style={styles.row}>
            <Button
              onPress={() =>
                (translateX5.value = withRepeat(
                  withTiming(MAX_TRANSLATE, { duration: 1000 }),
                  10,
                  true,
                ))
              }
              title="Repeat"
            />
            <Button
              onPress={() => {
                cancelAnimation(translateX5);
                translateX5.value = 0;
              }}
              title="Stop"
            />
          </View>
        </Space>
      </Space>
    </SafeAreaView>
  );
};

export default Animations;
