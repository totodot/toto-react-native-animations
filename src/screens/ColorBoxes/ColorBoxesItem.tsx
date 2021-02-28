import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

import Text from '@/components/Text';
import COLORS from '@/constants/colors.constants';
import { FontFamilies } from '@/types/common.types';

import { BOX_HEIGHT, BOX_LARGE_SIZE, BOX_SMALL_SIZE, BOX_SPACE } from './ColorBoxes';

const ColorBoxesItem = ({ index, animatedActiveIndex, color, text, id, image }) => {
  const navi = useNavigation();
  const styles = useAnimatedStyle(() => {
    return {
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
