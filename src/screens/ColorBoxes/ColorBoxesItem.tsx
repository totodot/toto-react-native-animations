import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

import Space from '@/components/Space';
import Text from '@/components/Text';
import COLORS from '@/constants/colors.constants';
import { FontFamilies } from '@/types/common.types';

import { BOX_HEIGHT, BOX_LARGE_SIZE, BOX_SMALL_SIZE, BOX_SPACE } from './ColorBoxes';

const { width: WIDTH } = Dimensions.get('window');
const SCALE_RATIO = BOX_LARGE_SIZE / BOX_SMALL_SIZE;
const ITEMS = [
  {
    id: 0,
    color: '#fb0',
  },
  {
    id: 1,
    color: '#f9516b',
  },
  {
    id: 2,
    color: '#EE6606',
  },
  {
    id: 3,
    color: '#007aff',
  },
  {
    id: 4,
    color: '#34383d',
  },
];

const ColorBoxesItem: React.FC = ({ index, animatedActiveIndex, color, text, id, image }) => {
  const navi = useNavigation();
  const styles = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     translateX: -BOX_SMALL_SIZE / 2,
      //   },
      //   {
      //     scaleX: withTiming(activeIndex === index ? SCALE_RATIO : 1, {
      //       duration: 500,
      //       easing: Easing.linear,
      //     }),
      //   },
      //   {
      //     translateX: BOX_SMALL_SIZE / 2,
      //   },
      //   {
      //     translateX: withTiming(activeIndex < index ? BOX_LARGE_SIZE - BOX_SMALL_SIZE : 0, {
      //       duration: 500,
      //       easing: Easing.linear,
      //     }),
      //   },
      // ],
      transform: [
        {
          translateX: index * BOX_SPACE,
        },
      ],
      width: withTiming(animatedActiveIndex.value === index ? BOX_LARGE_SIZE : BOX_SMALL_SIZE),
    };
  });

  const onPress = () => {
    if (index === animatedActiveIndex.value) {
      navi.navigate('ColorBoxesDetails', { color, text, id, image });
    } else {
      animatedActiveIndex.value = index;
    }
    // console.log(1);
  };

  const textStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(animatedActiveIndex.value === index ? 0 : Math.PI / 2),
        },
      ],
    };
  });
  const imageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(animatedActiveIndex.value === index ? 1 : 0),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: color,
          height: BOX_HEIGHT,
          borderRadius: 6,
        },
        styles,
      ]}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              overflow: 'hidden',
            },
          ]}
        >
          <SharedElement id={`item.${id}.image`}>
            <Animated.Image
              resizeMode="cover"
              style={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 6,
                },
                imageStyles,
              ]}
              source={image}
            />
          </SharedElement>
        </Animated.View>
        <Animated.View
          style={[
            {
              width: 200,
            },
            textStyles,
          ]}
        >
          <SharedElement id={`item.${id}.text`}>
            <Text
              color={COLORS.WHITE}
              size="l"
              font={FontFamilies.MontserratBold}
              uppercase
              align="center"
            >
              {text}
            </Text>
          </SharedElement>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ColorBoxesItem;
