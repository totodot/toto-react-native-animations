import React, { useState } from 'react';
import { Dimensions, processColor, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Space from '@/components/Space';
import Text from '@/components/Text';
import COLORS from '@/constants/colors.constants';

import ColorBoxesItem from './ColorBoxesItem';

const { width: WIDTH } = Dimensions.get('window');

const ITEMS = [
  {
    id: 0,
    color: '#9f91c3',
    text: 'Earphones',
    image: require('@/assets/images/urbanears/ear.jpg'),
  },
  {
    id: 1,
    color: '#636a63',
    text: 'Accessories',

    image: require('@/assets/images/urbanears/cushions.jpg'),
  },
  {
    id: 2,
    color: '#e1403e',
    text: 'Headphones',

    image: require('@/assets/images/urbanears/headphones.jpg'),
  },
  {
    id: 3,
    color: '#484848',
    text: 'Cases',

    image: require('@/assets/images/urbanears/case.jpg'),
  },
  {
    id: 4,
    color: '#1a273c',
    text: 'Speakers',

    image: require('@/assets/images/urbanears/speaker.jpg'),
  },
];

const processedColors = ITEMS.map((item) => processColor(item.color));

const red = processColor('red');
export const BOX_LARGE_ASPECT = 4;
export const BOXES_COUNT = ITEMS.length;
export const BOX_SPACE = 2;
export const BOX_SMALL_SIZE =
  (WIDTH - (BOXES_COUNT - 1) * BOX_SPACE) / (BOXES_COUNT + BOX_LARGE_ASPECT - 1);
export const BOX_HEIGHT = 200;
export const BOX_LARGE_SIZE = BOX_SMALL_SIZE * BOX_LARGE_ASPECT;

const ColorBoxes: React.FC = () => {
  const animatedActiveIndex = useSharedValue(0);
  const colorAnimatedValue = useDerivedValue(() => {
    return withTiming(animatedActiveIndex.value, { duration: 300 });
  });
  const styles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorAnimatedValue.value,
        ITEMS.map((item, index) => index),
        ITEMS.map((item) => item.color),
      ),
      //   backgroundColor: withTiming(ITEMS[animatedActiveIndex.value].color, { duration: 1000 }),
    };
  });
  return (
    <Animated.View style={[{ flex: 1 }, styles]}>
      <Space h={150} />
      <Space h={30} />
      <Space
        pv="xs"
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.WHITE,
        }}
      >
        {ITEMS.map((item, index) => (
          <ColorBoxesItem
            key={item.id}
            {...item}
            index={index}
            animatedActiveIndex={animatedActiveIndex}
          />
        ))}
      </Space>
    </Animated.View>
  );
};

export default ColorBoxes;
